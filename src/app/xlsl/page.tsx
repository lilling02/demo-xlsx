'use client'
import { useRouter } from "next/navigation"
import { importExcelFromFile, exportExcelFile } from '@/utils/xlsx/xlsx'
import { useState } from "react"
// 引入xlsx
// import * as XLSX from 'xlsx';
export default function Home() {
    const router = useRouter()
    // 使用useState获取一个数组 数组里面存的每一项是一个字符串
    const [keys, setKeys] = useState<string[]>([])
    // 存储从excel中读取的数据
    const [data, setData] = useState<any[]>([])
    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        let file = e.target.files[0]
        let result = await importExcelFromFile(file)
        setData(result)
        console.log(result);
        // 一下是处理数据的逻辑 假设一下将数据展示在页面上
        let keysCopy: string[] = []
        result.forEach((item, index) => {
            let keysItem = Object.keys(item as Object)
            keysCopy = Array.from(new Set([...keysCopy, ...keysItem]))

        })
        console.log('keys', keysCopy);
        setKeys(keysCopy)
    }
    const handleOutputFile = () => {
        if (!data.length) return
        // 直接将我们的文件返回 这样就可以做到点击的时候直接下载了
        return exportExcelFile(data)
    }

    return (
        <main className="flex min-h-screen flex-col items-center gap-20 p-24">
            <h1 className="text-6xl font-bold">Hello xlsl</h1>
            <button className='items-center' onClick={() => { router.push('/') }}>点击返回主页</button>
            <input className='items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                type="file"
                id="file"
                onChange={(e) => { handleFile(e) }}
            />
            <button onClick={handleOutputFile}>点击下载excel</button>

            <table className="min-w-full divide-y divide-gray-200">

                <thead className="bg-gray-50">
                    <tr>
                        {keys.map(item => (
                            <th key={item} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                {item}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                    {
                        data.map((item, index) => (
                            <tr className="whitespace-nowrap" key={index}>
                                {
                                    keys.map(key => (
                                        <td className="px-6 py-4 text-sm text-gray-500 max-w-sm truncate hover:bg-blue-200" key={key}>{item[key]}</td>
                                        // <td className="px-6 py-4 text-sm text-gray-500 max-w-sm truncate hover:bg-blue-200 hover:whitespace-pre-wrap hover:overflow-visible" key={key}>{item[key]}</td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </main>
    )
}