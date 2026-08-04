import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(
  props: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await props.params;
  const isEs = lang === "es";

  return {
    title: isEs
      ? "Términos y Condiciones | IkiHomes"
      : "Terms & Conditions | IkiHomes",
    description: isEs
      ? "Términos y condiciones de uso del sitio web de IkiHomes durante la fase de pre-lanzamiento. Jurisdicción: Costa Rica."
      : "Terms and conditions for using the IkiHomes website during the pre-launch phase. Jurisdiction: Costa Rica.",
    alternates: {
      canonical: `/${lang}/terms`,
      languages: {
        en: "/en/terms",
        es: "/es/terms",
        "x-default": "/es/terms",
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function TermsPage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;

  return (
    <main className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="type-heading text-3xl mb-2">Términos y Condiciones</h1>
        <p className="type-body text-sm text-gray-400 mb-10">
          Última actualización: Abril 2026 · Jurisdicción: Costa Rica
        </p>

        {lang === "en" && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-10">
            <p className="type-body text-sm text-gray-500">
              These terms are provided in Spanish as the legally binding version under Costa Rican law.
              For questions in English, contact us at <a href="mailto:soporte@ikihomescr.com" className="text-primary hover:underline">soporte@ikihomescr.com</a>.
            </p>
          </div>
        )}

        <section className="mb-10">
          <h2 className="type-heading text-xl mb-4">1. Aviso de Pre-Lanzamiento</h2>
          <p className="type-body text-gray-700 leading-relaxed">
            IkiHomes se encuentra actualmente en etapa de desarrollo y acceso anticipado.
            El registro en nuestra lista de acceso anticipado no garantiza acceso inmediato a la plataforma
            ni a funcionalidades específicas. Los plazos de lanzamiento y características están sujetos a cambios.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="type-heading text-xl mb-4">2. Aceptación de los términos</h2>
          <p className="type-body text-gray-700 leading-relaxed">
            Al enviar el formulario de acceso anticipado, aceptas estos Términos y Condiciones y
            nuestra <Link href={`/${lang}/privacy`} className="text-primary hover:underline">Política de Privacidad</Link>.
            Si no estás de acuerdo con alguno de estos términos, no debés completar el registro.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="type-heading text-xl mb-4">3. Registro y datos</h2>
          <p className="type-body text-gray-700 leading-relaxed">
            Al registrarte en la lista de acceso anticipado, proporcionas tu nombre, correo electrónico
            y zonas de trabajo de forma voluntaria. Esta información será utilizada exclusivamente para
            los fines descritos en nuestra <Link href={`/${lang}/privacy`} className="text-primary hover:underline">Política de Privacidad</Link>.
            Eres responsable de que los datos proporcionados sean verídicos y estén actualizados.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="type-heading text-xl mb-4">4. Comunicaciones electrónicas</h2>
          <p className="type-body text-gray-700 leading-relaxed">
            Al registrarte, consientes recibir comunicaciones electrónicas de IkiHomes relacionadas con:
          </p>
          <ul className="list-disc pl-5 space-y-2 type-body text-gray-700 mt-3">
            <li>El estado de tu solicitud de acceso anticipado.</li>
            <li>Invitaciones de acceso a la plataforma.</li>
            <li>Novedades y actualizaciones relevantes sobre el lanzamiento.</li>
          </ul>
          <p className="type-body text-gray-700 leading-relaxed mt-3">
            No enviaremos publicidad de terceros ni correos no relacionados con IkiHomes.
            Podés revocar este consentimiento en cualquier momento escribiendo a <a href="mailto:soporte@ikihomescr.com" className="text-primary hover:underline">soporte@ikihomescr.com</a>.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="type-heading text-xl mb-4">5. Uso &ldquo;Tal Cual&rdquo; (As Is)</h2>
          <p className="type-body text-gray-700 leading-relaxed">
            Toda la información proporcionada en este sitio web se ofrece &ldquo;tal cual&rdquo;, sin garantías de ningún tipo,
            expresas o implícitas. IkiHomes se reserva el derecho de modificar, suspender o discontinuar cualquier
            aspecto del servicio en cualquier momento sin previo aviso.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="type-heading text-xl mb-4">6. Transición al lanzamiento</h2>
          <p className="type-body text-gray-700 leading-relaxed">
            Cuando IkiHomes lance su plataforma, los registrados en la lista de acceso anticipado serán invitados
            a crear una cuenta completa. Los datos proporcionados durante el pre-registro (nombre, correo, zonas)
            podrán ser utilizados para pre-configurar tu cuenta, sujeto a tu confirmación. No se creará ninguna
            cuenta sin tu consentimiento explícito. Al momento del lanzamiento, se aplicarán los Términos y
            Condiciones completos de la plataforma, los cuales serán notificados oportunamente.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="type-heading text-xl mb-4">7. Propiedad intelectual</h2>
          <p className="type-body text-gray-700 leading-relaxed">
            Todo el contenido de este sitio web, incluyendo pero no limitado a textos, diseños, logotipos,
            imágenes y código fuente, es propiedad de IkiHomes y está protegido por las leyes de propiedad
            intelectual de Costa Rica y tratados internacionales aplicables.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="type-heading text-xl mb-4">8. Limitación de responsabilidad</h2>
          <p className="type-body text-gray-700 leading-relaxed">
            IkiHomes no será responsable por decisiones comerciales o personales tomadas basándose en la
            información preliminar de este sitio de pre-lanzamiento. El uso del sitio web y el registro
            en la lista de acceso anticipado es bajo tu propia responsabilidad.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="type-heading text-xl mb-4">9. Edad mínima</h2>
          <p className="type-body text-gray-700 leading-relaxed">
            Debés ser mayor de 18 años para registrarte en IkiHomes. Al enviar el formulario de acceso
            anticipado, declaras que cumples con este requisito.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="type-heading text-xl mb-4">10. Jurisdicción y ley aplicable</h2>
          <p className="type-body text-gray-700 leading-relaxed">
            Estos términos se rigen por las leyes de la República de Costa Rica. Cualquier disputa será
            sometida a los tribunales competentes de Cartago, Costa Rica.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="type-heading text-xl mb-4">11. Cambios a estos términos</h2>
          <p className="type-body text-gray-700 leading-relaxed">
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán
            efectivos al publicarse en esta página con una fecha de actualización revisada. Los cambios
            materiales serán comunicados por correo electrónico a los usuarios registrados.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Contacto: <a href="mailto:soporte@ikihomescr.com" className="text-primary hover:underline">soporte@ikihomescr.com</a>
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
