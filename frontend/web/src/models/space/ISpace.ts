import { ISubSpace } from "./ISubSpace";
import { IAttendee } from "./IAttendee";

export interface ISpace {
  id?: string;
  name?: string;
  ownerId?: string;
  attendes: Array<IAttendee>;
  subSpaces: Array<ISubSpace>;
}
