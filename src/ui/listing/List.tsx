import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li:not(:first-child) {
    margin-top: 12px;
  }
`;

export default List;
