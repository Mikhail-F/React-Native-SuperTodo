import React, {useState} from 'react';
import {AppNavigation} from "./src/navigation/AppNavigation";
import {Provider} from "react-redux";
import store from "./src/Redux/storeRedux";
import AppLoading from "expo-app-loading";
import {bootstrap} from "./src/bootstrap";

export default function App() {

    let [loading, isLoading] = useState(true)

    if(loading){
        return (
            <AppLoading
                startAsync={bootstrap}
                onFinish={() => isLoading(false)}
                onError={(e => console.log(e))}
            />
        )
    }

  return (
      <Provider store={store}>
        <AppNavigation/>
      </Provider>
  )
}