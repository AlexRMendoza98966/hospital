"use client"

import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageIcon, FileText } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export function CreatePost() {
  const [postText, setPostText] = useState("");
  const [postType, setPostType] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const { isAuthenticated, user } = useAuth();

  // Solo mostrar si el usuario es admin o administrador
  const isAdmin = isAuthenticated && (user?.rol === 'admin' || user?.rol === 'administrador');

  return (
    <div style={{ display: isAdmin ? 'block' : 'none' }}>
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <div className="flex space-x-3">
                <Input
                  placeholder="Título del comunicado..."
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  className="flex-1"
                />
                <Select value={postType} onValueChange={setPostType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Tipo de publicación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comunicado">📢 Comunicado</SelectItem>
                    <SelectItem value="anuncio">📣 Anuncio</SelectItem>
                    <SelectItem value="convocatoria">👥 Convocatoria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                placeholder="Escribe el contenido del comunicado..."
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="border-gray-200 resize-none text-base placeholder:text-gray-500"
                rows={4}
              />
            </div>
          </div>

          <hr className="my-4" />

          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              <Button variant="ghost" className="text-gray-600 hover:bg-gray-100">
                <ImageIcon className="h-4 w-4 mr-2 text-blue-600" />
                Imagen
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:bg-gray-100">
                <FileText className="h-4 w-4 mr-2 text-green-600" />
                Documento
              </Button>
              <Select>
                <SelectTrigger className="w-32 h-9">
                  <SelectValue placeholder="Prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baja">🟢 Baja</SelectItem>
                  <SelectItem value="media">🟡 Media</SelectItem>
                  <SelectItem value="alta">🔴 Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!postText.trim() || !postTitle.trim() || !postType}
            >
              Publicar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
