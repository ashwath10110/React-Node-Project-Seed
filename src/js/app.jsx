var React = require('react');
var $ = require('jquery');

var TodoList = require('./components/todo-list.jsx');

var TodoApp = React.createClass({
  getInitialState: function() {
    return ({ data: [] });
  },
  loadTodosFromServer: function() {
    $.ajax({
      url: 'http://localhost:8080/api/todos',
      dataType: 'json',
      success: function(data) {
        this.setState({ data: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('localhost:8080/api/todos', status, err.toString());
      }.bind(this)
    });
  },
  handleTodoUpdate: function(todo) {
    $.ajax({
      url: 'http://localhost:8080/api/todos/' + todo._id,
      type: 'PUT',
      dataType: 'json',
      data: todo,
      success: function() {
        this.loadTodosFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        console.err('http://localhost:8080/api/todos' + todo._id, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadTodosFromServer();
  },
  render: function() {
    return (
      <div className="todoApp">
        <TodoList data={this.state.data} handleTodoUpdate={this.handleTodoUpdate}/>
      </div>
    );
  }
});

React.render(
  <TodoApp />, document.getElementById('content')
);
