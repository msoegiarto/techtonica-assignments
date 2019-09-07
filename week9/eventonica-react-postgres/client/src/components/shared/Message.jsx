import React, { Component } from 'react';
import { Row, Col, Alert } from 'reactstrap';

class Message extends Component {
  // scroll to message
  componentDidUpdate() {
    if (this.props.message || this.props.errMessage) {
      const element = document.getElementById("alert");
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  render() {
    if (this.props.message) {
      return (
        <Row>
          <Col sm={{ size: 10, offset: 1 }}>
            <Alert color="success" id="alert">
              {this.props.message}
            </Alert>
          </Col>
        </Row>
      );
    } else if (this.props.errMessage) {
      return (
        <Row>
          <Col sm={{ size: 10, offset: 1 }}>
            <Alert color="danger" id="alert">
              {this.props.errMessage}
            </Alert>
          </Col>
        </Row>
      );
    } else {
      return (<div></div>);
    }
  }
}

export default Message;