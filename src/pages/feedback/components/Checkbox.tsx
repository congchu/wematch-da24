import React, { forwardRef, Ref, useState, memo, InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { Colors, Icons } from '@wematch/wematch-ui'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  checked?: boolean
  type?: 'checkbox'
}

const ControlledCheckbox = forwardRef(function ControlledCheckbox({ type = 'checkbox', className, checked, onChange, ...rest }: Props, ref: Ref<HTMLInputElement>) {
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
      <Icons.CheckIcon width={18} height={18} fill={checked ? Colors.white : 'transparent'} />
    </Container>
  )
})

const UncontrolledCheckbox = forwardRef(function UncontrolledCheckbox({ onChange, defaultChecked, ...props }: Props, ref: Ref<HTMLInputElement>) {
  const [isChecked, setIsChecked] = useState(defaultChecked)

  return (
    <ControlledCheckbox
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

const Checkbox = forwardRef(function Checkbox(props: Props, ref: Ref<HTMLInputElement>) {
  if (props.checked != null) {
    return <ControlledCheckbox {...props} />
  } else {
    return <UncontrolledCheckbox {...props} />
  }
})

export default memo(Checkbox)

const Container = styled.div<{ checked?: boolean }>`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background-color: ${({ checked }) => (checked ? '#1672F7' : '#d7dbe2')};
  border-radius: 3px;

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
