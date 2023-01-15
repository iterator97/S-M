import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
import { Box, List, ListItemText } from "@mui/material";
import { StyledNavItem, StyledNavItemIcon } from "./styles";
import LabelIcon from "@mui/icons-material/Label";

export default function NavSection(props: any) {
  let arr = props.data;
  return (
    <>
      {arr ? (
        <>
          {" "}
          <Box>
            <List disablePadding sx={{ p: 1 }}>
              {props.data.map((item: any) => (
                <NavItem key={item.id} item={item} />
              ))}
            </List>
          </Box>
        </>
      ) : (
        <div>Problems while getting data</div>
      )}
    </>
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
