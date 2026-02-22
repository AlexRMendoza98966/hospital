"use client"

import { NavigationBar } from "../../components/navigation-bar/navigation-bar";
import { useEffect, useState, useCallback } from "react";
import { Trash2, Image as ImageIcon, Info, ChevronLeft, ChevronRight } from "lucide-react";
import AddInfoModal from "../informacion/AddInfoModal";
import { getInformacionBySection, deleteInformacion } from "../informacion/actions";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface InfoImage {
    id: number;
    titulo: string;
    imagen_path: string;
    created_at: string;
}

const SECTION_TITLE = "CONSULTA EXTERNA";

export default function ConsultaExternaPage() {
    const [images, setImages] = useState<InfoImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user, isAuthenticated } = useAuth();

    const fetchImages = useCallback(() => {
        setIsLoading(true);
        getInformacionBySection(SECTION_TITLE).then(data => {
            setImages(data as InfoImage[]);
            setIsLoading(false);
        });
    }, []);

    const handleDelete = async (id: number) => {
        if (confirm("¿Estás seguro de que quieres eliminar este anuncio?")) {
            const res = await deleteInformacion(id);
            if (res.success) {
                fetchImages();
            } else {
                alert(res.message);
            }
        }
    };

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    const isAdmin = isAuthenticated && (user?.rol === 'admin' || user?.rol === 'administrador');

    return (
        <div className="min-h-screen bg-white">
            <NavigationBar />

            {/* Administrador Controls */}
            {isAdmin && (
                <div className="fixed bottom-10 right-10 z-[50] flex flex-col gap-4">
                    <AddInfoModal sectionTitle={SECTION_TITLE} onSuccess={fetchImages} />
                </div>
            )}

            {/* Hero Header */}
            <div className="bg-slate-900 border-b-8 border-blue-600 py-12 px-4 shadow-inner">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">
                    <div className="bg-blue-600/20 p-4 rounded-2xl backdrop-blur-sm border border-blue-500/30">
                        <Info className="text-blue-400 w-12 h-12" />
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
                            Consulta <span className="text-blue-500">Externa</span>
                        </h1>
                        <p className="text-slate-400 mt-2 font-bold uppercase tracking-[0.3em] text-sm">
                            Información importante y anuncios institucionales
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Area - Large Images */}
            <div className="max-w-[1400px] mx-auto py-12 px-4">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-40 space-y-4">
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="font-black text-slate-400 uppercase tracking-widest animate-pulse">Cargando anuncios...</p>
                    </div>
                ) : images.length > 0 ? (
                    <div className="space-y-16">
                        {images.map((img) => (
                            <div key={img.id} className="relative group rounded-[40px] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-slate-900 border-4 border-slate-100 transition-all hover:scale-[1.01] hover:border-blue-500/50">
                                {/* Delete Button for Admin */}
                                {isAdmin && (
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-8 right-8 z-[20] w-14 h-14 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-90"
                                        onClick={() => handleDelete(img.id)}
                                    >
                                        <Trash2 className="w-6 h-6" />
                                    </Button>
                                )}

                                {/* Image with Full Width */}
                                <div className="w-full relative min-h-[400px] flex items-center justify-center bg-slate-100">
                                    <img
                                        src={img.imagen_path}
                                        alt={img.titulo}
                                        className="w-full h-auto object-cover block"
                                    />

                                    {/* Glassmorphism Badge */}
                                    <div className="absolute bottom-10 left-10 p-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-2xl">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Publicado el</p>
                                        <p className="font-bold text-lg tracking-tight">
                                            {new Date(img.created_at).toLocaleDateString('es-ES', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 bg-slate-50 rounded-[40px] border-4 border-dashed border-slate-200">
                        <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                            <ImageIcon className="text-slate-300 h-12 w-12" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">No hay anuncios disponibles</h3>
                        <p className="text-slate-500 mt-4 font-bold uppercase tracking-widest text-sm max-w-sm mx-auto opacity-60">
                            Por el momento no se han publicado comunicados para consulta externa.
                        </p>
                    </div>
                )}
            </div>

            {/* Footer space */}
            <div className="h-40"></div>
        </div>
    );
}
