
export default function Toggle({ name, value, checked, onChange }) {
  return (
    <label className="toggle">
      <input 
        type="checkbox" 
        className="toggle__checkbox" 
        value={value} 
        name={name} 
        checked={checked}
        onChange={onChange}
      />
      <span className="toggle__slider"></span>
    </label>
  )
}