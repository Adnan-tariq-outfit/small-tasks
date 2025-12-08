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
export default function FullControlledTable() {
  // const [data, setData] = useState(defaultData);

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

  // FULLY CONTROLLED STATES
  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  console.log("sorting", sorting);
  console.log("column visiblility", columnVisibility);
  console.log("rowSelection", rowSelection);
  console.log("globalFilter", pagination);
  console.log("pagination", pagination);

  // Make sure to import useReactTable and the required row model hooks

  const table = useReactTable({
    data,
    columns,

    // 🔥 FULLY CONTROLLED
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination,
    },

    // 🔥 UPDATERS
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,

    // ROW MODELS
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div style={{ padding: 20 }}>
      <h2>Full Controlled TanStack Table</h2>

      {/* 🔍 GLOBAL SEARCH */}
      <input
        placeholder="Search..."
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        style={{ marginBottom: 10 }}
      />

      {/* 👀 COLUMN VISIBILITY TOGGLE */}
      <div style={{ marginBottom: 10 }}>
        {table.getAllLeafColumns().map((column) => (
          <label key={column.id} style={{ marginRight: 10 }}>
            <input
              type="checkbox"
              checked={column.getIsVisible()}
              onChange={column.getToggleVisibilityHandler()}
            />
            {column.id}
          </label>
        ))}
      </div>

      {/* 🏁 RENDER TABLE */}
      <table border={1} cellPadding={6} style={{ width: "100%" }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc" && " ↑"}
                    {header.column.getIsSorted() === "desc" && " ↓"}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

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

      {/* 📄 PAGINATION */}
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
          Page: {table.getState().pagination.pageIndex + 1}
        </span>

        <select
          style={{ marginLeft: 10 }}
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
