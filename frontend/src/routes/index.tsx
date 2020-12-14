import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../pages/login/index";
import Register from "../pages/register/index";
import Dashboard from "../pages/dashboard/index";
import Products from "../pages/products/index";
import Variants from "../pages/variants/index";

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/dashboard" isPrivate exact component={Dashboard} />
        <Route path="/products" isPrivate exact component={Products} />
        <Route path="/products/variants" isPrivate exact component={Variants} />
    </Switch>
);
export default Routes;
