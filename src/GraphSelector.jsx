const GraphSelector = ({ graphKeys, onClick }) => {
    return (
        <div class="input-group mb-3">
            <select class="custom-select" id="inputGroupSelect03">
                <option selected>Choose...</option>
                {graphKeys.map((key) => (
                    <option value={key}>{key}</option>
                ))}
            </select>
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" onClick={onClick}>
                    Check
                </button>
            </div>
        </div>
    );
};

export default GraphSelector;
