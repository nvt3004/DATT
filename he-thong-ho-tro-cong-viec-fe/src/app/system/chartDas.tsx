"use client";
import React from "react";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
// Dữ liệu doanh thu theo danh mục
const data = [
  { name: "Jan", value: 12000 },
  { name: "Feb", value: 13000 },
  { name: "Mar", value: 15000 },
  { name: "Apr", value: 14000 },
  { name: "May", value: 16000 },
  { name: "Jun", value: 17000 },
];

// Màu sắc cho các phần của biểu đồ tròn
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const PieChartRevenue = () => {
  return (
    <PieChart width={500} height={500}>
      <Pie
        data={data}
        cx={250}
        cy={250}
        labelLine={false}
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartRevenue;
