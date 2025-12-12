import React from 'react'
import { useOfflineStatus } from '../hooks/useOfflineStatus.js'

export default function OfflineBanner() {
  const isOnline = useOfflineStatus()

  if (isOnline) return null

  return (
    <div
      style={{
        background: '#ffcccb',
        color: '#8b0000',
        padding: '8px 12px',
        textAlign: 'center',
        fontWeight: 600,
        fontSize: '14px',
      }}
    >
      ⚠️ You are offline. Some features may be unavailable.
    </div>
  )
}
