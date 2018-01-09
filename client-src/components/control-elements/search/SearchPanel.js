import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
//styles
import CSSModules from 'react-css-modules';
import styles from './style.scss';
//Components
import SearchDropdown from '../dropdowns/SearchDropdown.js'

class SearchPanel extends PureComponent {
    static propTypes = {
        submitSearchingType: PropTypes.func.isRequired,
        submitSearch: PropTypes.func.isRequired,
        value: PropTypes.string,
        setValue: PropTypes.func.isRequired,
        searchingType:PropTypes.string
    };
    constructor(props) {
        super(props);

    }
    render() {
        const {
            value,
            submitSearchingType,
            setValue,
            submitSearch,
            searchingType
        } = this.props;
        return (
            <div styleName="search-panel">
                <SearchDropdown submitSearchingType={submitSearchingType}/>
                <input disabled={!searchingType} type="text" onChange={(e) => {setValue(e.target.value)}} value={value}/>
                <button onClick={submitSearch}>Submit</button>
            </div>
        );
    }

}

export default CSSModules(SearchPanel, styles);