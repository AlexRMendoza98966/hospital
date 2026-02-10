"use client"

import { NavigationBar } from "../components/navigation-bar/navigation-bar";

export default function AutoridadesCreatePost() {
  return (
    <>
      <NavigationBar />
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">Autoridades Institucionales</h1>
        <ul className="bg-white rounded shadow p-6 mb-8 divide-y divide-gray-200">
          <li className="flex items-center py-6">
            <div className="flex-shrink-0 mr-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-2xl font-bold border-2 border-blue-300">
                DM
              </div>
            </div>
            <div>
              <span className="text-lg font-bold text-blue-900">Dr. ALFREDO MANUEL MENDOZA AMATLLER</span>
              <div className="text-sm text-gray-700 mt-1">Director - Administrador</div>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">DIRECTOR</span>
            </div>
          </li>
          <li className="flex items-center py-6">
            <div className="flex-shrink-0 mr-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-2xl font-bold border-2 border-green-300">
                LM
              </div>
            </div>
            <div>
              <span className="text-lg font-bold text-green-900">Lic. Lizeth Elvira Mamani Titerico</span>
              <div className="text-sm text-gray-700 mt-1">Sub-Dirección Administrativa Financiera</div>
              <span className="inline-block mt-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">SUB-DIRECCIÓN ADMINISTRATIVA FINANCIERA</span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
