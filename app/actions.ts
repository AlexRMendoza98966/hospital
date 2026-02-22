"use server";

import fs from "node:fs/promises";
import path from "node:path";
import pool from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createComunicado(prevState: any, formData: FormData) {
    try {
        const titulo = formData.get("titulo") as string;
        const contenido = formData.get("contenido") as string;
        const tipo_publicacion = formData.get("tipo_publicacion") as string;
        const prioridad = formData.get("prioridad") as string;
        const imagen = formData.get("imagen") as File | null;
        const archivo = formData.get("archivo") as File | null;

        if (!titulo || !contenido || !tipo_publicacion) {
            return { success: false, message: "Campos obligatorios faltantes" };
        }

        let imagen_path = null;
        let archivo_path = null;
        const uploadsDir = path.join(process.cwd(), "public", "uploads");

        // Asegurar directorio
        try {
            await fs.access(uploadsDir);
        } catch {
            await fs.mkdir(uploadsDir, { recursive: true });
        }

        // Guardar Imagen
        if (imagen && imagen.size > 0 && imagen.name !== "undefined") {
            const uniqueName = `img-${Date.now()}-${imagen.name.replace(/\s+/g, "_")}`;
            const filePath = path.join(uploadsDir, uniqueName);
            const buffer = Buffer.from(await imagen.arrayBuffer());
            await fs.writeFile(filePath, buffer);
            imagen_path = `/uploads/${uniqueName}`;
        }

        // Guardar Archivo (Documento)
        if (archivo && archivo.size > 0 && archivo.name !== "undefined") {
            const uniqueName = `doc-${Date.now()}-${archivo.name.replace(/\s+/g, "_")}`;
            const filePath = path.join(uploadsDir, uniqueName);
            const buffer = Buffer.from(await archivo.arrayBuffer());
            await fs.writeFile(filePath, buffer);
            archivo_path = `/uploads/${uniqueName}`;
        }

        const query = `
      INSERT INTO public.comunicados 
      (titulo, contenido, tipo_publicacion, prioridad, imagen_path, archivo_path, fecha_publicacion)
      VALUES ($1, $2, $3, $4, $5, $6, CURRENT_DATE)
      RETURNING *;
    `;

        await pool.query(query, [titulo, contenido, tipo_publicacion, prioridad, imagen_path, archivo_path]);

        revalidatePath("/"); // Actualizar la página de inicio
        return { success: true, message: "Publicación creada con éxito" };

    } catch (error) {
        console.error("Error creating comunicado:", error);
        return { success: false, message: "Error al crear la publicación" };
    }
}

export async function getComunicados() {
    try {
        const query = `
          SELECT * FROM public.comunicados
          WHERE deleted_at IS NULL
          ORDER BY created_at DESC;
        `;
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error fetching comunicados:", error);
        return [];
    }
}

export async function getComunicadoById(id: number) {
    try {
        const query = `
          SELECT * FROM public.comunicados
          WHERE id = $1 AND deleted_at IS NULL;
        `;
        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    } catch (error) {
        console.error("Error fetching comunicado by ID:", error);
        return null;
    }
}

export async function getComunicadoCounts() {
    try {
        const query = `
          SELECT tipo_publicacion, COUNT(*) as count
          FROM public.comunicados
          WHERE deleted_at IS NULL
          GROUP BY tipo_publicacion;
        `;
        const result = await pool.query(query);

        const counts = {
            anuncio: 0,
            comunicado: 0,
            convocatoria: 0
        };

        result.rows.forEach((row: { tipo_publicacion: string, count: string }) => {
            const type = row.tipo_publicacion as keyof typeof counts;
            if (counts.hasOwnProperty(type)) {
                counts[type] = parseInt(row.count, 10);
            }
        });

        return counts;
    } catch (error) {
        console.error("Error fetching counts:", error);
        return { anuncio: 0, comunicado: 0, convocatoria: 0 };
    }
}
export async function deleteComunicado(id: number) {
    try {
        const query = `
          UPDATE public.comunicados
          SET deleted_at = NOW()
          WHERE id = $1;
        `;
        await pool.query(query, [id]);
        revalidatePath("/");
        return { success: true, message: "Publicación eliminada correctamente" };
    } catch (error) {
        console.error("Error deleting comunicado:", error);
        return { success: false, message: "Error al eliminar la publicación" };
    }
}

export async function getDepartamentos() {
    try {
        const query = `
          SELECT * FROM public.departamentos
          WHERE deleted_at IS NULL
          ORDER BY nombre_departamento ASC;
        `;
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error fetching departamentos:", error);
        return [];
    }
}

export async function createDepartamento(nombre: string, icon: string) {
    try {
        const query = `
          INSERT INTO public.departamentos (nombre_departamento, icon)
          VALUES ($1, $2)
          RETURNING *;
        `;
        await pool.query(query, [nombre, icon]);
        revalidatePath("/");
        return { success: true, message: "Departamento añadido correctamente" };
    } catch (error) {
        console.error("Error creating departamento:", error);
        return { success: false, message: "Error al añadir el departamento" };
    }
}

export async function deleteDepartamento(id: number) {
    try {
        const query = `
          UPDATE public.departamentos
          SET deleted_at = NOW()
          WHERE id = $1;
        `;
        await pool.query(query, [id]);
        revalidatePath("/");
        return { success: true, message: "Departamento eliminado correctamente" };
    } catch (error) {
        console.error("Error deleting departamento:", error);
        return { success: false, message: "Error al eliminar el departamento" };
    }
}
