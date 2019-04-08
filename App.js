import React, {Component} from 'react';
import Index from './src/screens/index';
import {Provider} from 'react-redux';
import configure from './src/store/configure';

const store = configure();

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
        <Provider store={store}>
          <Index/>
        </Provider>
    );
  }
}

