function initSlide() {
  const slider = new KeenSlider("#keen-slider", {
    breakpoints: {
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 0 },
      },
    },
    slides: { perView: 1 },
    slides: ".slider-item",
    loop: true,
    created: function (instance) {
      document
        .getElementById("arrow-left")
        .addEventListener("click", function () {
          instance.prev();
        });
      document
        .getElementById("arrow-right")
        .addEventListener("click", function () {
          instance.next();
        });
      var dots_wrapper = document.getElementById("dots");
      var slides = document.querySelectorAll(".slider-item");
      slides.forEach(function (t, idx) {
        var dot = document.createElement("button");
        dot.classList.add("dot");
        dots_wrapper.appendChild(dot);
        dot.addEventListener("click", function () {
          instance.moveToSlide(idx);
        });
      });
      updateClasses(instance);
    },
    slideChanged(instance) {
      updateClasses(instance);
    },
  });
  return slider;
}
function updateClasses(instance) {
  const slide = instance.details().relativeSlide;
  const dots = document.querySelectorAll(".dot");
  dots.forEach(function (dot, idx) {
    idx === slide
      ? dot.classList.add("dot--active")
      : dot.classList.remove("dot--active");
  });
}
function changeImage() {
  let i = 1;
  const imageDom = document.getElementById("mobile-image");
  setInterval(function () {
    i++;
    if (i === 4) {
      i = 1;
    }
    let imageUrl = `/public/line-ui${i}.png`;
    imageDom.src = imageUrl;
  }, 3000);
}
function changeImage2() {
  let i = 1;
  const imageDom = document.getElementById("gif-image");
  if (imageDom) {
    setInterval(function () {
      i++;
      if (i === 5) {
        i = 1;
      }
      let imageUrl = `public/gif${i}.png`;
      imageDom.src = imageUrl;
    }, 3000);
  }
}
function changeImageCourse() {
  let i = 1;
  const imageDom = document.getElementById("course-img");
  if (imageDom) {
    setInterval(function () {
      i++;
      if (i === 3) {
        i = 1;
      }
      let imageUrl = `/public/course${i}.png`;
      imageDom.src = imageUrl;
    }, 3000);
  }
}
function changeImage2en() {
  let i = 1;
  const imageDom = document.getElementById("gif-image-en");
  if (imageDom) {
    setInterval(function () {
      i++;
      if (i === 5) {
        i = 1;
      }
      let imageUrl = `/public/pic-gif${i}.png`;
      imageDom.src = imageUrl;
    }, 3000);
  }
}
function changeImage3() {
  let i = 1;
  const imageDom = document.getElementById("gif-image-mobile");
  if (imageDom) {
    setInterval(function () {
      i++;
      if (i === 5) {
        i = 1;
      }
      let imageUrl = `/public/gif${i}-mobile.png`;
      imageDom.src = imageUrl;
    }, 3000);
  }
}
function changeImage3en() {
  let i = 1;
  const imageDom = document.getElementById("gif-image-mobile-en");
  if (imageDom) {
    setInterval(function () {
      i++;
      if (i === 5) {
        i = 1;
      }
      let imageUrl = `public/gif${i}-mobile-en.png`;
      imageDom.src = imageUrl;
    }, 3000);
  }
}
const submitContact = (dryRun) =>
  function () {
    var data = $("#contact-frm").serialize();
    if (!dryRun) {
      $.ajax({
        type: "POST",
        url: "contact-processing",
        data: data,
        beforeSend: function (data) {
          $(".contact-frm .block-loader").fadeIn("fast");
          $(".contact-frm :input").attr("disabled", "disabled");
          $(".contact-frm button").prop("disabled", true);
        },
        success: function (response) {
          console.log(response);
          $(".contact-frm .block-loader").fadeOut("slow");
          $(".contact-frm .contact-form-block").hide();
          $(".contact-frm .contact-response").html(response).fadeIn();
          $(".contact-frm :input").removeAttr("disabled");
          $(".contact-frm button").removeAttr("disabled");
          $(".contact-frm").trigger("reset");
          setTimeout(function () {
            $(".contact-frm .contact-response").html("").fadeOut();
            $(".contact-frm").trigger("reset");
          }, 8000);
        },
        error: function (xhr, status, error) {
          var errorMessage = xhr.status + ": " + xhr.statusText;
          console.log("Error - " + errorMessage);
        },
      });
    } else {
      console.log(data);
    }
  };
function initContactValidate() {
  $("#contact-frm").validate({
    rules: {
      customer_name: { required: true },
      customer_mobile: { required: true, number: true },
      customer_message: { required: true },
    },
    messages: {
      customer_name: {
        required: "à¸à¸£à¸¸à¸“à¸²à¸à¸£à¸­à¸ à¸Šà¸·à¹ˆà¸­à¸‚à¸­à¸‡à¸„à¸¸à¸“.",
      },
      customer_mobile: {
        required:
          "à¸à¸£à¸¸à¸“à¸²à¸à¸£à¸­à¸ à¹€à¸šà¸­à¸£à¹Œà¹‚à¸—à¸£à¸¨à¸±à¸žà¸—à¹Œà¸¡à¸·à¸­à¸–à¸·à¸­.",
        number:
          "à¸à¸£à¸¸à¸“à¸²à¸à¸£à¸­à¸à¹€à¸‰à¸žà¸²à¸°à¸•à¸±à¸§à¹€à¸¥à¸‚à¹€à¸—à¹ˆà¸²à¸™à¸±à¹‰à¸™.",
      },
      customer_message: {
        required:
          "à¸à¸£à¸¸à¸“à¸²à¸à¸£à¸­à¸à¸‚à¹‰à¸­à¸„à¸§à¸²à¸¡à¸‚à¸­à¸‡à¸„à¸¸à¸“.",
      },
    },
    submitHandler: submitContact(false),
  });
}
function createPhoneSection() {
  const phone = ["092-469-6254", "093-632-4416"];
  const first = Math.floor(Math.random() * 2);
  const second = first ? 0 : 1;
  const phoneToSHow = [phone[first], phone[second]];
  $("#phone-section").append(`
    <a href="tel:${phoneToSHow[0].split("-").join("")}" target="_blank"
      class="text-lg leading-tight a-nav mr-1">${phoneToSHow[0]},</a>
  `);
  $("#phone-section").append(`
    <a href="tel:${phoneToSHow[1].split("-").join("")}" target="_blank"
    class="text-lg leading-tight a-nav">${phoneToSHow[1]}</a>
  `);
  $("#phone-section-footer").append(`
    <span class="mr-1">${phoneToSHow[0]}, </span>
  `);
  $("#phone-section-footer").append(`
    <span class="">${phoneToSHow[1]}</span>
  `);
}
function initAcc() {
  let thumbnails = document
    .getElementById("slide-1")
    .getElementsByClassName("thumbnail");
  let activeImages = document
    .getElementById("slide-1")
    .getElementsByClassName("thumbnail-active");
  [0, 1, 2, 3].map(function (thumbnail, i) {
    thumbnails[i].addEventListener("click", function () {
      if (activeImages.length > 0) {
        activeImages[0].classList.remove("thumbnail-active");
      }
      imageNumber = i + 1;
      this.classList.add("thumbnail-active");
      document
        .getElementById("slide-1")
        .getElementsByClassName("featured")[0].src = this.src;
    });
  });
  let imageNumber = 1;
  setInterval(() => {
    if (imageNumber >= 4) {
      imageNumber = 0;
    }
    imageNumber++;
    thumbnails[imageNumber - 1].click();
  }, 2500);
  let thumbnails2 = document
    .getElementById("slide-2")
    .getElementsByClassName("thumbnail");
  let activeImages2 = document
    .getElementById("slide-2")
    .getElementsByClassName("thumbnail-active");
  [0, 1, 2, 3].map(function (thumbnail, i) {
    thumbnails2[i].addEventListener("click", function () {
      if (activeImages2.length > 0) {
        activeImages2[0].classList.remove("thumbnail-active");
      }
      imageNumber2 = i + 1;
      this.classList.add("thumbnail-active");
      document
        .getElementById("slide-2")
        .getElementsByClassName("featured")[0].src = this.src;
    });
  });
  let imageNumber2 = 1;
  setTimeout(() => {
    setInterval(() => {
      if (imageNumber2 >= 4) {
        imageNumber2 = 0;
      }
      imageNumber2++;
      thumbnails2[imageNumber2 - 1].click();
    }, 2500);
  }, 300);
  let thumbnails3 = document
    .getElementById("slide-3")
    .getElementsByClassName("thumbnail");
  let activeImages3 = document
    .getElementById("slide-3")
    .getElementsByClassName("thumbnail-active");
  [0, 1, 2, 3].map(function (thumbnail, i) {
    thumbnails3[i].addEventListener("click", function () {
      if (activeImages3.length > 0) {
        activeImages3[0].classList.remove("thumbnail-active");
      }
      imageNumber3 = i + 1;
      this.classList.add("thumbnail-active");
      document
        .getElementById("slide-3")
        .getElementsByClassName("featured")[0].src = this.src;
    });
  });
  let imageNumber3 = 1;
  setInterval(() => {
    if (imageNumber3 >= 4) {
      imageNumber3 = 0;
    }
    imageNumber3++;
    thumbnails3[imageNumber3 - 1].click();
  }, 2500);
  let thumbnails4 = document
    .getElementById("slide-4")
    .getElementsByClassName("thumbnail");
  let activeImages4 = document
    .getElementById("slide-4")
    .getElementsByClassName("thumbnail-active");
  [0, 1, 2, 3].map(function (thumbnail, i) {
    thumbnails4[i].addEventListener("click", function () {
      if (activeImages4.length > 0) {
        activeImages4[0].classList.remove("thumbnail-active");
      }
      imageNumber4 = i + 1;
      this.classList.add("thumbnail-active");
      document
        .getElementById("slide-4")
        .getElementsByClassName("featured")[0].src = this.src;
    });
  });
  let imageNumber4 = 1;
  setTimeout(() => {
    setInterval(() => {
      if (imageNumber4 >= 4) {
        imageNumber4 = 0;
      }
      imageNumber4++;
      thumbnails4[imageNumber4 - 1].click();
    }, 2500);
  }, 300);
}
function initModal() {
  var modal = document.getElementById("myModal");
  var btn = document.getElementById("myBtn");
  var span = document.getElementsByClassName("close")[0];
  btn.onclick = function () {
    modal.style.display = "block";
    if (window.innerWidth > 510) {
      $(".video-container").append(`
          <div class="youtube-wrapper y-wrapper w-full">
          <iframe class="iframe" width="100%" height="450"
            src="https://www.youtube.com/embed/jzgzercqUW0?enablejsapi=1&version=3&playerapiid=ytplayer&autoplay=1"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        </div>
          `);
    } else {
      $(".video-container").append(`
        <div class="youtube-wrapper y-wrapper-m w-full">
          <iframe class="iframe" width="100%" height="250"
            src="https://www.youtube.com/embed/jzgzercqUW0?enablejsapi=1&version=3&playerapiid=ytplayer&autoplay=1"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        </div>
          `);
    }
  };
  span.onclick = function () {
    modal.style.display = "none";
    $(".youtube-wrapper").remove();
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      $(".youtube-wrapper").remove();
    }
  };
}
function initnavscroll() {
  document.getElementById("package").addEventListener("click", function () {
    const packageSection = document.getElementById("package-section");
    if (packageSection) {
      setTimeout(() => {
        window.scroll({
          top: packageSection.offsetTop - 50,
          behavior: "smooth",
        });
      }, 200);
    } else {
      if (window.location.pathname.includes("/clinic/en")) {
        window.location.replace("/clinic/en/?acc=1");
      } else {
        window.location.replace("/clinic/?acc=1");
      }
    }
  });
}
function setHilight(id) {
  document.getElementById(id).classList.add("li-nav-active");
}
function scrollToAcc() {
  const packageSection = document.getElementById("package-section");
  if (packageSection) {
    setTimeout(() => {
      window.scroll({ top: packageSection.offsetTop - 50, behavior: "smooth" });
    }, 200);
    if (window.location.pathname.includes("/clinic/en")) {
      window.history.pushState(null, null, "/clinic/en/");
    } else {
      window.history.pushState(null, null, "/clinic/");
    }
  }
}
function hamburger() {
  $("#click").on("click", function () {
    $("#hamburger").toggleClass("hamburger-active");
  });
}
window.onload = function () {
  if (window.location.search.includes("acc=1")) {
    scrollToAcc();
  }
  if (window.location.pathname.includes("/accessories.html")) {
    initAcc();
    setHilight("accessories");
  } else if (window.location.pathname.includes("/faq.html")) {
    setHilight("faq");
  } else {
    initSlide();
    changeImage();
    changeImage2();
    changeImageCourse();
    changeImage2en();
    changeImage3();
    changeImage3en();
    initContactValidate();
    initModal();
    setHilight("home");
  }
  createPhoneSection();
  initnavscroll();
  hamburger();
  $(document).mouseup(function (e) {
    var container = $("#hamburger");
    var link = $(".li-nav");
    link.on("click", function () {
      $("#click").prop("checked", false);
      $("#hamburger").removeClass("hamburger-active");
    });
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $("#click").prop("checked", false);
      $("#hamburger").removeClass("hamburger-active");
    }
  });
};
