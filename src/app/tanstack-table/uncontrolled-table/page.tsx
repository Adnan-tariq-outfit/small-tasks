"use client";
import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

export default function UncontrolledTanStack() {
  const data = useMemo(() => {
    return [
      { id: 1, firstName: "Adnan", lastName: "Tariq", age: 25 },
      { id: 2, firstName: "Ali", lastName: "Khan", age: 30 },
      { id: 3, firstName: "Sara", lastName: "Malik", age: 22 },
      { id: 4, firstName: "Adnan", lastName: "Tariq", age: 25 },
      { id: 5, firstName: "Ali", lastName: "Khan", age: 30 },
      { id: 6, firstName: "Sara", lastName: "Malik", age: 22 },
      { id: 7, firstName: "Adnan", lastName: "Tariq", age: 25 },
      { id: 8, firstName: "Ali", lastName: "Khan", age: 30 },
      { id: 9, firstName: "Sara", lastName: "Malik", age: 22 },
      { id: 10, firstName: "Adnan", lastName: "Tariq", age: 25 },
      { id: 11, firstName: "Ali", lastName: "Khan", age: 30 },
      { id: 12, firstName: "Sara", lastName: "Malik", age: 22 },
    ];
  }, []);

  const columns = [
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "age",
      header: "Age",
    },
  ];
  const table = useReactTable({
    data,
    columns,

    // TanStack manages EVERYTHING internally
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div style={{ padding: 20 }}>
      <h2>Uncontrolled TanStack Table</h2>

      {/* 🔍 Global Filter (built-in internal state) */}
      <input
        placeholder="Search all..."
        value={table.getState().globalFilter ?? ""}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        style={{ marginBottom: 10 }}
      />

      <table border={1} cellPadding={6} style={{ width: "100%" }}>
        {/* HEADERS */}
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{ cursor: "pointer" }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() === "asc" && " ↑"}
                  {header.column.getIsSorted() === "desc" && " ↓"}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* ROWS */}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div style={{ marginTop: 10 }}>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>

        <span style={{ marginLeft: 10 }}>
          Page {table.getState().pagination.pageIndex + 1}
        </span>
      </div>
    </div>
  );
}
