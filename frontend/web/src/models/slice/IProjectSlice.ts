import { IProject } from "../project/IProject";

export interface IProjectSlice {
  projects?: Array<IProject> | null;
  loading?: boolean;
}
