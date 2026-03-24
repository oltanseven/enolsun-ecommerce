export default function SellerAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-neutral-25 text-neutral-800 antialiased">
      {children}
    </div>
  )
}
