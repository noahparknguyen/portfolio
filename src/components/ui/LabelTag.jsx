// The white sticker that heads a board widget or a page section.
function LabelTag({ id, rotate = "", children }) {
  return (
    <div
      className={`shadow-sticker inline-block border-2 border-ink bg-white px-3 py-1 ${rotate}`}
    >
      <h3 id={id} className="text-xl font-semibold text-ink">
        {children}
      </h3>
    </div>
  );
}

export default LabelTag;
