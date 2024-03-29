import { createRequestAction } from "@/actions/requests";
import { createAction } from "redux-actions";
import { projectsApi } from "@/api/projectsApi";

const FEATURE_NAME = "PROJECTS";

export const setProjects = createAction(`${FEATURE_NAME}/SET_PROJECTS`);

export const fetchProjects = createRequestAction(
  "fetchProjects",
  () => async (dispatch) => {
    const projects = await projectsApi.fetchProjects();
    dispatch(setProjects(projects));
    return projects;
  }
);

export const fetchAllProjects = createRequestAction(
  "fetchAllProjects",
  () => async (dispatch) => {
    const projects = await projectsApi.fetchAllProjects();
    dispatch(setProjects(projects));
    return projects;
  }
);

export const createProject = createRequestAction(
  "createProject",
  (data) => async (dispatch) => {
    const project = await projectsApi.createProject(data);
    return project;
  }
);
