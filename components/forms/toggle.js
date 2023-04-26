
export default function Toggle({ label, name, value, checked, onChange }) {
  return (
    <label className="toggle">
      <input 
        type="checkbox" 
        className="toggle__checkbox" 
        value={value} 
        name={name} 
        checked={checked}
        onChange={onChange}
        aria-label={label}
      />
      <span className="toggle__slider"></span>
    </label>
  )
}