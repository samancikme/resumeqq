import { useState, useEffect } from 'react'
import type { PortfolioData, Portfolio } from '../lib/types'
import { Plus, X, User, Layers } from 'lucide-react'

interface PortfolioFormProps {
    initialData?: PortfolioData
    onSave: (data: PortfolioData) => void
}

const defaultData: PortfolioData = { fullName: '', email: '', bio: '', portfolioItems: [] }

const inp = 'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all'
const lbl = 'block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest'

function Section({ icon: Icon, title, action, children }: {
    icon: React.ElementType; title: string; action?: React.ReactNode; children: React.ReactNode
}) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="flex p-1.5 bg-indigo-50 rounded-lg">
                        <Icon className="h-4 w-4 text-indigo-500" />
                    </div>
                    <h3 className="text-[15px] font-semibold text-gray-800">{title}</h3>
                </div>
                {action}
            </div>
            {children}
        </div>
    )
}

export function PortfolioForm({ initialData, onSave }: PortfolioFormProps) {
    const [data, setData] = useState<PortfolioData>(initialData || defaultData)
    useEffect(() => { if (initialData) setData(initialData) }, [initialData])

    const set = (field: 'fullName' | 'email' | 'bio', value: string) => setData(p => ({ ...p, [field]: value }))

    const addProject = () => {
        const proj: Portfolio = { id: Date.now().toString(), title: '', description: '', category: '', imageUrl: '', link: '', technologies: [] }
        setData(p => ({ ...p, portfolioItems: [...p.portfolioItems, proj] }))
    }
    const updateProject = (id: string, field: keyof Portfolio, value: unknown) =>
        setData(p => ({ ...p, portfolioItems: p.portfolioItems.map(it => it.id === id ? { ...it, [field]: value } : it) }))
    const removeProject = (id: string) => setData(p => ({ ...p, portfolioItems: p.portfolioItems.filter(it => it.id !== id) }))
    const addTech = (id: string) => setData(p => ({ ...p, portfolioItems: p.portfolioItems.map(it => it.id === id ? { ...it, technologies: [...it.technologies, ''] } : it) }))
    const updateTech = (id: string, idx: number, val: string) => setData(p => ({ ...p, portfolioItems: p.portfolioItems.map(it => it.id === id ? { ...it, technologies: it.technologies.map((t, i) => i === idx ? val : t) } : it) }))
    const removeTech = (id: string, idx: number) => setData(p => ({ ...p, portfolioItems: p.portfolioItems.map(it => it.id === id ? { ...it, technologies: it.technologies.filter((_, i) => i !== idx) } : it) }))

    return (
        <div className="space-y-4">
            <Section icon={User} title="Personal Info">
                <div className="space-y-3">
                    <div><label className={lbl}>Full Name</label><input className={inp} value={data.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Jane Doe" /></div>
                    <div><label className={lbl}>Email</label><input className={inp} value={data.email} type="email" onChange={e => set('email', e.target.value)} placeholder="jane@email.com" /></div>
                    <div><label className={lbl}>Bio</label><textarea className={`${inp} resize-none`} value={data.bio} onChange={e => set('bio', e.target.value)} placeholder="Brief description about yourself…" rows={3} /></div>
                </div>
            </Section>

            <Section icon={Layers} title="Projects" action={
                <button onClick={addProject} className="flex items-center gap-1.5 text-xs font-semibold text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                    <Plus className="h-3.5 w-3.5" /> Add
                </button>
            }>
                <div className="space-y-3">
                    {data.portfolioItems.length === 0 && <p className="text-xs text-gray-400 text-center py-4">No projects added yet</p>}
                    {data.portfolioItems.map(project => (
                        <div key={project.id} className="border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Project</span>
                                <button onClick={() => removeProject(project.id)} className="text-gray-400 hover:text-red-400 transition-colors"><X className="h-4 w-4" /></button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div><label className={lbl}>Title</label><input className={inp} value={project.title} onChange={e => updateProject(project.id, 'title', e.target.value)} placeholder="Project Name" /></div>
                                <div><label className={lbl}>Category</label><input className={inp} value={project.category} onChange={e => updateProject(project.id, 'category', e.target.value)} placeholder="Web App" /></div>
                                <div className="col-span-2"><label className={lbl}>Description</label><textarea className={`${inp} resize-none`} value={project.description} onChange={e => updateProject(project.id, 'description', e.target.value)} placeholder="What does this project do?" rows={2} /></div>
                                <div><label className={lbl}>Image URL</label><input className={inp} value={project.imageUrl} onChange={e => updateProject(project.id, 'imageUrl', e.target.value)} placeholder="https://…" /></div>
                                <div><label className={lbl}>Project Link</label><input className={inp} value={project.link} onChange={e => updateProject(project.id, 'link', e.target.value)} placeholder="https://…" /></div>
                            </div>
                            <div>
                                <label className={lbl}>Technologies</label>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, i) => (
                                        <div key={i} className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg overflow-hidden">
                                            <input className="text-xs px-2 py-1 outline-none w-20 text-gray-700" value={tech} onChange={e => updateTech(project.id, i, e.target.value)} placeholder="React" />
                                            <button onClick={() => removeTech(project.id, i)} className="pr-2 text-gray-400 hover:text-red-400 transition-colors"><X className="h-3 w-3" /></button>
                                        </div>
                                    ))}
                                    <button onClick={() => addTech(project.id)} className="flex items-center gap-1 text-xs text-indigo-500 border border-dashed border-indigo-300 px-2 py-1 rounded-lg hover:bg-indigo-50 transition-colors">
                                        <Plus className="h-3 w-3" /> Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            <button onClick={() => onSave(data)} className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity shadow-sm shadow-indigo-200">
                Save Portfolio
            </button>
        </div>
    )
}
