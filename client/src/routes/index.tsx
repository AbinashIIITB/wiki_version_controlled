import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import DocumentView from '../pages/DocumentView';
import DocumentEdit from '../pages/DocumentEdit';
import Templates from '../pages/Templates';
import AdminPanel from '../pages/AdminPanel';
import Search from '../pages/Search';
import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <ProtectedRoute path="/dashboard" component={Dashboard} />
                <ProtectedRoute path="/documents/:id/edit" component={DocumentEdit} />
                <ProtectedRoute path="/documents/:id" component={DocumentView} />
                <ProtectedRoute path="/templates" component={Templates} />
                <ProtectedRoute path="/admin" component={AdminPanel} />
                <ProtectedRoute path="/search" component={Search} />
            </Switch>
        </Router>
    );
};

export default Routes;