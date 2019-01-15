import React from "react";
import styled from "styled-components";

type ContainerProps = {
  active?: boolean;
  grow?: boolean;
  onClick?: (event: React.MouseEvent) => void;
};

type Props = {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  grow?: boolean;
  active?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  action?: React.ReactNode;
};

const Container = styled.div`
  background-color: var(--white);
  border: 1px solid
    ${({active}: ContainerProps) =>
      active ? "var(--primary)" : "var(--smoke)"};
  border-radius: 4px;
  padding: 12px;
  transition: 0.2s;
  cursor: ${({onClick}: ContainerProps) => onClick && "pointer"};
  position: relative;

  &:hover {
    transform: ${({grow}: ContainerProps) => grow && "scale(1.02)"};
  }

  .header {
    display: flex;
    flex-direction: column;
  }

  .body {
    display: flex;
    flex-direction: column;
  }

  .footer {
    margin-top: 12px;
    color: var(--primary);
  }

  .action {
    margin-top: 12px;
  }

  .active {
    width: 12px;
    height: 12px;
    background-color: var(--primary);
    border: 2px solid var(--white);
    border-radius: 50%;
    position: absolute;
    top: -8px;
    left: -8px;
  }
`;

const Card = ({header, children, footer, action, active, ...props}: Props) => (
  <Container active={active} {...props}>
    {active && <div className="active" />}
    {header && <div className="header">{header}</div>}
    <div className="body">{children}</div>
    {footer && <div className="footer">{footer}</div>}
    {action && <div className="action">{action}</div>}
  </Container>
);

Card.defaultProps = {
  onClick: null,
  action: null,
  header: null,
  footer: null,
  grow: false,
  active: false,
};

export default Card;
