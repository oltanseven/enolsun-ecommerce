import { redirect } from 'next/navigation'
import { MAINTENANCE_MODE } from '@/lib/config'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  if (MAINTENANCE_MODE) {
    redirect('/maintenance')
  }
  return <>{children}</>
}
