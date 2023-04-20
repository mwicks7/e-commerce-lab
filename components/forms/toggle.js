
export default function Toggle({ checked }) {
  return (
    <label className="toggle">
      <input type="checkbox" className="toggle__checkbox" checked={checked}/>
      <span className="toggle__slider"></span>
    </label>
  )
}