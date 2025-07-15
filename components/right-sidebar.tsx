import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Users, Clock } from "lucide-react"

export function RightSidebar() {
  const comunicados = [
    {
      id: 1,
      title: "Actualización de Protocolos COVID-19",
      department: "Dirección General",
      time: "1h",
      priority: "alta",
    },
    {
      id: 2,
      title: "Nuevos Horarios de Laboratorio",
      department: "Laboratorio Clínico",
      time: "3h",
      priority: "media",
    },
    {
      id: 3,
      title: "Mantenimiento Sistema Informático",
      department: "Sistemas",
      time: "5h",
      priority: "baja",
    },
  ]

  const convocatorias = [
    {
      id: 1,
      title: "Médico Internista",
      department: "Recursos Humanos",
      deadline: "25 Ene",
      applicants: 12,
    },
    {
      id: 2,
      title: "Enfermero/a UCI",
      department: "Recursos Humanos",
      deadline: "30 Ene",
      applicants: 8,
    },
    {
      id: 3,
      title: "Técnico en Radiología",
      department: "Recursos Humanos",
      deadline: "15 Feb",
      applicants: 5,
    },
  ]

  const priorityColors = {
    alta: "bg-red-100 text-red-700",
    media: "bg-yellow-100 text-yellow-700",
    baja: "bg-green-100 text-green-700",
  }

  return (
    <aside className="hidden xl:block w-80 p-4 space-y-4 bg-white rounded-lg">
      {/* Comunicados Recientes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            Comunicados Recientes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {comunicados.map((comunicado) => (
            <div key={comunicado.id} className="space-y-2">
              <div className="flex items-start justify-between">
                <h4 className="font-medium text-sm leading-tight">{comunicado.title}</h4>
                <Badge
                  variant="outline"
                  className={`text-xs ${priorityColors[comunicado.priority as keyof typeof priorityColors]}`}
                >
                  {comunicado.priority}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{comunicado.department}</span>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {comunicado.time}
                </div>
              </div>
              {comunicado.id !== comunicados.length && <hr className="mt-3" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Convocatorias Activas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Users className="h-5 w-5 mr-2 text-green-600" />
            Convocatorias Activas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {convocatorias.map((convocatoria) => (
            <div key={convocatoria.id} className="space-y-2">
              <h4 className="font-medium text-sm">{convocatoria.title}</h4>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{convocatoria.department}</span>
                <Badge variant="secondary" className="text-xs">
                  {convocatoria.applicants} postulantes
                </Badge>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                Cierra: {convocatoria.deadline}
              </div>
              {convocatoria.id !== convocatorias.length && <hr className="mt-3" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </aside>
  )
}
