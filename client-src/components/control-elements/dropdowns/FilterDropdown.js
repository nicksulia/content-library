import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
//styles
import CSSModules from 'react-css-modules';
import styles from './style.scss';

const filterTypes = [
    {type: '', label: 'None'},
    {type: 'range-date', label: 'Date'},
    {type: 'range-currency', label: 'Currency'}
];

class FilterDropdown extends PureComponent {

    static propTypes = {
        submitFilteringType: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            selected:''
        };
        this.selectFilteringType = this.selectFilteringType.bind(this);
    }

    selectFilteringType(e){
        this.setState({
            selected:e.target.value
        });
        this.props.submitFilteringType(e.target.value)
    }
    render() {
        const {
            selected
        } = this.state;
        return (
            <select onChange={(e) => {this.selectFilteringType(e)}} value={selected}>
                {
                    filterTypes.map(option => (
                            <option
                                key={option.type + option.label}
                                value={option.type}
                            >{option.label}</option>
                        )
                    )
                }
            </select>
        )
    }

}

export default CSSModules(FilterDropdown, styles);