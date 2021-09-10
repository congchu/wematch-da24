import React from 'react'

export default function RadioChecked({ width = 24, height = 24, fill = '#1672F7', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 6.5C8.964 6.5 6.5 8.964 6.5 12C6.5 15.036 8.964 17.5 12 17.5C15.036 17.5 17.5 15.036 17.5 12C17.5 8.964 15.036 6.5 12 6.5ZM12 1C5.928 1 1 5.928 1 12C1 18.072 5.928 23 12 23C18.072 23 23 18.072 23 12C23 5.928 18.072 1 12 1ZM12 20.8C7.138 20.8 3.2 16.862 3.2 12C3.2 7.138 7.138 3.2 12 3.2C16.862 3.2 20.8 7.138 20.8 12C20.8 16.862 16.862 20.8 12 20.8Z"
        fill={fill}
      />
    </svg>
  )
}
