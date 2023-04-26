export default function CheckboxButton({ name, label, value}) {
  return(
    <label className="checkbox-btn">
      <input type="checkbox" 
        className="checkbox-btn__check" 
        name={`${name}`} 
        value={value}
        aria-label={label}
      />
      <span className="checkbox-btn__label">{label}</span>
    </label>
  )
}