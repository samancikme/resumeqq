import type { CVData } from '../../lib/types'

interface Props { data: CVData }

export function ModernTemplate({ data }: Props) {
    return (
        <div id="cv-preview" className="w-full bg-white font-sans text-sm flex flex-col" style={{ minHeight: 800 }}>
            <div className="grid" style={{ gridTemplateColumns: '220px 1fr', flex: 1 }}>
                <div className="bg-[#1e293b] text-white p-8 flex flex-col gap-8">
                    <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">Profil</div>
                        <h1 className="text-xl font-bold leading-tight">{data.fullName || 'Tolıq atı-jóni'}</h1>
                    </div>
                    {(data.email || data.phone || data.location) && (
                        <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">Baylanıs</div>
                            <div className="space-y-1.5 text-xs text-white/70">
                                {data.email && <p className="break-all">{data.email}</p>}
                                {data.phone && <p>{data.phone}</p>}
                                {data.location && <p>{data.location}</p>}
                            </div>
                        </div>
                    )}
                    {data.skills.length > 0 && (
                        <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">Kónlikpeler</div>
                            <div className="space-y-2">
                                {data.skills.map((skill, i) => (
                                    <div key={i}>
                                        <p className="text-xs font-medium text-white/90">{skill}</p>
                                        <div className="h-px bg-white/10 mt-1 rounded-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-8 space-y-7">
                    {data.summary && (
                        <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 mb-3">Haqqımda</div>
                            <p className="text-sm text-gray-600 leading-relaxed">{data.summary}</p>
                        </div>
                    )}
                    {data.experience.length > 0 && (
                        <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 mb-4">Jumıs tájiriybesi</div>
                            <div className="space-y-5">
                                {data.experience.map(exp => (
                                    <div key={exp.id} className="border-l-2 border-indigo-100 pl-4">
                                        <div className="flex justify-between items-start flex-wrap gap-1 mb-1">
                                            <h3 className="font-bold text-gray-900">{exp.position}</h3>
                                            <span className="text-xs text-gray-400 whitespace-nowrap">{exp.startDate}{exp.startDate && ' — '}{exp.current ? 'Házirgi waqıtta' : exp.endDate}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 font-medium mb-2">{exp.company}</p>
                                        {exp.description && <p className="text-xs text-gray-600 leading-relaxed">{exp.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {data.education.length > 0 && (
                        <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 mb-4">Bilimi</div>
                            <div className="space-y-4">
                                {data.education.map(edu => (
                                    <div key={edu.id} className="border-l-2 border-indigo-100 pl-4">
                                        <div className="flex justify-between items-start flex-wrap gap-1">
                                            <div>
                                                <h3 className="font-bold text-gray-900">{edu.degree}{edu.field && ` — ${edu.field}`}</h3>
                                                <p className="text-xs text-gray-500 mt-0.5">{edu.school}</p>
                                            </div>
                                            {edu.endDate && <span className="text-xs text-gray-400">{edu.endDate}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
