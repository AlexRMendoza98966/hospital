"use server";

import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import path from "node:path";
import pool from "@/lib/db";

export async function createCasoClinico(prevState: any, formData: FormData) {
    try {
        const nombre_informe = formData.get("nombre_informe") as string;
        const archivo = formData.get("archivo") as File;

        if (!nombre_informe || !archivo) {
            return { success: false, message: "Todos los campos son obligatorios" };
        }

        // Validar tamaño del archivo (10MB)
        const MAX_SIZE = 10 * 1024 * 1024; // 10MB
        if (archivo.size > MAX_SIZE) {
            return { success: false, message: "El archivo excede el límite de 10MB" };
        }

        // Guardar archivo en /public/uploads/casos/
        const uploadsDir = path.join(process.cwd(), "public", "uploads", "casos");

        try {
            await fs.access(uploadsDir);
        } catch {
            await fs.mkdir(uploadsDir, { recursive: true });
        }

        const timestamp = Date.now();
        const uniqueFilename = `caso-${timestamp}-${archivo.name.replace(/\s+/g, "_")}`;
        const filePath = path.join(uploadsDir, uniqueFilename);

        const bytes = await archivo.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await fs.writeFile(filePath, buffer);

        const archivo_pdf_path = `/uploads/casos/${uniqueFilename}`;

        const insertQuery = `
          INSERT INTO public.casos_clinicos (nombre_informe, archivo_pdf_path)
          VALUES ($1, $2)
          RETURNING *;
        `;

        await pool.query(insertQuery, [nombre_informe, archivo_pdf_path]);

        revalidatePath("/casos-clinicos");
        return { success: true, message: "Caso clínico registrado correctamente" };

    } catch (error) {
        console.error("Error en createCasoClinico:", error);
        return { success: false, message: "Error al registrar el caso clínico" };
    }
}

export async function getCasosClinicos() {
    try {
        const query = `
          SELECT id, fecha_publicacion, nombre_informe, archivo_pdf_path
          FROM public.casos_clinicos
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
        console.error("Error obteniendo casos clinicos:", error);
        return [];
    }
}

export async function deleteCasoClinico(id: number) {
    try {
        const query = `
          UPDATE public.casos_clinicos
          SET deleted_at = NOW()
          WHERE id = $1;
        `;
        await pool.query(query, [id]);
        revalidatePath("/casos-clinicos");
        return { success: true, message: "Caso clínico eliminado correctamente" };
    } catch (error) {
        console.error("Error eliminando caso clinico:", error);
        return { success: false, message: "Error al eliminar el caso clínico" };
    }
}
