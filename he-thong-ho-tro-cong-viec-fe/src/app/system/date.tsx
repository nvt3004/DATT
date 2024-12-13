import { useState } from "react";
import { Box } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import "@mantine/dates/styles.css";

function DateNow() {
  const [value, setValue] = useState<Date[]>([]);
  const today = new Date();

  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DatePicker
          type="multiple"
          value={value}
          onChange={setValue}
          renderDay={(date) => {
            const isToday =
              date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear();

            return (
              <Box
                style={{
                  position: "relative",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: isToday ? "white" : "black",
                  backgroundColor: isToday ? "red" : "transparent",
                  borderRadius: "30%",
                  border: isToday ? "2px solid red" : "none",
                }}
              >
                {isToday ? "" : date.getDate()}
                <Box>{isToday && date.getDate()}</Box>
              </Box>
            );
          }}
        />
      </Box>
    </>
  );
}

export default DateNow;
