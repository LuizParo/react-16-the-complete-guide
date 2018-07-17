import React, { Component } from 'react';
import { parse } from 'query-string';

class Course extends Component {

    render () {
        const { title } = parse(this.props.location.search);

        return (
            <div>
                <h1>{title}</h1>
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default Course;