'use strict';

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
//styles
import CSSModules from 'react-css-modules';
import styles from './style.scss';

class PersonBlock extends PureComponent {
    static propTypes = {
        person: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {
            person
        } = this.props;
        return (
            <div styleName = "person-block">
                <div>
                    <label>Person name: </label>
                    <label>{person.name}</label>
                </div>
                <div>
                    <label>Currency: </label>
                    <label>{`${person.value} ${person.currency}`}</label>
                </div>
                <div>
                    <label>Updated: </label>
                    <label>{`${person.modified}`}</label>
                </div>
                <div>
                    <label>Age: </label>
                    <label>{`${person.age}`}</label>
                </div>
                <div>
                    <label>City: </label>
                    <label>{`${person.city}`}</label>
                </div>
                <div>
                    <label>Language: </label>
                    <label>{`${person.language}`}</label>
                </div>
            </div>
        );
    }
}

export default CSSModules(PersonBlock, styles);