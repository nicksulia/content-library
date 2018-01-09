import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
//styles
import CSSModules from 'react-css-modules';
import styles from './style.scss';

const sortTypes = [
    {type: '', label: 'None'},
    {type: 'name', label: 'Name'},
    {type: 'modified', label: 'Date'},
    {type: 'age', label: 'Age'},
    {type: 'value', label: 'Currency'},
    {type: 'language', label: 'Language'}
];

class SortDropdown extends PureComponent {

    static propTypes = {
        submitSortingType: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            selected:''
        }
        this.selectSortingType = this.selectSortingType.bind(this);
    }

    selectSortingType(e){
        this.setState({
            selected:e.target.value
        });
        this.props.submitSortingType(e.target.value)
    }

    render() {
        const {
            selected
        } = this.state;
        return (
            <div>
                <label>Sort by: </label>
                <select onChange={(e) => {this.selectSortingType(e)}} value={selected}>
                    {
                        sortTypes.map(option => (
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

export default CSSModules(SortDropdown, styles);