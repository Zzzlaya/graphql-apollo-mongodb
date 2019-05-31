import React from 'react';
import { render } from 'react-dom';

import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { HashRouter, Route, Switch } from 'react-router-dom';

import './style/style.css';

import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

const inMemoryCache = new InMemoryCache();
const client = new ApolloClient({ cache: inMemoryCache });

const Root = () => {
  return (
    <HashRouter>
      <ApolloProvider client={client}>
        <div className="container">
          <Switch>
            <Route exact path="/" component={SongList} />
            <Route exact path="/songs/new" component={SongCreate} />
            <Route exact path="/songs/:id" component={SongDetail} />
          </Switch>
        </div>
      </ApolloProvider>
    </HashRouter>
  );
};

render(<Root />, document.querySelector('#root'));
