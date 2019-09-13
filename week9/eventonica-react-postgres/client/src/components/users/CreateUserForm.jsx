import React, { Component } from 'react';
import {
  Card, CardBody, CardTitle,
  Row, Col,
  Form, FormGroup, Label, Input,
  Button
} from 'reactstrap';

class CreateUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSaveUser(this.state.username);
  };

  render() {
    return (
      <Row>
        <Col className="mt-5" sm={{ size: 6, offset: 1 }}>
          <Card>
            <CardBody>
              <CardTitle>Create Users</CardTitle>
              <Form onSubmit={this.onSubmit}>
                <FormGroup row>
                  <Label sm={3} for="inputUsername">Username</Label>
                  <Col sm={9}>
                    <Input type="text" name="username" id="inputUsername" placeholder="type your username"
                      onChange={this.onChange}
                      value={this.state.username} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={{ size: 2, offset: 10 }}>
                    <Button color="primary">Submit</Button>
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

export default CreateUserForm;