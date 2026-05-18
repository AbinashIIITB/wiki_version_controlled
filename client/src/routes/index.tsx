import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import DocumentView from '../pages/DocumentView';
import DocumentEdit from '../pages/DocumentEdit';
import Templates from '../pages/Templates';
import AdminPanel from '../pages/AdminPanel';
import Search from '../pages/Search';
import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <ProtectedRoute path="/documents/:id/edit" component={DocumentEdit} />
            <ProtectedRoute path="/documents/:id" component={DocumentView} />
            <ProtectedRoute path="/templates" component={Templates} />
            <ProtectedRoute path="/admin" component={AdminPanel} />
            <ProtectedRoute path="/search" component={Search} />
            <Redirect from="/" to="/dashboard" />
        </Switch>
    );
};

export default Routes;