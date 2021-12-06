import React from "react";
import styled from "styled-components";
import SelectItem from "./item";

interface Props extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  options: string[];
  exceptions?: string[];
  multiple?: boolean;
  onChange: (result: string[]) => void;
  gridType?: "large" | "small";
  value: string[];
}

const S = {
  Container: styled.div`
    display: inline-block;
    max-width: 312px;
    width: 100%;
    margin-left: 2px;
    ul {
      max-width: 312px;
      padding: 0;
      margin: 0;
    }
  `
};

export function GridSelect(props: Props) {
  const { options, multiple = false, onChange, exceptions = [], gridType = "small", value, ...restProps } = props;

  const handleChange = (option: string) => {
    const isSelected = value.includes(option);
    let newValue;

    if (isSelected) {
      const index = value.indexOf(option);
      if (index !== -1) value.splice(index, 1);
      newValue = [...value];
    } else {
      if (multiple) {
        newValue = [...value, option];
      } else {
        newValue = [option];
      }
    }
    onChange(newValue);
  };

  return (
    <S.Container {...restProps}>
      <ul>
        {options.map((o, i) => {
          return <SelectItem value={o} key={i} onClick={handleChange} gridType={gridType} excepted={exceptions.includes(o)} />;
        })}
      </ul>
    </S.Container>
  );
}
