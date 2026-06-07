type MetricProps = {
  label: string;
  value: string | number;
};

export function Metric({
  label,
  value,
}: MetricProps) {
  return (
    <div>
      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}