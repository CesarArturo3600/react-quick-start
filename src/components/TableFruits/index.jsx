import React from 'react'

const TableFruits = ({ data = {}, checked = false, searchText = '' }) => {
  const filteredProducts = category => {
    if (!data[category] || !Array.isArray(data[category])) {
      return []
    }

    return data[category].filter(product => {
      const textSearchedValidation = product.name
        .trim()
        .toLowerCase()
        .includes(searchText.toLowerCase())

      const fruitValidation = !checked || product.stocked

      return textSearchedValidation && fruitValidation
    })
  }

  if (!data || Object.keys(data).length === 0) {
    return <div className="loading-data">Loading</div>
  }

  return (
    <div className="table-fruits">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            Object.keys(data).map(prodCat => {
              const filteredData = filteredProducts(prodCat)

              if (filteredData.length === 0) return null

              return (
                <React.Fragment key={prodCat}>
                  <tr key={prodCat} className="fruitcat">
                    <td colSpan={2}>{prodCat}</td>
                  </tr>
                  {filteredData.map(fruit => (
                    <tr key={fruit.name} className="fruit-row">
                      <td className={!fruit.stocked ? 'w-stock' : undefined}>
                        {fruit.name}
                      </td>
                      <td>{fruit.price}</td>
                    </tr>
                  ))}
                </React.Fragment>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default TableFruits
