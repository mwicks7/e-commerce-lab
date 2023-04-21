export default function CheckboxButton({ name, label, value}) {
  return(
    <label className="checkbox-btn">
      <input type="radio" className="checkbox-btn__check" name={`${name}`} value={value}/>
      <span className="checkbox-btn__label">{label}</span>
    </label>
  )
}