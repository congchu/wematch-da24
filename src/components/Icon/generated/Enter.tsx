import React from "react";

function Enter({ width=24, height=24, fill='none', ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill={fill}
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fill="#333"
                fillRule="evenodd"
                d="M3 6.75a.75.75 0 01.75.75v5.25h15.62l-3.44-4.012a.75.75 0 111.14-.976l4.5 5.25A.75.75 0 0121 14.25H3a.75.75 0 01-.75-.75v-6A.75.75 0 013 6.75zM15.936 20.506a.75.75 0 01-.07-1.058l3.188-3.643a.75.75 0 011.128.988l-3.188 3.643a.75.75 0 01-1.058.07z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export default Enter;
