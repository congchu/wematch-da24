import { Colors } from '@wematch/wematch-ui'
import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import Checkbox from './Checkbox'
import RadioButton from './RadioButton'

interface Props extends ComponentProps<typeof Checkbox> {
  label: string
}

const RadioBoxListItem = ({ label, id, ...rest }: Props) => {
  return (
    <Container>
      <Label htmlFor={id}>
        <ItemBody>
          <StyledRadio id={id} {...rest} />
          <LabelText>{label}</LabelText>
        </ItemBody>
      </Label>
    </Container>
  )
}

export default RadioBoxListItem

const Container = styled.li`
  padding: 0;
  margin: 0;
`

const Label = styled.label`
  width: 100%;
  margin: 0;
  padding: 0;
  cursor: pointer;
`

const StyledRadio = styled(RadioButton)`
  margin-right: 9px;
  pointer-events: none;
`

const ItemBody = styled.span`
  display: flex;
  align-items: center;
`

const LabelText = styled.span`
  font-size: 16px;
  line-height: 23px;
  letter-spacing: -1px;
  color: ${Colors.gary33};
  word-break: keep-all;
  overflow-wrap: break-word;
`
