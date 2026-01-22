export default function PrivacyPage() {
    return (
      <main className="min-h-screen bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto prose prose-gray">
          <h1 className="font-urbanist text-3xl font-bold mb-8">Política de Privacidad (Campaña de Lanzamiento)</h1>
          
          <p className="text-gray-600 mb-8">
             En IkiHomes, respetamos tu privacidad y nos comprometemos a proteger tus datos personales. 
             Esta política describe cómo manejamos la información durante nuestra fase de pre-lanzamiento.
          </p>
  
          <section className="mb-8">
            <h2 className="font-urbanist text-xl font-bold mb-4">1. Datos que recopilamos</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><strong>Correo electrónico:</strong> Para notificarte sobre el lanzamiento y actualizaciones importantes.</li>
                <li><strong>Rol (Opcional):</strong> Para entender mejor el perfil de nuestros usuarios interesados (Agente, Comprador, etc.).</li>
            </ul>
          </section>
  
          <section className="mb-8">
            <h2 className="font-urbanist text-xl font-bold mb-4">2. Uso de la información</h2>
            <p>
              Utilizamos tu información exclusivamente para:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mt-2">
                <li>Enviarte invitaciones de acceso a la plataforma.</li>
                <li>Notificarte sobre el lanzamiento oficial.</li>
                <li>Comunicar noticias relevantes sobre IkiHomes.</li>
            </ul>
          </section>
  
          <section className="mb-8">
            <h2 className="font-urbanist text-xl font-bold mb-4">3. Lo que NO hacemos</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>No vendemos tus datos a terceros.</li>
                <li>No compartimos tu correo con otras empresas.</li>
                <li>No enviamos spam ni publicidad no relacionada con IkiHomes.</li>
            </ul>
          </section>
  
          <section className="mb-8">
            <h2 className="font-urbanist text-xl font-bold mb-4">4. Tus derechos</h2>
            <p>
              Puedes solicitar la eliminación de tu correo de nuestra base de datos en cualquier momento escribiendo a:
            </p>
            <p className="mt-2 text-primary font-medium">contact@ikihomescr.com</p>
          </section>
  
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="mt-4">
                <a href="/" className="text-primary font-medium hover:underline">← Volver al inicio</a>
            </p>
          </div>
        </div>
      </main>
    );
  }
