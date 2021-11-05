import * as React from 'react'
import styled from 'styled-components'
import { BaseProps } from './types'
import { resetButton } from 'styles/mixins'

interface Props extends BaseProps {
  img: string;
  onRemove?: (event: React.MouseEvent) => void;
}

const S = {
  Preview: styled.div<{img: string}>`
  background-image: url(${({ img }) => img});
  background-size: cover;
  background-color: white;
  background-position: center center;

  position: relative;
  display: inline-block;
  width: 100px;
  height: 72px;
  box-sizing: border-box;
  button {
    ${resetButton}
    position: absolute;
    top: 0;
    right: 0;
  }
`,
  PreviewLoading: styled.div`
  background-image: url(${require('../assets/images/image-loading.svg')});
  background-size: 50px;
  background-position: center center;
  background-repeat: no-repeat;
`,
}

export function FileUploaderPreview(props: Props) {
  const {
    img,
    onRemove,
    ...restProps
  } = props

  return (
    <S.PreviewLoading {...restProps}>
      <S.Preview img={img}>
        <button onClick={onRemove}><img src={require('../assets/images/16-sq-default.svg')} alt="미리보기 아이콘"/></button>
      </S.Preview>
    </S.PreviewLoading>
  )
}
