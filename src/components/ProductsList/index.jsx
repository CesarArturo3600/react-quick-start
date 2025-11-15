//hooks
import { useEffect, useState } from 'react'

//components
import FruitSearch from '@components/FruitSearch'
import FruitCheck from '@components/FruitCheck'
import TableFruits from '@components/TableFruits'

//styles
import '@styles/fruitList.css'

const ProductList = () => {
  const [dataFruits, setDataFruits] = useState({})
  const [checked, setChecked] = useState(false)
  const [searchText, setSearchText] = useState('')

  const onHandleChange = e => {
    setSearchText(e.target.value)
  }

  const onHandleCheck = e => {
    console.log(e.target.checked)
    setChecked(e.target.checked)
  }

  useEffect(() => {
    const processData = async () => {
      fetch('/api/products')
        .then(Response => Response.json())
        .then(fruits => {
          const nuevosdatos = fruits.reduce((acc, item) => {
            if (!acc[item.category]) {
              acc[item.category] = []
            }
            acc[item.category].push(item)
            return acc
          }, {})

          setDataFruits(nuevosdatos)
        })
    }
    processData()
  }, [])

  return (
    <div className="form-fruit">
      <FruitSearch onHandleChange={onHandleChange} searchText={searchText} />
      <FruitCheck
        onHandleCheck={onHandleCheck}
        checked={checked}
        msg="Solo mostrar productos en Stock"
      />
      <TableFruits
        data={dataFruits}
        checked={checked}
        searchText={searchText}
      />
    </div>
  )
}

export default ProductList
