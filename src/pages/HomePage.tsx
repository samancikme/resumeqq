import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { FileText, BookUser, Zap, Download, ArrowRight, Star } from 'lucide-react'

export function HomePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50 pointer-events-none" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4 pointer-events-none" />

                <div className="relative container mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-32">
                    <div className="flex flex-col items-center text-center gap-8">
                        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5">
                            <Star className="h-3.5 w-3.5 text-indigo-500 fill-indigo-500" />
                            <span className="text-xs font-semibold text-indigo-600">Rezyume hám Obyektivka jaratıwshı</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
                            Kásiplik{' '}
                            <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">hújjetlerińizdi</span>
                            <br />onlayn jaratıń
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-500 max-w-xl leading-relaxed">
                            Jumısqa kiriw ushın eń kerekli hújjetler — zamanagóy rezyume yamasa rásmiy obyektivkanı bir neshe minutta, hesh qıynalıspastan tayyarlap, PDF formatında júklep alıń.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full max-w-md">
                            <Link
                                to="/cv-generator"
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold py-3 px-6 rounded-xl shadow-sm hover:opacity-90 transition-opacity"
                            >
                                <FileText className="h-4 w-4" /> Rezyume dúziw <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                to="/obyektivka"
                                className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold py-3 px-6 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
                            >
                                <BookUser className="h-4 w-4" /> Obyektivka dúziw
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Múmkinshilikler */}
            <section className="container mx-auto max-w-6xl px-4 sm:px-6 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Barlıq qolaylıqlar bir jerde</h2>
                    <p className="text-gray-500 max-w-md mx-auto">Kásiplik hújjetler jaratıwdıń eń jaqsı quralı</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { icon: FileText, title: 'Tayyar shablonlar', desc: 'Siz ushın arnawlı dizayndaǵı klassikalıq hám zamanagóy rezyume shablonları', color: 'text-blue-500', bg: 'bg-blue-50' },
                        { icon: Zap, title: 'Dárhal kóriw', desc: 'Maǵlıwmatlardı toltırǵan sayın nátiyjeni real waqıtta kórip barıw imkániyatı', color: 'text-violet-500', bg: 'bg-violet-50' },
                        { icon: BookUser, title: 'Obyektivka', desc: 'Mámleketlik uyımlar ushın rásmiy obyektivka hújjetin toltırıń hám onlayn saqlań', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                        { icon: Download, title: 'PDF format', desc: 'Tayyar bolǵan hújjetińizdi bir basıw menen joqarı sapalı PDF formatında júklep alıń', color: 'text-orange-500', bg: 'bg-orange-50' },
                    ].map((f, i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                            <div className={`inline-flex p-2.5 rounded-xl ${f.bg} mb-4`}>
                                <f.icon className={`h-5 w-5 ${f.color}`} />
                            </div>
                            <h3 className="text-[15px] font-semibold text-gray-800 mb-1.5">{f.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="container mx-auto max-w-6xl px-4 sm:px-6 pb-20">
                <div className="bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl px-8 py-14 text-center text-white shadow-lg shadow-indigo-200">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3">Búginnen baslań!</h2>
                    <p className="text-white/80 max-w-md mx-auto mb-8 text-sm leading-relaxed">
                        Mıńlaǵan adamlar ResumeQQ arqalı kásiplik rezyume hám obyektivkalar jaratıp, óz jumıs orınların tappaqta. Siz de sınap kóriń!
                    </p>
                    <Link to="/cv-generator" className="inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold py-3 px-8 rounded-xl hover:bg-white/95 transition-colors shadow-sm">
                        Toltırıwdı baslaw — Biypul <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>

            <footer className="border-t border-gray-200 py-8">
                <div className="container mx-auto max-w-6xl px-4 sm:px-6 text-center text-sm text-gray-400">
                    <p>© 2026 ResumeQQ. Barlıq huqıqlar qorǵalǵan.</p>
                </div>
            </footer>
        </div>
    )
}
