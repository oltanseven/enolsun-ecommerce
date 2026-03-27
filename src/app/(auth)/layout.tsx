import { redirect } from 'next/navigation'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  if (process.env.MAINTENANCE_MODE === 'true') {
    redirect('/maintenance')
  }
  return <>{children}</>
}
