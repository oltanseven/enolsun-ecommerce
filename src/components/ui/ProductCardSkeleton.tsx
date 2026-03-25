export default function ProductCardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl md:rounded-2xl border border-neutral-100 overflow-hidden animate-pulse">
          <div className="w-full h-40 sm:h-56 bg-neutral-100" />
          <div className="p-3 md:p-4 space-y-2">
            <div className="h-3 bg-neutral-100 rounded w-16" />
            <div className="h-4 bg-neutral-100 rounded w-3/4" />
            <div className="h-3 bg-neutral-100 rounded w-24" />
            <div className="flex items-center justify-between pt-1">
              <div className="h-5 bg-neutral-100 rounded w-16" />
              <div className="w-10 h-10 bg-neutral-100 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
