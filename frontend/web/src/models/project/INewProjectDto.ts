export interface INewProjectDto {
  Name?: string;
  Description?: string;
  StartDate?: Date;
  EndDate: Date;
  SubProjects: Array<INewSubProjectDto>;
}

interface INewSubProjectDto {
  Id?: string;
  Name?: string;
}
