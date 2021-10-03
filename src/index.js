import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import Table from './components/table'

const App = ()=>{
  return(
    <Fragment>
        <Table/>
    </Fragment>
  )
}

ReactDOM.render(<App/>, document.querySelector('#root'))