const Square = ({ disabled, value, onSquareClick }) => {
  return (
    <button className="square" onClick={onSquareClick} disabled={disabled}>
      {value}
    </button>
  )
}

export default Square
