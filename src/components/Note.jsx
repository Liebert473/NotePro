import React, { useState } from "react";

const Note = ({ note, removeNote, columnId }) => {
  return (
    <div className="note">
      <button className="del-note" onClick={() => removeNote(columnId, note.id)}>×</button>
      <p><strong>Time: {note.time}</strong></p>
      <p>{note.text}</p>
    </div>
  );
};

export default Note;
