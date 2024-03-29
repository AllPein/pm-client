import { Button, Input } from "antd";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 2rem;
  width: 100%;
`;

const StyledInput = styled(Input)`
  max-width: 50rem;
  margin-right: 2rem;
  margin-bottom: 2rem;
`;

const StyledButton = styled(Button)`
  margin-left: 12rem;
  margin-bottom: 0.5rem;
`;

const FieldName = styled.h2`
  margin: 1.2rem 0;
  font-size: 1.5rem;
  font-weight: 400;
  color: ${(props) => props.theme.color.primary4};
`;

const EstimatedTimeError = styled.p`
  margin: 1.2rem 0;
  font-size: 1.2rem;
  font-weight: 400;
  color: ${(props) => props.theme.color.error};
`;

export { StyledInput, EstimatedTimeError, FieldName, Wrapper, StyledButton };
