import { useState, useEffect } from 'react'
import { Header } from '../components/Header'
import { CVForm } from '../components/CVForm'
import { ClassicTemplate } from '../components/cv-templates/ClassicTemplate'
import { ModernTemplate } from '../components/cv-templates/ModernTemplate'
import type { CVData } from '../lib/types'
import { storage } from '../lib/storage'
import { sampleCVData } from '../lib/sample-data'
import { exportToPDF } from '../lib/pdf-export'
import { Download, Eye, EyeOff, LayoutTemplate } from 'lucide-react'
import { toast } from 'sonner'
import { useBlocker } from 'react-router-dom'

export function CVGeneratorPage() {
    const [data, setData] = useState<CVData>(sampleCVData)
    const [template, setTemplate] = useState<'classic' | 'modern'>('classic')
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
        const saved = storage.getCVData()
        if (saved) {
            setData(saved)
            setTemplate(saved.templateId as 'classic' | 'modern')
            setInitialDataStr(JSON.stringify(saved))
        } else {
            setInitialDataStr(JSON.stringify(sampleCVData))
        }
        setIsLoading(false)
    }, [])

    // Track dirty state based on changes from initial
    useEffect(() => {
        if (!isLoading) {
            const currentData = { ...data, templateId: template }
            setIsDirty(JSON.stringify(currentData) !== initialDataStr)
        }
    }, [data, template, isLoading, initialDataStr])

    // Auto-save & Warning on tab close
    useEffect(() => {
        if (!isLoading) {
            storage.saveCVData({ ...data, templateId: template })
        }

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty) {
                e.preventDefault()
                e.returnValue = ''
            }
        }
        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    }, [data, template, isLoading, isDirty])

    const handleSave = (d: CVData) => {
        const nd = { ...d, templateId: template }
        setData(nd)
        storage.saveCVData(nd)
        setInitialDataStr(JSON.stringify(nd))
        setIsDirty(false)
        toast.success('Rezyume saqlandı!')
    }

    const handleExport = async () => {
        try { await exportToPDF('cv-preview', `${data.fullName || 'resume'}-Rezyume`); toast.success('PDF júklenip alındı!') }
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
                        <h1 className="text-2xl font-bold text-gray-900">Rezyume jaratıwshı</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Maǵlıwmatlarıńızdı toltırıń hám nátiyjeni dárhal kóriń</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                            <LayoutTemplate className="h-4 w-4 text-gray-400 ml-1.5" />
                            {([['classic', 'Klassika'], ['modern', 'Zamanagóy']] as const).map(([t, label]) => (
                                <button key={t} onClick={() => setTemplate(t)}
                                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${template === t ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                                    {label}
                                </button>
                            ))}
                        </div>
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

                <div className={`grid gap-6 ${showPreview ? 'grid-cols-1 lg:grid-cols-[380px_1fr]' : 'grid-cols-1 max-w-xl mx-auto'}`}>
                    <div><CVForm initialData={data} onChange={setData} onSave={handleSave} /></div>
                    {showPreview && (
                        <div>
                            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm sticky top-20">
                                <div className="border-b border-gray-100 px-4 py-2.5 flex items-center gap-2 bg-gray-50">
                                    <div className="flex gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                    </div>
                                    <span className="text-xs text-gray-400 ml-2">{data.fullName || 'Aldın kóriniw'} — {template === 'classic' ? 'Klassika' : 'Zamanagóy'}</span>
                                </div>
                                <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
                                    {template === 'classic' ? <ClassicTemplate data={data} /> : <ModernTemplate data={data} />}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
