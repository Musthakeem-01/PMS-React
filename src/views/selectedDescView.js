import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import getData from "../../src/components/customcomponents/commonAPISelect";
import { getCurrentWeekDate } from "../../src/components/function/getCurrentWeekDate";

const HeaderGrid = [
  { field: "Projects", headerName: "Projects-Name", width: 150 },
  { field: "ComplaintNo", headerName: "ComplaintNo", width: 100 },
  { field: "RequestDetailsDesc", headerName: "Summary", width: 400 },
  { field: "ETADate", headerName: "ETADate", width: 150 },
  { field: "ETATime", headerName: "ETATime", width: 150 },
  { field: "ComplainerName", headerName: "ComplainerName", width: 150 },
  { field: "PriorityName", headerName: "Priority", width: 150 },
  { field: "CCMProTypeName", headerName: "Module", width: 100 },
  { field: "CCmWoTypeName", headerName: "Dept", width: 100 },
];

export default function DataTable(props) {
  const [response, setResponse] = useState([]);
  //   console.log("🚀 ~ DataTable ~ response:", response);
  const { weekNumber, year } = getCurrentWeekDate();

  useEffect(() => {
    if (response.length === 0) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const result = await getData("DashboardService/VwAPINSEIPLDetailsNew/", {
        data: {
          p1_int: 7,
          p2_int: weekNumber,
          p3_int: year,
          p4_int: null,
          p5_int: null,
          p6_int: localStorage.getItem("eid"),
          P7_int: props.id,
          P9_varchar: null,
          P10_varchar: "",
          UserID_int: 0,
        },
      });
      const {
        Output: { status, data },
      } = result;
      if (status.code === "200") {
        setResponse(data);
      } else {
        console.error("Error fetching data:", status.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const BodyContent = response
    ? response.map((item, index) => ({
        id: index,
        Projects: props.desc || "",
        ComplaintNo: item?.ComplaintNo || "",
        RequestDetailsDesc: item?.RequestDetailsDesc || "",
        ETADate: item?.ETADate || "",
        ETATime: item?.ETATime || "",
        ComplainerName: item?.ComplainerName || "",
        PriorityName: item?.PriorityName || "",
        CCMProTypeName: item?.CCMProTypeName || "",
        CCmWoTypeName: item?.CCmWoTypeName || "",
      }))
    : [];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={BodyContent}
        columns={HeaderGrid}
        className="bg-white hover:bg-gray-100 cursor-pointer"
        // initialState={{
        //   pagination: {
        //     paginationModel: { page: 0, pageSize: 10 },
        //   },
        // }}
        // pageSizeOptions={[10, 20]}
      />
    </div>
  );
}
