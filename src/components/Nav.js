import React, { useState, useEffect } from "react";
import "./../Nav.css";

const netflix_logo_src_url =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1597px-Netflix_2015_logo.svg.png";
const netflix_avatar_src_url =
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png";

function Nav() {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      handleShow(window.scrollY > 100);
    });
    return () => {
      // cleanup
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src={netflix_logo_src_url}
        alt="Netflix Logo"
      />
      <img
        className="nav__avatar"
        src={netflix_avatar_src_url}
        alt="Netflix Avatar"
      />
    </div>
  );
}

export default Nav;
