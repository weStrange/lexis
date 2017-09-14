import React from 'react'
import ReactDOM from 'react-dom'

// global css goes here
import './assets/index.css'
import './assets/font-awesome-4.7.0/css/font-awesome.min.css'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
