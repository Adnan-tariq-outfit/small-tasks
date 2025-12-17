"use client";
import React, { useState } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Box, Typography } from "@mui/material";

const initialData = [
  { id: 1, name: "Adnan" },
  { id: 2, name: "Ali" },
  { id: 3, name: "Sara" },
  { id: 4, name: "Ahmed" },
  { id: 5, name: "Hamza" },
];

const Page = () => {
  const [myData, setMyData] = useState(initialData);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragEnter = (index: number) => {
    if (dragIndex === null || dragIndex === index) return;

    const tempData = [...myData];
    const [draggedItem] = tempData.splice(dragIndex, 1);
    tempData.splice(index, 0, draggedItem);

    setMyData(tempData);
    setDragIndex(index); // update index after move
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault(); // REQUIRED
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };
  const handleDrop = () => {
    console.log("Final order:", myData);
    setDragIndex(null);
    setDragOverIndex(null);
  };

  return (
    <Box sx={{ display: "flex", gap: 2, p: 2 }}>
      {myData.map((value, index) => (
        <Box
          key={value.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragEnter={() => handleDragEnter(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          onDrop={() => handleDrop()}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
            border:
              dragOverIndex === index ? "3px dashed #000" : "1px solid #000",
            p: 2,
            borderRadius: 2,
            width: 200,
            height: 200,
            transition: "all 0.2s ease",
            backgroundColor: dragIndex === index ? "#f5f5f5" : "white",
          }}
        >
          <DragIndicatorIcon sx={{ cursor: "move", color: "#aaa" }} />
          <Typography variant="h5">{value.name}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Page;
