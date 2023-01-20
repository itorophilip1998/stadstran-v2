import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./AppContainer/HomePage";
import AdminLogin from "./AppContainer/Admin/AdminLogin";
import AdminSignup from "./AppContainer/Admin/AdminSignup";
import AdminSetLocation from "./AppContainer/Admin/AdminSetLocation";
import AdminLocationManager from "./AppContainer/Admin/AdminLocationManager";
import AdminEditLocationManager from "./AppContainer/Admin/AdminEditLocationManager";
import AdminFormManager from "./AppContainer/Admin/AdminFormManager";
import AdminWaiterManager from "./AppContainer/Admin/AdminWaiterManager";
import AdminBrandPageManager from "./AppContainer/Admin/AdminBrandPageManager";
import AdminSubMenuManager from "./AppContainer/Admin/AdminSubMenuManager";
import AdminEditSubMenu from "./AppContainer/Admin/AdminEditSubMenuItem";
import AdminEditEvent from "./AppContainer/Admin/AdminEditEvent";
import AdminEditFoodTruck from "./AppContainer/Admin/AdminEditFoodTruck";
import AdminEditJob from "./AppContainer/Admin/AdminEditJob";
import AdminReportManager from "./AppContainer/Admin/AdminReportManager";

/**Reports */
import FormReports from "./AppContainer/Admin/FormReport";
import OrderReports from "./AppContainer/Admin/OrderReport";
import ContactReports from "./AppContainer/Admin/ContactReport";
import ReservationReports from "./AppContainer/Admin/ReservationReport";
import FamilyAndFriendReports from "./AppContainer/Admin/FamilyAndFriendReport";
import FeedBackReports from "./AppContainer/Admin/FeedBackReport";
import LostAndFoundReports from "./AppContainer/Admin/LostAndFoundReport";

import WaiterLogin from "./AppContainer/Waiter/Waiterlogin";
import WaiterHomePage from "./AppContainer/Waiter/WaiterHomePage";

import UserFormPage from "./AppContainer/User/UserFormPage";
import UserMenu from "./AppContainer/User/UserMenu";
import AllMenu from "./AppContainer/User/AllMenu";
import UserSingleMenu from "./AppContainer/User/UserSingleMenu";
import UserCart from "./AppContainer/User/UserCart";
import UserCheckout from "./AppContainer/User/UserCheckout";
import UserOrder from "./AppContainer/User/UserOrder";
import AboutBrandPage from "./AppContainer/User/AboutBrandPage";
import FeedbackBrandPage from "./AppContainer/User/BrandPageFeedback";
import SingleFoodTruck from "./AppContainer/User/SingleFoodTruck";
import SingleLocation from "./AppContainer/User/SingleLocation";
import BrandPageJob from "./AppContainer/User/BrandPageJobs";
import JobApplication from "./AppContainer/User/JobApplicationForm";
import BrandPageEvent from "./AppContainer/User/BrandPageEvents";
import EventDetail from "./AppContainer/User/EventDetail";
import NotFound from "./AppComponents/404";

const allroutes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        {/* Admin Routes */}
        <Route path="/admin/0/login" exact component={AdminLogin} />

        <Route path="/admin/0/signup" exact component={AdminSignup} />

        <Route
          path="/admin/set-location/:adminId"
          exact
          component={AdminSetLocation}
        />

        <Route
          path="/admin/location/manager/:locationId"
          exact
          component={AdminLocationManager}
        />

         <Route
          path="/admin/edit/location/:locationId"
          exact
          component={AdminEditLocationManager}
        />

        <Route
          path="/admin/form/manager/:locationId"
          exact
          component={AdminFormManager}
        />

        <Route
          path="/admin/waiter/manager/:locationId"
          exact
          component={AdminWaiterManager}
        />

        <Route
          path="/admin/brand-page/manager/:locationId"
          exact
          component={AdminBrandPageManager}
        />

        <Route
          path="/admin/menu/:subdrinktitle"
          exact
          component={AdminSubMenuManager}
        />

        <Route
          path="/admin/edit-menu/:submenutitle"
          exact
          component={AdminEditSubMenu}
        />

        <Route
          path="/admin/edit-event/:eventId"
          exact
          component={AdminEditEvent}
        />

        <Route
          path="/admin/edit-foodtruck/:foodtruckId"
          exact
          component={AdminEditFoodTruck}
        />

        <Route path="/admin/edit-job/:jobId" exact component={AdminEditJob} />

        <Route
          path="/admin/reporting-view/:locationId"
          exact
          component={AdminReportManager}
        />

        <Route path="/form/reports/:locationId" exact component={FormReports} />

        <Route
          path="/order/reports/:locationId"
          exact
          component={OrderReports}
        />

        <Route
          path="/family-friends/reports/:locationId"
          exact
          component={FamilyAndFriendReports}
        />

        <Route
          path="/feedback/reports/:locationId"
          exact
          component={FeedBackReports}
        />

        <Route
          path="/contact/reports/:locationId"
          exact
          component={ContactReports}
        />

        <Route
          path="/reservation/reports/:locationId"
          exact
          component={ReservationReports}
        />

        <Route
          path="/lost-found/reports/:locationId"
          exact
          component={LostAndFoundReports}
        />

        {/* Waiter Routes */}
        <Route path="/waiter/login" exact component={WaiterLogin} />

        <Route
          path="/waiter/dashboard/:waiterId"
          exact
          component={WaiterHomePage}
        />

        {/* User Routes */}
        <Route path="/user/form/:Brandpageid" exact component={UserFormPage} />

        <Route path="/menu" exact component={AllMenu} />

        <Route path="/menu/:menulist" exact component={UserMenu} />

        <Route
          path="/menu/:submenucat/:submenuname"
          exact
          component={UserSingleMenu}
        />

        <Route path="/cart" exact component={UserCart} />

        <Route path="/checkout" exact component={UserCheckout} />

        <Route path="/user/orders" exact component={UserOrder} />

        <Route
          path="/about-brandpage/:brandpageid"
          exact
          component={AboutBrandPage}
        />

        <Route
          path="/brand-page/feedback/:brandpageid"
          exact
          component={FeedbackBrandPage}
        />

        <Route path="/food-truck/:truckId" exact component={SingleFoodTruck} />

        <Route
          path="/location-details/:locationId"
          exact
          component={SingleLocation}
        />

        <Route
          path="/brand-page/jobs/:brandpageid"
          exact
          component={BrandPageJob}
        />

        <Route path="/jobs/apply/:jobId" exact component={JobApplication} />

        <Route
          path="/brand-page/events/:brandpageid"
          exact
          component={BrandPageEvent}
        />

        <Route path="/event/details/:eventId" exact component={EventDetail} />
        <Route path="/*" exact component={NotFound} />
      </Switch>
      
    </Router>
  );
};

export default allroutes;
