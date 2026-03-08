import { useState, useEffect } from 'react'
import { Header } from '../components/Header'
import { ObyektivkaForm } from '../components/ObyektivkaForm'
import { ObyektivkaPreview } from '../components/ObyektivkaPreview'
import type { ObyektivkaData } from '../lib/types'
import { storage } from '../lib/storage'
import { sampleObyektivkaData } from '../lib/sample-data'
import { exportToPDF } from '../lib/pdf-export'
import { Download, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { useBlocker } from 'react-router-dom'

export function ObyektivkaPage() {
    const [data, setData] = useState<ObyektivkaData>(sampleObyektivkaData)
    const [showPreview, setShowPreview] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [isDirty, setIsDirty] = useState(false)
    const [initialDataStr, setInitialDataStr] = useState('')

    // Intercept React Router navigation
    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            isDirty && currentLocation.pathname !== nextLocation.pathname
    )

    useEffect(() => {
        if (blocker.state === 'blocked') {
            const confirmLeave = window.confirm('Sizde saqlanbaǵan ózgerisler bolıwı múmkin. Rasten de shıǵıwdı qáleysiz be?')
            if (confirmLeave) blocker.proceed()
            else blocker.reset()
        }
    }, [blocker])

    useEffect(() => {
        const saved = storage.getObyektivkaData()
        if (saved) {
            setData(saved)
            setInitialDataStr(JSON.stringify(saved))
        } else {
            setInitialDataStr(JSON.stringify(sampleObyektivkaData))
        }
        setIsLoading(false)
    }, [])

    // Track dirty state based on changes from initial
    useEffect(() => {
        if (!isLoading) {
            setIsDirty(JSON.stringify(data) !== initialDataStr)
        }
    }, [data, isLoading, initialDataStr])

    // Auto-save & Warning on tab close
    useEffect(() => {
        if (!isLoading) {
            storage.saveObyektivkaData(data)
        }

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty) {
                e.preventDefault()
                e.returnValue = ''
            }
        }
        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    }, [data, isLoading, isDirty])

    const handleSave = (d: ObyektivkaData) => {
        setData(d)
        storage.saveObyektivkaData(d)
        setInitialDataStr(JSON.stringify(d))
        setIsDirty(false)
        toast.success('Obyektivka saqlandı!')
    }

    const handleExport = async () => {
        const name = [data.lastName, data.firstName].filter(Boolean).join('-') || 'obyektivka'
        try { await exportToPDF('obyektivka-preview', name); toast.success('PDF júklenip alındı!') }
        catch { toast.error('PDF júklewde qátelik júz berdi') }
    }

    if (isLoading) return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center">
                <div className="w-7 h-7 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Obyektivka jaratıwshı</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Rásmiy obyektivka hújjetińizdi toltırıń</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <button onClick={() => setShowPreview(!showPreview)}
                            className="flex items-center gap-2 text-sm font-medium text-gray-600 border border-gray-200 bg-white px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                            {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            <span className="hidden sm:inline">{showPreview ? 'Jasırıw' : 'Kórsetiw'}</span>
                        </button>
                        <button onClick={handleExport}
                            className="flex items-center justify-center gap-2 text-sm font-semibold bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-4 py-2.5 sm:py-2 rounded-xl hover:opacity-90 transition-opacity shadow-sm shadow-indigo-200 flex-1 sm:flex-none">
                            <Download className="h-4 w-4" /> PDF júklep alıw
                        </button>
                    </div>
                </div>

                <div className={`grid gap-6 ${showPreview ? 'grid-cols-1 lg:grid-cols-[400px_1fr]' : 'grid-cols-1 max-w-2xl mx-auto'}`}>
                    <div><ObyektivkaForm initialData={data} onChange={setData} onSave={handleSave} /></div>
                    {showPreview && (
                        <div>
                            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm sticky top-20">
                                <div className="border-b border-gray-100 px-4 py-2.5 flex items-center gap-2 bg-gray-50">
                                    <div className="flex gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                    </div>
                                    <span className="text-xs text-gray-400 ml-2">
                                        {[data.lastName, data.firstName].filter(Boolean).join(' ') || 'Aldın kóriniw'} — Obyektivka
                                    </span>
                                </div>
                                <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
                                    <ObyektivkaPreview data={data} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
