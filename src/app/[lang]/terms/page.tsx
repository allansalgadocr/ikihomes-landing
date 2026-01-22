export default function TermsPage() {
    return (
      <main className="min-h-screen bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto prose prose-gray">
          <h1 className="font-urbanist text-3xl font-bold mb-8">Términos y Condiciones (Pre-Lanzamiento)</h1>
          
          <p className="text-gray-600 mb-8">
             Última actualización: Enero 2026
          </p>
  
          <section className="mb-8">
            <h2 className="font-urbanist text-xl font-bold mb-4">1. Aviso de Pre-Lanzamiento</h2>
            <p>
              IkiHomes se encuentra actualmente en etapa de desarrollo y beta privada. 
              El registro en nuestra lista de espera no garantiza acceso inmediato a la plataforma ni a funcionalidades específicas.
            </p>
          </section>
  
          <section className="mb-8">
            <h2 className="font-urbanist text-xl font-bold mb-4">2. Uso "Tal Cual" (As Is)</h2>
            <p>
              Toda la información proporcionada en este sitio web se ofrece "tal cual", sin garantías de ningún tipo, expresas o implícitas.
              IkiHomes se reserva el derecho de modificar, suspender o discontinuar cualquier aspecto del servicio en cualquier momento sin previo aviso.
            </p>
          </section>
  
          <section className="mb-8">
            <h2 className="font-urbanist text-xl font-bold mb-4">3. Limitación de Responsabilidad</h2>
            <p>
              IkiHomes no será responsable por decisiones comerciales o personales tomadas basándose en la información preliminar de este sitio de pre-lanzamiento.
            </p>
          </section>
  
          <section className="mb-8">
            <h2 className="font-urbanist text-xl font-bold mb-4">4. Jurisdicción</h2>
            <p>
              Estos términos se rigen por las leyes de la República de Costa Rica.
            </p>
          </section>
  
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Contacto: <a href="mailto:contact@ikihomescr.com" className="text-primary hover:underline">contact@ikihomescr.com</a>
            </p>
            <p className="mt-4">
                <a href="/" className="text-primary font-medium hover:underline">← Volver al inicio</a>
            </p>
          </div>
        </div>
      </main>
    );
  }
