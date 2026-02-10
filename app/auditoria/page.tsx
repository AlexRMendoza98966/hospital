"use client"

import { NavigationBar } from "../../components/navigation-bar/navigation-bar";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { Eye, Download } from "lucide-react";
import AddAuditoriaModal from "./AddAuditoriaModal";
import { getAuditorias } from "./actions";

interface Report {
    id: number;
    fecha: string;
    titulo: string;
    archivo: string;
}

export default function AuditoriaPage() {
    const { user } = useAuth();
    const [reports, setReports] = useState<Report[]>([]);

    useEffect(() => {
        // Cargar datos reales desde el Server Action
        getAuditorias().then(data => {
            // Mapear los datos si es necesario para asegurar compatibilidad con la interfaz
            const mappedData: Report[] = data.map((item: any) => ({
                id: item.id,
                fecha: item.fecha,
                titulo: item.titulo,
                archivo: item.archivo
            }));
            setReports(mappedData);
        });
    }, []); // Se ejecuta solo al montar

    return (
        <>
            <NavigationBar />
            <div className="max-w-6xl mx-auto py-12 px-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-900">Auditoría</h1>
                    {/* Componente Modal que maneja su propia visibilidad según el rol */}
                    <AddAuditoriaModal />
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-200">
                                    <th className="py-4 px-6 font-semibold text-gray-700 w-1/4">Fecha de publicación</th>
                                    <th className="py-4 px-6 font-semibold text-gray-700 w-1/2">PUBLICACIÓN DE INFORMES</th>
                                    <th className="py-4 px-6 font-semibold text-gray-700 w-1/4 text-center">Visualizar / Descargar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report) => (
                                    <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6 text-gray-800">{report.fecha}</td>
                                        <td className="py-4 px-6 text-gray-800 font-medium">{report.titulo}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex justify-center gap-4">
                                                <a
                                                    href={report.archivo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                                                    title="Visualizar"
                                                >
                                                    <Eye size={20} />
                                                </a>
                                                <a
                                                    href={report.archivo}
                                                    download
                                                    className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-full transition-colors"
                                                    title="Descargar"
                                                >
                                                    <Download size={20} />
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {reports.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            No hay informes disponibles.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
