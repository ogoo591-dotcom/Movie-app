"use client";

export function CategoryList({
  name,
  count,
  active = false,
  onClick = () => {},
  className = "",
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[15px] font-medium transition";
  const state = active
    ? "border-red-400 text-neutral-900"
    : "border-neutral-200 text-neutral-800 hover:border-neutral-300";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${state} ${className}`}
    >
      <span>{name}</span>
      <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold leading-none text-white">
        {count}
      </span>
    </button>
  );
}
