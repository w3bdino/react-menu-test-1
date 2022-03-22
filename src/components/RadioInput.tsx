import React, { FC, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { IFormInputs } from "../types/commonTypes";

interface RadioInputTypes {
  register: any;
  label: string;
  type: string;
  name: string;
  value: string;
  checked: boolean;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, menu: string) => void;
}
const RadioInput: FC<RadioInputTypes> = (p) => {
  return (
    <Item>
      <RadioButton
        {...p.register(p.name)}
        type={p.type}
        name={p.name}
        value={p.value}
        checked={p.checked}
        disabled={p.disabled}
        onChange={(event) => p.onChange(event, p.name)}
      />
      <RadioButtonLabel />
      <div>{p.label}</div>
    </Item>
  );
};

const Item = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  position: relative;
`;

const RadioButtonLabel = styled.label`
  position: absolute;
  top: 25%;
  left: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 1px solid #bebebe;
`;
const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  margin-right: 10px;
  cursor: pointer;
  &:hover ~ ${RadioButtonLabel} {
    background: #bebebe;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      margin: 6px;
      background: #eeeeee;
    }
  }

  ${(props) =>
    props.disabled &&
    `&:disabled + ${RadioButtonLabel}{
    background: #bebebe;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      margin: 6px;
      background: #eeeeee;
    }
  }`}

  ${(props) =>
    props.checked &&
    ` 
    &:checked + ${RadioButtonLabel} {
      background: #00e6eb;
      border: 1px solid #00e6eb;
      &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width: 12px;
        height: 12px;
        margin: 6px;
        box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
        background: white;
      }
    }
  `}
`;

export default RadioInput;
