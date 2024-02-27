jQuery(document).ready(function ($) {
  $(".loader__").addClass("remove").fadeOut(1000);
  $(".selectpicker").selectpicker();
  // new WOW().init();
  wowInit();
  customDropdown();
  allSiteSwiperInit();
  toggleSideMenuInSmallScreens($);
  stickyHeader($);
  lazyLoad();
  serviceCardToggleInfo();
  projectCardToggleInfo();
});

// functions init

function lazyLoad() {
  const images = document.querySelectorAll(".lazy-omd");

  const optionsLazyLoad = {
    //  rootMargin: '-50px',
    // threshold: 1
  };

  const preloadImage = function (img) {
    img.src = img.getAttribute("data-src");
    img.onload = function () {
      img.parentElement.classList.remove("loading-omd");
      img.parentElement.classList.add("loaded-omd");
      img.parentElement.parentElement.classList.add("lazy-head-om");
    };
  };

  const imageObserver = new IntersectionObserver(function (enteries) {
    enteries.forEach(function (entery) {
      if (!entery.isIntersecting) {
        return;
      } else {
        preloadImage(entery.target);
        imageObserver.unobserve(entery.target);
      }
    });
  }, optionsLazyLoad);

  images.forEach(function (image) {
    imageObserver.observe(image);
  });
}

function swiperInit(options) {
  const swiper = new Swiper(options.className + " .swiper-container", {
    spaceBetween: 30,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    rtl: $("html").attr("dir") === "rtl" ? true : false,
    pagination: {
      el: options.className + " .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: options.className + " .swiper-button-next",
      prevEl: options.className + " .swiper-button-prev",
    },
    breakpoints: options.breakpoints,
    observer: options.observer,
    observeParents: options.observeParents,
    grid: options.grid,
    ...options,
  });

  lazyLoad();

  return swiper;
}

function allSiteSwiperInit() {
  const productsSingleSliderProps = {
    autoplay: false,
    className: ".product_single_page",
    breakpoints: false,
    observer: true,
    observeParents: true,
  };

  const sliderProps = {
    autoplay: false,
    className: ".intro_section",
    breakpoints: false,
    observer: true,
    observeParents: true,
  };

  swiperInit(productsSingleSliderProps);
  swiperInit(sliderProps);
}

function toggleSideMenuInSmallScreens($) {
  // nav men activation
  $("#menu-butt-activ-om").on("click", function (e) {
    e.preventDefault();

    $("#navbar-menu-om").addClass("active-menu");
    $(".overlay").addClass("active");
    $("body").addClass("overflow-body");
  });

  // nav men close
  $(".close-button__ , .overlay ").on("click", function (e) {
    e.preventDefault();
    $("#navbar-menu-om").removeClass("active-menu");
    $(".overlay").removeClass("active");
    $("body").removeClass("overflow-body");
  });
}

function stickyHeader($) {
  let headerHeight = $("header").outerHeight();

  $("header").innerHeight(headerHeight);

  let lastScroll = 0;
  $(document).on("scroll", function () {
    let currentScroll = $(this).scrollTop();
    // side links
    if (currentScroll > headerHeight + 500 || screen.width < 500) {
      $(".side_links_section").addClass("active");
    } else {
      $(".side_links_section").removeClass("active");
    }

    // scroll down
    if (currentScroll < lastScroll && currentScroll > headerHeight + 500) {
      // add class avtive menu
      $(".fixed_header__").addClass("active_menu__");
      $(".fixed_header__").removeClass("not_active_menu__");
    } else if (
      currentScroll > lastScroll &&
      currentScroll > headerHeight + 500
    ) {
      // scroll up
      if ($(".fixed_header__").hasClass("active_menu__")) {
        $(".fixed_header__").removeClass("active_menu__");
        $(".fixed_header__").addClass("not_active_menu__");
      }
    } else {
      $(".fixed_header__").removeClass("active_menu__");
      $(".fixed_header__").removeClass("not_active_menu__");
    }
    lastScroll = currentScroll;
  });

  $(".arrow_button__").click(() => {
    $(".side_links_section").removeClass("active");
  });
}

function customDropdown() {
  $(".dropdown_button__").on("click", function (event) {
    const perantElement = $(this).closest(".custom_dropdown__");
    const menu = perantElement.find(".dropdown_menu__");
    let timeoutId;

    event.preventDefault();
    perantElement.toggleClass("show");

    menu.on("mouseleave", function () {
      timeoutId = setTimeout(function () {
        perantElement.removeClass("show");
      }, 750);
    });

    menu.on("mouseenter", () => clearTimeout(timeoutId));
  });
}

function allSiteSwiperInit() {
  const productsSingleSliderProps = {
    0: {
      slidesPerView: 2,
    },
    480: {
      slidesPerView: 3,
    },
    767: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 5,
    },
    1200: {
      slidesPerView: 6,
    },
  };

  const sliderProps = {
    className: ".our_clients_sec__",
    observer: true,
    observeParents: true,
    loop: true,
    spaceBetween: 30,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
  };

  sliderProps.breakpoints = productsSingleSliderProps;

  swiperInit(sliderProps);
}

function serviceCardToggleInfo() {
  $(".service_card__ .toggle_info_wrapper .head_wrapper__").on(
    "click",
    function () {
      $(this).parent().toggleClass("hide");
      $(this).parent().find(".service_card_button__").toggleClass("show");
    }
  );
}

function projectCardToggleInfo() {
  $(".project_card__ .toggle_info_wrapper .info_toggle_hidden").slideUp();

  $(".project_card__ .toggle_info_wrapper .head_wrapper__").on(
    "click",
    function () {
      $(this).parent().toggleClass("hide");
      $(this).parent().find(".info_toggle_hidden").slideToggle();
      $(this).parent().find(".service_card_button__").toggleClass("show");
    }
  );
}

function wowInit() {
  let wow = new WOW({
    offset: 50,
    live: false,
  });
  wow.init();
  
}
