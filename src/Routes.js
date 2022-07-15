import React from "react";
import { Route, Switch } from "react-router-dom";

import { Home } from "./pages/home";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { Builder } from "./pages/builders";
import { AboutUs } from "./pages/about/AboutUs";
import { ContactUs } from "./pages/contact/ContactUs";
import { Support } from "./pages/Support";
import { Users } from "./pages/admin/Users";
import { DC } from "./pages/404";
import { Profile } from "./pages/profile/Profile";
import { FindJobs } from "./pages/jobs/FindJobs";
import { EditProfile } from "./pages/profile/EditProfile";
import { SubmitProposals } from "./pages/jobs/SubmitProposals";
import { JobDetails } from "./pages/jobs/JobDetails";
import { PostedJobs } from "./pages/user/PostedJobs";
import { NavMenu } from "./pages/user/NavMenu";
import { AdminSideBar } from "./pages/admin/AdminSideBar";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { ResetPassword } from "./pages/auth/ResetPassword";
import { PrivacyPolicy } from "./pages/privacy/PrivacyPolicy";

import AdminRoute from "./component/routes/AdminRoute";
import WithAuth from "./component/routes/WithAuth";
import WithNoAuth from "./component/routes/WithNoAuth";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <WithAuth exact path="/find-builders" component={Builder} />
    <WithAuth exact path="/find-job" component={FindJobs} />
    <WithAuth exact path="/job/:id" component={JobDetails} />
    <WithAuth exact path="/user/jobs" component={PostedJobs} />
    <WithAuth exact path="/user/job/:id" component={NavMenu} />
    <WithAuth exact path="/apply/:id" component={SubmitProposals} />
    <WithAuth exact path="/profile/:id" component={Profile} />
    <WithAuth exact path="/user/posted-jobs" component={JobDetails} />
    <WithAuth exact path="/profile/edit/:id" component={EditProfile} />
    <WithNoAuth exact path="/login" component={Login} />
    <WithNoAuth exact path="/signup" component={Signup} />
    <WithNoAuth exact path="/forgot-password" component={ForgotPassword} />
    <WithNoAuth exact path="/reset/:token" component={ResetPassword} />
    <Route exact path="/about-us" component={AboutUs} />
    <Route exact path="/privacy-policy" component={PrivacyPolicy} />
    <Route exact path="/contact-us" component={ContactUs} />
    <Route exact path="/support" component={Support} />
    <AdminRoute exact path="/admin/users" component={Users} />
    <AdminRoute exact path="/admin" component={AdminSideBar} />

    {/* <AdminRoute exact path="/admin/invoices" component={Invoice} /> */}
    {/* <AdminRoute exact path="/admin/questions" component={Questions} /> */}
    <Route component={DC} />
  </Switch>
);

export default Routes;
