import Select from '@/components/forms/select'

export default function Sort({ options, onChange }) {
  return (
    <div className="sort">
      <Select 
        label="Sort"
        options={options}
        onChange={onChange}   
      />
    </div>
  )
}