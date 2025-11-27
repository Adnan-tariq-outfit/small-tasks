"use client";
import React, { useEffect, useState } from "react";
import usePractice from "./usePractice";
import { dataType } from "./practiceType";

const Practice = () => {
  const [list, setList] = useState<dataType[]>([]);
  const [editId, setEditId] = useState("");
  console.log(editId);
  const [task, setTask] = useState<dataType>({
    id: "",
    name: "",
    description: "",
  });
  const { handleInput, handleSubmit, handleEdit, handleDelete } = usePractice();

  useEffect(() => {
    const data = localStorage.getItem("list");
    if (data) setList(JSON.parse(data));
  }, []);

  // Save to localStorage whenever `list` changes
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <div>
      <input
        type="text"
        value={task.name}
        onChange={(e) => handleInput(e, setTask)}
        name="name"
      />
      <input
        type="text"
        value={task.description}
        onChange={(e) => handleInput(e, setTask)}
        name="description"
      />
      <button
        onClick={(e) =>
          handleSubmit(e, editId, setEditId, task, setList, setTask, list)
        }
      >
        submit
      </button>

      <div>
        {list?.map((val: dataType) => (
          <div key={val?.id}>
            <h3>{val?.name}</h3>
            <h3>{val?.description}</h3>
            <button
              onClick={() => handleEdit(val?.id, setEditId, list, setTask)}
            >
              Edit
            </button>
            <button onClick={() => handleDelete(val?.id, list, setList)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Practice;
