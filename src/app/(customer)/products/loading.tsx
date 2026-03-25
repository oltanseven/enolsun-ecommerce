import ProductCardSkeleton from '@/components/ui/ProductCardSkeleton'

export default function ProductsLoading() {
  return (
    <>
      <div className="pt-20 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-4 bg-neutral-100 rounded w-40 animate-pulse" />
        </div>
      </div>
      <div className="pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 bg-neutral-100 rounded w-48 animate-pulse mb-2" />
          <div className="h-4 bg-neutral-100 rounded w-64 animate-pulse" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          <ProductCardSkeleton count={6} />
        </div>
      </div>
    </>
  )
}
