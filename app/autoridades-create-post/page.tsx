"use client"

import { NavigationBar } from "../../components/navigation-bar/navigation-bar";

export default function AutoridadesCreatePost() {
  return (
    <>
      <NavigationBar />
      <div className="max-w-3xl px-4 py-12 mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center text-blue-900">Autoridades Institucionales</h1>
        <ul className="p-6 mb-8 bg-white divide-y divide-gray-200 rounded shadow">
          <li className="flex items-center py-6">
            <div className="flex-shrink-0 mr-6">
                <div className={`w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-2xl font-bold border-2 border-blue-300`}>
                  <span aria-label="initials" suppressHydrationWarning>DM</span>
              </div>
            </div>
            <div>
              <span className="text-lg font-bold text-blue-900">Dr. ALFREDO MANUEL MENDOZA AMATLLER</span>
              <div className="mt-1 text-sm text-gray-700">Director - Administrador</div>
              <span className="inline-block px-3 py-1 mt-2 text-xs font-semibold text-blue-700 rounded-full bg-blue-50">DIRECTOR</span>
            </div>
          </li>
          <li className="flex items-center py-6">
            <div className="flex-shrink-0 mr-6">
                <div className={`w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-2xl font-bold border-2 border-green-300`}>
                  <span aria-label="initials" suppressHydrationWarning>LM</span>
              </div>
            </div>
            <div>
              <span className="text-lg font-bold text-green-900">Lic. Lizeth Elvira Mamani Titerico</span>
              <div className="mt-1 text-sm text-gray-700">Sub-Dirección Administrativa Financiera</div>
              <span className="inline-block px-3 py-1 mt-2 text-xs font-semibold text-green-700 rounded-full bg-green-50">SUB-DIRECCIÓN ADMINISTRATIVA FINANCIERA</span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
