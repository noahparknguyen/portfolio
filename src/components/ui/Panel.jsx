// Defaults to a <div>, not a <section>. Both call sites (About's passport and
// Creations' book spread) already pass `as="div"` explicitly, so the old
// <section> default was dead code AND a trap: a <section> with no accessible
// name isn't exposed as a region at all, so the default would have silently
// produced an unnamed landmark. Pass `as` deliberately when a landmark is
// actually wanted, and give it a name when you do.
function Panel({ as: Tag = "div", className = "", children }) {
  return (
    <Tag className={`grid gap-0.5 border-2 border-ink bg-ink ${className}`}>
      {children}
    </Tag>
  );
}

export default Panel;
