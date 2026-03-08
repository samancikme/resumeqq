import type { CVData, ObyektivkaData } from './types'

export const sampleCVData: CVData = {
    fullName: 'Azizbek Mambetov',
    email: 'azizbek@email.com',
    phone: '+998 90 123 45 67',
    location: 'Nókis qalası, Qaraqalpaqstan',
    summary: '5 jıldan artıq tájiriybege iye bolǵan baǵdarlamashı. Zamanagóy web texnologiyaları boyınsha qánige.',
    experience: [
        {
            id: '1',
            company: 'IT Kompaniya',
            position: 'Aǵa baǵdarlamashı',
            startDate: '2021 jıl',
            endDate: '',
            current: true,
            description: 'Web qosımshalardı islep shıǵıw hám toparǵa basshılıq etiw.',
        },
        {
            id: '2',
            company: 'Startup',
            position: 'Baǵdarlamashı',
            startDate: '2019 jıl',
            endDate: '2021 jıl',
            current: false,
            description: 'Mobil hám web qosımshalardı jaratıw.',
        },
    ],
    education: [
        {
            id: '1',
            school: 'Nókis mámleketlik universiteti',
            degree: 'Bakalavr',
            field: 'Informatika',
            startDate: '2015',
            endDate: '2019',
            description: '',
        },
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'Docker'],
    templateId: 'classic',
}

export const sampleObyektivkaData: ObyektivkaData = {
    lastName: 'Mambetov',
    firstName: 'Azizbek',
    patronymic: 'Baxıtbekovich',
    birthDate: '15.03.1995',
    birthPlace: 'Nókis qalası, Qaraqalpaqstan Respublikası',
    nationality: 'Qaraqalpaq',
    address: 'Nókis qalası, Doslıq kóshesi 12-úy',
    phone: '+998 90 123 45 67',
    email: 'azizbek@email.com',
    education: [
        {
            id: '1',
            institution: 'Nókis mámleketlik universiteti',
            specialty: 'Informatika',
            startYear: '2015',
            endYear: '2019',
        },
    ],
    workHistory: [
        {
            id: '1',
            organization: 'IT Kompaniya',
            position: 'Aǵa baǵdarlamashı',
            startDate: '2021 jıl',
            endDate: '',
            current: true,
        },
    ],
    familyMembers: [
        {
            id: '1',
            relation: 'Zayıbı',
            fullName: 'Mambetova Aygúl',
            birthYear: '1997',
            workplace: 'Nókis 1-sanlı mektep',
        },
    ],
    awards: '',
    additionalInfo: '',
}
