$(document).ready(function () {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Preloader
    $(window).on('load', function () {
        setTimeout(function () {
            $('.preloader').fadeOut(500);
        }, 1500);
    });

    // Header scroll effect
    $(window).scroll(function () {
        if ($(this).scrollTop() > 80) {
            $('.header').addClass('scrolled');
            $('.navbar').addClass('scrolled');
            $('.back-to-top').addClass('show');
        } else {
            $('.header').removeClass('scrolled');
            $('.navbar').removeClass('scrolled');
            $('.back-to-top').removeClass('show');
        }
    });


    // // Active navigation link
    // $(window).scroll(function () {
    //     var scrollPos = $(document).scrollTop();
    //     $('.navbar-nav .nav-link').each(function () {
    //         var currLink = $(this);
    //         var refElement = $(currLink.attr('href'));
    //         if (refElement.position() && refElement.position().top <= scrollPos + 150 && refElement.position().top + refElement.height() > scrollPos) {
    //             $('.navbar-nav .nav-link').removeClass('active');
    //             currLink.addClass('active');
    //         }
    //     });
    // });

    // Initialize Hero Swiper
    var heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
    });


    let statsAnimated = false;

    function animateCounter() {
        $('.stat-number').each(function () {
            var $this = $(this);
            var countTo = $this.attr('data-count');

            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function () {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                    $this.text(this.countNum);
                }
            });
        });
    }

    function isInViewport(element) {
        var rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight)
            && rect.bottom >= 0
        );
    }

    $(window).on('scroll load', function () {
        if (!statsAnimated && isInViewport(document.querySelector('.about-stats'))) {
            animateCounter();
            statsAnimated = true; // لمنع التكرار
        }
    });


    const productSwipers = document.querySelectorAll('.productSwiper');
    productSwipers.forEach((el) => {
        new Swiper(el, {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: {
                el: el.querySelector('.swiper-pagination'),
                clickable: true,
            },
            navigation: {
                nextEl: el.querySelector('.swiper-button-next'),
                prevEl: el.querySelector('.swiper-button-prev'),
            },
        });
    });

    // Check if element is in viewport
    let counted = false;

    function isElementInViewport(el) {
        let rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function startCounting() {
        $('.cap-stat').each(function () {
            let $this = $(this);
            let countTo = $this.attr('data-count');
            $({ countNum: $this.text() }).animate(
                { countNum: countTo },
                {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $this.text(this.countNum);
                    }
                }
            );
        });
    }

    $(window).on('scroll', function () {
        if (!counted && isElementInViewport(document.querySelector('.capabilities-stats'))) {
            counted = true;
            startCounting();
        }
    });

    

    // Mobile menu toggle animation
    $('.navbar-toggler').on('click', function () {
        $(this).toggleClass('active');
        var spans = $(this).find('span');

        if ($(this).hasClass('active')) {
            spans.eq(0).css('transform', 'rotate(45deg) translate(5px, 5px)');
            spans.eq(1).css('opacity', '0');
            spans.eq(2).css('transform', 'rotate(-45deg) translate(7px, -6px)');
        } else {
            spans.css({
                'transform': 'none',
                'opacity': '1'
            });
        }
    });

    // Close mobile menu when clicking on a link
    $('.navbar-nav .nav-link').on('click', function () {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
            $('.navbar-toggler').removeClass('active');
            $('.navbar-toggler span').css({
                'transform': 'none',
                'opacity': '1'
            });
        }
    });

    // Parallax effect for section backgrounds
    $(window).scroll(function () {
        var scrolled = $(window).scrollTop();
        var parallaxElements = $('.section-bg');

        parallaxElements.each(function () {
            var speed = 0.5;
            var yPos = -(scrolled * speed);
            $(this).css('transform', 'translateY(' + yPos + 'px)');
        });
    });

    // Animate elements on scroll
    function animateOnScroll() {
        $('.animate-on-scroll').each(function () {
            if (isElementInViewport(this)) {
                $(this).addClass('animated');
            }
        });
    }

    $(window).scroll(animateOnScroll);
    animateOnScroll(); // Initial check

    // Add hover effects to cards
    $('.product-card, .industry-card, .feature-item, .capability-item').hover(
        function () {
            $(this).addClass('hovered');
        },
        function () {
            $(this).removeClass('hovered');
        }
    );


    // Enhanced scroll indicator
    $('.scroll-indicator').on('click', function () {
        $('html, body').animate({
            scrollTop: $(window).height()
        }, 1000);
    });

    // Add loading state to buttons
    $('.btn-primary-custom, .btn-outline-light').on('click', function (e) {
        if ($(this).attr('href').startsWith('#')) {
            var $btn = $(this);
            var originalText = $btn.html();

            $btn.html('<i class="fas fa-spinner fa-spin me-2"></i>Loading...');

            setTimeout(function () {
                $btn.html(originalText);
            }, 1000);
        }
    });


    // Enhanced performance optimizations
    var ticking = false;

    function updateOnScroll() {
        // Header scroll effect
        if ($(window).scrollTop() > 80) {
            $('.header').addClass('scrolled');
            $('.back-to-top').addClass('show');
        } else {
            $('.header').removeClass('scrolled');
            $('.back-to-top').removeClass('show');
        }

        ticking = false;
    }

    $(window).scroll(function () {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

    // Add smooth transitions to all interactive elements
    $('*').each(function () {
        if ($(this).css('transition') === 'all 0s ease 0s') {
            $(this).css('transition', 'all 0.3s ease');
        }
    });

    console.log('AM Wire Ropes website loaded successfully!');
});

// Additional utility functions
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Optimized scroll handler
var optimizedResize = debounce(function () {
    // Handle resize events
    console.log('Window resized');
}, 250);

$(window).resize(optimizedResize);