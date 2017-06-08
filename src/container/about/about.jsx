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
require("./about.less")


class About extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Navbarcomp/>
                <Grid fluid>
                    <Row>
                        <Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2} lgOffset={2} lg={8}>
                            <p>
                                Stokecast is an open source passion project by myself, Conor Macken.
                                I use Stokecast as a way to learn more about web development and experiment with new technologies.
                                This project is currently in alpha and is based on my boilerplate (
                                <a target="_blank" href="https://github.com/cwmacken/carne-asada">Carne Asada Boilerplate</a>)
                                , the github repo for Stokecast can be found here
                                <a target="_blank" href="https://github.com/cwmacken/stokecast3"> https://github.com/cwmacken/stokecast3</a>.
                            </p>
                            <p>
                                I plan on building out more regions in the next few months.
                            </p>
                            <p>
                                If you wish to contribute  or have any suggestions please don’t hesitate to reach out, my email is
                                <a href="mailto:hello@conormacken.com?Subject=Stokecast" target="_top"> hello@conormacken.com. </a>
                                If you want to see more of my work or want to hire me to build cool things for you  please check out
                                <a target="_blank" href="https://conormacken.com/"> conormacken.com</a>.
                            </p>
                            <p>
                                Happy coding and see you in the water.
                            </p>
                            <p>
                                - Conor
                            </p>
                            <p>
                                last updated: 6/8/17
                            </p>
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

const App = connect(mapStateToProps, mapDispatchToProps)(About)

export default App
