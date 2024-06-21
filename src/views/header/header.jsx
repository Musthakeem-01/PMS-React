import React, { useState } from "react";
import Logo from "../../assets/img/logo-01.png";
import Projects from "../projects";
import Dashboard from "../dashboard";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { IoMdSearch } from "react-icons/io";
import Popup from "../popup";
const Header = () =>
{
  const [ activeLink, setActiveLink ] = useState( "Dashboards" );

  return (
    <div className="w-full">
      <div className="w-full px-3 border-HeaderBottomBorder bg-white fixed z-20">
        <nav className="flex">
          <div className="w-2/12 h-14 flex justify-start items-center">
            <img src={ Logo } alt="Logo" className="h-10 w-auto" />
          </div>

          <div className="w-7/12 h-14 flex justify-start items-center">
            { [ "Projects", "Dashboards" ].map( ( item ) => (
              <a
                key={ item }
                onClick={ () => setActiveLink( item ) }
                className={ `mr-8 h-14 flex justify-start items-center text-base font-medium ${ activeLink === item
                  ? "border-activeLinkBorderColor border-b-4 text-activeLinkTextColor"
                  : "border-transparent border-b-4 text-stone-600"
                  } cursor-pointer` }
              >
                { item }
              </a>
            ) ) }
          </div>
          <div className="w-3/12 h-14 gap-5 flex justify-end items-center">
            { <Popup /> }
            <form className="max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <IoMdSearch className="w-5 h-5" />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full h-8 pl-10 pr-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                  placeholder="Search"
                  required
                />
              </div>
            </form>
          </div>
        </nav>
      </div>

      <div>
        { activeLink === "Projects" && <Projects /> }
        { activeLink === "Dashboards" && <Dashboard /> }
      </div>
    </div>
  );
};

export default Header;
