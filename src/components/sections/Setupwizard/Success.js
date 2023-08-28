import React, { Component } from 'react';
import { Grid, Header, Segment, Form, Button } from 'semantic-ui-react';

class PersonalDetails extends Component {
  saveAndContinue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  }

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  }

  render() {
    const { values } = this.props;

    return (
      <Grid.Column style={{ maxWidth: 450 }}>
        

        <h1>Your data has been added Successfully</h1>
      </Grid.Column>
    )
  }
}

export default PersonalDetails;