
/*eslint-disable*/


import React, { useState, useEffect, useContext } from "react";
//import { usePosition } from "use-position";
import { MDBRow, MDBCol } from "mdbreact";
import UserNavbar from "../../AppComponents/UserComp/UserNavbar";
import UserBrandPageDetails from "../../AppComponents/UserComp/UserBrandPageDetails";
import UserBrandPageIcons from "../../AppComponents/UserComp/UserBrandPageIcons";
import UserFormManagerDetails from "../../AppComponents/UserComp/UserFormManagerDetails";

import WelcomeUserModal from "../../AppComponents/UserComp/UserIconModels/welcomeUserModel";
import DrinkUserModal from "../../AppComponents/UserComp/UserIconModels/drinkUserModel";
import MenuUserModal from "../../AppComponents/UserComp/UserIconModels/menuUserModel";
import SocialMediaModal from "../../AppComponents/UserComp/UserIconModels/socialMediaModel";
import ShopModal from "../../AppComponents/UserComp/UserIconModels/shopModel";
import TaxiModal from "../../AppComponents/UserComp/UserIconModels/taxiModel";
import FoodTruckModal from "../../AppComponents/UserComp/UserIconModels/foodTruckModel";
import StrandorteLocationModal from "../../AppComponents/UserComp/UserIconModels/strandorteLocationModel";
import FamilyAndFriendsModal from "../../AppComponents/UserComp/UserIconModels/familyAndFriendsModel";
import ReservationModal from "../../AppComponents/UserComp/UserIconModels/reservationModel";
import ContactModal from "../../AppComponents/UserComp/UserIconModels/contactModel";
import LostAndFoundModal from "../../AppComponents/UserComp/UserIconModels/lostAndFoundModel";
import Axios from "axios";
import { UserErrorPage } from "../../AppComponents/UserComp/UserErrorPage";
import axios from "axios";
import AxiosUnzer from "../../helpers/AxiosUnzer";
import AxiosConfig from "../../helpers/AxiosConfig";

function UserFormPage(props) {
  const brandPageId = props.match.params.Brandpageid; 
  const [modalWelcome, setModalWelcome] = useState(false);
  const [modalDrink, setModalDrink] = useState(false);
  const [modalMenu, setModalMenu] = useState(false);
  const [modalSocialMedia, setModalSocialMedia] = useState(false);
  const [modalShop, setModalShop] = useState(false);
  const [modalTaxi, setModalTaxi] = useState(false);
  const [modalFoodTruck, setModalFoodTruck] = useState(false);
  const [modalStrandorteLocation, setModalStrandorteLocation] = useState(false);
  const [modalFamilyAndFriends, setModalFamilyAndFriends] = useState(false);
  const [modalReservation, setModalReservation] = useState(false);
  const [modalContact, setModalContact] = useState(false);
  const [modalLostAndFound, setModalLostAndFound] = useState(false);
  const [brandPageDetail, setBrandPageDetail] = useState();
  const [screenLoader, setScreenLoader] = useState(true);

  const getStatus = localStorage.getItem("formStatus");
  const [brandPageIcons, setBrandPageIcons] = useState([]);
  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpage/user/${brandPageId}`
    )
      .then((response) => {
        // console.log(response);
        setScreenLoader(false);
        setBrandPageDetail(response.data.data);
        setBrandPageIcons([
          {
            id: "1",
            iconName: "willkommen",
            iconTitle: "Welcome",
            iconToggle: toggleWelcome,
            deactivate: true,
          },
          {
            id: "2",
            iconName: "comment-alt",
            iconTitle: "Feedback",
            iconToggle: toggleFeedBack,
            deactivate: response.data.data.BrandPageFeedback
              ? response.data.data.BrandPageFeedback.deactivatePage
              : "",
          },
          {
            id: "3",
            iconName: "clipboard-list",
            iconTitle: "Menu",
            iconToggle: toggleMenu,
            deactivate: response.data.data.BrandPageMenu
              ? response.data.data.BrandPageMenu.deactivate
              : "",
          },
          {
            id: "4",
            iconName: "socialmedia",
            iconTitle: "Social Media",
            iconToggle: toggleSocialMedia,
            deactivate: response.data.data.BrandPageSocialMedium
              ? response.data.data.BrandPageSocialMedium.deactivate
              : "",
          },
          {
            id: "5",
            iconName: "fundsachen",
            iconTitle: "Lost and Found",
            iconToggle: toggleLostAndFound,
            deactivate: response.data.data.BrandPageLostAndFound
              ? response.data.data.BrandPageLostAndFound.deactivate
              : "",
          },
          {
            id: "6",
            iconName: "drink",
            iconTitle: "Drink",
            iconToggle: toggleDrink,
            deactivate: true,
          },
          {
            id: "7",
            iconName: "strandorte",
            iconTitle: "Strandorte",
            iconToggle: toggleStrandorteLocation,
            deactivate: response.data.data.BrandPageStrandorte
              ? response.data.data.BrandPageStrandorte.deactivate
              : "",
          },
          {
            id: "8",
            iconName: "phone-alt",
            iconTitle: "Contact",
            iconToggle: toggleContact,
            deactivate: response.data.data.BrandPageContactU
              ? response.data.data.BrandPageContactU.deactivate
              : "",
          },
          {
            id: "13",
            iconName: "taxi",
            iconTitle: "Taxi",
            iconToggle: toggleTaxi,
            deactivate: response.data.data.BrandPageTaxi
              ? response.data.data.BrandPageTaxi.deactivate
              : "",
          },
          {
            id: "9",
            iconName: "paper-plane",
            iconTitle: "Free Icon",
          },
          {
            id: "10",
            iconName: "info",
            iconTitle: "About Us",
            iconToggle: toggleAbout,
            deactivate: response.data.data.BrandPageAbout
              ? response.data.data.BrandPageAbout.deactivate
              : "",
          },
          {
            id: "11",
            iconName: "shop",
            iconTitle: "Shop",
            iconToggle: toggleShop,
            deactivate: response.data.data.BrandPageShop
              ? response.data.data.BrandPageShop.deactivate
              : "",
          },
          {
            id: "12",
            iconName: "friends",
            iconTitle: "Family & Friends",
            iconToggle: toggleFamilyAndFriends,
            deactivate: response.data.data.BrandPageFamilyAndFriend
              ? response.data.data.BrandPageFamilyAndFriend.deactivate
              : "",
          },
          {
            id: "14",
            iconName: "events",
            iconTitle: "Events",
            iconToggle: toggleEvents,
            deactivate: response.data.data.BrandPageEvent
              ? response.data.data.BrandPageEvent.deactivate
              : "",
          },
          {
            id: "15",
            iconName: "foodtruck",
            iconTitle: "Food Truck",
            iconToggle: toggleFoodTruck,
            deactivate: response.data.data.BrandPageFoodTruck
              ? response.data.data.BrandPageFoodTruck.deactivate
              : "",
          },
          {
            id: "16",
            iconName: "reserviert",
            iconTitle: "Reservation",
            iconToggle: toggleReservation,
            deactivate: response.data.data.BrandPageReservation
              ? response.data.data.BrandPageReservation.deactivate
              : "",
          },
          {
            id: "17",
            iconName: "jobs",
            iconTitle: "Jobs",
            iconToggle: toggleJobs,
            deactivate: response.data.data.BrandPageJob
              ? response.data.data.BrandPageJob.deactivate
              : "",
          },
          {
            id: "18",
            iconName: "luggage-cart",
            iconTitle: "My Orders",
            iconToggle: toggleOrders,
            deactivate: true,
          },
          {
            id: "19",
            iconName: "cloud-download-alt",
            iconTitle: "Get Icon",
            deactivate: true,
          },
        ]);
      })
      .catch((e) => {
        setScreenLoader(false);
      });
  }, [brandPageId]);

  useEffect(() => {
    /////Check Form Time Status///////
    const currentDate = new Date();
    let saveDate = localStorage.getItem("saveDate");
    saveDate = new Date(saveDate);
    const fourHoursAgo = Math.floor(
      (currentDate.getTime() / 1000 - saveDate.getTime() / 1000) / 3600
    );

    if (fourHoursAgo > 4) {
      localStorage.setItem("formStatus", false);
    }
  });

  const toggleWelcome = () => {
    setModalWelcome(!modalWelcome);
  };
  const toggleDrink = () => {
    setModalDrink(!modalDrink);
  };
  const toggleMenu = () => {
    setModalMenu(!modalMenu);
  };
  const toggleSocialMedia = () => {
    setModalSocialMedia(!modalSocialMedia);
  };
  const toggleShop = () => {
    setModalShop(!modalShop);
  };
  const toggleTaxi = () => {
    setModalTaxi(!modalTaxi);
  };
  const toggleFoodTruck = () => {
    setModalFoodTruck(!modalFoodTruck);
  };
  const toggleStrandorteLocation = () => {
    setModalStrandorteLocation(!modalStrandorteLocation);
  };
  const toggleFamilyAndFriends = () => {
    setModalFamilyAndFriends(!modalFamilyAndFriends);
  };
  const toggleReservation = () => {
    setModalReservation(!modalReservation);
  };
  const toggleContact = () => {
    setModalContact(!modalContact);
  };
  const toggleLostAndFound = () => {
    setModalLostAndFound(!modalLostAndFound);
  };

  const toggleAbout = () => {
    window.location = `/about-brandpage/${brandPageId}`;
  };

  const toggleFeedBack = () => {
    window.location = `/brand-page/feedback/${brandPageId}`;
  };

  const toggleJobs = () => {
    window.location = `/brand-page/jobs/${brandPageId}`;
  };

  const toggleEvents = () => {
    window.location = `/brand-page/events/${brandPageId}`;
  };

  const toggleOrders = () => {
    window.location = "/user/orders/";
  };

  const clientId = localStorage.getItem("clientId");

  const [coords, setCoords] = useState({});
  const [payment, setPayment] = useState({});

  useEffect(() => {
    const coord = JSON.parse(localStorage.getItem("coords"))
    setCoords(coord);
    const paymentInfo = JSON.parse(localStorage.getItem("payment"))
    setPayment(paymentInfo);
  }, []);

  console.log("coords", coords, "payment", payment);

  const amount = payment?.amount ?? 0;
  const paymentId = payment?.id ?? "";

  const createOrder = () => {
    AxiosConfig
      .post("https://stadtstrandapi.ecrapps.website/api/v1/checkout", {
        clientId,
        brandPageId,
        amount,
        orderLocLactitude: coords.latitude,
        orderLocLongitude: coords.longitude,
      })
      .then((res) =>
        localStorage.setItem(`orderProcessed-${paymentId}`, "true")
      )
      .catch((error) => console.log(error));
  };

  console.log("paymentId", paymentId);

  useEffect(() => {
    const orderProcessed = localStorage.getItem(`orderProcessed-${paymentId}`);

    if (paymentId === "" || orderProcessed === "true") return;

    AxiosUnzer.get(`v1/payments/${paymentId}`)
      .then((res) => {
        console.log("payment status", res);
        if (res.data.transactions[0].status === "success") {
          createOrder();
        }
      })
      .catch((error) => console.error(error));
  }, [paymentId]);

  if (brandPageDetail) {
    return (
      <React.Fragment>
        <UserNavbar />
        <UserBrandPageDetails pageDetails={brandPageDetail} />
        <MDBRow>
          <MDBCol className="text-center">
            <UserBrandPageIcons icons={brandPageIcons} />
          </MDBCol>
        </MDBRow>

        {getStatus === "true" ? (
          <span></span>
        ) : (
          <UserFormManagerDetails pageDetails={brandPageDetail} />
        )}

        <WelcomeUserModal
          constName={modalWelcome}
          functionName={toggleWelcome}
          pageDetails={brandPageDetail}
        />
        <DrinkUserModal
          constName={modalDrink}
          functionName={toggleDrink}
          pageDetails={brandPageDetail}
        />

        <MenuUserModal
          constName={modalMenu}
          functionName={toggleMenu}
          pageDetails={brandPageDetail}
        />
        <SocialMediaModal
          constName={modalSocialMedia}
          functionName={toggleSocialMedia}
          pageDetails={brandPageDetail}
        />
        <ShopModal
          constName={modalShop}
          functionName={toggleShop}
          pageDetails={brandPageDetail}
        />
        <TaxiModal
          constName={modalTaxi}
          functionName={toggleTaxi}
          pageDetails={brandPageDetail}
        />
        <FoodTruckModal
          constName={modalFoodTruck}
          functionName={toggleFoodTruck}
          pageDetails={brandPageDetail}
        />
        <StrandorteLocationModal
          constName={modalStrandorteLocation}
          functionName={toggleStrandorteLocation}
          pageDetails={brandPageDetail}
        />
        <FamilyAndFriendsModal
          constName={modalFamilyAndFriends}
          functionName={toggleFamilyAndFriends}
          pageDetails={brandPageDetail}
        />
        <ReservationModal
          constName={modalReservation}
          functionName={toggleReservation}
          pageDetails={brandPageDetail}
        />
        <ContactModal
          constName={modalContact}
          functionName={toggleContact}
          pageDetails={brandPageDetail}
        />
        <LostAndFoundModal
          constName={modalLostAndFound}
          functionName={toggleLostAndFound}
          pageDetails={brandPageDetail}
        />
      </React.Fragment>
    );
  } else {
    if (screenLoader) {
      return (
        <div className="row text-center" style={{ marginTop: "250px" }}>
          <div className="col-12">
            <div
              className="spinner-grow spinner-grow-md text-primary"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      );
    } else return <UserErrorPage errorText="Brand page not found" />;
  }
}

export default UserFormPage;
