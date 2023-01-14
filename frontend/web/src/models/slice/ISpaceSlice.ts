import { ISpace } from "../space/ISpace";

export interface ISpaceSlice {
  spaces?: Array<ISpace> | null;
  loading?: boolean;
}
