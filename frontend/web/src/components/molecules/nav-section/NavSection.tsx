import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import { Box, List, ListItemText } from "@mui/material";
//
import { StyledNavItem, StyledNavItemIcon } from "./styles";

// ----------------------------------------------------------------------

export default function NavSection(props: any) {
  console.log("props");

  console.log(props);

  return (
    <Box>
      <List disablePadding sx={{ p: 1 }}>
        {props.data.map((item: any) => (
          <NavItem key={item.id} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }: any) {
  console.log(item);

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
      <ListItemText disableTypography primary={item.nam}>
        {item.name}
      </ListItemText>
    </StyledNavItem>
  );
}
