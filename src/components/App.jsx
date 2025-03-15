import React, { useState, useEffect } from "react";
import Column from "./Column";
import "./App.css";

const NoteBoard = () => {
  const [columns, setColumns] = useState(() => {
    const storedColumns = localStorage.getItem("columns");
    return storedColumns ? JSON.parse(storedColumns) : [];
  });

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  const addColumn = () => {
    const newColumn = { id: crypto.randomUUID(), title: "New Column", notes: [] };
    setColumns([...columns, newColumn]);
  };

  const removeColumn = (id) => {
    setColumns(columns.filter((col) => col.id !== id));
  };

  const addNote = (columnId, note) => {
    setColumns(columns.map(col =>
      col.id === columnId
        ? { ...col, notes: [...col.notes, { id: crypto.randomUUID(), ...note }] }
        : col
    ));
  };

  const removeNote = (columnId, noteId) => {
    setColumns(columns.map(col =>
      col.id === columnId
        ? { ...col, notes: col.notes.filter(note => note.id !== noteId) }
        : col
    ));
  };

  const editColumnTitle = (columnId, newTitle) => {
    setColumns(columns.map(col =>
      col.id === columnId
        ? { ...col, title: newTitle }
        : col
    ));
  };

  return (
    <div className="note-pro">
      <div className="header">
        <h1>YOUR <span>NOTE-PRO</span></h1>
      </div>
      <div className="board">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            removeColumn={removeColumn}
            addNote={addNote}
            removeNote={removeNote}
            editColumnTitle={editColumnTitle}
          />
        ))}
        <button className="global-add-btn" onClick={addColumn}>+</button>
      </div>
    </div>
  );
};

export default NoteBoard;
