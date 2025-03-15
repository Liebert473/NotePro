import React, { useState } from "react";
import Note from "./Note";

const Column = ({
  column,
  removeColumn,
  addNote,
  removeNote,
  editColumnTitle,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);
  const [showAddNote, setShowAddNote] = useState(false);
  const [noteTime, setNoteTime] = useState("");
  const [noteText, setNoteText] = useState("");

  // Handle title change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Save new title
  const saveTitle = () => {
    editColumnTitle(column.id, title);
    setIsEditing(false);
  };

  // Add a new note
  const handleAddNote = () => {
    if (!noteTime.trim() || !noteText.trim()) return;
    addNote(column.id, { time: noteTime, text: noteText }); // Passing an object
    setNoteTime("");
    setNoteText("");
    setShowAddNote(false);
  };  

  return (
    <div className="column">
      <div className="column-header">
        <input
          type="text"
          className="col-name"
          value={title}
          onChange={handleTitleChange}
          onBlur={saveTitle}
          onKeyDown={(e) => e.key === "Enter" && saveTitle()}
        />
        <button className="del-col" onClick={() => removeColumn(column.id)}>
          ×
        </button>
      </div>

      <div className="note-container">
        {column.notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            removeNote={removeNote}
            columnId={column.id}
          />
        ))}
        </div>

        <div className={`add-note ${showAddNote ? "show" : "hide"}`}>
          <button
            className={`close-add ${showAddNote ? "active" : ""}`}
            onClick={() => setShowAddNote(!showAddNote)}
          >
            <span>+</span>
          </button>
          {showAddNote && (
            <>
              <input
                type="text"
                placeholder="Enter the time"
                value={noteTime}
                onChange={(e) => setNoteTime(e.target.value)}
              />
              <textarea
                placeholder="Enter the text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <button className="add-btn" onClick={handleAddNote}>
                +
              </button>
            </>
          )}
        </div>
    </div>
  );
};

export default Column;
