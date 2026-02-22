"use client"

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Plus, X, Upload } from "lucide-react";
import { createResidenciaMedica } from "./actions";
import { useAuth } from "@/context/AuthContext";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors
        ${pending ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
            {pending ? "Guardando..." : "Guardar Registro"}
        </button>
    );
}

export default function AddResidenciaModal({ onSuccess }: { onSuccess?: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [state, formAction] = useActionState(createResidenciaMedica, null);
    const { user, isAuthenticated } = useAuth();
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        if (state?.success) {
            setIsOpen(false);
            setFileName("");
            if (onSuccess) onSuccess();
        } else if (state?.message) {
            alert(state.message);
        }
    }, [state, onSuccess]);

    const isAdmin = isAuthenticated && (user?.rol === 'admin' || user?.rol === 'administrador');

    if (!isAdmin) return null;

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold transition-colors shadow-lg"
            >
                <Plus size={20} />
                AÑADIR RESIDENCIA MÉDICA
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl animate-in fade-in zoom-in duration-200 overflow-hidden">

                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b bg-blue-600 text-white">
                            <h2 className="text-xl font-bold uppercase tracking-tight">Registro Residencia Médica</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Form */}
                        <div className="p-6">
                            <form action={formAction} className="space-y-4">

                                <div>
                                    <label htmlFor="nombre_informe" className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">
                                        Nombre del Registro / Título
                                    </label>
                                    <input
                                        type="text"
                                        id="nombre_informe"
                                        name="nombre_informe"
                                        required
                                        placeholder="Ej: Residencia Médica Pediatría - Graduados 2024"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="archivo" className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">
                                        Archivo PDF (Máx. 10 MB)
                                    </label>
                                    <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-400 transition-colors bg-gray-50">
                                        <div className="space-y-1 text-center">
                                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="flex text-sm text-gray-600 justify-center">
                                                <label
                                                    htmlFor="archivo"
                                                    className="relative cursor-pointer bg-white rounded-md font-bold text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-2"
                                                >
                                                    <span>Subir un archivo</span>
                                                    <input
                                                        id="archivo"
                                                        name="archivo"
                                                        type="file"
                                                        accept=".pdf"
                                                        required
                                                        className="sr-only"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                if (file.size > 10 * 1024 * 1024) {
                                                                    alert("El archivo excede el límite de 10MB");
                                                                    e.target.value = "";
                                                                    setFileName("");
                                                                } else {
                                                                    setFileName(file.name);
                                                                }
                                                            } else {
                                                                setFileName("");
                                                            }
                                                        }}
                                                    />
                                                </label>
                                                <p className="pl-1">o arrastrar aquí</p>
                                            </div>
                                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
                                                Solo archivos PDF
                                            </p>
                                            {fileName && (
                                                <div className="mt-4 p-2 bg-blue-50 border border-blue-100 rounded text-blue-700 text-sm font-bold flex items-center justify-center gap-2">
                                                    <span className="truncate max-w-xs">{fileName}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
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
