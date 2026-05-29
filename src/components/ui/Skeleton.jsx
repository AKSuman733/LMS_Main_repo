function Skeleton({

  className = "",

}) {

  return (

    <div
      className={`
        animate-pulse

        rounded-xl

        bg-gradient-to-r

        from-slate-800
        via-slate-700
        to-slate-800

        ${className}
      `}
    />
  );
}

export default Skeleton;