import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col
} from 'reactstrap';

import AppNavbar from '../shared/AppNavbar.jsx';
import Message from '../shared/Message.jsx';
import SearchEventsTable from '../events/SearchEventsTable.jsx';

class MatchUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: this.props.match.params.userid,
      username: '',
      message: '',
      errMessage: '',
      cardTitle: 'Available Events',
      searchResults: [],
      buttonName: `Match`,
      btnDisabled: false,
      noEventMessage: false
    }

    this.doButtonAction = this.doButtonAction.bind(this);
    this.getAllEvent = this.getAllEvent.bind(this);
  }

  componentDidMount() {
    this.getAllEvent();
  }

  getAllEvent() {
    this.setState({
      message: '',
      errMessage: '',
      searchResults: [],
    });

    axios
      .get(`http://localhost:5000/api/eventonica/users/${this.state.userid}`)
      .then(user => {
        this.setState({ username: user.data.username });

        axios
          .get(`http://localhost:5000/api/eventonica/events`)
          .then(res => {
            const results = [res];

            if (results[0].data.message) {
              this.setState({
                errMessage: results[0].data.message
              });
            } else {

              axios
                .get(`http://localhost:5000/api/eventonica/users/${this.state.userid}/events`)
                .then(res2 => {
                  const results2 = [res2];

                  const result = results[0].data.filter(function (item) {
                    for (let i = 0; i < results2[0].data.length; i++) {
                      if (results2[0].data[i].id === item.id) {
                        return false;
                      }
                    }
                    return true;
                  })

                  if (result.length > 0) {
                    this.setState({
                      searchResults: result
                    });
                  } else {
                    this.setState({
                      noEventMessage: true
                    });
                  }
                })
                .catch(err => {
                  throw err;
                });

            }
          })
          .catch(err => {
            throw err;
          });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          errMessage: err.detail
        });
      });
  }

  doButtonAction(param) {
    this.setState({
      message: '',
      errMessage: ''
    });

    const data = { title: this.state.searchResults[param.index].title };

    axios
      .post(`http://localhost:5000/api/eventonica/users/${this.state.userid}/events`, data)
      .then(res => {

        if (res.data.msg) {
          this.setState({
            errMessage: res.data.msg
          });
        } else {
          this.setState(prevState => ({
            message: `Success`,
            searchResults: prevState.searchResults.filter(event => event.id !== parseInt(param.id))
          }));
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
        <Row>
          <Col className="mb-5" sm={{ size: 10, offset: 1 }}>
            <Card>
              <CardBody>
                <CardTitle><Link to="/user">Back to user list</Link></CardTitle>
                <CardText>Username: {this.state.username}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <SearchEventsTable
          cardTitle={this.state.cardTitle}
          searchResults={this.state.searchResults}
          buttonName={this.state.buttonName}
          noEventMessage={this.state.noEventMessage}
          doButtonAction={this.doButtonAction}
          btnDisabled={this.state.btnDisabled} />
      </div>
    );
  }
}

export default MatchUser;