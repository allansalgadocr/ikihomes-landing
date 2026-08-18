import Image from "next/image";
import { IconArrow, IconCheck } from "./Icons";
import { PORTAL_LIVE, primaryHref, NOTIFY_ANCHOR } from "@/lib/portal";

interface PathSplitSectionProps {
  dict: {
    eyebrow: string;
    title: string;
    agent: {
      label: string; title: string; body: string;
      limit_number: string; limit_label: string; features: string[];
      cta: string; cta_prelaunch: string;
    };
    owner: {
      label: string; title: string; body: string;
      limit_number: string; limit_label: string;
      cta: string; cta_prelaunch: string; photo_alt: string;
    };
  };
}

export function PathSplitSection({ dict }: PathSplitSectionProps) {
  const agentHref = PORTAL_LIVE ? primaryHref() : NOTIFY_ANCHOR;
  const ownerHref = PORTAL_LIVE ? primaryHref("/sign-up?role=owner") : NOTIFY_ANCHOR;

  return (
    <section className="band" id="caminos">
      <div className="wrap">
        <p className="eyebrow">{dict.eyebrow}</p>
        <h2 style={{ maxWidth: "20ch", marginBottom: 44 }}>{dict.title}</h2>

        <div className="doors">
          <div className="door door-main">
            <p className="eyebrow on-band" style={{ marginBottom: 4 }}>
              {dict.agent.label}
            </p>
            <h3 style={{ fontSize: "clamp(24px,2.2vw,30px)" }}>{dict.agent.title}</h3>
            <p>{dict.agent.body}</p>
            <div className="allow">
              {dict.agent.limit_number} <small>{dict.agent.limit_label}</small>
            </div>
            <ul>
              {dict.agent.features.map((f) => (
                <li key={f}><IconCheck />{f}</li>
              ))}
            </ul>
            <a
              className="btn btn-onband"
              style={{ alignSelf: "flex-start", marginTop: 6 }}
              href={agentHref}
            >
              {PORTAL_LIVE ? dict.agent.cta : dict.agent.cta_prelaunch}
              <IconArrow />
            </a>
          </div>

          <div className="door door-alt">
            <p className="eyebrow" style={{ marginBottom: 4 }}>{dict.owner.label}</p>
            <h3 style={{ fontSize: "clamp(22px,1.9vw,26px)" }}>{dict.owner.title}</h3>
            <p>{dict.owner.body}</p>
            <div className="allow">
              {dict.owner.limit_number} <small>{dict.owner.limit_label}</small>
            </div>
            <a className="btn btn-ghost" style={{ alignSelf: "flex-start" }} href={ownerHref}>
              {PORTAL_LIVE ? dict.owner.cta : dict.owner.cta_prelaunch}
            </a>
            <div className="door-photo">
              <Image
                src="/door-lifestyle.jpg"
                alt={dict.owner.photo_alt}
                width={1100}
                height={618}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
