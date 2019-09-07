import React, { Component } from 'react';
import axios from 'axios';
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

class ViewEventsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      modal: false,
      modalTitle: '',
      attendees: []
    }

    this.toggle = this.toggle.bind(this);
    this.openModal = this.openModal.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  openModal(e) {
    if (!this.state.modal) {
      const id = e.target.parentNode.parentNode.getAttribute('id');
      const arrayIndex = e.target.parentNode.parentNode.getAttribute('label');
      const title = this.state.events[arrayIndex].title;

      axios
        .get(`http://localhost:5000/api/eventonica/events/${id}/users`)
        .then(res => {
          this.setState({
            modalTitle: title,
            attendees: res.data.length > 0 ? res.data : [{ username: `No one has signed up for this event` }]
          });

          this.toggle();
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      this.toggle();
    }
  }

  onDelete(e) {
    const index = e.target.parentNode.parentNode.getAttribute('id');
    this.props.onDeleteEvent(index, this.state.events);
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/eventonica/events`)
      .then(res => {
        this.setState({
          events: res.data
        })
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const events = this.props.events.length > 0 ? this.props.events : this.state.events;

    if (events.length > 0) {
      return (
        <Row className="mt-5">
          <Col sm={{ size: 10, offset: 1 }} >
            <Card>
              <CardBody>
                <CardTitle>Event List</CardTitle>
                <Table striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Venue Name</th>
                      <th>Address</th>
                      <th></th>
                      <th style={{ width: '15%' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map(({ id, title, start_time, venue_name, venue_address }, index) => (
                      <tr key={index} label={index} id={id}>
                        <td>{index + 1}</td>
                        <td>{title}</td>
                        <td>{start_time}</td>
                        <td>{venue_name}</td>
                        <td>{venue_address}</td>
                        <td>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={this.onDelete}>Delete</Button>
                        </td>
                        <td>
                          <Button
                            size="sm"
                            color="primary"
                            onClick={this.openModal}>Show Attendees</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                  <ModalHeader toggle={this.toggle}>Attendees of {this.state.modalTitle}</ModalHeader>
                  <ModalBody>
                    <ul>
                      {
                        this.state.attendees.map((user, index) => (
                          <li key={index}>{user.username}</li>
                        ))
                      }
                    </ul>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
                </Modal>
              </CardBody>
            </Card>
          </Col>
        </Row>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default ViewEventsTable;