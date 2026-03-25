export default function ProductDetailLoading() {
  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-4 bg-neutral-100 rounded w-56 animate-pulse mb-6" />
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-6">
          <div className="space-y-4">
            <div className="w-full aspect-square bg-neutral-100 rounded-2xl animate-pulse" />
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-neutral-100 animate-pulse" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-neutral-100 rounded w-24 animate-pulse" />
            <div className="h-8 bg-neutral-100 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-neutral-100 rounded w-40 animate-pulse" />
            <div className="h-10 bg-neutral-100 rounded w-32 animate-pulse" />
            <div className="h-16 bg-neutral-100 rounded animate-pulse" />
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-neutral-100 animate-pulse" />
              ))}
            </div>
            <div className="h-12 bg-neutral-100 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
