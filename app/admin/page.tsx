"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
export default function Admin() {
  return (
    <div>
      <h1>Admin</h1>
      <p>This is the protected admin dashboard restricted to users with the `admin` role.</p>
      <Link href="/admin/set-user-role">
        <Button>  Set Permissions </Button>
      </Link>
    </div>
  )
}