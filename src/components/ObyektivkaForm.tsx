import { useState, useEffect } from 'react'
import type { ObyektivkaData, ObyektivkaEducation, WorkHistory, FamilyMember } from '../lib/types'
import { Plus, X, User, Briefcase, GraduationCap, Users, Award, FileText, Camera } from 'lucide-react'

interface Props {
    initialData?: ObyektivkaData
    onChange?: (data: ObyektivkaData) => void
    onSave: (data: ObyektivkaData) => void
}

const defaultData: ObyektivkaData = {
    photoUrl: '',
    lastName: '', firstName: '', patronymic: '', birthDate: '', birthPlace: '',
    nationality: '', address: '', phone: '', email: '',
    education: [], workHistory: [], familyMembers: [], awards: '', additionalInfo: '',
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
                    <div className="flex p-1.5 bg-indigo-50 rounded-lg"><Icon className="h-4 w-4 text-indigo-500" /></div>
                    <h3 className="text-[15px] font-semibold text-gray-800">{title}</h3>
                </div>
                {action}
            </div>
            {children}
        </div>
    )
}

export function ObyektivkaForm({ initialData, onChange, onSave }: Props) {
    const [data, setData] = useState<ObyektivkaData>(initialData || defaultData)
    useEffect(() => { if (initialData) setData(initialData) }, [initialData])

    // Helper to update state and trigger onChange
    const updateData = (updater: (prev: ObyektivkaData) => ObyektivkaData) => {
        setData(prev => {
            const next = updater(prev)
            onChange?.(next)
            return next
        })
    }

    const set = (field: keyof ObyektivkaData, value: string) => updateData(p => ({ ...p, [field]: value }))

    // Bilimi
    const addEdu = () => updateData(p => ({ ...p, education: [...p.education, { id: Date.now().toString(), institution: '', specialty: '', startYear: '', endYear: '' }] }))
    const updateEdu = (id: string, field: keyof ObyektivkaEducation, value: string) =>
        updateData(p => ({ ...p, education: p.education.map(e => e.id === id ? { ...e, [field]: value } : e) }))
    const removeEdu = (id: string) => updateData(p => ({ ...p, education: p.education.filter(e => e.id !== id) }))

    // Jumıs tájiriybesi (tariyxı)
    const addWork = () => updateData(p => ({ ...p, workHistory: [...p.workHistory, { id: Date.now().toString(), organization: '', position: '', startDate: '', endDate: '', current: false }] }))
    const updateWork = (id: string, field: keyof WorkHistory, value: unknown) =>
        updateData(p => ({ ...p, workHistory: p.workHistory.map(w => w.id === id ? { ...w, [field]: value } : w) }))
    const removeWork = (id: string) => updateData(p => ({ ...p, workHistory: p.workHistory.filter(w => w.id !== id) }))

    // Shańaraq aǵzaları
    const addFamily = () => updateData(p => ({ ...p, familyMembers: [...p.familyMembers, { id: Date.now().toString(), relation: '', fullName: '', birthYear: '', workplace: '' }] }))
    const updateFamily = (id: string, field: keyof FamilyMember, value: string) =>
        updateData(p => ({ ...p, familyMembers: p.familyMembers.map(f => f.id === id ? { ...f, [field]: value } : f) }))
    const removeFamily = (id: string) => updateData(p => ({ ...p, familyMembers: p.familyMembers.filter(f => f.id !== id) }))

    return (
        <div className="space-y-4">
            {/* Shaxsiy maǵlıwmatlar */}
            <Section icon={User} title="Shaxsiy maǵlıwmatlar">
                <div className="space-y-3">
                    <div>
                        <label className={lbl}>Súwret (3x4)</label>
                        <div className="flex items-center gap-4">
                            {data.photoUrl ? (
                                <div className="relative h-28 w-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                    <img src={data.photoUrl} alt="Súwret" className="h-full w-full object-cover" />
                                    <button onClick={() => set('photoUrl', '')} className="absolute top-1 right-1 bg-white/90 rounded-full p-1 text-red-500 hover:bg-white shadow-sm transition-colors"><X className="h-3 w-3" /></button>
                                </div>
                            ) : (
                                <label className="flex h-28 w-20 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-indigo-300 transition-colors">
                                    <Camera className="h-6 w-6 text-gray-400 mb-1" />
                                    <span className="text-[10px] text-gray-500 font-medium">Júklew</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) {
                                            const reader = new FileReader()
                                            reader.onload = (ev) => set('photoUrl', ev.target?.result as string)
                                            reader.readAsDataURL(file)
                                        }
                                    }} />
                                </label>
                            )}
                            <div className="flex-1 text-xs text-gray-500">
                                <p>Obyektivka ushın rásmiy 3x4 formalı súwret júkleń.</p>
                                <p className="mt-1">Format: JPG, PNG. Maksimal ólshem: 2MB.</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2"><label className={lbl}>Familiyası</label><input className={inp} value={data.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Mambetov" /></div>
                        <div><label className={lbl}>Atı</label><input className={inp} value={data.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Azizbek" /></div>
                        <div><label className={lbl}>Ákesiniń atı</label><input className={inp} value={data.patronymic} onChange={e => set('patronymic', e.target.value)} placeholder="Baxıtbekovich" /></div>
                        <div><label className={lbl}>Tuwılǵan sánesi</label><input className={inp} value={data.birthDate} onChange={e => set('birthDate', e.target.value)} placeholder="15.03.1995" /></div>
                        <div><label className={lbl}>Milleti</label><input className={inp} value={data.nationality} onChange={e => set('nationality', e.target.value)} placeholder="Qaraqalpaq" /></div>
                    </div>
                    <div><label className={lbl}>Tuwılǵan jeri</label><input className={inp} value={data.birthPlace} onChange={e => set('birthPlace', e.target.value)} placeholder="Nókis qalası" /></div>
                    <div><label className={lbl}>Mánzili</label><input className={inp} value={data.address} onChange={e => set('address', e.target.value)} placeholder="Nókis qalası, Doslıq kóshesi 1" /></div>
                    <div className="grid grid-cols-2 gap-3">
                        <div><label className={lbl}>Telefon</label><input className={inp} value={data.phone} onChange={e => set('phone', e.target.value)} placeholder="+998 90 000 00 00" /></div>
                        <div><label className={lbl}>Elektron pochta</label><input className={inp} value={data.email} onChange={e => set('email', e.target.value)} placeholder="email@mail.com" /></div>
                    </div>
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
                                <button onClick={() => removeEdu(edu.id)} className="text-gray-400 hover:text-red-400"><X className="h-4 w-4" /></button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="col-span-2"><label className={lbl}>Oqıw ornı</label><input className={inp} value={edu.institution} onChange={e => updateEdu(edu.id, 'institution', e.target.value)} placeholder="NMU" /></div>
                                <div className="col-span-2"><label className={lbl}>Qánigeligi</label><input className={inp} value={edu.specialty} onChange={e => updateEdu(edu.id, 'specialty', e.target.value)} placeholder="Informatika" /></div>
                                <div><label className={lbl}>Kirgen jılı</label><input className={inp} value={edu.startYear} onChange={e => updateEdu(edu.id, 'startYear', e.target.value)} placeholder="2012" /></div>
                                <div><label className={lbl}>Pitirgen jılı</label><input className={inp} value={edu.endYear} onChange={e => updateEdu(edu.id, 'endYear', e.target.value)} placeholder="2016" /></div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Jumıs tariyxı */}
            <Section icon={Briefcase} title="Jumıs tariyxı" action={
                <button onClick={addWork} className="flex items-center gap-1.5 text-xs font-semibold text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                    <Plus className="h-3.5 w-3.5" /> Qosıw
                </button>
            }>
                <div className="space-y-3">
                    {data.workHistory.length === 0 && <p className="text-xs text-gray-400 text-center py-4">Jumıs tariyxı qosılmaǵan</p>}
                    {data.workHistory.map(w => (
                        <div key={w.id} className="border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Jazıw</span>
                                <button onClick={() => removeWork(w.id)} className="text-gray-400 hover:text-red-400"><X className="h-4 w-4" /></button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="col-span-2"><label className={lbl}>Shólkem/Kárxana</label><input className={inp} value={w.organization} onChange={e => updateWork(w.id, 'organization', e.target.value)} placeholder="Kompaniya atı" /></div>
                                <div className="col-span-2"><label className={lbl}>Lawazımı</label><input className={inp} value={w.position} onChange={e => updateWork(w.id, 'position', e.target.value)} placeholder="Aǵa qánige" /></div>
                                <div><label className={lbl}>Baslanǵan sánesi</label><input className={inp} value={w.startDate} onChange={e => updateWork(w.id, 'startDate', e.target.value)} placeholder="2020 jıl" /></div>
                                <div><label className={lbl}>Pitken sánesi</label><input className={`${inp} disabled:opacity-40`} value={w.endDate} onChange={e => updateWork(w.id, 'endDate', e.target.value)} placeholder="Házirde" disabled={w.current} /></div>
                            </div>
                            <label className="flex items-center gap-2 text-xs cursor-pointer">
                                <input type="checkbox" checked={w.current} onChange={e => updateWork(w.id, 'current', e.target.checked)} className="rounded accent-indigo-500" />
                                <span className="text-gray-500">Házirgi waqıtta islep atır</span>
                            </label>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Shańaraq aǵzaları */}
            <Section icon={Users} title="Shańaraq aǵzaları" action={
                <button onClick={addFamily} className="flex items-center gap-1.5 text-xs font-semibold text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                    <Plus className="h-3.5 w-3.5" /> Qosıw
                </button>
            }>
                <div className="space-y-3">
                    {data.familyMembers.length === 0 && <p className="text-xs text-gray-400 text-center py-4">Shańaraq aǵzaları qosılmaǵan</p>}
                    {data.familyMembers.map(f => (
                        <div key={f.id} className="border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Aǵza</span>
                                <button onClick={() => removeFamily(f.id)} className="text-gray-400 hover:text-red-400"><X className="h-4 w-4" /></button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div><label className={lbl}>Tuwısqanlıq dárejesi</label><input className={inp} value={f.relation} onChange={e => updateFamily(f.id, 'relation', e.target.value)} placeholder="Zayıbı / Perzenti" /></div>
                                <div><label className={lbl}>Tuwılǵan jılı</label><input className={inp} value={f.birthYear} onChange={e => updateFamily(f.id, 'birthYear', e.target.value)} placeholder="1997" /></div>
                                <div className="col-span-2"><label className={lbl}>Tolıq atı-jóni</label><input className={inp} value={f.fullName} onChange={e => updateFamily(f.id, 'fullName', e.target.value)} placeholder="Mambetova Aygúl" /></div>
                                <div className="col-span-2"><label className={lbl}>Jumıs ornı/Oqıw ornı</label><input className={inp} value={f.workplace} onChange={e => updateFamily(f.id, 'workplace', e.target.value)} placeholder="1-sanlı mektep, muǵallim" /></div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Sıylıqlar */}
            <Section icon={Award} title="Sıylıqları hám maqtanısh jarlıqları">
                <div>
                    <textarea className={`${inp} resize-none`} value={data.awards} onChange={e => set('awards', e.target.value)} placeholder="Alǵan sıylıqlarıńız hám jarlıqlarıńızdı jazıń..." rows={3} />
                </div>
            </Section>

            {/* Qosımsha */}
            <Section icon={FileText} title="Qosımsha maǵlıwmatlar">
                <div>
                    <textarea className={`${inp} resize-none`} value={data.additionalInfo} onChange={e => set('additionalInfo', e.target.value)} placeholder="Partiya aǵzalıǵı, áskeriy xızmeti, tillerdi biliw dárejesi, t.b." rows={3} />
                </div>
            </Section>

            <button onClick={() => onSave(data)} className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity shadow-sm shadow-indigo-200">
                Obyektivkanı saqlaw
            </button>
        </div>
    )
}
