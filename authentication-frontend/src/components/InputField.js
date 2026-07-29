function InputField({
  label,
  type,
  name,
  value,
  onChange,
}) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label>{label}</label>
      <br />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: "300px",
          padding: "8px",
          marginTop: "5px",
        }}
      />
    </div>
  );
}

export default InputField;