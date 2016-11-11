import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Main from './components/main/main'
import TestPage from './components/pages/test-page/test-page'
import TestPage2 from './components/pages/test-page-2/test-page-2'

export default (
  <Route path='/' component={Main}>
    <Route path='/testpage' component={TestPage} />
    <Route path='/testpage2' component={TestPage2} />
  </Route>
)
