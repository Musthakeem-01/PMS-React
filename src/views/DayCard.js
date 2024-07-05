import React, { useState, useEffect, useRef } from "react";
import { IoShareSocialSharp } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { LuMoreHorizontal } from "react-icons/lu";
import { CgLayoutGridSmall } from "react-icons/cg";
import { FaTasks } from "react-icons/fa";
import { PiArrowsInSimpleBold } from "react-icons/pi";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";
import getData from "../../src/components/customcomponents/commonAPISelect";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getCurrentWeekDate } from "../../src/components/function/getCurrentWeekDate";
import "../assets/css/menu.css";
import dayjs from "dayjs"; // dayjs is a lightweight date library
import weekday from "dayjs/plugin/weekday";
dayjs.extend(weekday);

const DayCard = () => {
  const [headerResponse, setHeaderResponse] = useState([]);
  console.log("🚀 ~ Board ~ headerResponse:", headerResponse);
  const [stageDatas, setStageDatas] = useState([]);
  const [departmentDatas, setDepartmentDatas] = useState([]);
  console.log("🚀 ~ Board ~ departmentDatas:", departmentDatas);

  const [activeDepartment, setActiveDepartment] = useState("ALL");
  console.log("🚀 ~ Board ~ activeDepartment:", activeDepartment);

  const [minimizedCards, setMinimizedCards] = useState({});
  const { weekNumber, year, date } = getCurrentWeekDate();

  const [moreShowDropdown, setMoreShowDropdown] = useState(false);
  const MoreDropdownRef = useRef(null);
  const [weekDates, setWeekDates] = useState([]);

  const cardData = [
    {
      title: "ALL",
      iconClass: "bi-receipt",
      total: departmentDatas?.OpenWo,
      closed: 0,
      open: departmentDatas?.OpenWo,
      fullTitle: "ALL",
      shortTitle: null,
    },
    {
      title: "Sales",
      iconClass: "bi-receipt",
      total: departmentDatas?.SALESTOTAL,
      closed: departmentDatas?.SALESCLOSED,
      open: departmentDatas?.SALESOPEN,
      fullTitle: "Sales & Marketing",
      shortTitle: "W-SALES",
    },
    {
      title: "BA",
      iconClass: "bi-bar-chart-line",
      total: departmentDatas?.BATOTAL,
      closed: departmentDatas?.BACLOSED,
      open: departmentDatas?.BAOPEN,
      fullTitle: "Business Analyst",
      shortTitle: "W-BA",
    },
    {
      title: "UI/UX",
      iconClass: "bi-bricks",
      total: departmentDatas?.UIUXTOTAL,
      closed: departmentDatas?.UIUXCLOSED,
      open: departmentDatas?.UIUXOPEN,
      fullTitle: "UI/UX Design",
      shortTitle: "W-UIUX",
    },
    {
      title: "DB",
      iconClass: "bi-graph-down",
      total: departmentDatas?.DBTOTAL,
      closed: departmentDatas?.DBCLOSED,
      open: departmentDatas?.DBOPEN,
      fullTitle: "Database Admin",
      shortTitle: "W-DB",
    },
    {
      title: "Web",
      iconClass: "bi-laptop",
      total: departmentDatas?.WEBTOAL,
      closed: departmentDatas?.WEBCLOSED,
      open: departmentDatas?.WEBOPEN,
      fullTitle: "Web Development",
      shortTitle: "W-WEB",
    },
    {
      title: "Mobile",
      iconClass: "bi-phone",
      total: departmentDatas?.MOBILETOTAL,
      closed: departmentDatas?.MOBILECLOSED,
      open: departmentDatas?.MOBILEOPEN,
      fullTitle: "Mobile Dev",
      shortTitle: "W-MOBILE",
    },
    {
      title: "Integration",
      iconClass: "bi-phone",
      total: departmentDatas?.INTEGRATOTAL,
      closed: departmentDatas?.INTEGRACLOSED,
      open: departmentDatas?.INTEGRAOPEN,
      fullTitle: "Integration",
      shortTitle: "W-MOBILE",
    },
    {
      title: "QA & QC",
      iconClass: "bi-tools",
      total: departmentDatas?.TESTINGTOTAL,
      closed: departmentDatas?.TESTINGCLOSED,
      open: departmentDatas?.TESTINGOPEN,
      fullTitle: "Testing",
      shortTitle: "W-TESTING",
    },
    {
      title: "Deployee",
      iconClass: "bi-rocket",
      total: departmentDatas?.DEPLOYEETOTAL,
      closed: departmentDatas?.DEPLOYEECLOSED,
      open: departmentDatas?.DEPLOYEEOPEN,
      fullTitle: "Deployeement",
      shortTitle: "W-DEPLOYEE",
    },
    {
      title: "Implement",
      iconClass: "bi-gift",
      total: departmentDatas?.IMPTOTAL,
      closed: departmentDatas?.IMPCLOSED,
      open: departmentDatas?.IMPOPEN,
      fullTitle: "Implementation",
      shortTitle: "W-Implementation",
    },
    {
      title: "Support",
      iconClass: "bi-chat",
      total: departmentDatas?.SUPPORTTOTAL,
      closed: departmentDatas?.SUPPORTCLOSED,
      open: departmentDatas?.SUPPORTOPEN,
      fullTitle: "Support",
      shortTitle: "W-SUPPORT",
    },
    {
      title: "Cloud",
      iconClass: "bi-cloud",
      total: departmentDatas?.CLOUDTOTAL,
      closed: departmentDatas?.CLOUDCLOSED,
      open: departmentDatas?.CLOUDOPEN,
      fullTitle: "CLOUD",
      shortTitle: "W-CLOUD",
    },
    {
      title: "RND",
      iconClass: "bi-search",
      total: departmentDatas?.RNDTOTAL,
      closed: departmentDatas?.RNDCLOSED,
      open: departmentDatas?.RNDOPEN,
      fullTitle: "R&D",
      shortTitle: "W-RND",
    },
    {
      title: "IT Infra",
      iconClass: "bi-hdd-network",
      total: departmentDatas?.ITINFRATOTAL,
      closed: departmentDatas?.ITINFRACLOSED,
      open: departmentDatas?.ITINFRAOPEN,
      fullTitle: "IT INFRASTRUCURE",
      shortTitle: "W-ITINFRA",
    },
    {
      title: "Security",
      iconClass: "bi-shield-check",
      total: departmentDatas?.SECURITYTOTAL,
      closed: departmentDatas?.SECURITYCLOSED,
      open: departmentDatas?.SECURITYOPEN,
      fullTitle: "SECURITY",
      shortTitle: "W-SECURITY",
    },
    {
      title: "HR",
      iconClass: "bi-people",
      total: departmentDatas?.HRTOTAL,
      closed: departmentDatas?.HRCLOSED,
      open: departmentDatas?.HROPEN,
      fullTitle: "HUMAN RESOURCES",
      shortTitle: "W-HR",
    },
    {
      title: "Finance",
      iconClass: "bi-currency-dollar",
      total: departmentDatas?.FINANCETOTAL,
      closed: departmentDatas?.FINANCECLOSED,
      open: departmentDatas?.FINANCEOPEN,
      fullTitle: "FINANCE",
      shortTitle: "W-FINANCE",
    },
    {
      title: "Project",
      iconClass: "bi-list",
      total: departmentDatas?.PROJECTTOTAL,
      closed: departmentDatas?.PROJECTCLOSED,
      open: departmentDatas?.PROJECTOPEN,
      fullTitle: "PROJECT",
      shortTitle: "W-PROJECT",
    },
  ];

  // useEffect(() => {
  //     function handleClickOutside(event) {
  //         if (moreShowDropdown && MoreDropdownRef.current && !MoreDropdownRef.current.contains(event.target)) {
  //             setMoreShowDropdown(false);
  //         }
  //     }
  //     document.addEventListener('mousedown', handleClickOutside);
  //     return () => {
  //         document.removeEventListener('mousedown', handleClickOutside);
  //     };
  // }, [moreShowDropdown]);

  useEffect(() => {
    fetchStageData();
    fetchDepartmentData();
  }, []);

  const toggleMinimize = (cardId) => {
    setMinimizedCards((prevState) => ({
      ...prevState,
      [cardId]: !prevState[cardId],
    }));
  };

  const toggleDropdown = (val) => {
    setMoreShowDropdown(!val);
  };

  const fetchDepartmentData = async () => {
    try {
      const response = await getData(
        "DashboardService/VwAPINSEIPLDetailsNew/",
        {
          data: {
            p1_int: 2,
            p2_int: weekNumber,
            p3_int: year,
            p4_int: null,
            p6_int: localStorage.getItem("eid"),
            ProjectID_int: null,
            UserID_int: 0,
          },
        }
      );
      const {
        Output: { status, data },
      } = response;
      if (status.code === "200") {
        setDepartmentDatas(data[0]);
      } else {
        console.error("Error fetching data:", status.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const fetchStageData = async (departmentType) => {
    try {
      const response = await getData(
        "DashboardService/VwAPINSEIPLDetailsNew/",
        {
          data: {
            p1_int: 24,
            p6_int: localStorage.getItem("eid"),
            P8_date: " 2024 - 07 - 02",
          },
        }
      );
      const {
        Output: { status, data },
      } = response;
      if (status.code === "200") {
        setStageDatas(data);
      } else {
        console.error("Error fetching data:", status.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const updateCardStage = async (cardId, newStageId) => {
    try {
      const response = await fetch(
        "https://smartfm.in/NSEIPLSERVICE/DashboardService/VwAPINSEIPLDetailsNew/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              p1_int: 43,
              p2_int: cardId,
              p3_int: newStageId,
              UserID_int: 0,
            },
          }),
        }
      );

      const result = await response.json();
      const {
        Output: { status },
      } = result;
      if (status.code !== "200") {
        console.error("Error updating card stage:", status.message);
      }
    } catch (error) {
      console.error("Error updating card stage:", error.message);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const destinationStage = destination.droppableId;
    const cardId = result.draggableId;
    const newStageId = destinationStage.split("-")[1];

    // Find the index of the moved card in the stageDatas array
    const cardIndex = stageDatas.findIndex(
      (data) => data.ComplaintIDPK === cardId
    );
    if (cardIndex === -1) {
      console.error("Card not found in stageDatas array");
      return;
    }

    // Update the stageDatas array
    const newStageDatas = [...stageDatas];
    const [movedCard] = newStageDatas.splice(cardIndex, 1);
    movedCard.DepartStageIDPK = newStageId;
    newStageDatas.splice(destination.index, 0, movedCard);

    setStageDatas(newStageDatas);
    updateCardStage(cardId, newStageId);
  };

  const noStageCount = stageDatas.filter(
    (data) => !data.DepartStageIDPK
  ).length;
  const noStageData = stageDatas.filter((data) => !data.DepartStageIDPK);

  const StageColors = [
    { border: "border-blue-600", text: "text-blue-600", bg: "bg-blue-200" },
    { border: "border-green-600", text: "text-green-600", bg: "bg-green-200" },
    { border: "border-pink-600", text: "text-pink-600", bg: "bg-pink-200" },
    {
      border: "border-purple-600",
      text: "text-purple-600",
      bg: "bg-purple-200",
    },
    {
      border: "border-yellow-600",
      text: "text-yellow-600",
      bg: "bg-yellow-200",
    },
    { border: "border-red-600", text: "text-red-600", bg: "bg-red-200" },
    { border: "border-teal-600", text: "text-teal-600", bg: "bg-teal-200" },
    {
      border: "border-orange-600",
      text: "text-orange-600",
      bg: "bg-orange-200",
    },
  ];

  const getStageColors = (index) => {
    const colorIndex = index % StageColors.length;
    return StageColors[colorIndex];
  };

  const getStageBorderColor = (index) => {
    return getStageColors(index).border;
  };

  const getStageTextColor = (index) => {
    return getStageColors(index).text;
  };

  const getSubStageBgColor = (index) => {
    return getStageColors(index).bg;
  };
  function today() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);
  }

  useEffect(() => {
    const getCurrentWeekDates = () => {
      const today = dayjs();
      const startOfWeek = today.weekday(1); // 0 means Monday in dayjs with weekday plugin
      const dates = [];

      for (let i = 0; i < 7; i++) {
        dates.push({
          day: startOfWeek.add(i, "day").format("dddd"),
          date: startOfWeek.add(i, "day").format("MMM DD"),
        });
      }

      setWeekDates(dates);
    };

    getCurrentWeekDates();
  }, []);

  return (
    <div className="w-full ">
      {/* Search bar section */}
      {/* <div className="fixed top-36 left-0 right-0 z-30 px-7 pt-7 pb-3 bg-opacity-50 backdrop-filter backdrop-blur-lg ">
        <div className="flex justify-between  ">
          <form className="max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
                <IoMdSearch className="w-5 h-5" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full h-8 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                placeholder="Search"
                required
              />
            </div>
          </form>

          <div className="flex justify-center items-center gap-1 ">
            <div className="flex gap-2 items-center text-white cursor-pointer">
              <button className="flex items-center gap-2 text-sm font-medium text-white px-3 h-8 bg-transparent rounded hover:bg-ShareHoveBG">
                <IoShareSocialSharp className="w-4 h-4" /> Share
              </button>
            </div>

            <div className="flex gap-2 items-center cursor-pointer">
              <button
                className="flex items-center gap-2 text-sm text-white font-medium px-3 h-8 bg-transparent rounded hover:bg-ShareHoveBG"
                onClick={() => toggleDropdown(moreShowDropdown)}
              >
                <IoFilter className="w-4 h-4" />
                Filter
              </button>
            </div>

            <div className="flex gap-2 items-center text-white cursor-pointer">
              <button className="flex items-center gap-2 text-sm font-medium text-white px-3 h-8 bg-transparent rounded hover:bg-ShareHoveBG">
                <IoMdMenu className="w-4 h-4" />
                Group by : Status
              </button>
            </div>

            <div className="flex gap-2 items-center text-white cursor-pointer">
              <button className="flex items-center gap-2 text-sm font-medium text-white px-3 h-8 bg-transparent rounded hover:bg-ShareHoveBG">
                <LuMoreHorizontal className="w-4 h-4" />
                More
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Card view section */}
      <div className="mt-10 overflow-auto custom-scrollbar">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="pt-5 flex gap-2 overflow-auto">
            <div
              className="flex gap-2 custom-scrollbar overflow-x-scroll scroll-smooth"
              style={{ height: "70vh" }}
            >
              {/* No stages columns */}
              <div
                data-rbd-droppable-id="stage-null"
                data-rbd-droppable-context-id="1"
                class="flex flex-col gap-2"
              >
                <div>
                  {weekDates.map((item, index) => (
                    <>
                      <div
                        className="w-80 mb-5	 flex gap-2 rounded bg-BoardCardBG px-2 py-1.5 border-blue-600 border-l-4"
                        key={index}
                      >
                        <span className="text-sm font-medium text-stone-800">
                          {item.day}
                        </span>
                        <span className="text-sm font-medium text-blue-600">
                          (0)
                        </span>
                        <span className="text-sm font-medium text-pink-600 text-end ml-auto">
                          {item.date}
                        </span>
                      </div>
                      <div class="h-5/5 overflow-y-auto overflow-x-hidden flex flex-col gap-2"></div>
                    </>
                  ))}
                </div>
              </div>
            </div>
            <div
              data-rbd-droppable-id="stage-null"
              data-rbd-droppable-context-id="1"
              class="flex flex-col gap-2"
            >
              {/* <div class="w-80 flex gap-1 rounded bg-BoardCardBG px-2 py-1.5 border-blue-600 border-l-4">
                <span class="text-sm font-medium text-stone-800">
                  No Stages
                </span>
                <span class="text-sm font-medium text-blue-600 ">(1)</span>
              </div> */}
              <div class="h-5/5 overflow-y-auto overflow-x-hidden	 flex flex-col gap-2">
                <div
                  data-rbd-draggable-context-id="1"
                  data-rbd-draggable-id="148649"
                  class="w-80 rounded bg-BoardCardBG p-2 cursor-pointer"
                  tabindex="0"
                  role="button"
                  aria-describedby="rbd-hidden-text-1-hidden-text-1"
                  data-rbd-drag-handle-draggable-id="148649"
                  data-rbd-drag-handle-context-id="1"
                  draggable="false"
                >
                  <div class="flex justify-between">
                    <div class="flex gap-1 justify-start items-center">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 7H9V9H7V7Z" fill="currentColor"></path>
                        <path d="M11 7H13V9H11V7Z" fill="currentColor"></path>
                        <path d="M17 7H15V9H17V7Z" fill="currentColor"></path>
                        <path d="M7 11H9V13H7V11Z" fill="currentColor"></path>
                        <path
                          d="M13 11H11V13H13V11Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M15 11H17V13H15V11Z"
                          fill="currentColor"
                        ></path>
                        <path d="M9 15H7V17H9V15Z" fill="currentColor"></path>
                        <path
                          d="M11 15H13V17H11V15Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M17 15H15V17H17V15Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <p class="text-xs font-medium p-1 px-2 rounded bg-blue-200 text-blue-600">
                        No Stage
                      </p>
                      <p class="text-xs font-medium px-1"> - 1</p>
                    </div>
                    <button class="flex items-center gap-2 text-sm font-medium px-3 h-6 cursor-pointer bg-transparent rounded hover:bg-ShareHoveBG">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 256 256"
                        class="w-4 h-4"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M216.49,56.48,177,96h19a12,12,0,0,1,0,24H148a12,12,0,0,1-12-12V60a12,12,0,0,1,24,0V79l39.51-39.52a12,12,0,0,1,17,17ZM108,136H60a12,12,0,0,0,0,24H79L39.51,199.51a12,12,0,0,0,17,17L96,177v19a12,12,0,0,0,24,0V148A12,12,0,0,0,108,136Z"></path>
                      </svg>
                    </button>
                  </div>
                  <div>
                    <div class="p-2 mt-2 bg-white border-BorderCard rounded border cursor-pointer group">
                      <div class="flex flex-col gap-1">
                        <div class="text-xs font-medium flex gap-2">
                          <p class="text-xs font-medium text-blue-600">42920</p>
                          <p class="text-pink-600">Mohammed Musthakeem -</p>
                          <p class="text-green-800">Mohammed Musthakeem -</p>
                          <p class="text-blue-600">Tasks</p>
                        </div>
                        <p>
                          <span class="text-xs font-medium text-red-600">
                            Del : 02-07-2024
                          </span>
                          <span class="text-xs font-medium text-green-800 pl-2">
                            ETA : 02-07-2024
                          </span>
                        </p>
                        <p class="text-xs font-semibold text-stone-700">
                          testing
                        </p>
                      </div>
                    </div>
                    <div class="w-full pt-1 flex flex-col gap-1 ">
                      <p class="text-xs font-medium text-stone-600 pl-1">
                        SMART FM V5.0 (React)
                      </p>
                      <div class="flex items-center gap-2 pl-1">
                        <p class="text-xs font-medium text-orange-600 bg-orange-200 py-0.5 px-3 rounded">
                          WEB
                        </p>
                        <p class="text-xs font-medium text-purple-600 bg-purple-200 py-0.5 px-4 rounded">
                          V5
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex gap-2 custom-scrollbar overflow-x-scroll scroll-smooth"
              style={{ height: "70vh" }}
            >
              <div
                data-rbd-droppable-id="stage-null"
                data-rbd-droppable-context-id="1"
                class="flex flex-col gap-2"
              >
                <div class="w-80 flex gap-1 rounded bg-BoardCardBG px-2 py-1.5 border-blue-600 border-l-4">
                  <span class="text-sm font-medium text-stone-800">H1</span>
                  <span class="text-sm font-medium text-blue-600">(0)</span>
                </div>
                <div class="h-5/5 overflow-y-auto overflow-x-hidden flex flex-col gap-2"></div>

                <div class="w-80 flex gap-1 rounded bg-BoardCardBG px-2 py-1.5 border-blue-600 border-l-4">
                  <span class="text-sm font-medium text-stone-800">H2</span>
                  <span class="text-sm font-medium text-blue-600">(0)</span>
                </div>
                <div class="h-5/5 overflow-y-auto overflow-x-hidden flex flex-col gap-2"></div>

                <div class="w-80 flex gap-1 rounded bg-BoardCardBG px-2 py-1.5 border-blue-600 border-l-4">
                  <span class="text-sm font-medium text-stone-800">H3</span>
                  <span class="text-sm font-medium text-blue-600">(0)</span>
                </div>
                <div class="h-5/5 overflow-y-auto overflow-x-hidden flex flex-col gap-2"></div>

                <div class="w-80 flex gap-1 rounded bg-BoardCardBG px-2 py-1.5 border-blue-600 border-l-4">
                  <span class="text-sm font-medium text-stone-800">H4</span>
                  <span class="text-sm font-medium text-blue-600">(0)</span>
                </div>
                <div class="h-5/5 overflow-y-auto overflow-x-hidden flex flex-col gap-2"></div>

                <div class="w-80 flex gap-1 rounded bg-BoardCardBG px-2 py-1.5 border-blue-600 border-l-4">
                  <span class="text-sm font-medium text-stone-800">H5</span>
                  <span class="text-sm font-medium text-blue-600">(0)</span>
                </div>
                <div class="h-5/5 overflow-y-auto overflow-x-hidden flex flex-col gap-2"></div>

                <div class="w-80 flex gap-1 rounded bg-BoardCardBG px-2 py-1.5 border-blue-600 border-l-4">
                  <span class="text-sm font-medium text-stone-800">H6</span>
                  <span class="text-sm font-medium text-blue-600">(0)</span>
                </div>
                <div class="h-5/5 overflow-y-auto overflow-x-hidden flex flex-col gap-2"></div>

                <div class="w-80 flex gap-1 rounded bg-BoardCardBG px-2 py-1.5 border-blue-600 border-l-4">
                  <span class="text-sm font-medium text-stone-800">H7</span>
                  <span class="text-sm font-medium text-blue-600">(0)</span>
                </div>
                <div class="w-80 flex gap-1 rounded bg-BoardCardBG px-2 py-1.5 border-blue-600 border-l-4">
                  <span class="text-sm font-medium text-stone-800">H8</span>
                  <span class="text-sm font-medium text-blue-600">(0)</span>
                </div>
                <div class="h-5/5 overflow-y-auto overflow-x-hidden flex flex-col gap-2"></div>
              </div>
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default DayCard;
