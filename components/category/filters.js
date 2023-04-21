import Toggle from '@/components/forms/toggle'
import CheckboxBtn from '@/components/global/checkboxBtn'
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
                    <CheckboxBtn 
                      name={fs.name}
                      label={option.label}
                      value={option.value}
                    />

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