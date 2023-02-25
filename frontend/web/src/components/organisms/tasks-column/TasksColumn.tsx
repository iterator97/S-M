import { Box, Container } from "@mui/material";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { IWorkTask } from "../../../models";
import { useAppSelector } from "../../../store/hooks";
import { TaskColumn } from "../../molecules";

interface TasksColumn {
  Status?: number;
}

const TasksColumn = (props: TasksColumn) => {
  const [modal, setModal] = useState(false);

  const workTasks = useAppSelector((state) =>
    state.subProject.workTasks?.filter((x: any) => x.status == props.Status)
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
          {renderSwitch(props.Status)}
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {workTasks && workTasks.length > 0 ? (
            workTasks.map((item: any) => {
              return (
                <TaskColumn
                  key={item.id}
                  data={item}
                  modal={modal}
                  setModal={setModal}
                />
              );
            })
          ) : (
            <></>
          )}
        </List>
      </Container>
    </Box>
  );
};

export default TasksColumn;
