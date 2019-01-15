import React from "react";
import styled from "styled-components";

type ContainerProps = {
  active?: boolean;
  hover?: boolean;
};

type Props = {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  hover?: boolean;
  active?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  action?: React.ReactNode;
};

const Container = styled.div`
  background-color: var(--white);
  border: 1px solid
    ${({active}: ContainerProps) => (!active ? "var(--info)" : "var(--smoke)")};
  border-radius: 4px;
  padding: 12px;
  margin: 12px;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    transform: ${({hover}: ContainerProps) => !hover && "scale(1.02)"};
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
    color: var(--info);
  }

  .action {
    margin-top: 12px;
  }
`;

const Card = ({header, children, footer, action, ...props}: Props) => (
  <Container {...props}>
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
  hover: false,
  active: false,
};

export default Card;
