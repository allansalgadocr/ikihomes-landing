import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(
  props: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await props.params;
  const isEs = lang === "es";

  return {
    title: isEs
      ? "Política de Privacidad | IkiHomes"
      : "Privacy Policy | IkiHomes",
    description: isEs
      ? "Cómo IkiHomes recopila, usa y protege tus datos personales. Cumplimiento PRODHAB (Ley 8968), Costa Rica."
      : "How IkiHomes collects, uses, and protects your personal data. PRODHAB compliant (Ley 8968), Costa Rica.",
    alternates: {
      canonical: `/${lang}/privacy`,
      languages: {
        en: "/en/privacy",
        es: "/es/privacy",
        "x-default": "/es/privacy",
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;

  return (
    <main className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="type-heading text-3xl mb-2">Política de Privacidad</h1>
        <p className="type-body text-sm text-gray-400 mb-10">
          Última actualización: Abril 2026 · Jurisdicción: Costa Rica · Cumplimiento: PRODHAB (Ley 8968)
        </p>

        {lang === "en" && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-10">
            <p className="type-body text-sm text-gray-500">
              This privacy policy is provided in Spanish as the legally binding version under Costa Rican law.
              For questions in English, contact us at <a href="mailto:contact@ikihomescr.com" className="text-primary hover:underline">contact@ikihomescr.com</a>.
            </p>
          </div>
        )}

        <section className="mb-10">
          <h2 className="type-heading text-xl mb-4">1. Información general</h2>
          <p className="type-body text-gray-700 leading-relaxed">
            IkiHomes (&ldquo;nosotros&rdquo;, &ldquo;la Plataforma&rdquo;) opera una plataforma inmobiliaria que conecta compradores
            con agentes en Costa Rica. Esta política describe cómo recopilamos, usamos, almacenamos y protegemos
            los datos personales, en cumplimiento con la Ley 8968 de Protección de la Persona frente al Tratamiento
            de sus Datos Personales (PRODHAB).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="type-heading text-xl mb-4">2. Datos que recopilamos</h2>
          <p className="type-body text-gray-700 mb-4">
            Durante nuestra fase de pre-lanzamiento, recopilamos los siguientes datos a través de nuestro formulario de acceso anticipado:
          </p>
          <ul className="list-disc pl-5 space-y-2 type-body text-gray-700">
            <li><strong>Nombre completo:</strong> Para identificarte al contactarte sobre el acceso.</li>
            <li><strong>Correo electrónico:</strong> Para notificarte sobre el lanzamiento y actualizaciones importantes.</li>
            <li><strong>Zonas de trabajo:</strong> Para entender la cobertura geográfica de los agentes interesados.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="type-heading text-xl mb-4">3. Uso de la información</h2>
          <p className="type-body text-gray-700 mb-3">
            Utilizamos tu información exclusivamente para:
          </p>
          <ul className="list-disc pl-5 space-y-2 type-body text-gray-700">
            <li>Enviarte invitaciones de acceso a la plataforma.</li>
            <li>Notificarte sobre el lanzamiento oficial.</li>
            <li>Comunicar noticias relevantes sobre IkiHomes.</li>
            <li>Entender la demanda por zona para priorizar el lanzamiento.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="type-heading text-xl mb-4">4. Lo que NO hacemos</h2>
          <ul className="list-disc pl-5 space-y-2 type-body text-gray-700">
            <li>No vendemos, alquilamos ni intercambiamos tus datos con terceros para fines comerciales.</li>
            <li>No compartimos tu información personal con otras empresas.</li>
            <li>No enviamos spam ni publicidad no relacionada con IkiHomes.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="type-heading text-xl mb-4">5. Servicios de terceros</h2>
          <p className="type-body text-gray-700 mb-3">
            Para operar nuestro sitio de pre-lanzamiento, utilizamos los siguientes servicios:
          </p>
          <ul className="list-disc pl-5 space-y-2 type-body text-gray-700">
            <li><strong>Google Forms:</strong> Procesamiento de formularios de registro. Los datos se transmiten a servidores de Google.</li>
            <li><strong>Google Analytics:</strong> Análisis anónimo de uso del sitio (páginas visitadas, interacciones). No recopila datos personales identificables.</li>
            <li><strong>Vercel:</strong> Alojamiento del sitio web. Datos anónimos de visitantes procesados a través de CDN global.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="type-heading text-xl mb-4">6. Cookies y analítica</h2>
          <p className="type-body text-gray-700 mb-3">
            Nuestro sitio utiliza las siguientes cookies:
          </p>
          <ul className="list-disc pl-5 space-y-2 type-body text-gray-700">
            <li><strong>Google Analytics (_ga, _ga_*):</strong> Análisis de uso del sitio. Duración: 12 meses. Propósito: entender cómo los visitantes interactúan con el sitio.</li>
          </ul>
          <p className="type-body text-gray-500 text-sm mt-3">
            No utilizamos cookies de publicidad ni de seguimiento de terceros más allá de las analíticas mencionadas.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="type-heading text-xl mb-4">7. Tus derechos (PRODHAB, Ley 8968)</h2>
          <p className="type-body text-gray-700 mb-3">
            Bajo la legislación costarricense, tienes los siguientes derechos sobre tus datos personales:
          </p>
          <ul className="list-disc pl-5 space-y-2 type-body text-gray-700">
            <li><strong>Acceso:</strong> Solicitar una copia de los datos personales que tenemos sobre ti.</li>
            <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos.</li>
            <li><strong>Eliminación:</strong> Solicitar la eliminación de tus datos personales.</li>
            <li><strong>Objeción:</strong> Oponerte al tratamiento de tus datos para fines específicos.</li>
          </ul>
          <p className="type-body text-gray-700 mt-3">
            Para ejercer cualquiera de estos derechos, escribe a:
          </p>
          <p className="mt-2 type-body-semibold text-primary">contact@ikihomescr.com</p>
          <p className="type-body text-gray-500 text-sm mt-2">
            Respondemos a solicitudes de derechos dentro del plazo legalmente requerido bajo PRODHAB (5 días hábiles).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="type-heading text-xl mb-4">8. Menores de edad</h2>
          <p className="type-body text-gray-700">
            IkiHomes no está dirigido a personas menores de 18 años. No recopilamos deliberadamente datos
            personales de menores. Si descubrimos que hemos recopilado datos de un menor, los eliminaremos de inmediato.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="type-heading text-xl mb-4">9. Transferencias internacionales</h2>
          <p className="type-body text-gray-700">
            Los datos pueden ser procesados fuera de Costa Rica por nuestros proveedores de servicios (Google, Vercel).
            Estas transferencias están protegidas por acuerdos de protección de datos y cifrado en tránsito y en reposo,
            en cumplimiento con los requisitos de PRODHAB.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="type-heading text-xl mb-4">10. Cambios a esta política</h2>
          <p className="type-body text-gray-700">
            Podemos actualizar esta política para reflejar cambios en nuestras prácticas o requisitos legales.
            Los cambios materiales serán comunicados por correo electrónico a los usuarios registrados.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="type-heading text-xl mb-4">11. Autoridad reguladora</h2>
          <p className="type-body text-gray-700">
            Si consideras que tus derechos de protección de datos han sido vulnerados, puedes presentar una queja ante:
          </p>
          <p className="type-body-semibold text-gray-700 mt-2">
            PRODHAB (Agencia de Protección de Datos de los Habitantes)
          </p>
          <p className="type-body text-gray-500 text-sm">
            prodhab.go.cr · info@prodhab.go.cr
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Contacto: <a href="mailto:contact@ikihomescr.com" className="text-primary hover:underline">contact@ikihomescr.com</a>
          </p>
          <p className="mt-4">
            <Link href={`/${lang}`} className="text-primary font-medium hover:underline">
              ← {lang === "en" ? "Back to home" : "Volver al inicio"}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
