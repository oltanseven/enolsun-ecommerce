export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center pt-20">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 mx-auto border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin" />
        <p className="text-sm text-neutral-400">Yukleniyor...</p>
      </div>
    </div>
  )
}
