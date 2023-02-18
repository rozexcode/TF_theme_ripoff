"use strict";

const imgFilterNav = document.querySelector("#filters");
const section1ImgContainer = document.querySelector(".section__1__photos");
const section1Imgs = document.querySelectorAll(".photo");
const imgFilterNavSelectors = document.querySelectorAll(".filter");
let selectedFilter = "all";
let toBeShown;

const displayImgs = function (type) {
  if (type === "all") {
    section1Imgs.forEach((img) => {
      img.classList.remove("hidden");
    });
    setTimeout(function () {
      section1Imgs.forEach((img) => {
        img.classList.remove("visually-hidden");
        img.style.transform = `translate(0%, 0%)`;
      });
    }, 300);
  } else {
    toBeShown = Array.prototype.filter.call(section1Imgs, (el) =>
      el.classList.contains(type)
    );
    let toBeHidden = Array.prototype.filter.call(
      section1Imgs,
      (el) => !el.classList.contains(type)
    );

    section1Imgs.forEach((img) => {
      img.classList.add("visually-hidden");
    });
    toBeShown.forEach((img) => img.classList.remove("visually-hidden"));
    toBeShown.forEach((img) => img.classList.remove("hidden"));

    if (window.innerWidth > 600) {
      toBeShown.forEach((img, i) => {
        img.style.transform = `translate(${
          getHorizontal(Number(img.dataset.num), i) * 100
        }%, ${getVertical(Number(img.dataset.num), i) * -100}%)`;
      });
    } else {
      toBeHidden.forEach((img) => img.classList.add("hidden"));
    }
  }
};

const filterImgs = function (e) {
  if (
    e.target.classList.contains("filter") &&
    !e.target.classList.contains("filter--active")
  ) {
    imgFilterNavSelectors.forEach((element) => {
      element.classList.remove("filter--active");
    });
    e.target.classList.add("filter--active");
    selectedFilter = e.target.dataset.filter;
    displayImgs(selectedFilter);
  }
};

imgFilterNav.addEventListener("click", filterImgs.bind(this));

const getHorizontal = function (imgNum, desPos) {
  let horizontal;
  if (imgNum % 2 === 0) {
    horizontal = desPos % 2 === 0 ? 0 : 1;
  } else {
    horizontal = desPos % 2 === 0 ? -1 : 0;
  }
  console.log(`horizontal: ${horizontal * 100}%`);
  return horizontal;
};

const getVertical = function (imgNum, desPos) {
  let vertical;

  const result = (imgNum - desPos) / 2;

  if (result % 2 === 0) vertical = result;
  else
    desPos % 2 === 0
      ? (vertical = Math.floor(result))
      : (vertical = Math.ceil(result));

  console.log(`vertical: ${vertical * 100}%`);
  return vertical;
};
