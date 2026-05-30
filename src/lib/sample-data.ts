import type { CVData } from './types'

export const sampleCVData: CVData = {
    fullName: 'Жумамбетова Шахноза Инятдиновна',
    email: '',
    phone: '990994037',
    location: '',
    summary: 'Туўылған сана: 02.06.2005. НМТУ 3-курс талабасы, туггалланмаган олий билим.',
    experience: [],
    education: [
        {
            id: '1',
            school: 'НМТУ',
            degree: 'Туггалланмаган олий',
            field: '3 курс',
            startDate: '',
            endDate: '',
            description: '02.06.2005',
        },
    ],
    skills: [],
    templateId: 'classic',
}

export const cvProfiles: CVData[] = [
    sampleCVData,
    {
        fullName: 'Нзамова Бийбимаря Жамаллатдин кызы',
        email: '',
        phone: '935301218',
        location: '',
        summary: 'Туўылған сана: 22.03.2004. НМТУ 3-курс талабасы, туггалланмаган олий билим.',
        experience: [],
        education: [
            {
                id: '1',
                school: 'НМТУ',
                degree: 'Туггалланмаган олий',
                field: '3 курс',
                startDate: '',
                endDate: '',
                description: '22.03.2004',
            },
        ],
        skills: [],
        templateId: 'classic',
    },
]
