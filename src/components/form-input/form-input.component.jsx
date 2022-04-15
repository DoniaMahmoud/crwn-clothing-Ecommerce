import "./form-input.styles.scss";
const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      {/* if the value length is there, meaning that if the user has typed
      something into this input, that means that I want the label to shrink. */}
      <input className="form-input" {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink " : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};
export default FormInput;
