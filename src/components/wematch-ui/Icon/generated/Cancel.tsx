import * as React from "react"

function Cancel(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle cx={10} cy={10} r={10} fill="#C4C9D1" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.724 14.415a.438.438 0 000-.618l-3.712-3.713 3.403-3.403a.437.437 0 10-.619-.618l-3.403 3.403-3.712-3.713a.438.438 0 00-.619.619l8.044 8.043c.17.171.447.171.618 0zm-5.877-3.403a.437.437 0 11.618.619l-3.093 3.094a.437.437 0 11-.619-.62l3.094-3.093z"
                fill="#fff"
            />
        </svg>
    )
}

export default Cancel
