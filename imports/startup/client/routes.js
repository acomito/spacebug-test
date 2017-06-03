// TOP-LEVEL IMPORTS
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// LAYOUTS
import PublicLayout from '../../ui/layouts/public';
import AdminLayout from '../../ui/layouts/admin';
import AppLayout from '../../ui/layouts/app';
// PAGES
import { 
  SignupPage,
  //admin
  AdminHomePage
} from '../../ui/pages';

// PUBLIC
import ResetPassword from '/imports/ui/pages/public/reset-password';
import LoginPage from '/imports/ui/pages/public/LoginPage';
import ForgotPassword from '/imports/ui/pages/public/ForgotPassword';
// APP
import AppAccount from '/imports/ui/pages/app/App_Account';
import AppHome from '/imports/ui/pages/app/App_Home';
import AppMyStuff from '/imports/ui/pages/app/App_MyStuff';
import AppMyFriends from '/imports/ui/pages/app/App_MyFriends';
// ADMIN
import AdminUsersPage from '/imports/ui/pages/admin/admin-users';
import AdminUsersSinglePage from '/imports/ui/pages/admin/admin-user-single';
import AdminAccountPage from '/imports/ui/pages/admin/admin-account';



import { userId } from 'meteor-apollo-accounts'

// Hook where will be fetched the data before displaying the component
// Will redirect user if not logged


const AppRoutes = () => {
  return (
    <Router history={browserHistory}>

      {/*PUBLIC AREA*/}
      <Route path="/" component={ PublicLayout }>
        <IndexRoute name='index' component={ LoginPage } />
        <Route path="/login" component={ LoginPage } />
        <Route path="/signup" component={ SignupPage } />
        <Route path="forgot-password"  component={ ForgotPassword } />
        <Route path="reset-password"  component={ ResetPassword } />
      </Route>

    {/*APP AREA*/}
      <Route path="/app" component={ AppLayout }>
        <IndexRoute name='index' breadcrumbName='Home' component={ AppHome } />
         <Route path="account" breadcrumbName='Account' component={ AppAccount } />
         <Route path="my-stuff" breadcrumbName='My Stuff' component={ AppMyStuff } />
         <Route path="friends" breadcrumbName='Friends' component={ AppMyFriends }>
         </Route>
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
  );
}

export default AppRoutes;