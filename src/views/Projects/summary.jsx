import React, { useState, useEffect } from "react";
import { IoShareSocialSharp } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";
import { MdCelebration } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { IoCalendar } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdInformationCircle } from "react-icons/io";
import getData from "../../components/customcomponents/commonAPISelect";
const Summary = () => {
  const [projectDetail, setprojectDetail] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [dashboardData, setDashboardData] = useState(null);
  const [projectData, setProjectData] = useState("");
  const fetchData = async () => {
    try {
      const response = await getData("DashboardService/VwAPINSEIPLDetails/", {
        data: { p1_int: 99, p2_int: localStorage.getItem("eid") },
      });
      const {
        Output: { status, data },
      } = response;
      if (response.Output.status.code === "200") {
        setDashboardData(response.Output.data[0]);
      } else {
        console.error("Error fetching data:", status.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
    try {
      const response = await getData("DashboardService/VwAPINSEIPLDetails/", {
        data: {
          p1_int: 147,
          p2_int: null,
          p3_int: localStorage.getItem("eid"),
          p5_int: 5,
          p6_int: null,
          UserID_int: 0,
        },
      });
      const {
        Output: { status, data },
      } = response;
      if (response.Output.status.code === "200") {
        setProjectData(response.Output.data[0]);
      } else {
        console.error("Error fetching data:", status.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const currentGreeting = getGreeting();
    setGreeting(currentGreeting);
  }, []);

  const ProjectDetailClick = () => {
    setprojectDetail(!projectDetail);
  };

  function getGreeting() {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return "Good morning";
    } else if (currentTime < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-screen-lg text-center ">
        <div>
          <div className="flex justify-between py-4">
            <span></span>
            <h1 className="text-2xl font-medium text-white text-center">
              {greeting ? greeting : "Welcome"},
              {localStorage.getItem("username")}
            </h1>
            <div className="flex gap-2 items-center text-white cursor-pointer px-3 bg-transparent rounded hover:bg-ShareHoveBG">
              <button className="hidden  items-center gap-1 text-sm font-medium text-white">
                <IoShareSocialSharp /> Share
              </button>
            </div>
          </div>

          <span className="text-base text-white py-2">
            Here's where you'll view a summary of Project 1's status,
            priorities, workload, and more.
          </span>

          <div
            className="flex gap-1 justify-center items-center font-medium text-projectDetailTextClr cursor-pointer py-4"
            onClick={() => ProjectDetailClick()}
          >
            <span className="text-sm font-medium text-projectDetailTextClr hover:underline">
              Project Details
            </span>
            {projectDetail ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
          {projectDetail && (
            <div className="flex justify-center">
              <div className="w-2/8 h-18 bg-projectPopupBG rounded-full flex items-center p-3 pl-4 gap-2">
                <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center text-2xl font-extrabold">
                  <span>D</span>
                </div>
                <div className="pr-3">
                  <p className="text-left text-sm text-stone-800 font-medium cursor-pointer hover:underline">
                    Develop
                  </p>
                  <p className="text-left text-xs font-medium text-DoneSubTextClr">
                    Project Lead
                  </p>
                </div>
                <div className="border-white border-l-2 pl-5 pr-5">
                  <p className="text-left text-sm text-stone-800 font-medium">
                    Project key
                  </p>
                  <p className="text-left text-xs font-medium text-DoneSubTextClr">
                    P1
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full mt-5">
          <div className="w-full flex gap-4">
            <div className="w-1/4 h-24 bg-white rounded-xl flex items-center pl-5 gap-4 cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-green-200 flex justify-center items-center text-lg font-extrabold">
                <MdOutlineDone className="w-5 h-5 transition-all duration-100 group-hover:w-6 group-hover:h-6" />
              </div>
              <div>
                <p className="text-left text-xl text-green-800 font-medium">
                  1 Done
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-left text-sm font-medium text-DoneSubTextClr">
                    In the last 7 days
                  </p>
                  <MdCelebration />
                </div>
              </div>
            </div>

            <div className="w-1/4 h-24 bg-white rounded-xl flex items-center pl-5 gap-4 cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-blue-200 flex justify-center items-center text-lg font-extrabold">
                <FaPen className="w-4 h-4 transition-all duration-100 group-hover:w-5 group-hover:h-5" />
              </div>
              <div>
                <p className="text-left text-xl text-blue-800 font-medium">
                  3 Updated
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-left text-sm font-medium text-DoneSubTextClr">
                    In the last 7 days
                  </p>
                </div>
              </div>
            </div>

            <div className="w-1/4 h-24 bg-white rounded-xl flex items-center pl-5 gap-4 cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-purple-200 flex justify-center items-center text-lg font-extrabold">
                <GrAdd className="w-5 h-5 transition-all duration-100 group-hover:w-6 group-hover:h-6" />
              </div>
              <div>
                <p className="text-left text-xl text-purple-800 font-medium">
                  3 Created
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-left text-sm font-medium text-DoneSubTextClr">
                    In the last 7 days
                  </p>
                </div>
              </div>
            </div>

            <div className="w-1/4 h-24 bg-white rounded-xl flex items-center pl-5 gap-4 cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-slate-300 flex justify-center items-center text-lg font-extrabold">
                <IoCalendar className="w-5 h-5 transition-all duration-100 group-hover:w-6 group-hover:h-6" />
              </div>
              <div>
                <p className="text-left text-xl text-slate-800 font-medium">
                  0 Due
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-left text-sm font-medium text-DoneSubTextClr">
                    In the last 7 days
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mt-4 flex gap-4">
            <div className="w-2/4 min-h-60 max-h-96 bg-white rounded-xl  gap-4 overflow-y-auto">
              <h6 className="pt-2 text-center w-full">Task Overview</h6>
              <div className="flex justify-start w-full gap-2.5 flex-wrap text-xs cursor-pointer gap-y-2.5 p-2.5 items-center mt-4">
                <div className="flex flex-col items-center bg-stone-100 p-2 flex-1  rounded-lg h-16 hover:bg-purple-300 hover:opacity-90 transition duration-300 ease-in-out hover:text-white">
                  <div className="flex justify-center items-center h-4 w-4 text-purple-800">
                    <p>Total</p>
                  </div>
                  <div className="flex justify-center items-center rounded-full p-4 h-4 w-4 border-solid border-2 bg-purple-300">
                    {dashboardData?.OpenTaks || 0}
                  </div>
                </div>

                <div className="flex flex-col items-center bg-stone-100 p-2 flex-1  rounded-lg h-16 hover:bg-orange-300 hover:opacity-90 transition duration-300 ease-in-out">
                  <div className="flex justify-center items-center h-4 w-4 text-orange-800">
                    <p>DR</p>
                  </div>
                  <div className="flex justify-center items-center rounded-full p-4 h-4 w-4 border-solid border-2 bg-orange-300 ">
                    {dashboardData?.DR || 0}
                  </div>
                </div>

                <div className="flex flex-col items-center bg-stone-100 p-2 flex-1  rounded-lg h-16 hover:bg-green-300 hover:opacity-90 transition duration-300 ease-in-out">
                  <div className="flex justify-center items-center h-4 w-4 text-green-800">
                    <p>Completed</p>
                  </div>
                  <div className="flex justify-center items-center rounded-full p-4 h-4 w-4 border-solid border-2 bg-green-300 ">
                    {dashboardData?.Completed || 0}
                  </div>
                </div>

                <div className="flex flex-col items-center bg-stone-100 p-2 flex-1  rounded-lg h-16 hover:bg-yellow-300 hover:opacity-90 transition duration-300 ease-in-out">
                  <div className="flex justify-center items-center h-4 w-4 text-yellow-800">
                    <p>Others</p>
                  </div>
                  <div className="flex justify-center items-center rounded-full p-4 h-4 w-4 border-solid border-2 bg-yellow-300 ">
                    {dashboardData?.ORT || 0}
                  </div>
                </div>

                <div className="flex flex-col items-center bg-stone-100 p-2 flex-1  rounded-lg h-16 hover:bg-sky-300 hover:opacity-90 transition duration-300 ease-in-out">
                  <div className="flex justify-center items-center h-4 w-4 text-sky-800">
                    <p>Standby</p>
                  </div>
                  <div className="flex justify-center items-center rounded-full p-4 h-4 w-4 border-solid border-2 bg-sky-300 ">
                    {dashboardData?.StandBy || 0}
                  </div>
                </div>

                <div className="flex flex-col items-center bg-stone-100 p-2 flex-1 rounded-lg h-16 hover:bg-red-300 hover:opacity-90 transition duration-300 ease-in-out">
                  <div className="flex justify-center items-center h-4 w-4 text-red-800">
                    <p>Overdue</p>
                  </div>
                  <div className="flex justify-center items-center rounded-full p-4 h-4 w-4 border-solid border-2 bg-red-300 ">
                    {dashboardData?.overDue || 0}
                  </div>
                </div>
              </div>

              <div className="flex justify-start gap-2.5 w-full flex-wrap text-xs cursor-pointer items-center p-2.5  gap-y-2.5">
                <div className="flex-1 flex flex-col items-center p-2 rounded-lg bg-slate-100 border border-slate-100 hover:border-sky-800">
                  <p className="text-red-600">7D</p>
                  <div className=" p-4 rounded-lg w-4 h-4 flex justify-center items-center text-center border-white bg-zinc-300">
                    {dashboardData?.["7D"] || 0}
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center p-2 rounded-lg bg-slate-100 border border-slate-100 hover:border-sky-800">
                  <p className="text-red-600">14D</p>
                  <div className="bg-slate-200 p-4 rounded-lg w-4 h-4 flex justify-center items-center text-center border-white ">
                    {dashboardData?.["14D"] || 0}
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center p-2 rounded-lg bg-slate-100 border border-slate-100 hover:border-sky-800">
                  <p className="text-red-600">30D</p>
                  <div className="bg-slate-200 p-4 rounded-lg w-4 h-4 flex justify-center items-center text-center border-white ">
                    {dashboardData?.["30D"] || 0}
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center p-2 rounded-lg bg-slate-100 border border-slate-100 hover:border-sky-800">
                  <p className="text-red-600">60D</p>
                  <div className="bg-slate-200 p-4 rounded-lg w-4 h-4 flex justify-center items-center text-center border-white ">
                    {dashboardData?.["60D"] || 0}
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center p-2 rounded-lg bg-slate-100 border border-slate-100 hover:border-sky-800">
                  <p className="text-red-600">90D</p>
                  <div className="bg-slate-200 p-4 rounded-lg w-4 h-4 flex justify-center items-center text-center border-white ">
                    {dashboardData?.["90D"] || 0}
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center p-2 rounded-lg bg-slate-100 border border-slate-100 hover:border-sky-800">
                  <p className="text-red-600">120D</p>
                  <div className="bg-slate-200 p-4 rounded-lg w-4 h-4 flex justify-center items-center text-center border-white ">
                    {dashboardData?.["120D"] || 0}
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center p-2 rounded-lg bg-slate-100 border border-slate-100 hover:border-sky-800">
                  <p className="text-red-600">+120D</p>
                  <div className="bg-slate-200 p-4 rounded-lg w-4 h-4 flex justify-center items-center text-center border-white ">
                    {dashboardData?.["120PD"] || 0}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-2/4 min-h-60 max-h-96 bg-white rounded-xl  gap-4">
              <h6 className="pt-2 text-center w-full">Projects Goals</h6>
              <div className="flex justify-start w-full gap-2.5 flex-wrap text-xs cursor-pointer gap-y-2.5 p-2.5 items-center mt-4">
                <div className="flex flex-col items-center bg-stone-100 p-2 flex-1  rounded-lg h-16 hover:bg-emerald-200 hover:opacity-90 transition duration-300 ease-in-out">
                  <div className="flex justify-center items-center h-4 w-4 text-orange-800">
                    <p>V2</p>
                  </div>
                  <div className="flex justify-center items-center rounded-full p-4 h-4 w-4 border-solid border-2 bg-emerald-200 ">
                    {projectData?.v2 || 0}
                  </div>
                </div>

                <div className="flex flex-col items-center bg-stone-100 p-2 flex-1  rounded-lg h-16 hover:bg-fuchsia-200 hover:opacity-90 transition duration-300 ease-in-out">
                  <div className="flex justify-center items-center h-4 w-4 text-orange-800">
                    <p>V3</p>
                  </div>
                  <div className="flex justify-center items-center rounded-full p-4 h-4 w-4 border-solid border-2 bg-fuchsia-200 ">
                    {projectData?.v3 || 0}
                  </div>
                </div>

                <div className="flex flex-col items-center bg-stone-100 p-2 flex-1  rounded-lg h-16 hover:bg-amber-200 hover:opacity-90 transition duration-300 ease-in-out">
                  <div className="flex justify-center items-center h-4 w-4 text-orange-800">
                    <p>V4</p>
                  </div>
                  <div className="flex justify-center items-center rounded-full p-4 h-4 w-4 border-solid border-2 bg-amber-200 ">
                    {projectData?.v4 || 0}
                  </div>
                </div>

                <div className="flex flex-col items-center bg-stone-100 p-2 flex-1  rounded-lg h-16 hover:bg-blue-200 hover:opacity-90 transition duration-300 ease-in-out">
                  <div className="flex justify-center items-center h-4 w-4 text-orange-800">
                    <p>V5</p>
                  </div>
                  <div className="flex justify-center items-center rounded-full p-4 h-4 w-4 border-solid border-2 bg-blue-200 ">
                    {projectData?.v5 || 0}
                  </div>
                </div>

                <div className="flex flex-col items-center bg-stone-100 p-2 flex-1  rounded-lg h-16 hover:bg-violet-200 hover:opacity-90 transition duration-300 ease-in-out">
                  <div className="flex justify-center items-center h-4 w-4 text-orange-800">
                    <p>V6</p>
                  </div>
                  <div className="flex justify-center items-center rounded-full p-4 h-4 w-4 border-solid border-2 bg-violet-200 ">
                    {projectData?.v6 || 0}
                  </div>
                </div>
              </div>

              <div className="flex justify-start gap-2.5 w-full flex-wrap text-xs cursor-pointer items-center p-2.5  gap-y-2.5">
                <div className="flex-1 flex flex-col items-center p-2 rounded-lg bg-slate-100 border border-slate-100 hover:border-sky-800">
                  <p className="text-red-600">B2C</p>
                  <div className="bg-slate-200 p-4 rounded-lg w-4 h-4 flex justify-center items-center text-center border-white ">
                    {projectData?.B2C || 0}
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center p-2 rounded-lg bg-slate-100 border border-slate-100 hover:border-sky-800">
                  <p className="text-red-600">Bill</p>
                  <div className="bg-slate-200 p-4 rounded-lg w-4 h-4 flex justify-center items-center text-center border-white ">
                    {projectData?.billing || 0}
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center p-2 rounded-lg bg-slate-100 border border-slate-100 hover:border-sky-800">
                  <p className="text-red-600">Proleaz</p>
                  <div className="bg-slate-200 p-4 rounded-lg w-4 h-4 flex justify-center items-center text-center border-white ">
                    {projectData?.Proleaz || 0}
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center p-2 rounded-lg bg-slate-100 border border-slate-100 hover:border-sky-800">
                  <p className="text-red-600">All</p>
                  <div className="bg-slate-200 p-4 rounded-lg w-4 h-4 flex justify-center items-center text-center border-white ">
                    {projectData?.Total || 0}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mt-4 flex gap-4">
            <div className="w-2/4 h-96 bg-white rounded-xl flex items-center pl-5 gap-4 cursor-pointer group"></div>

            <div className="w-2/4 h-96 bg-white rounded-xl flex items-center pl-5 gap-4 cursor-pointer group"></div>
          </div>

          <div className="w-full mt-4 flex gap-4">
            <div className="w-2/4 h-96 bg-white rounded-xl flex items-center pl-5 gap-4 cursor-pointer group"></div>

            <div className="w-2/4 h-96 bg-white rounded-xl flex items-center pl-5 gap-4 cursor-pointer group"></div>
          </div>
        </div>

        <div className="w-full flex justify-center pt-7">
          <div className="flex items-center gap-2 text-white">
            <IoMdInformationCircle className="w-6 h-6 text-stone-100" />
            <span className="text-sm">
              Was the information shown in this page useful?
            </span>
            <span className="text-sm font-medium cursor-pointer hover:underline">
              {" "}
              Give us feedback
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
