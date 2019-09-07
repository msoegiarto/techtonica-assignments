import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

class SearchEventsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: ''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSearchEvents(this.state.keywords);
  };

  render() {
    return (
      <Row>
        <Col className="mt-5 mb-5" sm={{ size: 10, offset: 1 }}>
          <Card>
            <CardBody>
              <CardTitle>Search Events</CardTitle>
              <Form onSubmit={this.onSubmit}>
                <FormGroup row>
                  <Label sm={2} for="inputKeywords">Keywords</Label>
                  <Col sm={8}>
                    <Input type="text" name="keywords" id="inputKeywords" placeholder="type keyword"
                      onChange={this.onChange}
                      value={this.state.keywords} />
                  </Col>
                  <Col sm={2}>
                    <Button color="primary">Search</Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default SearchEventsForm;