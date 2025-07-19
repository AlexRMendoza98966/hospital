"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, MoreHorizontal, Pin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export interface Post {
  id: number
  type: "comunicado" | "anuncio" | "convocatoria"
  author: {
    name: string
    avatar: string
    time: string
    department: string
  }
  title: string
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  liked: boolean
  priority: "baja" | "media" | "alta"
}

interface PostCardProps {
  post: Post
}

const typeConfig = {
  comunicado: { icon: "📢", color: "bg-blue-100 text-blue-700", label: "Comunicado" },
  anuncio: { icon: "📣", color: "bg-orange-100 text-orange-700", label: "Anuncio" },
  convocatoria: { icon: "👥", color: "bg-green-100 text-green-700", label: "Convocatoria" },
}

const priorityConfig = {
  baja: { color: "bg-green-100 text-green-700", label: "Prioridad Baja" },
  media: { color: "bg-yellow-100 text-yellow-700", label: "Prioridad Media" },
  alta: { color: "bg-red-100 text-red-700", label: "Prioridad Alta" },
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(post.liked)
  const [likesCount, setLikesCount] = useState(post.likes)

  const handleLike = () => {
    setLiked(!liked)
    setLikesCount(liked ? likesCount - 1 : likesCount + 1)
  }

  const typeInfo = typeConfig[post.type]
  const priorityInfo = priorityConfig[post.priority]

  return (
    <Card className={post.priority === "alta" ? "border-red-200 shadow-md" : ""}>
      <CardContent className="p-0">
        {/* Header del post */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{post.author.name}</h3>
                <p className="text-sm text-gray-500">
                  {post.author.department} • {post.author.time}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {post.priority === "alta" && <Pin className="h-4 w-4 text-red-600" />}
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Badges */}
          <div className="flex items-center space-x-2 mb-3">
            <Badge className={typeInfo.color}>
              {typeInfo.icon} {typeInfo.label}
            </Badge>
            <Badge variant="outline" className={priorityInfo.color}>
              {priorityInfo.label}
            </Badge>
          </div>

          {/* Título */}
          <h2 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h2>

          {/* Contenido */}
          <p className="text-gray-700 leading-relaxed">{post.content}</p>
        </div>

        {/* Imagen del post */}
        {post.image && (
          <div className="relative">
            <Image
              src={post.image || "/placeholder.svg"}
              alt="Post image"
              width={500}
              height={300}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Estadísticas */}
        <div className="px-4 py-3 flex items-center justify-between text-sm text-gray-500 bg-gray-50">
          <div className="flex items-center space-x-1">
            <div className="flex -space-x-1">
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                <Heart className="h-3 w-3 text-white fill-current" />
              </div>
            </div>
            <span>{likesCount} reacciones</span>
          </div>
          <div className="flex space-x-4">
            <span>{post.comments} comentarios</span>
            <span>{post.shares} compartidos</span>
          </div>
        </div>

        <hr />

        {/* Acciones */}
        <div className="p-2 flex items-center justify-around">
          <Button
            variant="ghost"
            className={`flex-1 ${liked ? "text-blue-600" : "text-gray-600"}`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 mr-2 ${liked ? "fill-current" : ""}`} />
            Me gusta
          </Button>
          <Button variant="ghost" className="flex-1 text-gray-600">
            <MessageCircle className="h-4 w-4 mr-2" />
            Comentar
          </Button>
          <Button variant="ghost" className="flex-1 text-gray-600">
            <Share className="h-4 w-4 mr-2" />
            Compartir
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
