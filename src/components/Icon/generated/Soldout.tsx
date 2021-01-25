import * as React from 'react'

function SvgComponent({ width=100, height=100, fill='none', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 100 100"
      fill="fill" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5 84.5a9 9 0 100-18 9 9 0 000 18zm42 0a9 9 0 100-18 9 9 0 000 18z"
        fill="#EBEEF2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M84 23.5a1.522 1.522 0 01.191.012A1.5 1.5 0 0185.5 25v51a1.5 1.5 0 01-1.5 1.5H70.277a9.003 9.003 0 01-17.554 0H39a1.5 1.5 0 01-1.5-1.5V32.5H18.731L3.5 50.508V74.5h7.055a9.001 9.001 0 0117.945 1 9 9 0 01-17.777 2H2A1.5 1.5 0 01.5 76V50c0-.34.113-.654.304-.906.047-.085.103-.167.169-.244L16.69 30.266A1.5 1.5 0 0118 29.5h21a1.5 1.5 0 011.5 1.5v43.5h12.055a9.001 9.001 0 0117.89 0H82.5v-48H42a1.5 1.5 0 010-3h42zM93.5 76a1.5 1.5 0 00-1.5-1.5h-3a1.5 1.5 0 000 3h3a1.5 1.5 0 001.5-1.5zm4.5-1.5a1.5 1.5 0 010 3h-1a1.5 1.5 0 010-3h1zm-30.5 1a6 6 0 11-12 0 6 6 0 0112 0zm-48 6a6 6 0 100-12 6 6 0 000 12z"
        fill="#C4C9D1"
      />
      <path
        d="M49.676 45.668c2.052 0 3.264-1.236 3.264-2.688 0-1.284-.707-1.968-1.787-2.412l-1.164-.492c-.756-.3-1.392-.528-1.392-1.164 0-.588.503-.936 1.283-.936.732 0 1.32.264 1.884.732l.9-1.116c-.72-.732-1.752-1.14-2.784-1.14-1.8 0-3.072 1.116-3.072 2.568 0 1.296.9 2.016 1.8 2.388l1.189.504c.792.336 1.332.54 1.332 1.2 0 .624-.492 1.02-1.416 1.02-.78 0-1.62-.396-2.257-.984l-1.02 1.224a4.732 4.732 0 003.24 1.296zM57.68 45.668c2.353 0 3.973-1.764 3.973-4.644s-1.62-4.572-3.972-4.572-3.972 1.68-3.972 4.572c0 2.88 1.62 4.644 3.972 4.644zm0-1.536c-1.32 0-2.16-1.212-2.16-3.108 0-1.908.84-3.048 2.16-3.048 1.32 0 2.16 1.14 2.16 3.048 0 1.896-.84 3.108-2.16 3.108zM63.027 45.5h5.376v-1.488h-3.6V36.62h-1.776v8.88zM69.593 45.5h2.532c2.616 0 4.296-1.488 4.296-4.476 0-3-1.68-4.404-4.392-4.404h-2.436v8.88zm1.776-1.428v-6.036h.552c1.656 0 2.688.816 2.688 2.988 0 2.16-1.032 3.048-2.688 3.048h-.552zM53.624 60.668c2.352 0 3.972-1.764 3.972-4.644s-1.62-4.572-3.971-4.572c-2.352 0-3.972 1.68-3.972 4.572 0 2.88 1.62 4.644 3.971 4.644zm0-1.536c-1.32 0-2.16-1.212-2.16-3.108 0-1.908.84-3.048 2.16-3.048 1.32 0 2.16 1.14 2.16 3.048 0 1.896-.84 3.108-2.16 3.108zM62.379 60.668c2.172 0 3.432-1.212 3.432-4.164V51.62h-1.704v5.04c0 1.848-.672 2.472-1.728 2.472-1.044 0-1.68-.624-1.68-2.472v-5.04h-1.776v4.884c0 2.952 1.296 4.164 3.456 4.164zM69.351 60.5h1.776v-7.404h2.52V51.62h-6.792v1.476h2.496V60.5z"
        fill="#1672F7"
      />
    </svg>
  )
}

export default SvgComponent
