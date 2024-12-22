import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { ADMINChart, axiosInstance } from "../../../../../constants/URLS";
import RoomsList from "../../Rooms/RoomsList/RoomsList";

export default function Chart() {
  const [rooms, setrooms] = useState("")
  const [users, setusers] = useState("")


  useEffect(() => {
    const getChartData = async () => {
      const res = await axiosInstance.get(ADMINChart.getChart);
      setrooms(res.data.data.bookings);
      console.log(res.data.data.bookings)
      setusers( res.data.data.totalCount);

    }
    getChartData()
  }, []);

  return (
    <>

      <PieChart
        series={[
          {
            data:[
             { id: 1, value: `${rooms.pending}`, label: "pending" ,color: 'var(--dark-blue)' },
             { id: 2, value:`${rooms.completed}`, label: " completed",color:'#b800d8' },

            ],
          },
        ]}
        width={400}
        height={200}
    />

</>

  );
}
