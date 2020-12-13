const GraphSelector = ({ options, onChange }) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="groupSelect">
                    Options
                </label>
            </div>
            <select
                className="custom-select"
                id="groupSelect"
                name="groupSelect"
                onChange={onChange}
            >
                {options.map((key) => (
                    <option key={key} value={key}>
                        {key}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default GraphSelector;
