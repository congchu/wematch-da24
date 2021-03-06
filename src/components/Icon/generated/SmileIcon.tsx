import React from 'react'

export default function SmileIcon({ width = 112, height = 112, fill = 'none', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M92 44C94.1422 44 95.8911 45.684 95.9951 47.8004L96 48C96 70.0914 78.0914 88 56 88C33.9086 88 16 70.0914 16 48L16.0049 47.8004C16.1089 45.684 17.8578 44 20 44C22.1422 44 23.8911 45.684 23.9951 47.8004L24 48C24 65.6731 38.3269 80 56 80C73.6731 80 88 65.6731 88 48L88.0049 47.8004C88.1089 45.684 89.8578 44 92 44Z"
        fill="url(#paint0_linear)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36 24C38.2091 24 40 25.7909 40 28C40 30.2091 38.2091 32 36 32C33.7909 32 32 30.2091 32 28C32 25.7909 33.7909 24 36 24ZM92 44C94.2091 44 96 45.7909 96 48C96 50.2091 94.2091 52 92 52C89.7909 52 88 50.2091 88 48C88 45.7909 89.7909 44 92 44ZM80 28C80 25.7909 78.2091 24 76 24C73.7909 24 72 25.7909 72 28C72 30.2091 73.7909 32 76 32C78.2091 32 80 30.2091 80 28Z"
        fill="#1672F7"
      />
      <defs>
        <linearGradient id="paint0_linear" x1="96" y1="44" x2="58.8407" y2="111.562" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1672F7" />
          <stop offset="1" stopColor="#15D4CC" />
        </linearGradient>
      </defs>
    </svg>
  )
}
