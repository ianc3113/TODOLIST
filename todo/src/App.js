import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [],
      newToDo: {
        text: ""
      },
      toEdit: {
        isEditMode: false,
        id: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.removeToDo = this.removeToDo.bind(this);
    this.toEdit = this.toEdit.bind(this);
    this.closeEditTodo = this.closeEditTodo.bind(this);
  }

  handleChange(e) {
    e.preventDefault();

    this.setState({
      newToDo: {
        text: e.target.value
      }
    });
  }

  addTodo(e) {
    e.preventDefault();

    this.setState(prevState => {
      return {
        lists: prevState.lists.concat({
          id: prevState.lists.length + 1,
          text: prevState.newToDo.text,
        }) //prevstate for latest state
      };
    });
    console.log(this.state);
  }

  removeToDo(id) {

    function filterOutTODO(list) {
      return list.id !== id;
    }

    this.setState({
      lists: this.state.lists.filter(filterOutTODO)
    });
  }
  
  editToDo() {}
  markToDo() {}


  saveEditedTodo() {}
  closeEditTodo() {
    this.setState({
      toEdit: {
        isEditMode: false,
        id: ''
      }
    })
  }

  toEdit(id) {
    this.setState({
      toEdit: {
        isEditMode: true,
        id
      }
    })
  }

  render() {
    function toEditFields(save, close, textConfig) {
      return (
        <span>
          <input 
            type="text" 
            value={textConfig.value} 
            onChange={textConfig.onChange} 
          />
          <button onClick={save}>Save</button>
          <button onClick={close}>Close</button>
        </span>
      );
    }

    return (
      <div>
        <h1>Todo</h1>
        <input
          onChange={this.handleChange}
          type="text"
          placeholder="Make Coffee"
        />
        <button onClick={this.addTodo}>Add new ToDo</button>

        <ul>
          {this.state.lists.map((todo, index) => (
            <li key={index}>
              {
                this.state.toEdit.id === todo.id 
                ?
                toEditFields(this.saveEditTodo, this.closeEditTodo, {
                  value: todo.text,
                  onChange: () => alert("Edited text...")
                })
                :
                <span>
                    <span style={{ marginRight: 20 }}>{todo.text}</span>
                    <button onClick={() => this.toEdit(todo.id)}>Edit</button>
                    <button onClick={() => this.removeToDo(todo.id)}>Delete</button>
                  </span>
              }
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
