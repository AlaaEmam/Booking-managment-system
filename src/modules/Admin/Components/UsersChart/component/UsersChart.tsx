

import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { ADMINChart, axiosInstance } from '../../../../../constants/URLS';

interface usersIF {
  user: number;
  admin: number;
}

const size = {
  width: 400,
  height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {

  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function PieChartWithCenterLabel() {
  const [users, setusers] = React.useState<usersIF>(  {
        user: 0,
        admin: 0
      });

    React.useEffect(() => {
        const getChartData = async () => {
          const res = await axiosInstance.get(ADMINChart.getChart);
          setusers(res.data.data.users);
        };
        getChartData();
      }, [])

  const data = [
                  { label: "admin" , value: users.admin ,color:"var(--light-blue)" },
                  { label: 'user', value: users.user },

                ];

  return (
    <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
      <PieCenterLabel> users</PieCenterLabel>
    </PieChart>
  );
}