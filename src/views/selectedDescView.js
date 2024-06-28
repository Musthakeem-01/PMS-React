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
import "flatpickr/dist/flatpickr.min.css";

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
  const { weekNumber, year } = getCurrentWeekDate();
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [showDiv, setShowDiv] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [comment, setComment] = useState("");
  const [showdept, setshowdept] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    handleOpen();
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
  const handleCommentCick = () => {};
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
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700">
                        Start
                      </label>
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
                  <div className="flex items-center mt-4">
                    <label htmlFor="assignee" className="mr-2">
                      Assign To:
                    </label>

                    <select
                      id="assignee"
                      className="border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="">Select Assignee</option>
                      <option value="user1">User 1</option>
                      <option value="user2">User 2</option>
                    </select>
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
