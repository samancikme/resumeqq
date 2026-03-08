import { useState, useEffect } from 'react'
import type { CVData, Experience, Education } from '../lib/types'
import { Plus, X, User, Briefcase, GraduationCap, Wrench } from 'lucide-react'

interface CVFormProps {
    initialData?: CVData
    onChange?: (data: CVData) => void
    onSave: (data: CVData) => void
}

const defaultCVData: CVData = {
    fullName: '', email: '', phone: '', location: '', summary: '',
    experience: [], education: [], skills: [], templateId: 'classic',
}

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

export function CVForm({ initialData, onChange, onSave }: CVFormProps) {
    const [data, setData] = useState<CVData>(initialData || defaultCVData)
    const [newSkill, setNewSkill] = useState('')

    useEffect(() => { if (initialData) setData(initialData) }, [initialData])

    // Helper to update state and trigger onChange
    const updateData = (updater: (prev: CVData) => CVData) => {
        setData(prev => {
            const next = updater(prev)
            onChange?.(next)
            return next
        })
    }

    const set = (field: keyof Omit<CVData, 'experience' | 'education' | 'skills' | 'templateId'>, value: string) =>
        updateData(p => ({ ...p, [field]: value }))

    const addExp = () => updateData(p => ({
        ...p, experience: [...p.experience, { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', current: false, description: '' }]
    }))
    const updateExp = (id: string, field: keyof Experience, value: unknown) =>
        updateData(p => ({ ...p, experience: p.experience.map(e => e.id === id ? { ...e, [field]: value } : e) }))
    const removeExp = (id: string) => updateData(p => ({ ...p, experience: p.experience.filter(e => e.id !== id) }))

    const addEdu = () => updateData(p => ({
        ...p, education: [...p.education, { id: Date.now().toString(), school: '', degree: '', field: '', startDate: '', endDate: '', description: '' }]
    }))
    const updateEdu = (id: string, field: keyof Education, value: unknown) =>
        updateData(p => ({ ...p, education: p.education.map(e => e.id === id ? { ...e, [field]: value } : e) }))
    const removeEdu = (id: string) => updateData(p => ({ ...p, education: p.education.filter(e => e.id !== id) }))

    const addSkill = () => {
        if (newSkill.trim()) { updateData(p => ({ ...p, skills: [...p.skills, newSkill.trim()] })); setNewSkill('') }
    }
    const removeSkill = (i: number) => updateData(p => ({ ...p, skills: p.skills.filter((_, idx) => idx !== i) }))

    return (
        <div className="space-y-4">
            {/* Shaxsiy maǵlıwmatlar */}
            <Section icon={User} title="Shaxsiy maǵlıwmatlar">
                <div className="space-y-3">
                    <div>
                        <label className={lbl}>Tolıq atı-jóni</label>
                        <input className={inp} value={data.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Mambetov Azizbek" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={lbl}>Elektron pochta</label>
                            <input className={inp} value={data.email} type="email" onChange={e => set('email', e.target.value)} placeholder="email@mail.com" />
                        </div>
                        <div>
                            <label className={lbl}>Telefon</label>
                            <input className={inp} value={data.phone} onChange={e => set('phone', e.target.value)} placeholder="+998 90 000 00 00" />
                        </div>
                    </div>
                    <div>
                        <label className={lbl}>Mánzil</label>
                        <input className={inp} value={data.location} onChange={e => set('location', e.target.value)} placeholder="Nókis qalası" />
                    </div>
                    <div>
                        <label className={lbl}>Qısqasha maǵlıwmat</label>
                        <textarea className={`${inp} resize-none`} value={data.summary} onChange={e => set('summary', e.target.value)} placeholder="Ózińiz haqqıńızda qısqasha..." rows={3} />
                    </div>
                </div>
            </Section>

            {/* Jumıs tájiriybesi */}
            <Section icon={Briefcase} title="Jumıs tájiriybesi" action={
                <button onClick={addExp} className="flex items-center gap-1.5 text-xs font-semibold text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                    <Plus className="h-3.5 w-3.5" /> Qosıw
                </button>
            }>
                <div className="space-y-3">
                    {data.experience.length === 0 && <p className="text-xs text-gray-400 text-center py-4">Jumıs tájiriybesi qosılmaǵan</p>}
                    {data.experience.map(exp => (
                        <div key={exp.id} className="border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Jazıw</span>
                                <button onClick={() => removeExp(exp.id)} className="text-gray-400 hover:text-red-400 transition-colors"><X className="h-4 w-4" /></button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div><label className={lbl}>Shólkem/Kárxana</label><input className={inp} value={exp.company} onChange={e => updateExp(exp.id, 'company', e.target.value)} placeholder="Kompaniya atı" /></div>
                                <div><label className={lbl}>Lawazımı</label><input className={inp} value={exp.position} onChange={e => updateExp(exp.id, 'position', e.target.value)} placeholder="Aǵa baǵdarlamashı" /></div>
                                <div><label className={lbl}>Baslanǵan sánesi</label><input className={inp} value={exp.startDate} onChange={e => updateExp(exp.id, 'startDate', e.target.value)} placeholder="2022 jıl" /></div>
                                <div><label className={lbl}>Pitken sánesi</label><input className={`${inp} disabled:opacity-40`} value={exp.endDate} onChange={e => updateExp(exp.id, 'endDate', e.target.value)} placeholder="Házirde" disabled={exp.current} /></div>
                            </div>
                            <label className="flex items-center gap-2 text-xs cursor-pointer">
                                <input type="checkbox" checked={exp.current} onChange={e => updateExp(exp.id, 'current', e.target.checked)} className="rounded accent-indigo-500" />
                                <span className="text-gray-500">Házirgi waqıtta islep atır</span>
                            </label>
                            <div>
                                <label className={lbl}>Jumıs mazmunı</label>
                                <textarea className={`${inp} resize-none`} value={exp.description} onChange={e => updateExp(exp.id, 'description', e.target.value)} placeholder="Jumıs wazıypalarıńızdı túsindiriń..." rows={2} />
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Bilimi */}
            <Section icon={GraduationCap} title="Bilimi" action={
                <button onClick={addEdu} className="flex items-center gap-1.5 text-xs font-semibold text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                    <Plus className="h-3.5 w-3.5" /> Qosıw
                </button>
            }>
                <div className="space-y-3">
                    {data.education.length === 0 && <p className="text-xs text-gray-400 text-center py-4">Bilim maǵlıwmatı qosılmaǵan</p>}
                    {data.education.map(edu => (
                        <div key={edu.id} className="border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Jazıw</span>
                                <button onClick={() => removeEdu(edu.id)} className="text-gray-400 hover:text-red-400 transition-colors"><X className="h-4 w-4" /></button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="col-span-2"><label className={lbl}>Oqıw ornı</label><input className={inp} value={edu.school} onChange={e => updateEdu(edu.id, 'school', e.target.value)} placeholder="Nókis mámleketlik universiteti" /></div>
                                <div><label className={lbl}>Bilim dárejesi</label><input className={inp} value={edu.degree} onChange={e => updateEdu(edu.id, 'degree', e.target.value)} placeholder="Bakalavr" /></div>
                                <div><label className={lbl}>Qánigeligi</label><input className={inp} value={edu.field} onChange={e => updateEdu(edu.id, 'field', e.target.value)} placeholder="Informatika" /></div>
                                <div><label className={lbl}>Pitirgen jılı</label><input className={inp} value={edu.endDate} onChange={e => updateEdu(edu.id, 'endDate', e.target.value)} placeholder="2024" /></div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Kónlikpeler */}
            <Section icon={Wrench} title="Kónlikpeler">
                <div className="space-y-3">
                    <div className="flex gap-2">
                        <input className={inp} value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill()} placeholder="Kónlikpe qosıw, Enter basıń" />
                        <button onClick={addSkill} className="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-violet-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 text-xs font-medium px-3 py-1.5 rounded-full">
                                {skill}
                                <button onClick={() => removeSkill(i)} className="hover:text-red-400 transition-colors ml-0.5"><X className="h-3 w-3" /></button>
                            </span>
                        ))}
                    </div>
                </div>
            </Section>

            <button onClick={() => onSave(data)} className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity shadow-sm shadow-indigo-200">
                Rezyumeni saqlaw
            </button>
        </div>
    )
}
