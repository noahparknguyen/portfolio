const TONE = {
  label: "text-label",
  ink: "text-ink",
  "on-ink": "text-on-ink",
};

function Eyebrow({
  as: Tag = "h3",
  tone = "label",
  className = "",
  children,
  ...rest
}) {
  return (
    <Tag className={`eyebrow ${TONE[tone]} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

export default Eyebrow;
