/**
 * @format
 */

import React from 'react';
import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { Provider } from 'react-redux';
import store from "./src/store";
import { name as appName } from './app.json';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreLogs(['componentWillReceiveProps has been renamed']);

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
)
AppRegistry.registerComponent(appName, () => Root);