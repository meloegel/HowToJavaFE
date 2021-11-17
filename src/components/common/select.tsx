export type Option = {
  display: string;
  value: string | number;
};

export type SelectProps = {
  options: Option[];
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  defaultValue?: string;
  id?: string;
};

export default function Select({
  options,
  onChange,
  disabled = false,
  className,
  defaultValue,
  id,
}: SelectProps): JSX.Element {
  return (
    <select
      id={id}
      defaultValue={defaultValue}
      className={`${className}`}
      disabled={disabled}
      onChange={(evt) => onChange(evt.target.value)}
    >
      {options.map(({ display, value }) => (
        <option key={value} value={value}>
          {display}
        </option>
      ))}
    </select>
  );
}
