'use client'

import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Sayfa yolu"
      className="flex items-center gap-2 text-sm text-neutral-400 overflow-x-auto whitespace-nowrap"
      style={{ scrollbarWidth: 'none' }}
    >
      <Link href="/" className="hover:text-primary-500 transition-colors flex-shrink-0">
        Ana Sayfa
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2 flex-shrink-0">
          <svg
            aria-hidden="true"
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          {item.href ? (
            <Link href={item.href} className="hover:text-primary-500 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-neutral-700 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
