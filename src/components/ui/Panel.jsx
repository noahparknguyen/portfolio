// Defaults to a <div>, not a <section>. A <section> becomes a region landmark
// only once it has an accessible name, so pass `as` deliberately when a
// landmark is wanted, and give it a name when you do.
function Panel({ as: Tag = "div", className = "", children }) {
  return (
    <Tag className={`grid gap-0.5 border-2 border-ink bg-ink ${className}`}>
      {children}
    </Tag>
  );
}

export default Panel;
