function Pin({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`block h-4 w-4 rounded-full border-2 border-ink bg-rose ${className}`}
    >
      <span className="ml-0.5 mt-0.5 block h-1 w-1 rounded-full bg-paper" />
    </span>
  );
}

export default Pin;
