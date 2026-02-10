"use server";

import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import path from "node:path";
import pool from "@/lib/db";

export async function createAuditoria(prevState: any, formData: FormData) {
    try {
        const nombre_informe = formData.get("nombre_informe") as string;
        const archivo = formData.get("archivo") as File;

        if (!nombre_informe || !archivo) {
            return { success: false, message: "Todos los campos son obligatorios" };
        }

        // 1. Guardar archivo en /public/uploads/
        const uploadsDir = path.join(process.cwd(), "public", "uploads");

        try {
            await fs.access(uploadsDir);
        } catch {
            await fs.mkdir(uploadsDir, { recursive: true });
        }

        // Generar nombre único para evitar colisiones
        const timestamp = Date.now();
        const uniqueFilename = `${timestamp}-${archivo.name.replace(/\s+/g, "_")}`;
        const filePath = path.join(uploadsDir, uniqueFilename);

        // Convertir File a Buffer y guardar
        const bytes = await archivo.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await fs.writeFile(filePath, buffer);

        // Ruta relativa para guardar en BD
        const archivo_pdf_path = `/uploads/${uniqueFilename}`;

        // 2. Insertar en Base de Datos PostgreSQL
        const insertQuery = `
      INSERT INTO public.auditoria (nombre_informe, archivo_pdf_path)
      VALUES ($1, $2)
      RETURNING *;
    `;

        await pool.query(insertQuery, [nombre_informe, archivo_pdf_path]);

        revalidatePath("/auditoria");
        return { success: true, message: "Informe registrado correctamente" };

    } catch (error) {
        console.error("Error en createAuditoria:", error);
        return { success: false, message: "Error al registrar el informe" };
    }
}

export async function getAuditorias() {
    try {
        const query = `
      SELECT id, fecha_publicacion, nombre_informe, archivo_pdf_path
      FROM public.auditoria
      WHERE deleted_at IS NULL
      ORDER BY fecha_publicacion DESC;
    `;
        const result = await pool.query(query);

        // Serializar fechas para pasar al cliente
        return result.rows.map(row => ({
            id: row.id,
            fecha: new Date(row.fecha_publicacion).toISOString().split('T')[0], // YYYY-MM-DD
            titulo: row.nombre_informe,
            archivo: row.archivo_pdf_path
        }));
    } catch (error) {
        console.error("Error obteniendo auditorias:", error);
        return [];
    }
}
