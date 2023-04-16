/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function Team() {
  let message = `Simplifying your medical needs everyday`;
  return (
    <section className="section-white">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center" style={{textAlign: 'center'}}>
            <h1 className="section-title">The Team Behind MedEZ</h1>

            <p className="section-subtitle">{message}</p>
          </div>
          <div className="rowCustom">
            <div className="columnCustom">
            <div className="col-sm-6 col-md-3">
            <div className="team-item" style={{height: '100vh',}}>
              <img src="./pfps/asnani.jpeg" className="team-img" alt="pic" />
              <h3>Raunak Asnani</h3>
              <div className="team-info">
                <p>The Python</p>
              </div>
              <p>
                Raunak is a backend developer with over 5 years of experience
                and can fiddle easily with almost any tech stack that has ever
                existed
              </p>

              <ul className="team-icon">
                <li>
                  <a
                    href="https://www.linkedin.com/in/raunak-asnani/"
                    className="linkedin"
                    style={{ background: "blue" }}
                    target="blank"
                  >
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>

                <li>
                  <a
                    href="https://github.com/imraunn"
                    className="github"
                    style={{ background: "black" }}
                  >
                    <i className="fa fa-github"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="telegram"
                    style={{ background: "#0088cc" }}
                  >
                    <i className="fa fa-telegram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
            </div>
            <div className="columnCustom">
            <div className="col-sm-6 col-md-3">
            <div className="team-item" style={{height: '100vh',}}>
              <img src="./pfps/milan.jpeg" className="team-img" alt="pic" />
              <h3>Milan Mundhra</h3>
              <div className="team-info">
                <p>The API Maestro</p>
              </div>
              <p>
                Milan is our frontend specialist responsible for handling the
                code on the client side
              </p>

              <ul className="team-icon">
                <li>
                  <a
                    href="https://www.linkedin.com/in/milanmundhra27/"
                    className="linkedin"
                    style={{ background: "blue" }}
                    target="blank"
                  >
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>

                <li>
                  <a
                    href="https://github.com/milan0027"
                    className="github"
                    style={{ background: "black" }}
                  >
                    <i className="fa fa-github"></i>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="telegram"
                    style={{ background: "#0088cc" }}
                  >
                    <i className="fa fa-telegram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
            </div>
            <div className="columnCustom">
            <div className="col-sm-6 col-md-3">
            <div className="team-item" style={{height: '100vh',}}>
              <img src="./pfps/muli.jpeg" className="team-img" alt="pic" />

              <h3>Malav Thakkar</h3>

              <div className="team-info">
                <p>The All Rounder</p>
              </div>

              <p>
                Malav has a ton of industrial experience and his insights are
                often valuable in building the product
              </p>

              <ul className="team-icon">
                <li>
                  <a
                    href="https://www.linkedin.com/in/malav-thakkar-011517200/"
                    className="linkedin"
                    style={{ background: "blue" }}
                    target="blank"
                  >
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>

                <li>
                  <a
                    href="https://github.com/malav22"
                    className="github"
                    style={{ background: "black" }}
                  >
                    <i className="fa fa-github"></i>
                  </a>
                </li>

                <li>
                  <a
                    href="https://telegram.me/"
                    className="telegram"
                    style={{ background: "#0088cc" }}
                  >
                    <i className="fa fa-telegram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
            </div>
            <div className="columnCustom">
            <div className="col-sm-6 col-md-3">
            <div className="team-item" style={{height: '100vh',}}>
              <img src="./pfps/mayank.jpeg" className="team-img" alt="pic" />

              <h3>Mayank Narang</h3>

              <div className="team-info">
                <p>The Curious Geek</p>
              </div>

              <p>
                Mayank has a knack for learning tech and is another all rounder
                team player with an overall experience of development
              </p>
              <ul className="team-icon">
                <li>
                  <a
                    href="https://www.linkedin.com/in/mayank-narang-a9562a202/"
                    className="linkedin"
                    style={{ background: "blue" }}
                    target="blank"
                  >
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>

                <li>
                  <a
                    href="https://github.com/Mayank2602"
                    className="github"
                    style={{ background: "black" }}
                  >
                    <i className="fa fa-github"></i>
                  </a>
                </li>

                <li>
                  <a
                    href="https://telegram.me/Mayank2602"
                    className="telegram"
                    style={{ background: "#0088cc" }}
                  >
                    <i className="fa fa-telegram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
            </div>
          </div>
          
          

          
          
      </div>
    </section>
  );
}
export default Team;
