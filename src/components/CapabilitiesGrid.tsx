import { Icon } from "./Icons";

interface CapabilitiesGridProps {
  dict: {
    eyebrow: string;
    title: string;
    items: { icon: string; title: string; body: string }[];
  };
}

export function CapabilitiesGrid({ dict }: CapabilitiesGridProps) {
  return (
    <section className="band bg-brandsoft">
      <div className="wrap">
        <p className="eyebrow">{dict.eyebrow}</p>
        <h2 style={{ maxWidth: "22ch", marginBottom: 44 }}>{dict.title}</h2>
        <div className="feat">
          {dict.items.map((item) => (
            <div key={item.title}>
              <Icon name={item.icon} className="ico" />
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
