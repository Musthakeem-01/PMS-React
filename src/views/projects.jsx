import React, { useEffect, useState } from "react";
import Summary from "./Projects/summary";
import Board from "./Projects/board";
import CustomTable from "./Projects/list";
import { LuSettings } from "react-icons/lu";
import { CgLayoutGridSmall } from "react-icons/cg";
import { IoFolderOutline } from "react-icons/io5";
import { IoIosList } from "react-icons/io";
import {
  MdOutlineSpaceDashboard,
  MdOutlineBarChart,
  MdOutlineRunningWithErrors,
} from "react-icons/md";
import { FaRegCalendarAlt, FaChartLine, FaLink } from "react-icons/fa";
import { TbArrowRampRight } from "react-icons/tb";
import { SiGoogleforms } from "react-icons/si";
import { RiPagesLine } from "react-icons/ri";
import { GrAttachment } from "react-icons/gr";
import getData from "../components/customcomponents/commonAPISelect";
import Calendar from "./Projects/calendar";
import Timeline from "./Projects/timeline";

let values;
const components = {
  Summary,
  Board,
  List: () => <CustomTable res={values} />,
  Calendar,
  Timeline,
  Approvals: () => (
    <div className="w-full h-96 text-white text-2xl font-bold flex justify-center items-center">
      Approvals
    </div>
  ),
  Forms: () => (
    <div className="w-full h-96 text-white text-2xl font-bold flex justify-center items-center">
      Forms
    </div>
  ),
  Pages: () => (
    <div className="w-full h-96 text-white text-2xl font-bold flex justify-center items-center">
      Pages
    </div>
  ),
  Attachments: () => (
    <div className="w-full h-96 text-white text-2xl font-bold flex justify-center items-center">
      Attachments
    </div>
  ),
  Issues: () => (
    <div className="w-full h-96 text-white text-2xl font-bold flex justify-center items-center">
      Issues
    </div>
  ),
  Reports: () => (
    <div className="w-full h-96 text-white text-2xl font-bold flex justify-center items-center">
      Reports
    </div>
  ),
  Shortcuts: () => (
    <div className="w-full h-96 text-white text-2xl font-bold flex justify-center items-center">
      Shortcuts
    </div>
  ),
};

const ProjectLinks = [
  { key: "Summary", label: "Summary", icon: IoFolderOutline },
  { key: "Board", label: "Board", icon: MdOutlineSpaceDashboard },
  { key: "List", label: "List", icon: IoIosList },
  { key: "Calendar", label: "Calendar", icon: FaRegCalendarAlt },
  { key: "Timeline", label: "Timeline", icon: MdOutlineBarChart },
  { key: "Approvals", label: "Approvals", icon: TbArrowRampRight },
  // { key: "Forms", label: "Forms", icon: SiGoogleforms },
  // { key: "Pages", label: "Pages", icon: RiPagesLine },
  { key: "Attachments", label: "Attachments", icon: GrAttachment },
  { key: "Issues", label: "Issues", icon: MdOutlineRunningWithErrors },
  // { key: "Reports", label: "Reports", icon: FaChartLine },
  // { key: "Shortcuts", label: "Shortcuts", icon: FaLink },
];

function Projects(props) {
  const [response, setResponse] = useState();
  const [activeLink, setActiveLink] = useState("Summary");
  const [hoverState, setHoverState] = useState(
    ProjectLinks.reduce((acc, link) => ({ ...acc, [link.key]: false }), {})
  );

  const handleHoverChange = (key, isHovered) => {
    setHoverState((prev) => ({ ...prev, [key]: isHovered }));
  };

  const ActiveComponent = components[activeLink] || components["Summary"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(
          "DashboardService/VwAPINSEIPLDetailsNew/",
          {
            data: {
              p1_int: 7,
              p2_int: 24, //week
              p3_int: 2024, //year
              p4_int: null,
              p5_int: null,
              p6_int: 2076, //eid
              P7_int: 6307, //idpk
              P9_varchar: null,
              P10_varchar: "NR", //type
            },
          }
        );
        const {
          Output: { status, data },
        } = response;
        if (response.Output.status.code === "200") {
          setResponse(response.Output.data);
          values = response.Output.data;
        } else {
          console.error("Error fetching data:", status.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full h-screen bg-gradient-to-br from-NanoBGcolor1 via-NanoBGcolor2 to-NanoBGcolor3 flex flex-col">
      <div className="fixed top-12 left-0 right-0 z-10 border-ProjectHeaderBarBorderColor border-b">
        <div className="w-full pt-7 pr-7 pl-7 pb-2 flex justify-between items-center">
          <h1 className="text-2xl text-white font-medium cursor-pointer">
            {props.desc}
          </h1>
        </div>
        <div className="w-full px-7 flex justify-start items-center overflow-x-auto">
          {ProjectLinks.map(({ key, label, icon: Icon }) => (
            <a
              key={key}
              onClick={() => setActiveLink(key)}
              onMouseEnter={() => handleHoverChange(key, true)}
              onMouseLeave={() => handleHoverChange(key, false)}
              className={`mr-8 flex justify-start items-center gap-1 text-base font-normal text-ProjectHeaderBarTextColor 
            ${
              activeLink === key
                ? "border-activeLinkBorderColor2 border-b-2"
                : "border-transparent border-b-2"
            } 
            cursor-pointer`}
            >
              {hoverState[key] ? <CgLayoutGridSmall /> : <Icon />} {label}
            </a>
          ))}
        </div>
      </div>

      <div className="flex-1 mt-36 px-7 pt-5 overflow-y-auto">
        <ActiveComponent />
      </div>
    </div>
  );
}

export default Projects;
