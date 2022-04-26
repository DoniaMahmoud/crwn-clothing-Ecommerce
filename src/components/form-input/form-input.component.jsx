import { Group, FormInputLabel, Input } from "./form-input.styles.jsx";
const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      {/* if the value length is there, meaning that if the user has typed
      something into this input, that means that I want the label to shrink. */}
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};
export default FormInput;
