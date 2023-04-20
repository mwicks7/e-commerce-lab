import Toggle from '@/components/forms/toggle'
import { useState } from 'react'

export default function Filters({ fieldsets, onChange }) {
  return (
    <section className="filters">
      <h2>FILTERS</h2>
      <form onChange={onChange}>
        {fieldsets.map((fs, i) => (
          <fieldset key={`${fs.type}fs${i}`} className="filter">
            <legend>{fs.label}</legend>

            {fs.type === "toggle" && 
              <Toggle 
                name={fs.name}
                value={fs.value}
                // checked={true}
              />
            }

            {fs.type === "checkbox" && 
              <ul className="filter__btn-list">
                {fs.options.map((option, i) => (
                  <li key={`${option.value}_filter_${i}`} className="filter__btn-item">
                    <label className="filter__btn">
                    <input type="checkbox" className="filter__btn" name={`${fs.name}`} value={option.value}/>
                    {option.label} 
                    </label>

                  </li>
                ))}
              </ul>
            }
          </fieldset>
        ))}
      </form>
    </section>
  )
}