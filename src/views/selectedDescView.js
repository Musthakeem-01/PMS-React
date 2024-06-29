import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import getData from "../../src/components/customcomponents/commonAPISelect";
import { getCurrentWeekDate } from "../../src/components/function/getCurrentWeekDate";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { FaPlay, FaPause, FaTimes } from "react-icons/fa";
import { FcDepartment } from "react-icons/fc";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import DataList from "../components/Grid/DataList";
import InfoIcon from "@mui/icons-material/Info";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const sectionStyle = {
  width: "60%",
  padding: "10px",
  boxSizing: "border-box",
  overflowY: "auto",
  height: "70vh",
};
const sectionStyle1 = {
  width: "40%",
  padding: "10px",
  boxSizing: "border-box",
};

const sectionContainer = {
  display: "flex",
  border: "1px solid #000",
  height: "70vh",
  overflowY: "auto",
};

const HeaderGrid = [
  { field: "Projects", headerName: "Projects-Name", width: 150 },
  { field: "ComplaintNo", headerName: "ComplaintNo", width: 100 },
  {
    field: "RequestDetailsDesc",
    headerName: "Summary",
    width: 400,
    renderCell: (params) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        {params.value}
        <InfoIcon style={{ marginLeft: 8 }} />
      </div>
    ),
  },
  { field: "ETADate", headerName: "ETADate", width: 150 },
  { field: "ETATime", headerName: "ETATime", width: 150 },
  { field: "ComplainerName", headerName: "ComplainerName", width: 150 },
  { field: "PriorityName", headerName: "Priority", width: 150 },
  { field: "CCMProTypeName", headerName: "Module", width: 100 },
  { field: "CCmWoTypeName", headerName: "Dept", width: 100 },
];

export default function DataTable(props) {
  const [response, setResponse] = useState([]);
  const { weekNumber, year } = getCurrentWeekDate();
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [showDiv, setShowDiv] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [comment, setComment] = useState("");
  const [showdept, setshowdept] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [complaintIDPK, setComplaintIDPK] = useState([]);
  const [cardHTML, setCardHTML] = useState([]);
  const [emp, setEmp] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false);
  const [name, setName] = useState();
  const [selectedInputValue, setselectedInputValue] = useState([]);
  const [createTaskkey, setCreateTaskkey] = useState([]);

  const dept = [
    { name: "BA", color: "bg-red-500" },
    { name: "DB", color: "bg-pink-400" },
    { name: "DEV", color: "bg-green-400" },
    { name: "QA", color: "bg-yellow-400" },
    { name: "IMP", color: "bg-blue-400" },
    { name: "DEP", color: "bg-orange-400" },
  ];
  useEffect(() => {
    if (response.length === 0) {
      fetchData();
    }
  }, [props.id]);

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
        ComplaintIDPK: item?.ComplaintIDPK || "",
      }))
    : [];

  const handleRowClick = async (params) => {
    setSelectedRow(params.row);
    handleOpen();
    setComplaintIDPK(params.row.ComplaintIDPK);
    try {
      const response = await getData("DashboardService/VwAPINSEIPLDetails/", {
        data: {
          p1_int: 91,
          p2_int: localStorage.getItem("eid"),
          p3_int: 0,
          p4_int: 0,
          p5_int: 0,
          p6_int: 0,
          P7_date: null,
          P8_date: null,
        },
      });
      const {
        Output: {
          status: { code },
          data,
        },
      } = response;

      if (data.length > 0) {
        setCardHTML(data);
      }
    } catch (error) {
      console.error("Error in handleSchedule:", error);
      // Handle error as needed
    }
    try {
      const response = await getData("DashboardService/VwAPINSEIPLALL/", {
        data: {
          QryType_int: 21,
          p3_int: 0,
          p4_int: 0,
          p5_int: 0,
          p6_int: 0,
          P7_date: null,
          P8_date: null,
        },
      });
      const {
        Output: {
          status: { code },
          data,
        },
      } = response;

      if (data.length > 0) {
        setEmp(data);
      }
    } catch (error) {
      console.error("Error in handleSchedule:", error);
      // Handle error as needed
    }
  };

  const inputSelected = (inputValue, refname) => {
    setselectedInputValue((prevCreateTaskkey) => ({
      ...prevCreateTaskkey,
      [refname]: inputValue,
    }));
  };
  const getKey = (key) => {
    let keys = key;
    for (let k in keys) {
      setCreateTaskkey((prevCreateTaskkey) => ({
        ...prevCreateTaskkey,
        [k]: keys[k],
      }));
    }
  };
  const handleShowDiv = () => {
    // if (showDiv) {
    //   setShowDiv(false);
    // } else {
    //   setShowDiv(true);
    // }
    setShowDiv(!showDiv);
  };
  const handleshowdept = () => {
    setshowdept(!showdept);
  };
  const handleComments = (comment) => {
    setComment(comment.target.value);
  };
  const formatDate = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };
  const handleSchedule = async (complaintIDPK) => {
    let from = startDate;
    let to = endDate;
    let fromDate = new Date(from);
    let toDate = new Date(to);
    let timeDifferenceInMinutes = Math.abs((toDate - fromDate) / (1000 * 60));
    const FromformattedDate = formatDate(fromDate); // Assuming formatDate is defined elsewhere
    const ToformattedDate = formatDate(toDate); // Assuming formatDate is defined elsewhere

    let urls = [
      `https://smartfm.in/NSEIPLSERVICE/SupportAnalysisUpdate.php?CCMComplaintID=${complaintIDPK}&CCMStartTime=${FromformattedDate}&CCMEndTime=${ToformattedDate}&OberVation=&Rootcause=&EmployeeID=${localStorage.getItem(
        "eid"
      )}&ResolutionTime=&MaintenanceHrs=&CorrectiveAction=&ServiceCarriedOut=&ExecEmpID=&TotalMin=${timeDifferenceInMinutes}&Type=EmpWorkAssign`,
      `https://smartfm.in/NSEIPLSERVICE/SupportAnalysisUpdate.php?CCMComplaintID=${localStorage.getItem(
        "eid"
      )}&CCMStartTime=${FromformattedDate}&CCMEndTime=${ToformattedDate}&TotalMin=${timeDifferenceInMinutes}`,
      `https://smartfm.in/NSEIPLSERVICE/HoldETA.php?ComplaintType=9&MaintenanceRemarks=${timeDifferenceInMinutes}&ETADate=null&ComplaintIDPK=${complaintIDPK}&ProDate=null&TypeID=0&TypeProID=0`,
    ];

    try {
      const fetchResponses = await Promise.all(
        urls.map((url) => fetch(url))
      ).then((response) => {
        if (response[0].status == 200) {
          window.alert("Task Scheduled Successfully");
        }
        // console.log(response, "rese");
      });
      // console.log("🚀 ~ handleSchedule ~ fetchResponses:", fetchResponses);

      // Assuming getData returns a Promise or can be awaited

      // const response = await getData("DashboardService/VwAPINSEIPLDetails/", {
      //   data: {
      //     p1_int: 91,
      //     p2_int: localStorage.getItem("eid"),
      //     p3_int: 0,
      //     p4_int: 0,
      //     p5_int: 0,
      //     p6_int: 0,
      //     P7_date: null,
      //     P8_date: null,
      //   },
      // });
      // const {
      //   Output: {
      //     status: { code },
      //     data,
      //   },
      // } = response;

      // if (data.length > 0) {
      //   setCardHTML(data);
      // }
    } catch (error) {
      console.error("Error in handleSchedule:", error);
      // Handle error as needed
    }
  };

  async function ScheduleB4startWorkTask(urls, final) {
    try {
      const responses = await Promise.all(urls.map((url) => fetch(url)));
      const results = await Promise.all(
        responses.map(async (response, index) => {
          if (!response.ok) {
            throw new Error(
              `HTTP error for URL ${urls[index]}! Status: ${response.status}`
            );
          }
          return await response.text();
        })
      );
      const [result1, result2, wotypedata] = results;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      if (final && final == "scheduleRefresh") {
        alert("Task Scheduled Successfully");
        // showAlert(1,"Task Scheduled Successfully")
        document.getElementById("scheduleList").innerHTML = getScheduledList();
      }
      if (final && final == "sprintChanged") {
        // useEffect();
      }
    }
  }
  const getScheduledList = () => {};
  const handleCommentCick = () => {
    console.log("add");
  };

  const handleFocus = () => {
    setIsListVisible(!isListVisible);
  };

  const handleassign = () => {};
  const handleemp = () => {};
  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={BodyContent}
          columns={HeaderGrid}
          className="bg-white hover:bg-gray-100 cursor-pointer"
          onRowClick={handleRowClick}
        />
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          disableEnforceFocus
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <div className="relative">
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  {selectedRow?.Projects || "No Title"}
                </Typography>
              </div>
              <IoClose
                className="absolute top-0 right-0 text-4xl cursor-pointer"
                onClick={handleClose}
              />
              <Box
                sx={sectionContainer}
                className="scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
              >
                <Box
                  sx={sectionStyle}
                  style={{ borderRight: "1px solid #000" }}
                  className="scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
                >
                  <div id="transition-modal-description" sx={{ mt: 2 }}>
                    <div className="w-full h-[30vh] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                      <div>
                        <p>CheckPoint </p>
                      </div>
                      <div className="w-full mx-auto ">
                        <div className="flex items-start mb-4">
                          <div className="flex-grow">
                            <textarea
                              value={comment}
                              onChange={handleComments}
                              placeholder="Add your CheckPoint..."
                              className="w-full border border-gray-300 rounded-lg py-2 px-4 min-h-[100px] resize-none"
                            />
                            <div className="flex justify-between items-center mt-2">
                              <div className="flex space-x-2">
                                <FcDepartment onClick={handleshowdept} />
                              </div>
                              <button
                                onClick={handleCommentCick}
                                className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm"
                              >
                                ADD
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {showdept &&
                            dept.map((deptItem, index) => (
                              <div
                                key={index}
                                className="flex items-center cursor-pointer"
                              >
                                <div
                                  className={`w-6 h-6 rounded-full ${deptItem.color} mr-2`}
                                ></div>
                                <span>{deptItem.name}</span>
                              </div>
                            ))}
                        </div>
                        <div className="border border-s-amber-500 h-[40vh]"></div>
                      </div>
                    </div>
                  </div>
                </Box>
                <Box sx={sectionStyle1}>
                  <div className="flex w-full space-x-4 mb-2">
                    <div className="w-1/4">
                      <button className="flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
                        Start
                        <FaPlay className="ml-2" />
                      </button>
                    </div>
                    <div className="w-1/4">
                      <button className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded">
                        Pause
                        <FaPause className="ml-2" />
                      </button>
                    </div>
                    <div className="w-1/4">
                      <button className="flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">
                        Close
                        <FaTimes className="ml-2" />
                      </button>
                    </div>
                  </div>

                  <div
                    onClick={handleShowDiv}
                    className="border border-blue-600 h-[8vh] cursor-pointer bg-white focus:outline-none ring-1 focus:ring-3 focus:ring-blue-600 flex justify-between"
                  >
                    <p className="mt-2">Details</p>
                    {showDiv ? (
                      <IoIosArrowUp className="mt-2" />
                    ) : (
                      <IoIosArrowDown className="mt-2" />
                    )}
                  </div>
                  {showDiv && (
                    <div className="border border-red-500">
                      <div id="transition-modal-description" className="mt-2">
                        <div className="grid grid-cols-[40%_60%] mt-3">
                          <div>Complainer Name:</div>
                          <div className="flex gap-1">
                            <AiOutlineUser className="mt-1 text-base bg-slate-400 text-stone-200" />
                            {selectedRow?.ComplainerName || "No Data"}
                          </div>
                        </div>
                        <div className="grid grid-cols-[40%_60%] mt-3">
                          <div>Priority:</div>
                          <div>{selectedRow?.PriorityName || "No Data"}</div>
                        </div>
                        <div className="grid grid-cols-[40%_60%] mt-3">
                          <div>Module:</div>
                          <div>{selectedRow?.CCMProTypeName || "No Data"}</div>
                        </div>
                        <div className="grid grid-cols-[40%_60%] mt-3">
                          <div>Dept:</div>
                          <div>{selectedRow?.CCmWoTypeName || "No Data"}</div>
                        </div>
                        <div className="grid grid-cols-[40%_60%] mt-3">
                          <div>Complaint No:</div>
                          <div>{selectedRow?.ComplaintNo || "No Data"}</div>
                        </div>
                        <div className="grid grid-cols-[40%_60%] mt-3">
                          <div>Summary:</div>
                          <div>
                            {selectedRow?.RequestDetailsDesc || "No Data"}
                          </div>
                        </div>
                        <div className="grid grid-cols-[40%_60%] mt-3">
                          <div>ETA Date:</div>
                          <div>{selectedRow?.ETADate || "No Data"}</div>
                        </div>
                        <div className="grid grid-cols-[40%_60%] mt-3">
                          <div>ETA Time:</div>
                          <div>{selectedRow?.ETATime || "No Data"}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="">
                      <label className="block text-sm font-medium text-gray-700">
                        Start
                      </label>
                      <div>
                        <Flatpickr
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                          value={startDate}
                          onChange={([date]) => setStartDate(date)}
                          options={{
                            enableTime: true,
                            dateFormat: "Y-m-d H:i",
                            allowInput: true,
                          }}
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700">
                        End
                      </label>
                      <Flatpickr
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                        value={endDate}
                        onChange={([date]) => setEndDate(date)}
                        options={{
                          enableTime: true,
                          dateFormat: "Y-m-d H:i",
                          allowInput: true,
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-2	">
                    <button
                      className="bg-amber-500 text-xs text-white px-4 py-1 font-medium rounded-full hover:bg-amber-600"
                      onClick={() => {
                        if (!startDate || !endDate) {
                          window.alert("Please fill in the Start and End time");
                        } else {
                          handleSchedule(complaintIDPK);
                        }
                      }}
                    >
                      Schedule
                    </button>
                  </div>
                  <div className="h-[25vh] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 overflow-y-auto  mt-4">
                    <p className=" text-sm font-medium text-gray-700">
                      Work Details
                    </p>
                    <div className="flex flex-col mt-2  ">
                      <div className="flex w-full text-white bg-purple-600 p-1">
                        <p className="text-xs w-1/3">
                          <strong>Work Start Time</strong>
                        </p>
                        <p className="text-xs w-1/3">
                          <strong>Work End Time</strong>
                        </p>
                        <p className="text-xs w-1/3">
                          <strong>Work Total Minutes</strong>
                        </p>
                      </div>
                      {cardHTML.map((e, index) => (
                        <div
                          className="flex flex-col p-1 sm:flex-row"
                          key={index}
                        >
                          <div className="flex w-full text-gray-900">
                            <p className="text-xs w-1/3">{e.WorkStartTime}</p>
                            <p className="text-xs w-1/3">{e.WorkEndTime}</p>
                            <p className="text-xs w-1/3">{e.WorkTotalMin}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <label htmlFor="assignee" className="mr-2">
                      Assign To:
                    </label>
                    <div className="relative h-full rounded-md shadow-sm bg-white border-none outline-none">
                      <div className="relative">
                        <DataList
                          inputSelected={inputSelected}
                          options={emp}
                          fieldName={"Employee"}
                          refname={"EmpName"}
                          refid={"NSEEMPID"}
                          getKey={getKey}
                        />
                      </div>
                    </div>

                    <div className="ml-1">
                      <button
                        className="bg-blue-800 text-xs text-white px-4 py-1 font-medium rounded-full hover:bg-blue-600"
                        onClick={handleassign}
                      >
                        Assign
                      </button>
                    </div>
                  </div>
                </Box>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
}
