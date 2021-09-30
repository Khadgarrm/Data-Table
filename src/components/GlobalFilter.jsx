import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import './table.css'

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined);
  }, 1000);
  return (
    <div>
      <input className='searchInput'
        placeholder={'Search by name: Sue'}
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </div>
  )
}
