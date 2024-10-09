'use client'

import confetti from 'canvas-confetti'
import { useState, useEffect, useCallback } from 'react'

export const useReactions = (slug, initialLikes = 0) => {
  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const localLikes = JSON.parse(localStorage.getItem(slug) || '{}')
    if (localLikes.liked) setLiked(true)
  }, [slug])

  const onLikeClick = useCallback(async () => {
    if (submitting || liked) return

    setSubmitting(true)
    setLikes((prev) => prev + 1)
    setLiked(true)

    // Simulate confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })

    localStorage.setItem(slug, JSON.stringify({ liked: true }))
    setSubmitting(false)
  }, [submitting, liked])

  return { onLikeClick, likes, liked, submitting }
}