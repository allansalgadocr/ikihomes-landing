import { IconArrow, IconCheck } from "./Icons";
import { PORTAL_LIVE, primaryHref, NOTIFY_ANCHOR, SUPPORT_MAILTO } from "@/lib/portal";

/**
 * ONVO card checkout is expected live at launch, so Pro becomes a normal
 * self-serve upgrade in September; SINPE and transfer stay available alongside.
 * Before launch there is no account to upgrade, so it falls back to email.
 *
 * NOTE: deploy-prod.yml still pins Payment__Provider=Manual as a safety default
 * while the ONVO keys are absent, and ProductionPaymentPostureTests reads that
 * file and fails when the line changes -- deliberately.
 */

interface PricingSectionProps {
  dict: {
    eyebrow: string; title: string; lede: string; per_month: string;
    free: {
      name: string; price: string; description: string; features: string[];
      split_agent_label: string; split_agent_value: string;
      split_owner_label: string; split_owner_value: string;
      cta: string; cta_prelaunch: string;
    };
    pro: {
      badge: string; name: string; price: string; currency_note: string;
      description: string; features: string[]; caveat: string;
      cta: string; cta_prelaunch: string;
    };
  };
  september: {
    title: string; subtitle: string;
    steps: { title: string; body: string }[]; cta: string;
  };
}

export function PricingSection({ dict, september }: PricingSectionProps) {
  const freeHref = PORTAL_LIVE ? primaryHref() : NOTIFY_ANCHOR;
  const proHref = PORTAL_LIVE ? primaryHref("/sign-up?plan=pro") : SUPPORT_MAILTO;

  return (
    <section className="band" id="precios">
      <div className="wrap">
        <p className="eyebrow">{dict.eyebrow}</p>
        <h2 style={{ maxWidth: "18ch", marginBottom: 14 }}>{dict.title}</h2>
        <p className="lede" style={{ marginBottom: 44 }}>{dict.lede}</p>

        <div className="plans">
          <div className="plan plan-free">
            <div className="plan-head"><h3>{dict.free.name}</h3></div>
            <div className="price">
              {dict.free.price}<small> {dict.per_month}</small>
            </div>
            <p style={{ fontSize: "15.5px" }}>{dict.free.description}</p>
            <ul>
              {dict.free.features.map((f) => (<li key={f}><IconCheck />{f}</li>))}
            </ul>
            <div className="split-note">
              <span><b>{dict.free.split_agent_label}</b> {dict.free.split_agent_value}</span>
              <span><b>{dict.free.split_owner_label}</b> {dict.free.split_owner_value}</span>
            </div>
            <a className="btn btn-ghost" href={freeHref}>
              {PORTAL_LIVE ? dict.free.cta : dict.free.cta_prelaunch}
            </a>
          </div>

          <div className="plan plan-pro">
            <span className="ribbon">{dict.pro.badge}</span>
            <div className="plan-head"><h3>{dict.pro.name}</h3></div>
            <div className="price">
              {dict.pro.price}<small> {dict.per_month}</small>
            </div>
            <p className="ref">{dict.pro.currency_note}</p>
            <p style={{ fontSize: "15.5px" }}>{dict.pro.description}</p>
            <ul>
              {dict.pro.features.map((f) => (<li key={f}><IconCheck />{f}</li>))}
            </ul>
            {!PORTAL_LIVE && <p className="ref">{dict.pro.caveat}</p>}
            <a className="btn btn-onband" href={proHref}>
              {PORTAL_LIVE ? dict.pro.cta : dict.pro.cta_prelaunch}
              <IconArrow />
            </a>
          </div>
        </div>

        {!PORTAL_LIVE && (
          <div className="rail">
            <div className="rail-head">
              <h3>{september.title}</h3>
              <span>{september.subtitle}</span>
            </div>
            <div className="steps">
              {september.steps.map((s, i) => (
                <div className="step" data-n={String(i + 1)} key={s.title}>
                  <h4>{s.title}</h4>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
            <a className="btn btn-primary" href={NOTIFY_ANCHOR} style={{ marginTop: 26 }}>
              {september.cta}
              <IconArrow />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
