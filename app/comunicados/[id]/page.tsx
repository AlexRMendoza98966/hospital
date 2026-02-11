import { Header } from "@/components/header/header";
import { Sidebar } from "@/components/sidebar/sidebar";
import { BackgroundSlider } from "@/components/background-slider/background-slider";
import { getComunicadoById } from "@/app/actions";
import { PostCard, Post } from "@/components/post-card/post-card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ComunicadoPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const comunicado = await getComunicadoById(Number(id));

    if (!comunicado) {
        notFound();
    }

    // Mapear datos al formato Post
    const post: Post = {
        id: comunicado.id,
        type: comunicado.tipo_publicacion,
        author: {
            name: "Hospital del Niño Dr. Ovidio Aliaga Uría",
            avatar: "/placeholder.svg?height=40&width=40",
            time: new Date(comunicado.created_at).toLocaleDateString(),
            department: ""
        },
        title: comunicado.titulo,
        content: comunicado.contenido,
        image: comunicado.imagen_path,
        archivo: comunicado.archivo_path,
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
        priority: comunicado.prioridad || 'media'
    };

    return (
        <div className="min-h-screen">
            <Header />
            <div className="flex pt-4 mx-auto max-w-7xl">
                <Sidebar />
                <main className="flex-1 w-full px-4">
                    <div className="mb-4">
                        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors bg-white px-4 py-2 rounded-lg shadow-sm border">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver al inicio
                        </Link>
                    </div>
                    <PostCard post={post} />
                </main>
            </div>
            <div className="px-4 pb-4 mx-auto max-w-7xl">
                <BackgroundSlider />
            </div>
        </div>
    );
}
