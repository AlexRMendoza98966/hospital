"use client"
import { useEffect } from 'react';

export default function LoginPage() {
  useEffect(() => {
    const password = document.getElementById('password')
    const background = document.getElementById('background')

    if (password && background) {
      password.addEventListener('input', (e) => {
        const input = (e.target as HTMLInputElement).value
        const length = input.length
        const blurValue = 20 - length * 2
        background.style.filter = `blur(${blurValue}px)`
      })
    }
  }, [])

  return (
    <div>
      <div className="background" id="background"></div>
      <div
        className="bg-white login-container rounded p-12 text-center shadow-md mx-auto"
        style={{ width: "100vw", maxWidth: "800px" }}
      >
        <h1 className="text-3xl font-bold mb-6 w-full text-center" style={{ minWidth: "100%" }}>
          INICIAR SESIÓN
        </h1>
      
        <div className="my-4 text-left">
          <label htmlFor="email" className="text-gray-900">Correo Electrónico:</label>
          <input
            type="text"
            className="border block w-full p-3 mt-2 rounded"
            id="email"
            placeholder="Ingrese su Correo Electrónico"
          />
        </div>

        <div className="my-4 text-left">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            className="border block w-full p-3 mt-2 rounded"
            id="password"
            placeholder="Ingrese su Contraseña"
          />
        </div>

        <button
          className="bg-black text-white py-3 mt-6 inline-block w-full rounded text-lg"
          type="submit"
        >
          Enviar
        </button>
      </div>
    </div>
  )
}
