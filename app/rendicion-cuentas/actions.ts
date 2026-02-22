"use server";

import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import path from "node:path";
import pool from "@/lib/db";

export async function createRendicionCuentas(prevState: any, formData: FormData) {
    try {
        const nombre_informe = formData.get("nombre_informe") as string;
        const archivo = formData.get("archivo") as File;

        if (!nombre_informe || !archivo) {
            return { success: false, message: "Todos los campos son obligatorios" };
        }

        const MAX_SIZE = 10 * 1024 * 1024;
        if (archivo.size > MAX_SIZE) {
            return { success: false, message: "El archivo excede el límite de 10MB" };
        }

        const uploadsDir = path.join(process.cwd(), "public", "uploads", "rendicion");

        try {
            await fs.access(uploadsDir);
        } catch {
            await fs.mkdir(uploadsDir, { recursive: true });
        }

        const timestamp = Date.now();
        const uniqueFilename = `rendicion-${timestamp}-${archivo.name.replace(/\s+/g, "_")}`;
        const filePath = path.join(uploadsDir, uniqueFilename);

        const bytes = await archivo.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await fs.writeFile(filePath, buffer);

        const archivo_pdf_path = `/uploads/rendicion/${uniqueFilename}`;

        const insertQuery = `
          INSERT INTO public.rendicion_de_cuentas (nombre_informe, archivo_pdf_path)
          VALUES ($1, $2)
          RETURNING *;
        `;

        await pool.query(insertQuery, [nombre_informe, archivo_pdf_path]);

        revalidatePath("/rendicion-cuentas");
        return { success: true, message: "Informe de rendición registrado correctamente" };

    } catch (error) {
        console.error("Error en createRendicionCuentas:", error);
        return { success: false, message: "Error al registrar informe" };
    }
}

export async function getRendicionesCuentas() {
    try {
        const query = `
          SELECT id, fecha_publicacion, nombre_informe, archivo_pdf_path
          FROM public.rendicion_de_cuentas
          WHERE deleted_at IS NULL
          ORDER BY fecha_publicacion DESC;
        `;
        const result = await pool.query(query);

        return result.rows.map((row: any) => ({
            id: row.id,
            fecha: new Date(row.fecha_publicacion).toISOString().split('T')[0],
            titulo: row.nombre_informe,
            archivo: row.archivo_pdf_path
        }));
    } catch (error) {
        console.error("Error obteniendo rendiciones de cuentas:", error);
        return [];
    }
}

export async function deleteRendicionCuentas(id: number) {
    try {
        const query = `
          UPDATE public.rendicion_de_cuentas
          SET deleted_at = NOW()
          WHERE id = $1;
        `;
        await pool.query(query, [id]);
        revalidatePath("/rendicion-cuentas");
        return { success: true, message: "Informe eliminado correctamente" };
    } catch (error) {
        console.error("Error eliminando rendicion de cuentas:", error);
        return { success: false, message: "Error al eliminar el informe" };
    }
}
