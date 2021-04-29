import * as React from "react"

function DotDot({ width=20, height=20, fill='#1672F7', ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M10 5c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                fill={fill}
            >
                {/*BLINK ANIMATION : USE IT IF YOU NEED IT*/}
                {/*<animate*/}
                {/*    attributeType="XML"*/}
                {/*    attributeName="fill"*/}
                {/*    values="#1672f7;#82B5FF;#1672f7;#1672f7;"*/}
                {/*    dur="1.5s"*/}
                {/*    repeatCount="3"/>*/}
            </path>
        </svg>
    )
}

export default DotDot
