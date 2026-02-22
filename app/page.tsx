"use client"
import { Header } from "@/components/header/header"
import { Sidebar } from "@/components/sidebar/sidebar"
import { CreatePost } from "@/components/create-post/create-post"
import { PostCard, Post } from "@/components/post-card/post-card"
import { BackgroundSlider } from "@/components/background-slider/background-slider"
import { ExpandingCards } from "@/components/expanding-cards/expanding-cards"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { getComunicados } from "@/app/actions"

const initialPosts: Post[] = [
	// ... Mock data removed, now loading from DB
]

export default function HomePage() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [pinnedId, setPinnedId] = useState<number | null>(null);
	const { isAuthenticated, logout } = useAuth();
	const [loading, setLoading] = useState(true);

	// Fetch posts from DB
	useEffect(() => {
		async function loadPosts() {
			try {
				const data = await getComunicados();

				// Map DB data to Post interface
				const mappedPosts: Post[] = data.map((item: any) => ({
					id: item.id,
					type: item.tipo_publicacion,
					author: {
						name: "Hospital del Niño Dr. Ovidio Aliaga Uría",
						avatar: "/logo_hospital.png",
						time: new Date(item.created_at).toLocaleDateString(), // Simplificado por ahora
						department: ""
					},
					title: item.titulo,
					content: item.contenido,
					image: item.imagen_path,
					archivo: item.archivo_path,
					likes: 0, // Mocked
					comments: 0, // Mocked
					shares: 0, // Mocked
					liked: false, // Mocked
					priority: item.prioridad || 'media'
				}));

				setPosts(mappedPosts);
			} catch (error) {
				console.error("Failed to load posts", error);
			} finally {
				setLoading(false);
			}
		}
		loadPosts();
	}, [loading]); // Reload when loading changes (e.g. after create)


	// Eliminar publicación de la base de datos
	const handleDelete = async (id: number) => {
		try {
			const { deleteComunicado } = await import("@/app/actions");
			const result = await deleteComunicado(id);
			if (result.success) {
				setPosts((prev) => prev.filter((p) => p.id !== id));
				if (pinnedId === id) setPinnedId(null);
			} else {
				alert(result.message);
			}
		} catch (error) {
			console.error("Error al eliminar:", error);
			alert("Error al intentar eliminar la publicación");
		}
	};

	// Anclar publicación
	const handlePin = (id: number) => {
		setPinnedId(id);
		setPosts((prev) => {
			const postToPin = prev.find((p) => p.id === id);
			if (!postToPin) return prev;
			const others = prev.filter((p) => p.id !== id);
			return [postToPin, ...others];
		});
	};

	// Editar publicación (Mocked for now in UI)
	const handleEdit = (id: number, title: string, content: string) => {
		setPosts((prev) => prev.map((p) => p.id === id ? { ...p, title, content } : p));
	};

	// Force refresh helper passed to CreatePost? Or simple page reload for now.
	// Better approach: CreatePost calls router.refresh() or setPosts.
	// For simplicity, we can rely on page reload or simple state update if we lift state up.
	// Since CreatePost calls revalidatePath('/'), next navigation should update it.

	return (
		<div className="min-h-screen">
			<Header />
			<div className="flex pt-4 mx-auto max-w-7xl">
				<Sidebar />
				<main className="flex-1 w-full px-4">
					<CreatePost onSuccess={() => setLoading(true)} />
					<div className="mt-4 space-y-4">
						{/* If we just published, we might need to manually trigger refresh or rely on revalidatePath works */}
						{posts.map((post) => (
							<PostCard
								key={post.id}
								post={post}
								onDelete={handleDelete}
								onPin={handlePin}
								isPinned={pinnedId === post.id}
								onEdit={handleEdit}
							/>
						))}
						{posts.length === 0 && !loading && (
							<p className="text-center text-gray-500 py-8">No hay publicaciones recientes.</p>
						)}
						{loading && (
							<p className="text-center text-gray-500 py-8">Cargando publicaciones...</p>
						)}
					</div>
				</main>
			</div>
			<div className="px-4 pb-4 mx-auto max-w-7xl">
				<BackgroundSlider />
			</div>
			<section className="px-4 py-8 mx-auto max-w-7xl">
				<h2 className="mb-4 text-3xl font-bold text-center text-gray-800">
					Quiénes Somos
				</h2>
				<ExpandingCards />
			</section>
		</div>
	)
}
