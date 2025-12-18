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

        $serviceItems.on("mouseenter", function () {
            const $item = $(this);
            const description = $item.data("description");
            // Extract title text (everything after the // span)
            const title = $item.clone().children().remove().end().text().trim();
            
            if (description) {
                $descriptionTitle.text(title);
                $descriptionText.text(description);
                $descriptionBox.addClass("active");
            }
        });

        $serviceItems.on("mouseleave", function () {
            $descriptionBox.removeClass("active");
        });

        // Hide description when mouse leaves the service list area
        $(".service-list").on("mouseleave", function () {
            $descriptionBox.removeClass("active");
        });
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
