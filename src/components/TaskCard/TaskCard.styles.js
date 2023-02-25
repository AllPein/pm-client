import { Avatar } from "antd";
import styled from "styled-components";

const CardWrapper = styled.div`
  cursor: pointer;
  background-color: #fff;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.4rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  padding: 1.3rem;
  margin-bottom: 1rem;

  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const StyledAvatar = styled(Avatar)`
  background-color: ${(props) => props.color};
`;

const TaskName = styled.h2`
  font-size: 1.4rem;
  font-weight: 500;
  color: ${(props) => props.theme.color.primary4};
`;

const TaskDescription = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  white-space: pre;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
  color: ${(props) => props.theme.color.grayScale8};
`;

const EstimatedTimeTooltip = styled.div`
  background-color: #e6f7ff;
  color: ${(props) => props.theme.color.primary2Light};
  font-size: 1.2rem;
  border-radius: 2em;
  font-weight: 600;
  line-height: 1.6rem;
  padding: 0.7rem;
  width: 11rem;
  text-align: center;
`;

const LeftControls = styled.div`
  width: 50rem;
`;

export {
  TaskName,
  LeftControls,
  TaskDescription,
  StyledAvatar,
  EstimatedTimeTooltip,
  CardWrapper,
};
