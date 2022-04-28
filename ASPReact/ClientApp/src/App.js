import logo from './logo.svg';
import './App.css';

import { Home } from './Home';
import { Customer } from './Customer';
import { Product } from './Product';
import { Store } from './Store';
import { Sales } from './Sales';
import { Navigation } from './Navigation';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <h3 className="m-3 d-flex justify-content-center">
                    MVC Project With React.js
                </h3>

                <Navigation />

                <Switch>
                    <Route path='/' component={Home} exact />
                    <Route path='/Customer' component={Customer} />
                    <Route path='/Product' component={Product} />
                    <Route path='/Store' component={Store} />
                    <Route path='/Sales' component={Sales} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
