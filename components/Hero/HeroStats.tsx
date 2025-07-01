const stats = [
  { label: "Accuracy Rate", value: "98%" },
  { label: "Faster Shopping", value: "3x" },
  { label: "AI Support", value: "24/7" },
];

const HeroStats = () => (
  <div className="flex items-center space-x-8 pt-4">
    {stats.map((stat) => (
      <div key={stat.label} className="text-center">
        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
        <div className="text-sm text-gray-600">{stat.label}</div>
      </div>
    ))}
  </div>
);

export default HeroStats;
