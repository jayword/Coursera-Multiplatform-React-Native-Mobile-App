import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Loading } from './components/LoadingComponent';


const store = ConfigureStore();

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate 
				loading={<Loading />}
				persistor={persistor}
				>
					<Main />
				</PersistGate>
            </Provider>
        );
    }
}
console.disableYellowBox = true;
//console.ignoredYellowBox['Warning: Each'];

