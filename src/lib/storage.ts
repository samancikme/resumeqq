import type { CVData, ObyektivkaData } from './types'

const CV_KEY = 'probuilder_cv'
const OBYEKTIVKA_KEY = 'probuilder_obyektivka'

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
    getObyektivkaData(): ObyektivkaData | null {
        try {
            const raw = localStorage.getItem(OBYEKTIVKA_KEY)
            return raw ? JSON.parse(raw) : null
        } catch {
            return null
        }
    },
    saveObyektivkaData(data: ObyektivkaData) {
        localStorage.setItem(OBYEKTIVKA_KEY, JSON.stringify(data))
    },
}
