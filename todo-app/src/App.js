import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import API from './utils/API';

// Components
import Dashboard from './components/Dashboard';
import Poroject from './components/Poroject';
import NewProjectForm from './components/NewProjectForm';


import { ProjectContext } from './contexts/ProjectContext';
import { ActionContext } from './contexts/ActionContext'


function App() {

  return (
    
    

      {/* Routes */}
      <Route
        exact
        path="/"
        component={Project}
      />

      <Route
        path="/cart"
        component={NewProjectForm}
      />
    

  );
}

export default App;