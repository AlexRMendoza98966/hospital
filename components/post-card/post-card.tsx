"use client"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, MoreHorizontal, Pin, Maximize } from "lucide-react"
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
  archivo?: string
  likes: number
  comments: number
  shares: number
  liked: boolean
  priority: "baja" | "media" | "alta"
}

interface PostCardProps {
  post: Post;
  onDelete?: (id: number) => void;
  onPin?: (id: number) => void;
  isPinned?: boolean;
  onEdit?: (id: number, title: string, content: string) => void;
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

export function PostCard({ post, onDelete, onPin, isPinned, onEdit }: PostCardProps) {
  const [liked, setLiked] = useState(post.liked)
  const [likesCount, setLikesCount] = useState(post.likes)
  const { isAuthenticated, user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editContent, setEditContent] = useState(post.content);

  const handleLike = () => {
    setLiked(!liked)
    setLikesCount(liked ? likesCount - 1 : likesCount + 1)
  }

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleSave = () => {
    setEditMode(false);
    if (onEdit) onEdit(post.id, editTitle, editContent);
  };

  const handleDelete = () => {
    if (confirm("¿Estás seguro de que deseas eliminar esta publicación? Esta acción no se puede deshacer.")) {
      if (onDelete) onDelete(post.id);
    }
  };

  const handlePin = () => {
    if (onPin) onPin(post.id);
  };

  const typeInfo = typeConfig[post.type] || typeConfig.comunicado
  const priorityInfo = priorityConfig[post.priority] || priorityConfig.media

  return (
    <Card className={post.priority === "alta" ? "border-red-200 shadow-md" : ""}>
      <CardContent className="p-0">
        {/* Header del post */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={post.author.avatar || "/logo_hospital.png"} />
                <AvatarFallback>HN</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">Hospital del Niño Dr. Ovidio Aliaga Uría</h3>
                <p className="text-sm text-gray-500">{post.author.time}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={isPinned ? "default" : "outline"}
                size="icon"
                className={isPinned ? "bg-yellow-400 text-white" : ""}
                onClick={isAuthenticated && user?.rol === 'admin' ? handlePin : undefined}
                title={isPinned ? "Desanclar" : "Anclar publicación"}
              >
                <Pin className={isPinned ? "h-4 w-4 text-yellow-700" : "h-4 w-4 text-gray-400"} />
              </Button>
              {isAuthenticated && user?.rol === 'admin' && (
                <>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                  {!editMode && (
                    <Button variant="outline" size="sm" className="ml-2" onClick={handleEdit}>Editar</Button>
                  )}
                  <Button variant="destructive" size="sm" className="ml-2" onClick={handleDelete}>Eliminar</Button>
                </>
              )}
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

          {/* Título y Contenido editables para admin */}
          {editMode ? (
            <>
              <input
                className="text-lg font-bold text-gray-900 mb-2 w-full border rounded px-2 py-1 mb-2"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
              />
              <textarea
                className="text-gray-700 leading-relaxed w-full border rounded px-2 py-1 mb-2"
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                rows={3}
              />
              <div className="flex gap-2 mb-2">
                <Button variant="default" size="sm" onClick={handleSave}>Guardar</Button>
                <Button variant="secondary" size="sm" onClick={handleCancel}>Cancelar</Button>
              </div>
            </>
          ) : (
            <>
              {/* Título */}
              <h2 className="text-lg font-bold text-gray-900 mb-2">{editTitle}</h2>
              {/* Contenido */}
              <p className="text-gray-700 leading-relaxed">{editContent}</p>
            </>
          )}
        </div>

        {/* Documento adjunto */}
        {post.archivo && (
          <div className="px-4 pb-4">
            {post.archivo.toLowerCase().endsWith('.pdf') ? (
              <div className="relative w-full h-96 border rounded-xl overflow-hidden bg-gray-50 group shadow-sm">
                <iframe
                  src={`${post.archivo}#toolbar=0`}
                  className="w-full h-full"
                  title="Vista previa del documento"
                >
                  <p>Tu navegador no soporta visualización de PDF.</p>
                </iframe>

                {/* Overlay con botón para ver en pantalla completa */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <a
                    href={post.archivo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg font-medium hover:bg-gray-100 transition-transform hover:scale-105 active:scale-95"
                  >
                    <Maximize className="w-4 h-4" />
                    Ver en pantalla completa
                  </a>
                </div>

                {/* Botón flotante siempre visible en móvil o esquina */}
                <div className="absolute bottom-3 right-3 pointer-events-auto md:hidden">
                  <a
                    href={post.archivo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-white text-gray-700 rounded-full shadow-md border hover:bg-gray-50"
                    title="Ver en pantalla completa"
                  >
                    <Maximize className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              <a href={post.archivo} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 bg-gray-50 border rounded hover:bg-gray-100 transition-colors">
                <div className="p-2 bg-red-100 rounded mr-3">
                  <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Documento Adjunto</p>
                  <p className="text-xs text-gray-500">Clic para ver/descargar</p>
                </div>
              </a>
            )}
          </div>
        )}

        {/* Imagen del post */}
        {post.image && (
          <div className="px-4 pb-4">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm border border-gray-100 group">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        )}



        <hr />


      </CardContent>
    </Card>
  )
}
