
export default function Select({ label, options, onChange }) {
  return (
    <>
      <label>
        <span className="select__label">{label}</span>
        <select className="select__input" onChange={onChange}>
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.name}</option>
          ))}
        </select>
      </label>
    </>
  )
}