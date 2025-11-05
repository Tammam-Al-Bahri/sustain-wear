"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
export default function Admin() {
  return (
    <div>
      <h1>Admin</h1>

      <Link href="/admin/set-user-role">
        <Button>  Set Permissions </Button>
      </Link>
    </div>
  )
}