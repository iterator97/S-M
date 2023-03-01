import { Box, Container } from "@mui/material";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { TaskColumn } from "../../molecules";

interface TasksColumn {
  workTasks?: any;
  Status?: number;
}

const TasksColumns = (props: TasksColumn) => {
  const [modal, setModal] = useState(false);

  const tasks = props.workTasks?.filter((x: any) => x.status == props.Status);

  const renderSwitch = (param: number | undefined) => {
    switch (param) {
      case 0:
        return "Nie przypisane";
      case 1:
        return "Przypisane";
      case 2:
        return "W trakcie";
      case 3:
        return "Skończone";
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
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {tasks && tasks.length > 0 ? (
            tasks.map((item: any) => {
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

export default TasksColumns;
