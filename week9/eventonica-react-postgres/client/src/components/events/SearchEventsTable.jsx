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

    this.onSave = this.onSave.bind(this);
  }

  onSave(e) {
    e.preventDefault();
    const index = e.target.parentNode.parentNode.getAttribute('id');

    this.props.onSaveEvent(index);
  };

  render() {
    const searchResults = this.props.searchResults;

    if (searchResults.length > 0) {
      return (
        <Row className="mt-5">
          <Col sm={{ size: 10, offset: 1 }} >
            <Card>
              <CardBody>
                <CardTitle>Search Results</CardTitle>
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
                    {searchResults.map(({ title, start_time, venue_name, venue_address }, index) => (
                      <tr key={index} id={index}>
                        <td>{index + 1}</td>
                        <td>{title}</td>
                        <td>{start_time}</td>
                        <td>{venue_name}</td>
                        <td>{venue_address}</td>
                        <td>
                          <Button
                            size="sm"
                            color="success"
                            onClick={this.onSave}>Add</Button>
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

export default SearchEventsTable;