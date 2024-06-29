import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";

const Check = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div style={{ padding: 20 }}>
      <h2>ReactJS Datepicker using React Flatpickr</h2>
      <div>
        <Flatpickr
          data-enable-time
          value={date}
          onChange={([selectedDate]) => {
            setDate(selectedDate);
          }}
        />
      </div>
    </div>
  );
};

export default Check;
