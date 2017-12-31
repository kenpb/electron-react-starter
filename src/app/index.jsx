import React, { Component } from 'react'
import { render } from 'react-dom'

import './sass/main.sass'

class App extends Component {
  render() {
    return <h1>Hello From React!</h1>
  }
}

render(
  <App />,
  document.getElementById('app')
)
