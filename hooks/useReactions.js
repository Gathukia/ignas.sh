'use client'

import confetti from 'canvas-confetti'
import { useCallback, useEffect, useState } from 'react'
import { useHasMounted } from './useHasMounted'
import { useWindowDimensions } from './useWindowDimensions'

const confettiOptions = {
  particleCount: 100,
  spread: 60,
  origin: { y: 0.6 },
}

// This should be replaced with your actual API call
const incrementCounter = async (slug, reaction) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(Math.floor(Math.random() * 100)), 500)
  })
}

export const useReactions = (slug, initialLikes = 0) => {
  const hasMounted = useHasMounted()
  const { width: windowWidth, height: windowHeight } = useWindowDimensions()

  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!hasMounted) return
    
    // Check if in production mode
    const isProduction = process.env.NODE_ENV === 'production'
    
    if (isProduction) {
      const data = window.localStorage.getItem(slug)
      if (data) {
        try {
          const json = JSON.parse(data)
          setLiked(json.liked ?? false)
        } catch (e) {
          console.error('Failed to parse localStorage:', e)
        }
      }
    }
    
    return () => {
      try {
        confetti.reset()
      } catch (e) {
        console.error('Confetti reset error:', e)
      }
    }
  }, [hasMounted, slug])

  const submitReaction = useCallback(async () => {
    if (!hasMounted || submitting || liked) return false
    setSubmitting(true)
    let success = false

    try {
      const newLikes = await incrementCounter(slug, 'like')
      if (newLikes !== undefined) {
        setLikes(newLikes)
        
        // Check if in production mode before using local storage
        if (process.env.NODE_ENV === 'production') {
          const newLsState = { liked: true }
          window.localStorage.setItem(slug, JSON.stringify(newLsState))
        }
        
        setLiked(true)
        success = true
      }
    } catch (error) {
      console.error('Error updating likes:', error)
    }

    setSubmitting(false)
    return success
  }, [hasMounted, submitting, liked, slug])

  const onLikeClick = async (event) => {
    const success = await submitReaction()
    if (success) {
      const x = event.clientX / windowWidth
      const y = event.clientY / windowHeight
      confetti({ ...confettiOptions, origin: { x, y }, colors: ['#f43f5e'] })
    }
  }

  return { onLikeClick, likes, liked, submitting }
}
