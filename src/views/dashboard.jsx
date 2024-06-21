import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import getData from "../components/customcomponents/commonAPISelect";
import CustomTable from "./Projects/list";

const TailwindStyledButton = styled( Button )( () => ( {
  fontSize: '12px',
  fontWeight: 600,
  color: 'white',
  backgroundColor: '#2563eb',
  '&:hover': {
    backgroundColor: '#2655CC',
  },
} ) );

const StyledDataGrid = styled( DataGrid )( ( { theme } ) => ( {
  '& .MuiDataGrid-columnHeader': {
    borderRight: '1px solid rgba(235,235,235)', // Add border to the right of each column header
    '& .MuiDataGrid-menuIcon': {
      visibility: 'visible !important',
      width: 'auto',
    },
    '& .MuiDataGrid-iconButtonContainer': {
      visibility: 'visible !important',
    },
    '&:hover .MuiDataGrid-menuIcon, &:hover .MuiDataGrid-iconButtonContainer': {
      visibility: 'visible !important',
    },
  },
  '& .MuiDataGrid-cell': {
    borderRight: '1px solid rgba(235,235,235)', // Add border to the right of each cell
  },
  '& .MuiDataGrid-cell:first-of-type': {
    borderLeft: '1px solid rgba(235,235,235)', // Add border to the left of the first cell in each row
  },
} ) );


function Dashboard ()
{

  const columns = [
    { field: 'Descriptions', headerName: 'Contract Name', width: 150 },
    { field: 'DR', headerName: 'DR', width: 110 },
    { field: 'CR', headerName: 'CR', width: 110 },
    { field: 'NR', headerName: 'NR', width: 110 },
    { field: 'Other', headerName: 'Other', width: 110 },
    { field: 'Total', headerName: 'Total', width: 110 },
    { field: 'Closed', headerName: 'Closed', width: 110 },
    { field: 'AllDiv', headerName: 'AllDiv', width: 110 },
    { field: '7', headerName: '7', width: 110 },
    { field: '14', headerName: '14', width: 110 },
    { field: '30', headerName: '30', width: 110 },
    { field: '60', headerName: '60', width: 110 },
    { field: '90', headerName: '90', width: 110 },
  ];

  const [ response, setResponse ] = useState( [] );
  const [ greeting, setGreeting ] = useState( "" );

  useEffect( () =>
  {
    fetchData();
    const currentGreeting = getGreeting();
    setGreeting( currentGreeting );
  }, [] );

  function getGreeting ()
  {
    const currentTime = new Date().getHours();
    if ( currentTime < 12 )
    {
      return "Good morning";
    } else if ( currentTime < 18 )
    {
      return "Good afternoon";
    } else
    {
      return "Good evening";
    }
  }

  const fetchData = async () =>
  {
    try
    {
      const response = await getData(
        "DashboardService/VwAPINSEIPLDetailsNew/",
        {
          "data": {
            "p1_int": 4,
            "p2_int": "24",
            "p3_int": 2024,
            "p4_int": null,
            "p5_int": null,
            "p6_int": "2062",
            "UserID_int": 0
          }
        }
      );
      const {
        Output: { status, data },
      } = response;
      if ( response.Output.status.code === "200" )
      {
        setResponse( response.Output.data );
      } else
      {
        console.error( "Error fetching data:", status.message );
      }
    } catch ( error )
    {
      console.error( "Error fetching data:", error.message );
    }
  };


  return (
    <div className="w-full h-screen pt-20 pr-7 pl-7 pb-3 bg-gradient-to-br from-NanoBGcolor1 via-NanoBGcolor2 to-NanoBGcolor3">

      <div className="w-full pb-7">

        <div className='flex justify-start py-4'>
          <h1 className='text-2xl font-medium text-white text-center'>{ greeting ? greeting : "Welcome" }, { localStorage.getItem( 'username' ) }</h1>
        </div>

        <div className="w-full pt-4 flex justify-between items-center">
          <h1 className="text-defaultDashborderText font-medium cursor-pointer text-white">Dashboards</h1>
          <div className="flex justify-center items-center">
            <TailwindStyledButton variant="contained">Create contract</TailwindStyledButton>
          </div>
        </div>


        <div className="w-full pt-6 h-96">

          <CustomTable />

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
