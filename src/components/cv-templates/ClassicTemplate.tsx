import type { CVData } from '../../lib/types'

interface Props { data: CVData }

export function ClassicTemplate({ data }: Props) {
    return (
        <div id="cv-preview" className="w-full bg-white text-gray-900 p-10 font-serif text-sm">
            <div className="mb-8 pb-6 border-b-2 border-gray-900">
                <h1 className="text-3xl font-bold tracking-tight mb-2">{data.fullName || 'Tolıq atı-jóni'}</h1>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                    {data.email && <span>{data.email}</span>}
                    {data.phone && <span>{data.phone}</span>}
                    {data.location && <span>{data.location}</span>}
                </div>
            </div>

            {data.summary && (
                <div className="mb-7">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Qısqasha maǵlıwmat</h2>
                    <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
                </div>
            )}

            {data.experience.length > 0 && (
                <div className="mb-7">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 pb-2 border-b border-gray-200">Jumıs tájiriybesi</h2>
                    <div className="space-y-5">
                        {data.experience.map(exp => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-start flex-wrap gap-1">
                                    <div><h3 className="font-bold text-gray-900">{exp.position}</h3><p className="text-sm text-gray-500 italic">{exp.company}</p></div>
                                    <span className="text-xs text-gray-400 whitespace-nowrap">{exp.startDate}{exp.startDate && ' — '}{exp.current ? 'Házirgi waqıtta' : exp.endDate}</span>
                                </div>
                                {exp.description && <p className="mt-2 text-sm text-gray-700 leading-relaxed">{exp.description}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {data.education.length > 0 && (
                <div className="mb-7">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 pb-2 border-b border-gray-200">Bilimi</h2>
                    <div className="space-y-3">
                        {data.education.map(edu => (
                            <div key={edu.id} className="flex justify-between items-start flex-wrap gap-1">
                                <div><h3 className="font-bold text-gray-900">{edu.degree}{edu.field && ` — ${edu.field}`}</h3><p className="text-sm text-gray-500 italic">{edu.school}</p></div>
                                {edu.endDate && <span className="text-xs text-gray-400">{edu.endDate}</span>}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {data.skills.length > 0 && (
                <div>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 pb-2 border-b border-gray-200">Kónlikpeler</h2>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, i) => (
                            <span key={i} className="text-xs border border-gray-300 px-2.5 py-1 rounded">{skill}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
