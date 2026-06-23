

export const LoadingSkeleton = ({ className = '', type = 'text', rows = 1 }) => {
  const baseClass = "animate-pulse bg-gray-200 rounded-[var(--radius-sm)]";
  
  if (type === 'card') {
    return (
      <div className={`p-4 border border-gray-100 rounded-[var(--radius-md)] w-full ${className}`}>
        <div className={`${baseClass} h-10 w-10 rounded-full mb-4`}></div>
        <div className={`${baseClass} h-4 w-3/4 mb-2`}></div>
        <div className={`${baseClass} h-4 w-1/2`}></div>
      </div>
    );
  }

  return (
    <div className={`space-y-3 w-full ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={`${baseClass} h-4 w-full`} style={{ opacity: 1 - (i * 0.15) }}></div>
      ))}
    </div>
  );
};
