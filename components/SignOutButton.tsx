'use client'
import { signOut } from "next-auth/react"

export default () => <button onClick={() => signOut({ callbackUrl: "/" })} className="px-4 py-2 bg-black text-white">Sign out</button>