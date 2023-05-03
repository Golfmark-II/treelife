function navigation(slider) {
  let wrapper, dots, arrowLeft, arrowRight;

  function markup(remove) {
    wrapperMarkup(remove);
    dotMarkup(remove);
    arrowMarkup(remove);
  }

  function removeElement(elment) {
    elment.parentNode.removeChild(elment);
  }
  function createDiv(className) {
    var div = document.createElement("div");
    var classNames = className.split(" ");
    classNames.forEach((name) => div.classList.add(name));
    return div;
  }

  function arrowMarkup(remove) {
    if (remove) {
      removeElement(arrowLeft);
      removeElement(arrowRight);
      return;
    }
    arrowLeft = createDiv("arrow arrow--left");
    arrowLeft.addEventListener("click", () => slider.prev());
    arrowRight = createDiv("arrow arrow--right");
    arrowRight.addEventListener("click", () => slider.next());

    wrapper.appendChild(arrowLeft);
    wrapper.appendChild(arrowRight);
  }

  function wrapperMarkup(remove) {
    if (remove) {
      var parent = wrapper.parentNode;
      while (wrapper.firstChild)
        parent.insertBefore(wrapper.firstChild, wrapper);
      removeElement(wrapper);
      return;
    }
    wrapper = createDiv("navigation-wrapper");
    slider.container.parentNode.appendChild(wrapper);
    wrapper.appendChild(slider.container);
  }

  function dotMarkup(remove) {
    if (remove) {
      removeElement(dots);
      return;
    }
    dots = createDiv("dots");
    slider.track.details.slides.forEach((_e, idx) => {
      var dot = createDiv("dot");
      dot.addEventListener("click", () => slider.moveToIdx(idx));
      dots.appendChild(dot);
    });
    wrapper.appendChild(dots);
  }

  function updateClasses() {
    var slide = slider.track.details.rel;
    slide === 0
      ? arrowLeft.classList.add("arrow--disabled")
      : arrowLeft.classList.remove("arrow--disabled");
    slide === slider.track.details.slides.length - 1
      ? arrowRight.classList.add("arrow--disabled")
      : arrowRight.classList.remove("arrow--disabled");
    Array.from(dots.children).forEach(function (dot, idx) {
      idx === slide
        ? dot.classList.add("dot--active")
        : dot.classList.remove("dot--active");
    });
  }

  slider.on("created", () => {
    markup();
    updateClasses();
  });
  slider.on("optionsChanged", () => {
    console.log(2);
    markup(true);
    markup();
    updateClasses();
  });
  slider.on("slideChanged", () => {
    updateClasses();
  });
  slider.on("destroyed", () => {
    markup(true);
  });
}

var slider = new KeenSlider(
  "#my-keen-slider",
  {
    breakpoints: {
      "(min-width: 1000px)": {
        slides: { perView: 4, spacing: 25 },
      },
    },
    slides: { perView: 1 },
  },
  [navigation]
);

//
//  SLIDER 1 V2
//

function navigation2(slider) {
  let wrapper, dots, arrowLeft, arrowRight;

  function markup(remove) {
    wrapperMarkup(remove);
    dotMarkup(remove);
    arrowMarkup(remove);
  }

  function removeElement(elment) {
    elment.parentNode.removeChild(elment);
  }
  function createDiv(className) {
    var div = document.createElement("div");
    var classNames = className.split(" ");
    classNames.forEach((name) => div.classList.add(name));
    return div;
  }

  function arrowMarkup(remove) {
    if (remove) {
      removeElement(arrowLeft);
      removeElement(arrowRight);
      return;
    }
    arrowLeft = createDiv("arrow arrow--left2");
    arrowLeft.addEventListener("click", () => slider.prev());
    arrowRight = createDiv("arrow arrow--right2");
    arrowRight.addEventListener("click", () => slider.next());

    wrapper.appendChild(arrowLeft);
    wrapper.appendChild(arrowRight);
  }

  function wrapperMarkup(remove) {
    if (remove) {
      var parent = wrapper.parentNode;
      while (wrapper.firstChild)
        parent.insertBefore(wrapper.firstChild, wrapper);
      removeElement(wrapper);
      return;
    }
    wrapper = createDiv("navigation-wrapper");
    slider.container.parentNode.appendChild(wrapper);
    wrapper.appendChild(slider.container);
  }

  function dotMarkup(remove) {
    if (remove) {
      removeElement(dots);
      return;
    }
    dots = createDiv("dots");
    slider.track.details.slides.forEach((_e, idx) => {
      var dot = createDiv("dot");
      dot.addEventListener("click", () => slider.moveToIdx(idx));
      dots.appendChild(dot);
    });
    wrapper.appendChild(dots);
  }

  function updateClasses() {
    var slide = slider.track.details.rel;
    slide === 0
      ? arrowLeft.classList.add("arrow--disabled")
      : arrowLeft.classList.remove("arrow--disabled");
    slide === slider.track.details.slides.length - 1
      ? arrowRight.classList.add("arrow--disabled")
      : arrowRight.classList.remove("arrow--disabled");
    Array.from(dots.children).forEach(function (dot, idx) {
      idx === slide
        ? dot.classList.add("dot--active")
        : dot.classList.remove("dot--active");
    });
  }

  slider.on("created", () => {
    markup();
    updateClasses();
  });
  slider.on("optionsChanged", () => {
    console.log(2);
    markup(true);
    markup();
    updateClasses();
  });
  slider.on("slideChanged", () => {
    updateClasses();
  });
  slider.on("destroyed", () => {
    markup(true);
  });
}
var animation = { duration: 40000, easing: (t) => t };
var slider = new KeenSlider(
  "#my-keen-slider1-2",
  {
    loop: true,
    renderMode: "performance",
    // drag: false,

    // Auto Slide
    // created(s) {
    //   s.moveToIdx(5, true, animation)
    // },
    // updated(s) {
    //   s.moveToIdx(s.track.details.abs + 5, true, animation)
    // },
    // animationEnded(s) {
    //   s.moveToIdx(s.track.details.abs + 5, true, animation)
    // },

    breakpoints: {
      "(min-width: 1000px)": {
        slides: { perView: 4, spacing: 15 },
      },
    },
    slides: { perView: 1.4, spacing: 20 },
  },
  // [navigation2]
  // Auto switch
  [
    navigation2,
    (slider) => {
      let timeout;
      let mouseOver = false;
      function clearNextTimeout() {
        clearTimeout(timeout);
      }
      function nextTimeout() {
        clearTimeout(timeout);
        if (mouseOver) return;
        timeout = setTimeout(() => {
          slider.next();
        }, 4000);
      }
      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true;
          clearNextTimeout();
        });
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false;
          nextTimeout();
        });
        nextTimeout();
      });
      slider.on("dragStarted", clearNextTimeout);
      slider.on("animationEnded", nextTimeout);
      slider.on("updated", nextTimeout);
    },
  ]
);

//
//  SLIDER 2
//
var slider = new KeenSlider(
  "#my-keen-slider1-3",
  {
    // First slide
    loop: true,
    renderMode: "performance",
    slides: { perView: 1, spacing: 20 },
  },
  // [navigation2]
  // Auto switch
  [
    navigation2,
    (slider) => {
      let timeout;
      let mouseOver = false;
      function clearNextTimeout() {
        clearTimeout(timeout);
      }
      function nextTimeout() {
        clearTimeout(timeout);
        if (mouseOver) return;
        timeout = setTimeout(() => {
          slider.next();
        }, 15000);
      }
      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true;
          clearNextTimeout();
        });
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false;
          nextTimeout();
        });
        nextTimeout();
      });
      slider.on("dragStarted", clearNextTimeout);
      slider.on("animationEnded", nextTimeout);
      slider.on("updated", nextTimeout);
    },
  ]
);

function navigation2(slider) {
  let wrapper, dots, arrowLeft, arrowRight;

  function markup(remove) {
    wrapperMarkup(remove);
    dotMarkup(remove);
    arrowMarkup(remove);
  }

  function removeElement(elment) {
    elment.parentNode.removeChild(elment);
  }
  function createDiv(className) {
    var div = document.createElement("div");
    var classNames = className.split(" ");
    classNames.forEach((name) => div.classList.add(name));
    return div;
  }

  function arrowMarkup(remove) {
    if (remove) {
      removeElement(arrowLeft);
      removeElement(arrowRight);
      return;
    }
    arrowLeft = createDiv("arrow arrow--left2");
    arrowLeft.addEventListener("click", () => slider.prev());
    arrowRight = createDiv("arrow arrow--right2");
    arrowRight.addEventListener("click", () => slider.next());

    wrapper.appendChild(arrowLeft);
    wrapper.appendChild(arrowRight);
  }

  function wrapperMarkup(remove) {
    if (remove) {
      var parent = wrapper.parentNode;
      while (wrapper.firstChild)
        parent.insertBefore(wrapper.firstChild, wrapper);
      removeElement(wrapper);
      return;
    }
    wrapper = createDiv("navigation-wrapper");
    slider.container.parentNode.appendChild(wrapper);
    wrapper.appendChild(slider.container);
  }

  function dotMarkup(remove) {
    if (remove) {
      removeElement(dots);
      return;
    }
    dots = createDiv("dots");
    slider.track.details.slides.forEach((_e, idx) => {
      var dot = createDiv("dot");
      dot.addEventListener("click", () => slider.moveToIdx(idx));
      dots.appendChild(dot);
    });
    wrapper.appendChild(dots);
  }

  function updateClasses() {
    var slide = slider.track.details.rel;
    slide === 0
      ? arrowLeft.classList.add("arrow--disabled")
      : arrowLeft.classList.remove("arrow--disabled");
    slide === slider.track.details.slides.length - 1
      ? arrowRight.classList.add("arrow--disabled")
      : arrowRight.classList.remove("arrow--disabled");
    Array.from(dots.children).forEach(function (dot, idx) {
      idx === slide
        ? dot.classList.add("dot--active")
        : dot.classList.remove("dot--active");
    });
  }

  slider.on("created", () => {
    markup();
    updateClasses();
  });
  slider.on("optionsChanged", () => {
    console.log(2);
    markup(true);
    markup();
    updateClasses();
  });
  slider.on("slideChanged", () => {
    updateClasses();
  });
  slider.on("destroyed", () => {
    markup(true);
  });
}
var slider = new KeenSlider(
  "#my-keen-slider2",
  {
    loop:true,
    slides: { perView: 1 },
  },
  [navigation2]
);

//
//  SLIDER 3
//

function navigation2(slider) {
  let wrapper, dots, arrowLeft, arrowRight;

  function markup(remove) {
    wrapperMarkup(remove);
    dotMarkup(remove);
    arrowMarkup(remove);
  }

  function removeElement(elment) {
    elment.parentNode.removeChild(elment);
  }
  function createDiv(className) {
    var div = document.createElement("div");
    var classNames = className.split(" ");
    classNames.forEach((name) => div.classList.add(name));
    return div;
  }

  function arrowMarkup(remove) {
    if (remove) {
      removeElement(arrowLeft);
      removeElement(arrowRight);
      return;
    }
    arrowLeft = createDiv("arrow arrow--left2");
    arrowLeft.addEventListener("click", () => slider.prev());
    arrowRight = createDiv("arrow arrow--right2");
    arrowRight.addEventListener("click", () => slider.next());

    wrapper.appendChild(arrowLeft);
    wrapper.appendChild(arrowRight);
  }

  function wrapperMarkup(remove) {
    if (remove) {
      var parent = wrapper.parentNode;
      while (wrapper.firstChild)
        parent.insertBefore(wrapper.firstChild, wrapper);
      removeElement(wrapper);
      return;
    }
    wrapper = createDiv("navigation-wrapper");
    slider.container.parentNode.appendChild(wrapper);
    wrapper.appendChild(slider.container);
  }

  function dotMarkup(remove) {
    if (remove) {
      removeElement(dots);
      return;
    }
    dots = createDiv("dots");
    slider.track.details.slides.forEach((_e, idx) => {
      var dot = createDiv("dot");
      dot.addEventListener("click", () => slider.moveToIdx(idx));
      dots.appendChild(dot);
    });
    wrapper.appendChild(dots);
  }

  function updateClasses() {
    var slide = slider.track.details.rel;
    slide === 0
      ? arrowLeft.classList.add("arrow--disabled")
      : arrowLeft.classList.remove("arrow--disabled");
    slide === slider.track.details.slides.length - 1
      ? arrowRight.classList.add("arrow--disabled")
      : arrowRight.classList.remove("arrow--disabled");
    Array.from(dots.children).forEach(function (dot, idx) {
      idx === slide
        ? dot.classList.add("dot--active")
        : dot.classList.remove("dot--active");
    });
  }

  slider.on("created", () => {
    markup();
    updateClasses();
  });
  slider.on("optionsChanged", () => {
    console.log(2);
    markup(true);
    markup();
    updateClasses();
  });
  slider.on("slideChanged", () => {
    updateClasses();
  });
  slider.on("destroyed", () => {
    markup(true);
  });
}


var slider = new KeenSlider(
  "#my-keen-slider3",
  {
    breakpoints: {
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 10 },
      },
    },
    loop:true, // for loop slide
    slides: { perView: 1 },
  },
  [navigation2]
);

// customer-keen-slider
//
var slider = new KeenSlider(
  "#customer-keen-slider1",
  {
    breakpoints: {
      "(min-width: 900px)": {
        slides: { perView: 8, spacing: 20 },
      },
    },
    slides: { perView: 4, spacing: 20 },
  },
  [
    (slider) => {
      let timeout;
      let mouseOver = false;
      function clearNextTimeout() {
        clearTimeout(timeout);
      }
      function nextTimeout() {
        clearTimeout(timeout);
        if (mouseOver) return;
        timeout = setTimeout(() => {
          slider.next();
        }, 2000);
      }
      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true;
          clearNextTimeout();
        });
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false;
          nextTimeout();
        });
        nextTimeout();
      });
      slider.on("dragStarted", clearNextTimeout);
      slider.on("animationEnded", nextTimeout);
      slider.on("updated", nextTimeout);
    },
  ]
);
var slider = new KeenSlider(
  "#customer-keen-slider2",
  {
    breakpoints: {
      "(min-width: 900px)": {
        slides: { perView: 8, spacing: 20 },
      },
    },
    slides: { perView: 4, spacing: 20 },
  },
  [
    (slider) => {
      let timeout;
      let mouseOver = false;
      function clearNextTimeout() {
        clearTimeout(timeout);
      }
      function nextTimeout() {
        clearTimeout(timeout);
        if (mouseOver) return;
        timeout = setTimeout(() => {
          slider.next();
        }, 2000);
      }
      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true;
          clearNextTimeout();
        });
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false;
          nextTimeout();
        });
        nextTimeout();
      });
      slider.on("dragStarted", clearNextTimeout);
      slider.on("animationEnded", nextTimeout);
      slider.on("updated", nextTimeout);
    },
  ]
);
var slider = new KeenSlider(
  "#customer-keen-slider3",
  {
    breakpoints: {
      "(min-width: 900px)": {
        slides: { perView: 8, spacing: 20 },
      },
    },
    slides: { perView: 4, spacing: 20 },
  },
  [
    (slider) => {
      let timeout;
      let mouseOver = false;
      function clearNextTimeout() {
        clearTimeout(timeout);
      }
      function nextTimeout() {
        clearTimeout(timeout);
        if (mouseOver) return;
        timeout = setTimeout(() => {
          slider.next();
        }, 2000);
      }
      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true;
          clearNextTimeout();
        });
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false;
          nextTimeout();
        });
        nextTimeout();
      });
      slider.on("dragStarted", clearNextTimeout);
      slider.on("animationEnded", nextTimeout);
      slider.on("updated", nextTimeout);
    },
  ]
);
var slider = new KeenSlider(
  "#customer-keen-slider4",
  {
    breakpoints: {
      "(min-width: 900px)": {
        slides: { perView: 8, spacing: 20 },
      },
    },
    slides: { perView: 4, spacing: 20 },
  },
  [
    (slider) => {
      let timeout;
      let mouseOver = false;
      function clearNextTimeout() {
        clearTimeout(timeout);
      }
      function nextTimeout() {
        clearTimeout(timeout);
        if (mouseOver) return;
        timeout = setTimeout(() => {
          slider.next();
        }, 2000);
      }
      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true;
          clearNextTimeout();
        });
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false;
          nextTimeout();
        });
        nextTimeout();
      });
      slider.on("dragStarted", clearNextTimeout);
      slider.on("animationEnded", nextTimeout);
      slider.on("updated", nextTimeout);
    },
  ]
);
var slider = new KeenSlider(
  "#customer-keen-slider5",
  {
    breakpoints: {
      "(min-width: 900px)": {
        slides: { perView: 8, spacing: 20 },
      },
    },
    slides: { perView: 4, spacing: 20 },
  },
  [
    (slider) => {
      let timeout;
      let mouseOver = false;
      function clearNextTimeout() {
        clearTimeout(timeout);
      }
      function nextTimeout() {
        clearTimeout(timeout);
        if (mouseOver) return;
        timeout = setTimeout(() => {
          slider.next();
        }, 2000);
      }
      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true;
          clearNextTimeout();
        });
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false;
          nextTimeout();
        });
        nextTimeout();
      });
      slider.on("dragStarted", clearNextTimeout);
      slider.on("animationEnded", nextTimeout);
      slider.on("updated", nextTimeout);
    },
  ]
);
var slider = new KeenSlider(
  "#customer-keen-slider6",
  {
    breakpoints: {
      "(min-width: 900px)": {
        slides: { perView: 8, spacing: 20 },
      },
    },
    slides: { perView: 4, spacing: 20 },
  },
  [
    (slider) => {
      let timeout;
      let mouseOver = false;
      function clearNextTimeout() {
        clearTimeout(timeout);
      }
      function nextTimeout() {
        clearTimeout(timeout);
        if (mouseOver) return;
        timeout = setTimeout(() => {
          slider.next();
        }, 2000);
      }
      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true;
          clearNextTimeout();
        });
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false;
          nextTimeout();
        });
        nextTimeout();
      });
      slider.on("dragStarted", clearNextTimeout);
      slider.on("animationEnded", nextTimeout);
      slider.on("updated", nextTimeout);
    },
  ]
);
if ($(window).width() < 900) {
  var animationCustom = { duration: 50000, easing: (t) => t };
  var slider = new KeenSlider("#customer-keen-slider-master", {
    breakpoints: {
      "(min-width: 900px)": {
        slides: { perView: 2, spacing: 20 },
      },
    },
    slides: { perView: 1, spacing: 20 },

    loop: true,
    renderMode: "performance",
    // drag: false,
    drag: true,
    created(s) {
      s.moveToIdx(5, true, animationCustom);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animationCustom);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animationCustom);
    },
  });
} else {
  var slider = new KeenSlider("#customer-keen-slider-master", {
    breakpoints: {
      "(min-width: 900px)": {
        slides: { perView: 2, spacing: 20 },
      },
    },
    slides: { perView: 1, spacing: 20 },
    drag: false,
  });
}

// menu
var homeLink = document.querySelector("#homeLink");
var packageLink = document.querySelector("#packageLink");

packageLink?.addEventListener(
  "click",
  function () {
    console.log("packageLink Clicked");
    packageLink.classList.add("li-nav-active");
    homeLink.classList.remove("li-nav-active");
      document.querySelector("#package").scrollIntoView({ behavior: "smooth" });
  });
    

  // H3_2Link?.addEventListener("click", function () {
  //   const H3_2 = document.getElementById("H3_2");
  //   if (!H3_2.classList.contains("scroll-margin")) {
  //     H3_2.classList.add("scroll-margin");
  //   }
  //   H3_2.scrollIntoView(); // Goto element
  // });
// if (location.href.indexOf("#") != -1) {
//   packageLink.classList.add("li-nav-active");
//   homeLink.classList.remove("li-nav-active");
//   setInterval(function () {
//     document.querySelector("#package").scrollIntoView({ behavior: "smooth" });
//   }, 2000);
// }

// preload 
var preload = document.getElementById("preload");
preload?.removeAttribute("style");






/* JavaScript */
const dropdownBtn = document.querySelector(".dropbtn");
const dropdownContent = document.querySelector(".dropdown-content");

dropdownBtn.addEventListener("click", function() {
  dropdownContent.classList.toggle("show");
});

window.addEventListener("click", function(event) {
  if (!event.target.matches(".dropbtn")) {
    if (dropdownContent.classList.contains("show")) {
      dropdownContent.classList.remove("show");
    }
  }
});