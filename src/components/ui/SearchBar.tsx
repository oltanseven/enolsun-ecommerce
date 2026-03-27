'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface SearchResult {
  id: string
  name: string
  slug: string
  price: number
  discount_price: number | null
  product_images: { url: string; is_primary: boolean }[]
}

export default function SearchBar({ mobile = false, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (value: string) => {
    setQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (value.length < 2) {
      setResults([])
      setOpen(false)
      return
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      const _sb = createClient()
      const { data } = await _sb
        .from('products')
        .select('id, name, slug, price, discount_price, product_images(url, is_primary)')
        .eq('is_active', true)
        .ilike('name', `%${value}%`)
        .limit(6)

      setResults((data || []) as SearchResult[])
      setOpen(true)
      setLoading(false)
    }, 300)
  }

  const handleSelect = () => {
    setOpen(false)
    setQuery('')
    onClose?.()
  }

  const primaryImage = (images: SearchResult['product_images']) =>
    images?.find(img => img.is_primary)?.url || images?.[0]?.url

  return (
    <div ref={wrapperRef} className={`relative ${mobile ? 'w-full' : 'w-96'}`}>
      <div className="relative">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
        <input
          type="text"
          aria-label="Urun ara"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Urun, kategori veya marka ara..."
          className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-100 rounded-xl text-sm text-neutral-700 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 focus:bg-white transition-all"
          autoFocus={mobile}
        />
        {loading && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            <svg className="w-4 h-4 animate-spin text-primary-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        )}
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-100 rounded-xl shadow-align-xl z-50 overflow-hidden max-h-[70vh] overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-sm text-neutral-400">
                &ldquo;<span className="font-medium text-neutral-600">{query}</span>&rdquo; icin sonuc bulunamadi
              </p>
            </div>
          ) : (
            <>
              <p className="px-4 pt-3 pb-2 text-xs font-medium text-neutral-400">{results.length} sonuc bulundu</p>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={handleSelect}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-primary-25 transition-colors"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {primaryImage(product.product_images) ? (
                      <img src={primaryImage(product.product_images)} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-6 h-6 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z"/></svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-800 truncate">{product.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-primary-600">
                        &#8378;{(product.discount_price || product.price).toLocaleString('tr-TR')}
                      </span>
                      {product.discount_price && (
                        <span className="text-xs text-neutral-500 line-through">&#8378;{product.price.toLocaleString('tr-TR')}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
              <Link
                href={`/products?search=${encodeURIComponent(query)}`}
                onClick={handleSelect}
                className="block px-4 py-3 text-center text-sm font-medium text-primary-600 hover:bg-primary-25 border-t border-neutral-100 transition-colors"
              >
                Tum sonuclari gor &rarr;
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  )
}
