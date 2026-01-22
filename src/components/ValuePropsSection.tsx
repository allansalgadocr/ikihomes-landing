import { 
  Squares2X2Icon, 
  UserGroupIcon, 
  SparklesIcon, 
  ChartBarIcon 
} from "@heroicons/react/24/outline";
import { FeatureCard } from "./FeatureCard";

interface ValuePropsSectionProps {
  dict: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
}

export function ValuePropsSection({ dict }: ValuePropsSectionProps) {
  const icons = [
    <Squares2X2Icon key="1" className="w-6 h-6" />,
    <UserGroupIcon key="2" className="w-6 h-6" />,
    <SparklesIcon key="3" className="w-6 h-6" />,
    <ChartBarIcon key="4" className="w-6 h-6" />,
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-arsenal">{dict.title}</h2>
          <p className="text-gray-600">
            {dict.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dict.items.map((feature, index) => (
            <FeatureCard 
              key={index} 
              icon={icons[index]} 
              title={feature.title} 
              description={feature.description} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
