import * as React from 'react'

function SvgComponent({ width=100, height=100, fill='none', ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width={width} height={height} viewBox="0 0 100 100"
             fill="fill" {...props}>
            <path
                d="M90.905 45.7a1.495 1.495 0 00-.69-.881L82.5 40.402A1.5 1.5 0 0081 43l7 4.004v38.152L70.512 75.06a1.501 1.501 0 00-1.685.043L48.958 86.574 29.498 75.34a1.498 1.498 0 00-.346-.146 1.496 1.496 0 00-1.183.137L11 85.128V47.18l16.488-9.942a1.5 1.5 0 00-1.5-2.598L8.986 44.878A1.5 1.5 0 008 46.288v41.438a1.494 1.494 0 00.627 1.22 1.492 1.492 0 001.4.184 1.51 1.51 0 00.227-.107l18.472-10.665 19.426 11.215c.254.147.533.21.806.2.273.01.552-.053.806-.2L69.707 78.06 88.7 89.025c.247.142.517.206.783.2h.017a1.5 1.5 0 001.5-1.5v-41.5c0-.185-.034-.362-.095-.526z"
                fill="#C4C9D1"
            />
            <path d="M79 39.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" fill="#C4C9D1" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M61.11 52.14C66.106 44.99 70 37.279 70 31c0-11.598-9.402-21-21-21s-21 9.402-21 21c0 6.279 3.894 13.99 8.89 21.14 4.425 6.334 9.372 11.756 12.11 14.6 2.738-2.844 7.685-8.266 12.11-14.6zM50.346 69.66C55.405 64.511 73 45.556 73 31 73 17.745 62.255 7 49 7S25 17.745 25 31c0 14.556 17.596 33.511 22.655 38.66.75.764 1.94.764 2.69 0z"
                fill="#C4C9D1"
            />
            <path
                d="M61 31c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12z"
                fill="#EBEEF2"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M49 40a9 9 0 100-18 9 9 0 000 18zm0 3c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12z"
                fill="#C4C9D1"
            />
        </svg>
    )
}

export default SvgComponent
