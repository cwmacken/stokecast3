import React from 'react';
import {Link} from 'react-router'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {
    Row,
    Button,
    Col
} from 'react-bootstrap';

export default class Header extends React.Component {

    render() {
        return (
            <Row>
                <Col xsOffset={0} xs={12} smOffset={3} sm={3} mdOffset={3} md={3} lgOffset={4} lg={2} className="text-center bottomPadding10">
                    <Link to="/">
                        <Button bsStyle={this.props.shortTerm ? 'primary' : 'default'} bsSize="large">Current Conditions</Button>
                    </Link>
                </Col>
                <Col xs={12} sm={3} md={3} lg={2} className="text-center bottomPadding10">
                    <Link to="/longterm">
                        <Button bsStyle={this.props.shortTerm ? 'default' : 'primary'} bsSize="large">Forecast</Button>
                    </Link>
                </Col>
            </Row>
        );
    }
}
