function Cell({ padding = "p-6", bg = "bg-white", className = "", children }) {
  return (
    <div
      className={`flex flex-col justify-center ${bg} ${padding} ${className}`}
    >
      {children}
    </div>
  );
}

export default Cell;
