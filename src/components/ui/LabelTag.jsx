function LabelTag({ bg = "bg-white", rotate = "", className = "", children }) {
  return (
    <span
      className={`shadow-sticker inline-block border-2 border-ink ${bg} px-3 py-1 ${rotate} ${className}`}
    >
      {children}
    </span>
  );
}

export default LabelTag;
