import './App.css'
import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

export default class App extends Component {
  render() {
    return (
    <>
        <NavBar />

      
        <News  country="us" category="general" />
        

          

       </>   
    )
  }
}
