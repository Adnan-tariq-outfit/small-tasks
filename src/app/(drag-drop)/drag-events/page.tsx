"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Single array of items
const initialItems = [
  { id: "item-1", content: "Item 1", color: "#f44336" },
  { id: "item-2", content: "Item 2", color: "#e91e63" },
  { id: "item-3", content: "Item 3", color: "#9c27b0" },
  { id: "item-4", content: "Item 4", color: "#673ab7" },
  { id: "item-5", content: "Item 5", color: "#3f51b5" },
  { id: "item-6", content: "Item 6", color: "#2196f3" },
];

const Page = () => {
  const [items, setItems] = useState(initialItems);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [activeEvent, setActiveEvent] = useState<string>("");
  const [eventLog, setEventLog] = useState<string[]>([]);

  // All drag events documentation
  const dragEvents = [
    {
      event: "onDragStart",
      description:
        "Jab element ko drag karna shuru karte hain. Is event me hum data set karte hain jo drop zone me use hoga.",
      example: `const handleDragStart = (e: React.DragEvent) => {
  e.dataTransfer.setData("text/plain", itemId);
  e.dataTransfer.effectAllowed = "move";
  setDraggedIndex(index);
}`,
      when: "Element ko drag karte waqt ek baar trigger hota hai",
    },
    {
      event: "onDrag",
      description:
        "Jab element drag ho raha ho. Ye event continuously trigger hota hai (har few milliseconds).",
      example: `const handleDrag = (e: React.DragEvent) => {
  // Mouse position track kar sakte hain
  setMousePosition({ x: e.clientX, y: e.clientY });
}`,
      when: "Element drag ho raha ho (continuously)",
    },
    {
      event: "onDragEnd",
      description:
        "Jab drag operation complete ho jaye (successfully drop ho ya cancel).",
      example: `const handleDragEnd = (e: React.DragEvent) => {
  // Cleanup operations
  setIsDragging(false);
  setDraggedIndex(null);
}`,
      when: "Drag operation khatam ho jaye",
    },
    {
      event: "onDragEnter",
      description:
        "Jab dragged element drop zone me enter kare. Ye ek baar trigger hota hai jab element zone me aata hai.",
      example: `const handleDragEnter = (e: React.DragEvent) => {
  e.preventDefault();
  setIsOverZone(true);
}`,
      when: "Dragged element drop zone me pehli baar enter kare",
    },
    {
      event: "onDragOver",
      description:
        "Jab dragged element drop zone ke upar ho. Ye continuously trigger hota hai jab element zone ke upar ho. IMPORTANT: preventDefault() zaroor call karna hai!",
      example: `const handleDragOver = (e: React.DragEvent) => {
  e.preventDefault(); // Zaroori hai!
  e.dataTransfer.dropEffect = "move";
  setDragOverIndex(index);
}`,
      when: "Dragged element drop zone ke upar ho (continuously)",
    },
    {
      event: "onDragLeave",
      description:
        "Jab dragged element drop zone se bahar jaye. Ye ek baar trigger hota hai.",
      example: `const handleDragLeave = (e: React.DragEvent) => {
  setIsOverZone(false);
  setDragOverIndex(null);
}`,
      when: "Dragged element drop zone se bahar jaye",
    },
    {
      event: "onDrop",
      description:
        "Jab element drop ho. Is event me hum data retrieve karke item ko add/remove karte hain.",
      example: `const handleDrop = (e: React.DragEvent) => {
  e.preventDefault();
  const itemId = e.dataTransfer.getData("text/plain");
  // Reorder items
  const newItems = [...items];
  const [draggedItem] = newItems.splice(dragIndex, 1);
  newItems.splice(dropIndex, 0, draggedItem);
  setItems(newItems);
}`,
      when: "Element successfully drop ho jaye",
    },
  ];

  const addToLog = (eventName: string, itemId?: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = itemId
      ? `[${timestamp}] ${eventName} on ${itemId}`
      : `[${timestamp}] ${eventName}`;
    setEventLog((prev) => [logEntry, ...prev].slice(0, 10)); // Keep last 10 logs
    setActiveEvent(eventName);
    setTimeout(() => setActiveEvent(""), 500);
  };

  // onDragStart - Element ko drag shuru karte waqt
  const handleDragStart = (e: React.DragEvent, index: number, item: typeof initialItems[0]) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", JSON.stringify({ id: item.id, index }));
    addToLog("onDragStart", item.id);
  };

  // onDrag - Element drag ho raha ho (continuously)
  const handleDrag = (e: React.DragEvent, item: typeof initialItems[0]) => {
    addToLog("onDrag", item.id);
  };

  // onDragEnd - Drag operation complete
  const handleDragEnd = (e: React.DragEvent, item: typeof initialItems[0]) => {
    setDraggedIndex(null);
    setDragOverIndex(null);
    addToLog("onDragEnd", item.id);
  };

  // onDragEnter - Drop zone me enter karte waqt
  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverIndex(index);
    addToLog("onDragEnter", `position ${index}`);
  };

  // onDragOver - Drop zone ke upar ho (continuously) - IMPORTANT: preventDefault() zaroori!
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault(); // Zaroori hai!
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
    // Continuous event hai, isliye log kam karte hain
  };

  // onDragLeave - Drop zone se bahar jate waqt
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverIndex(null);
    addToLog("onDragLeave");
  };

  // onDrop - Element drop ho jaye
  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      const dragIndex = data.index;

      if (dragIndex !== dropIndex && dragIndex !== null && dragIndex !== undefined) {
        const newItems = [...items];
        const [draggedItem] = newItems.splice(dragIndex, 1);
        newItems.splice(dropIndex, 0, draggedItem);
        setItems(newItems);
        addToLog("onDrop", `from ${dragIndex} to ${dropIndex}`);
      }
    } catch (error) {
      console.error("Error parsing drag data:", error);
    }

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom fontWeight={700}>
        All Drag Events - Single Array Example
      </Typography>

      {/* Documentation Section */}
      <Paper sx={{ p: 3, mb: 4, bgcolor: "background.default" }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          All Drag Events Explained:
        </Typography>
        {dragEvents.map((event, index) => (
          <Accordion key={index} sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
                <Chip
                  label={event.event}
                  color={activeEvent === event.event ? "primary" : "default"}
                  size="small"
                  sx={{
                    minWidth: 120,
                    fontWeight: activeEvent === event.event ? 700 : 400,
                  }}
                />
                <Typography variant="subtitle1">{event.description}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>When:</strong> {event.when}
              </Typography>
              <Box
                component="pre"
                sx={{
                  bgcolor: "grey.900",
                  color: "grey.100",
                  p: 2,
                  borderRadius: 1,
                  mt: 2,
                  overflow: "auto",
                  fontSize: "0.875rem",
                }}
              >
                <code>{event.example}</code>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Important:</strong> onDragOver event me hamesha preventDefault() call karna
        zaroori hai, warna drop kaam nahi karega! Items ko drag karke reorder karo aur event
        logs dekho.
      </Alert>

      {/* Event Logs */}
      <Paper sx={{ p: 2, mb: 3, bgcolor: "grey.50" }}>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Event Logs (Last 10 events):
        </Typography>
        <Box
          sx={{
            maxHeight: 200,
            overflowY: "auto",
            bgcolor: "grey.900",
            color: "grey.100",
            p: 2,
            borderRadius: 1,
            fontFamily: "monospace",
            fontSize: "0.875rem",
          }}
        >
          {eventLog.length === 0 ? (
            <Typography variant="body2" color="grey.400">
              No events yet. Start dragging items to see events...
            </Typography>
          ) : (
            eventLog.map((log, index) => (
              <Box key={index} sx={{ py: 0.5 }}>
                {log}
              </Box>
            ))
          )}
        </Box>
      </Paper>

      {/* Drag & Drop Area */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Drag & Drop Area (Single Array):
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Items ko drag karke order change karo. Sab drag events log mein dikhenge.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mt: 3,
            minHeight: 200,
            p: 2,
            bgcolor: "grey.50",
            borderRadius: 2,
          }}
        >
          {items.map((item, index) => {
            const isDragged = draggedIndex === index;
            const isDragOver = dragOverIndex === index && draggedIndex !== index && draggedIndex !== null;
            const draggedItem = draggedIndex !== null ? items[draggedIndex] : null;

            return (
              <Box
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index, item)}
                onDrag={(e) => handleDrag(e, item)}
                onDragEnd={(e) => handleDragEnd(e, item)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                sx={{
                  p: 2,
                  bgcolor: item.color,
                  color: "white",
                  borderRadius: 2,
                  cursor: "move",
                  userSelect: "none",
                  transition: "all 0.2s",
                  opacity: isDragged ? 0.3 : isDragOver ? 0.7 : 1,
                  transform: isDragged ? "scale(0.95)" : "scale(1)",
                  border: isDragOver ? "3px dashed white" : "2px solid transparent",
                  boxShadow: isDragOver ? 6 : 2,
                  position: "relative",
                  minWidth: 120,
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 4,
                  },
                }}
              >
                {/* Drop preview */}
                {isDragOver && draggedItem && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bgcolor: draggedItem.color,
                      borderRadius: 2,
                      opacity: 0.5,
                      border: "2px dashed white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body2" fontWeight={600}>
                      {draggedItem.content}
                    </Typography>
                  </Box>
                )}
                <Typography variant="body1" fontWeight={600}>
                  {item.content}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Paper>
    </Container>
  );
};

export default Page;
