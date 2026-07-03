import { useEffect } from 'react'

// Har bir sahifada brauzer tab sarlavhasini (va asosiy meta description'ni)
// yangilaydi — qo'shimcha kutubxonasiz (react-helmet-async) oddiy SEO yechimi
function useDocumentTitle(title, description) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title ? `${title} | ShopUZ` : 'ShopUZ'

    let metaDesc = document.querySelector('meta[name="description"]')
    let prevDescription = metaDesc?.getAttribute('content')

    if (description) {
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.setAttribute('name', 'description')
        document.head.appendChild(metaDesc)
      }
      metaDesc.setAttribute('content', description)
    }

    return () => {
      document.title = prevTitle
      if (metaDesc && prevDescription !== undefined) {
        metaDesc.setAttribute('content', prevDescription || '')
      }
    }
  }, [title, description])
}

export default useDocumentTitle
