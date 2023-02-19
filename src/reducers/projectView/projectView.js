import { handleActions } from 'redux-actions'
import { setProject, setProjectTime, setActiveTab, setTasksFilter, setProjectTasks } from '@/actions/projectView'
import { User } from '@/models/User'
import { ProjectRoles, UserRoles } from '@/enums/Role'
import { TaskStatus } from '@/enums/Task'

const initialState = {
  project: {
    id: '1',
    name: 'Project1',
    description: 'asdasdasd',
    code: 1,
    dueDate: new Date().toString(),
    repo: '12',
    avatar: 'https://i.pravatar.cc/300',
    participants: [
      {
        id: 1,
        role: ProjectRoles.PARTICIPANT, 
        user: new User('b@b.ru', 'Alex', 'Bajin', 'PI-19-1', UserRoles.STUDENT, 12, '#9d85fc')
      },
      {
        id: 2,
        role: ProjectRoles.OWNER, 
        user: new User('a@a.ru', 'German', 'Pahomov', 'PI-19-2', UserRoles.PROJECT_MANAGER, 13, '#9d85ab')
      },
      {
        id: 3,
        role: ProjectRoles.PARTICIPANT, 
        user: new User('d@d.ru', 'Ilya', 'Pahomov', 'PI-19-2', UserRoles.STUDENT, 14, '#9df5ab')
      },
      {
        id: 4,
        role: ProjectRoles.PARTICIPANT, 
        user: new User('c@c.ru', 'Kirill', 'Pahomov', 'PI-19-2', UserRoles.STUDENT, 15, '#9da5ab')
      },
      {
        id: 5,
        role: ProjectRoles.PARTICIPANT, 
        user: new User('e@e.ru', 'Boris', 'Pahomov', 'PI-19-2', UserRoles.STUDENT, 16, '#5185ab')
      },
    ],
    tasks: [
      {
        id: 1,
        code: 'PROJ-1',
        title: 'Создать новый модуль бла бла бла',
        status: TaskStatus.IN_PROGRESS,
        description: 'Пососать яйки',
        createdAt: new Date().toString(),
        estimatedTime: '1d 4h',
        asignee: 1
      },
      {
        id: 2,
        code: 'PROJ-2',
        title: 'Запах секса',
        status: TaskStatus.BACKLOG,
        description: 'Пососать яйки',
        createdAt: new Date().toString(),
        estimatedTime: '1d',
        asignee: 2
      },
      {
        id: 3,
        code: 'PROJ-3',
        title: 'Что?',
        status: TaskStatus.IN_PROGRESS,
        description: 'Пососать яйки',
        createdAt: new Date().toString(),
        estimatedTime: '4h',
        asignee: 3
      },
      {
        id: 4,
        code: 'PROJ-4',
        title: 'Готово',
        status: TaskStatus.DONE,
        description: 'Пососать яйки',
        createdAt: new Date().toString(),
        estimatedTime: '1d 4h',
        asignee: 4
      }
    ]
  },
  tasksFilter: {
    key: 'participant',
    value: [
      1,
      2
    ]
  },
  projectTime: null,
  activeTab: 'participants'
}

const setProjectHandler = (state, action) => {
  return {
    ...state,
    project: action.payload
  }
}

const setProjectTimeHandler = (state, action) => {
  return {
    ...state,
    projectTime: action.payload
  }
}

const setTasksFilterHandler = (state, action) => {
  return {
    ...state,
    tasksFilter: action.payload
  }
}

const setProjectTasksHandler = (state, action) => {
  return {
    ...state,
    project: {
      ...state.project,
      tasks: action.payload
    }
  }
}

const setActiveTabHandler = (state, action) => {
  return {
    ...state,
    activeTab: action.payload
  }
}

const projectViewReducer = handleActions(
  new Map([
    [
      setProject,
      setProjectHandler
    ],
    [
      setProjectTime,
      setProjectTimeHandler
    ],
    [
      setActiveTab,
      setActiveTabHandler
    ],
    [
      setTasksFilter,
      setTasksFilterHandler
    ],
    [
      setProjectTasks,
      setProjectTasksHandler
    ]
  ]),
  initialState
)

export {
  projectViewReducer
}
