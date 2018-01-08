import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
//styles
import CSSModules from 'react-css-modules';
import styles from './style.scss';
//components
import SearchPanel from './search/SearchPanel.js';
import CurrencyFilterPanel from './filters/CurrencyFilterPanel.js';
import DateFilterPanel from './filters/DateFilterPanel.js';
import FilterDropdown from './dropdowns/FilterDropdown.js';
import SortDropdown from './dropdowns/SortDropdown.js';

class ControlPanel extends PureComponent {
    static propTypes = {
        setFilteringType: PropTypes.func.isRequired,
        setSortingType: PropTypes.func.isRequired,
        setSearchingType: PropTypes.func.isRequired,
        setFilteringOptions: PropTypes.func.isRequired,
        sortingType: PropTypes.string.isRequired,
        filteringType: PropTypes.string.isRequired,
        searchingType: PropTypes.string.isRequired,
        searchingValue: PropTypes.string.isRequired,
        filteringOptions: PropTypes.object.isRequired,
        cursor: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div styleName = "control-panel">
                <div>
                    <SearchPanel submitSearchingType={(value) => { console.log(value) } }/>
                    <FilterDropdown submitFilteringType={(value) => {console.log(value)}}/>
                    <SortDropdown submitSortingType={(value) => {console.log(value)}}/>
                </div>
                <div>
                    <CurrencyFilterPanel submitCurrency={(value) => {console.log(value)}}/>
                    <DateFilterPanel submitDate={(value) => {console.log(value)}}/>
                </div>
            </div>
        )
    }

}

export default CSSModules(ControlPanel, styles);