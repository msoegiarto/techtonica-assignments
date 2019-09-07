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

class SearchEventsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      start_time: '',
      venue_name: '',
      venue_address: ''
    };

    this.onClickButton = this.onClickButton.bind(this);
  }

  onClickButton(e) {
    const id = e.target.parentNode.parentNode.getAttribute('id');
    const index = e.target.parentNode.parentNode.getAttribute('label');
    this.props.doButtonAction({ id, index });
  };

  render() {
    const searchResults = this.props.searchResults;

    if (searchResults.length > 0) {
      return (
        <Row>
          <Col sm={{ size: 10, offset: 1 }} >
            <Card>
              <CardBody>
                <CardTitle>Available Events</CardTitle>
                <Table striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Venue Name</th>
                      <th>Address</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map(({ id, title, start_time, venue_name, venue_address }, index) => (
                      <tr key={index} id={id} label={index}>
                        <td>{index + 1}</td>
                        <td>{title}</td>
                        <td>{start_time}</td>
                        <td>{venue_name}</td>
                        <td>{venue_address}</td>
                        <td>
                          <Button
                            size="sm"
                            color="success"
                            onClick={this.onClickButton} disabled={this.props.btnDisabled}>{this.props.buttonName}</Button>
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
    } else if (this.props.noEventMessage) {
      return (
        <Row>
          <Col sm={{ size: 10, offset: 1 }} >
            <Card>
              <CardBody>
                <CardTitle>No events available</CardTitle>
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

export default SearchEventsTable;