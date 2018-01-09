'use strict';

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
//styles
import CSSModules from 'react-css-modules';
import styles from './style.scss';
//components
import InfiniteScroll from 'react-infinite-scroller';
import PersonBlock from './PersonBlock.js';

class ContentPanel extends PureComponent {
    static propTypes = {
        setDisplayedData: PropTypes.func.isRequired,
        setCursor: PropTypes.func.isRequired,
        dataLength: PropTypes.number.isRequired,
        displayedData: PropTypes.arrayOf(PropTypes.object).isRequired,
        sortingType: PropTypes.string.isRequired,
        filteringType: PropTypes.string.isRequired,
        searchingType: PropTypes.string.isRequired,
        searchingValue: PropTypes.string.isRequired,
        filteringOptions: PropTypes.object.isRequired,
        cursor: PropTypes.number.isRequired,
        getData: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.getNewData = this.getNewData.bind(this);
        this.loadItems = this.loadItems.bind(this);
        this.renderItems = this.renderItems.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cursor !== this.props.cursor) {
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
            getData,
            displayedData
        } = this.props;
        let sortBy = "",
            searchBy = {},
            filter = {type: ""};
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
        getData({ sortBy, filter, searchBy, cursor }, displayedData.length + 50);
    }

    loadItems() {
        const {
            dataLength,
            displayedData,
            setCursor,
            setDisplayedData,
            cursor
        } = this.props;
        if (dataLength && dataLength > displayedData.length + 50) {
            setDisplayedData(displayedData.length + 50)
        } else if (dataLength && !(dataLength % 1000) && dataLength <= displayedData.length + 50) {
            setCursor(cursor + 1);
            setDisplayedData(0);
        }
    }
    renderItems(){
        const {
            displayedData
        } = this.props;
        return displayedData.map(person => (<PersonBlock key = {person._id} person = {person} />));
    }

    render() {
        const loader = (<div>Loading...</div>);
        const {
            displayedData
        } = this.props;
        let hasMore = true;
        if(displayedData.length) {
            hasMore = !(displayedData.length%50);
        }
        return (
            <div styleName="content-panel">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadItems}
                    hasMore={hasMore}
                    loader={loader}>
                    {this.renderItems()}
                </InfiniteScroll>
            </div>
        );
    }
}

export default CSSModules(ContentPanel, styles);