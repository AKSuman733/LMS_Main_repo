import "./Skeleton.css";

export default function SkeletonTable() {
  return (
    <div className="skeleton-wrapper">
      {[1,2,3,4,5].map((item) => (
        <div
          key={item}
          className="skeleton-row"
        >
          {[1,2,3,4].map((cell) => (
            <div
              key={cell}
              className="skeleton-cell"
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}