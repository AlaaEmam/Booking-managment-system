import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { ADMINChart, axiosInstance } from "../../../../../constants/URLS";
import { Box, Typography } from "@mui/material";

interface rooms {
  pending: number;
  completed: number;
}

export default function BookingChart() {
  const [rooms, setrooms] = useState<rooms>({
    pending: 0,
    completed: 0,
  });

  useEffect(() => {
    const getChartData = async () => {
      const res = await axiosInstance.get(ADMINChart.getChart);
      setrooms(res.data.data.bookings);
    };
    getChartData();
  }, []);

  return (
    <>
      <Box sx={{ color: 'black' }}>
        <Typography variant="h6" sx={{ margin: 2, fontWeight: 900 }}>
          Booking Status: Complete vs. Pending
        </Typography>

        <PieChart
        
          series={[
            {
              data: [
                {
                  id: 1,
                  value: rooms.pending,
                  label: "pending",
                  color: "var(--dark-blue)",
                },
                {
                  id: 2,
                  value: rooms.completed,
                  label: "completed",
                  color: "#b800d8",
                },
              ],
            },
          ]}
          width={400}
          height={200}
        />
      </Box>
    </>
  );
}
