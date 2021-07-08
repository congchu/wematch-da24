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
        d="M20.64 22.816c1.92 0 3.152.576 3.152 1.632 0 1.072-1.232 1.648-3.152 1.648-1.936 0-3.168-.576-3.168-1.648 0-1.056 1.232-1.632 3.168-1.632zm0 4.96c3.136 0 5.328-1.296 5.328-3.328 0-2-2.192-3.312-5.328-3.312-3.152 0-5.328 1.312-5.328 3.312 0 2.032 2.176 3.328 5.328 3.328zm6.704 1.104H14v1.696h5.568v4.816h2.112v-4.816h5.664V28.88zM40.567 25.872c-3.344-.464-5.04-2.384-5.04-4.096v-.704H33.27v.704c0 1.728-1.68 3.632-5.04 4.096l.8 1.696c2.576-.384 4.432-1.584 5.376-3.168.944 1.584 2.784 2.784 5.36 3.168l.8-1.696zm.48 2.784H27.735v1.712h5.552v5.024h2.112v-5.024h5.648v-1.712z"
        fill="#01BEF0"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 28c0 15.464 12.536 28 28 28s28-12.536 28-28S43.464 0 28 0 0 12.536 0 28zm48 0c0 11.046-8.954 20-20 20S8 39.046 8 28 16.954 8 28 8s20 8.954 20 20z"
        fill="url(#prefix__paint0_linear_O)"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear_O"
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
