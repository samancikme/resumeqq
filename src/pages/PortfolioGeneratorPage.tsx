import { useState, useEffect } from 'react'
import { Header } from '../components/Header'
import { PortfolioForm } from '../components/PortfolioForm'
import { PortfolioPreview } from '../components/PortfolioPreview'
import type { PortfolioData } from '../lib/types'
import { storage } from '../lib/storage'
import { samplePortfolioData } from '../lib/sample-data'
import { exportToPDF } from '../lib/pdf-export'
import { Download, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

export function PortfolioGeneratorPage() {
    const [data, setData] = useState<PortfolioData>(samplePortfolioData)
    const [showPreview, setShowPreview] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const saved = storage.getPortfolioData()
        if (saved) setData(saved)
        setIsLoading(false)
    }, [])

    const handleSave = (d: PortfolioData) => {
        setData(d); storage.savePortfolioData(d); toast.success('Portfolio saved!')
    }

    const handleExport = async () => {
        try { await exportToPDF('portfolio-preview', `${data.fullName || 'portfolio'}-Portfolio`); toast.success('Portfolio downloaded!') }
        catch { toast.error('Failed to export PDF') }
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
                        <h1 className="text-2xl font-bold text-gray-900">Portfolio Generator</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Showcase your best projects and achievements</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => setShowPreview(!showPreview)}
                            className="flex items-center gap-2 text-sm font-medium text-gray-600 border border-gray-200 bg-white px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            <span className="hidden sm:inline">{showPreview ? 'Hide' : 'Show'} Preview</span>
                        </button>
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity shadow-sm shadow-indigo-200"
                        >
                            <Download className="h-4 w-4" /> Export PDF
                        </button>
                    </div>
                </div>

                <div className={`grid gap-6 ${showPreview ? 'grid-cols-1 lg:grid-cols-[380px_1fr]' : 'grid-cols-1 max-w-xl'}`}>
                    <div><PortfolioForm initialData={data} onSave={handleSave} /></div>
                    {showPreview && (
                        <div>
                            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm sticky top-20">
                                <div className="border-b border-gray-100 px-4 py-2.5 flex items-center gap-2 bg-gray-50">
                                    <div className="flex gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                    </div>
                                    <span className="text-xs text-gray-400 ml-2">{data.fullName || 'Preview'} — portfolio</span>
                                </div>
                                <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
                                    <PortfolioPreview data={data} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
