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
        setCursor: PropTypes.func.isRequired,
        setSortingType: PropTypes.func.isRequired,
        setSearchingType: PropTypes.func.isRequired,
        setSearchingValue: PropTypes.func.isRequired,
        setFilteringOptions: PropTypes.func.isRequired,
        getData: PropTypes.func.isRequired,
        sortingType: PropTypes.string.isRequired,
        filteringType: PropTypes.string.isRequired,
        searchingType: PropTypes.string.isRequired,
        searchingValue: PropTypes.string.isRequired,
        filteringOptions: PropTypes.object.isRequired,
        cursor: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);

    this.getNewData = this.getNewData.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.sortingType !== this.props.sortingType) {
            this.props.setCursor(1);
            this.getNewData();
        }
        if(prevProps.filteringOptions.from !== this.props.filteringOptions.from ||
            prevProps.filteringOptions.to !== this.props.filteringOptions.to ||
            prevProps.filteringOptions.currency !== this.props.filteringOptions.currency) {
            this.props.setCursor(1);
            this.getNewData();
        }
        if(prevProps.filteringType !== '' && this.props.filteringType === '') {
            this.props.setCursor(1);
            this.getNewData();
        }
    }

    getNewData(){
        const {
            cursor,
            filteringOptions,
            searchingType,
            searchingValue,
            filteringType,
            sortingType,
            getData
        } = this.props;
        let sortBy = '',
            searchBy = {},
            filter = {type: ''};
        if (sortingType) {
            sortBy = sortingType;
        }
        if (filteringType) {
            filter.type = filteringType;
            filter.options = filteringOptions;
        }
        if (searchingType) {
            searchBy[searchingType] = searchingValue;
        }
        getData({ sortBy, filter, searchBy, cursor });
    }
    render() {
        const {
            setFilteringType,
            setFilteringOptions,
            setSortingType,
            setSearchingType,
            setSearchingValue,
            searchingValue,
            filteringType,
            searchingType,
            setCursor

        } = this.props;
        let filterPanel = null;
        if (filteringType === 'range-date') {
            filterPanel = (<DateFilterPanel submitDate={(value) => {
                setFilteringOptions(value);
            }}/>);
        } else if (filteringType === 'range-currency') {
            filterPanel = (<CurrencyFilterPanel submitCurrency={(value) => {
                setFilteringOptions(value);
            }}/>);
        }
        return (
            <div styleName = "control-panel">
                <div styleName = "dropdowns">
                    <SearchPanel submitSearchingType={(value) => {
                        setSearchingType(value);
                    } }
                                 searchingType = {searchingType}
                                 value = {searchingValue}
                                 setValue = {(value) => { setSearchingValue(value) } }
                                 submitSearch={() => {
                                     setCursor(1); //Search control uses call to new data directly so we need to set cursor inside event handler
                                     this.getNewData();
                                 }}
                    />
                    <FilterDropdown submitFilteringType={(value) => {setFilteringType(value)}}/>
                    <SortDropdown submitSortingType={(value) => {
                        setSortingType(value);
                    }}/>
                </div>
                <div>
                    {filterPanel}
                </div>
            </div>
        )
    }

}

export default CSSModules(ControlPanel, styles);