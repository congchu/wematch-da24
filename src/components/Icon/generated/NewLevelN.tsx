import * as React from 'react'

function NewLevelN({ width=56, height=56, fill='none', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 56 56"
      {...props}
    >
      <path
        fill="url(#paint0_linear)"
        fillRule="evenodd"
        d="M0 28c0 15.464 12.536 28 28 28s28-12.536 28-28S43.464 0 28 0 0 12.536 0 28zm48 0c0 11.046-8.954 20-20 20S8 39.046 8 28 16.954 8 28 8s20 8.954 20 20z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#6432D2"
        d="M26.245 21h-2.12v10.916h2.12V21zm-3.205 6.947c-2.391-.781-3.412-2.7-3.412-4.67v-1.464h-2.136v1.465c0 1.985-1.053 4.083-3.492 4.93l1.068 1.707c1.706-.602 2.854-1.822 3.524-3.335.638 1.4 1.754 2.506 3.38 3.075l1.068-1.708zm-4.464 6.052v-3.124H16.47v4.832h10.14V34h-8.035zM41 28.24h-2.105c.415-2.457.415-4.198.415-5.467v-.96H29.28v1.741h7.94a26.849 26.849 0 01-.446 4.686h-9.04v1.74H30.7V36h2.089v-6.02h2.997V36h2.089v-6.02H41v-1.74z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="28.87"
          x2="28.87"
          y1="0"
          y2="56"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9D61EB"></stop>
          <stop offset="1" stopColor="#6432D2"></stop>
        </linearGradient>
      </defs>
    </svg>
  )
}

export default NewLevelN
