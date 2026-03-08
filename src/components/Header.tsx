import { NavLink } from 'react-router-dom'
import { FileText, BookUser } from 'lucide-react'

export function Header() {
    const linkCls = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
            ? 'bg-indigo-50 text-indigo-600'
            : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
        }`

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md">
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
                <NavLink to="/" className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-bold text-sm shadow-sm">
                        R
                    </div>
                    <span className="font-semibold text-gray-900 text-[15px] tracking-tight">ResumeQQ</span>
                </NavLink>

                <nav className="flex items-center gap-1">
                    <NavLink to="/cv-generator" className={linkCls}>
                        <FileText className="h-4 w-4" />
                        <span className="hidden sm:inline">Rezyume</span>
                    </NavLink>
                    <NavLink to="/obyektivka" className={linkCls}>
                        <BookUser className="h-4 w-4" />
                        <span className="hidden sm:inline">Obyektivka</span>
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}
