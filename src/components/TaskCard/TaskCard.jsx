import React, { useMemo } from "react";
import * as UI from "./TaskCard.styles";
import { getAvatarCharacters } from "@/utils/user";
import { TaskStatusToTitle } from "@/enums/Task";

const TaskCard = ({ participants, task, onTaskClick }) => {
  const handleTaskClick = () => {
    onTaskClick(task);
  };

  const taskAsignee = useMemo(() => {
    return participants.find((participant) => participant.id === task.asignee);
  }, [participants, task.asignee]);

  return (
    <UI.CardWrapper onClick={handleTaskClick}>
      <UI.LeftControls>
        <UI.TaskName>{task.title}</UI.TaskName>
        <UI.TaskDescription>{task.description}</UI.TaskDescription>
      </UI.LeftControls>
      <UI.EstimatedTimeTooltip>
        {TaskStatusToTitle[task.status]}
      </UI.EstimatedTimeTooltip>
      <UI.StyledAvatar size="small" color={taskAsignee?.user?.avatarColor}>
        {getAvatarCharacters(taskAsignee?.user)}
      </UI.StyledAvatar>
    </UI.CardWrapper>
  );
};

export { TaskCard };
