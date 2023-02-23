import React, { useMemo, useCallback } from "react";
import * as UI from "./BoardComponent.styles";
import Board from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";
import { useSelector } from "react-redux";
import {
  projectParticipantsSelector,
  tasksFilterSelector,
  projectTasksSelector,
} from "@/selectors/projectView";
import { SearchOutlined } from "@ant-design/icons";
import { AvatarGroup } from "@/components/AvatarGroup";
import { useDispatch } from "react-redux";
import { updateTasksFilter } from "@/actions/projectView/projectView";
import { BoardCard } from "@/components/BoardCard";
import { v4 as uuid } from "uuid";
import { TaskSequence, TaskStatus, TaskStatusToTitle } from "@/enums/Task";
import { updateTask } from "@/actions/projectView/projectView";
import { setSelectedTask } from "../../actions/projectView/projectView";

const generateBoardColumn = (title, status, cards) => ({
  id: uuid(),
  key: uuid(),
  title,
  status,
  cards,
});

const BoardComponent = ({ projectId }) => {
  const dispatch = useDispatch();

  const participants = useSelector(projectParticipantsSelector);
  const projectTasks = useSelector(projectTasksSelector);
  const tasksFilter = useSelector(tasksFilterSelector);

  const filteredParticipantsByActive = useMemo(() => {
    return participants?.map((participant) => ({
      ...participant,
      active: tasksFilter.value.includes(participant.id),
    }));
  }, [participants, tasksFilter]);

  const handleSelectParticipant = useCallback(
    (participant) => {
      dispatch(updateTasksFilter({ key: "participant", participant }));
    },
    [dispatch]
  );

  const mappedProjectTasks = useMemo(
    () =>
      projectTasks.map((task) => ({
        ...task,
        key: task.id,
        asignee:
          participants.find((participant) => participant.id === task.asignee) ??
          null,
      })),
    [participants, projectTasks]
  );

  const board = useMemo(() => {
    return {
      columns: TaskSequence.map((taskStatus) => {
        const filteredColumnCards = mappedProjectTasks.filter(
          (task) =>
            task.status === taskStatus &&
            (!tasksFilter.value.length ||
              tasksFilter.value.includes(task.asignee?.id))
        );
        return generateBoardColumn(
          TaskStatusToTitle[taskStatus],
          taskStatus,
          filteredColumnCards
        );
      }),
    };
  }, [mappedProjectTasks, tasksFilter]);

  const handleDragCard = (card, _, destination) => {
    const newCardStatus =
      board.columns.find((column) => column.id === destination.toColumnId)
        ?.status || TaskStatus.BACKLOG;
    dispatch(
      updateTask(
        {
          ...card,
          asignee: card.asignee?.id,
          status: newCardStatus,
        },
        projectId
      )
    );
  };

  const handleTaskClick = useCallback(
    (task) => {
      dispatch(setSelectedTask(task));
    },
    [dispatch]
  );

  return (
    <UI.Wrapper>
      <UI.BoardHeader>
        <UI.StyledInput
          size="large"
          placeholder="Поиск по доске"
          prefix={<SearchOutlined />}
        />
        <AvatarGroup
          maxCount={3}
          participants={filteredParticipantsByActive}
          onSelect={handleSelectParticipant}
        />
        <UI.StyledButton type="primary">Создать задачу</UI.StyledButton>
      </UI.BoardHeader>
      <Board
        renderCard={(card) => (
          <BoardCard card={card} onTaskClick={handleTaskClick} />
        )}
        onCardDragEnd={handleDragCard}
        disableColumnDrag
      >
        {board}
      </Board>
    </UI.Wrapper>
  );
};

export { BoardComponent };
