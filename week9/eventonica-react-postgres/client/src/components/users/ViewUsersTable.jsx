import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Button
} from 'reactstrap';

class ViewUsersTable extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
    this.onMatch = this.onMatch.bind(this);
  }

  onDelete(e) {
    const id = e.target.parentNode.parentNode.getAttribute('id');
    this.props.onDeleteUser(id);
  }

  onMatch() { }

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
                      <th style={{ width: '65%' }}>Username</th>
                      <th style={{ width: '10%' }}></th>
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
                            color="primary"
                            onClick={this.onMatch}>Match Event</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
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

export default ViewUsersTable;