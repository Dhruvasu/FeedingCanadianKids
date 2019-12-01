import React from "react";
import { Image } from "react-bootstrap";
import FeedingCKKids from "../../img/FeedingCK-kids.png";
import "./HomePage.css";

class HomePage extends React.Component {
  render() {
    return (
      <div id="HomeMessage">
        <h1>Welcome to Feeding Canadian Kids</h1>
        <h2>In order to participate, please register and await approval.</h2>
        <h2>
          If you have registered and are approved, feel free to log in and feed some kids :)
        </h2>
        <Image className="HomeMessage-Image" src={FeedingCKKids}></Image>
      </div>
    );
  }
}
export default HomePage;
