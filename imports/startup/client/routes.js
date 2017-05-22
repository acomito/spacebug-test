// TOP-LEVEL IMPORTS
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// LAYOUTS
import PublicLayout from '../../ui/layouts/public';
import AdminLayout from '../../ui/layouts/admin';

// PAGES
import { 
  //public
  LandingPage, 
  LoginPage, 
  SignupPage,
  //admin
  AdminHomePage
} from '../../ui/pages';
;
import AdminUsersPage from '../../ui/pages/admin/admin-users';
import AdminUsersSinglePage from '../../ui/pages/admin/admin-user-single';
import AdminAccountPage from '../../ui/pages/admin/admin-account';

// THEME
import enUS from 'antd/lib/locale-provider/en_US';
import LocaleProvider from 'antd/lib/locale-provider'

import { userId } from 'meteor-apollo-accounts'

// Hook where will be fetched the data before displaying the component
// Will redirect user if not logged


const AppRoutes = () => {
  return (
  <LocaleProvider locale={enUS}>
    <Router history={browserHistory}>

      {/*PUBLIC AREA*/}
      <Route path="/" component={ PublicLayout }>
        <IndexRoute name='index' component={ LandingPage } />
        <Route path="/login" component={ LoginPage } />
        <Route path="/signup" component={ SignupPage } />
      </Route>

      {/*ADMIN AREA*/}
      <Route path="/admin" component={ AdminLayout }>
        <IndexRoute name="index" component={ AdminHomePage } />
        <Route path="users" breadcrumbName='Users' component={ AdminUsersPage }>
          <Route path=":_id" breadcrumbName='User Detail' component={ AdminUsersSinglePage }  />
        </Route>
        <Route path="/admin/account" component={ AdminAccountPage }  />
      </Route>

    </Router>
  </LocaleProvider>
  );
}

export default AppRoutes;