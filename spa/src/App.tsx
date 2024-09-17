// Componente principal.
import React from 'react';
import { Route, Switch } from 'wouter';
import Home from './pages/Home';
import List from './components/List';
import Edit from './pages/EditTodo';

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/list" component={List} />
        <Route path="/edit/:id" component={Edit} />
      </Switch>
    </div>
  );
};

export default App;
