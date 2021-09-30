import React from 'react';


const CheckBox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef()
  const resolvedRef = ref || defaultRef

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return (
    <label className='container'>
      <input type='checkbox' ref={resolvedRef} {...rest} />
      <span className='checkmark'></span>
    </label>
      
  )
});
export default CheckBox;


