"use server";

import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import path from "node:path";
import pool from "@/lib/db";

export async function createResidenciaMedica(prevState: any, formData: FormData) {
    try {
        const nombre_informe = formData.get("nombre_informe") as string;
        const archivo = formData.get("archivo") as File;

        if (!nombre_informe || !archivo) {
            return { success: false, message: "Todos los campos son obligatorios" };
        }

        // Validar tamaño del archivo (10MB)
        const MAX_SIZE = 10 * 1024 * 1024;
        if (archivo.size > MAX_SIZE) {
            return { success: false, message: "El archivo excede el límite de 10MB" };
        }

        // Guardar archivo en /public/uploads/residencia/
        const uploadsDir = path.join(process.cwd(), "public", "uploads", "residencia");

        try {
            await fs.access(uploadsDir);
        } catch {
            await fs.mkdir(uploadsDir, { recursive: true });
        }

        const timestamp = Date.now();
        const uniqueFilename = `residencia-${timestamp}-${archivo.name.replace(/\s+/g, "_")}`;
        const filePath = path.join(uploadsDir, uniqueFilename);

        const bytes = await archivo.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await fs.writeFile(filePath, buffer);

        const archivo_pdf_path = `/uploads/residencia/${uniqueFilename}`;

        const insertQuery = `
          INSERT INTO public.residencia_medica (nombre_informe, archivo_pdf_path)
          VALUES ($1, $2)
          RETURNING *;
        `;

        await pool.query(insertQuery, [nombre_informe, archivo_pdf_path]);

        revalidatePath("/residencia-medica");
        return { success: true, message: "Registro de residencia añadido correctamente" };

    } catch (error) {
        console.error("Error en createResidenciaMedica:", error);
        return { success: false, message: "Error al registrar residencia médica" };
    }
}

export async function getResidenciasMedicas() {
    try {
        const query = `
          SELECT id, fecha_publicacion, nombre_informe, archivo_pdf_path
          FROM public.residencia_medica
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
        console.error("Error obteniendo residencias medicas:", error);
        return [];
    }
}

export async function deleteResidenciaMedica(id: number) {
    try {
        const query = `
          UPDATE public.residencia_medica
          SET deleted_at = NOW()
          WHERE id = $1;
        `;
        await pool.query(query, [id]);
        revalidatePath("/residencia-medica");
        return { success: true, message: "Registro eliminado correctamente" };
    } catch (error) {
        console.error("Error eliminando residencia medica:", error);
        return { success: false, message: "Error al eliminar el registro" };
    }
}
