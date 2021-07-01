import * as React from 'react'

function NewLevelN({ width=56, height=56, fill='none', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
      <svg
          width={56}
          height={56}
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
      >
        <path
            d="M16.392 29.064c2.528-.304 4.304-1.312 5.248-2.64.944 1.328 2.72 2.336 5.216 2.64l.752-1.664c-3.024-.336-4.624-1.792-4.88-3.04h4.368v-1.68H22.68v-1.648h-2.112v1.648h-4.384v1.68h4.352c-.24 1.28-1.808 2.704-4.88 3.04l.736 1.664zm11.92.752H15v1.712h5.568v4.24h2.112v-4.24h5.632v-1.712z"
            fill="url(#prefix__paint0_linear_N)"
        />
        <path
            d="M36.559 25.304V27h2.352v4.912h2.112V21H38.91v4.304h-2.352zm.992 3.232c-2.4-.72-3.44-2.4-3.44-4.08v-.064h2.912v-1.648H34.11v-1.632h-2.112v1.632h-2.88v1.648h2.88v.064c0 1.776-1.024 3.568-3.392 4.32l1.024 1.648c1.664-.528 2.816-1.6 3.456-2.976.672 1.264 1.808 2.256 3.456 2.736l1.008-1.648zM33.423 33.8V31H31.31v4.48h10.048V33.8h-7.936z"
            fill="url(#prefix__paint1_linear_N)"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 28c0 15.464 12.536 28 28 28s28-12.536 28-28S43.464 0 28 0 0 12.536 0 28zm48 0c0 11.046-8.954 20-20 20S8 39.046 8 28 16.954 8 28 8s20 8.954 20 20z"
            fill="url(#prefix__paint2_linear_N)"
        />
        <defs>
          <linearGradient
              id="prefix__paint0_linear_N"
              x1={28.87}
              y1={0}
              x2={28.87}
              y2={56}
              gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9D61EB" />
            <stop offset={1} stopColor="#6432D2" />
          </linearGradient>
          <linearGradient
              id="prefix__paint1_linear_N"
              x1={28.87}
              y1={0}
              x2={28.87}
              y2={56}
              gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9D61EB" />
            <stop offset={1} stopColor="#6432D2" />
          </linearGradient>
          <linearGradient
              id="prefix__paint2_linear_N"
              x1={28.87}
              y1={0}
              x2={28.87}
              y2={56}
              gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9D61EB" />
            <stop offset={1} stopColor="#6432D2" />
          </linearGradient>
        </defs>
      </svg>
  )
}

export default NewLevelN
