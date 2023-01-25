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
            <SubMenu key="sub1" icon={<FolderOutlined />} title="Projects">
              {arr.map((x: any) => {
                return (
                  <SubMenu
                    key={x.id}
                    title={x.name}
                    icon={<FolderOpenOutlined />}
                  >
                    {x.subSpaces.map((y: any) => {
                      return (
                        <Menu.Item key={y.id}>
                          {" "}
                          <StyledNavItem
                            component={RouterLink}
                            to={"subSpace/" + y.id}
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

                            <ListItemText disableTypography primary={y.name} />
                          </StyledNavItem>
                        </Menu.Item>
                      );
                    })}
                  </SubMenu>
                );
              })}
            </SubMenu>
          ) : (
            <></>
          )}
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
