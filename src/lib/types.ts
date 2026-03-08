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

// Обьективка
export interface ObyektivkaData {
    photoUrl?: string; // Súwret
    // Жеке мағлыўматлар
    lastName: string
    firstName: string
    patronymic: string
    birthDate: string
    birthPlace: string
    nationality: string
    address: string
    phone: string
    email: string
    // Билими
    education: ObyektivkaEducation[]
    // Жумыс тәжирийбеси
    workHistory: WorkHistory[]
    // Шаңарақ ағзалары
    familyMembers: FamilyMember[]
    // Сыйлықлары
    awards: string
    // Қосымша мағлыўматлар
    additionalInfo: string
}

export interface ObyektivkaEducation {
    id: string
    institution: string
    specialty: string
    startYear: string
    endYear: string
}

export interface WorkHistory {
    id: string
    organization: string
    position: string
    startDate: string
    endDate: string
    current: boolean
}

export interface FamilyMember {
    id: string
    relation: string
    fullName: string
    birthYear: string
    workplace: string
}
