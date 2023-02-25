import { ISubProject } from "./ISubProject";
import { IAttendee } from "./IAttendee";

export interface IProject {
  id?: string;
  name?: string;
  ownerId?: string;
  attendes: Array<IAttendee>;
  subProjects: Array<ISubProject>;
}
