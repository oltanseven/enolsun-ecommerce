import Link from 'next/link'

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 shrink-0 ${className}`}>
      <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
        <svg aria-hidden="true" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      </div>
      <span className="text-lg font-bold text-neutral-900">enolsun<span className="text-primary-500">.com</span></span>
    </Link>
  )
}
