//top-level imports
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
//APOLLO SPECIFIC
import client from '/imports/ui/apollo/ApolloClient'
import store from '/imports/ui/redux/store/index'
import { ApolloProvider } from 'react-apollo';
//ROUTES
import AppRoutes  from './routes.js';
//
// THEME
import enUS from 'antd/lib/locale-provider/en_US';
import LocaleProvider from 'antd/lib/locale-provider'
import Raven from 'raven-js';


Raven.config(Meteor.settings.public.sentryUrl).install();


// INJECT MAIN APP
Meteor.startup(() => {
  render(
    <ApolloProvider client={client} store={store}>
    	<LocaleProvider locale={enUS}>
  			<AppRoutes />
  		</LocaleProvider>
    </ApolloProvider>,
    document.getElementById('app')
  );
});