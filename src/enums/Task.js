const TaskStatus = {
  BACKLOG: 'BACKLOG',
  IN_PROGRESS: 'IN_PROGRESS',
  REVIEW: 'REVIEW',
  DONE: 'DONE'
}

const TaskStatusToTitle = {
  BACKLOG: 'Нужно сделать',
  IN_PROGRESS: 'В работе',
  REVIEW: 'Ревью',
  DONE: 'Выполнено'
}


const TaskSequence = [
  TaskStatus.BACKLOG,
  TaskStatus.IN_PROGRESS,
  TaskStatus.REVIEW,
  TaskStatus.DONE
]

export {
  TaskStatus,
  TaskStatusToTitle,
  TaskSequence
}