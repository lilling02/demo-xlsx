'use client'
import { useRouter } from "next/navigation"
export default function Home() {
  const router = useRouter()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Hello World</h1>
      <button className='py-2 px-4 text-blue-50 rounded bg-slate-400 hover:bg-slate-700' onClick={() => { router.push('/xlsl') }}>点击跳转到paga1</button>
    </main>
  )
}
