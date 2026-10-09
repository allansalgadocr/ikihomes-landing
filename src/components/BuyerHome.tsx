import Link from "next/link";
import type { ReactNode } from "react";
import type es from "@/dictionaries/es.json";
import { currentPhase, fillLaunch } from "@/lib/launch";
import { AGENT_PAGE_URL, BUYER_SITE } from "@/lib/portal";
import { BuyerNotifyForm } from "./BuyerNotifyForm";
import { CountdownFace, OpeningStage } from "./BuyerCountdown";
import { HeroFilm } from "./HeroFilm";
import { AgentVignette, ListingVignette, RequestVignette, VisitVignette } from "./BuyerVignettes";
import { IconCheck, IconHeart, IconMap, IconReview } from "./Icons";

type BuyerDict = typeof es.buyer;

const PRIVACY_HREF = "/es/privacy";

/** Puts the privacy link where a deck string says {privacy_link}. */
function withPrivacyLink(text: string, label: string): ReactNode {
  const parts = text.split("{privacy_link}");
  if (parts.length === 1) return text;
  return (
    <>
      {parts[0]}
      <Link href={PRIVACY_HREF}>{label}</Link>
      {parts[1]}
    </>
  );
}

const FEATURE_ICONS = [IconMap, IconHeart, IconReview];

/**
 * The Spanish home: a teaser for people looking to buy or rent until the
 * opening, the open buyer page from it on. Both states are in the markup with
 * data-when="pre" or "open", and the phase on <html> picks one, so the page
 * turns at the hour without a deploy and a tab left open turns at zero.
 *
 * Built to the approved mockup (landing-compradores/mockup.html, hero angle A)
 * with the strings of the copy deck, keyed under `buyer` in es.json.
 */
export function BuyerHome({ dict }: { dict: BuyerDict }) {
  const { hero, countdown, trust, benefits, bpm, manifesto, agent_door, notify, closing, faq, vignettes } = dict;
  const face = {
    ...countdown,
    date_line: fillLaunch(countdown.date_line),
    noscript: fillLaunch(countdown.noscript),
  };
  const [statement, ...answer] = manifesto.headline.split(/(?<=\.) /);
  const gains = [
    <ListingVignette key="listing" copy={vignettes.listing} />,
    <AgentVignette key="agent" copy={vignettes.agent} />,
    <VisitVignette key="visit" copy={vignettes.visit} />,
  ];

  return (
    <main className="buyer-home">
      <section className="band hero hero-buyer" id="top">
        <div className="wrap">
          <div className="hero-head">
            <div>
              <h1>
                <span data-when="pre">{hero.a.headline_pre}</span>
                <span data-when="open">{hero.a.headline_open}</span>
              </h1>
            </div>
            <div>
              <p className="lede" data-when="pre">{hero.a.lede_pre}</p>
              <p className="lede" data-when="open">{hero.a.lede_open}</p>
              <div className="cta-row" data-when="pre">
                <a className="btn btn-primary" href="#aviso">{hero.a.cta_primary_pre}</a>
                {/* The secondary action is a quiet link, never a second button. */}
                <a className="cta-link" href="#cambia">{hero.a.cta_secondary_pre}</a>
              </div>
              <div className="cta-row" data-when="open">
                <a className="btn btn-primary" href={BUYER_SITE.search}>{hero.a.cta_primary_open}</a>
                <a className="cta-link" href={BUYER_SITE.findForMe}>{hero.a.cta_secondary_open}</a>
              </div>
              <p className="p-note" data-when="pre">{hero.note_pre}</p>
            </div>
          </div>

          <OpeningStage announcement={countdown.done_title}>
            <div className="opening-body opening-countdown">
              <CountdownFace copy={face} />
            </div>
            <div className="opening-body opening-done">
              <p className="opening-done-title">{countdown.done_title}</p>
              <a className="btn btn-onband" href={BUYER_SITE.search}>{countdown.done_cta}</a>
            </div>
            <HeroFilm label={hero.film_toggle} serverPhase={currentPhase()} />
          </OpeningStage>

          <div className="trust-row">
            {trust.items.map((item) => (
              <span key={item}>
                <IconCheck />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="band bg-surface" id="cambia">
        <div className="wrap">
          <h2 className="sec-title">{benefits.title}</h2>
          <div className="gains">
            {benefits.items.slice(0, 3).map((item, i) => (
              <article className="gain" key={item.title}>
                <div className="gain-media" aria-hidden="true">{gains[i]}</div>
                <div className="gain-body">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="feat">
            {benefits.items.slice(3).map((item, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <div key={item.title}>
                  <Icon className="ico" />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="band" id="busca-por-mi">
        <div className="wrap bpm-grid">
          <div className="bpm-copy">
            {/* Kept as a label: it names the feature the band is about. */}
            <p className="kicker">{bpm.eyebrow}</p>
            <h2>{bpm.headline}</h2>
            <p className="lede">{bpm.body}</p>
            <div className="steps steps-col">
              {bpm.steps.map((step, i) => (
                <div className="step" data-n={i + 1} key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              ))}
            </div>
            <div className="bpm-actions">
              <a className="btn btn-primary" data-when="pre" href="#aviso">{bpm.cta_pre}</a>
              <a className="btn btn-primary" data-when="open" href={BUYER_SITE.findForMe}>{bpm.cta_open}</a>
              <span className="bpm-reassure">{bpm.reassurance}</span>
            </div>
            <p className="bpm-note">{bpm.coverage_note}</p>
          </div>
          <div className="bpm-visual" aria-hidden="true">
            <RequestVignette copy={vignettes.request} />
            {/* Quoted exactly as the product shows it. */}
            <div className="pv pv-radar">
              <p className="pv-radar-line">{bpm.status_line}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="band manifesto">
        <div className="wrap">
          <h2>
            <span>{statement}</span> <span className="accent">{answer.join(" ")}</span>
          </h2>
          <p className="manifesto-body">{manifesto.body}</p>
          {/* Quieter than the statement: a hairline, small type, a ghost button. */}
          <div className="agent-door">
            <div>
              <p className="agent-door-line">{agent_door.line}</p>
            </div>
            <a className="btn btn-onband-ghost" href={AGENT_PAGE_URL}>{agent_door.cta}</a>
          </div>
        </div>
      </section>

      <section className="band bg-surface" id="preguntas">
        <div className="wrap">
          <h2 className="sec-title">{faq.title}</h2>
          <div className="faq">
            {faq.items.map((item, i) => (
              <details key={item.q} open={i === 0}>
                <summary>{item.q}</summary>
                <p>{withPrivacyLink(item.a, faq.privacy_link_label)}</p>
                {item.link_label && (
                  <p>
                    <a href={AGENT_PAGE_URL}>{item.link_label}</a>
                  </p>
                )}
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="signup" id="aviso" data-notify>
        <div className="wrap">
          <div className="signup-copy">
            <h2>{notify.title}</h2>
            <p className="lede">{fillLaunch(notify.lede)}</p>
            <CountdownFace copy={face} compact />
          </div>
          <BuyerNotifyForm
            copy={{
              email_label: notify.email_label,
              email_placeholder: notify.email_placeholder,
              submit: notify.submit,
              submit_pending: notify.submit_pending,
              micro: withPrivacyLink(notify.micro, notify.privacy_link_label),
              success_title: notify.success_title,
              success_msg: fillLaunch(notify.success_msg),
              error_email: notify.error_email,
              error_generic: notify.error_generic,
            }}
          />
        </div>
      </section>

      <section className="band final" data-closing>
        <div className="wrap">
          <h2>{closing.title_open}</h2>
          <p>{closing.lede_open}</p>
          <div className="cta-row">
            <a className="btn btn-onband" href={BUYER_SITE.search}>{closing.cta_primary_open}</a>
            <a className="btn btn-onband-ghost" href={BUYER_SITE.findForMe}>{closing.cta_secondary_open}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
