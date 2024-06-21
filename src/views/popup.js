import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FaRegWindowClose } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import getData from "../components/customcomponents/commonAPISelect";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";

import DataList from "../components/Grid/DataList";
export default function Popup ()
{
  const [ open, setOpen ] = React.useState( false );
  const handleOpen = () => setOpen( true );
  const handleClose = () => setOpen( false );
  const [ activeTab, setActiveTab ] = useState( 1 );
  const [ contract, setContract ] = useState( [] );
  const [ Complaint, setComplint ] = useState( [] );
  const [ workType, setWorkType ] = useState( [] );
  const [ divisionDetails, setDivisionDetails ] = useState( [] );
  const [ dataDivision, setdataDivision ] = useState( [] );
  const [ Module, setModule ] = useState( [] );
  const [ Value, setValue ] = useState( [ 'Internal', 'Client' ] );
  const [ Priority, setPriority ] = useState( [] );
  const [ week, setweek ] = useState( [] );
  const [ emp, setemp ] = useState( [] );


  const handleTabClick = ( tabNumber ) =>
  {
    setActiveTab( tabNumber );
  };
  const [ startDate, setStartDate ] = useState( null );
  const [ endDate, setEndDate ] = useState( null );
  const [ etaTime, setEtaTime ] = useState( "" );

  const handleStartDateChange = ( date ) =>
  {
    setStartDate( date );
    calculateEtaTime( date, endDate );
  };

  const handleEndDateChange = ( date ) =>
  {
    setEndDate( date );
    calculateEtaTime( startDate, date );
  };

  const calculateEtaTime = ( start, end ) =>
  {
    if ( start && end )
    {
      const diff = end.diff( start, "minute" ); // Calculate the difference in minutes
      setEtaTime( diff );
    } else
    {
      setEtaTime( "" );
    }
  };
  async function getdata1 ( id )
  {
    const selectedDivision = divisionDetails.find( ( division ) => division.DivisionName === id )

    if ( selectedDivision )
    {

      await fetchData1( 5, setdataDivision, "ComplaintNatureName", selectedDivision.DivisionIDPK );

    }

  }

  const fetchData1 = async ( typeID, setState, mapKey, DivisionIDPK ) =>
  {
    //console.log("🚀 ~ fetchData1 ~ DivisionIDPK:", DivisionIDPK);
    try
    {
      if ( DivisionIDPK )
      {
        const url = `https://smartfm.in/NSEIPLWEBANDMOBILEPORTAL/WebPortalLocDetailsNew.php?TypeID=${ typeID }&DivisionID=${ DivisionIDPK }&CategoryID=1`;
        const response = await fetch( url );
        const data = await response.json();
        let responses = data.map( ( e ) => ( mapKey ? e[ mapKey ] : e ) );
        setState( responses );
      } else
      {
        console.warn( "NstUserID is not available in localStorage." );
      }
    } catch ( error )
    {
      console.error( "Error:", error );
    }
  };

  useEffect( () =>
  {
    const fetchData = async ( typeID, setState, mapKey ) =>
    {
      try
      {
        let NstUserID = localStorage.getItem( "NstUserID" );
        if ( NstUserID )
        {
          const url = `https://smartfm.in/NSEIPLWEBANDMOBILEPORTAL/WebPortalLocDetailsNew.php?TypeID=${ typeID }&UserID=${ NstUserID }`;
          const response = await fetch( url );
          const data = await response.json();
          let responses = data.map( ( e ) => ( mapKey ? e[ mapKey ] : e ) );
          setState( responses );
        } else
        {
          console.warn( "NstUserID is not available in localStorage." );
        }
      } catch ( error )
      {
        console.error( "Error:", error );
      }
    };

    const fetchEmployeeData = async () =>
    {
      try
      {
        const response = await getData( "DashboardService/VwAPINSEIPLALL/", {
          data: {
            QryType_int: 21,
          },
        } );
        const {
          Output: { status, data },
        } = response;
        if ( response.Output.status.code === "200" )
        {
          let responses = data.map( ( e ) => e.EmpName );
          setemp( responses );
        } else
        {
          console.error( "Error fetching data:", status.message );
        }
      } catch ( error )
      {
        console.error( "Error fetching data:", error.message );
      }
    };

    const fetchAllData = async () =>
    {
      await fetchData( 101, setContract, "ContractName" );
      await fetchData( 10, setComplint, "CCmWoTypeName" );
      await fetchData( 8, setWorkType, 'DivisionName' );
      await fetchData( 8, setDivisionDetails );

      await fetchData( 11, setModule, "CCMProTypeName" );
      await fetchData( 13, setweek, "SprintName" );
      await fetchData( 12, setPriority, "PriorityName" );
      await fetchEmployeeData();
    };

    fetchAllData();

  }, [] );


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

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        style={ { textTransform: "capitalize" } }
        onClick={ handleOpen }
      >
        Create
      </Button>
      <Modal
        open={ open }
        onClose={ handleClose }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ style }>
          <FaRegWindowClose
            className="absolute top-0 right-0   text-4xl cursor-pointer"
            onClick={ handleClose }
          />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div
              className="hidden md:flex rounded p-1 bg-white text-center leading-none gap-x-1 justify-center mt-2 w-full ring-2 ring-gray-300"
              role="group"
            >
              <button
                id="collapseTaskDetTab_1"
                type="button"
                className={ `rounded text-xs hover:bg-blue-100 p-1 tab-button w-1/2 focus:outline-none border-none text-blue-600 font-bold ${ activeTab === 1 ? "bg-blue-100" : ""
                  }` }
                onClick={ () => handleTabClick( 1 ) }
              >
                <i className="bi bi-chat-text w-4 h-4 mr-1"></i> Request
                Complaint
              </button>
              <button
                id="collapseTaskDetTab_2"
                type="button"
                className={ `rounded text-xs hover:bg-blue-100 p-1 tab-button w-1/2 focus:outline-none border-none text-blue-600 font-bold ${ activeTab === 2 ? "bg-blue-100" : ""
                  }` }
                onClick={ () => handleTabClick( 2 ) }
              >
                <i className="bi bi-table w-4 h-4 mr-1"></i> Checkpoints
              </button>
              <button
                id="collapseTaskDetTab_3"
                type="button"
                className={ `rounded text-xs hover:bg-blue-100 p-1 tab-button w-1/2 focus:outline-none border-none text-blue-600 font-bold ${ activeTab === 3 ? "bg-blue-100" : ""
                  }` }
                onClick={ () => handleTabClick( 3 ) }
              >
                <i className="bi bi-paperclip w-4 h-4 mr-1"></i> Attachments
              </button>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={ { mt: 2 } }>
            { activeTab == 1 && (
              <>
                <GridContainer spacing={ 2 }>
                  <GridItem xs={ 4 } md={ 4 } lg={ 4 } sm={ 4 }>
                    <div className="h-full rounded-md shadow-sm bg-white border-none outline-none">
                      <DataList options={ contract } fieldName={ "contract" } />
                    </div>
                  </GridItem>
                  <GridItem xs={ 4 } md={ 4 } lg={ 4 } sm={ 4 }>
                    <div className="h-full rounded-md shadow-sm bg-white border-none outline-none">
                      <DataList options={ Complaint } fieldName={ "Complaint" } />
                    </div>
                  </GridItem>
                  <GridItem xs={ 4 } md={ 4 } lg={ 4 } sm={ 4 }>
                    <div className="h-full rounded-md shadow-sm bg-white border-none outline-none">
                      <DataList options={ workType } getdata={ getdata1 } fieldName={ "workType" } />
                    </div>
                  </GridItem>
                  <GridItem xs={ 4 } md={ 4 } lg={ 4 } sm={ 4 }>
                    <div className="h-full rounded-md shadow-sm bg-white border-none outline-none">
                      <DataList options={ dataDivision } fieldName={ "Division" } />
                    </div>
                  </GridItem>
                  <GridItem xs={ 4 } md={ 4 } lg={ 4 } sm={ 4 }>
                    <div className="h-full rounded-md shadow-sm bg-white border-none outline-none">
                      <DataList options={ Module } fieldName={ "Module" } />
                    </div>
                  </GridItem>
                  <GridItem xs={ 4 } md={ 4 } lg={ 4 } sm={ 4 }>
                    <div className="h-full rounded-md shadow-sm bg-white border-none outline-none">
                      <DataList options={ Value } fieldName={ "Value" } />
                    </div>
                  </GridItem>
                </GridContainer>
                <div className="flex w-full mt-5">
                  <div className="w-full md:w-2/3 p-2">
                    <textarea
                      id="taskDescription"
                      placeholder="write your task description here..."
                      required=""
                      name="taskDescription"
                      rows="4"
                      className="bg-stone-100 w-full text-gray-800 shadow-sm tracking-wide overflow-auto scroll-smooth custom-scrollbar transition-all duration-200 ease-in-out resize-none hover:resize-y caret-blue-400 focus:caret-blue-500 font-medium text-xs p-2 mb-2 rounded border-0 ring-0 ring-blue-500 focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="flex-grow p-1">
                    <div className="rounded-md shadow-sm bg-white border-none outline-none">
                      <div className="w-full h-full bg-white border border-gray-300 relative">
                        <DataList options={ emp } fieldName={ "Employee" } />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full p-2 mb-2 grid grid-cols-5 gap-1">
                  <div className="p-2 w-full">
                    <label
                      htmlFor="PriorityName"
                      className="block text-xs font-medium text-gray-500"
                    >
                      Priority
                    </label>
                    <DataList options={ Priority } fieldName={ "Priority" } />

                  </div>
                  <div className="p-2 w-full" data-select2-id="353">
                    <label
                      htmlFor="SprintName"
                      className="block text-xs font-medium text-gray-500"
                    >
                      Sprint
                    </label>
                    <DataList options={ week } fieldName={ "Sprint" } />
                  </div>
                  <div>
                    <div>
                      <label
                        htmlFor="fromDate"
                        className="block text-xs font-medium text-gray-500"
                      >
                        Task Start
                      </label>
                      <LocalizationProvider dateAdapter={ AdapterDayjs }>
                        <DateTimePicker
                          value={ startDate }
                          onChange={ handleStartDateChange }
                          renderInput={ ( params ) => <TextField { ...params } /> }
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="toDate"
                      className="block text-xs font-medium text-gray-500"
                    >
                      Task End
                    </label>
                    <LocalizationProvider dateAdapter={ AdapterDayjs }>
                      <DateTimePicker
                        value={ endDate }
                        onChange={ handleEndDateChange }
                        renderInput={ ( params ) => <TextField { ...params } /> }
                      />
                    </LocalizationProvider>
                  </div>
                  <div>
                    <label
                      htmlFor="ETATime"
                      className="block text-xs font-medium text-gray-500"
                    >
                      ETATime
                    </label>
                    <input
                      type="number"
                      id="ETATime"
                      name="ETATime"
                      value={ etaTime }
                      readOnly
                      className="mt-1 p-2  w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                    />
                  </div>
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
              </>
            ) }

            { activeTab === 2 && (
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
            ) }
            { activeTab === 3 && (
              <div className="">
                <div
                  id="collapseTaskDetDiv_Tab3"
                  className="flex items-end space-x-4 mt-2 w-full"
                >
                  <div className="bg-white mt-40 w-full flex flex-col items-start">
                    <input
                      type="file"
                      id="imageInput"
                      className="hidden"
                      accept="image/*"
                      multiple=""
                    />
                    <label for="imageInput" className="w-full cursor-pointer">
                      <p className="hover:bg-blue-100 hover:shadow block w-full text-center p-4 text-sm font-semibold text-gray-600 border border-dashed border-gray-300 rounded-md transition duration-300 ease-in-out">
                        <i className="bi bi-file-earmark-arrow-up mr-1"></i>
                        Upload Attachment
                      </p>
                    </label>

                    <div
                      id="previewContainer"
                      className="w-full grid grid-cols-4 gap-3"
                    ></div>
                  </div>
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
            ) }
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
