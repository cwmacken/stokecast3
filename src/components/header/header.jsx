import React from 'react';
import {Link} from 'react-router'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {
    Row,
    Col
} from 'react-bootstrap';

export default class Header extends React.Component {
    render() {
        return (
            <Row>
                <Col xs={12}>
                    <h1 className="text-center mdTitle">{this.props.title}</h1>
                </Col>
            </Row >
        );
    }
}
