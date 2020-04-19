import React, { Component } from 'react';
import ContextTypePage from './ContextTypePage';
import ContextTypeUser from './ContextTypeUser';
import ComsumerPage from './ComsumerPage';
import {ThemeContext, UserContext} from '../context';

export default class ContextPage extends Component {
  constructor(props){
    super()
    this.state = {
      theme:{
        themeColor: 'red'
      },
      user:{
        name: '不知道'
      }
    }
  }
  render() {
    const {theme, user} = this.state
    return (
      <div>
        <h3>ContextPage</h3>
        <ThemeContext.Provider value={theme}>
         <UserContext.Provider value={user}>
          <ContextTypeUser />
          <ComsumerPage />
         </UserContext.Provider>
         <ContextTypePage />
        </ThemeContext.Provider>
      </div>
    )
  }
}

