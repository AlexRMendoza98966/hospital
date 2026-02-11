"use client"

import { useState, useRef } from "react"
import { useAuth } from "../../context/AuthContext"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageIcon, FileText, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { createComunicado } from "@/app/actions"
import { toast } from "sonner" // Asumiendo que usas sonner o similar para notificaciones

export function CreatePost({ onSuccess }: { onSuccess?: () => void }) {
  const [postText, setPostText] = useState("");
  const [postType, setPostType] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [priority, setPriority] = useState("media"); // Valor por defecto
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [docFile, setDocFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Referencias para limpiar inputs de archivo
  const imageInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const { isAuthenticated, user } = useAuth();

  // Solo mostrar si el usuario es admin o administrador
  const isAdmin = isAuthenticated && (user?.rol === 'admin' || user?.rol === 'administrador');

  if (!isAdmin) return null;

  async function handleSubmit() {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("titulo", postTitle);
    formData.append("contenido", postText);
    formData.append("tipo_publicacion", postType);
    formData.append("prioridad", priority);
    if (imageFile) formData.append("imagen", imageFile);
    if (docFile) formData.append("archivo", docFile);

    try {
      const result = await createComunicado(null, formData);
      if (result.success) {
        // Limpiar formulario y mostrar éxito
        setPostText("");
        setPostType("");
        setPostTitle("");
        setPriority("media");
        setImageFile(null);
        setDocFile(null);
        if (imageInputRef.current) imageInputRef.current.value = "";
        if (docInputRef.current) docInputRef.current.value = "";

        // Puedes usar un toast aquí si lo tienes configurado
        alert("Publicación creada correctamente");
        if (onSuccess) onSuccess();
      } else {
        alert(result.message || "Error al crear la publicación");
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error inesperado");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-3">
            <Avatar>
              <AvatarImage src="/logo_hospital.png" alt="Foto de perfil" />
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

              {/* Previsualización de archivos seleccionados */}
              {(imageFile || docFile) && (
                <div className="flex gap-2 mt-2">
                  {imageFile && (
                    <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
                      <ImageIcon size={14} />
                      <span className="truncate max-w-[150px]">{imageFile.name}</span>
                      <button onClick={() => { setImageFile(null); if (imageInputRef.current) imageInputRef.current.value = "" }} className="hover:text-blue-900"><X size={14} /></button>
                    </div>
                  )}
                  {docFile && (
                    <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-sm">
                      <FileText size={14} />
                      <span className="truncate max-w-[150px]">{docFile.name}</span>
                      <button onClick={() => { setDocFile(null); if (docInputRef.current) docInputRef.current.value = "" }} className="hover:text-green-900"><X size={14} /></button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <hr className="my-4" />

          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              {/* Inputs de archivo ocultos */}
              <input
                type="file"
                ref={imageInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
              />
              <input
                type="file"
                ref={docInputRef}
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={(e) => e.target.files && setDocFile(e.target.files[0])}
              />

              <Button
                variant="ghost"
                className="text-gray-600 hover:bg-gray-100"
                onClick={() => imageInputRef.current?.click()}
              >
                <ImageIcon className="h-4 w-4 mr-2 text-blue-600" />
                Imagen
              </Button>
              <Button
                variant="ghost"
                className="text-gray-600 hover:bg-gray-100"
                onClick={() => docInputRef.current?.click()}
              >
                <FileText className="h-4 w-4 mr-2 text-green-600" />
                Documento
              </Button>
              <Select value={priority} onValueChange={setPriority}>
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
              disabled={!postText.trim() || !postTitle.trim() || !postType || isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Publicando..." : "Publicar"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
