"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Plus, X, Upload } from "lucide-react";
import { createAuditoria } from "./actions";
import { useAuth } from "@/context/AuthContext"; // Asumiendo que existe este contexto

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors
        ${pending ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
            {pending ? "Guardando..." : "Guardar Informe"}
        </button>
    );
}

export default function AddAuditoriaModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [state, formAction] = useActionState(createAuditoria, null);
    const { user } = useAuth(); // Obtener usuario del contexto

    // Cerrar modal si el registro fue exitoso
    useEffect(() => {
        if (state?.success) {
            setIsOpen(false);
            // Opcional: Mostrar notificación de éxito
            alert(state.message);
        } else if (state?.message) {
            alert(state.message);
        }
    }, [state]);

    // Verificar si es auditor (rol 'auditoria' o similar)
    // Ajusta la condición según tu lógica real de roles
    const isAuditor = user?.rol === 'auditoria';

    if (!isAuditor) return null;

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold transition-colors"
            >
                <Plus size={20} />
                AÑADIR NUEVO INFORME
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl animate-in fade-in zoom-in duration-200">

                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-bold text-gray-800">Nuevo Informe de Auditoría</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Form */}
                        <div className="p-6">
                            <form action={formAction} className="space-y-4">

                                <div>
                                    <label htmlFor="nombre_informe" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nombre del Informe
                                    </label>
                                    <input
                                        type="text"
                                        id="nombre_informe"
                                        name="nombre_informe"
                                        required
                                        placeholder="Ej: Informe Anual 2024"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="archivo" className="block text-sm font-medium text-gray-700 mb-1">
                                        Archivo PDF
                                    </label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-400 transition-colors bg-gray-50">
                                        <div className="space-y-1 text-center">
                                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="flex text-sm text-gray-600">
                                                <label
                                                    htmlFor="archivo"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                                >
                                                    <span>Subir un archivo</span>
                                                    <input
                                                        id="archivo"
                                                        name="archivo"
                                                        type="file"
                                                        accept=".pdf"
                                                        required
                                                        className="sr-only"
                                                    />
                                                </label>
                                                <p className="pl-1">o arrastrar aquí</p>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                PDF hasta 10MB
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <SubmitButton />
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}
