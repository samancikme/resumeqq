import type { PortfolioData } from '../lib/types'
import { Mail, ExternalLink, Globe } from 'lucide-react'

interface Props { data: PortfolioData }

export function PortfolioPreview({ data }: Props) {
    return (
        <div id="portfolio-preview" className="w-full bg-white font-sans text-gray-900">
            {/* Hero */}
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white px-8 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-white/10 text-white/70 text-xs px-3 py-1 rounded-full mb-6">
                        <Globe className="h-3 w-3" /> Portfolio
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-3">{data.fullName || 'Your Name'}</h1>
                    <p className="text-lg text-white/70 mb-6 max-w-xl leading-relaxed">{data.bio || 'Your professional bio will appear here.'}</p>
                    {data.email && (
                        <a href={`mailto:${data.email}`} className="inline-flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition-colors">
                            <Mail className="h-4 w-4" /> {data.email}
                        </a>
                    )}
                </div>
            </div>

            {/* Projects */}
            <div className="px-8 py-14 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8 text-gray-900">Featured Work</h2>
                    {data.portfolioItems.length === 0 ? (
                        <div className="text-center py-16 text-gray-400 text-sm">Add your projects to see them here</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {data.portfolioItems.map(project => (
                                <div key={project.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                                    {project.imageUrl ? (
                                        <div className="h-44 bg-gray-100 overflow-hidden">
                                            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                    ) : (
                                        <div className="h-44 bg-gradient-to-br from-indigo-50 to-violet-50 flex items-center justify-center">
                                            <span className="text-4xl font-bold text-indigo-200">{project.title?.[0] || '?'}</span>
                                        </div>
                                    )}
                                    <div className="p-5">
                                        {project.category && <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{project.category}</span>}
                                        <h3 className="text-base font-bold mt-1 mb-2 text-gray-900">{project.title || 'Untitled'}</h3>
                                        <p className="text-gray-500 text-xs leading-relaxed mb-4">{project.description}</p>
                                        {project.technologies.filter(Boolean).length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mb-4">
                                                {project.technologies.filter(Boolean).map((tech, i) => (
                                                    <span key={i} className="text-[10px] font-semibold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{tech}</span>
                                                ))}
                                            </div>
                                        )}
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                                                View Project <ExternalLink className="h-3 w-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="bg-[#1a1a2e] text-white px-8 py-8 text-center">
                <p className="text-white/40 text-sm">© 2025 {data.fullName || 'Portfolio'}. All rights reserved.</p>
            </div>
        </div>
    )
}
