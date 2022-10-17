import React, { useState, useEffect } from "react";
import styles from "./TodoItem.module.css";

let prevTodoStr = "";

const TodoItem = (props) => {
  const { data, removeTodoItem, updateTodoItem } = props;
  const [editing, setEditing] = useState(false);
  const [todoStr, setTodoStr] = useState("");
  const [todoCheck, setTodoCheck] = useState(false);
  console.log(todoCheck);
  useEffect(() => {
    setTodoStr(data.todo);
    setTodoCheck(data.isCompleted);
  }, [data.todo, data.isCompleted]);

  const changeEdition = () => {
    prevTodoStr = todoStr;
    setTodoStr(todoStr);
    setEditing(!editing);
    updateTodoItem(data.id, todoCheck, todoStr);
  };

  const cencelEdtiong = () => {
    setTodoStr(prevTodoStr);
    setEditing(!editing);
  };

  const changeTodoStr = (e) => {
    setTodoStr(e.target.value);
  };

  const deleteTodoItem = () => {
    removeTodoItem(data.id);
  };

  const changeCheckbox = () => {
    setTodoCheck(!todoCheck);
    updateTodoItem(data.id, !todoCheck, todoStr);
  };

  if (editing) {
    return (
      <div className={styles.item}>
        <div>
          <input
            type="checkbox"
            checked={todoCheck}
            onChange={changeCheckbox}
            readOnly
            className={todoCheck ? styles.checked : undefined}
          />
          <input
            type="text"
            value={todoStr}
            onChange={changeTodoStr}
            className={styles.editing}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={changeEdition}
            className={styles.todoBtn}
          >
            제출
          </button>
          <button
            type="button"
            onClick={cencelEdtiong}
            className={styles.todoBtn}
          >
            취소
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.item}>
      <div>
        <input
          type="checkbox"
          id={"chk_" + data.id}
          checked={todoCheck}
          onChange={changeCheckbox}
          readOnly
        />
        <label
          htmlFor={"chk_" + data.id}
          className={todoCheck ? styles.checked : undefined}
        >
          {todoStr}
        </label>
      </div>
      <div>
        <button
          type="button"
          onClick={changeEdition}
          className={styles.todoBtn}
        >
          수정
        </button>
        <button
          type="button"
          onClick={deleteTodoItem}
          className={styles.todoBtn}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
