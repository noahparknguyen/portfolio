function PinnedCard({
  as: Tag = "div",
  bg = "bg-white",
  padding = "p-4",
  rotate = "",
  className = "",
  children,
}) {
  return (
    <Tag
      className={`shadow-sticker border-2 border-ink ${bg} ${padding} ${rotate} ${className}`}
    >
      {children}
    </Tag>
  );
}

export default PinnedCard;
