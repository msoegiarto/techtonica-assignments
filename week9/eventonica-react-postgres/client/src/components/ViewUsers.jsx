import React, { Component } from 'react';
import axios from 'axios';

import AppNavbar from './shared/AppNavbar.jsx';
import Message from './shared/Message.jsx';
import CreateUserForm from './users/CreateUserForm.jsx';
import ViewUsersTable from './users/ViewUsersTable.jsx';

class ViewUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      errMessage: '',
      users: [],
      userEvents: []
    }

    this.onSaveUser = this.onSaveUser.bind(this);
    this.onDeleteUser = this.onDeleteUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.getSingleUserEvents = this.getSingleUserEvents.bind(this);
  }

  onDeleteUser(id) {
    this.setState({
      message: '',
      errMessage: ''
    });

    axios
      .delete(`http://localhost:5000/api/eventonica/users/${id}`)
      .then(res => {
        if (res.data.msg) {
          this.setState({
            errMessage: res.data.msg
          });
        }
        this.setState({
          message: `User ${res.data.username} has been deleted`,
          users: this.state.users.filter(user => user.id !== res.data.id)
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          errMessage: err.detail
        });
      });
  }

  onSaveUser(username) {
    this.setState({
      message: '',
      errMessage: ''
    });

    axios
      .post(`http://localhost:5000/api/eventonica/users`, { username: username })
      .then(res => {

        if (res.data.msg) {
          this.setState({
            errMessage: res.data.msg
          })
        } else {
          this.setState(prevState => ({
            message: `${res.data.username} has been saved`,
            users: [...prevState.users, res.data]
          }));
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  getAllUsers() {
    axios
      .get(`http://localhost:5000/api/eventonica/users`)
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  getSingleUserEvents(id) {
    axios
      .get(`http://localhost:5000/api/eventonica/users/${id}/events`)
      .then(res => {
        this.setState({
          userEvents: res.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <AppNavbar />
        <Message message={this.state.message} errMessage={this.state.errMessage} />
        <CreateUserForm onSaveUser={this.onSaveUser} />
        <ViewUsersTable onDeleteUser={this.onDeleteUser} users={this.state.users} getAllUsers={this.getAllUsers} getSingleUserEvents={this.getSingleUserEvents} userEvents={this.state.userEvents} />
      </div>
    );
  }
}

export default ViewUsers;