import * as React from 'react'

function Kakao({ width=22, height=22, fill='none', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
      <svg width={width} height={height} viewBox="0 0 22 22"
           fill={fill} {...props}>
        <mask
            id="prefix__kakao"
            maskUnits="userSpaceOnUse"
            x={1}
            y={2}
            width={21}
            height={19}
        >
          <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1 2.087h20.07V20.71H1V2.087z"
              fill="#fff"
          />
        </mask>
        <g mask="url(#prefix__kakao)">
          <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.035 2C5.492 2 1 5.579 1 9.993c0 2.806 1.817 5.273 4.563 6.699l-.758 3.93 4.34-2.78c.612.093 1.244.144 1.89.144 5.542 0 10.036-3.579 10.036-7.993S16.577 2 11.035 2z"
              fill="#333"
          />
        </g>
      </svg>
  )
}

export default Kakao
