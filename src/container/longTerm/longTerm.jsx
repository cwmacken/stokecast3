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
        const swellData = this.props.swell.map((dataPoint, i) => {

            var height = dataPoint.hst / 0.3048

            height = Math.floor(height)

            return (
                <h3 key={i}>{dataPoint.date}
                    - {dataPoint.hour}
                    - {height}ft</h3>
            )
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
