import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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

class ViewUsersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalTitle: ''
    };

    this.onDelete = this.onDelete.bind(this);
    this.onMatch = this.onMatch.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onViewEvents = this.onViewEvents.bind(this);
  }

  onDelete(e) {
    const id = e.target.parentNode.parentNode.getAttribute('id');
    this.props.onDeleteUser(id);
  }

  onMatch(e) {
    const id = e.target.parentNode.parentNode.getAttribute('id');
    this.props.history.push(`/match/${id}`);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  onViewEvents(e) {
    if (!this.state.modal) {
      const id = e.target.parentNode.parentNode.getAttribute('id');
      const index = e.target.parentNode.parentNode.getAttribute('label');
      const username = this.props.users[index].username;
      this.setState({ modalTitle: username });
      this.props.getSingleUserEvents(id);
      this.toggle();
    } else {
      this.setState({ modalTitle: '' });
      this.toggle();
    }
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    const users = this.props.users;

    if (users.length > 0) {
      return (
        <Row className="mt-5">
          <Col sm={{ size: 10, offset: 1 }} >
            <Card>
              <CardBody>
                <CardTitle>Event List</CardTitle>
                <Table striped>
                  <thead>
                    <tr>
                      <th style={{ width: '10%' }}>#</th>
                      <th style={{ width: '50%' }}>Username</th>
                      <th style={{ width: '10%' }}></th>
                      <th style={{ width: '15%' }}></th>
                      <th style={{ width: '15%' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(({ id, username }, index) => (
                      <tr key={index} label={index} id={id}>
                        <td>{index + 1}</td>
                        <td>{username}</td>
                        <td>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={this.onDelete}>Delete</Button>
                        </td>
                        <td>
                          <Button
                            size="sm"
                            color="info"
                            onClick={this.onViewEvents}>View Events</Button>
                        </td>
                        <td>
                          <Button
                            size="sm"
                            color="primary"
                            onClick={this.onMatch}>Match Event</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                  <ModalHeader toggle={this.toggle}>{this.state.modalTitle}'s Events</ModalHeader>
                  <ModalBody>
                    <Table striped>
                      <thead>
                        <tr>
                          <th style={{ width: '5%' }}>#</th>
                          <th style={{ width: '30%' }}>Title</th>
                          <th style={{ width: '10%' }}>Date</th>
                          <th style={{ width: '15%' }}>Venue name</th>
                          <th style={{ width: '40%' }}>Venue address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.props.userEvents.map(({ id, title, start_time, venue_name, venue_address }, index) => (
                            <tr key={index} label={index} id={id}>
                              <td>{index + 1}</td>
                              <td>{title}</td>
                              <td>{start_time}</td>
                              <td>{venue_name}</td>
                              <td>{venue_address}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </Table>
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
      return (<div></div>);
    }
  }
}

export default withRouter(ViewUsersTable);