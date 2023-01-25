import Box from "@mui/material/Box";
import { useAppSelector } from "../../../store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { iteratorSymbol } from "immer/dist/internal";
import Space from "../../pages/subspace-columns/SubSpaceColumns";
import { Button, Container, Grid, Popover } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import SubSpace from "../../pages/subspace-columns/SubSpaceColumns";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { getSubSpaceData } from "../../../store/subSpace/actions/getSubSpaceData";
import { AddWorkTaskPopover } from "../../organisms";
import SubSpaceColumns from "../../pages/subspace-columns/SubSpaceColumns";

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SubSpaceLayout() {
  const navigate = useNavigate();

  // SubSpace ID
  let params = useParams();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (params.id) {
      dispatch(getSubSpaceData(params.id));
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
      <SubSpaceColumns />
    </Box>
  );
}
