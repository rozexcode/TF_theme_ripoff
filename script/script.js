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

// image-filter

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
    // console.log(toBeHidden);

    setTimeout(function () {
      toBeHidden.forEach((img) => img.classList.add("hidden"));
    }, 300);

    toBeShown.forEach((img, i) => {
      img.style.transform = `translate(${
        getHorizontal(Number(img.dataset.num), i) * 100
      }%, ${getVertical(Number(img.dataset.num), i) * -100}%)`;

      getHorizontal(img.dataset.num, i);
      getVertical(img.dataset.num, i);

      // setTimeout(function () {
      //   section1Imgs.forEach((img) => {
      //     img.style.transform = `translate(0%, 0%)`;
      //     img.classList.add("temporary-transition");
      //     setTimeout(() => {
      //       img.classList.remove("temporary-transition");
      //     }, 0);
      //   });
      // }, 300);

      // setTimeout(function () {
      //   section1Imgs.forEach((img) => {
      //     img.style.transition = `all 0.3s ease`;
      //   });
      // }, 2000);
    });

    console.log(toBeShown);
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

// console.log(section1Imgs.filter((img) => img.classList.contains("web-design")));

// make the selectors work and onclick return data on which value the images will be sorted by [ex. graphic-design when clicking Grasphic-design]
// display only images with given class

//imgs have class hidden
//all removes hidden from all elements
// web-design removes hidden only from web-design class

const { height, top: topPos, width } = section1Imgs[0].getBoundingClientRect();
const imgPos = section1Imgs[0].getBoundingClientRect();

console.log(imgPos);
console.log(height, topPos, width);

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

/*


IMGS

even  odd
 [0] [1]
 [2] [3]
 [4] [5]
 [6] [7]
 [8] [9]


// even numbers are transformed by 


  HOW TO CALC WHICH COLUMN:
    if picNum is odd, => 
      if desiredPos is odd transformX = 0;
      if desiredPos is even transform = -100%
    if picNum is even, => 
      if desiredPos is odd transformX = 100%;
      if desiredPos is even transform = 0;

  EXAMPLE:
    I want pic5 to become pic0: 
      pic5 is odd && desiredPos [0] is even => -100%


  HOW TO CALCULATE WHICH ROW:
    picNum 
  
    take picNum and substract the posNum
    then divide it by 2
      if result %2 === 0 => transform by result

      if result !%2 === 0:
        if desiredPos is EVEN => transform by Math.floor(result)
        if desiredPos is ODD => transform by Math.ceil(result)




// THINKING

     [stupid names but i came up with proper solution mid thinking
      [up] means  ↑ 
      [-up] means ↓ 
     ]

    WHEN desiredPos is EVEN, roundDown (math.floor)
      7-0 = 7
      7/2 = 3.5 => 3up
      
      6-0 = 6
      6/2 = 3 => 3up

      5-2 = 3
      3/2 = 1.5 1up

      2-0 = 2
      2/2 = 1 1up

      9-2 = 7
      7/2 = 3.5 3up

      1-6 = -5
      -5/2 = -2.5 -3up

      8-2 = 6
      6/2 = 3 3up

      2-6 = -4
      -4/2 = -2 -2up

    
      WHEN desiredPos is ODD, roundUp (math.ceil)
      8-3 = 5
      5/2 = 2.5 3up

      6-1 = 5
      5/2 = 2,5 3up

      8-1 = 7
      7/2 = 3,5 = 4up

      9-1 = 8
      8/2 = 4 4up
      

      0-5 = -5
      -5/2 = -2.5 -2up

      4-9 = -5
      -5/2 = -2.5 -2up

      0-9 = -9
      -9/2 = -4.5 -4up




      EXCEPTIONS
      7-3 = 4
      4/2 = 2up

      9-3= 6
      6/2 = 3up
      

*/
