type InfoProps = {
  label: string;
  value: string | number;
};

export function Info({
  label,
  value,
}: InfoProps) {
  return (
    <div
      className="
        rounded-2xl
        border border-zinc-800
        bg-zinc-900/30
        p-4
      "
    >
      <div className="text-xs uppercase tracking-wide text-zinc-500">
        {label}
      </div>

      <div className="mt-2 text-white font-medium">
        {value}
      </div>
    </div>
  );
}