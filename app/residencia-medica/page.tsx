"use client"

import { NavigationBar } from "../../components/navigation-bar/navigation-bar";
import { useEffect, useState, useCallback } from "react";
import { Eye, Download, FileText, Calendar, Search, Trash2, GraduationCap } from "lucide-react";
import AddResidenciaModal from "./AddResidenciaModal";
import { getResidenciasMedicas, deleteResidenciaMedica } from "./actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface Report {
    id: number;
    fecha: string;
    titulo: string;
    archivo: string;
}

export default function ResidenciaMedicaPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [filteredReports, setFilteredReports] = useState<Report[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { user, isAuthenticated } = useAuth();

    const fetchReports = useCallback(() => {
        getResidenciasMedicas().then(data => {
            const mappedData: Report[] = data.map((item: any) => ({
                id: item.id,
                fecha: item.fecha,
                titulo: item.titulo,
                archivo: item.archivo
            }));
            setReports(mappedData);
            setFilteredReports(mappedData);
        });
    }, []);

    const handleDelete = async (id: number) => {
        if (confirm("¿Estás seguro de que quieres eliminar este registro?")) {
            const res = await deleteResidenciaMedica(id);
            if (res.success) {
                fetchReports();
            } else {
                alert(res.message);
            }
        }
    };

    const handleSuccess = useCallback(() => {
        fetchReports();
    }, [fetchReports]);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    useEffect(() => {
        const results = reports.filter(report =>
            report.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.fecha.includes(searchTerm)
        );
        setFilteredReports(results);
    }, [searchTerm, reports]);

    const isAdmin = isAuthenticated && (user?.rol === 'admin' || user?.rol === 'administrador');

    return (
        <div className="min-h-screen bg-gray-50">
            <NavigationBar />

            {/* Hero Section */}
            <div className="bg-blue-900 text-white py-16 px-4">
                <div className="max-w-7xl mx-auto text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Residencia Médica
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Gestión académica y seguimiento de residentes. Información institucional y de graduados.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-12 px-4 -mt-8">

                {/* Controls & Search */}
                <div className="bg-white p-6 rounded-xl shadow-lg mb-8 flex flex-col md:flex-row gap-4 items-center justify-between border border-gray-100">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                            placeholder="Buscar registro..."
                            className="pl-10 h-11"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <AddResidenciaModal onSuccess={handleSuccess} />
                    </div>
                </div>

                {/* Grid Layout for Reports */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredReports.map((report) => (
                        <Card key={report.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-blue-500 overflow-hidden group">
                            <CardHeader className="bg-blue-50/50 pb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <GraduationCap size={24} />
                                    </div>
                                    <Badge variant="secondary" className="bg-white text-gray-500 shadow-sm border-blue-50">
                                        <Calendar className="mr-1 h-3 w-3" />
                                        {report.fecha}
                                    </Badge>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-blue-700 tracking-[0.4em] uppercase opacity-80">
                                        R E S I D E N C I A &nbsp;&nbsp; M É D I C A
                                    </p>
                                    <CardTitle className="text-xl leading-tight text-blue-950 font-bold line-clamp-2 min-h-[3.5rem]">
                                        {report.titulo}
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <a
                                        href={report.archivo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1"
                                    >
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                                            <Eye className="mr-2 h-4 w-4" /> Ver Registro
                                        </Button>
                                    </a>
                                    <div className="flex gap-3">
                                        <a
                                            href={report.archivo}
                                            download
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 sm:flex-none"
                                        >
                                            <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 px-4">
                                                <Download className="mr-2 h-4 w-4" />
                                                <span>Descargar</span>
                                            </Button>
                                        </a>
                                        {isAdmin && (
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="flex-none border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                                                onClick={() => handleDelete(report.id)}
                                                title="Eliminar registro"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredReports.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
                        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="text-gray-400 h-8 w-8" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No se encontraron registros</h3>
                        <p className="text-gray-500 mt-1">Intenta con otros términos de búsqueda.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
