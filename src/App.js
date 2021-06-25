//import logo from './logo.svg';
import { Component } from 'react';
import './App.css';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/ConfigStore';

const store = ConfigureStore();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>  
            <Main></Main>
          </div>
        </BrowserRouter>
      </Provider>
    );
  
  }
}

export default App;
