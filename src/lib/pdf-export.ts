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

        // Generate Blob
        const blob = pdf.output('blob')
        const blobUrl = URL.createObjectURL(blob)

        // Handle mobile in-app browsers blocking downloads
        if (navigator.share && navigator.canShare) {
            const file = new File([blob], `${filename}.pdf`, { type: 'application/pdf' })

            if (navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        files: [file],
                        title: filename,
                    })
                    URL.revokeObjectURL(blobUrl)
                    return // User successfully shared/saved it
                } catch (err: any) {
                    if (err.name !== 'AbortError') console.error('Share API failed:', err)
                }
            }
        }

        // Standard Anchor Download Technique
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = blobUrl
        a.download = `${filename}.pdf`
        document.body.appendChild(a)

        // Trigger click
        a.click()

        // Cleanup
        setTimeout(() => {
            document.body.removeChild(a)
            URL.revokeObjectURL(blobUrl)
        }, 1000)

        // For extremely strict mobile browsers (like iOS Safari in some modes), also try opening in the current window after a short delay
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        if (isIOS && !navigator.share) {
            setTimeout(() => {
                window.location.href = pdf.output('datauristring')
            }, 500)
        }

    } catch (error: any) {
        alert("PDF Qáte: " + (error?.message || error?.toString() || 'Belgisiz qátelik'))
        throw error
    }
}
