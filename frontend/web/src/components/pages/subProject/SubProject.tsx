import Box from "@mui/material/Box";
import { useAppSelector } from "../../../store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { iteratorSymbol } from "immer/dist/internal";
import Space from "../../organisms/subproject-content/SubProjectContent";
import { Button, Container, Grid, Popover } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import SubSpace from "../../organisms/subproject-content/SubProjectContent";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";

import {
  AddWorkTaskPopover,
  SubProjectContent,
  TasksColumns,
} from "../../organisms";
import { getSubProjectData } from "../../../store/subProjects/actions/getSubProjectData";

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SubProject() {
  const navigate = useNavigate();
  const params = useParams();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (params.subId) {
      dispatch(getSubProjectData(params.subId));
    }
  }, [params.id]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Grid container direction="row" justifyContent="flex-end">
          <Button
            variant="text"
            startIcon={<AddIcon />}
            size="large"
            onClick={() => navigate("newTask")}
          >
            Add work task
          </Button>
        </Grid>
        <Grid container direction="row" justifyContent="flex-end">
          <Button variant="text" startIcon={<AddIcon />} size="large">
            Edit subSpace
          </Button>
        </Grid>
      </Box>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={3}
            sx={{
              width: "25%",
              border: "1px solid purple",
            }}
          >
            <TasksColumns Status={0} />
          </Grid>
          <Grid item xs={3}>
            <TasksColumns Status={1} />
          </Grid>
          <Grid item xs={3}>
            <TasksColumns Status={2} />
          </Grid>
          <Grid item xs={3}>
            <TasksColumns Status={3} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
