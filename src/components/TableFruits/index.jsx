import React from 'react'

const TableFruits = ({ data = {}, checked = false, searchText = '' }) => {
  const filteredProducts = category => {
    return data[category].filter(product => {
      const textSearchedValidation = product.name
        .trim()
        .toLowerCase()
        .includes(searchText)

      const fruitValidation = !checked || product.stocked

      return textSearchedValidation && fruitValidation
    })
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
