import { Provider } from 'react-redux'
import store from '@redux/store'
import { Home } from '@pages/Home'
import './reset.css'

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}

export default App
