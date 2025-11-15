import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/products', () => {
    console.log('MWS INTERCEPTO /API/PRODUCTS')
    return HttpResponse.json([
      { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
      { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
      { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
      { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
      { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
      { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },
    ])
  }),
]
