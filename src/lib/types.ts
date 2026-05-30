export interface CVData {
    fullName: string
    email: string
    phone: string
    location: string
    summary: string
    experience: Experience[]
    education: Education[]
    skills: string[]
    templateId: string
}

export interface Experience {
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    current: boolean
    description: string
}

export interface Education {
    id: string
    school: string
    degree: string
    field: string
    startDate: string
    endDate: string
    description: string
}
