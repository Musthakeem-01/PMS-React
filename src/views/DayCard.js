import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import getData from "../../src/components/customcomponents/commonAPISelect";
import { getCurrentWeekDate } from "../../src/components/function/getCurrentWeekDate";
import "../assets/css/menu.css";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
dayjs.extend(weekday);

const DayCard = () => {
  const [stageDatas, setStageDatas] = useState([]);
  const [departmentDatas, setDepartmentDatas] = useState([]);
  const [activeDepartment, setActiveDepartment] = useState("ALL");
  const [minimizedCards, setMinimizedCards] = useState({});
  const { weekNumber, year } = getCurrentWeekDate();
  const [moreShowDropdown, setMoreShowDropdown] = useState(false);
  const MoreDropdownRef = useRef(null);
  const [weekDates, setWeekDates] = useState([]);
  const [responseCard, setResponseCard] = useState(null);

  useEffect(() => {
    fetchStageData();
    fetchDepartmentData();
    cardResponse();
  }, []);

  const cardResponse = async () => {
    try {
      const response = await getData(
        "DashboardService/VwAPINSEIPLDetailsNew/",
        {
          data: {
            p1_int: 24,
            p6_int: localStorage.getItem("eid"),
            P8_date: "2024-07-06",
            UserID_int: 0,
          },
        }
      );
      const {
        Output: { status, data },
      } = response;
      if (status.code === "200") {
        setResponseCard(data);
      } else {
        console.error("Error fetching data:", status.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
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
            p6_int: localStorage.getItem("eid"),
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

  const fetchStageData = async () => {
    try {
      const response = await getData(
        "DashboardService/VwAPINSEIPLDetailsNew/",
        {
          data: {
            p1_int: 24,
            p6_int: localStorage.getItem("eid"),
            P8_date: "2024-07-02",
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
    const { source, destination } = result;

    if (!destination) return;

    const destinationStage = destination.droppableId;
    const cardId = result.draggableId;
    const newStageId = destinationStage.split("-")[1];

    const cardIndex = stageDatas.findIndex(
      (data) => data.ComplaintIDPK === cardId
    );
    if (cardIndex === -1) {
      console.error("Card not found in stageDatas array");
      return;
    }

    const newStageDatas = [...stageDatas];
    const [movedCard] = newStageDatas.splice(cardIndex, 1);
    movedCard.DepartStageIDPK = newStageId;
    newStageDatas.splice(destination.index, 0, movedCard);

    setStageDatas(newStageDatas);
    updateCardStage(cardId, newStageId);
  };

  useEffect(() => {
    const getCurrentWeekDates = () => {
      const today = dayjs();
      const startOfWeek = today.weekday(1);
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
    <div className="w-full">
      <div className="mt-10 overflow-auto custom-scrollbar">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-2 overflow-auto custom-scrollbar">
            {/* Days Column */}
            <Droppable droppableId="days-column">
              {(provided) => (
                <div
                  className="flex flex-col gap-2"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {weekDates.map((item, index) => (
                    <div
                      key={item.day}
                      className="w-80 mb-5 flex gap-2 rounded bg-BoardCardBG px-2 py-1.5 border-blue-600 border-l-4"
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
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* Response Cards Column */}
            <Droppable droppableId="response-cards-column">
              {(provided) => (
                <div
                  className="flex flex-col gap-2"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {responseCard &&
                    responseCard.map((data, index) => (
                      <Draggable
                        key={data.ComplaintNo}
                        draggableId={data.ComplaintNo}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="w-80 rounded bg-BoardCardBG p-2 cursor-pointer"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="p-2 mt-2 bg-white border-BorderCard rounded border cursor-pointer group">
                              <div className="flex flex-col gap-1">
                                <div className="text-xs font-medium flex gap-2">
                                  <p className="text-xs font-medium text-blue-600">
                                    {data?.ComplaintNo || ""}
                                  </p>
                                  <p className="text-pink-600">
                                    {data.ComplainerName}
                                  </p>
                                  <p className="text-green-800">
                                    {data.TechName}
                                  </p>
                                  <p className="text-blue-600">
                                    {data.CCMProTypeName}
                                  </p>
                                </div>
                                <p>
                                  <span className="text-xs font-medium text-red-600">
                                    Del : {data?.DeliveryDate || ""}
                                  </span>
                                  <span className="text-xs font-medium text-green-800 pl-2">
                                    ETA : {data?.ETADate || ""}
                                  </span>
                                </p>
                                <p className="text-xs font-semibold text-stone-700">
                                  {data?.RequestDetailsDesc || ""}
                                </p>
                              </div>
                              <div className="w-full pt-1 flex flex-col gap-1">
                                <div className="w-full flex gap-1 items-center justify-between">
                                  <span className="flex gap-1">
                                    <p className="text-xs font-semibold text-yellow-600">
                                      Priority : {data.PriorityName}
                                    </p>
                                  </span>
                                  <span className="text-xs text-pink-600">
                                    {data?.BranchName}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default DayCard;
