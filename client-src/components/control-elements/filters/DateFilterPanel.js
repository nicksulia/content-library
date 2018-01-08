import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
//styles
import CSSModules from 'react-css-modules';
import styles from './style.scss';

class DateFilterPanel extends PureComponent {
    static propTypes = {
        submitDate: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            from: {
                year: '',
                month: '',
                day: ''
            },
            to: {
                year: '',
                month: '',
                day: ''
            }
        };
        this.setValue = this.setValue.bind(this);
    }
    setValue(point, dateParam, target) {

        let value;
        if (parseInt(target.value) < parseInt(target.min) ) {
            value = target.min;
        } else if (parseInt(target.value) > parseInt(target.max)) {
            value = target.max;
        } else value = target.value;

        const tempSet = {...this.state[point]};
        tempSet[dateParam] = value;
        this.setState({
            ...this.state,
            [point]:tempSet
        });
    }


    render() {
        const {
            from,
            to
        } = this.state;
        const {
            submitDate
        } = this.props;

        return (
            <div>
                <label>From:</label><br/>
                <label>Year:</label><input type="number" min="2000" max="2020" value={from.year} step="1" onChange={
                    (e) => { this.setValue('from','year', e.target) }
                }/><br/>
                <label>Month:</label><input type="number" min={1} max={12} value={from.month}  step="1" onChange={
                (e) => { this.setValue('from','month', e.target) }
            }/><br/>
                <label>Day:</label><input type="number" min="1" max="30" value={from.day}  step="1" onChange={
                (e) => { this.setValue('from','day', e.target) }
            }/><br/>
                <label>To:</label><br/>
                <label>Year:</label><input type="number" min="2000" max="2020" value={to.year}  step="1" onChange={
                (e) => { this.setValue('to','year', e.target) }
            }/><br/>
                <label>Month:</label><input type="number" min="1" max="12" value={to.month}  step="1" onChange={
                (e) => { this.setValue('to','month', e.target) }
            }/><br/>
                <label>Day:</label><input type="number" min="1" max="30" value={to.day}  step="1" onChange={
                (e) => { this.setValue('to','day', e.target) }
            }/><br/>
                <button onClick={
                    () => { submitDate({from: new Date(from.year, from.month, from.day), to: new Date(to.year, to.month, to.day)} ) }
                }>Submit</button>
            </div>
        );
    }

}

export default CSSModules(DateFilterPanel, styles);