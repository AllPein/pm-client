import { AutoComplete } from "antd";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledAutoComplete = styled(AutoComplete)`
  margin-left: 1rem;
  width: 18rem;
`;

export { Wrapper, StyledAutoComplete };
