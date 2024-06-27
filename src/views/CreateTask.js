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
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Projects from "./projects";
export default function CreateTask() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setStartDate("");
    setEndDate("");
    setEtaTime("");
  };
  const [activeTab, setActiveTab] = useState(1);
  const [contract, setContract] = useState([]);
  const [Complaint, setComplint] = useState([]);
  const [workType, setWorkType] = useState([]);
  const [divisionDetails, setDivisionDetails] = useState([]);
  const [dataDivision, setdataDivision] = useState([]);
  const [Module, setModule] = useState([]);
  const [Value, setValue] = useState([
    { TaskType: "Internal" },
    { TaskType: "Client" },
  ]);
  const [Priority, setPriority] = useState([]);
  const [taskDescription, settaskDescription] = useState([]);
  const [week, setweek] = useState([]);
  const [emp, setemp] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [fullResponse, setFullResponse] = useState([]);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [etaTime, setEtaTime] = useState("");
  const [createTaskkey, setCreateTaskkey] = useState([]);
  const [localityID, setLocalityID] = useState([]);
  const [buildingID, setBuildingID] = useState([]);
  const [selectedInputValue, setselectedInputValue] = useState([]);
  const [alertValue, setAlertValue] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [base64, setBase64] = useState("");

  const handleInputValue = (value) => {
    settaskDescription(value.target.value);
  };

  const inputSelected = (inputValue, refname) => {
    setselectedInputValue((prevCreateTaskkey) => ({
      ...prevCreateTaskkey,
      [refname]: inputValue,
    }));
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    calculateEta(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    calculateEta(startDate, date);
  };
  const formatDate = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const calculateEta = (fromDate, toDate) => {
    if (fromDate && toDate) {
      const startTime = new Date(fromDate);
      const endTime = new Date(toDate);
      const diffInMilliseconds = endTime - startTime;
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
      setEtaTime(diffInMinutes.toString());
    }
  };
  const removeImage = (name) => {
    setPreviewImages((prev) => prev.filter((image) => image.name !== name));
  };
  const showAttachmentViewDetTab = () => {};
  async function imageSave(ImageArray, TaskIDPK, type) {
    const url = "https://smartfm.in/NSEIPLWEBANDMOBILEPORTAL/imageupload.php";

    try {
      for (const param of ImageArray) {
        const requestOptions = {
          method: "POST",
          body: JSON.stringify(param),
          headers: { "Content-Type": "multipart/form-data" },
        };

        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        const imagePath = responseData.filename;

        const url2 =
          "https://smartfm.in/NSEIPLWEBANDMOBILEPORTAL/AdminImageRegistry.php";
        const formData = {
          AdminImageIDPK_int: "",
          ImageCode_varchar: "",
          ImageName_varchar: param.filename,
          ImgActualSize_varchar: "",
          ImgCompressSize_varchar: "",
          ImageSource_image: "",
          ImgPath_varchar: imagePath,
          ImgType_varchar: "png",
          TransType_varchar: "",
          ImgProType_int: "",
          IsDefault_bit: "",
          IsDraft_bit: "",
          Remarks_varchar:
            type == "refreshAttachment"
              ? document.getElementById("attchRemarks").value
              : "Attached While Raising Task",
          TransID_int: TaskIDPK,
          ModFormID_int: "",
          TransTypeID_int: "",
          IsActive_bit: "1",
          DeleStat_bit: "",
          CreatedUserID_int: "",
          CreatedTtm_datetime: "",
          UpdatedUserID_int: "",
          UpdatedTtm_datetime: "",
        };

        const requestOptions2 = {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "multipart/form-data" },
        };

        const response2 = await fetch(url2, requestOptions2);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      if (type == "refreshAttachment") {
        showAttachmentViewDetTab(TaskIDPK);
      }
    }
  }
  const handleAlert = (value) => {
    setAlertValue(value);
    setShowAlert(true);
    // Hide the alert after 2 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };
  function validate() {
    if (!selectedInputValue.ContractName) {
      handleAlert("Contract Name");
      //window.alert("please enter Contract Name");
      return false;
    } else if (!selectedInputValue.CCmWoTypeName) {
      handleAlert("Complient Name");
      // window.alert("please enter Complient Name");
      return false;
    } else if (!selectedInputValue.DivisionName) {
      handleAlert("Division Name");
      // window.alert("please enter Division Name");
      return false;
    } else if (
      !selectedInputValue.ComplaintNatureName ||
      selectedInputValue.ComplaintNatureName == ""
    ) {
      handleAlert("ComplaintNature Name");
      // window.alert("please enter ComplaintNature Name");
      return false;
    } else if (!selectedInputValue.CCMProTypeName) {
      handleAlert("Module Name");
      // window.alert("please enter Module Name");
      return false;
    } else if (!selectedInputValue.TaskType) {
      handleAlert("please enter TaskType");
      // window.alert("please enter TaskType");
      return false;
    } else if (!taskDescription || taskDescription.length === 0) {
      handleAlert("Kindly Fill Task Description");
      // window.alert("Kindly Fill Task Description");
      return false;
    } else if (!selectedInputValue.EmpName) {
      handleAlert("Employee Name");
      // window.alert("please enter Employee Name");
      return false;
    } else if (!selectedInputValue.PriorityName) {
      handleAlert("Priority");
      // window.alert("please enter Priority");
      return false;
    } else if (!selectedInputValue.SprintName) {
      handleAlert("Sprint");
      // window.alert("please enter Sprint");
      return false;
    } else {
      handleCreateTask();
    }
  }
  const handleCreateTask = async () => {
    const param = {
      NatureOfComplaint: createTaskkey.DivisionName, // Division
      UserID: localStorage.getItem("eid"), // eid
      Email: null,
      Description: taskDescription, // taskDescription
      ContractID: createTaskkey.ContractID, // contractName
      LocalityID: localityID,
      BuildingID: buildingID,
      FloorID: 0,
      SpotID: 0,
      ComplainerName: localStorage.getItem("username"),
      ContactNo: null,
      PortalType: 2,
      DocID: null,
      DivisionID: createTaskkey.DivisionIDPK, // workType
      PriorityID: createTaskkey.PriorityIDPK ? createTaskkey.PriorityIDPK : 1,
      EmpID: createTaskkey.NSEEMPID,
      ProDate: createTaskkey.TaskType == "Client" ? "" : formatDate(startDate),
      TaskType: createTaskkey.TaskType == "Internal" ? 2 : 1,
      EndDate: formatDate(endDate),
      WoTypeID: createTaskkey.CCMWoTypeIDPK, // Complaint id
      WoProTypeID: createTaskkey.CCMProTypeIDPK, // Module
      TradeGrpID: 0, // parentTId ? parentTId : 0
      IsBMS: createTaskkey.TaskType == "Client" ? 1 : 0,
    };

    const apiUrl =
      "https://smartfm.in/NSEIPLWEBANDMOBILEPORTAL/NsetrackComplaintRegistry.php";
    const formData = new FormData();

    Object.keys(param).forEach((key) => formData.append(key, param[key]));
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });
      const data = await response.text();
      // console.log("🚀 ~ handleCreateTask ~ data:", data);

      if (data === "Failed") {
        window.alert("Contract Expired, Kindly check with Admin");
        return false;
      }

      if (data && data.length > 0) {
        const TaskIDPKURL = `https://smartfm.in/NSEIPLSERVICE/SupportStaffAssign.php?EmployeeID=null&CCMComplaintID=${data}&DivisionExe=STAFFASIGN`;
        const TaskIDPKResponse = await fetch(TaskIDPKURL);
        console.log(
          "🚀 ~ handleCreateTask ~ TaskIDPKResponse:",
          TaskIDPKResponse
        );

        const previewContainer = setBase64;
        const imagePreviews = previewContainer.querySelectorAll("img");
        const images = [];
        console.log("🚀 ~ handleCreateTask ~ images:", images);

        imagePreviews.forEach((img) => {
          // console.log("🚀 ~ handleCreateTask ~ response:", response);
          // console.log("🚀 ~ handleCreateTask ~ response:", response);
          const fileType = img.src.split(";")[0].split("/")[1];
          images.push({
            filename: img.alt,
            type: fileType,
            base64data: img.src.split(",")[1],
          });
        });

        if (images.length > 0) {
          await imageSave(images, data);
        }
      } else {
        window.alert(2, "Unable to Create Task");
      }
    } catch (error) {
      // console.error("Error:", error);
      // if (error) {
      //   window.alert("error");
      // } else {
      //   window.alert("Task created successfully");
      // }
    } finally {
      window.alert("Task Created Successfully!");
      settaskDescription("");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let ContractID = createTaskkey.ContractID;
        if (ContractID) {
          const localityURL = `https://smartfm.in/NSEIPLWEBANDMOBILEPORTAL/WebPortalLocDetailsNew.php?TypeID=102&UserID=${localStorage.getItem(
            "UserIDPK"
          )}&ContractID=${ContractID}`;
          const localityResponse = await fetch(localityURL);
          if (!localityResponse.ok) {
            throw new Error(
              `HTTP error for URL ${localityURL}! Status: ${localityResponse.status}`
            );
          }
          const localityData = await localityResponse.json();
          const LocalityID = localityData[0].LocalityID;
          setLocalityID(LocalityID);
          const buildingURL = `https://smartfm.in/NSEIPLWEBANDMOBILEPORTAL/WebPortalLocDetailsNew.php?TypeID=103&UserID=${localStorage.getItem(
            "UserIDPK"
          )}&ContractID=${ContractID}&LocalityID=${LocalityID}`;
          const buildingResponse = await fetch(buildingURL);
          if (!buildingResponse.ok) {
            throw new Error(
              `HTTP error for URL ${buildingURL}! Status: ${buildingResponse.status}`
            );
          }
          const buildingData = await buildingResponse.json();
          const BuildingIDPK = buildingData[0].BuildingIDPK;
          setBuildingID(BuildingIDPK);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();
  }, [createTaskkey.ContractID]);
  const fetchData1 = async (typeID, setState, mapKey, DivisionIDPK, mapId) => {
    try {
      if (DivisionIDPK) {
        const url = `https://smartfm.in/NSEIPLWEBANDMOBILEPORTAL/WebPortalLocDetailsNew.php?TypeID=${typeID}&DivisionID=${DivisionIDPK}&CategoryID=1`;
        const response = await fetch(url);
        const data = await response.json();
        let value = data.map((e) => ({
          [mapKey]: e[mapKey],
          [mapId]: e[mapId],
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
    let keys = key;
    for (let k in keys) {
      setCreateTaskkey((prevCreateTaskkey) => ({
        ...prevCreateTaskkey,
        [k]: keys[k],
      }));
    }
    if (Object.keys(key)[0] == "DivisionIDPK") {
      fetchData1(
        5,
        setdataDivision,
        "ComplaintNatureName",
        key.DivisionIDPK,
        "ComplaintNatureID"
      );
    }
  };

  useEffect(() => {
    const fetchData = async (typeID, setState, mapKey, mapId) => {
      try {
        let NstUserID = localStorage.getItem("UserIDPK");
        if (NstUserID) {
          const url = `https://smartfm.in/NSEIPLWEBANDMOBILEPORTAL/WebPortalLocDetailsNew.php?TypeID=${typeID}&UserID=${NstUserID}`;
          const response = await fetch(url);
          const data = await response.json();
          let responses = data.map((e) =>
            mapKey && mapId ? { mapkey: e[mapKey], mapid: e[mapId] } : e
          );
          setFullResponse(responses);
          let value = data.map((e) => ({
            [mapKey]: e[mapKey],
            [mapId]: e[mapId],
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
          let responses = response;
          setemp(responses.Output.data);
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
      await fetchData(8, setWorkType, "DivisionName", "DivisionIDPK");
      await fetchData(8, setDivisionDetails, "ComplaintNatureName");

      await fetchData(11, setModule, "CCMProTypeName", "CCMProTypeIDPK");
      await fetchData(13, setweek, "SprintName", "SprintIDPK");
      await fetchData(12, setPriority, "PriorityName", "PriorityIDPK");
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
          <div className="relative">
            {showAlert && (
              <div className={"animate-popup"}>
                <Stack sx={{ width: "100%", position: "absolute" }}>
                  <Alert severity="error">Please Enter {alertValue}.</Alert>
                </Stack>
              </div>
            )}
          </div>
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
                className={`hidden rounded text-xs hover:bg-blue-100 p-1 tab-button w-1/2 focus:outline-none border-none text-blue-600 font-bold ${
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
                    <div className="relative h-full rounded-md shadow-sm bg-white border-none outline-none">
                      <DataList
                        inputSelected={inputSelected}
                        options={contract}
                        refname={"ContractName"}
                        refid={"ContractID"}
                        fieldName={"contract"}
                        getKey={getKey}
                      />
                    </div>
                  </GridItem>
                  <GridItem xs={4} md={4} lg={4} sm={4}>
                    <div className="relative h-full rounded-md shadow-sm bg-white border-none outline-none">
                      <DataList
                        inputSelected={inputSelected}
                        options={Complaint}
                        fieldName={"Complaint"}
                        getKey={getKey}
                        refname={"CCmWoTypeName"}
                        refid={"CCMWoTypeIDPK"}
                      />
                    </div>
                  </GridItem>
                  <GridItem xs={4} md={4} lg={4} sm={4}>
                    <div className="relative h-full rounded-md shadow-sm bg-white border-none outline-none">
                      <DataList
                        inputSelected={inputSelected}
                        options={workType}
                        fieldName={"workType"}
                        value={workType}
                        onInput={handleInputValue}
                        getKey={getKey}
                        refname={"DivisionName"}
                        refid={"DivisionIDPK"}
                      />
                    </div>
                  </GridItem>
                  <GridItem xs={4} md={4} lg={4} sm={4}>
                    <div className="relative h-full rounded-md shadow-sm bg-white border-none outline-none">
                      <DataList
                        inputSelected={inputSelected}
                        options={dataDivision}
                        fieldName={"Division"}
                        getKey={getKey}
                        refname={"ComplaintNatureName"}
                        refid={"ComplaintNatureID"}
                      />
                    </div>
                  </GridItem>
                  <GridItem xs={4} md={4} lg={4} sm={4}>
                    <div className="relative h-full rounded-md shadow-sm bg-white border-none outline-none">
                      <DataList
                        inputSelected={inputSelected}
                        options={Module}
                        fieldName={"Module"}
                        getKey={getKey}
                        refname={"CCMProTypeName"}
                        refid={"CCMProTypeIDPK"}
                      />
                    </div>
                  </GridItem>
                  <GridItem xs={4} md={4} lg={4} sm={4}>
                    <div className="relative h-full rounded-md shadow-sm bg-white border-none outline-none">
                      <DataList
                        inputSelected={inputSelected}
                        options={Value}
                        fieldName={"Value"}
                        getKey={getKey}
                        refname={"TaskType"}
                        refid={"TaskType"}
                      />
                    </div>
                  </GridItem>

                  <GridItem xs={8} md={8} lg={8} sm={8}>
                    <div className="relative">
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
                    </div>
                  </GridItem>

                  <GridItem xs={4} md={4} lg={4} sm={4}>
                    <div className="relative h-full rounded-md shadow-sm bg-white border-none outline-none">
                      <DataList
                        inputSelected={inputSelected}
                        options={emp}
                        fieldName={"Employee"}
                        getKey={getKey}
                        refname={"EmpName"}
                        refid={"NSEEMPID"}
                      />
                    </div>
                  </GridItem>

                  <GridItem xs={2} md={2} lg={2} sm={2}>
                    <div className=" p-2 w-full">
                      <label
                        htmlFor="PriorityName"
                        className="block text-xs font-medium text-gray-500"
                      >
                        Priority
                      </label>
                      <div className="relative">
                        <DataList
                          inputSelected={inputSelected}
                          options={Priority}
                          fieldName={"Priority"}
                          refname={"PriorityName"}
                          refid={"PriorityIDPK"}
                          getKey={getKey}
                        />
                      </div>
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
                      <div className="relative">
                        <DataList
                          inputSelected={inputSelected}
                          options={week}
                          fieldName={"Sprint"}
                          getKey={getKey}
                          refname={"SprintName"}
                          refid={"SprintIDPK"}
                        />
                      </div>
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
                    <div className="p-2 w-full relative">
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
                        onClick={validate}
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
                    <input
                      value={base64}
                      type="file"
                      multiple
                      onChange={handleImageUpload}
                    />
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
