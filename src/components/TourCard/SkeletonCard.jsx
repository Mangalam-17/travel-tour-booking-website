const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md">
      <div className="skeleton h-52 w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="skeleton h-4 w-1/3 rounded" />
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="space-y-1">
            <div className="skeleton h-3 w-16 rounded" />
            <div className="skeleton h-7 w-24 rounded" />
          </div>
          <div className="skeleton h-9 w-28 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
