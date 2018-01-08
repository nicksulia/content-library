import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
//styles
import CSSModules from 'react-css-modules';
import styles from './style.scss';
//Components
import SearchDropdown from '../dropdowns/SearchDropdown.js'

class SearchPanel extends PureComponent {
    static propTypes = {
        submitSearchingType: PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <input type="text"/>
                <button>Submit</button>
                <span>SearchBy</span>
                <SearchDropdown submitSearchingType={this.props.submitSearchingType}/>
            </div>
        );
    }

}

export default CSSModules(SearchPanel, styles);