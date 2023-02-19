import { handleActions } from 'redux-actions'
import { setProjects } from '@/actions/projects'
import { User } from '@/models/User'
import { ProjectRoles, UserRoles } from '../../enums/Role'
const initialState = {
  data: [{
    id: '1',
    name: 'Project1',
    description: 'asdasdasd',
    code: 1,
    dueDate: new Date().toString(),
    repo: '12',
    avatar: 'https://i.pravatar.cc/300',
    participants: [{ id: 1, role: ProjectRoles.PARTICIPANT, user: new User('b@b.ru', 'Alex', 'Bajin', 'PI-19-1', UserRoles.STUDENT, 12, '#9d85fc') }]
  }]
}

const setProjectsHandler = (state, action) => {
  return {
    ...state,
    data: action.payload
  }
}

const projectsReducer = handleActions(
  new Map([
    [
      setProjects,
      setProjectsHandler
    ]
  ]),
  initialState
)

export {
  projectsReducer
}
