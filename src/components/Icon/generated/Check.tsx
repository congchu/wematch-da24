import * as React from 'react'

function Check({ width=28, height=19, fill='#121212', ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width={width} height={height} viewBox="0 0 28 19"
             fill="none" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27.44 3.06A1.5 1.5 0 0025.317.94L11.503 14.753 3.357 6.607A1.5 1.5 0 101.236 8.73l9.192 9.192c.4.4.97.527 1.477.38.25-.064.488-.194.685-.391L27.44 3.06z"
                fill={fill}
            />
        </svg>
    )
}

export default Check
