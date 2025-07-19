import { Mail, Phone, MessageSquare } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto py-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contáctanos</h3>
            <address className="not-italic">
              <p className="mb-2">C/ Mayor Subieta N° 100 , Ciudad La Paz, Bolivia</p>
              <div className="flex items-center mb-2">
                <Mail size={16} className="mr-2" />
                <a href="mailto:informacion@hospitaldelnino.gob.bo" className="hover:text-blue-400 transition-colors">
                  informacion@hospitaldelnino.gob.bo
                </a>
              </div>
              <div className="flex items-center mb-2">
                <Phone size={16} className="mr-2" />
                <span>Teléfonos: 2244057 - 2229041</span>
              </div>
              <div className="flex items-center">
                <MessageSquare size={16} className="mr-2" />
                <span>Whatsapp: (+591) 71549709</span>
              </div>
            </address>
          </div>

          {/* Copyright */}
          <div className="md:text-right">
            <h3 className="text-lg font-semibold mb-4">Hospital del Niño</h3>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Hospital del Niño Dr. Ovidio Aliagua Uría.
              <br />
              Todos los derechos reservados.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
