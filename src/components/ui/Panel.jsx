function Panel({ as: Tag = "section", className = "", children }) {
  return (
    <Tag className={`grid gap-0.5 border-2 border-ink bg-ink ${className}`}>
      {children}
    </Tag>
  );
}

export default Panel;
