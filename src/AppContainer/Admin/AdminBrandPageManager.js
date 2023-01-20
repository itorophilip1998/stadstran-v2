/*eslint-disable*/



import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";
import AdminStyle from "../../AppStyles/AdminStyles.module.css";
import AdminNavbar from "../../AppComponents/AdminComp/AdminNavbar";
import BrandPageFormDetails from "../../AppComponents/AdminComp/AdminBrandPageComponents/BrandPageFormDetails";
import BrandPageIcons from "../../AppComponents/AdminComp/AdminBrandPageComponents/BrandPageIcons";
import { useHistory } from "react-router-dom";

import WelcomeModal from "../../AppComponents/AdminComp/AdminIconsModal/welcomeModal";
import FeedbackModal from "../../AppComponents/AdminComp/AdminIconsModal/feedbackModal";
import MenuModal from "../../AppComponents/AdminComp/AdminIconsModal/menuModal";
import FreeIconModal from "../../AppComponents/AdminComp/AdminIconsModal/freeIconModal";
import DrinkIconModal from "../../AppComponents/AdminComp/AdminIconsModal/drinkIconModal";
import SocialMediaIconModal from "../../AppComponents/AdminComp/AdminIconsModal/socialMediaIconModal";
import LostAndFoundIconModal from "../../AppComponents/AdminComp/AdminIconsModal/lostAndFoundIconModal";
import ContactIconModal from "../../AppComponents/AdminComp/AdminIconsModal/contactIconModal";
import StrandorteIconModal from "../../AppComponents/AdminComp/AdminIconsModal/strandorteIconModal";
import AboutIconModal from "../../AppComponents/AdminComp/AdminIconsModal/aboutIconModal";
import ShopIconModal from "../../AppComponents/AdminComp/AdminIconsModal/shopIconModal";
import FamilyAndFriendIconModal from "../../AppComponents/AdminComp/AdminIconsModal/familyAndFriendIconModal";
import TaxiIconModal from "../../AppComponents/AdminComp/AdminIconsModal/taxiIconModal";
import EventIconModal from "../../AppComponents/AdminComp/AdminIconsModal/eventIconModal";
import FoodTruckIconModal from "../../AppComponents/AdminComp/AdminIconsModal/foodTruckIconModal";
import ReservationIconModal from "../../AppComponents/AdminComp/AdminIconsModal/reservationIconModal";
import JobIconModal from "../../AppComponents/AdminComp/AdminIconsModal/jobIconModal";
import DeliveryBoxIconModal from "../../AppComponents/AdminComp/AdminIconsModal/deliveryBoxIconModal";
import Axios from "axios";

function AdminBrandPageManager(props) {
  const locationId = props.match.params.locationId;
  const history = useHistory();
  const [locationName, setLocationName] = useState("");

  const logout = () => {
    window.localStorage.clear();
    window.location.href = "/admin/0/login";
  };

  // useEffect(() => {
  //   Axios.get(
  //     `https://stadtstrandapi.ecrapps.website/api/v1/brandpagewelcome/${locationId}`
  //   )
  //     .then((response) => {
  //       setLocationName(response.data.data.BrandPage.name);
  //     })
  //     .catch((e) => {
  //       console.log(e.response);
  //     });
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const [modalWelcome, setModalWelcome] = useState(false);
  const [modalFeedback, setModalFeedback] = useState(false);
  const [modalMenu, setModalMenu] = useState(false);
  const [modalFreeIcon, setModalFreeIcon] = useState(false);
  const [modalDrinkIcon, setModalDrinkIcon] = useState(false);
  const [modalSocialMediaIcon, setModalSocialMediaIcon] = useState(false);
  const [modalLostAndFoundIcon, setModalLostAndFoundIcon] = useState(false);
  const [modalContactIcon, setModalContactIcon] = useState(false);
  const [modalStrandorteIcon, setModalStrandorteIcon] = useState(false);
  const [modalAboutIcon, setModalAboutIcon] = useState(false);
  const [modalShopIcon, setModalShopIcon] = useState(false);
  const [modalFamilyAndFriendIcon, setModalFamilyAndFriendIcon] =
    useState(false);
  const [modalTaxiIcon, setModalTaxiIcon] = useState(false);
  const [modalEventIcon, setModalEventIcon] = useState(false);
  const [modalFoodTruckIcon, setModalFoodTruckIcon] = useState(false);
  const [modalReservationIcon, setModalReservationIcon] = useState(false);
  const [modalJobIcon, setModalJobIcon] = useState(false);
  const [modalDeliveryBoxIcon, setModalDeliveryBoxIcon] = useState(false);

  const toggleWelcome = () => {
    setModalWelcome(!modalWelcome);
  };

  const toggleFeedback = () => {
    setModalFeedback(!modalFeedback);
  };

  const toggleMenu = () => {
    setModalMenu(!modalMenu);
  };

  const toggleFreeIcon = () => {
    setModalFreeIcon(!modalFreeIcon);
  };

  const toggleDrinkIcon = () => {
    setModalDrinkIcon(!modalDrinkIcon);
  };

  const toggleSocialMediaIcon = () => {
    setModalSocialMediaIcon(!modalSocialMediaIcon);
  };

  const toggleLostAndFoundIcon = () => {
    setModalLostAndFoundIcon(!modalLostAndFoundIcon);
  };

  const toggleContactIcon = () => {
    setModalContactIcon(!modalContactIcon);
  };

  const toggleStrandorteIcon = () => {
    setModalStrandorteIcon(!modalStrandorteIcon);
  };

  const toggleAboutIcon = () => {
    setModalAboutIcon(!modalAboutIcon);
  };

  const toggleShopIcon = () => {
    setModalShopIcon(!modalShopIcon);
  };

  const toggleFamilyAndFriendIcon = () => {
    setModalFamilyAndFriendIcon(!modalFamilyAndFriendIcon);
  };

  const toggleTaxiIcon = () => {
    setModalTaxiIcon(!modalTaxiIcon);
  };

  const toggleEventIcon = () => {
    setModalEventIcon(!modalEventIcon);
  };

  const toggleFoodTruckIcon = () => {
    setModalFoodTruckIcon(!modalFoodTruckIcon);
  };

  const toggleReservationIcon = () => {
    setModalReservationIcon(!modalReservationIcon);
  };

  const toggleJobIcon = () => {
    setModalJobIcon(!modalJobIcon);
  };

  const toggleDeliveryBoxIcon = () => {
    setModalDeliveryBoxIcon(!modalDeliveryBoxIcon);
  };

  const [brandIcons] = useState([
    {
      id: "1",
      iconName: "willkommen",
      iconTitle: "Welcome",
      iconToggle: toggleWelcome,
    },
    {
      id: "2",
      iconName: "comment-alt",
      iconTitle: "Feedback",
      iconToggle: toggleFeedback,
    },
    {
      id: "3",
      iconName: "clipboard-list",
      iconTitle: "Menu",
      iconToggle: toggleMenu,
    },
    {
      id: "4",
      iconName: "socialmedia",
      iconTitle: "Social Media",
      iconToggle: toggleSocialMediaIcon,
    },
    {
      id: "5",
      iconName: "fundsachen",
      iconTitle: "Lost and Found",
      iconToggle: toggleLostAndFoundIcon,
    },
    {
      id: "6",
      iconName: "drink",
      iconTitle: "Drink",
      iconToggle: toggleDrinkIcon,
    },
    {
      id: "7",
      iconName: "strandorte",
      iconTitle: "Strandorte",
      iconToggle: toggleStrandorteIcon,
    },
    {
      id: "8",
      iconName: "kontakt",
      iconTitle: "Contact",
      iconToggle: toggleContactIcon,
    },
    {
      id: "9",
      iconName: "free",
      iconTitle: "Free",
      iconToggle: toggleFreeIcon,
    },
    {
      id: "10",
      iconName: "info",
      iconTitle: "About",
      iconToggle: toggleAboutIcon,
    },
    {
      id: "11",
      iconName: "shop",
      iconTitle: "Shop",
      iconToggle: toggleShopIcon,
    },
    {
      id: "12",
      iconName: "family&friends",
      iconTitle: "Family & Friends",
      iconToggle: toggleFamilyAndFriendIcon,
    },
    {
      id: "13",
      iconName: "taxi",
      iconTitle: "Taxi",
      iconToggle: toggleTaxiIcon,
    },
    {
      id: "14",
      iconName: "events",
      iconTitle: "Events",
      iconToggle: toggleEventIcon,
    },
    {
      id: "15",
      iconName: "foodtruck",
      iconTitle: "Food Truck",
      iconToggle: toggleFoodTruckIcon,
    },

    {
      id: "16",
      iconName: "reserviert",
      iconTitle: "Reservation",
      iconToggle: toggleReservationIcon,
    },
    {
      id: "17",
      iconName: "jobs",
      iconTitle: "Jobs",
      iconToggle: toggleJobIcon,
    },
    {
      id: "18",
      iconName: "check",
      iconTitle: "Delivery Confirmation Box",
      iconToggle: toggleDeliveryBoxIcon,
    },
  ]);

  return (
    <React.Fragment>
      <MDBContainer fluid className={AdminStyle.adminbody}>
        <AdminNavbar />
      </MDBContainer>
      <MDBContainer fluid>
        <MDBContainer>
          <MDBRow>
            <MDBCol className="text-center mt-5">
              <BrandPageFormDetails
                locationId={locationId}
                locationName={locationName}
              />
            </MDBCol>
          </MDBRow>

          {/* Brand page Icons  */}
          <MDBRow>
            <MDBCol className="text-center mt-2">
              <BrandPageIcons icons={brandIcons} />

              <WelcomeModal
                constName={modalWelcome}
                functionName={toggleWelcome}
                locationId={locationId}
              />

              <FeedbackModal
                constName={modalFeedback}
                functionName={toggleFeedback}
                locationId={locationId}
              />

              <MenuModal
                constName={modalMenu}
                functionName={toggleMenu}
                locationId={locationId}
              />

              <FreeIconModal
                constName={modalFreeIcon}
                functionName={toggleFreeIcon}
                locationId={locationId}
              />

              <DrinkIconModal
                constName={modalDrinkIcon}
                functionName={toggleDrinkIcon}
                locationId={locationId}
              />

              <SocialMediaIconModal
                constName={modalSocialMediaIcon}
                functionName={toggleSocialMediaIcon}
                locationId={locationId}
              />

              <LostAndFoundIconModal
                constName={modalLostAndFoundIcon}
                functionName={toggleLostAndFoundIcon}
                locationId={locationId}
              />

              <ContactIconModal
                constName={modalContactIcon}
                functionName={toggleContactIcon}
                locationId={locationId}
              />

              <StrandorteIconModal
                constName={modalStrandorteIcon}
                functionName={toggleStrandorteIcon}
                locationId={locationId}
              />

              <AboutIconModal
                constName={modalAboutIcon}
                functionName={toggleAboutIcon}
                locationId={locationId}
              />

              <ShopIconModal
                constName={modalShopIcon}
                functionName={toggleShopIcon}
                locationId={locationId}
              />

              <FamilyAndFriendIconModal
                constName={modalFamilyAndFriendIcon}
                functionName={toggleFamilyAndFriendIcon}
                locationId={locationId}
              />

              <TaxiIconModal
                constName={modalTaxiIcon}
                functionName={toggleTaxiIcon}
                locationId={locationId}
              />

              <EventIconModal
                constName={modalEventIcon}
                functionName={toggleEventIcon}
                locationId={locationId}
              />

              <FoodTruckIconModal
                constName={modalFoodTruckIcon}
                functionName={toggleFoodTruckIcon}
                locationId={locationId}
              />

              <ReservationIconModal
                constName={modalReservationIcon}
                functionName={toggleReservationIcon}
                locationId={locationId}
              />

              <JobIconModal
                constName={modalJobIcon}
                functionName={toggleJobIcon}
                locationId={locationId}
              />

              <DeliveryBoxIconModal
                constName={modalDeliveryBoxIcon}
                functionName={toggleDeliveryBoxIcon}
                locationId={locationId}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol>
              <div className="row mt-5 font-small text-center pb-3">
                <div className="col-6 black-text " onClick={history.goBack}>
                  <MDBIcon icon="chevron-circle-left" /> Back
                </div>
                <div className="col-6 black-text " onClick={logout}>
                  Log out <MDBIcon icon="sign-out-alt" />
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
    </React.Fragment>
  );
}

export default AdminBrandPageManager;
