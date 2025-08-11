export default function InputField({ label, type = "text", name, value, placeholder, error, onChange }) {
    return (
        <div className={`custom-input ${error ? "custom-input-error" : ""}`}>
            <label>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
            {error && <p className="error">{error}</p>}
        </div>
    );
}
