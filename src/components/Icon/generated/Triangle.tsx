import * as React from 'react'

function Triangle({ width=15, height=8, fill='none', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 15 8"
      fill="fill" {...props}>
      <path
        d="M8.167.309a.876.876 0 00-1.334 0L.158 7.766C.094 7.837.042 7.916 0 8h15a1.054 1.054 0 00-.158-.234L8.167.31z"
        fill="#000"
        fillOpacity={0.75}
      />
    </svg>
  )
}

export default Triangle
