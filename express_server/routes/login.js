"use strict";

var express = require("express");
var loginRouter = express.Router();
const sql = require("../db.js");

loginRouter.post("/login", function(req, res) {
  let email = req.body.contactEmail;
  let passwordHash = req.body.passwordHash;

  if (email && passwordHash) {
    sql.query(
      "SELECT * FROM admin WHERE email = ? AND password_hash = ?",
      [email, passwordHash],
      function(err, results) {
        if (err) {
          return res.status(500).send(err);
        }
        if (results.length > 0) {
          req.session.loggedin = true;
          req.session.email = email;
          req.session.isAdmin = true;
          req.session.partnerType = "";
          res.status(200).send({
            email: email,
            isAdmin: true,
            partnerType: ""
          });
        } else {
          sql.query(
            "SELECT * FROM restaurant_partners WHERE contact_email = ? AND password_hash = ?",
            [email, passwordHash],
            function(err, results, fields) {
              if (err) {
                return res.status(500).send(err);
              }
              if (results.length > 0) {
                req.session.loggedin = true;
                req.session.email = email;
                req.session.isAdmin = false;
                req.session.partnerType = "restaurant";
                res.status(200).send({
                  email: email,
                  isAdmin: false,
                  partnerType: "restaurant"
                });
              } else {
                sql.query(
                  "SELECT * FROM program_partners WHERE email = ? AND password_hash = ?",
                  [email, passwordHash],
                  function(err, results, fields) {
                    if (err) {
                      return res.status(500).send(err);
                    }
                    if (results.length > 0) {
                      req.session.loggedin = true;
                      req.session.email = email;
                      req.session.isAdmin = false;
                      req.session.partnerType = "program";
                      res.status(200).send({
                        email: email,
                        isAdmin: false,
                        partnerType: "program"
                      });
                    } else {
                      sql.query(
                        "SELECT * FROM courier_partners WHERE email = ? AND password_hash = ?",
                        [email, passwordHash],
                        function(err, results, fields) {
                          if (err) {
                            return res.status(500).send(err);
                          }
                          if (results.length > 0) {
                            req.session.loggedin = true;
                            req.session.email = email;
                            req.session.isAdmin = false;
                            req.session.partnerType = "courier";
                            res.status(200).send({
                              email: email,
                              isAdmin: false,
                              partnerType: "courier"
                            });
                          } else {
                            res
                              .status(401)
                              .send("Incorrect email and/or password!");
                          }
                          res.end();
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } else {
    res.status(400).send("Please enter email and password!");
    res.end();
  }
});

loginRouter.get("/validate-login", function(req, res) {
  if (req.session.loggedin) {
    if (req.session.loggedin === true) {
      res.status(200).send({
        email: req.session.email,
        partnerType: req.session.partnerType,
        isAdmin: req.session.isAdmin
      });
    }
  } else {
    res.status(401).send(false);
  }
});

loginRouter.get("/validate-admin", function(req, res) {
  if (req.session.loggedin === true && req.session.isAdmin === true) {
    res.status(200).send(req.session.email);
  } else {
    res.status(401).send(false);
  }
});

loginRouter.get("/get-partner-type", function(req, res) {
  if (req.session.loggedin === true) {
    let partnerType = req.session.partnerType;
    res.status(200).send(partnerType);
  } else {
    res.status(401).send(false);
  }
});

loginRouter.get("/logout", function(req, res) {
  if (req.session.loggedin === true) {
    req.session.loggedin = false;
    req.session.email = null;
    req.session.isAdmin = null;

    res.status(200).send("Logged out.");
  } else {
    res.status(304);
    console.log("req.session.loggedin is undefined or not true");
  }
});

module.exports = loginRouter;
