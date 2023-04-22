
export default function Select({ label, options, onChange }) {
  return (
    <>
      <label className="select__label">{label} &nbsp;</label>
      <select className="select__input" onChange={onChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.name}</option>
        ))}
      </select>
    </>
  )
}