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
      cardTitle: 'Search Results',
      searchResults: [],
      buttonName: `Add`,
      btnDisabled: false
    };

    this.onSearchEvents = this.onSearchEvents.bind(this);
    this.doButtonAction = this.doButtonAction.bind(this);
    this.toggleBtnDisabled = this.toggleBtnDisabled.bind(this);
  };

  toggleBtnDisabled() {
    this.setState(prevState => ({
      btnDisabled: !prevState.btnDisabled
    }));
  }

  onSearchEvents(keywords) {
    this.setState({
      message: '',
      errMessage: '',
      searchResults: []
    });
    this.toggleBtnDisabled();

    const data = {
      params: { keywords: keywords }
    };

    axios
      .get(`/api/eventonica/events/search`, data)
      .then(res => {
        const results = [res];

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
        this.setState({
          errMessage: err.detail
        });
      }).finally(() => {
        this.toggleBtnDisabled();
      });
  }

  doButtonAction(param) {
    this.setState({
      message: '',
      errMessage: ''
    });
    this.toggleBtnDisabled();

    axios
      .post(`/api/eventonica/events/`, this.state.searchResults[param.index])
      .then(res => {
        console.log(res);
        if (res.data.msg) {
          this.setState({
            errMessage: res.data.msg
          });
        } else {
          this.setState({ message: `Event "${this.state.searchResults[param.index].title}" has been saved.` });
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({
          errMessage: err.detail
        });
      }).finally(() => {
        this.toggleBtnDisabled();
      });
  }



  render() {
    return (
      <div>
        <AppNavbar />
        <Message message={this.state.message} errMessage={this.state.errMessage} />
        <SearchEventsForm
          onSearchEvents={this.onSearchEvents} btnDisabled={this.state.btnDisabled} />
        <SearchEventsTable
          cardTitle={this.state.cardTitle}
          searchResults={this.state.searchResults}
          buttonName={this.state.buttonName}
          doButtonAction={this.doButtonAction}
          btnDisabled={this.state.btnDisabled} />
      </div>
    );
  }


}

export default SearchEvents;