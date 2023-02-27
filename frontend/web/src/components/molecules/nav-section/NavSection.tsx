import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
import { Box, List, ListItemText } from "@mui/material";
import { StyledNavItem, StyledNavItemIcon } from "./styles";
import LabelIcon from "@mui/icons-material/Label";
import { Menu } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import {
  FolderOpenOutlined,
  FolderOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

export default function NavSection(props: any) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const onCollapse = (collapsedValue: boolean) => {
    setCollapsed(collapsedValue);
  };

  let arr = props.data;
  return (
    <div>
      <Sider collapsed={collapsed} onCollapse={onCollapse}>
        <Menu
          mode="inline"
          style={{
            width: 256,
          }}
        >
          {arr != null ? (
            <SubMenu
              key="sub1"
              icon={<FolderOutlined />}
              title="Projekty"
              style={{ color: "black !important" }}
            >
              {arr.map((x: any) => {
                return (
                  <SubMenu
                    key={x.id}
                    title={x.name}
                    icon={<FolderOpenOutlined />}
                  >
                    {x.subProjects.map((y: any) => {
                      return (
                        <Menu.Item key={y.id}>
                          {" "}
                          <StyledNavItem
                            component={RouterLink}
                            to={"project/" + x.id + "/subProject/" + y.id}
                            sx={{
                              "&.active": {
                                bgcolor: "action.selected",
                                fontWeight: "fontWeightBold",
                              },
                            }}
                          >
                            <StyledNavItemIcon>
                              <LabelIcon />
                            </StyledNavItemIcon>

                            <ListItemText disableTypography primary={y.name} />
                          </StyledNavItem>
                        </Menu.Item>
                      );
                    })}
                    <Menu.Item>
                      <StyledNavItem
                        component={RouterLink}
                        to={"project/" + x.id}
                        sx={{
                          "&.active": {
                            color: "text.primary",
                            bgcolor: "action.selected",
                            fontWeight: "fontWeightBold",
                          },
                        }}
                      >
                        <StyledNavItemIcon>
                          <EditIcon />
                        </StyledNavItemIcon>

                        <ListItemText
                          disableTypography
                          primary="Edytuj projekt"
                        />
                      </StyledNavItem>
                    </Menu.Item>
                  </SubMenu>
                );
              })}
            </SubMenu>
          ) : (
            <></>
          )}
          <Menu
            mode="inline"
            style={{
              width: 256,
            }}
          >
            <StyledNavItem
              component={RouterLink}
              to={"newSpace"}
              sx={{
                "&.active": {
                  color: "text.primary",
                  bgcolor: "action.selected",
                  fontWeight: "fontWeightBold",
                },
              }}
            >
              <StyledNavItemIcon>
                <AddIcon />
              </StyledNavItemIcon>

              <ListItemText disableTypography primary={"Dodaj projekt"} />
            </StyledNavItem>
          </Menu>
        </Menu>
      </Sider>
    </div>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }: any) {
  return (
    <StyledNavItem
      component={RouterLink}
      to={"space/" + item.id}
      sx={{
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
    >
      <StyledNavItemIcon>
        <LabelIcon />
      </StyledNavItemIcon>

      <ListItemText disableTypography primary={item.name} />
    </StyledNavItem>
  );
}

// function NavItem({ item }: any) {
//   return (
//     <StyledNavItem
//       component={RouterLink}
//       to={"space/" + item.id}
//       sx={{
//         "&.active": {
//           color: "text.primary",
//           bgcolor: "action.selected",
//           fontWeight: "fontWeightBold",
//         },
//       }}
//     >
//       <StyledNavItemIcon>
//         <LabelIcon />
//       </StyledNavItemIcon>

//       <ListItemText disableTypography primary={item.name} />
//     </StyledNavItem>
//   );
// }
