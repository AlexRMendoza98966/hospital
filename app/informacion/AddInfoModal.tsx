"use client"

import { useActionState, useEffect, useState, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Plus, X, Upload, Image as ImageIcon } from "lucide-react";
import { uploadInformacion } from "../informacion/actions";
import { useAuth } from "@/context/AuthContext";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className={`w-full py-3 px-4 rounded-xl text-white font-bold transition-all shadow-lg
        ${pending ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-95"}`}
        >
            {pending ? "SUBIENDO IMAGEN..." : "PUBLICAR ANUNCIO / IMAGEN"}
        </button>
    );
}

export default function AddInfoModal({
    sectionTitle,
    onSuccess
}: {
    sectionTitle: string,
    onSuccess?: () => void
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { user, isAuthenticated } = useAuth();

    // El servidor espera (prevState, formData), pero nuestra acción uploadInformacion tiene (sectionTitle, formData)
    // Usamos bind para pasar la primera parte del argumento
    const uploadWithSection = uploadInformacion.bind(null, sectionTitle);
    const [state, formAction] = useActionState(uploadWithSection, null);

    useEffect(() => {
        if (state?.success) {
            setIsOpen(false);
            setPreviewUrl(null);
            if (onSuccess) onSuccess();
        } else if (state?.message) {
            alert(state.message);
        }
    }, [state, onSuccess]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("La imagen excede el límite de 5MB");
                e.target.value = "";
                setPreviewUrl(null);
                return;
            }
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const isAdmin = isAuthenticated && (user?.rol === 'admin' || user?.rol === 'administrador');

    if (!isAdmin) return null;

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 font-bold transition-all shadow-xl hover:scale-105"
            >
                <Plus size={24} />
                AÑADIR NUEVA IMAGEN / ANUNCIO
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl animate-in fade-in zoom-in duration-300 overflow-hidden">

                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                            <div>
                                <h2 className="text-xl font-black uppercase tracking-tight italic">Subir Anuncio Grande</h2>
                                <p className="text-blue-100 text-xs font-bold uppercase tracking-wider opacity-80">{sectionTitle}</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Form */}
                        <div className="p-8">
                            <form action={formAction} className="space-y-6">
                                <div className="space-y-4">
                                    <label className="block text-sm font-black text-slate-700 uppercase tracking-widest text-center">
                                        Seleccione una imagen de alta resolución
                                    </label>

                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`relative border-4 border-dashed rounded-3xl p-4 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[300px]
                                            ${previewUrl ? 'border-blue-400 bg-blue-50/30' : 'border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/50'}`}
                                    >
                                        {previewUrl ? (
                                            <div className="w-full h-full flex flex-col items-center gap-4">
                                                <img
                                                    src={previewUrl}
                                                    alt="Preview"
                                                    className="max-h-[250px] rounded-xl shadow-lg object-contain"
                                                />
                                                <p className="text-blue-600 font-black text-xs uppercase tracking-tighter">Haga clic para cambiar la imagen</p>
                                            </div>
                                        ) : (
                                            <div className="text-center space-y-4">
                                                <div className="bg-white p-6 rounded-full shadow-md inline-block">
                                                    <ImageIcon className="w-12 h-12 text-blue-500" />
                                                </div>
                                                <div>
                                                    <p className="text-slate-900 font-black text-lg uppercase tracking-tight">Click para subir</p>
                                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Formatos sugeridos: JPG, PNG, WEBP</p>
                                                </div>
                                                <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase">MÁX. 5 MEGABYTES</div>
                                            </div>
                                        )}

                                        <input
                                            id="imagen"
                                            name="imagen"
                                            type="file"
                                            accept="image/*"
                                            required
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <SubmitButton />
                                    <p className="text-center text-[10px] text-slate-400 font-bold uppercase mt-4 tracking-tighter">
                                        * La imagen aparecerá automáticamente en la sección correspondiente ocupando el ancho completo.
                                    </p>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}
