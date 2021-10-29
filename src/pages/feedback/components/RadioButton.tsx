import React, { forwardRef, Ref, useState, memo, InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import RadioChecked from 'components/Icon/generated/RadioChecked'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  checked?: boolean
  type?: 'checkbox'
}

const ControlledRadioButton = forwardRef(function ControlledRadioButton({ type = 'checkbox', className, checked, onChange, ...rest }: Props, ref: Ref<HTMLInputElement>) {
  return (
    <Container className={className} checked={checked}>
      <CheckboxInput
        ref={ref}
        type={type}
        checked={checked}
        onChange={(value) => {
          onChange?.(value)
        }}
        {...rest}
      />
      <RadioChecked fill={checked ? undefined : 'transparent'} />
    </Container>
  )
})

const UncontrolledRadioButton = forwardRef(function UncontrolledRadioButton({ onChange, defaultChecked, ...props }: Props, ref: Ref<HTMLInputElement>) {
  const [isChecked, setIsChecked] = useState(defaultChecked)

  return (
    <ControlledRadioButton
      ref={ref}
      checked={isChecked}
      onChange={(event) => {
        setIsChecked(event.currentTarget.checked)
        onChange?.(event)
      }}
      {...props}
    />
  )
})

const RadioButton = forwardRef(function RadioButton(props: Props, ref: Ref<HTMLInputElement>) {
  if (props.checked != null) {
    return <ControlledRadioButton {...props} />
  } else {
    return <UncontrolledRadioButton {...props} />
  }
})

export default memo(RadioButton)

const Container = styled.div<{ checked?: boolean }>`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: ${({ checked }) => (checked ? 'none' : '3px solid #d7dbe2')};
  box-sizing: border-box;
  & + & {
    margin-top: 8px;
  }
`

const CheckboxInput = styled.input`
  position: fixed;
  padding: 0;
  margin: -1px;
  width: 1px;
  height: 1px;
  border: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  -webkit-appearance: none;
`
