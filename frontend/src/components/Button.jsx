export function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-md bg-emerald-500 px-4 text-sm font-semibold text-black transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
