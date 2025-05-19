import React from 'react';
import { Provider } from 'react-redux';
import store from '../src/stores/store'; 

import FlightSearchForm from '../src/components/FlightSearchForm/FlightSearchForm';

const App = () => {
  return (
    <Provider store={store}>
     
        <FlightSearchForm />
       
    </Provider>
  );
};

export default App;
