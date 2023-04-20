import Toggle from '@/components/forms/toggle'

export default function Filters() {
  const filterBtns = [...Array(5)]

  return (
    <section className="filters">
      <h2>FILTERS</h2>
      <fieldset className="filter">
        <legend>Planet Type</legend>
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
        <legend>Include Pluto</legend>
        <Toggle 
          name="moons"
          value="true"
        />
      </fieldset>
    </section>
  )
}