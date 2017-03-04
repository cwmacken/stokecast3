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
                <Col xsOffset={1} xs={5} smOffset={3} sm={3} mdOffset={4} md={2} lgOffset={4} lg={2} className="text-center bottomPadding10">
                    <Link to="/">
                        <Button bsStyle={this.props.shortTerm ? 'primary' : 'default'} bsSize="large">Short Term Forcast</Button>
                    </Link>
                </Col>
                <Col xs={5} sm={3} md={2} lg={2} className="text-center bottomPadding10">
                    <Link to="/longterm">
                        <Button bsStyle={this.props.shortTerm ? 'default' : 'primary'} bsSize="large">Long Term Forcast</Button>
                    </Link>
                </Col>
            </Row>
        );
    }
}