import * as React from 'react'
import styled from 'styled-components'
import { gray33, gray88, lineDefault, grayBg } from 'styles/colors'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  initialHeight?: number;
  autoExtend?: boolean;
}

const S = {
  Container: styled.div`
    width: 100%;
    border: 1px solid ${lineDefault};
    background-color: ${grayBg};
  `,
  Textarea: styled.textarea<{height: number}>`
    border: none;
    background-image: none;
    background-color: transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    padding: 0;
    border-radius: 0;
    overflow: auto;
    outline: none;
    appearance: none;
    resize: none;
    &:focus {
      outline: none;
    }

    width: 100%;
    height: ${({ height }) => height}px;
    color: ${gray33};
    box-sizing: border-box;
    padding: 10px 14px;
    font-size: 16px;
    letter-spacing: -1px;
    line-height: 28px;
    &::placeholder {
      color: ${gray88};
    }
  `,
}

export function Textarea(props: Props) {
  const {
    className,
    initialHeight = 120,
    autoExtend = false,
    ...restProps
  } = props

  const textarea = React.useRef<HTMLTextAreaElement>(null)

  const [height, setHeight] = React.useState<number>(initialHeight)

  React.useEffect(() => {
    const heightHandler = () => {
      if (autoExtend) {
        setHeight(textarea?.current?.scrollHeight as number)
      }
    }
    textarea.current?.addEventListener('input', heightHandler)

    return () => {
      textarea.current?.removeEventListener('input', heightHandler) // eslint-disable-line
    }
  }, [autoExtend, textarea])

  return (
    <S.Container className={className}>
      <S.Textarea height={height} ref={textarea} {...restProps} />
    </S.Container>
  )
}
