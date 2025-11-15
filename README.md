# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# INSTALACION DE MOCKUP MSW PARA REACT + VITE

## INSTALACION DE MSW

MSW es una libreria para emular el trabajo que realiza un servicio, esto es lo que se llama a mockear

```js
 npm install msw -D

```

ademas necesita que se cree el archivo public/mockServiceWorker.js con

```batch
npx msw init public/ --save
```

## CONFIGURACION DE MSW EN MAIN.JSX

en main.jsx necesita:

```js
async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    await worker.start({
      onUnhandledRequest: 'bypass',
    })
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
})
```

## CARPETA MOCKS

tamb ien encesita una carpeta llamada mocks y dentro 2 archivos:

browser.js:

```js
import { setupWorker } from 'msw/browser'
import { handlers } from '@mocks/handlers'

export const worker = setupWorker(...handlers)
```

handlers.js :

```js
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
```

## PRODUCTLIST

inicialmente en el componente ProductList se emplea de la siguiente manera:

```js
useEffect(() => {
  const processData = async () => {
    console.log('inicio!!')
    fetch('/api/products')
      .then(Response => Response.json())
      .then(fruits => {
        console.log('xxx', fruits)
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
```

al ejecutarse el proyecto con npm run dev deberia mostrar los siquientes mensajes en consola

msw_browser.js?v=8c218697:1054 [MSW] Mocking enabled.
2handlers.js:5 MWS INTERCEPTO /API/PRODUCTS
msw.js?v=8c218697:978 [MSW] 11:50:33 GET /api/products (200 OK)
msw.js?v=8c218697:978 [MSW] 11:50:33 GET /api/products (200 OK)
