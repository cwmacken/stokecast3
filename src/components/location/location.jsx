import React from 'react';
import { Button, Grid, Row, Col , Image } from 'react-bootstrap';
import { connect, getState } from 'react-redux'
import Navbarcomp from '../navbar/navbar.jsx'

class Location extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "Los Angeles",
      swellModel: "http://cdip.ucsd.edu/recent/model_images/socal_now.png",
      windModel: "http://www.sccoos.org/data/coamps/analyses/searange/inhr00.png"
    };

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div>
        <Navbarcomp />
        <Grid>
          <Row>
            <Col xs={12}>
              <h1 className="text-center">{this.state.title}</h1>
            </Col>
          </Row >
          <Row>
            <Col xs={12}>
              <Image src={this.state.swellModel} responsive />
            </Col>
          </Row >
          <Row>
            <Col xs={12}>
              <Image src={this.state.windModel} responsive />
            </Col>
          </Row >
        </Grid>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    number: state.sampleOne.num,
    name: state.sampleTwo.name,
    auth: state.auth,
    endpoint: state.endpoint
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onButtonClick: (e) => {
      dispatch(sampleOne())
    }
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Location)

export default App
