'use client'

import { useState, useEffect } from 'react'

export function useChannel() {
  const [channel, setChannel] = useState<string>('default-channel')

  useEffect(() => {
    // Try to get channel from environment first
    const envChannel = process.env.NEXT_PUBLIC_DEFAULT_CHANNEL
    if (envChannel) {
      setChannel(envChannel)
      return
    }

    // For now, use a fallback channel
    // In a real app, you might want to query available channels here
    setChannel('default-channel')
  }, [])

  return channel
}
