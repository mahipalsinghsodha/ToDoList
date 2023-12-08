// TodoList.js

import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import Pagination from "./Pagination";
import SearchFilter from "./SearchFilter";

const TodoList = ({ user }) => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectAll, setSelectAll] = useState(false);
  const [newTask, setNewTask] = useState("");

  // Simulating fetching todos from an API or database
  useEffect(() => {
    // Fetch todos or set them as needed
    const mockTodos = [
      { id: 1, title: "Task 1", status: "Pending", selected: false },
      { id: 2, title: "Task 2", status: "InProgress", selected: false },
      { id: 3, title: "Task 3", status: "Complete", selected: false },
      { id: 4, title: "Task 4", status: "Canceled", selected: false },
      // Add more todos as needed
    ];

    setTodos(mockTodos);
  }, []);

  // Functions to handle todo actions (edit, delete, mark as complete, etc.)
  const handleSelect = (todoId, isChecked) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, selected: isChecked } : todo
    );
    setTodos(updatedTodos);
    setSelectAll(updatedTodos.every((todo) => todo.selected));
  };

  const handleEdit = (todoId, newTitle) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, title: newTitle } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDelete = (todoId) => {
    // Implement delete logic
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
    setSelectAll(updatedTodos.every((todo) => todo.selected));
  };

  const handleChangeStatus = (todoId, newStatus) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, status: newStatus } : todo
    );
    setTodos(updatedTodos);
    setSelectAll(updatedTodos.every((todo) => todo.selected));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Perform search logic and update todos state
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handleSelectAll = () => {
    const updatedTodos = todos.map((todo) => ({
      ...todo,
      selected: !selectAll,
    }));
    setTodos(updatedTodos);
    setSelectAll(!selectAll);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const updatedTodos = [
        ...todos,
        { id: Date.now(), title: newTask, status: "Pending", selected: false },
      ];

      setTodos(updatedTodos);
      setNewTask("");
      setSelectAll(false); // Reset "Select All" when adding a new task
    }
  };

  // Filter and pagination logic
  const filteredTodos = todos
    .filter((todo) => {
      if (selectedStatus === "all") {
        return true;
      } else {
        return todo.status.toLowerCase() === selectedStatus.toLowerCase();
      }
    })
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const paginatedTodos = filteredTodos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="todo-list-container">
      <div className="add-task-container">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <SearchFilter onSearch={handleSearch} />
      <div className="status-filter-container">
        <label>
          Status:
          <select
            value={selectedStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="all">All</option>
            <option value="complete">Complete</option>
            <option value="in-progress">In Progress</option>
            <option value="canceled">Canceled</option>
          </select>
        </label>
      </div>
      <div className="select-all-container">
        <label>
          Select All
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          />
        </label>
      </div>
      <div className="todo-items-container">
        {paginatedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onSelect={(isChecked) => handleSelect(todo.id, isChecked)}
            onEdit={(newTitle) => handleEdit(todo.id, newTitle)}
            onDelete={() => handleDelete(todo.id)}
            onChangeStatus={(newStatus) =>
              handleChangeStatus(todo.id, newStatus)
            }
          />
        ))}
      </div>
      <Pagination
        totalItems={filteredTodos.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TodoList;
