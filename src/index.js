
import * as tools from './common/constants'
tools.init(window.h5)
import React from 'react'
import { render } from 'react-dom'
import createStore from './store/configureStore'
import { Provider } from 'react-redux'

import './css/style.styl'

const Route = require('./routes').default
const store = createStore()

render(
	<Provider store={store}>
		{Route}
	</Provider>
  ,document.getElementById('wrapper')
)