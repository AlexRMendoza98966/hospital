import { Home, Users, Megaphone, FileText, Calendar, Stethoscope, Building, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function Sidebar() {
  return (
    <aside className="hidden p-4 bg-white rounded-lg lg:block w-72">
      <div className="space-y-2">
        <Button variant="ghost" className="justify-start w-full h-12">
          <Avatar className="w-8 h-8 mr-3">
           
          </Avatar>
          DETALLES
        </Button>

        <Button variant="ghost" className="justify-start w-full h-12 text-blue-700 bg-blue-50">
          <Home className="w-5 h-5 mr-3" />
          Inicio
        </Button>

        <Button variant="ghost" className="justify-start w-full h-12">
          <Megaphone className="w-5 h-5 mr-3 text-orange-600" />
          Anuncios
          <Badge className="ml-auto text-orange-600 bg-orange-100">5</Badge>
        </Button>

        <Button variant="ghost" className="justify-start w-full h-12">
          <FileText className="w-5 h-5 mr-3 text-blue-600" />
          Comunicados
          <Badge className="ml-auto text-blue-600 bg-blue-100">12</Badge>
        </Button>

        <Button variant="ghost" className="justify-start w-full h-12">
          <Users className="w-5 h-5 mr-3 text-green-600" />
          Convocatorias
          <Badge className="ml-auto text-green-600 bg-green-100">3</Badge>
        </Button>

        <Button variant="ghost" className="justify-start w-full h-12">
          <Calendar className="w-5 h-5 mr-3 text-purple-600" />
          Eventos
        </Button>

      </div>

      <hr className="my-4" />

      <div>
        <h3 className="px-3 mb-3 font-semibold text-gray-600">Departamentos</h3>
        <div className="space-y-2">
          <Button variant="ghost" className="justify-start w-full h-10">
            <div className="flex items-center justify-center w-6 h-6 mr-3 bg-red-100 rounded">
              <Stethoscope className="w-3 h-3 text-red-600" />
            </div>
            Cardiología
          </Button>
          <Button variant="ghost" className="justify-start w-full h-10">
            <div className="flex items-center justify-center w-6 h-6 mr-3 bg-blue-100 rounded">
              <span className="text-xs">🧠</span>
            </div>
            Neurología
          </Button>
          <Button variant="ghost" className="justify-start w-full h-10">
            <div className="flex items-center justify-center w-6 h-6 mr-3 bg-green-100 rounded">
              <span className="text-xs">👶</span>
            </div>
            Pediatría
          </Button>
          <Button variant="ghost" className="justify-start w-full h-10">
            <div className="flex items-center justify-center w-6 h-6 mr-3 bg-purple-100 rounded">
              <span className="text-xs">🏥</span>
            </div>
            Emergencias
          </Button>
        </div>
      </div>

      <hr className="my-4" />

      <div>
        <h3 className="px-3 mb-3 font-semibold text-gray-600">Acceso rápido</h3>
        <div className="space-y-2">
          <Button variant="ghost" className="justify-start w-full h-10">
            <Settings className="w-4 h-4 mr-3" />
            Configuración
          </Button>
        </div>
      </div>
    </aside>
  )
}
