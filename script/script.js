"use strict";
const body = document.querySelector("body");
const nav = document.querySelector("header");
const switchModeButton = document.querySelector("#switchMode");

const sectionIntro = document.querySelector(".section__intro");
const sectionIntroClasses = sectionIntro.classList;
const section1 = document.querySelector("#section__1");
const section1Classes = section1.classList;

const goDown = document.querySelector(".go-down");

// goDown functionality
const handler = function () {
  section1.scrollIntoView({ behavior: "smooth" });
};

goDown.addEventListener("click", handler);

// Night Mode functionality

switchModeButton.addEventListener("click", function (e) {
  const nightModeIntro = "nightMode--sectionIntro";

  if (body.classList.contains("nightMode")) {
    body.classList.remove("nightMode");
    sectionIntroClasses.remove(nightModeIntro);
    section1Classes.remove("nightMode");
    section1.children[1].style.color = "#7d7d7d";

    //
  } else {
    body.classList.add("nightMode");
    sectionIntroClasses.add(nightModeIntro);
    section1Classes.add("nightMode");
    section1.children[1].style.color = "white";
  }
});
