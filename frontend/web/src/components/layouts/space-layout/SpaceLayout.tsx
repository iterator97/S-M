import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useAppSelector } from "../../../store/hooks";
import { useParams } from "react-router-dom";
import { iteratorSymbol } from "immer/dist/internal";
import Space from "../../pages/space/Space";
import { Button, Container, Grid, Popover } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { AddWorkTaskPopover } from "../../organisms";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const [addWorkTaskMode, setAddWorkTaskMode] = useState(false);
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SpaceLayout() {
  let params = useParams();

  const [value, setValue] = React.useState(0);
  const spaces = useAppSelector((state) =>
    state.space.spaces?.filter((space) => space.id != params.id)
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        {" "}
        <Tabs value={value} onChange={handleChange}>
          {spaces &&
            spaces[0].subSpaces?.map((item) => {
              return (
                <Tab label={item.name} key={item.id} {...a11yProps(item.id)} />
              );
            })}
        </Tabs>
        <Grid container direction="row" justifyContent="flex-end">
          <Button variant="text" startIcon={<AddIcon />} size="large">
            Add work task
          </Button>
        </Grid>
      </Box>
      <TabPanel value={value} index={value}>
        {spaces ? (
          <Space id={spaces[0].subSpaces[value].id} />
        ) : (
          <Container>Err</Container>
        )}
      </TabPanel>
      <Popover
        open={true}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        {spaces ? (
          <>
            {" "}
            <AddWorkTaskPopover subSpaces={spaces[0].subSpaces} />
          </>
        ) : (
          <></>
        )}
      </Popover>
    </Box>
  );
}
