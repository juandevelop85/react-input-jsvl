import React from 'react'
import styles from './styles.module.css'
import Selector from './Selector'

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

export const SelectorExample = ({data}) => {
  return <Selector nameForm="veci-form" data={data}/>
}
