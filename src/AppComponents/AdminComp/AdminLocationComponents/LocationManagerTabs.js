import React, { useState } from "react";
import LocationManagerTab from "./LocationManagerTab";
import { MDBContainer } from "mdbreact";

function LocationManagerTabs(props) {
  const location = props.location;

  const [tabs] = useState([
    {
      id: "1",
      locationtabtitle: "Form Manager",
      tablink: `/admin/form/manager/${location.id}`,
    },
    {
      id: "2",
      locationtabtitle: "Brand Page Manager",
      tablink: `/admin/brand-page/manager/${location.id}`,
    },
    {
      id: "3",
      locationtabtitle: "Reporting View",
      tablink: `/admin/reporting-view/${location.id}`,
    },
    {
      id: "4",
      locationtabtitle: "Mailbox Manager",
      tablink: "/admin/mailbox/manager",
    },
    {
      id: "5",
      locationtabtitle: "Waiter Manager",
      tablink: `/admin/waiter/manager/${location.id}`,
    },
  ]);

  return (
    <MDBContainer>
      <div className="row">
        {tabs.map((locationtab) => {
          return (
            <LocationManagerTab
              key={locationtab.id}
              location={location}
              locationtabtitle={locationtab.locationtabtitle}
              locationtablink={locationtab.tablink}
            />
          );
        })}
      </div>
    </MDBContainer>
  );
}

export default LocationManagerTabs;
