import Image from "next/image";
import type es from "@/dictionaries/es.json";
import { IconBolt, IconCheckMark, IconChevron, IconVerified } from "./Icons";

/*
 * Small drawings of the buyer site's own screens, beside the benefits and in
 * the Buscá por mí band. They follow the approved mockup, which drew them from
 * ikihomes-web (search/PropertyHit, ui/property/PropertyContactSidebar,
 * visits/VisitSlotPicker, pages/FindHomePage). The listing, the agent and the
 * dates are samples. Every one sits inside an aria-hidden container.
 */

type Vignettes = typeof es.buyer.vignettes;

/** A search result, the way it stacks on a phone. */
export function ListingVignette({ copy }: { copy: Vignettes["listing"] }) {
  return (
    <div className="pv pv-listing">
      <span className="pv-trust"><IconBolt />{copy.badge}</span>
      <Image
        className="pv-photo"
        src="/buyer-listing-sample.jpg"
        width={760}
        height={428}
        alt=""
        sizes="330px"
      />
      <p className="pv-title">{copy.title}</p>
      <p className="pv-loc">{copy.location}</p>
      <p className="pv-specs">
        {copy.specs.map((spec) => (
          <span key={spec.label}><b>{spec.value}</b>{spec.label}</span>
        ))}
      </p>
      <p className="pv-price">{copy.price}</p>
    </div>
  );
}

/** The agent's identity row and trust badges on a listing. */
export function AgentVignette({ copy }: { copy: Vignettes["agent"] }) {
  return (
    <div className="pv pv-agent">
      <div className="pv-agent-id">
        <span className="pv-avatar">{copy.initials}</span>
        <div>
          <p className="pv-agent-name">{copy.name}</p>
          <p className="pv-agent-role">{copy.role}</p>
        </div>
      </div>
      <div className="pv-stack">
        <span className="pv-verified"><IconVerified />{copy.verified}</span>
        <span className="pv-trust"><IconBolt />{copy.response}</span>
      </div>
    </div>
  );
}

/** The visit slot picker, with a day and two times chosen. */
export function VisitVignette({ copy }: { copy: Vignettes["visit"] }) {
  return (
    <div className="pv pv-slots">
      <p className="pv-slots-title">{copy.title}</p>
      <p className="pv-hint">{copy.hint}</p>
      <div className="pv-days">
        {copy.days.map((day) => (
          <span key={day.date} className={day.on ? "pv-day is-on" : "pv-day"}>
            <small>{day.weekday}</small><b>{day.date}</b><i>{day.month}</i>
          </span>
        ))}
      </div>
      <div className="pv-times">
        {copy.times.map((time) => (
          <span key={time.label} className={time.on ? "pv-time is-on" : "pv-time"}>
            {time.label}
            {time.on && <IconCheckMark />}
          </span>
        ))}
      </div>
      <p className="pv-tz">{copy.tz}</p>
    </div>
  );
}

/** Step one of Buscá por mí. */
export function RequestVignette({ copy }: { copy: Vignettes["request"] }) {
  const field = ({ label, value }: { label: string; value: string }) => (
    <div className="pv-field">
      <b>{label}</b>
      <div className="pv-select">{value}<IconChevron /></div>
    </div>
  );

  return (
    <div className="pv pv-request">
      <p className="pv-request-title">{copy.title}</p>
      <div className="pv-seg">
        {copy.operations.map((operation) => (
          <span key={operation.label} className={operation.on ? "is-on" : undefined}>{operation.label}</span>
        ))}
      </div>
      {field(copy.type)}
      <div className="pv-fields-2">
        {field(copy.province)}
        {field(copy.canton)}
      </div>
    </div>
  );
}
