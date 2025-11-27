import React from "react";
import { dataType } from "./practiceType";
const usePractice = () => {
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    setTask: React.Dispatch<React.SetStateAction<any>>
  ) => {
    const { name, value } = e.target;

    setTask((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement>,
    editId: string,
    setEditId: React.Dispatch<React.SetStateAction<string>>,
    task: dataType,
    setList: React.Dispatch<React.SetStateAction<dataType[]>>,
    setTask: React.Dispatch<React.SetStateAction<dataType>>,
    list: dataType[]
  ) => {
    e.preventDefault();
    if (!task.name || !task.description) {
      return alert("All Fields are required");
    }
    if (editId) {
      const result = list.map((val) =>
        val.id === editId ? { ...val, ...task } : val
      );
      setList(result);
      setEditId("");
      setTask({ id: "", name: "", description: "" });
      return;
    }

    setList([...list, { ...task, id: Date.now().toString() }]);
    setTask({ id: "", name: "", description: "" });
  };
  const handleEdit = (
    id: string,
    setEditId: React.Dispatch<React.SetStateAction<string>>,
    list: dataType[],
    setTask: React.Dispatch<React.SetStateAction<dataType>>
  ) => {
    const result = list.find((val) => val.id === id);
    if (!result) return;
    setEditId(id);
    setTask(result);
  };
  const handleDelete = (
    id: string,
    list: dataType[],
    setList: React.Dispatch<React.SetStateAction<dataType[]>>
  ) => {
    setList(list.filter((val) => val.id !== id));
  };

  return { handleInput, handleSubmit, handleEdit, handleDelete };
};

export default usePractice;
