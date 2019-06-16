import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { Route, Switch } from 'react-router'; // react-router v4
import { ConnectedRouter } from 'connected-react-router';
import * as serviceWorker from './serviceWorker';
import createStore from './redux/store';
import withTracker from './utils/withTracker';
import withMetaMask from './utils/withMetaMask';

import * as Pages from './pages';

const { store, persistor, history } = createStore();

const TrackedSwitch = withMetaMask(withTracker(Switch));

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ConnectedRouter history={history}>
              <TrackedSwitch>
                <Route exact path="/" render={() => <Pages.Landing />} />
                <Route exact path="/wallet" render={() => <Pages.Wallet />} />
                <Route
                  exact
                  path="/dapp/explore"
                  render={() => <Pages.DAppElementExplorerPage />}
                />
                <Route
                  exact
                  path="/dapp/transactions/:transactionTimeHash"
                  render={() => <Pages.DAppElementTransactionPage />}
                />
                <Route
                  exact
                  path="/dapp/operations/:uid"
                  render={() => <Pages.DAppElementOperationsPage />}
                />
                <Route
                  exact
                  path="/dapp/operations"
                  render={() => <Pages.DAppElementOperationsPage />}
                />

                <Route exact path="/dapp/did/profile" render={() => <Pages.LightNodeMyDIDPage />} />
                <Route exact path="/dapp/resolver" render={() => <Pages.DAppDIDResolverPage />} />
                <Route
                  exact
                  path="/dapp/did/all"
                  render={() => <Pages.LightNodeViewAllDIDPage />}
                />
                <Route
                  exact
                  path="/dapp/resolver/:did"
                  render={() => <Pages.DAppDIDResolverPage />}
                />

                {/* <Route
                  exact
                  path="/server/resolver"
                  render={() => <Pages.FullNodeResolverPage />}
                />
                <Route
                  exact
                  path="/server/did/profile"
                  render={() => <Pages.FullNodeMyDIDPage />}
                />
                <Route
                  exact
                  path="/server/did/all"
                  render={() => <Pages.FullNodeViewAllDIDPAge />}
                /> */}

                <Route exact path="/credits" render={() => <Pages.Credits />} />

                <Route path="*" render={() => <Pages.NotFound />} />
              </TrackedSwitch>
            </ConnectedRouter>
          </PersistGate>
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
