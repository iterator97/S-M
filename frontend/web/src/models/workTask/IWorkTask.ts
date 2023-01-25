export interface SubTask {
  Id?: string;
  Description?: string;
  Status?: boolean;
}

export interface IWorkTask {
  Id?: string;
  Content?: string;
  SubContent?: string;
  Status?: number;
  SubSpaceId?: string;
  SubTasks?: Array<SubTask>;
}
