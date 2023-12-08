// TodoItem.js

import React, { useState } from "react";

const TodoItem = ({ todo, onSelect, onEdit, onDelete, onChangeStatus }) => {
  const { id, title, status, selected } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleSaveEdit = () => {
    setIsEditing(false);
    onEdit(newTitle);
  };

  return (
    <div className="todo-item">
      <div className="todo-item-checkbox">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(!selected)}
        />
      </div>
      <div className="todo-item-details">
        {!isEditing ? (
          <>
            <div className="todo-item-title">{title}</div>
            <div className="todo-item-status">
              <select
                value={status}
                onChange={(e) => onChangeStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="InProgress">In Progress</option>
                <option value="Complete">Complete</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <button onClick={handleSaveEdit}>Save</button>
          </>
        )}
      </div>
      <div className="todo-item-actions">
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
