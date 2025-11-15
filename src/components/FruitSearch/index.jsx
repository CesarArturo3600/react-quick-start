const FruitSearch = ({ onHandleChange, searchText = '' }) => {
  return (
    <div className="fruit-search">
      <input
        id="fruitsearch"
        placeholder="Busqueda ..."
        onChange={onHandleChange}
        value={searchText}
      />
    </div>
  )
}

export default FruitSearch
