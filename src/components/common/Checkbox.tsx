interface CheckboxProps {
  checked: boolean;
  handleToggle: () => void;
}

export default function Checkbox({ checked, handleToggle }: CheckboxProps) {
  return (
    <div className="checkbox-wrapper-21">
      <label className="control control--checkbox">
        <input type="checkbox" checked={checked} onChange={handleToggle} />
        <div className="control__indicator"></div>
      </label>
    </div>
  );
}
