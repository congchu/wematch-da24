import * as React from 'react'

function SLevelLabel({ width=56, height=23, fill='none', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 59 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x={0.25}
        y={0.25}
        width={58.5}
        height={22.5}
        rx={11.25}
        fill="#1672F7"
        stroke="#1672F7"
        strokeWidth={0.5}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.233 15.622a.5.5 0 00-.466 0l-2.985 1.57a.5.5 0 01-.725-.527l.57-3.324a.5.5 0 00-.144-.443l-2.415-2.354a.5.5 0 01.277-.853l3.338-.485a.5.5 0 00.376-.273l1.493-3.025a.5.5 0 01.896 0l1.493 3.025a.5.5 0 00.376.273l3.338.485a.5.5 0 01.277.853l-2.415 2.354a.5.5 0 00-.144.443l.57 3.324a.5.5 0 01-.725.527l-2.985-1.57z"
        fill="#fff"
      />
      <path
        d="M26.744 15.168c2.052 0 3.264-1.236 3.264-2.688 0-1.284-.708-1.968-1.788-2.412l-1.164-.492c-.756-.3-1.392-.528-1.392-1.164 0-.588.504-.936 1.284-.936.732 0 1.32.264 1.884.732l.9-1.116c-.72-.732-1.752-1.14-2.784-1.14-1.8 0-3.072 1.116-3.072 2.568 0 1.296.9 2.016 1.8 2.388l1.188.504c.792.336 1.332.54 1.332 1.2 0 .624-.492 1.02-1.416 1.02-.78 0-1.62-.396-2.256-.984l-1.02 1.224a4.732 4.732 0 003.24 1.296zm12.128-7.152H32.8V6.54h6.012V5.28h-7.584v3.984h7.644V8.016zm-3.9 6.816c-1.476 0-2.232-.252-2.232-.828s.756-.84 2.232-.84c1.476 0 2.232.264 2.232.84s-.756.828-2.232.828zm0-2.868c-2.388 0-3.828.732-3.828 2.04 0 1.296 1.44 2.028 3.828 2.028s3.84-.732 3.84-2.028c0-1.308-1.452-2.04-3.84-2.04zm-4.956-1.932v1.296h9.996v-1.296h-9.996zm17.251 4.62h-4.464v-1.008h4.464v1.008zm0-2.232h-4.464v-1.152h-1.572v4.644h7.62v-4.644h-1.584v1.152zm1.368-3.132c.24-1.236.24-2.112.24-2.976v-.888H41.28v1.26h6.036c0 .732-.036 1.56-.252 2.604h-7.02v1.272h10.008V9.288h-1.416z"
        fill="#fff"
      />
    </svg>
  )
}

export default SLevelLabel
