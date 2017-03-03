import React from 'react';
var broke = require('../../assets/images/youBlewIt.jpg')
import {Link} from 'react-router'
import Navbarcomp from '../../components/navbar/navbar.jsx'

export default class Error extends React.Component {
    render() {
        return (
            <div>
                <Navbarcomp/>
                <h1>Route not found</h1>
                <h3>
                    <Link to="/">Back To Home</Link>
                </h3>
            </div>
        );
    }
}
