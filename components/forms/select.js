
export default function Select({ label, options, onChange }) {
  return (
    <>
      <span>{label} &nbsp;</span>
      <select className="sort__input" onChange={onChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.name}</option>
        ))}
      </select>
    </>
  )
}