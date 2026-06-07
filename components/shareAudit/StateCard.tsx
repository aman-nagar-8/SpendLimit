type StatCardProps = {
  label: string;
  value: string | number;
};

export function StatCard({
  label,
  value,
}: StatCardProps) {
  return (
    <div
      className="
        rounded-2xl
        border border-zinc-800
        bg-zinc-900/40
        p-5
        backdrop-blur-sm
      "
    >
      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}