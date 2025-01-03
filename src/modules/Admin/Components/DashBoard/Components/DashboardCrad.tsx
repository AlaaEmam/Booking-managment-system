import React from 'react';
import { Paper, Typography, styled } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgb(26, 27, 30)",
  ...theme.typography.body2,
  textAlign: "start",
  padding: theme.spacing(2),
  color: theme.palette.common.white,
  display: "flex",
  justifyContent: "space-between",
  margin: "1.5rem 0",
  borderRadius: "15px",
}));

interface CardProps {
  count: number;
  label: string;
  iconColor: string;
  Icon: SvgIconComponent; // New prop for the icon
}

const DashboardCrad: React.FC<CardProps> = ({ count, label, iconColor, Icon }) => {
  return (
    <Item sx={{ padding: "2rem 2rem", display: "flex", justifyContent: "space-between" }}>
      <Typography variant="h4">
        {count}
        <Typography>{label}</Typography>
      </Typography>
      <Icon sx={{ color: iconColor, fontSize: 40 }} /> {/* Using the passed Icon */}
    </Item>
  );
};

export default DashboardCrad;
