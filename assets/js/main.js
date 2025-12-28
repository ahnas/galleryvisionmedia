/**
 * Go Top
 * Infinite Slide
 * Counter
 * Open Menu
 * Click Active
 * Service Hover Description
 */

(function ($) {
    "use strict";

    /* Go Top
    -------------------------------------------------------------------------*/
    var goTop = function () {
        var $goTop = $("#goTop");
        var $borderProgress = $(".border-progress");
        var $footer = $(".tf-footer");

        $(window).on("scroll", function () {
            var scrollTop = $(window).scrollTop();
            var docHeight = $(document).height() - $(window).height();
            var scrollPercent = (scrollTop / docHeight) * 100;
            var progressAngle = (scrollPercent / 100) * 360;

            $borderProgress.css("--progress-angle", progressAngle + "deg");

            var windowBottom = scrollTop + $(window).height();
            var hasFooter = $footer.length > 0;
            var footerOffset = hasFooter ? $footer.offset().top : Infinity;

            if (scrollTop > 100 && windowBottom < footerOffset) {
                $goTop.addClass("show");
            } else {
                $goTop.removeClass("show");
            }
        });

        $goTop.on("click", function () {
            $("html, body").animate({ scrollTop: 0 }, 100);
        });
    };
    /* Infinite Slide 
    -------------------------------------------------------------------------*/
    var infiniteSlide = function () {
        if ($(".infiniteSlide").length > 0) {
            $(".infiniteSlide").each(function () {
                var $this = $(this);
                var style = $this.data("style") || "left";
                var clone = $this.data("clone") || 2;
                var speed = $this.data("speed") || 50;
                $this.infiniteslide({
                    speed: speed,
                    direction: style,
                    clone: clone,
                    pauseonhover: false,
                });
            });
        }
    };
    /* Counter Odo
    -------------------------------------------------------------------------*/
    var counterOdo = () => {
        function isElementInViewport($el) {
            var top = $el.offset().top;
            var bottom = top + $el.outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            return bottom > viewportTop && top < viewportBottom;
        }
        if ($(".counter-scroll").length > 0) {
            $(window).on("scroll", function () {
                $(".wg-counter").each(function () {
                    var $counter = $(this);
                    if (isElementInViewport($counter) && !$counter.hasClass("counted")) {
                        $counter.addClass("counted");
                        var targetNumber = $counter.find(".odometer").data("number");
                        setTimeout(function () {
                            $counter.find(".odometer").text(targetNumber);
                        }, 0);
                    }
                });
            });
        }
    };
    /* Open Menu
    -------------------------------------------------------------------------*/
    var openMbMenu = () => {
        $(".open-mb-menu").on("click", function () {
            $(".offcanvas-menu").addClass("show");
            $("body").toggleClass("overflow-hidden");
        });

        $(".close-mb-menu").on("click", function () {
            $(".offcanvas-menu").removeClass("show");
            $("body").toggleClass("overflow-hidden");
        });
    };
    /* Click Active
    -------------------------------------------------------------------------*/
    var clickActive = () => {
        $(".btn-active").on("mouseenter", function () {
            var $btn = $(this);
            if ($btn.hasClass("active")) {
            } else {
                $(".main-action-active .btn-active").removeClass("active");
                $btn.addClass("active");
            }
        });
    };
    /* Service Hover Description
    -------------------------------------------------------------------------*/
    var serviceHoverDescription = () => {
        const $serviceItems = $(".service-item");
        const $descriptionBox = $(".service-description");
        const $descriptionTitle = $(".service-desc-title");
        const $descriptionText = $(".service-desc-text");

        if ($serviceItems.length === 0 || $descriptionBox.length === 0) return;

        // Check if device is mobile/touch
        const isMobile = window.matchMedia("(max-width: 767px)").matches || 'ontouchstart' in window;

        const showDescription = function($item) {
            const description = $item.data("description");
            // Extract title text (everything after the // span)
            const title = $item.clone().children().remove().end().text().trim();
            
            if (description) {
                $descriptionTitle.text(title);
                $descriptionText.text(description);
                $descriptionBox.addClass("active");
            }
        };

        const hideDescription = function() {
            $descriptionBox.removeClass("active");
            $serviceItems.removeClass("active-item");
        };

        if (isMobile) {
            // Mobile: Use click/touch events - clear click handling
            $serviceItems.off("click").on("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                const $item = $(this);
                const $wasActive = $item.hasClass("active-item");
                
                // Remove active state from all items first
                $serviceItems.removeClass("active-item");
                
                // Toggle: if clicking the same active item, hide description; otherwise show new one
                if ($wasActive) {
                    hideDescription();
                } else {
                    $item.addClass("active-item");
                    showDescription($item);
                    
                    // Scroll description into view smoothly
                    setTimeout(function() {
                        $descriptionBox[0].scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'nearest' 
                        });
                    }, 100);
                }
            });

            // Hide description when clicking outside service items or description
            $(document).off("click.serviceDescription").on("click.serviceDescription", function(e) {
                const $target = $(e.target);
                const isClickInside = $target.closest(".service-item, .service-description, .service-list").length > 0;
                
                if (!isClickInside) {
                    hideDescription();
                }
            });

            // Prevent event bubbling on description box
            $descriptionBox.on("click", function(e) {
                e.stopPropagation();
            });
        } else {
            // Desktop: Use hover events
            $serviceItems.off("mouseenter mouseleave").on("mouseenter", function () {
                const $item = $(this);
                showDescription($item);
            });

            $serviceItems.on("mouseleave", function () {
                hideDescription();
            });

            // Hide description when mouse leaves the service list area
            $(".service-list").off("mouseleave").on("mouseleave", function () {
                hideDescription();
            });
        }
    };

    // Dom Ready
    $(function () {
        infiniteSlide();
        goTop();
        counterOdo();
        openMbMenu();
        clickActive();
        serviceHoverDescription();
    });
})(jQuery);
