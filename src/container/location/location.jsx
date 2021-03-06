import React from 'react';
import {
    Button,
    Grid,
    Row,
    Col,
    Image,
    Panel
} from 'react-bootstrap';
import {connect, getState} from 'react-redux'
import Navbarcomp from '../../components/navbar/navbar.jsx'
import Header from '../../components/header/header.jsx'
import Timeframe from '../../components/timeFrame/timeFrame.jsx'
import { Link } from 'react-router'
require("./location.less")

const swellModelTitle = (
    <h3>Swell Map</h3>
);

const tideTitle = (
    <h3>Tide Map</h3>
);

const windModelTitle = (
    <h3>Wind Map</h3>
);

class Location extends React.Component {

    constructor(props) {
        super(props);
        // Consider caching cdip and sccoos
        // need to credit everyone, links and such
        this.state = {
            title: "Los Angeles",
            swellModel: "http://cdip.ucsd.edu/recent/model_images/socal_now.png",
            windModel: "http://www.sccoos.org/data/coamps/analyses/searange/inhr00.png",
            tideModel: "/cacheddata/tidedata/sm_tide.png"
        };

    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div>
                <Navbarcomp/>
                <Grid fluid>
                    <Header title={this.state.title} />
                    <Timeframe shortTerm={true}/>
                    <Row>
                        <Col xs={12} md={6}>
                            <Panel header={swellModelTitle}>
                                <Image className="center-block bottomPadding10" src={this.state.swellModel} alt="Error Loading Swell Model" responsive/>
                            </Panel>
                        </Col>
                        <Col xs={12} md={6}>
                            <Panel header={tideTitle}>
                                <Image className="center-block bottomPadding10" src={this.state.tideModel} alt="Error Loading Tide Model" responsive/>
                            </Panel>
                        </Col>
                        <Col xs={12} md={6}>
                            <Panel header={windModelTitle}>
                                <Image className="center-block" src={this.state.windModel} alt="Error Loading Wind Model" responsive/>
                            </Panel>
                        </Col>
                    </Row >
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {number: state.sampleOne.num, name: state.sampleTwo.name, auth: state.auth, endpoint: state.endpoint}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onButtonClick: (e) => {
            dispatch(sampleOne())
        }
    }
}

const App = connect(mapStateToProps, mapDispatchToProps)(Location)

export default App
