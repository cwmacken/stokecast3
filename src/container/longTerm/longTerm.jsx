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
import {Link} from 'react-router'
require("./longterm.less")

// TODO: consider http://recharts.org/#/en-US/
import {getSwellData} from '../../redux/actions'

const swellTitle = (
    <h3>Los Angeles Surf Height</h3>
);

const noaaTitle = (
    <h3>NOAA 7-Day Model</h3>
);

class Longterm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "Los Angeles",
            titleSurfHeight: "Los Angeles Surf Height",
            swellModel: "http://cdip.ucsd.edu/recent/model_images/socal_now.png",
            windModel: "http://www.sccoos.org/data/coamps/analyses/searange/inhr00.png",
            tideModel: "/tidedata/sm_tide.png",
            noaaLongTerm: "http://cdip.ucsd.edu/recent/forecast/buoy_ww3.gd?stn=071&stream=p1&pub=public&tz=PDT&units=english"
        };

        this.props.getSwellData()

    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    displaySwellData() {

        var dayCheck = null

        var heightArrayAM = []

        var heightArrayPM = []

        const swellData = this.props.swell.map((dataPoint, i) => {

            var height = dataPoint.hst / 0.3048

            if (dayCheck === null) {

                dayCheck = dataPoint.day

            } else if (dayCheck === dataPoint.day) {

                if (dataPoint.hour === '6AM' || dataPoint.hour === '7AM' || dataPoint.hour === '8AM' || dataPoint.hour === '9AM' || dataPoint.hour === '10AM' || dataPoint.hour === '11AM') {

                    heightArrayAM.push(height)
                }

                if (dataPoint.hour === '12PM' || dataPoint.hour === '1PM' || dataPoint.hour === '2PM' || dataPoint.hour === '3PM' || dataPoint.hour === '4PM' || dataPoint.hour === '5PM') {

                    heightArrayPM.push(height)
                }

                if (dataPoint.hour === '12PM') {

                    var htSum = 0

                    for (var k = 0; k < heightArrayAM.length; k++) {
                        htSum = htSum + heightArrayAM[k]
                    }

                    var avg = htSum / heightArrayAM.length

                    var displayHeight = Math.floor(avg)

                    var msg = dayCheck + " AM : " + displayHeight + " ft"

                    return (
                        <h3 key={i}>{msg}</h3>
                    )

                }

                if (dataPoint.hour === '6PM') {

                    var htSum = 0

                    for (var k = 0; k < heightArrayPM.length; k++) {
                        htSum = htSum + heightArrayPM[k]
                    }

                    var avg = htSum / heightArrayPM.length

                    var displayHeight = Math.floor(avg)

                    var msg = dayCheck + " PM : " + displayHeight + " ft"

                    return (
                        <h3 className="pm" key={i}>{msg}</h3>
                    )

                }

            } else {

                heightArrayAM = []
                heightArrayPM = []

                dayCheck = null

            }

        });
        return swellData
    }

    render() {

        return (
            <div>
                <Navbarcomp/>
                <Grid fluid>
                    <Header title={this.state.title}/>
                    <Timeframe shortTerm={false}/>
                    <Row>
                        <Col xs={12} sm={6} md={4} lg={3}className="text-center">
                            <Panel header={swellTitle}>
                                {this.displaySwellData()}
                            </Panel>
                        </Col>
                        <Col xs={12} sm={6} md={8} lg={9}className="text-center">
                            <Panel header={noaaTitle}>
                                <Image className="center-block bottomPadding10" src={this.state.noaaLongTerm} alt="Error Loading Tide Model" responsive/>
                            </Panel>
                        </Col>
                    </Row>

                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {swell: state.swell.data}
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSwellData: (e) => {
            dispatch(getSwellData(e))
        }
    }
}

const App = connect(mapStateToProps, mapDispatchToProps)(Longterm)

export default App
