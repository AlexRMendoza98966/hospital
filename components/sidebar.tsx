import { Home, Users, Megaphone, FileText, Calendar, Stethoscope, Building, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function Sidebar() {
  return (
    <aside className="hidden lg:block w-72 p-4 bg-white rounded-lg">
      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-start h-12">
          <Avatar className="h-8 w-8 mr-3">
           
          </Avatar>
          DETALLES
        </Button>

        <Button variant="ghost" className="w-full justify-start h-12 bg-blue-50 text-blue-700">
          <Home className="h-5 w-5 mr-3" />
          Inicio
        </Button>

        <Button variant="ghost" className="w-full justify-start h-12">
          <Megaphone className="h-5 w-5 mr-3 text-orange-600" />
          Anuncios
          <Badge className="ml-auto bg-orange-100 text-orange-600">5</Badge>
        </Button>

        <Button variant="ghost" className="w-full justify-start h-12">
          <FileText className="h-5 w-5 mr-3 text-blue-600" />
          Comunicados
          <Badge className="ml-auto bg-blue-100 text-blue-600">12</Badge>
        </Button>

        <Button variant="ghost" className="w-full justify-start h-12">
          <Users className="h-5 w-5 mr-3 text-green-600" />
          Convocatorias
          <Badge className="ml-auto bg-green-100 text-green-600">3</Badge>
        </Button>

        <Button variant="ghost" className="w-full justify-start h-12">
          <Calendar className="h-5 w-5 mr-3 text-purple-600" />
          Eventos
        </Button>

        <Button variant="ghost" className="w-full justify-start h-12">
          <Building className="h-5 w-5 mr-3 text-gray-600" />
          Departamentos
        </Button>
      </div>

      <hr className="my-4" />

      <div>
        <h3 className="font-semibold text-gray-600 mb-3 px-3">Departamentos</h3>
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start h-10">
            <div className="w-6 h-6 bg-red-100 rounded mr-3 flex items-center justify-center">
              <Stethoscope className="h-3 w-3 text-red-600" />
            </div>
            Cardiología
          </Button>
          <Button variant="ghost" className="w-full justify-start h-10">
            <div className="w-6 h-6 bg-blue-100 rounded mr-3 flex items-center justify-center">
              <span className="text-xs">🧠</span>
            </div>
            Neurología
          </Button>
          <Button variant="ghost" className="w-full justify-start h-10">
            <div className="w-6 h-6 bg-green-100 rounded mr-3 flex items-center justify-center">
              <span className="text-xs">👶</span>
            </div>
            Pediatría
          </Button>
          <Button variant="ghost" className="w-full justify-start h-10">
            <div className="w-6 h-6 bg-purple-100 rounded mr-3 flex items-center justify-center">
              <span className="text-xs">🏥</span>
            </div>
            Emergencias
          </Button>
        </div>
      </div>

      <hr className="my-4" />

      <div>
        <h3 className="font-semibold text-gray-600 mb-3 px-3">Acceso rápido</h3>
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start h-10">
            <Settings className="h-4 w-4 mr-3" />
            Configuración
          </Button>
        </div>
      </div>
    </aside>
  )
}
