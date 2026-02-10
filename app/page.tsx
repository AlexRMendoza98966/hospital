"use client"
import { Header } from "@/components/header/header"
import { Sidebar } from "@/components/sidebar/sidebar"
import { CreatePost } from "@/components/create-post/create-post"
import { PostCard, Post } from "@/components/post-card/post-card"
import { BackgroundSlider } from "@/components/background-slider/background-slider"
import { ExpandingCards } from "@/components/expanding-cards/expanding-cards"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"

const initialPosts: Post[] = [
	{
		id: 1,
		type: "comunicado",
		author: {
			name: "Hospital del Niño Dr. Ovidio Aliaga Uría",
			avatar: "/placeholder.svg?height=40&width=40",
			time: "2h",
			department: "",
		},
		title: "Nuevos Horarios de Atención",
		content:
			"Informamos que a partir del lunes 15 de enero, los horarios de consulta externa serán de 7:00 AM a 6:00 PM de lunes a viernes, y de 8:00 AM a 2:00 PM los sábados.",
		image: "/placeholder.svg?height=300&width=500",
		likes: 45,
		comments: 12,
		shares: 8,
		liked: false,
		priority: "alta",
	},
	{
		id: 2,
		type: "convocatoria",
		author: {
			name: "Hospital del Niño Dr. Ovidio Aliaga Uría",
			avatar: "/placeholder.svg?height=40&width=40",
			time: "4h",
			department: "",
		},
		title: "Convocatoria: Enfermero/a Especializado/a",
		content:
			"Se requiere enfermero/a con especialización en cuidados intensivos. Experiencia mínima 3 años. Enviar CV a rrhh@hospital.com hasta el 20 de enero.",
		likes: 28,
		comments: 15,
		shares: 22,
		liked: false,
		priority: "media",
	},
	{
		id: 3,
		type: "anuncio",
		author: {
			name: "Hospital del Niño Dr. Ovidio Aliaga Uría",
			avatar: "/placeholder.svg?height=40&width=40",
			time: "6h",
			department: "",
		},
		title: "Campaña de Prevención Cardiovascular",
		content:
			"Durante todo el mes de enero realizaremos chequeos cardiovasculares gratuitos. Agenda tu cita llamando al 123-456-7890. ¡Cuida tu corazón! ❤️",
		image: "/placeholder.svg?height=250&width=400",
		likes: 67,
		comments: 8,
		shares: 15,
		liked: true,
		priority: "alta",
	},
]

export default function HomePage() {
 const [posts, setPosts] = useState<Post[]>(initialPosts);
 const [pinnedId, setPinnedId] = useState<number | null>(null);
 const { isAuthenticated, logout } = useAuth();

	// Eliminar publicación
	const handleDelete = (id: number) => {
		setPosts((prev) => prev.filter((p) => p.id !== id));
		if (pinnedId === id) setPinnedId(null);
	};

	// Anclar publicación (solo una a la vez)
	const handlePin = (id: number) => {
		setPinnedId(id);
		// Opcional: mover la publicación anclada al principio
		setPosts((prev) => {
			const postToPin = prev.find((p) => p.id === id);
			if (!postToPin) return prev;
			const others = prev.filter((p) => p.id !== id);
			return [postToPin, ...others];
		});
	};

	// Editar publicación
	const handleEdit = (id: number, title: string, content: string) => {
		setPosts((prev) => prev.map((p) => p.id === id ? { ...p, title, content } : p));
	};

	 return (
		 <div className="min-h-screen">
			 <Header />
			 {isAuthenticated && (
				 <div className="flex justify-end p-4">
					 <button
						 onClick={logout}
						 className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
					 >
						 Cerrar sesión
					 </button>
				 </div>
			 )}
			 <div className="flex pt-4 mx-auto max-w-7xl">
				 <Sidebar />
				 <main className="flex-1 w-full px-4">
					 <CreatePost />
					 <div className="mt-4 space-y-4">
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
