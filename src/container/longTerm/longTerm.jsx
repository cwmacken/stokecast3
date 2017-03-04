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
// require("./location.less")
// http://recharts.org/#/en-US/
import {getSwellData} from '../../redux/actions'

const swellModelTitle = (
    <h3>Swell Map</h3>
);

const tideTitle = (
    <h3>Tide Map</h3>
);

const windModelTitle = (
    <h3>Wind Map</h3>
);

class Longterm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "Los Angeles",
            swellModel: "http://cdip.ucsd.edu/recent/model_images/socal_now.png",
            windModel: "http://www.sccoos.org/data/coamps/analyses/searange/inhr00.png",
            tideModel: "/tidedata/sm_tide.png"
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

                    var msg = dayCheck + " AM Swell: " + displayHeight + " ft"

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

                    var msg = dayCheck + " PM Swell: " + displayHeight + " ft"

                    return (
                        <h3 key={i}>{msg}</h3>
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
                        <Col xs={12} md={6} className="text-center">
                            {this.displaySwellData()}
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
