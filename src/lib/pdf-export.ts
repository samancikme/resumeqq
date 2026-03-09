import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function exportToPDF(elementId: string, filename: string): Promise<void> {
    try {
        const element = document.getElementById(elementId)
        if (!element) throw new Error('Element not found')

        // Scroll top element temporarily to fix html2canvas clipping bugs on mobile
        const originalScroll = window.scrollY
        window.scrollTo(0, 0)

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: true,
            backgroundColor: '#ffffff',
            windowWidth: 800,
            scrollY: 0,
            onclone: (doc) => {
                const el = doc.getElementById(elementId)
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

        // Restore scroll
        window.scrollTo(0, originalScroll)

        const imgData = canvas.toDataURL('image/png')
        if (!imgData || imgData.length < 10) throw new Error('Canvas rendering failed (empty layout)')

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        })

        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)

        // Handle mobile in-app browsers blocking downloads
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
                    if (err.name === 'AbortError') return
                    console.error('Share API failed:', err)
                }
            }
        }

        // Standard download fallback
        try {
            pdf.save(`${filename}.pdf`)
        } catch (saveErr) {
            console.error('jsPDF save failed:', saveErr)
            // Ultimate fallback for strict iOS/mobile browsers: open PDF directly in browser
            window.location.href = pdf.output('datauristring')
        }

    } catch (error: any) {
        alert("PDF Qáte: " + (error?.message || error?.toString() || 'Belgisiz qátelik'))
        throw error
    }
}
