export default function Button({
  disabled,
  children,
  className,
  onClick,
  type,
}) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
