function Currency(props) {

    function changeCurrency(event) {
        props.onChange(event.target.value);
    }

    return (
        <div className="currency">
            <select name="currency" onChange={changeCurrency} value={props.currency}>
                <option value="AUD">AUD</option>
                <option value="USD">USD</option>
                <option value="CNY">CNY</option>
            </select>
        </div>
    );
}

export default Currency;