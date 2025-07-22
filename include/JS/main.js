$(document).ready(function () {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
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