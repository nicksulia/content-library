import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
//styles
import CSSModules from 'react-css-modules';
import styles from './style.scss';

const currencies = ['UAH', 'USD', 'RUB', 'EUR'];
class CurrencyFilterPanel extends PureComponent {
    static propTypes = {
        submitCurrency: PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            from: 0,
            to: 100000,
            currency:'USD'
        };
        this.setValue = this.setValue.bind(this);
        this.setCurrency = this.setCurrency.bind(this);
    }
    setValue(point, target) {
        let value;
        if (parseInt(target.value) < parseInt(target.min) ) {
            value = target.min;
        } else if (parseInt(target.value) > parseInt(target.max)) {
            value = target.max;
        } else value = target.value;
        this.setState({
            ...this.state,
            [point]:value
        });
    }
    setCurrency(value) {
        this.setState({
            ...this.state,
            currency:value
        });
    }
    render() {
        const {
            from,
            to,
            currency
        } = this.state;
        const {
            submitCurrency
        } = this.props;
        return (
            <div>
                <label>From:</label><input type="number" min="0" max="100000" onChange={(e) => this.setValue('from',e.target)} value={from}/><br/>
                <label>To:</label><input type="number" min="0" max="100000" onChange={(e) => this.setValue('to',e.target)} value={to}/><br/>
                <select onChange={(e) => { this.setCurrency(e.target.value) } } value={currency}>
                    {
                        currencies.map(option => (
                                <option
                                    key={option}
                                    value={option}
                                >{option}</option>
                            )
                        )
                    }
                </select>
                <button onClick={
                    () => { submitCurrency({from, to, currency} ) }
                }>Submit</button>
            </div>
        );
    }

}

export default CSSModules(CurrencyFilterPanel, styles);