import React, { FC, ReactNode } from "react";
import styled from "styled-components";

interface ButtonPropTypes {
  children: ReactNode;
  type: "button" | "submit" | "reset";
}
const Button: FC<ButtonPropTypes> = ({ type, children }) => {
  return <ButtonInput type={type}>{children}</ButtonInput>;
};

const ButtonInput = styled.button`
    background-image: linear-gradient(
      92.88deg,
      #455eb5 9.16%,
      #5643cc 43.89%,
      #673fd7 64.72%
    );
    border-radius: 8px;
    border-style: none;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    flex-shrink: 0;
    font-family: "Inter UI", "SF Pro Display", -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
    font-size: 16px;
    font-weight: 500;
    height: 45px;
    width: 100%;
    margin: 20px 0;
    padding: 0 1.6rem;
    text-align: center;
    text-shadow: rgba(0, 0, 0, 0.25) 0 3px 8px;
    transition: all 0.5s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }

  &:hover {
    box-shadow: rgba(80, 63, 205, 0.5) 0 1px 10px;
    transition-duration: 0.1s;
  }
`;

export default Button;
