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

import { AddWorkTaskPopover, SubProjectContent } from "../../organisms";
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
    if (params.id) {
      dispatch(getSubProjectData(params.id));
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
      <SubProjectContent />
    </Box>
  );
}
