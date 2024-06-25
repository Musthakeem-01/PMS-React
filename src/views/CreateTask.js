import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import getData from "../components/customcomponents/commonAPISelect";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";

import DataList from "../components/Grid/DataList";
export default function CreateTask(props) {
  // console.log(props, "props");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [activeTab, setActiveTab] = useState(1);
  const [contract, setContract] = useState([]);
  const [contracts, setContracts] = useState([]);

  // const [Contractdetails, setContractdetails] = useState([]);
  // console.log("🚀 ~ CreateTask ~ contract:", Contractdetails);
  const [Complaint, setComplint] = useState([]);
  const [workType, setWorkType] = useState([]);
  const [divisionDetails, setDivisionDetails] = useState([]);
  // console.log("🚀 ~ CreateTask ~ divisionDetails:", divisionDetails);
  const [dataDivision, setdataDivision] = useState([]);
  const [Module, setModule] = useState([]);
  const [Value, setValue] = useState(["Internal", "Client"]);
  const [Priority, setPriority] = useState([]);
  const [taskDescription, settaskDescription] = useState([]);
  const [week, setweek] = useState([]);
  const [emp, setemp] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [fullResponse, setFullResponse] = useState([]);
  // console.log("🚀 ~ CreateTask ~ fullResponse:", fullResponse);
  const [selectedcontract, setSelectedcontract] = useState("");
  // console.log("🚀 ~ CreateTask ~ selectedcontract:", selectedcontract);
  // console.log("🚀 ~ CreateTask ~ fullResponse:", fullResponse);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  const [startDate, setStartDate] = useState(null);
  // console.log("🚀 ~ CreateTask ~ startDate:", startDate);
  const [endDate, setEndDate] = useState(null);
  const [etaTime, setEtaTime] = useState("");
  const [selectedWorkorder, setselectedWorkorder] = useState("");
  const [selectedInput, setSelectedInput] = useState([]);
  const handleStartDateChange = (date) => {
    setStartDate(date);
    calculateEta(date, endDate);
  };

  const selectedVal = selectedcontract;

  // Find the object with the matching mapkey
  const selectedObject = fullResponse.find(
    (item) => item.mapkey === selectedVal
  );

  // Use the ternary operator to get the mapid if the object is found, otherwise use an empty string
  const selectedMapid = selectedObject ? selectedObject["mapid"] : "";

  // console.log("🚀 ~ CreateTask ~ selectedInput:", selectedVal);
  // console.log("Selected mapid:", selectedMapid);

  const handleEndDateChange = (date) => {
    setEndDate(date);
    calculateEta(startDate, date);
  };
  const handleInputValue = (value) => {
    settaskDescription(value.target.value);
  };

  const inputSelected = (inputValue) => {
    console.log("🚀 ~ inputSelected ~ inputValue:", inputValue);
    setSelectedInput(inputValue);
    setselectedWorkorder(inputValue);
    setSelectedcontract(inputValue);
  };
  const calculateEta = (fromDate, toDate) => {
    if (fromDate && toDate) {
      const diffInMilliseconds = toDate - fromDate;
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
      setEtaTime(diffInMinutes.toString());
      // console.log(`ETATime: ${diffInMinutes} minutes`);
    }
  };

  async function getdata1(id) {
    const selectedDivision = divisionDetails.find(
      (division) => division.DivisionName === id
    );

    if (selectedDivision) {
      await fetchData1(
        5,
        setdataDivision,
        "ComplaintNatureName",
        selectedDivision.DivisionIDPK
      );
    }
  }
  const removeImage = (name) => {
    setPreviewImages((prev) => prev.filter((image) => image.name !== name));
  };

  const handleCreateTask = async () => {
    console.log(document.getElementById("contract"), "ref");
    const param = {
      NatureOfComplaint: selectedWorkorder, //Division
      UserID: localStorage.getItem("eid"), //eid
      Email: null,
      Description: taskDescription, //taskDescription
      ContractID: contract, //contractName
      // LocalityID: document.getElementById("CT_Locality_ID").value,
      // BuildingID: document.getElementById("CT_Building_ID").value,
      FloorID: 0,
      SpotID: 0,
      ComplainerName: localStorage.getItem("username"),
      ContactNo: null,
      PortalType: 2,
      DocID: null,
      DivisionID: workType, //workType
      PriorityID: Priority ? Priority : 1,
      EmpID: localStorage.getItem("eid"),
      ProDate: Value == "Client" ? "" : startDate,
      ProDate: startDate,
      TaskType: Value == "Internal" ? 2 : 1,
      EndDate: endDate,
      // EndDate: taskType == 'client' ? '' : toDateInput.value,
      WoTypeID: Complaint, //Complaint id
      WoProTypeID: Module, //Module
      TradeGrpID: 0, //parentTId ? parentTId : 0
      IsBMS: Value == "Client" ? 1 : 0,
    };
    console.log(param);
  };
  const fetchData1 = async (typeID, setState, mapKey, DivisionIDPK, mapId) => {
    //console.log("🚀 ~ fetchData1 ~ DivisionIDPK:", DivisionIDPK);
    try {
      if (DivisionIDPK) {
        const url = `https://smartfm.in/NSEIPLWEBANDMOBILEPORTAL/WebPortalLocDetailsNew.php?TypeID=${typeID}&DivisionID=${DivisionIDPK}&CategoryID=1`;
        const response = await fetch(url);
        const data = await response.json();
        let value = data.map((e) => ({
          name: e[mapKey],
          id: e[mapId],
        }));
        setState(value);
      } else {
        console.warn("NstUserID is not available in localStorage.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const getKey = (key) => {
    console.log(key, "key");
  };

  useEffect(() => {
    const fetchData = async (typeID, setState, mapKey, mapId) => {
      // console.log("🚀 ~ useEffect ~ mapKey:", mapId);
      try {
        let NstUserID = localStorage.getItem("UserIDPK");
        // console.log("🚀 ~ fetchData ~ NstUserID:", NstUserID);
        if (NstUserID) {
          const url = `https://smartfm.in/NSEIPLWEBANDMOBILEPORTAL/WebPortalLocDetailsNew.php?TypeID=${typeID}&UserID=${NstUserID}`;
          const response = await fetch(url);
          const data = await response.json();
          let responses = data.map((e) =>
            mapKey && mapId ? { mapkey: e[mapKey], mapid: e[mapId] } : e
          );
          setFullResponse(responses);
          let value = data.map((e) => ({
            name: e[mapKey],
            id: e[mapId],
          }));
          setState(value);
        } else {
          console.warn("NstUserID is not available in localStorage.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchEmployeeData = async () => {
      try {
        const response = await getData("DashboardService/VwAPINSEIPLALL/", {
          data: {
            QryType_int: 21,
          },
        });
        const {
          Output: { status, data },
        } = response;
        if (response.Output.status.code === "200") {
          let responses = data.map((e) => e.EmpName);
          setemp(responses);
        } else {
          console.error("Error fetching data:", status.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    const fetchAllData = async () => {
      await fetchData(101, setContract, "ContractName", "ContractID");
      // await fetchData(101, setContractdetails);
      await fetchData(10, setComplint, "CCmWoTypeName", "CCMWoTypeIDPK");
      await fetchData(8, setWorkType, "DivisionName");
      await fetchData(8, setDivisionDetails);

      await fetchData(11, setModule, "CCMProTypeName", "CCMProTypeIDPK");
      await fetchData(13, setweek, "SprintName");
      await fetchData(12, setPriority, "PriorityName");
      await fetchEmployeeData();
    };

    fetchAllData();
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    width: "80%",
    height: "450px",
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => {
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onload = () => {
            resolve({
              src: reader.result,
              name: file.name,
            });
          };
          reader.readAsDataURL(file);
        });
      });
      Promise.all(newImages).then((images) =>
        setPreviewImages((prev) => [...prev, ...images])
      );
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        style={{ textTransform: "capitalize" }}
        onClick={handleOpen}
      >
        Create
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IoClose
            className="absolute top-0 right-0   text-4xl cursor-pointer"
            onClick={handleClose}
          />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div
              className="hidden md:flex rounded p-1 bg-white text-center leading-none gap-x-1 justify-center mt-2 w-full ring-2 ring-gray-300"
              role="group"
            >
              <button
                id="collapseTaskDetTab_1"
                type="button"
                className={`rounded text-xs hover:bg-blue-100 p-1 tab-button w-1/2 focus:outline-none border-none text-blue-600 font-bold ${
                  activeTab === 1 ? "bg-blue-100" : ""
                }`}
                onClick={() => handleTabClick(1)}
              >
                <i className="bi bi-chat-text w-4 h-4 mr-1"></i> Request
                Complaint
              </button>
              <button
                id="collapseTaskDetTab_2"
                type="button"
                className={`rounded text-xs hover:bg-blue-100 p-1 tab-button w-1/2 focus:outline-none border-none text-blue-600 font-bold ${
                  activeTab === 2 ? "bg-blue-100" : ""
                }`}
                onClick={() => handleTabClick(2)}
              >
                <i className="bi bi-table w-4 h-4 mr-1"></i> Checkpoints
              </button>
              <button
                id="collapseTaskDetTab_3"
                type="button"
                className={`rounded text-xs hover:bg-blue-100 p-1 tab-button w-1/2 focus:outline-none border-none text-blue-600 font-bold ${
                  activeTab === 3 ? "bg-blue-100" : ""
                }`}
                onClick={() => handleTabClick(3)}
              >
                <i className="bi bi-paperclip w-4 h-4 mr-1"></i> Attachments
              </button>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {activeTab == 1 && (
              <>
                <GridContainer spacing={2}>
                  <GridItem xs={4} md={4} lg={4} sm={4}>
                    <div className="h-full rounded-md shadow-sm bg-white border-none outline-none">
                      <DataList
                        inputSelected={inputSelected}
                        options={contract}
                        fieldName={"contract"}
                        getKey={getKey}
                      />
                    </div>
                  </GridItem>
                  <GridItem xs={4} md={4} lg={4} sm={4}>
                    <div className="h-full rounded-md shadow-sm bg-white border-none outline-none">
                      <DataList
                        inputSelected={inputSelected}
                        options={Complaint}
                        fieldName={"Complaint"}
                        getKey={getKey}
                      />
                    </div>
                  </GridItem>
                  <GridItem xs={4} md={4} lg={4} sm={4}>
                    <div className="h-full rounded-md shadow-sm bg-white border-none outline-none">
                      <DataList
                        inputSelected={inputSelected}
                        options={workType}
                        getdata={getdata1}
                        fieldName={"workType"}
                        value={workType}
                        onInput={handleInputValue}
                        getKey={getKey}
                      />
                    </div>
                  </GridItem>
                  <GridItem xs={4} md={4} lg={4} sm={4}>
                    <div className="h-full rounded-md shadow-sm bg-white border-none outline-none">
                      <DataList
                        inputSelected={inputSelected}
                        options={dataDivision}
                        fieldName={"Division"}
                        getKey={getKey}
                      />
                    </div>
                  </GridItem>
                  <GridItem xs={4} md={4} lg={4} sm={4}>
                    <div className="h-full rounded-md shadow-sm bg-white border-none outline-none">
                      <DataList
                        inputSelected={inputSelected}
                        options={Module}
                        fieldName={"Module"}
                        getKey={getKey}
                      />
                    </div>
                  </GridItem>
                  <GridItem xs={4} md={4} lg={4} sm={4}>
                    <div className="h-full rounded-md shadow-sm bg-white border-none outline-none">
                      <DataList
                        inputSelected={inputSelected}
                        options={Value}
                        fieldName={"Value"}
                        getKey={getKey}
                      />
                    </div>
                  </GridItem>

                  <GridItem xs={8} md={8} lg={8} sm={8}>
                    <textarea
                      id="taskDescription"
                      placeholder="write your task description here..."
                      required=""
                      name="taskDescription"
                      rows="4"
                      className="bg-stone-100 w-full text-gray-800 shadow-sm tracking-wide overflow-auto scroll-smooth custom-scrollbar transition-all duration-200 ease-in-out resize-none hover:resize-y caret-blue-400 focus:caret-blue-500 font-medium text-xs p-2 mb-2  ring-0 ring-blue-500 focus:ring-2 focus:ring-blue-600 border border-gray-300 rounded"
                      value={taskDescription}
                      onInput={handleInputValue}
                      getKey={getKey}
                    />
                  </GridItem>

                  <GridItem xs={4} md={4} lg={4} sm={4}>
                    <div className="h-full rounded-md shadow-sm bg-white border-none outline-none">
                      <DataList
                        inputSelected={inputSelected}
                        options={emp}
                        fieldName={"Employee"}
                        getKey={getKey}
                      />
                    </div>
                  </GridItem>

                  <GridItem xs={2} md={2} lg={2} sm={2}>
                    <div className="p-2 w-full">
                      <label
                        htmlFor="PriorityName"
                        className="block text-xs font-medium text-gray-500"
                      >
                        Priority
                      </label>
                      <DataList
                        inputSelected={inputSelected}
                        options={Priority}
                        fieldName={"Priority"}
                        getKey={getKey}
                      />
                    </div>
                  </GridItem>
                  <GridItem xs={2} md={2} lg={2} sm={2}>
                    <div className="p-2 w-full">
                      <label
                        htmlFor="SprintName"
                        className="block text-xs font-medium text-gray-500"
                      >
                        Sprint
                      </label>
                      <DataList
                        inputSelected={inputSelected}
                        options={week}
                        fieldName={"Sprint"}
                        getKey={getKey}
                      />
                    </div>
                  </GridItem>

                  <GridItem xs={2} md={2} lg={2} sm={2}>
                    <div className="p-2 w-full">
                      <label
                        htmlFor="fromDate"
                        className="block text-xs font-medium text-gray-500 "
                      >
                        Task Start
                      </label>
                      <DatePicker
                        selected={startDate}
                        onChange={handleStartDateChange}
                        showTimeSelect
                        timeFormat="h:mm aa"
                        timeIntervals={15}
                        dateFormat="yyyy-MM-dd h:mm aa"
                        className=" block w-full border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </GridItem>

                  <GridItem xs={2} md={2} lg={2} sm={2}>
                    <div className="p-2 w-full">
                      <label
                        htmlFor="toDate"
                        className="block text-xs font-medium text-gray-500"
                      >
                        Task End
                      </label>
                      <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
                        showTimeSelect
                        timeFormat="h:mm aa"
                        timeIntervals={15}
                        dateFormat="yyyy-MM-dd h:mm aa"
                        className=" block w-full  border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </GridItem>

                  <GridItem xs={4} md={4} lg={4} sm={4}>
                    <div className="p-2 w-full">
                      <label
                        htmlFor="ETATime"
                        className="block text-xs font-medium text-gray-500"
                      >
                        ETATime
                      </label>
                      <input
                        type="text"
                        id="ETATime"
                        value={etaTime}
                        readOnly
                        className=" block w-full  border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </GridItem>

                  <div className="w-full mt-2">
                    <GridItem xs={12} md={12} lg={12} sm={12}>
                      <button
                        onClick={handleCreateTask}
                        type="button"
                        id="createTaskButton"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Create Task
                      </button>
                    </GridItem>
                  </div>
                </GridContainer>
              </>
            )}

            {activeTab === 2 && (
              <div className="">
                <div
                  id="collapseTaskDetDiv_Tab2"
                  className="flex items-end space-x-4  mt-40 w-full"
                >
                  <textarea
                    row="1"
                    id=" "
                    className="block rounded-md w-full py-1 px-2 text-sm text-gray-800 bg-transparent border-2 border-gray-300 focus:outline-none focus:border-blue-600"
                    placeholder="Enter New Checkpoints here..."
                  ></textarea>
                  <select
                    id=""
                    className="block w-auto py-2 px-4 text-sm text-gray-700 bg-transparent border-b-2 border-gray-300 focus:outline-none"
                  >
                    <option value="1">BA</option>
                    <option value="2">DB</option>
                    <option value="3">DEV</option>
                    <option value="4">QA</option>
                    <option value="5">IMP</option>
                    <option value="6">DEP</option>
                  </select>

                  <button
                    onClick=""
                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 rounded-md transition duration-300 ease-in-out"
                  >
                    Add
                  </button>
                </div>
                <div className="w-full mt-2">
                  <button
                    type="button"
                    id="createTaskButton"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create Task
                  </button>
                </div>
              </div>
            )}
            {activeTab === 3 && (
              <GridContainer spacing={2}>
                <GridItem xs={12} md={12} lg={12} sm={12}>
                  <div className="h-full rounded-md shadow-sm bg-white border-none outline-none">
                    <input type="file" multiple onChange={handleImageUpload} />
                  </div>
                </GridItem>
                <GridItem xs={12} md={12} lg={12} sm={12}>
                  <div className="h-full rounded-md shadow-sm bg-white border-none outline-none flex flex-wrap">
                    {previewImages.map((image, index) => (
                      <div key={index} className="relative m-2">
                        <img
                          src={image.src}
                          alt={image.name}
                          className="h-24 w-24 object-cover"
                        />
                        <IoClose
                          className="absolute top-0 right-0 text-lg cursor-pointer text-red-600"
                          onClick={() => removeImage(image.name)}
                        />
                      </div>
                    ))}
                  </div>
                </GridItem>
              </GridContainer>
            )}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
