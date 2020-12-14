import "../css/GraphSelector.css";

const GraphSelector = ({ options, onChange }) => {
    return (
        <div className="selector-box">
            <div className="title">Graph</div>
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
