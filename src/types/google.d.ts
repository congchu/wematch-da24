interface options {
  send_to: string
  value?: number
  currency?: string
}

declare function gtag(event: string, action: string, options: options)
