import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
//styles
import CSSModules from 'react-css-modules';
import styles from './style.scss';

const searchTypes = [
    {type: '', label: 'None'},
    {type: 'name', label: 'Name'},
    {type: 'modified', label: 'Date'},
    {type: 'value', label: 'Currency'},
    {type: 'language', label: 'Language'}
];

class SearchDropdown extends PureComponent {

    static propTypes = {
        submitSearchingType: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            selected:''
        }
        this.selectSearchingType = this.selectSearchingType.bind(this);
    }

    selectSearchingType(e){
        this.setState({
            selected:e.target.value
        });
        this.props.submitSearchingType(e.target.value)
    }

    render() {
        const {
            selected
        } = this.state;
        return (
            <div>
                <label>Search by: </label>
                <select onChange={(e) => {this.selectSearchingType(e)}} value={selected}>
                    {
                        searchTypes.map(option => (
                                <option
                                    key={option.type + option.label}
                                    value={option.type}
                                >{option.label}</option>
                            )
                        )
                    }
                </select>
            </div>
        )
    }

}

export default CSSModules(SearchDropdown, styles);