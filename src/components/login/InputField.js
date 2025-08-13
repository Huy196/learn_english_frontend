export default function InputField({ label, type = "text", name, value, placeholder, error, onChange, className }) {
    return (
        <div className={`custom-input ${error ? "custom-input-error" : ""} ${className || ""}`}>
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
