import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function exportToPDF(elementId: string, filename: string): Promise<void> {
    const element = document.getElementById(elementId)
    if (!element) throw new Error('Element not found')

    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true, // Enable logging temporarily to help debug if it continues failing
        backgroundColor: '#ffffff',
        windowWidth: 800,
        onclone: (document) => {
            const el = document.getElementById(elementId)
            if (el) {
                el.style.width = '800px'
                el.style.minWidth = '800px'
                el.style.maxWidth = '800px'
                el.style.margin = '0'
                el.style.padding = '32px'
                el.style.boxShadow = 'none'
                el.style.transform = 'none'
            }
        }
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)

    // Handle mobile in-app browsers blocking downloads (e.g. Telegram/Instagram/Facebook)
    // Most mobile browsers support navigator.share with files
    if (navigator.share && navigator.canShare) {
        const blob = pdf.output('blob')
        const file = new File([blob], `${filename}.pdf`, { type: 'application/pdf' })

        if (navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    files: [file],
                    title: filename,
                })
                return // User successfully shared/saved it
            } catch (err: any) {
                // If user just cancelled the share sheet, return normally
                if (err.name === 'AbortError') return
                // Otherwise fallthrough to standard save method
                console.error('Share API failed:', err)
            }
        }
    }

    // Standard download fallback
    pdf.save(`${filename}.pdf`)
}
