import { useEffect, useState } from 'react'

// Internet aloqasi uzilganda pastda ogohlantirish banneri ko'rsatadi
function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  )

  useEffect(() => {
    const goOnline = () => setIsOnline(true)
    const goOffline = () => setIsOnline(false)

    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="offline_banner">
      📡 Internet aloqasi yo'q — ba'zi funksiyalar ishlamasligi mumkin
    </div>
  )
}

export default OfflineBanner
