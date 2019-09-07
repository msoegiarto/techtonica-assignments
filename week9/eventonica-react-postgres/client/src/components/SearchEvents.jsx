import React, { Component } from 'react';
import axios from 'axios';
import AppNavbar from './shared/AppNavbar.jsx';
import Message from './shared/Message.jsx';
import SearchEventsForm from './events/SearchEventsForm.jsx';
import SearchEventsTable from './events/SearchEventsTable.jsx';

class SearchEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      errMessage: '',
      searchResults: []
    };

    this.onSearchEvents = this.onSearchEvents.bind(this);

    this.onSaveEvent = this.onSaveEvent.bind(this);
  };

  onSearchEvents(keywords) {
    this.setState({
      message: '',
      errMessage: '',
      searchResults: []
    });

    const data = {
      params: { keywords: keywords }
    };

    axios
      .get(`http://localhost:5000/api/eventonica/events/search`, data)
      .then(res => {
        const results = [res];
        console.log(results);
        if (results[0].data.message) {
          this.setState({
            errMessage: results[0].data.message
          });
        } else {
          this.setState({
            searchResults: results[0].data
          });
        }
        console.log('searchResults=', this.state.searchResults);

      })
      .catch(err => {
        console.error(err);
        console.log("Error in SearchEvents!");
      });
  }

  onSaveEvent(index) {
    this.setState({
      message: '',
      errMessage: ''
    });

    axios
      .post(`http://localhost:5000/api/eventonica/events/`, this.state.searchResults[index])
      .then(res => {
        console.log(res);
        if (res.data.msg) {
          this.setState({
            errMessage: res.data.msg
          });
        } else {
          this.setState({ message: `Event "${this.state.searchResults[index].title}" has been saved.` });
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
        <SearchEventsForm
          onSearchEvents={this.onSearchEvents} />
        <SearchEventsTable
          searchResults={this.state.searchResults}
          onSaveEvent={this.onSaveEvent} />
      </div>
    );
  }


}

export default SearchEvents;