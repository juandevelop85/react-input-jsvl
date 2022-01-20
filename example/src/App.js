import React from 'react'

import { ExampleComponent, SelectorExample } from 'react-input-jsvl'
import 'react-input-jsvl/dist/index.css'

const data = [
  { description: 'Option 1', value: '1' },
  { description: 'Mi descripcion', value: '2' }
]

const App = () => {
  return (
    <>
      <ExampleComponent text='Create React Library Example 😄' />
      <SelectorExample data={data} />
    </>
  )
}

export default App
