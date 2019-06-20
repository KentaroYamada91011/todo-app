import React, {useState} from 'react';
import DatePicker from 'react-date-picker';
import logo from './logo.svg';
import List from './List.js'
import './App.css';

export default () => {
  const [todos, setTodos] = useState([]);//いっぱい
  const [tmpTodo, setTmpTodo] = useState({todo:'',todoDate:new Date(), complete:false,number:0});
  const [isPoppedOut, setPoppedOut] = useState(false);
  const [date, setDate] = useState(new Date());

  const addTodo = () => {
    if (tmpTodo === "") {
      return;
    }
    setTodos([...todos, tmpTodo]);
    setPoppedOut(false);
  };
  const popout =() => {
    setPoppedOut(true);
  };

  const popoutClosed =() => {
    setPoppedOut(false);
  };

const changeDate = date => {
  if (date !== null) {
    setDate( date );
    setTmpTodo({todo:tmpTodo.todo,todoDate:date});
  }
  else {
    setTmpTodo({todo:tmpTodo.todo,todoDate:new Date()});
  }
  };

  return (
    <>
      <h1>TODO APP</h1>
      <div className="main">
        <button className="home__button" onClick={popout}>
          やることを追加
        </button>
        { isPoppedOut ?
          <div className="card">
            <div className="closedIcon" onClick={popoutClosed}>×</div>
            <h2>やることを入力</h2>
            <input
              className="form__text"
              type="text"
              name="todo"
              onChange={e => setTmpTodo({todo:e.target.value,todoDate:tmpTodo.todoDate})}
              value={tmpTodo.todo}
            />
            <h2>日付を入力</h2>
            <DatePicker
              className="form__datePicker"
              format="y/MM/dd"
              onChange={changeDate}
              value={date}
            />
            <div className="form__submit__wrapper">
              <button className="form__submit" onClick={addTodo}>送信</button>
            </div>
          </div>: <></> }
        <List todos={todos} setTodos={setTodos} />
      </div>
    </>
  );
};
