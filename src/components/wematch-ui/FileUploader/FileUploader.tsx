import * as React from 'react'
import styled from 'styled-components'
import { BaseFileUploader as BaseUploader } from './BaseUploader'
import { BaseProps } from './types'
import { lineEnd } from 'styles/colors'
import { Plus } from '../Icon'

interface Props extends BaseProps {
  maxLength?: number;
  maxSize?: number;
  onRemove?: (urls: string[]) => void; // eslint-disable-line
  onError?: (err: any) => void; // eslint-disable-line
  previewUrls?: string[];
  children?: React.ReactNode;
}

const S = {
  Container: styled.div`
  margin-left: 1px;
  margin-right: -1px;
  overflow: hidden;
`,
  Wrap: styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -3px;
  & > div {
    margin: 0 3px;
    flex-grow: 0;
    flex-shrink: 0;
    margin-bottom: 8px;
    position: relative;
    display: inline-block;
    width: 100px;
    height: 72px;
    box-sizing: border-box;
  }
`,
  UploadButton: styled.div`
  .baseUploader {
    border-style: dashed;
    border-color: ${lineEnd};
  }
  .plus {
    position: absolute;
    top: 28px;
    left: 42px;
  }
`,
  Loading: styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
}

export function FileUploader(props: Props) {
  const {
    accept,
    children,
    ...restProps
  } = props

  return (
    <S.Container>
      <S.Wrap>
        <S.UploadButton>
          <Plus className="plus" />
          <BaseUploader accept={accept} {...restProps}
            className="baseUploader" />
        </S.UploadButton>
        {children}
      </S.Wrap>
    </S.Container>
  )
}
