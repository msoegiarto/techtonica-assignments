import React, { Component } from 'react';
import axios from 'axios';

import AppNavbar from './shared/AppNavbar.jsx';
import Message from './shared/Message.jsx';
import ViewEventsTable from './events/ViewEventsTable.jsx';

class ViewEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      errMessage: '',
      events: []
    }

    this.onDeleteEvent = this.onDeleteEvent.bind(this);
  }

  onDeleteEvent(id, eventsParam) {
    this.setState({
      message: '',
      errMessage: ''
    });

    axios
      .delete(`/api/eventonica/events/${id}`)
      .then(res => {
        if (res.data.msg) {
          this.setState({
            errMessage: res.data.msg
          });
        } else {
          this.setState({
            message: `Event ${res.data.title} has been deleted`,
            events: eventsParam.filter(event => event.id !== res.data.id)
          });
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({
          errMessage: err.detail
        });
      });
  }

  render() {
    return (
      <div>
        <AppNavbar />
        <Message message={this.state.message} errMessage={this.state.errMessage} />
        <ViewEventsTable onDeleteEvent={this.onDeleteEvent} events={this.state.events} />
      </div>
    );
  }
}

export default ViewEvents;