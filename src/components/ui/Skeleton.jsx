export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
      <div className="skeleton w-full aspect-[1/1]" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-4.5 w-3/4 rounded" />
        <div className="flex items-center gap-2">
          <div className="skeleton h-4 w-20 rounded" />
          <div className="skeleton h-3.5 w-14 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <div className="skeleton h-5 w-16 rounded" />
          <div className="skeleton h-4 w-12 rounded" />
        </div>
        <div className="skeleton h-11 w-full rounded-xl" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function CategoryCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden">
      <div className="skeleton w-full aspect-[4/5]" />
    </div>
  )
}

export function CategoryGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <CategoryCardSkeleton key={i} />
      ))}
    </div>
  )
}
