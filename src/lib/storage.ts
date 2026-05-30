import type { CVData } from './types'

const CV_KEY = 'probuilder_cv'

export const storage = {
    getCVData(): CVData | null {
        try {
            const raw = localStorage.getItem(CV_KEY)
            return raw ? JSON.parse(raw) : null
        } catch {
            return null
        }
    },
    saveCVData(data: CVData) {
        localStorage.setItem(CV_KEY, JSON.stringify(data))
    },
}
