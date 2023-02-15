let options = {
  rootMargin: "0px",
  threshold: 0.95,
};

let callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) nav.classList.remove("header--active");

    if (!entry.isIntersecting) nav.classList.add("header--active");
  });
};

let observer = new IntersectionObserver(callback, options);
observer.observe(sectionIntro);
