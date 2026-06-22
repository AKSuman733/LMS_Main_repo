import { CSSProperties } from 'react'

interface SkeletonProps {
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  style?: CSSProperties
  className?: string
}

export function Skeleton({ width = '100%', height = 16, borderRadius = 6, style, className }: SkeletonProps) {
  return (
    <div
      className={className}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
        background: '#E2E8F0',
        backgroundImage: 'linear-gradient(90deg, #E2E8F0 25%, #F1F5F9 50%, #E2E8F0 75%)',
        backgroundSize: '200% 100%',
        animation: 'skeletonShimmer 1.6s infinite linear, skeletonPulse 2s infinite ease-in-out',
        ...style
      }}
    />
  )
}
