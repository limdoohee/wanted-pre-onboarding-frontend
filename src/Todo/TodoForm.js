import React, { useState } from "react";
import styles from "./TodoForm.module.css";

const ToDoForm = (props) => {
  const { addTodoItem } = props;
  const [todoStr, setTodoStr] = useState("");

  const changeTodoStr = (e) => {
    setTodoStr(e.target.value);
  };

  const keyPress = (e) => {
    if (e.key === "Enter") {
      clickAddBtn();
    }
  };

  const clickAddBtn = () => {
    if (todoStr.length) {
      addTodoItem(todoStr);
      setTodoStr("");
    }
  };

  return (
    <div className={styles.todoForm}>
      <input
        type="text"
        value={todoStr}
        onChange={changeTodoStr}
        onKeyPress={keyPress}
        placeholder="Enter your task"
        className={styles.inputTodo}
      />
      <button type="button" onClick={clickAddBtn} className={styles.addTodo}>
        ADD
      </button>
    </div>
  );
};

export default ToDoForm;
