function IconButton({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex h-11 min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl border border-transparent bg-orange-600 px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-orange-500 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${className}`}
    >
      {children}
    </button>
  );
}

export default IconButton;
