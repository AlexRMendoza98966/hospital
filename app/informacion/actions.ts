"use server";

import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import path from "node:path";
import pool from "@/lib/db";

export async function uploadInformacion(sectionTitle: string, prevState: any, formData: FormData) {
    try {
        const imagen = formData.get("imagen") as File;

        if (!imagen) {
            return { success: false, message: "Debe seleccionar una imagen" };
        }

        // Validar tipo de archivo
        if (!imagen.type.startsWith("image/")) {
            return { success: false, message: "El archivo debe ser una imagen (JPG, PNG, etc.)" };
        }

        // Validar tamaño (5MB para imágenes es suficiente)
        const MAX_SIZE = 5 * 1024 * 1024;
        if (imagen.size > MAX_SIZE) {
            return { success: false, message: "La imagen excede el límite de 5MB" };
        }

        const uploadsDir = path.join(process.cwd(), "public", "uploads", "informacion");

        try {
            await fs.access(uploadsDir);
        } catch {
            await fs.mkdir(uploadsDir, { recursive: true });
        }

        const timestamp = Date.now();
        const uniqueFilename = `info-${timestamp}-${imagen.name.replace(/\s+/g, "_")}`;
        const filePath = path.join(uploadsDir, uniqueFilename);

        const bytes = await imagen.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await fs.writeFile(filePath, buffer);

        const imagen_path = `/uploads/informacion/${uniqueFilename}`;

        // Insertar en la tabla informacion. Usamos el titulo para identificar la sección.
        const insertQuery = `
          INSERT INTO public.informacion (titulo, imagen_path)
          VALUES ($1, $2)
          RETURNING *;
        `;

        await pool.query(insertQuery, [sectionTitle, imagen_path]);

        revalidatePath("/consulta-externa");
        revalidatePath("/cartera-servicios");

        return { success: true, message: "Imagen subida correctamente" };

    } catch (error) {
        console.error("Error en uploadInformacion:", error);
        return { success: false, message: "Error al subir la imagen" };
    }
}

export async function getInformacionBySection(sectionTitle: string) {
    try {
        const query = `
          SELECT id, titulo, imagen_path, created_at
          FROM public.informacion
          WHERE titulo = $1 AND deleted_at IS NULL
          ORDER BY created_at DESC;
        `;
        const result = await pool.query(query, [sectionTitle]);
        return result.rows;
    } catch (error) {
        console.error("Error obteniendo informacion:", error);
        return [];
    }
}

export async function deleteInformacion(id: number) {
    try {
        const query = `
          UPDATE public.informacion
          SET deleted_at = NOW()
          WHERE id = $1;
        `;
        await pool.query(query, [id]);
        revalidatePath("/consulta-externa");
        revalidatePath("/cartera-servicios");
        return { success: true, message: "Imagen eliminada correctamente" };
    } catch (error) {
        console.error("Error eliminando informacion:", error);
        return { success: false, message: "Error al eliminar la imagen" };
    }
}
