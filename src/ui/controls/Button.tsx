import styled from "styled-components";

const Button = styled.button`
  border: none;
  background: var(--primary);
  padding: 12px;
  color: var(--white);
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  cursor: pointer;

  & + & {
    margin-left: 12px;
  }
`;

export default Button;
