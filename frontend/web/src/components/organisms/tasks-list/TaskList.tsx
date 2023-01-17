import { Box, Container } from "@mui/material";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { IWorkTask } from "../../../models";
import { useAppSelector } from "../../../store/hooks";
import { TaskColumn } from "../../molecules";

interface TasksColumn {
  status?: number;
}

const TaskList = (props: TasksColumn) => {
  const workTasks = useAppSelector((state) =>
    state.workTask.workTasks?.filter((x: IWorkTask) => x.status == props.status)
  );

  const renderSwitch = (param: number | undefined) => {
    switch (param) {
      case 0:
        return "Not assigned";
      case 1:
        return "Assigned";
      case 2:
        return "In progress";
      case 3:
        return "Done";
      default:
        return "";
    }
  };

  return (
    <Box>
      <Container>
        <Typography variant="h5" component="h2" style={{ textAlign: "center" }}>
          {renderSwitch(props.status)}
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {workTasks && workTasks.length > 0 ? (
            workTasks.map((item: any) => {
              return <TaskColumn key={item.id} data={item} />;
            })
          ) : (
            <></>
          )}
        </List>
      </Container>
    </Box>
  );
};

export default TaskList;
