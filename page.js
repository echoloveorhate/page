/* ===========================================================
 * page echo love or hate.js 0.0.1 (Beta)
 *
 * https://github.com/echoloveorhate/page.js
 * MIT licensed
 *
 * Copyright (C) zd.91aiji.com
 *
 * ========================================================== */

(function(b) {
    b.fn.pagepiling = function(c) {
        function s() {
            var a = destination.index(".pp-section");
            return b(".pp-section.active").index(".pp-section") < a ? "down": "up"
        }
        function g(a, d) {
            var p = b(".pp-section.active"),
            f = a.data("anchor"),
            e = a.index(".pp-section"),
            g = s(a),
            h = p.index(".pp-section") + 1;
            "undefined" === typeof d && (d = !0);
            "undefined" !== typeof f && c.anchors.length && (location.hash = f);
            a.addClass("active").siblings().removeClass("active");
            if (p.index(".pp-section") < e) {
                var k = "translate3d(0px, -100%, 0px)",
                n = "-100%",
                q = b(".pp-section").map(function(d) {
                    if (d < a.index(".pp-section")) return b(this)
                });
                c.css3 || q.each(function(a) {
                    a != p.index(".pp-section") && b(this).css({
                        top: n
                    })
                });
                var r = p,
                l = function() {}
            } else k = "translate3d(0px, 0px, 0px)",
            n = "0",
            q = b(".pp-section").map(function(d) {
                if (d > a.index(".pp-section")) return b(this)
            }),
            r = a,
            l = function() {
                q.each(function(a) {
                    b(this).css({
                        top: n
                    })
                })
            };
            var m = function() {
                b.isFunction(c.afterLoad) && c.afterLoad.call(this, f, e + 1)
            };
            b.isFunction(c.onLeave) && c.onLeave.call(this, h, e + 1, g);
            c.css3 ? (t(r, k, d), q.each(function() {
                t(b(this), k, d)
            }), setTimeout(function() {
                m()
            },
            c.scrollingSpeed)) : d ? r.animate({
                top: n
            },
            c.scrollingSpeed, c.easing,
            function() {
                l();
                m()
            }) : (r.css("top", n), setTimeout(function() {
                l();
                m()
            },
            100));
            B(f);
            C(f, e);
            u = f;
            v = (new Date).getTime()
        }
        function l() {
            return (new Date).getTime() - v < 200 + c.scrollingSpeed ? !0 : !1
        }
        function t(a, b, c) {
            a.toggleClass("pp-easing", c);
            a.css({
                "-webkit-transform": b,
                "-moz-transform": b,
                "-ms-transform": b,
                transform: b
            })
        }
        function h(a) {
            if (!l()) {
                a = window.event || a;
                a = Math.max( - 1, Math.min(1, a.wheelDelta || -a.deltaY || -a.detail));
                var d = b(".pp-section.active"),
                d = w(d);
                0 > a ? k("down", d) : k("up", d);
                return ! 1
            }
        }
        function k(a, d) {
            if ("down" == a) var c = "bottom",
            e = b.fn.pagepiling.moveSectionDown;
            else c = "top",
            e = b.fn.pagepiling.moveSectionUp;
            if (0 < d.length) if (isScrolled(c, d)) e();
            else return ! 0;
            else e()
        }
        function w(a) {
            return scrollable = a.find(".pp-scrollable")
        }
        function s(a) {
            var c = b(".pp-section.active").index(".pp-section");
            a = a.index(".pp-section");
            return c > a ? "up": "down"
        }
        function x() {
            return window.PointerEvent ? {
                down: "pointerdown",
                move: "pointermove",
                up: "pointerup"
            }: {
                down: "MSPointerDown",
                move: "MSPointerMove",
                up: "MSPointerUp"
            }
        }
        function y(a) {
            var b = [];
            window.navigator.msPointerEnabled ? (b.y = a.pageY, b.x = a.pageX) : (b.y = a.touches[0].pageY, b.x = a.touches[0].pageX);
            return b
        }
        function D(a) {
            touchStartY = y(a.originalEvent).y
        }
        function E(a) {
            var d = a.originalEvent;
            a.preventDefault();
            z(a.target) || (a = b(".pp-section.active"), a = w(a), l() || (d = y(d), touchEndY = d.y, touchEndX = d.x, Math.abs(touchStartY - touchEndY) > e.height() / 100 * c.touchSensitivity && (touchStartY > touchEndY ? k("down", a) : touchEndY > touchStartY && k("up", a))))
        }
        function z(a, d) {
            d = d || 0;
            var e = b(a).parent();
            return d < c.normalScrollElementTouchThreshold && e.is(c.normalScrollElements) ? !0 : d == c.normalScrollElementTouchThreshold ? !1 : z(e, ++d)
        }
        function F() {
            b("body").append('<div id="pp-nav"><ul></ul></div>');
            var a = b("#pp-nav");
            a.css("color", c.navigation.textColor);
            a.addClass(c.navigation.position);
            for (var d = 0; d < b(".pp-section").length; d++) {
                var e = "";
                c.anchors.length && (e = c.anchors[d]);
                if ("undefined" !== typeof c.navigation.tooltips) {
                    var f = c.navigation.tooltips[d];
                    "undefined" === typeof f && (f = "")
                }
                a.find("ul").append('<li data-tooltip="' + f + '"><a href="#' + e + '"><span></span></a></li>')
            }
            a.find("span").css("border-color", c.navigation.bulletsColor)
        }
        function C(a, d) {
            c.navigation && (b("#pp-nav").find(".active").removeClass("active"), a ? b("#pp-nav").find('a[href="#' + a + '"]').addClass("active") : b("#pp-nav").find("li").eq(d).find("a").addClass("active"))
        }
        function B(a) {
            c.menu && (b(c.menu).find(".active").removeClass("active"), b(c.menu).find('[data-menuanchor="' + a + '"]').addClass("active"))
        }
        function G() {
            var a = document.createElement("p"),
            b,
            c = {
                webkitTransform: "-webkit-transform",
                OTransform: "-o-transform",
                msTransform: "-ms-transform",
                MozTransform: "-moz-transform",
                transform: "transform"
            };
            document.body.insertBefore(a, null);
            for (var e in c) void 0 !== a.style[e] && (a.style[e] = "translate3d(1px,1px,1px)", b = window.getComputedStyle(a).getPropertyValue(c[e]));
            document.body.removeChild(a);
            return void 0 !== b && 0 < b.length && "none" !== b
        }
        var e = b(this),
        u,
        v = 0,
        A = "ontouchstart" in window || 0 < navigator.msMaxTouchPoints;
        c = b.extend({
            menu: null,
            verticalCentered: !0,
            sectionsColor: [],
            anchors: [],
            scrollingSpeed: 700,
            easing: "swing",
            loopBottom: !1,
            loopTop: !1,
            css3: !0,
            navigation: {
                textColor: "#fff",
                bulletsColor: "#fff",
                position: "right",
                tooltips: ["主页", "介绍", "作品", "简历", "前景", "留言"]
            },
            normalScrollElementTouchThreshold: 5,
            touchSensitivity: 5,
            keyboardScrolling: !0,
            sectionSelector: ".section",
            animateAnchor: !1,
            afterLoad: null,
            onLeave: null,
            afterRender: null
        },
        c);
        b.fn.pagepiling.setScrollingSpeed = function(a) {
            c.scrollingSpeed = a
        };
        b.fn.pagepiling.setMouseWheelScrolling = function(a) {
            a ? e.get(0).addEventListener ? (e.get(0).addEventListener("mousewheel", h, !1), e.get(0).addEventListener("wheel", h, !1)) : e.get(0).attachEvent("onmousewheel", h) : e.get(0).addEventListener ? (e.get(0).removeEventListener("mousewheel", h, !1), e.get(0).removeEventListener("wheel", h, !1)) : e.get(0).detachEvent("onmousewheel", h)
        };
        b.fn.pagepiling.setAllowScrolling = function(a) {
            a ? (b.fn.pagepiling.setMouseWheelScrolling(!0), A && (MSPointer = x(), e.off("touchstart " + MSPointer.down).on("touchstart " + MSPointer.down, D), e.off("touchmove " + MSPointer.move).on("touchmove " + MSPointer.move, E))) : (b.fn.pagepiling.setMouseWheelScrolling(!1), A && (MSPointer = x(), e.off("touchstart " + MSPointer.down), e.off("touchmove " + MSPointer.move)))
        };
        b.fn.pagepiling.setKeyboardScrolling = function(a) {
            c.keyboardScrolling = a
        };
        b.fn.pagepiling.moveSectionUp = function() {
            var a = b(".pp-section.active").prev(".pp-section"); ! a.length && c.loopTop && (a = b(".pp-section").last());
            a.length && g(a)
        };
        b.fn.pagepiling.moveSectionDown = function() {
            var a = b(".pp-section.active").next(".pp-section"); ! a.length && c.loopBottom && (a = b(".pp-section").first());
            a.length && g(a)
        };
        b.fn.pagepiling.moveTo = function(a) {
            var c = "",
            c = isNaN(a) ? b('[data-anchor="' + a + '"]') : b(".pp-section").eq(a - 1);
            0 < c.length && g(c)
        };
        b(c.sectionSelector).each(function() {
            b(this).addClass("pp-section")
        });
        c.css3 && (c.css3 = G());
        b(e).css({
            overflow: "hidden",
            "-ms-touch-action": "none",
            "touch-action": "none"
        });
        b.fn.pagepiling.setAllowScrolling(!0);
        b.isEmptyObject(c.navigation) || F();
        var m = b(".pp-section").length;
        b(".pp-section").each(function(a) {
            b(this).data("data-index", a);
            b(this).css("z-index", m);
            a || 0 !== b(".pp-section.active").length || b(this).addClass("active");
            "undefined" !== typeof c.anchors[a] && b(this).attr("data-anchor", c.anchors[a]);
            "undefined" !== typeof c.sectionsColor[a] && b(this).css("background-color", c.sectionsColor[a]);
            c.verticalCentered && b(this).addClass("pp-table").wrapInner('<div class="pp-tableCell" style="height:100%" />');
            m -= 1
        }).promise().done(function() {
            c.navigation && (b("#pp-nav").css("margin-top", "-" + b("#pp-nav").height() / 2 + "px"), b("#pp-nav").find("li").eq(b(".pp-section.active").index(".pp-section")).find("a").addClass("active"));
            b(window).on("load",
            function() {
                var a = window.location.hash.replace("#", ""),
                a = b('.pp-section[data-anchor="' + a + '"]');
                0 < a.length && g(a, c.animateAnchor)
            });
            b.isFunction(c.afterRender) && c.afterRender.call(this)
        });
        b(window).on("hashchange",
        function() {
            var a = window.location.hash.replace("#", "").split("/")[0];
            a.length && a && a !== u && (a = isNaN(a) ? b('[data-anchor="' + a + '"]') : b(".pp-section").eq(a - 1), g(a))
        });
        b(document).keydown(function(a) {
            if (c.keyboardScrolling && !l()) switch (a.which) {
            case 38:
            case 33:
                b.fn.pagepiling.moveSectionUp();
                break;
            case 40:
            case 34:
                b.fn.pagepiling.moveSectionDown();
                break;
            case 36:
                b.fn.pagepiling.moveTo(1);
                break;
            case 35:
                b.fn.pagepiling.moveTo(b(".pp-section").length);
                break;
            case 37:
                b.fn.pagepiling.moveSlideLeft();
                break;
            case 39:
                b.fn.pagepiling.moveSlideRight()
            }
        });
        b(document).on("click touchstart", "#pp-nav a",
        function(a) {
            a.preventDefault();
            a = b(this).parent().index();
            g(b(".pp-section").eq(a))
        });
        b(document).on({
            mouseenter: function() {
                var a = b(this).data("tooltip");
                b('<div class="pp-tooltip ' + c.navigation.position + '">' + a + "</div>").hide().appendTo(b(this)).fadeIn(200)
            },
            mouseleave: function() {
                b(this).find(".pp-tooltip").fadeOut(200,
                function() {
                    b(this).remove()
                })
            }
        },
        "#pp-nav li")
    }
})(jQuery);
