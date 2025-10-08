export default function Loader({
  size = 48, 
  color = "bg-blue-600", 
  pulseColor = "bg-blue-400", 
  fullscreen = false, 
  message = "", 
}) {
  const wrapperClasses = fullscreen
    ? "fixed inset-0 flex flex-col items-center justify-center bg-black/30 z-50"
    : "flex flex-col items-center justify-center";

  return (
    <div className={wrapperClasses}>
      <span
        className="relative flex"
        style={{ width: size, height: size }}
      >
        <span
          className={`animate-ping absolute inline-flex rounded-full opacity-75 ${pulseColor}`}
          style={{ width: size, height: size }}
        ></span>

        <span
          className={`relative inline-flex rounded-full ${color}`}
          style={{ width: size, height: size }}
        ></span>
      </span>

      {message && (
        <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
          {message}
        </p>
      )}
    </div>
  );
}
