import React, { Component } from 'react'
import uuid from "uuid";
import  Css from './todo.css'

class Todo extends Component {
  constructor(props) {
    super(props);

    this.input = React.createRef();
    this.state = {
      list: [],
      isEditable: null,
    };
  }

  addTask = () => {
    const Items = {
      id: uuid.v4(),
      value: this.input.current.value,
    };

    if (localStorage.getItem("list") == null) {
      const list = [];
      list.push(Items);
      localStorage.setItem("list", JSON.stringify(list));
    } else {
      const list = JSON.parse(localStorage.getItem("list"));
      list.push(Items);
      localStorage.setItem("list", JSON.stringify(list));
    }
    this.setState({
      list: JSON.parse(localStorage.getItem("list")),
    });
  };

  componentDidMount() {
    const list = window.localStorage.getItem("list");
    const parsedList = JSON.parse(list);
    if (list == null) {
      return false;
    } else {
      this.setState({
        list: parsedList,
      });
      console.log(this.state.list);
    }
  }

  deleteItem = (event) => {
    let index = event.target.getAttribute("data-key");
    let listValue = JSON.parse(localStorage.getItem("list"));
    listValue.splice(index, 1);
    this.setState({ list: listValue });
    localStorage.setItem("list", JSON.stringify(listValue));
  };

  submitForm = (e) => {
    e.preventDefault();
    const inputValue = e.target.input.value;
    this.setState({ list: [...this.state.list, inputValue] }, () => {
      window.localStorage.setItem("list", JSON.stringify(this.state.list));
    });
  };

  edit = (index) => {
    this.setState({ isEditable: index });
  };

  updateForm = (e, id) => {
    e.preventDefault();
    const Items = {
      id: id,
      value: e.target.input.value,
    };

    const { list, isEditable } = this.state;
    console.log(isEditable);
    const newData = [...list]; //cloning state data
    newData[isEditable] = Items;
    this.setState({ list: newData }, () => {
      window.localStorage.setItem("list", JSON.stringify(this.state.list));
    });
    this.setState({ isEditable: null });
  };

  render() {
    const { list, isEditable } = this.state;

    return (
      <div className="main-container" >
        <h1>TodoList App</h1>
        <hr />
        <div className="container">
          <input type="text" placeholder="AddTask..." ref={this.input}></input>
          <button onClick={this.addTask} className="button">
            Add
          </button>
          <ol>
            {this.state.list.map((item, index) => {
              return (
                <li className="li-con" key={item.id}>
                  {" "}
                  {item.value}
                  <button
                    className="button"
                    type="button"
                    value="delete"
                    data-key={index}
                    onClick={this.deleteItem}
                  >
                    Delete
                  </button>
                  <button
                    className="button"
                    type="button"
                    onClick={() => this.edit(index, item.id)}
                  >
                    Edit
                  </button>
                  <div
                    style={{
                      display: `${isEditable !== index ? "none" : "block"}`,
                    }}
                  >
                    <form onSubmit={(e) => this.updateForm(e, item.id)}>
                      <input type="text" name="input" />
                      <button className="button" type="submit">
                        update
                      </button>
                    </form>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default Todo;