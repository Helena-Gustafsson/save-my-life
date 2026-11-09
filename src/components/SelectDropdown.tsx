type SelectDropdownProps = {
    label: string,
    options: string[],
    selectedValue: string,
    onChange: (selectedValue: string) => void,
    defaultOptions: string,
    htmlId: string
}

const SelectDropdown = ({label,options, selectedValue, onChange, defaultOptions, htmlId}: SelectDropdownProps) => {
  
  return (
    <label htmlFor={htmlId}> {label}
      <select id={htmlId} value={selectedValue} onChange={(e) => onChange(e.target.value)}>
        <option value="">{defaultOptions}</option>
        {
          options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))
        }
      </select>
    </label>
  )
}

export default SelectDropdown