import * as React from 'react'

function NewLevelOther({ width=56, height=56, fill='none', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.628 22.827c1.917 0 3.147.603 3.147 1.71 0 1.122-1.23 1.726-3.146 1.726-1.933 0-3.163-.604-3.163-1.727 0-1.106 1.23-1.71 3.162-1.71zm0 5.195c3.131 0 5.32-1.357 5.32-3.486 0-2.095-2.189-3.469-5.32-3.469-3.146 0-5.318 1.374-5.318 3.47 0 2.128 2.172 3.485 5.318 3.485zm6.693 1.157H14v1.776h5.558V36h2.109v-5.045h5.654V29.18zM40.52 26.028c-3.337-.486-5.03-2.497-5.03-4.29V21h-2.253v.737c0 1.81-1.677 3.805-5.03 4.29l.798 1.777c2.571-.402 4.424-1.659 5.366-3.318.943 1.66 2.78 2.916 5.351 3.319l.799-1.777zm.48 2.916H27.711v1.793h5.542V36h2.109v-5.263H41v-1.793z"
        fill="#00B2ED"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 28c0 15.464 12.536 28 28 28s28-12.536 28-28S43.464 0 28 0 0 12.536 0 28zm48 0c0 11.046-8.954 20-20 20S8 39.046 8 28 16.954 8 28 8s20 8.954 20 20z"
        fill="url(#prefix__paint0_linear)"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear"
          x1={28.87}
          y1={0}
          x2={28.87}
          y2={56}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#01DBF7" />
          <stop offset={1} stopColor="#01BBEF" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default NewLevelOther
