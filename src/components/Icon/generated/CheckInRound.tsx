import * as React from "react"


function CheckInRound({ width=20, height=20, fill='#333', ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width={width}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle cx={10} cy={10} r={10} fill={fill} />
            <path
                d="M5.138 8.695a.625.625 0 01.884 0l3.094 3.094 4.861-4.862a.625.625 0 01.884.884L9.63 13.043a.727.727 0 01-1.028 0L5.138 9.579a.625.625 0 010-.884z"
                fill="#fff"
            />
        </svg>
    )
}

export default CheckInRound
