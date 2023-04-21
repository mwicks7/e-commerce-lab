
export default function Select({ label, options, onChange }) {
  return (
    <>
      {label} &nbsp;
      <select className="sort__input" onChange={onChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.name}</option>
        ))}
      </select>
    </>
  )
}