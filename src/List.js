import React, {useState, useEffect} from 'react';
import './List.css'

export default (props) => {
  const [tmpTodos, setTmpTodos] = useState([]);
  const [tmpList, setTmpList] = useState(1);

  useEffect(() => {
    for (let i = 0; i < props.todos.length; i += 1) {
      const tmpTarget = props.todos[i];
      props.todos.splice(i, 1, {todo:tmpTarget.todo,todoDate:tmpTarget.todoDate,complete: tmpTarget.complete, number:i});
    }
    setTmpTodos(props.todos);
    switch(tmpList){
      case 1:
        setTmpTodos(props.todos);
        displayAll();
        break;
      case 2:
        displayComplete();
        break;
      case 3:
        displayUnComplete();
        break;
    }
  },[props.todos])

  const deleteTodo = i => {
    const newTodos = props.todos.filter((a, todoIndex) => {
      return i !== todoIndex;
    });
    props.setTodos(newTodos);
    switch(tmpList){
      case 1:
        console.log(props.todos);
        break;
      case 2:
        const completeTodos = props.todos.filter((todo) => {
          return todo.complete === true;
        });
        setTmpTodos(completeTodos);
        break;
      case 3:
        const unCompleteTodos = props.todos.filter((todo) => {
          return todo.complete !== true;
        });
        setTmpTodos(unCompleteTodos);
        break;
    }
  };

  const displayAll = () => {
    setTmpTodos(props.todos);
    setTmpList(1)
  };

  const displayComplete = () => {
    const completeTodos = props.todos.filter((todo) => {
      return todo.complete === true;
    });
    setTmpTodos(completeTodos);
    setTmpList(2)
  };

  const displayUnComplete = () => {
    const unCompleteTodos = props.todos.filter((todo) => {
      return todo.complete !== true;
    });
    setTmpTodos(unCompleteTodos);
    setTmpList(3)
  };

  const taskComplete = (i) => {
    console.log(props.todos[0].todoDate.getTime());
    console.log(new Date().getTime());
    const tmpTarget = props.todos[i];
    if ( tmpTarget.complete === true ) {
      props.todos.splice(i, 1, {todo:tmpTarget.todo,todoDate:tmpTarget.todoDate,complete: false,number:tmpTarget.number});
    }
    else {
      props.todos.splice(i, 1, {todo:tmpTarget.todo,todoDate:tmpTarget.todoDate,complete: true,number:tmpTarget.number});
    };
    setTmpTodos(props.todos);
    switch(tmpList){
      case 1:
        break;
      case 2:
        const completeTodos = props.todos.filter((todo) => {
          return todo.complete === true;
        });
        setTmpTodos(completeTodos);
        break;
      case 3:
        const unCompleteTodos = props.todos.filter((todo) => {
          return todo.complete !== true;
        });
        setTmpTodos(unCompleteTodos);
        break;
      default:
        break;
    }


  };
  return (
    <>
      <div className="list__filter">
        <span className={tmpList === 1? "target":""}　onClick={displayAll}>全て</span>
        <span className={tmpList === 2? "target":""} onClick={displayComplete}>完了</span>
        <span className={tmpList === 3? "target":""} onClick={displayUnComplete}>未完了</span>
      </div>
      <ul>
        {tmpTodos.map((todo,index) => {
          return (
            <li key={index} className={todo.todoDate.getTime() + 360000 < new Date().getTime() ? "deadline list__card":"list__card"}>
              <div className="list__closedIcon" onClick={() => deleteTodo(todo.number)}>x</div>
              <div className="date">{todo.todoDate.getMonth()+1}/{todo.todoDate.getDate()}</div>
              <div className="lead">{todo.todo}</div>
              <button className={todo.complete === true?"complete":"uncomplete"} onClick={() => taskComplete(todo.number)}>●</button>
            </li>
          );
        })}
      </ul>
    </>
  )
}
