"use client"
import { Header } from "@/components/header/header"
import { Sidebar } from "@/components/sidebar/sidebar"
import { CreatePost } from "@/components/create-post/create-post"
import { PostCard, Post } from "@/components/post-card/post-card"
import { BackgroundSlider } from "@/components/background-slider/background-slider"
import { ExpandingCards } from "@/components/expanding-cards/expanding-cards"

const posts: Post[] = [
	{
		id: 1,
		type: "comunicado",
		author: {
			name: "Dirección General",
			avatar: "/placeholder.svg?height=40&width=40",
			time: "2h",
			department: "Administración",
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
			name: "Recursos Humanos",
			avatar: "/placeholder.svg?height=40&width=40",
			time: "4h",
			department: "RRHH",
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
			name: "Departamento de Cardiología",
			avatar: "/placeholder.svg?height=40&width=40",
			time: "6h",
			department: "Cardiología",
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
	return (
		<div className="min-h-screen">
			<Header />
			<div className="flex max-w-7xl mx-auto pt-4">
				<Sidebar />
				<main className="flex-1 px-4 w-full">
					<CreatePost />
					<div className="space-y-4 mt-4">
						{posts.map((post) => (
							<PostCard key={post.id} post={post} />
						))}
					</div>
				</main>
			</div>
			<div className="max-w-7xl mx-auto px-4 pb-4">
				<BackgroundSlider />
			</div>
			<section className="max-w-7xl mx-auto px-4 py-8">
				<h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
					Quiénes Somos
				</h2>
				<ExpandingCards />
			</section>
		</div>
	)
}
