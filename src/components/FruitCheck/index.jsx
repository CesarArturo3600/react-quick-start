import React from 'react'

const FruitCheck = ({
  checked = false,
  onHandleCheck,
  msg = 'coloca algo',
}) => {
  return (
    <div className="fruit-check">
      <input type="checkbox" checked={checked} onChange={onHandleCheck} />
      <p>{msg}</p>
    </div>
  )
}

export default FruitCheck
