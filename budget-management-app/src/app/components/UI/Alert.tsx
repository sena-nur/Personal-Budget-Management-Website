interface AlertProps {
  type: "warning" | "error" | "success";
  message: string;
  onClose?: () => void;
}

export default function Alert({ type, message, onClose }: AlertProps) {
  const styles = {
    warning: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      icon: "⚠️",
    },
    error: {
      bg: "bg-red-100",
      text: "text-red-800",
      icon: "❌",
    },
    success: {
      bg: "bg-green-100",
      text: "text-green-800",
      icon: "✓",
    },
  };

  const { bg, text, icon } = styles[type];

  return (
    <div
      className={`${bg} ${text} p-4 rounded-lg flex items-start justify-between`}
    >
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <p>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Kapat"
        >
          ✕
        </button>
      )}
    </div>
  );
}
