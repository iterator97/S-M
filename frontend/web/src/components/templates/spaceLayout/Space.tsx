import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useAppSelector } from "../../../store/hooks";
import { useParams } from "react-router-dom";
import { iteratorSymbol } from "immer/dist/internal";
import Space from "../../pages/space/Space";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
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
    </div>
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

  console.log(spaces);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {spaces &&
            spaces[0].subSpaces?.map((item) => {
              return (
                <Tab label={item.name} key={item.id} {...a11yProps(item.id)} />
              );
            })}
        </Tabs>
      </Box>
      <TabPanel value={value} index={value}>
        {spaces ? <Space id={spaces[0].subSpaces[value].id} /> : <>Err</>}
      </TabPanel>
    </Box>
  );
}
