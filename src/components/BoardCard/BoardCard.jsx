import React from "react";
import * as UI from "./BoardCard.styles";
import { formatDateWithTime } from "@/utils/date";
import { getAvatarCharacters } from "@/utils/user";

const BoardCard = ({ card, cardBag, onTaskClick }) => {
  const handleTaskClick = () => {
    onTaskClick({
      ...card,
      asignee: card.asignee.id,
    });
  };

  return (
    <UI.CardWrapper onClick={handleTaskClick}>
      <UI.TaskName>{card?.title}</UI.TaskName>
      {card.createdAt && (
        <UI.TaskDate>{formatDateWithTime(card.createdAt)}</UI.TaskDate>
      )}
      <UI.BottomControls>
        {card.estimatedTime && (
          <UI.EstimatedTimeTooltip>
            {card.estimatedTime}h
          </UI.EstimatedTimeTooltip>
        )}
        <UI.TaskCode>{card.code}</UI.TaskCode>
        {Boolean(card.asignee) && (
          <UI.StyledAvatar size="small" color={card.asignee?.user?.avatarColor}>
            {getAvatarCharacters(card.asignee?.user)}
          </UI.StyledAvatar>
        )}
      </UI.BottomControls>
    </UI.CardWrapper>
  );
};

export { BoardCard };
