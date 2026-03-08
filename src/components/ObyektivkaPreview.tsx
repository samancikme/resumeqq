import type { ObyektivkaData } from '../lib/types'

interface Props { data: ObyektivkaData }

export function ObyektivkaPreview({ data }: Props) {
    const fullName = [data.lastName, data.firstName, data.patronymic].filter(Boolean).join(' ')

    return (
        <div id="obyektivka-preview" className="w-full bg-white font-sans text-sm text-gray-900 p-8">
            {/* Sarlavha */}
            <div className="text-center mb-8">
                <h1 className="text-xl font-bold uppercase tracking-widest mb-1">OBYEKTIVKA</h1>
                <div className="h-0.5 bg-gray-900 w-full mb-6" />
                {fullName && <h2 className="text-lg font-bold">{fullName}</h2>}
            </div>

            {/* Shaxsiy maǵlıwmatlar */}
            <div className="flex flex-col sm:flex-row gap-8 mb-6">
                <table className="flex-1 text-sm border-collapse">
                    <tbody>
                        {[
                            ['Tuwılǵan sánesi', data.birthDate],
                            ['Tuwılǵan jeri', data.birthPlace],
                            ['Milleti', data.nationality],
                            ['Mánzili', data.address],
                            ['Telefon', data.phone],
                            ['Elektron pochta', data.email],
                        ].filter(([, v]) => v).map(([label, value]) => (
                            <tr key={label} className="border-b border-gray-100">
                                <td className="py-2 pr-4 font-semibold text-gray-500 whitespace-nowrap w-44">{label}:</td>
                                <td className="py-2 text-gray-800">{value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {data.photoUrl && (
                    <div className="w-[120px] h-[160px] flex-shrink-0 border-2 border-gray-200 bg-gray-50 p-1">
                        <img src={data.photoUrl} alt="Súwret" className="w-full h-full object-cover" />
                    </div>
                )}
            </div>

            {/* Bilimi */}
            {data.education.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-2 mb-3">Bilimi</h3>
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs">
                                <th className="text-left font-semibold py-2 px-2">Oqıw ornı</th>
                                <th className="text-left font-semibold py-2 px-2">Qánigeligi</th>
                                <th className="text-left font-semibold py-2 px-2 whitespace-nowrap">Jılları</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.education.map(edu => (
                                <tr key={edu.id} className="border-b border-gray-100">
                                    <td className="py-2 px-2">{edu.institution}</td>
                                    <td className="py-2 px-2">{edu.specialty}</td>
                                    <td className="py-2 px-2 whitespace-nowrap">{edu.startYear}{edu.startYear && edu.endYear ? '–' : ''}{edu.endYear}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Jumıs tariyxı */}
            {data.workHistory.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-2 mb-3">Jumıs tariyxı</h3>
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs">
                                <th className="text-left font-semibold py-2 px-2">Shólkem/Kárxana</th>
                                <th className="text-left font-semibold py-2 px-2">Lawazımı</th>
                                <th className="text-left font-semibold py-2 px-2 whitespace-nowrap">Múddeti</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.workHistory.map(w => (
                                <tr key={w.id} className="border-b border-gray-100">
                                    <td className="py-2 px-2">{w.organization}</td>
                                    <td className="py-2 px-2">{w.position}</td>
                                    <td className="py-2 px-2 whitespace-nowrap">
                                        {w.startDate}{w.startDate ? ' – ' : ''}{w.current ? 'Házirgi waqıtta' : w.endDate}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Shańaraq aǵzaları */}
            {data.familyMembers.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-2 mb-3">Shańaraq aǵzaları</h3>
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs">
                                <th className="text-left font-semibold py-2 px-2">Tuwısqanlıǵı</th>
                                <th className="text-left font-semibold py-2 px-2">Atı-jóni</th>
                                <th className="text-left font-semibold py-2 px-2">Tuwılǵan jılı</th>
                                <th className="text-left font-semibold py-2 px-2">Jumıs/Oqıw ornı</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.familyMembers.map(f => (
                                <tr key={f.id} className="border-b border-gray-100">
                                    <td className="py-2 px-2">{f.relation}</td>
                                    <td className="py-2 px-2">{f.fullName}</td>
                                    <td className="py-2 px-2 text-center">{f.birthYear}</td>
                                    <td className="py-2 px-2">{f.workplace}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Sıylıqları */}
            {data.awards && (
                <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-2 mb-3">Sıylıqları</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{data.awards}</p>
                </div>
            )}

            {/* Qosımsha */}
            {data.additionalInfo && (
                <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-2 mb-3">Qosımsha maǵlıwmatlar</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{data.additionalInfo}</p>
                </div>
            )}

            {/* Imza */}
            <div className="mt-12 flex justify-between text-sm text-gray-500">
                <div>
                    <p className="mb-8">Imza: _________________</p>
                    <p>{fullName || '___________________'}</p>
                </div>
                <div className="text-right">
                    <p>Sáne: «____» ____________ 20___ jıl</p>
                </div>
            </div>
        </div>
    )
}
