import React, { Component, useContext } from 'react';
import {ThemeContext} from '../context';

export default class ContextTypePage extends Component {
  static contextType = ThemeContext
  render() {
    const {themeColor} = this.context
    return (
      <div className={themeColor}>
        ContextTypePage
        <Child />
      </div>
    )
  }
}

export  function Child(props) {
  const themeContext = useContext(ThemeContext)
  console.log("themeContext----", themeContext); //sy-log
  return (
    <div>
      child
    </div>
  )
}

