"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createDepartamento } from "@/app/actions";

interface AddDepartamentoModalProps {
    onSuccess: () => void;
}

const suggestedIcons = ["🏥", "👶", "🧠", "🫀", "🦴", "🌡️", "🧪", "🚑", "🩺", "💉", "🦷", "👁️", "👂", "🧬"];

export default function AddDepartamentoModal({ onSuccess }: AddDepartamentoModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [nombre, setNombre] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("🏥");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nombre.trim()) return;

        setIsSubmitting(true);
        try {
            const res = await createDepartamento(nombre, selectedIcon);
            if (res.success) {
                setNombre("");
                setSelectedIcon("🏥");
                setIsOpen(false);
                onSuccess();
            } else {
                alert(res.message);
            }
        } catch (error) {
            console.error(error);
            alert("Error al crear el departamento");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) {
        return (
            <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-blue-600 hover:bg-blue-50"
                onClick={() => setIsOpen(true)}
                title="Añadir departamento"
            >
                <Plus size={16} />
            </Button>
        );
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                    <h2 className="text-lg font-bold text-gray-800">Nuevo Departamento</h2>
                    <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Nombre del Departamento</label>
                        <Input
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Ej: Odontología"
                            required
                            autoFocus
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700">Seleccionar Icono</label>
                        <div className="grid grid-cols-7 gap-2">
                            {suggestedIcons.map((icon) => (
                                <button
                                    key={icon}
                                    type="button"
                                    onClick={() => setSelectedIcon(icon)}
                                    className={`text-xl p-2 rounded-lg transition-all ${selectedIcon === icon
                                            ? "bg-blue-600 scale-110 shadow-md transform"
                                            : "bg-gray-100 hover:bg-gray-200"
                                        }`}
                                >
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                            disabled={isSubmitting || !nombre.trim()}
                        >
                            {isSubmitting ? "Guardando..." : "Crear"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
