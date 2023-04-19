export default function Filters() {
  const filterBtns = [...Array(5)]

  return (
    <section className="filters">
      <b>FILTERS</b>
      <fieldset className="filter">
        <legend>Elements</legend>
        <ul className="filter__btn-list">
          <li className="filter__btn-item">
            <button className="filter__btn filter__btn--active">C</button>
          </li>
          {filterBtns.map((filter, i) => (
            <li key={i} className="filter__btn-item">
              <button className="filter__btn">CH4</button>
            </li>
          ))}
        </ul>
      </fieldset>
      <fieldset className="filter">
        <legend>Mass</legend>
        <input className="filter__input" type="range" id="mass" name="mass" min="0" max="11" />
      </fieldset>
      <fieldset className="filter">
        <legend>Distance</legend>
        <input className="filter__input" type="range" id="mass" name="mass" min="0" max="11" />
      </fieldset>
    </section>
  )
}