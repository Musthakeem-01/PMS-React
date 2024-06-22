import React, { useState, useRef, useEffect } from "react";
import { IoIosClose } from "react-icons/io";

const CustomDatalist = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const datalistRef = useRef(null);

  useEffect(() => {
    // Close dropdown if clicking outside
    const handleClickOutside = (event) => {
      if (
        datalistRef.current &&
        !datalistRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (inputValue && props.getdata) {
      props.getdata(inputValue);
    }
  }, [inputValue]);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    filterOptions(value);
  };

  const filterOptions = (value) => {
    if (value) {
      const filtered = props.options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(props.options);
    }
    setIsOpen(true);
  };

  const handleFocus = () => {
    filterOptions(inputValue);
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setIsOpen(false);
  };
  const clear = () => {
    setInputValue("");
  };
  return (
    <div className="relative w-full h-full" ref={datalistRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        ref={inputRef}
        className="w-full text-xs p-1 border border-gray-300 rounded"
        placeholder={`Search for ${props.fieldName}`}
      />
      <div className="absolute top-1 right-0 cursor-pointer">
        <IoIosClose onClick={clear} />
      </div>
      {isOpen && (
        <div
          style={{ zIndex: "9" }}
          className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto"
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick(option)}
                className="p-1 text-xs cursor-pointer hover:bg-gray-200"
              >
                {option}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">Please Select workType</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomDatalist;
