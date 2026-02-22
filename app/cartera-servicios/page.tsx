"use client"

import { NavigationBar } from "../../components/navigation-bar/navigation-bar";
import { useEffect, useState, useCallback } from "react";
import { Trash2, Image as ImageIcon, Briefcase, Info } from "lucide-react";
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

const SECTION_TITLE = "CARTERA DE SERVICIOS";

export default function CarteraServiciosPage() {
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
            <div className="bg-gradient-to-b from-blue-950 to-slate-900 border-b-8 border-blue-500 py-16 px-4 shadow-inner">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">
                    <div className="bg-blue-500/10 p-5 rounded-[2.5rem] backdrop-blur-md border border-white/5">
                        <Briefcase className="text-blue-400 w-14 h-14" />
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic drop-shadow-2xl">
                            Cartera de <span className="text-blue-500">Servicios</span>
                        </h1>
                        <p className="text-blue-200/50 mt-4 font-bold uppercase tracking-[0.4em] text-xs">
                            Equipamiento, especialidades y atención inmediata
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Area - Banner Style Images */}
            <div className="max-w-[1400px] mx-auto py-16 px-4">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-40 space-y-4">
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="font-black text-slate-400 uppercase tracking-widest animate-pulse">Cargando servicios...</p>
                    </div>
                ) : images.length > 0 ? (
                    <div className="space-y-24">
                        {images.map((img) => (
                            <div key={img.id} className="relative group rounded-[50px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] bg-white border-0 transition-all duration-500 hover:shadow-blue-500/10 active:scale-[0.98]">
                                {/* Delete Button for Admin */}
                                {isAdmin && (
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-10 right-10 z-[20] w-16 h-16 rounded-[2rem] shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 hover:rotate-12"
                                        onClick={() => handleDelete(img.id)}
                                    >
                                        <Trash2 className="w-7 h-7" />
                                    </Button>
                                )}

                                {/* Image with Full Width */}
                                <div className="w-full relative min-h-[500px] flex items-center justify-center bg-slate-50">
                                    <img
                                        src={img.imagen_path}
                                        alt={img.titulo}
                                        className="w-full h-auto object-cover block shadow-xl"
                                    />

                                    {/* Minimal Info overlay */}
                                    <div className="absolute top-10 left-10 p-1 px-4 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                                        Comunicado Oficial
                                    </div>
                                </div>

                                <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-10 bg-blue-600 rounded-full"></div>
                                        <div>
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Hospital del Niño</p>
                                            <p className="text-slate-900 font-bold text-xl tracking-tight uppercase">Servicios Médicos Actualizados</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Actualizado el</p>
                                        <p className="text-slate-700 font-bold text-sm">
                                            {new Date(img.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40 bg-white rounded-[60px] border-8 border-slate-50 shadow-inner">
                        <div className="bg-slate-50 w-32 h-32 rounded-[3.5rem] flex items-center justify-center mx-auto mb-10 shadow-sm border border-slate-100">
                            <Briefcase className="text-slate-200 h-16 w-16" />
                        </div>
                        <h3 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">Cartera de servicios próxima</h3>
                        <p className="text-slate-400 mt-6 font-bold uppercase tracking-[0.3em] text-xs max-w-md mx-auto leading-loose">
                            Estamos actualizando nuestra matriz de especialidades. Vuelva pronto para ver los nuevos servicios disponibles.
                        </p>
                    </div>
                )}
            </div>

            <div className="h-60"></div>
        </div>
    );
}
