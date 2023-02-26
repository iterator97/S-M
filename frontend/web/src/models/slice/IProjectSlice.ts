import { IAttendee } from "./../project/IAttendee";
import { IProject } from "../project/IProject";

export interface IProjectSlice {
  projects?: Array<IProject> | null;
  loading?: boolean;
  otherUsers?: any;
}
