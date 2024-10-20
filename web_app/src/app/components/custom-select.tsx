import Select from 'react-select'

const CustomSelect = ({isDisabled, value, onChange, options}) => {
  return (
    <Select
      isDisabled={isDisabled}
      value={value}
      onChange={onChange}
      options={options}
      placeholder="Select "
      classNamePrefix="react-select"
      styles={{
        control: (provided) => ({
          ...provided,
          backgroundColor: '#1f2937',
          borderColor: '#374151',
          color: 'white',
          padding: '2px',
          width: '140px', // Set a fixed width for the select
          marginLeft: 'auto', // Push the select to the right
        }),
        menu: (provided) => ({
          ...provided,
          backgroundColor: '#1f2937',
          width: '140px', // Match the width of the control
          right: 0, // Align the dropdown to the right
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isFocused ? '#374151' : '#1f2937',
          color: 'white',
        }),
        singleValue: (provided) => ({
          ...provided,
          color: 'white',
        }),
      }}
      formatOptionLabel={({ label, icon: Icon }) => (
        <div className="flex items-center">
          {Icon && <Icon className="w-5 h-5 mr-2" />}
          <span>{label}</span>
        </div>
      )}
    />
  )
}


export default CustomSelect;
