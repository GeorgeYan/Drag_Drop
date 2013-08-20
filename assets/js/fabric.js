/* build: `node build.js modules=text,cufon,gestures,easing,parser,freedrawing,interaction,serialization,image_filters,gradient,pattern` */
var fabric = fabric || {version: "1.2.5"};
typeof exports != "undefined" && (exports.fabric = fabric), typeof document != "undefined" && typeof window != "undefined" ? (fabric.document = document, fabric.window = window) : (fabric.document = require("jsdom").jsdom("<!DOCTYPE html><html><head></head><body></body></html>"), fabric.window = fabric.document.createWindow()), fabric.isTouchSupported = "ontouchstart"in fabric.document.documentElement, fabric.isLikelyNode = typeof Buffer != "undefined" && typeof window == "undefined";
var Cufon = function () {
    function r(e) {
        var t = this.face = e.face;
        this.glyphs = e.glyphs, this.w = e.w, this.baseSize = parseInt(t["units-per-em"], 10), this.family = t["font-family"].toLowerCase(), this.weight = t["font-weight"], this.style = t["font-style"] || "normal", this.viewBox = function () {
            var e = t.bbox.split(/\s+/), n = {minX: parseInt(e[0], 10), minY: parseInt(e[1], 10), maxX: parseInt(e[2], 10), maxY: parseInt(e[3], 10)};
            return n.width = n.maxX - n.minX, n.height = n.maxY - n.minY, n.toString = function () {
                return[this.minX, this.minY, this.width, this.height].join(" ")
            }, n
        }(), this.ascent = -parseInt(t.ascent, 10), this.descent = -parseInt(t.descent, 10), this.height = -this.ascent + this.descent
    }

    function i() {
        var e = {}, t = {oblique: "italic", italic: "oblique"};
        this.add = function (t) {
            (e[t.style] || (e[t.style] = {}))[t.weight] = t
        }, this.get = function (n, r) {
            var i = e[n] || e[t[n]] || e.normal || e.italic || e.oblique;
            if (!i)return null;
            r = {normal: 400, bold: 700}[r] || parseInt(r, 10);
            if (i[r])return i[r];
            var s = {1: 1, 99: 0}[r % 100], o = [], u, a;
            s === undefined && (s = r > 400), r == 500 && (r = 400);
            for (var f in i) {
                f = parseInt(f, 10);
                if (!u || f < u)u = f;
                if (!a || f > a)a = f;
                o.push(f)
            }
            return r < u && (r = u), r > a && (r = a), o.sort(function (e, t) {
                return(s ? e > r && t > r ? e < t : e > t : e < r && t < r ? e > t : e < t) ? -1 : 1
            }), i[o[0]]
        }
    }

    function s() {
        function t(e, t) {
            return e.contains ? e.contains(t) : e.compareDocumentPosition(t) & 16
        }

        function n(e) {
            var n = e.relatedTarget;
            if (!n || t(this, n))return;
            i(this)
        }

        function r(e) {
            i(this)
        }

        function i(t) {
            setTimeout(function () {
                e.replace(t, g.get(t).options, !0)
            }, 10)
        }

        this.attach = function (e) {
            e.onmouseenter === undefined ? (a(e, "mouseover", n), a(e, "mouseout", n)) : (a(e, "mouseenter", r), a(e, "mouseleave", r))
        }
    }

    function o() {
        function n(e) {
            return e.cufid || (e.cufid = ++t)
        }

        var e = {}, t = 0;
        this.get = function (t) {
            var r = n(t);
            return e[r] || (e[r] = {})
        }
    }

    function u(e) {
        var t = {}, r = {};
        this.get = function (n) {
            return t[n] != undefined ? t[n] : e[n]
        }, this.getSize = function (e, t) {
            return r[e] || (r[e] = new n.Size(this.get(e), t))
        }, this.extend = function (e) {
            for (var n in e)t[n] = e[n];
            return this
        }
    }

    function a(e, t, n) {
        e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, function () {
            return n.call(e, fabric.window.event)
        })
    }

    function f(e, t) {
        var n = g.get(e);
        return n.options ? e : (t.hover && t.hoverables[e.nodeName.toLowerCase()] && y.attach(e), n.options = t, e)
    }

    function l(e) {
        var t = {};
        return function (n) {
            return t.hasOwnProperty(n) || (t[n] = e.apply(null, arguments)), t[n]
        }
    }

    function c(e, t) {
        t || (t = n.getStyle(e));
        var r = n.quotedList(t.get("fontFamily").toLowerCase()), i;
        for (var s = 0, o = r.length; s < o; ++s) {
            i = r[s];
            if (E[i])return E[i].get(t.get("fontStyle"), t.get("fontWeight"))
        }
        return null
    }

    function h(e) {
        return fabric.document.getElementsByTagName(e)
    }

    function p() {
        var e = {}, t;
        for (var n = 0, r = arguments.length; n < r; ++n)for (t in arguments[n])e[t] = arguments[n][t];
        return e
    }

    function d(e, t, r, i, s, o) {
        var u = i.separate;
        if (u == "none")return w[i.engine].apply(null, arguments);
        var a = fabric.document.createDocumentFragment(), f, l = t.split(x[u]), c = u == "words";
        c && m && (/^\s/.test(t) && l.unshift(""), /\s$/.test(t) && l.push(""));
        for (var h = 0, p = l.length; h < p; ++h)f = w[i.engine](e, c ? n.textAlign(l[h], r, h, p) : l[h], r, i, s, o, h < p - 1), f && a.appendChild(f);
        return a
    }

    function v(e, t) {
        var r, i, s, o;
        for (var u = f(e, t).firstChild; u; u = s) {
            s = u.nextSibling, o = !1;
            if (u.nodeType == 1) {
                if (!u.firstChild)continue;
                if (!/cufon/.test(u.className)) {
                    arguments.callee(u, t);
                    continue
                }
                o = !0
            }
            i || (i = n.getStyle(e).extend(t)), r || (r = c(e, i));
            if (!r)continue;
            if (o) {
                w[t.engine](r, null, i, t, u, e);
                continue
            }
            var a = u.data;
            typeof G_vmlCanvasManager != "undefined" && (a = a.replace(/\r/g, "\n"));
            if (a === "")continue;
            var l = d(r, a, i, t, u, e);
            l ? u.parentNode.replaceChild(l, u) : u.parentNode.removeChild(u)
        }
    }

    var e = function () {
        return e.replace.apply(null, arguments)
    }, t = e.DOM = {ready: function () {
        var e = !1, t = {loaded: 1, complete: 1}, n = [], r = function () {
            if (e)return;
            e = !0;
            for (var t; t = n.shift(); t());
        };
        return fabric.document.addEventListener && (fabric.document.addEventListener("DOMContentLoaded", r, !1), fabric.window.addEventListener("pageshow", r, !1)), !fabric.window.opera && fabric.document.readyState && function () {
            t[fabric.document.readyState] ? r() : setTimeout(arguments.callee, 10)
        }(), fabric.document.readyState && fabric.document.createStyleSheet && function () {
            try {
                fabric.document.body.doScroll("left"), r()
            } catch (e) {
                setTimeout(arguments.callee, 1)
            }
        }(), a(fabric.window, "load", r), function (t) {
            arguments.length ? e ? t() : n.push(t) : r()
        }
    }()}, n = e.CSS = {Size: function (e, t) {
        this.value = parseFloat(e), this.unit = String(e).match(/[a-z%]*$/)[0] || "px", this.convert = function (e) {
            return e / t * this.value
        }, this.convertFrom = function (e) {
            return e / this.value * t
        }, this.toString = function () {
            return this.value + this.unit
        }
    }, getStyle: function (e) {
        return new u(e.style)
    }, quotedList: l(function (e) {
        var t = [], n = /\s*((["'])([\s\S]*?[^\\])\2|[^,]+)\s*/g, r;
        while (r = n.exec(e))t.push(r[3] || r[1]);
        return t
    }), ready: function () {
        var e = !1, n = [], r = function () {
            e = !0;
            for (var t; t = n.shift(); t());
        }, i = Object.prototype.propertyIsEnumerable ? h("style") : {length: 0}, s = h("link");
        return t.ready(function () {
            var e = 0, t;
            for (var n = 0, o = s.length; t = s[n], n < o; ++n)!t.disabled && t.rel.toLowerCase() == "stylesheet" && ++e;
            fabric.document.styleSheets.length >= i.length + e ? r() : setTimeout(arguments.callee, 10)
        }), function (t) {
            e ? t() : n.push(t)
        }
    }(), supports: function (e, t) {
        var n = fabric.document.createElement("span").style;
        return n[e] === undefined ? !1 : (n[e] = t, n[e] === t)
    }, textAlign: function (e, t, n, r) {
        return t.get("textAlign") == "right" ? n > 0 && (e = " " + e) : n < r - 1 && (e += " "), e
    }, textDecoration: function (e, t) {
        t || (t = this.getStyle(e));
        var n = {underline: null, overline: null, "line-through": null};
        for (var r = e; r.parentNode && r.parentNode.nodeType == 1;) {
            var i = !0;
            for (var s in n) {
                if (n[s])continue;
                t.get("textDecoration").indexOf(s) != -1 && (n[s] = t.get("color")), i = !1
            }
            if (i)break;
            t = this.getStyle(r = r.parentNode)
        }
        return n
    }, textShadow: l(function (e) {
        if (e == "none")return null;
        var t = [], n = {}, r, i = 0, s = /(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)|(-?[\d.]+[a-z%]*)|,/ig;
        while (r = s.exec(e))r[0] == "," ? (t.push(n), n = {}, i = 0) : r[1] ? n.color = r[1] : n[["offX", "offY", "blur"][i++]] = r[2];
        return t.push(n), t
    }), color: l(function (e) {
        var t = {};
        return t.color = e.replace(/^rgba\((.*?),\s*([\d.]+)\)/, function (e, n, r) {
            return t.opacity = parseFloat(r), "rgb(" + n + ")"
        }), t
    }), textTransform: function (e, t) {
        return e[{uppercase: "toUpperCase", lowercase: "toLowerCase"}[t.get("textTransform")] || "toString"]()
    }}, m = " ".split(/\s+/).length == 0, g = new o, y = new s, b = [], w = {}, E = {}, S = {engine: null, hover: !1, hoverables: {a: !0}, printable: !0, selector: fabric.window.Sizzle || fabric.window.jQuery && function (e) {
        return jQuery(e)
    } || fabric.window.dojo && dojo.query || fabric.window.$$ && function (e) {
        return $$(e)
    } || fabric.window.$ && function (e) {
        return $(e)
    } || fabric.document.querySelectorAll && function (e) {
        return fabric.document.querySelectorAll(e)
    } || h, separate: "words", textShadow: "none"}, x = {words: /\s+/, characters: ""};
    return e.now = function () {
        return t.ready(), e
    }, e.refresh = function () {
        var t = b.splice(0, b.length);
        for (var n = 0, r = t.length; n < r; ++n)e.replace.apply(null, t[n]);
        return e
    }, e.registerEngine = function (t, n) {
        return n ? (w[t] = n, e.set("engine", t)) : e
    }, e.registerFont = function (t) {
        var n = new r(t), s = n.family;
        return E[s] || (E[s] = new i), E[s].add(n), e.set("fontFamily", '"' + s + '"')
    }, e.replace = function (t, r, i) {
        r = p(S, r);
        if (!r.engine)return e;
        typeof r.textShadow == "string" && r.textShadow && (r.textShadow = n.textShadow(r.textShadow)), i || b.push(arguments);
        if (t.nodeType || typeof t == "string")t = [t];
        return n.ready(function () {
            for (var n = 0, i = t.length; n < i; ++n) {
                var s = t[n];
                typeof s == "string" ? e.replace(r.selector(s), r, !0) : v(s, r)
            }
        }), e
    }, e.replaceElement = function (e, t) {
        return t = p(S, t), typeof t.textShadow == "string" && t.textShadow && (t.textShadow = n.textShadow(t.textShadow)), v(e, t)
    }, e.engines = w, e.fonts = E, e.getOptions = function () {
        return p(S)
    }, e.set = function (t, n) {
        return S[t] = n, e
    }, e
}();
Cufon.registerEngine("canvas", function () {
    function s(e, t) {
        var n = 0, r = 0, i = [], s = /([mrvxe])([^a-z]*)/g, o;
        e:for (var u = 0; o = s.exec(e); ++u) {
            var a = o[2].split(",");
            switch (o[1]) {
                case"v":
                    i[u] = {m: "bezierCurveTo", a: [n + ~~a[0], r + ~~a[1], n + ~~a[2], r + ~~a[3], n += ~~a[4], r += ~~a[5]]};
                    break;
                case"r":
                    i[u] = {m: "lineTo", a: [n += ~~a[0], r += ~~a[1]]};
                    break;
                case"m":
                    i[u] = {m: "moveTo", a: [n = ~~a[0], r = ~~a[1]]};
                    break;
                case"x":
                    i[u] = {m: "closePath", a: []};
                    break;
                case"e":
                    break e
            }
            t[i[u].m].apply(t, i[u].a)
        }
        return i
    }

    function o(e, t) {
        for (var n = 0, r = e.length; n < r; ++n) {
            var i = e[n];
            t[i.m].apply(t, i.a)
        }
    }

    var e = Cufon.CSS.supports("display", "inline-block"), t = !e && (fabric.document.compatMode == "BackCompat" || /frameset|transitional/i.test(fabric.document.doctype.publicId)), n = fabric.document.createElement("style");
    n.type = "text/css";
    var r = fabric.document.createTextNode(".cufon-canvas{text-indent:0}@media screen,projection{.cufon-canvas{display:inline;display:inline-block;position:relative;vertical-align:middle" + (t ? "" : ";font-size:1px;line-height:1px") + "}.cufon-canvas .cufon-alt{display:-moz-inline-box;display:inline-block;width:0;height:0;overflow:hidden}" + (e ? ".cufon-canvas canvas{position:relative}" : ".cufon-canvas canvas{position:absolute}") + "}" + "@media print{" + ".cufon-canvas{padding:0 !important}" + ".cufon-canvas canvas{display:none}" + ".cufon-canvas .cufon-alt{display:inline}" + "}");
    try {
        n.appendChild(r)
    } catch (i) {
        n.setAttribute("type", "text/css"), n.styleSheet.cssText = r.data
    }
    return fabric.document.getElementsByTagName("head")[0].appendChild(n), function (t, n, r, i, u, a) {
        function $(e, t) {
            W.strokeStyle = t, W.beginPath(), W.moveTo(0, e), W.lineTo(N, e), W.stroke()
        }

        function Q() {
            W.save();
            var e = 0, n = 0, r = [
                {left: 0}
            ];
            i.backgroundColor && (W.save(), W.fillStyle = i.backgroundColor, W.translate(0, t.ascent), W.fillRect(0, 0, N + 10, (-t.ascent + t.descent) * L), W.restore()), i.textAlign === "right" ? (W.translate(M[n], 0), r[0].left = M[n] * X) : i.textAlign === "center" && (W.translate(M[n] / 2, 0), r[0].left = M[n] / 2 * X);
            for (var s = 0, o = T.length; s < o; ++s) {
                if (T[s] === "\n") {
                    n++;
                    var u = -t.ascent - t.ascent / 5 * i.lineHeight, a = r[r.length - 1], f = {left: 0};
                    a.width = e * X, a.height = (-t.ascent + t.descent) * X, i.textAlign === "right" ? (W.translate(-N, u), W.translate(M[n], 0), f.left = M[n] * X) : i.textAlign === "center" ? (W.translate(-e - M[n - 1] / 2, u), W.translate(M[n] / 2, 0), f.left = M[n] / 2 * X) : W.translate(-e, u), r.push(f), e = 0;
                    continue
                }
                var l = t.glyphs[T[s]] || t.missingGlyph;
                if (!l)continue;
                var c = Number(l.w || t.w) + h;
                i.textBackgroundColor && (W.save(), W.fillStyle = i.textBackgroundColor, W.translate(0, t.ascent), W.fillRect(0, 0, c + 10, -t.ascent + t.descent), W.restore()), W.translate(c, 0), e += c, s == o - 1 && (r[r.length - 1].width = e * X, r[r.length - 1].height = (-t.ascent + t.descent) * X)
            }
            W.restore(), Cufon.textOptions.boundaries = r
        }

        function G(e) {
            W.fillStyle = e || Cufon.textOptions.color || r.get("color");
            var n = 0, u = 0;
            i.textAlign === "right" ? W.translate(M[u], 0) : i.textAlign === "center" && W.translate(M[u] / 2, 0);
            for (var a = 0, f = T.length; a < f; ++a) {
                if (T[a] === "\n") {
                    u++;
                    var l = -t.ascent - t.ascent / 5 * i.lineHeight;
                    i.textAlign === "right" ? (W.translate(-N, l), W.translate(M[u], 0)) : i.textAlign === "center" ? (W.translate(-n - M[u - 1] / 2, l), W.translate(M[u] / 2, 0)) : W.translate(-n, l), n = 0;
                    continue
                }
                var c = t.glyphs[T[a]] || t.missingGlyph;
                if (!c)continue;
                var p = Number(c.w || t.w) + h;
                J && (W.save(), W.strokeStyle = W.fillStyle, W.lineWidth += W.lineWidth, W.beginPath(), J.underline && (W.moveTo(0, -t.face["underline-position"] + .5), W.lineTo(p, -t.face["underline-position"] + .5)), J.overline && (W.moveTo(0, t.ascent + .5), W.lineTo(p, t.ascent + .5)), J["line-through"] && (W.moveTo(0, -t.descent + .5), W.lineTo(p, -t.descent + .5)), W.stroke(), W.restore()), K && (W.save(), W.transform(1, 0, -0.25, 1, 0, 0)), W.beginPath(), c.d && (c.code ? o(c.code, W) : c.code = s("m" + c.d, W)), W.fill(), i.strokeStyle && (W.closePath(), W.save(), W.lineWidth = i.strokeWidth, W.strokeStyle = i.strokeStyle, W.stroke(), W.restore()), K && W.restore(), W.translate(p, 0), n += p
            }
        }

        var f = n === null, l = t.viewBox, c = r.getSize("fontSize", t.baseSize), h = r.get("letterSpacing");
        h = h == "normal" ? 0 : c.convertFrom(parseInt(h, 10));
        var p = 0, d = 0, v = 0, m = 0, g = i.textShadow, y = [];
        Cufon.textOptions.shadowOffsets = [], Cufon.textOptions.shadows = null;
        if (g) {
            Cufon.textOptions.shadows = g;
            for (var b = 0, w = g.length; b < w; ++b) {
                var E = g[b], S = c.convertFrom(parseFloat(E.offX)), x = c.convertFrom(parseFloat(E.offY));
                y[b] = [S, x]
            }
        }
        var T = Cufon.CSS.textTransform(f ? u.alt : n, r).split(""), N = 0, C = null, k = 0, L = 1, A = [];
        for (var b = 0, w = T.length; b < w; ++b) {
            if (T[b] === "\n") {
                L++, N > k && (k = N), A.push(N), N = 0;
                continue
            }
            var O = t.glyphs[T[b]] || t.missingGlyph;
            if (!O)continue;
            N += C = Number(O.w || t.w) + h
        }
        A.push(N), N = Math.max(k, N);
        var M = [];
        for (var b = A.length; b--;)M[b] = N - A[b];
        if (C === null)return null;
        d += l.width - C, m += l.minX;
        var _, D;
        if (f)_ = u, D = u.firstChild; else {
            _ = fabric.document.createElement("span"), _.className = "cufon cufon-canvas", _.alt = n, D = fabric.document.createElement("canvas"), _.appendChild(D);
            if (i.printable) {
                var P = fabric.document.createElement("span");
                P.className = "cufon-alt", P.appendChild(fabric.document.createTextNode(n)), _.appendChild(P)
            }
        }
        var H = _.style, B = D.style || {}, j = c.convert(l.height - p + v), F = Math.ceil(j), I = F / j;
        D.width = Math.ceil(c.convert(N + d - m) * I), D.height = F, p += l.minY, B.top = Math.round(c.convert(p - t.ascent)) + "px", B.left = Math.round(c.convert(m)) + "px";
        var q = Math.ceil(c.convert(N * I)), R = q + "px", U = c.convert(t.height), z = (i.lineHeight - 1) * c.convert(-t.ascent / 5) * (L - 1);
        Cufon.textOptions.width = q, Cufon.textOptions.height = U * L + z, Cufon.textOptions.lines = L, Cufon.textOptions.totalLineHeight = z, e ? (H.width = R, H.height = U + "px") : (H.paddingLeft = R, H.paddingBottom = U - 1 + "px");
        var W = Cufon.textOptions.context || D.getContext("2d"), X = F / l.height;
        Cufon.textOptions.fontAscent = t.ascent * X, Cufon.textOptions.boundaries = null;
        for (var V = Cufon.textOptions.shadowOffsets, b = y.length; b--;)V[b] = [y[b][0] * X, y[b][1] * X];
        W.save(), W.scale(X, X), W.translate(-m - 1 / X * D.width / 2 + (Cufon.fonts[t.family].offsetLeft || 0), -p - Cufon.textOptions.height / X / 2 + (Cufon.fonts[t.family].offsetTop || 0)), W.lineWidth = t.face["underline-thickness"], W.save();
        var J = Cufon.getTextDecoration(i), K = i.fontStyle === "italic";
        W.save(), Q();
        if (g)for (var b = 0, w = g.length; b < w; ++b) {
            var E = g[b];
            W.save(), W.translate.apply(W, y[b]), G(E.color), W.restore()
        }
        return G(), W.restore(), W.restore(), W.restore(), _
    }
}()), Cufon.registerEngine("vml", function () {
    function n(e, t) {
        return r(e, /(?:em|ex|%)$/i.test(t) ? "1em" : t)
    }

    function r(e, t) {
        if (/px$/i.test(t))return parseFloat(t);
        var n = e.style.left, r = e.runtimeStyle.left;
        e.runtimeStyle.left = e.currentStyle.left, e.style.left = t;
        var i = e.style.pixelLeft;
        return e.style.left = n, e.runtimeStyle.left = r, i
    }

    if (!fabric.document.namespaces)return;
    var e = fabric.document.createElement("canvas");
    if (e && e.getContext && e.getContext.apply)return;
    fabric.document.namespaces.cvml == null && fabric.document.namespaces.add("cvml", "urn:schemas-microsoft-com:vml");
    var t = fabric.document.createElement("cvml:shape");
    t.style.behavior = "url(#default#VML)";
    if (!t.coordsize)return;
    return t = null, fabric.document.write('<style type="text/css">.cufon-vml-canvas{text-indent:0}@media screen{cvml\\:shape,cvml\\:shadow{behavior:url(#default#VML);display:block;antialias:true;position:absolute}.cufon-vml-canvas{position:absolute;text-align:left}.cufon-vml{display:inline-block;position:relative;vertical-align:middle}.cufon-vml .cufon-alt{position:absolute;left:-10000in;font-size:1px}a .cufon-vml{cursor:pointer}}@media print{.cufon-vml *{display:none}.cufon-vml .cufon-alt{display:inline}}</style>'), function (e, t, i, s, o, u, a) {
        var f = t === null;
        f && (t = o.alt);
        var l = e.viewBox, c = i.computedFontSize || (i.computedFontSize = new Cufon.CSS.Size(n(u, i.get("fontSize")) + "px", e.baseSize)), h = i.computedLSpacing;
        h == undefined && (h = i.get("letterSpacing"), i.computedLSpacing = h = h == "normal" ? 0 : ~~c.convertFrom(r(u, h)));
        var p, d;
        if (f)p = o, d = o.firstChild; else {
            p = fabric.document.createElement("span"), p.className = "cufon cufon-vml", p.alt = t, d = fabric.document.createElement("span"), d.className = "cufon-vml-canvas", p.appendChild(d);
            if (s.printable) {
                var v = fabric.document.createElement("span");
                v.className = "cufon-alt", v.appendChild(fabric.document.createTextNode(t)), p.appendChild(v)
            }
            a || p.appendChild(fabric.document.createElement("cvml:shape"))
        }
        var m = p.style, g = d.style, y = c.convert(l.height), b = Math.ceil(y), w = b / y, E = l.minX, S = l.minY;
        g.height = b, g.top = Math.round(c.convert(S - e.ascent)), g.left = Math.round(c.convert(E)), m.height = c.convert(e.height) + "px";
        var x = Cufon.getTextDecoration(s), T = i.get("color"), N = Cufon.CSS.textTransform(t, i).split(""), C = 0, k = 0, L = null, A, O, M = s.textShadow;
        for (var _ = 0, D = 0, P = N.length; _ < P; ++_)A = e.glyphs[N[_]] || e.missingGlyph, A && (C += L = ~~(A.w || e.w) + h);
        if (L === null)return null;
        var H = -E + C + (l.width - L), B = c.convert(H * w), j = Math.round(B), F = H + "," + l.height, I, q = "r" + F + "nsnf";
        for (_ = 0; _ < P; ++_) {
            A = e.glyphs[N[_]] || e.missingGlyph;
            if (!A)continue;
            f ? (O = d.childNodes[D], O.firstChild && O.removeChild(O.firstChild)) : (O = fabric.document.createElement("cvml:shape"), d.appendChild(O)), O.stroked = "f", O.coordsize = F, O.coordorigin = I = E - k + "," + S, O.path = (A.d ? "m" + A.d + "xe" : "") + "m" + I + q, O.fillcolor = T;
            var R = O.style;
            R.width = j, R.height = b;
            if (M) {
                var U = M[0], z = M[1], W = Cufon.CSS.color(U.color), X, V = fabric.document.createElement("cvml:shadow");
                V.on = "t", V.color = W.color, V.offset = U.offX + "," + U.offY, z && (X = Cufon.CSS.color(z.color), V.type = "double", V.color2 = X.color, V.offset2 = z.offX + "," + z.offY), V.opacity = W.opacity || X && X.opacity || 1, O.appendChild(V)
            }
            k += ~~(A.w || e.w) + h, ++D
        }
        return m.width = Math.max(Math.ceil(c.convert(C * w)), 0), p
    }
}()), Cufon.getTextDecoration = function (e) {
    return{underline: e.textDecoration === "underline", overline: e.textDecoration === "overline", "line-through": e.textDecoration === "line-through"}
}, typeof exports != "undefined" && (exports.Cufon = Cufon);
var JSON;
JSON || (JSON = {}), function () {
    "use strict";
    function f(e) {
        return e < 10 ? "0" + e : e
    }

    function quote(e) {
        return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
            var t = meta[e];
            return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + e + '"'
    }

    function str(e, t) {
        var n, r, i, s, o = gap, u, a = t[e];
        a && typeof a == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)), typeof rep == "function" && (a = rep.call(t, e, a));
        switch (typeof a) {
            case"string":
                return quote(a);
            case"number":
                return isFinite(a) ? String(a) : "null";
            case"boolean":
            case"null":
                return String(a);
            case"object":
                if (!a)return"null";
                gap += indent, u = [];
                if (Object.prototype.toString.apply(a) === "[object Array]") {
                    s = a.length;
                    for (n = 0; n < s; n += 1)u[n] = str(n, a) || "null";
                    return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i
                }
                if (rep && typeof rep == "object") {
                    s = rep.length;
                    for (n = 0; n < s; n += 1)typeof rep[n] == "string" && (r = rep[n], i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i))
                } else for (r in a)Object.prototype.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
                return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i
        }
    }

    typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function (e) {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (e) {
        return this.valueOf()
    });
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {"\b": "\\b", "	": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"}, rep;
    typeof JSON.stringify != "function" && (JSON.stringify = function (e, t, n) {
        var r;
        gap = "", indent = "";
        if (typeof n == "number")for (r = 0; r < n; r += 1)indent += " "; else typeof n == "string" && (indent = n);
        rep = t;
        if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number")return str("", {"": e});
        throw new Error("JSON.stringify")
    }), typeof JSON.parse != "function" && (JSON.parse = function (text, reviver) {
        function walk(e, t) {
            var n, r, i = e[t];
            if (i && typeof i == "object")for (n in i)Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
            return reviver.call(e, t, i)
        }

        var j;
        text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
            return"\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({"": j}, "") : j;
        throw new SyntaxError("JSON.parse")
    })
}();
if (typeof Event == "undefined")var Event = {};
if (typeof eventjs == "undefined")var eventjs = Event;
Event = function (e) {
    "use strict";
    e.modifyEventListener = !1, e.modifySelectors = !1, e.add = function (e, t, r, i) {
        return n(e, t, r, i, "add")
    }, e.remove = function (e, t, r, i) {
        return n(e, t, r, i, "remove")
    }, e.stop = function (e) {
        e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0, e.bubble = 0
    }, e.prevent = function (e) {
        e.preventDefault && e.preventDefault(), e.returnValue = !1
    }, e.cancel = function (t) {
        e.stop(t), e.prevent(t)
    }, e.supports = function (e, t) {
        typeof e == "string" && (t = e, e = window), t = "on" + t;
        if (t in e)return!0;
        e.setAttribute || (e = document.createElement("div"));
        if (e.setAttribute && e.removeAttribute) {
            e.setAttribute(t, "");
            var n = typeof e[t] == "function";
            return typeof e[t] != "undefined" && (e[t] = null), e.removeAttribute(t), n
        }
    };
    var t = function (e) {
        if (!e || typeof e != "object")return e;
        var n = new e.constructor;
        for (var r in e)!e[r] || typeof e[r] != "object" ? n[r] = e[r] : n[r] = t(e[r]);
        return n
    }, n = function (u, c, h, p, d, v) {
        p = p || {};
        if (typeof u == "string" && c === "ready") {
            var m = (new Date).getTime(), g = p.timeout, y = p.interval || 1e3 / 60, b = window.setInterval(function () {
                (new Date).getTime() - m > g && window.clearInterval(b), document.querySelector(u) && (window.clearInterval(b), h())
            }, y);
            return
        }
        if (typeof u == "string") {
            u = document.querySelectorAll(u);
            if (u.length === 0)return i("Missing target on listener!");
            u.length === 1 && (u = u[0])
        }
        var w, E = {};
        if (u.length > 0) {
            for (var S = 0, x = u.length; S < x; S++)w = n(u[S], c, h, t(p), d), w && (E[S] = w);
            return r(E)
        }
        c.indexOf && c.indexOf(" ") !== -1 && (c = c.split(" ")), c.indexOf && c.indexOf(",") !== -1 && (c = c.split(","));
        if (typeof c != "string") {
            if (typeof c.length == "number")for (var T = 0, N = c.length; T < N; T++)w = n(u, c[T], h, t(p), d), w && (E[c[T]] = w); else for (var C in c)typeof c[C] == "function" ? w = n(u, C, c[C], t(p), d) : w = n(u, C, c[C].listener, t(c[C]), d), w && (E[C] = w);
            return r(E)
        }
        if (typeof h != "function")return i("Listener is not a function!");
        var k = p.useCapture || !1, L = s(c) + a(u) + "." + a(h) + "." + (k ? 1 : 0);
        if (e.Gesture && e.Gesture._gestureHandlers[c]) {
            if (d === "remove") {
                if (!o[L])return;
                o[L].remove(), delete o[L]
            } else if (d === "add") {
                if (o[L])return o[L];
                if (p.useCall && !e.modifyEventListener) {
                    var A = h;
                    h = function (e, t) {
                        for (var n in t)e[n] = t[n];
                        return A.call(u, e)
                    }
                }
                p.gesture = c, p.target = u, p.listener = h, p.fromOverwrite = v, o[L] = e.proxy[c](p)
            }
        } else {
            c = s(c);
            if (d === "remove") {
                if (!o[L])return;
                u[l](c, h, k), delete o[L]
            } else if (d === "add") {
                if (o[L])return o[L];
                u[f](c, h, k), o[L] = {type: c, target: u, listener: h, remove: function () {
                    e.remove(u, c, h, p)
                }}
            }
        }
        return o[L]
    }, r = function (e) {
        return{remove: function () {
            for (var t in e)e[t].remove()
        }, add: function () {
            for (var t in e)e[t].add()
        }}
    }, i = function (e) {
        if (typeof console == "undefined")return;
        if (typeof console.error == "undefined")return;
        console.error(e)
    }, s = function () {
        var t = {};
        return function (n) {
            return e.pointerType || (window.navigator.msPointerEnabled ? (e.pointerType = "mspointer", t = {mousedown: "MSPointerDown", mousemove: "MSPointerMove", mouseup: "MSPointerUp"}) : e.supports("touchstart") ? (e.pointerType = "touch", t = {mousedown: "touchstart", mouseup: "touchend", mousemove: "touchmove"}) : e.pointerType = "mouse"), t[n] && (n = t[n]), document.addEventListener ? n : "on" + n
        }
    }(), o = {}, u = 0, a = function (e) {
        return e === window ? "#window" : e === document ? "#document" : e ? (e.uniqueID || (e.uniqueID = "id" + u++), e.uniqueID) : i("Missing target on listener!")
    }, f = document.addEventListener ? "addEventListener" : "attachEvent", l = document.removeEventListener ? "removeEventListener" : "detachEvent";
    return e.createPointerEvent = function (t, n, r) {
        var i = n.gesture, s = n.target, o = t.changedTouches || e.proxy.getCoords(t);
        if (o.length) {
            var u = o[0];
            n.pointers = r ? [] : o, n.pageX = u.pageX, n.pageY = u.pageY, n.x = n.pageX, n.y = n.pageY
        }
        var a = document.createEvent("Event");
        a.initEvent(i, !0, !0), a.originalEvent = t;
        for (var f in n) {
            if (f === "target")continue;
            a[f] = n[f]
        }
        s.dispatchEvent(a)
    }, e.modifyEventListener && window.HTMLElement && function () {
        var t = function (t) {
            var r = function (r) {
                var i = r + "EventListener", o = t[i];
                t[i] = function (t, i, u) {
                    if (e.Gesture && e.Gesture._gestureHandlers[t]) {
                        var a = u;
                        typeof u == "object" ? a.useCall = !0 : a = {useCall: !0, useCapture: u}, n(this, t, i, a, r, !0), o.call(this, t, i, u)
                    } else o.call(this, s(t), i, u)
                }
            };
            r("add"), r("remove")
        };
        navigator.userAgent.match(/Firefox/) ? (t(HTMLDivElement.prototype), t(HTMLCanvasElement.prototype)) : t(HTMLElement.prototype), t(document), t(window)
    }(), e.modifySelectors && function () {
        var e = NodeList.prototype;
        e.removeEventListener = function (e, t, n) {
            for (var r = 0, i = this.length; r < i; r++)this[r].removeEventListener(e, t, n)
        }, e.addEventListener = function (e, t, n) {
            for (var r = 0, i = this.length; r < i; r++)this[r].addEventListener(e, t, n)
        }
    }(), e
}(Event);
if (typeof Event == "undefined")var Event = {};
typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function (e) {
    "use strict";
    return e.pointerSetup = function (e, t) {
        e.doc = e.target.ownerDocument || e.target, e.minFingers = e.minFingers || e.fingers || 1, e.maxFingers = e.maxFingers || e.fingers || Infinity, e.position = e.position || "relative", delete e.fingers, t = t || {}, t.gesture = e.gesture, t.target = e.target, t.pointerType = Event.pointerType, Event.modifyEventListener && e.fromOverwrite && (e.listener = Event.createPointerEvent);
        var n = 0, r = t.gesture.indexOf("pointer") === 0 && Event.modifyEventListener ? "pointer" : "mouse";
        return t.listener = e.listener, t.proxy = function (n) {
            t.defaultListener = e.listener, e.listener = n, n(e.event, t)
        }, t.remove = function () {
            e.onPointerDown && Event.remove(e.target, r + "down", e.onPointerDown), e.onPointerMove && Event.remove(e.doc, r + "move", e.onPointerMove), e.onPointerUp && Event.remove(e.doc, r + "up", e.onPointerUp)
        }, t.resume = function (t) {
            e.onPointerMove && (!t || t.move) && Event.add(e.doc, r + "move", e.onPointerMove), e.onPointerUp && (!t || t.move) && Event.add(e.doc, r + "up", e.onPointerUp), e.fingers = n
        }, t.pause = function (t) {
            n = e.fingers, e.onPointerMove && (!t || t.move) && Event.remove(e.doc, r + "move", e.onPointerMove), e.onPointerUp && (!t || t.up) && Event.remove(e.doc, r + "up", e.onPointerUp), e.fingers = 0
        }, t
    }, e.pointerStart = function (t, n, r) {
        var i = function (e, t) {
            var n = r.bbox, i = o[t] = {};
            switch (r.position) {
                case"absolute":
                    i.offsetX = 0, i.offsetY = 0;
                    break;
                case"difference":
                    i.offsetX = e.pageX, i.offsetY = e.pageY;
                    break;
                case"move":
                    i.offsetX = e.pageX - n.x1, i.offsetY = e.pageY - n.y1;
                    break;
                default:
                    i.offsetX = n.x1, i.offsetY = n.y1
            }
            if (r.position === "relative")var s = (e.pageX + n.scrollLeft - i.offsetX) * n.scaleX, u = (e.pageY + n.scrollTop - i.offsetY) * n.scaleY; else var s = e.pageX - i.offsetX, u = e.pageY - i.offsetY;
            i.rotation = 0, i.scale = 1, i.startTime = i.moveTime = (new Date).getTime(), i.move = {x: s, y: u}, i.start = {x: s, y: u}, r.fingers++
        };
        r.event = t, n.defaultListener && (r.listener = n.defaultListener, delete n.defaultListener);
        var s = !r.fingers, o = r.tracker, u = t.changedTouches || e.getCoords(t), a = u.length;
        for (var f = 0; f < a; f++) {
            var l = u[f], c = l.identifier || Infinity;
            if (r.fingers) {
                if (r.fingers >= r.maxFingers) {
                    var h = [];
                    for (var c in r.tracker)h.push(c);
                    return n.identifier = h.join(","), s
                }
                var p = 0;
                for (var d in o) {
                    if (o[d].up) {
                        delete o[d], i(l, c), r.cancel = !0;
                        break
                    }
                    p++
                }
                if (o[c])continue;
                i(l, c)
            } else o = r.tracker = {}, n.bbox = r.bbox = e.getBoundingBox(r.target), r.fingers = 0, r.cancel = !1, i(l, c)
        }
        var h = [];
        for (var c in r.tracker)h.push(c);
        return n.identifier = h.join(","), s
    }, e.pointerEnd = function (e, t, n, r) {
        var i = e.touches || [], s = i.length, o = {};
        for (var u = 0; u < s; u++) {
            var a = i[u], f = a.identifier;
            o[f || Infinity] = !0
        }
        for (var f in n.tracker) {
            var l = n.tracker[f];
            if (o[f] || l.up)continue;
            r && r({pageX: l.pageX, pageY: l.pageY, changedTouches: [
                {pageX: l.pageX, pageY: l.pageY, identifier: f === "Infinity" ? Infinity : f}
            ]}, "up"), l.up = !0, n.fingers--
        }
        if (n.fingers !== 0)return!1;
        var c = [];
        n.gestureFingers = 0;
        for (var f in n.tracker)n.gestureFingers++, c.push(f);
        return t.identifier = c.join(","), !0
    }, e.getCoords = function (t) {
        return typeof t.pageX != "undefined" ? e.getCoords = function (e) {
            return Array({type: "mouse", x: e.pageX, y: e.pageY, pageX: e.pageX, pageY: e.pageY, identifier: Infinity})
        } : e.getCoords = function (e) {
            return e = e || window.event, Array({type: "mouse", x: e.clientX + document.documentElement.scrollLeft, y: e.clientY + document.documentElement.scrollTop, pageX: e.clientX + document.documentElement.scrollLeft, pageY: e.clientY + document.documentElement.scrollTop, identifier: Infinity})
        }, e.getCoords(t)
    }, e.getCoord = function (t) {
        if ("ontouchstart"in window) {
            var n = 0, r = 0;
            e.getCoord = function (e) {
                var t = e.changedTouches;
                return t.length ? {x: n = t[0].pageX, y: r = t[0].pageY} : {x: n, y: r}
            }
        } else typeof t.pageX != "undefined" && typeof t.pageY != "undefined" ? e.getCoord = function (e) {
            return{x: e.pageX, y: e.pageY}
        } : e.getCoord = function (e) {
            return e = e || window.event, {x: e.clientX + document.documentElement.scrollLeft, y: e.clientY + document.documentElement.scrollTop}
        };
        return e.getCoord(t)
    }, e.getBoundingBox = function (e) {
        if (e === window || e === document)e = document.body;
        var t = {x1: 0, y1: 0, x2: 0, y2: 0, scrollLeft: 0, scrollTop: 0};
        e === document.body ? (t.height = window.innerHeight, t.width = window.innerWidth) : (t.height = e.offsetHeight, t.width = e.offsetWidth), t.scaleX = e.width / t.width || 1, t.scaleY = e.height / t.height || 1;
        var n = e;
        while (n !== null)t.x1 += n.offsetLeft, t.y1 += n.offsetTop, n = n.offsetParent;
        var n = e.parentNode;
        while (n !== null) {
            if (n === document.body)break;
            if (n.scrollTop === undefined)break;
            t.scrollLeft += n.scrollLeft, t.scrollTop += n.scrollTop, n = n.parentNode
        }
        return t.x2 = t.x1 + t.width, t.y2 = t.y1 + t.height, t
    }, function () {
        var t = navigator.userAgent.toLowerCase(), n = t.indexOf("macintosh") !== -1;
        if (n && t.indexOf("khtml") !== -1)var r = {91: !0, 93: !0}; else if (n && t.indexOf("firefox") !== -1)var r = {224: !0}; else var r = {17: !0};
        e.isMetaKey = function (e) {
            return!!r[e.keyCode]
        }, e.metaTracker = function (t) {
            r[t.keyCode] && (e.metaKey = t.type === "keydown")
        }
    }(), e
}(Event.proxy);
if (typeof Event == "undefined")var Event = {};
typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function (e) {
    "use strict";
    return e.click = function (t) {
        t.maxFingers = t.maxFingers || t.fingers || 1;
        var n;
        t.onPointerDown = function (n) {
            e.pointerStart(n, r, t) && (Event.add(t.doc, "mousemove", t.onPointerMove).listener(n), Event.add(t.doc, "mouseup", t.onPointerUp))
        }, t.onPointerMove = function (e) {
            n = e
        }, t.onPointerUp = function (i) {
            if (e.pointerEnd(i, r, t)) {
                Event.remove(t.doc, "mousemove", t.onPointerMove), Event.remove(t.doc, "mouseup", t.onPointerUp);
                if (n.cancelBubble && ++n.bubble > 1)return;
                var s = n.changedTouches || e.getCoords(n), o = s[0], u = t.bbox, a = e.getBoundingBox(t.target);
                if (t.position === "relative")var f = (o.pageX + u.scrollLeft - u.x1) * u.scaleX, l = (o.pageY + u.scrollTop - u.y1) * u.scaleY; else var f = o.pageX - u.x1, l = o.pageY - u.y1;
                f > 0 && f < u.width && l > 0 && l < u.height && u.scrollTop === a.scrollTop && t.listener(n, r)
            }
        };
        var r = e.pointerSetup(t);
        return r.state = "click", Event.add(t.target, "mousedown", t.onPointerDown), r
    }, Event.Gesture = Event.Gesture || {}, Event.Gesture._gestureHandlers = Event.Gesture._gestureHandlers || {}, Event.Gesture._gestureHandlers.click = e.click, e
}(Event.proxy);
if (typeof Event == "undefined")var Event = {};
typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function (e) {
    "use strict";
    return e.dbltap = e.dblclick = function (t) {
        t.maxFingers = t.maxFingers || t.fingers || 1;
        var n = 700, r, i, s, o, u;
        t.onPointerDown = function (f) {
            var l = f.changedTouches || e.getCoords(f);
            r && !i ? (u = l[0], i = (new Date).getTime() - r) : (o = l[0], r = (new Date).getTime(), i = 0, clearTimeout(s), s = setTimeout(function () {
                r = 0
            }, n)), e.pointerStart(f, a, t) && (Event.add(t.doc, "mousemove", t.onPointerMove).listener(f), Event.add(t.doc, "mouseup", t.onPointerUp))
        }, t.onPointerMove = function (n) {
            if (r && !i) {
                var a = n.changedTouches || e.getCoords(n);
                u = a[0]
            }
            var f = t.bbox;
            if (t.position === "relative")var l = (u.pageX + f.scrollLeft - f.x1) * f.scaleX, c = (u.pageY + f.scrollTop - f.y1) * f.scaleY; else var l = u.pageX - f.x1, c = u.pageY - f.y1;
            l > 0 && l < f.width && c > 0 && c < f.height && Math.abs(u.pageX - o.pageX) <= 25 && Math.abs(u.pageY - o.pageY) <= 25 || (Event.remove(t.doc, "mousemove", t.onPointerMove), clearTimeout(s), r = i = 0)
        }, t.onPointerUp = function (o) {
            e.pointerEnd(o, a, t) && (Event.remove(t.doc, "mousemove", t.onPointerMove), Event.remove(t.doc, "mouseup", t.onPointerUp)), r && i && (i <= n && !(o.cancelBubble && ++o.bubble > 1) && (a.state = t.gesture, t.listener(o, a)), clearTimeout(s), r = i = 0)
        };
        var a = e.pointerSetup(t);
        return a.state = "dblclick", Event.add(t.target, "mousedown", t.onPointerDown), a
    }, Event.Gesture = Event.Gesture || {}, Event.Gesture._gestureHandlers = Event.Gesture._gestureHandlers || {}, Event.Gesture._gestureHandlers.dbltap = e.dbltap, Event.Gesture._gestureHandlers.dblclick = e.dblclick, e
}(Event.proxy);
if (typeof Event == "undefined")var Event = {};
typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function (e) {
    "use strict";
    return e.dragElement = function (t, n) {
        e.drag({event: n, target: t, position: "move", listener: function (e, n) {
            t.style.left = n.x + "px", t.style.top = n.y + "px", Event.prevent(e)
        }})
    }, e.drag = function (t) {
        t.gesture = "drag", t.onPointerDown = function (r) {
            e.pointerStart(r, n, t) && (t.monitor || (Event.add(t.doc, "mousemove", t.onPointerMove), Event.add(t.doc, "mouseup", t.onPointerUp))), t.onPointerMove(r, "down")
        }, t.onPointerMove = function (r, i) {
            if (!t.tracker)return t.onPointerDown(r);
            var s = t.bbox, o = r.changedTouches || e.getCoords(r), u = o.length;
            for (var a = 0; a < u; a++) {
                var f = o[a], l = f.identifier || Infinity, c = t.tracker[l];
                if (!c)continue;
                c.pageX = f.pageX, c.pageY = f.pageY, n.state = i || "move", n.identifier = l, n.start = c.start, n.fingers = t.fingers, t.position === "relative" ? (n.x = (c.pageX + s.scrollLeft - c.offsetX) * s.scaleX, n.y = (c.pageY + s.scrollTop - c.offsetY) * s.scaleY) : (n.x = c.pageX - c.offsetX, n.y = c.pageY - c.offsetY), t.listener(r, n)
            }
        }, t.onPointerUp = function (r) {
            e.pointerEnd(r, n, t, t.onPointerMove) && (t.monitor || (Event.remove(t.doc, "mousemove", t.onPointerMove), Event.remove(t.doc, "mouseup", t.onPointerUp)))
        };
        var n = e.pointerSetup(t);
        return t.event ? t.onPointerDown(t.event) : (Event.add(t.target, "mousedown", t.onPointerDown), t.monitor && (Event.add(t.doc, "mousemove", t.onPointerMove), Event.add(t.doc, "mouseup", t.onPointerUp))), n
    }, Event.Gesture = Event.Gesture || {}, Event.Gesture._gestureHandlers = Event.Gesture._gestureHandlers || {}, Event.Gesture._gestureHandlers.drag = e.drag, e
}(Event.proxy);
if (typeof Event == "undefined")var Event = {};
typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function (e) {
    "use strict";
    var t = Math.PI / 180;
    return e.gesture = function (n) {
        n.minFingers = n.minFingers || n.fingers || 2, n.onPointerDown = function (t) {
            var i = n.fingers;
            e.pointerStart(t, r, n) && (Event.add(n.doc, "mousemove", n.onPointerMove), Event.add(n.doc, "mouseup", n.onPointerUp));
            if (n.fingers === n.minFingers && i !== n.fingers) {
                r.fingers = n.minFingers, r.scale = 1, r.rotation = 0, r.state = "start";
                var s = "";
                for (var o in n.tracker)s += o;
                r.identifier = parseInt(s), n.listener(t, r)
            }
        }, n.onPointerMove = function (i, s) {
            var o = n.bbox, u = n.tracker, a = i.changedTouches || e.getCoords(i), f = a.length;
            for (var l = 0; l < f; l++) {
                var c = a[l], h = c.identifier || Infinity, p = u[h];
                if (!p)continue;
                n.position === "relative" ? (p.move.x = (c.pageX + o.scrollLeft - o.x1) * o.scaleX, p.move.y = (c.pageY + o.scrollTop - o.y1) * o.scaleY) : (p.move.x = c.pageX - o.x1, p.move.y = c.pageY - o.y1)
            }
            if (n.fingers < n.minFingers)return;
            var a = [], d = 0, v = 0, m = 0, g = 0, f = 0;
            for (var h in u) {
                var c = u[h];
                if (c.up)continue;
                m += c.move.x, g += c.move.y, f++
            }
            m /= f, g /= f;
            for (var h in u) {
                var c = u[h];
                if (c.up)continue;
                var y = c.start;
                if (!y.distance) {
                    var b = y.x - m, w = y.y - g;
                    y.distance = Math.sqrt(b * b + w * w), y.angle = Math.atan2(b, w) / t
                }
                var b = c.move.x - m, w = c.move.y - g, E = Math.sqrt(b * b + w * w);
                d += E / y.distance;
                var S = Math.atan2(b, w) / t, x = (y.angle - S + 360) % 360 - 180;
                c.DEG2 = c.DEG1, c.DEG1 = x > 0 ? x : -x, typeof c.DEG2 != "undefined" && (x > 0 ? c.rotation += c.DEG1 - c.DEG2 : c.rotation -= c.DEG1 - c.DEG2, v += c.rotation), a.push(c.move)
            }
            r.touches = a, r.fingers = n.fingers, r.scale = d / n.fingers, r.rotation = v / n.fingers, r.state = "change", n.listener(i, r)
        }, n.onPointerUp = function (t) {
            var i = n.fingers;
            e.pointerEnd(t, r, n) && (Event.remove(n.doc, "mousemove", n.onPointerMove), Event.remove(n.doc, "mouseup", n.onPointerUp)), i === n.minFingers && n.fingers < n.minFingers && (r.fingers = n.fingers, r.state = "end", n.listener(t, r))
        };
        var r = e.pointerSetup(n);
        return Event.add(n.target, "mousedown", n.onPointerDown), r
    }, Event.Gesture = Event.Gesture || {}, Event.Gesture._gestureHandlers = Event.Gesture._gestureHandlers || {}, Event.Gesture._gestureHandlers.gesture = e.gesture, e
}(Event.proxy);
if (typeof Event == "undefined")var Event = {};
typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function (e) {
    "use strict";
    return e.pointerdown = e.pointermove = e.pointerup = function (t) {
        if (t.target.isPointerEmitter)return;
        var n = !0;
        t.onPointerDown = function (e) {
            n = !1, r.gesture = "pointerdown", t.listener(e, r)
        }, t.onPointerMove = function (e) {
            r.gesture = "pointermove", t.listener(e, r, n)
        }, t.onPointerUp = function (e) {
            n = !0, r.gesture = "pointerup", t.listener(e, r, !0)
        };
        var r = e.pointerSetup(t);
        return Event.add(t.target, "mousedown", t.onPointerDown), Event.add(t.target, "mousemove", t.onPointerMove), Event.add(t.doc, "mouseup", t.onPointerUp), t.target.isPointerEmitter = !0, r
    }, Event.Gesture = Event.Gesture || {}, Event.Gesture._gestureHandlers = Event.Gesture._gestureHandlers || {}, Event.Gesture._gestureHandlers.pointerdown = e.pointerdown, Event.Gesture._gestureHandlers.pointermove = e.pointermove, Event.Gesture._gestureHandlers.pointerup = e.pointerup, e
}(Event.proxy);
if (typeof Event == "undefined")var Event = {};
typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function (e) {
    "use strict";
    return e.shake = function (e) {
        var t = {gesture: "devicemotion", acceleration: {}, accelerationIncludingGravity: {}, target: e.target, listener: e.listener, remove: function () {
            window.removeEventListener("devicemotion", f, !1)
        }}, n = 4, r = 1e3, i = 200, s = 3, o = (new Date).getTime(), u = {x: 0, y: 0, z: 0}, a = {x: {count: 0, value: 0}, y: {count: 0, value: 0}, z: {count: 0, value: 0}}, f = function (f) {
            var l = .8, c = f.accelerationIncludingGravity;
            u.x = l * u.x + (1 - l) * c.x, u.y = l * u.y + (1 - l) * c.y, u.z = l * u.z + (1 - l) * c.z, t.accelerationIncludingGravity = u, t.acceleration.x = c.x - u.x, t.acceleration.y = c.y - u.y, t.acceleration.z = c.z - u.z;
            if (e.gesture === "devicemotion") {
                e.listener(f, t);
                return
            }
            var h = "xyz", p = (new Date).getTime();
            for (var d = 0, v = h.length; d < v; d++) {
                var m = h[d], g = t.acceleration[m], y = a[m], b = Math.abs(g);
                if (p - o < r)continue;
                if (b > n) {
                    var w = p * g / b, E = Math.abs(w + y.value);
                    y.value && E < i ? (y.value = w, y.count++, y.count === s && (e.listener(f, t), o = p, y.value = 0, y.count = 0)) : (y.value = w, y.count = 1)
                }
            }
        };
        if (!window.addEventListener)return;
        return window.addEventListener("devicemotion", f, !1), t
    }, Event.Gesture = Event.Gesture || {}, Event.Gesture._gestureHandlers = Event.Gesture._gestureHandlers || {}, Event.Gesture._gestureHandlers.shake = e.shake, e
}(Event.proxy);
if (typeof Event == "undefined")var Event = {};
typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function (e) {
    "use strict";
    var t = Math.PI / 180;
    return e.swipe = function (n) {
        n.snap = n.snap || 90, n.threshold = n.threshold || 1, n.onPointerDown = function (t) {
            e.pointerStart(t, r, n) && (Event.add(n.doc, "mousemove", n.onPointerMove).listener(t), Event.add(n.doc, "mouseup", n.onPointerUp))
        }, n.onPointerMove = function (t) {
            var r = t.changedTouches || e.getCoords(t), i = r.length;
            for (var s = 0; s < i; s++) {
                var o = r[s], u = o.identifier || Infinity, a = n.tracker[u];
                if (!a)continue;
                a.move.x = o.pageX, a.move.y = o.pageY, a.moveTime = (new Date).getTime()
            }
        }, n.onPointerUp = function (i) {
            if (e.pointerEnd(i, r, n)) {
                Event.remove(n.doc, "mousemove", n.onPointerMove), Event.remove(n.doc, "mouseup", n.onPointerUp);
                var s, o, u, a, f = {x: 0, y: 0}, l = 0, c = 0, h = 0;
                for (var p in n.tracker) {
                    var d = n.tracker[p], v = d.move.x - d.start.x, m = d.move.y - d.start.y;
                    l += d.move.x, c += d.move.y, f.x += d.start.x, f.y += d.start.y, h++;
                    var g = Math.sqrt(v * v + m * m), y = d.moveTime - d.startTime, a = Math.atan2(v, m) / t + 180, o = y ? g / y : 0;
                    if (typeof u == "undefined")u = a, s = o; else {
                        if (!(Math.abs(a - u) <= 20))return;
                        u = (u + a) / 2, s = (s + o) / 2
                    }
                }
                s > n.threshold && (f.x /= h, f.y /= h, r.start = f, r.x = l / h, r.y = c / h, r.angle = -(((u / n.snap + .5 >> 0) * n.snap || 360) - 360), r.velocity = s, r.fingers = n.gestureFingers, r.state = "swipe", n.listener(i, r))
            }
        };
        var r = e.pointerSetup(n);
        return Event.add(n.target, "mousedown", n.onPointerDown), r
    }, Event.Gesture = Event.Gesture || {}, Event.Gesture._gestureHandlers = Event.Gesture._gestureHandlers || {}, Event.Gesture._gestureHandlers.swipe = e.swipe, e
}(Event.proxy);
if (typeof Event == "undefined")var Event = {};
typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function (e) {
    "use strict";
    return e.tap = e.longpress = function (t) {
        t.delay = t.delay || 500, t.timeout = t.timeout || 250;
        var n, r;
        t.onPointerDown = function (s) {
            if (e.pointerStart(s, i, t)) {
                n = (new Date).getTime(), Event.add(t.doc, "mousemove", t.onPointerMove).listener(s), Event.add(t.doc, "mouseup", t.onPointerUp);
                if (t.gesture !== "longpress")return;
                r = setTimeout(function () {
                    if (s.cancelBubble && ++s.bubble > 1)return;
                    var e = 0;
                    for (var n in t.tracker) {
                        if (t.tracker[n].end === !0)return;
                        if (t.cancel)return;
                        e++
                    }
                    i.state = "start", i.fingers = e, t.listener(s, i)
                }, t.delay)
            }
        }, t.onPointerMove = function (n) {
            var r = t.bbox, i = n.changedTouches || e.getCoords(n), s = i.length;
            for (var o = 0; o < s; o++) {
                var u = i[o], a = u.identifier || Infinity, f = t.tracker[a];
                if (!f)continue;
                if (t.position === "relative")var l = (u.pageX + r.scrollLeft - r.x1) * r.scaleX, c = (u.pageY + r.scrollTop - r.y1) * r.scaleY; else var l = u.pageX - r.x1, c = u.pageY - r.y1;
                if (!(l > 0 && l < r.width && c > 0 && c < r.height && Math.abs(l - f.start.x) <= 25 && Math.abs(c - f.start.y) <= 25)) {
                    Event.remove(t.doc, "mousemove", t.onPointerMove), t.cancel = !0;
                    return
                }
            }
        }, t.onPointerUp = function (s) {
            if (e.pointerEnd(s, i, t)) {
                clearTimeout(r), Event.remove(t.doc, "mousemove", t.onPointerMove), Event.remove(t.doc, "mouseup", t.onPointerUp);
                if (s.cancelBubble && ++s.bubble > 1)return;
                if (t.gesture === "longpress") {
                    i.state === "start" && (i.state = "end", t.listener(s, i));
                    return
                }
                if (t.cancel)return;
                if ((new Date).getTime() - n > t.timeout)return;
                i.state = "tap", i.fingers = t.gestureFingers, t.listener(s, i)
            }
        };
        var i = e.pointerSetup(t);
        return Event.add(t.target, "mousedown", t.onPointerDown), i
    }, Event.Gesture = Event.Gesture || {}, Event.Gesture._gestureHandlers = Event.Gesture._gestureHandlers || {}, Event.Gesture._gestureHandlers.tap = e.tap, Event.Gesture._gestureHandlers.longpress = e.longpress, e
}(Event.proxy);
if (typeof Event == "undefined")var Event = {};
typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function (e) {
    "use strict";
    return e.wheel = function (e) {
        var t, n = e.timeout || 150, r = 0, i = {gesture: "wheel", state: "start", wheelDelta: 0, target: e.target, listener: e.listener, remove: function () {
            e.target[u](a, s, !1)
        }}, s = function (s) {
            s = s || window.event, i.state = r++ ? "change" : "start", i.wheelDelta = s.detail ? s.detail * -20 : s.wheelDelta, e.listener(s, i), clearTimeout(t), t = setTimeout(function () {
                r = 0, i.state = "end", i.wheelDelta = 0, e.listener(s, i)
            }, n)
        }, o = document.addEventListener ? "addEventListener" : "attachEvent", u = document.removeEventListener ? "removeEventListener" : "detachEvent", a = Event.supports("mousewheel") ? "mousewheel" : "DOMMouseScroll";
        return e.target[o](a, s, !1), i
    }, Event.Gesture = Event.Gesture || {}, Event.Gesture._gestureHandlers = Event.Gesture._gestureHandlers || {}, Event.Gesture._gestureHandlers.wheel = e.wheel, e
}(Event.proxy);
fabric.log = function () {
}, fabric.warn = function () {
}, typeof console != "undefined" && (typeof console.log != "undefined" && console.log.apply && (fabric.log = function () {
    return console.log.apply(console, arguments)
}), typeof console.warn != "undefined" && console.warn.apply && (fabric.warn = function () {
    return console.warn.apply(console, arguments)
}));
(function () {
    function e(e, t) {
        this.__eventListeners || (this.__eventListeners = {});
        if (arguments.length === 1)for (var n in e)this.on(n, e[n]); else this.__eventListeners[e] || (this.__eventListeners[e] = []), this.__eventListeners[e].push(t)
    }

    function t(e, t) {
        this.__eventListeners || (this.__eventListeners = {}), this.__eventListeners[e] && (t ? fabric.util.removeFromArray(this.__eventListeners[e], t) : this.__eventListeners[e].length = 0)
    }

    function n(e, t) {
        this.__eventListeners || (this.__eventListeners = {});
        var n = this.__eventListeners[e];
        if (!n)return;
        for (var r = 0, i = n.length; r < i; r++)n[r](t || {})
    }

    fabric.Observable = {observe: e, stopObserving: t, fire: n, on: e, off: t, trigger: n}
})();
fabric.Collection = {add: function () {
    this._objects.push.apply(this._objects, arguments);
    for (var e = arguments.length; e--;)this._onObjectAdded(arguments[e]);
    return this.renderOnAddition && this.renderAll(), this
}, insertAt: function (e, t, n) {
    var r = this.getObjects();
    return n ? r[t] = e : r.splice(t, 0, e), this._onObjectAdded(e), this.renderOnAddition && this.renderAll(), this
}, remove: function (e) {
    var t = this.getObjects(), n = t.indexOf(e);
    return n !== -1 && (t.splice(n, 1), this._onObjectRemoved(e)), this.renderAll && this.renderAll(), e
}, forEachObject: function (e, t) {
    var n = this.getObjects(), r = n.length;
    while (r--)e.call(t, n[r], r, n);
    return this
}, item: function (e) {
    return this.getObjects()[e]
}, isEmpty: function () {
    return this.getObjects().length === 0
}, size: function () {
    return this.getObjects().length
}, contains: function (e) {
    return this.getObjects().indexOf(e) > -1
}, complexity: function () {
    return this.getObjects().reduce(function (e, t) {
        return e += t.complexity ? t.complexity() : 0, e
    }, 0)
}, toGrayscale: function () {
    return this.forEachObject(function (e) {
        e.toGrayscale()
    })
}};
(function () {
    function n(e, t) {
        var n = e.indexOf(t);
        return n !== -1 && e.splice(n, 1), e
    }

    function r(e, t) {
        return Math.floor(Math.random() * (t - e + 1)) + e
    }

    function s(e) {
        return e * i
    }

    function o(e) {
        return e / i
    }

    function u(e, t, n) {
        var r = Math.sin(n), i = Math.cos(n);
        e.subtractEquals(t);
        var s = e.x * i - e.y * r, o = e.x * r + e.y * i;
        return(new fabric.Point(s, o)).addEquals(t)
    }

    function a(e, t) {
        return parseFloat(Number(e).toFixed(t))
    }

    function f() {
        return!1
    }

    function l(e) {
        e || (e = {});
        var t = +(new Date), n = e.duration || 500, r = t + n, i, s = e.onChange || function () {
        }, o = e.abort || function () {
            return!1
        }, u = e.easing || function (e, t, n, r) {
            return-n * Math.cos(e / r * (Math.PI / 2)) + n + t
        }, a = "startValue"in e ? e.startValue : 0, f = "endValue"in e ? e.endValue : 100, l = e.byValue || f - a;
        e.onStart && e.onStart(), function c() {
            i = +(new Date);
            var f = i > r ? n : i - t;
            s(u(f, a, l, n));
            if (i > r || o()) {
                e.onComplete && e.onComplete();
                return
            }
            h(c)
        }()
    }

    function p(e) {
        return fabric[fabric.util.string.camelize(fabric.util.string.capitalize(e))]
    }

    function d(e, t, n) {
        if (e) {
            var r = fabric.util.createImage();
            r.onload = function () {
                t && t.call(n, r), r = r.onload = null
            }, r.src = e
        } else t && t.call(n, e)
    }

    function v(e, t) {
        function n() {
            ++i === s && t && t(r)
        }

        var r = [], i = 0, s = e.length;
        e.forEach(function (e, t) {
            if (!e.type)return;
            var i = fabric.util.getKlass(e.type);
            i.async ? i.fromObject(e, function (e, i) {
                i || (r[t] = e), n()
            }) : (r[t] = i.fromObject(e), n())
        })
    }

    function m(e, t, n) {
        var r;
        return e.length > 1 ? r = new fabric.PathGroup(e, t) : r = e[0], typeof n != "undefined" && r.setSourcePath(n), r
    }

    function g(e, t, n) {
        if (n && Object.prototype.toString.call(n) === "[object Array]")for (var r = 0, i = n.length; r < i; r++)n[r]in e && (t[n[r]] = e[n[r]])
    }

    function y(n, r, i, s, o, u) {
        var a = s - r, f = o - i, l = e(a * a + f * f), c = t(f, a), h = u.length, p = 0, d = !0;
        n.save(), n.translate(r, i), n.moveTo(0, 0), n.rotate(c), r = 0;
        while (l > r)r += u[p++ % h], r > l && (r = l), n[d ? "lineTo" : "moveTo"](r, 0), d = !d;
        n.restore()
    }

    function b(e) {
        return e || (e = fabric.document.createElement("canvas")), !e.getContext && typeof G_vmlCanvasManager != "undefined" && G_vmlCanvasManager.initElement(e), e
    }

    function w() {
        return fabric.isLikelyNode ? new (require("canvas").Image) : fabric.document.createElement("img")
    }

    function E(e) {
        var t = e.prototype;
        for (var n = t.stateProperties.length; n--;) {
            var r = t.stateProperties[n], i = r.charAt(0).toUpperCase() + r.slice(1), s = "set" + i, o = "get" + i;
            t[o] || (t[o] = function (e) {
                return new Function('return this.get("' + e + '")')
            }(r)), t[s] || (t[s] = function (e) {
                return new Function("value", 'return this.set("' + e + '", value)')
            }(r))
        }
    }

    function S(e, t) {
        t.save(), t.beginPath(), e.clipTo(t), t.clip()
    }

    function x(e, t) {
        var n = [
            [e[0], e[2], e[4]],
            [e[1], e[3], e[5]],
            [0, 0, 1]
        ], r = [
            [t[0], t[2], t[4]],
            [t[1], t[3], t[5]],
            [0, 0, 1]
        ], i = [];
        for (var s = 0; s < 3; s++) {
            i[s] = [];
            for (var o = 0; o < 3; o++) {
                var u = 0;
                for (var a = 0; a < 3; a++)u += n[s][a] * r[a][o];
                i[s][o] = u
            }
        }
        return[i[0][0], i[1][0], i[0][1], i[1][1], i[0][2], i[1][2]]
    }

    function T(e) {
        return(String(e).match(/function[^{]*\{([\s\S]*)\}/) || {})[1]
    }

    function N(e, t, n, r) {
        var i = r[0], s = r[1], o = r[2], u = r[3], a = r[4], f = r[5], l = r[6], c = O(f, l, i, s, u, a, o, t, n);
        for (var h = 0; h < c.length; h++) {
            var p = M.apply(this, c[h]);
            e.bezierCurveTo.apply(e, p)
        }
    }

    function O(e, t, n, r, i, s, o, u, a) {
        A = L.call(arguments);
        if (C[A])return C[A];
        var f = o * (Math.PI / 180), l = Math.sin(f), c = Math.cos(f);
        n = Math.abs(n), r = Math.abs(r);
        var h = c * (u - e) * .5 + l * (a - t) * .5, p = c * (a - t) * .5 - l * (u - e) * .5, d = h * h / (n * n) + p * p / (r * r);
        d > 1 && (d = Math.sqrt(d), n *= d, r *= d);
        var v = c / n, m = l / n, g = -l / r, y = c / r, b = v * u + m * a, w = g * u + y * a, E = v * e + m * t, S = g * e + y * t, x = (E - b) * (E - b) + (S - w) * (S - w), T = 1 / x - .25;
        T < 0 && (T = 0);
        var N = Math.sqrt(T);
        s === i && (N = -N);
        var k = .5 * (b + E) - N * (S - w), O = .5 * (w + S) + N * (E - b), M = Math.atan2(w - O, b - k), _ = Math.atan2(S - O, E - k), D = _ - M;
        D < 0 && s === 1 ? D += 2 * Math.PI : D > 0 && s === 0 && (D -= 2 * Math.PI);
        var P = Math.ceil(Math.abs(D / (Math.PI * .5 + .001))), H = [];
        for (var B = 0; B < P; B++) {
            var j = M + B * D / P, F = M + (B + 1) * D / P;
            H[B] = [k, O, j, F, n, r, l, c]
        }
        return C[A] = H, H
    }

    function M(e, t, n, r, i, s, o, u) {
        A = L.call(arguments);
        if (k[A])return k[A];
        var a = u * i, f = -o * s, l = o * i, c = u * s, h = .5 * (r - n), p = 8 / 3 * Math.sin(h * .5) * Math.sin(h * .5) / Math.sin(h), d = e + Math.cos(n) - p * Math.sin(n), v = t + Math.sin(n) + p * Math.cos(n), m = e + Math.cos(r), g = t + Math.sin(r), y = m + p * Math.sin(r), b = g - p * Math.cos(r);
        return k[A] = [a * d + f * v, l * d + c * v, a * y + f * b, l * y + c * b, a * m + f * g, l * m + c * g], k[A]
    }

    var e = Math.sqrt, t = Math.atan2;
    fabric.util = {};
    var i = Math.PI / 180, c = fabric.window.requestAnimationFrame || fabric.window.webkitRequestAnimationFrame || fabric.window.mozRequestAnimationFrame || fabric.window.oRequestAnimationFrame || fabric.window.msRequestAnimationFrame || function (e) {
        fabric.window.setTimeout(e, 1e3 / 60)
    }, h = function () {
        return c.apply(fabric.window, arguments)
    }, C = {}, k = {}, L = Array.prototype.join, A;
    fabric.util.removeFromArray = n, fabric.util.degreesToRadians = s, fabric.util.radiansToDegrees = o, fabric.util.rotatePoint = u, fabric.util.toFixed = a, fabric.util.getRandomInt = r, fabric.util.falseFunction = f, fabric.util.animate = l, fabric.util.requestAnimFrame = h, fabric.util.getKlass = p, fabric.util.loadImage = d, fabric.util.enlivenObjects = v, fabric.util.groupSVGElements = m, fabric.util.populateWithProperties = g, fabric.util.drawDashedLine = y, fabric.util.createCanvasElement = b, fabric.util.createImage = w, fabric.util.createAccessors = E, fabric.util.clipContext = S, fabric.util.multiplyTransformMatrices = x, fabric.util.getFunctionBody = T, fabric.util.drawArc = N
})();
(function () {
    function t(t, n) {
        var r = e.call(arguments, 2), i = [];
        for (var s = 0, o = t.length; s < o; s++)i[s] = r.length ? t[s][n].apply(t[s], r) : t[s][n].call(t[s]);
        return i
    }

    function n(e, t) {
        if (!e || e.length === 0)return undefined;
        var n = e.length - 1, r = t ? e[n][t] : e[n];
        if (t)while (n--)e[n][t] >= r && (r = e[n][t]); else while (n--)e[n] >= r && (r = e[n]);
        return r
    }

    function r(e, t) {
        if (!e || e.length === 0)return undefined;
        var n = e.length - 1, r = t ? e[n][t] : e[n];
        if (t)while (n--)e[n][t] < r && (r = e[n][t]); else while (n--)e[n] < r && (r = e[n]);
        return r
    }

    var e = Array.prototype.slice;
    Array.prototype.indexOf || (Array.prototype.indexOf = function (e) {
        if (this === void 0 || this === null)throw new TypeError;
        var t = Object(this), n = t.length >>> 0;
        if (n === 0)return-1;
        var r = 0;
        arguments.length > 0 && (r = Number(arguments[1]), r !== r ? r = 0 : r !== 0 && r !== Number.POSITIVE_INFINITY && r !== Number.NEGATIVE_INFINITY && (r = (r > 0 || -1) * Math.floor(Math.abs(r))));
        if (r >= n)return-1;
        var i = r >= 0 ? r : Math.max(n - Math.abs(r), 0);
        for (; i < n; i++)if (i in t && t[i] === e)return i;
        return-1
    }), Array.prototype.forEach || (Array.prototype.forEach = function (e, t) {
        for (var n = 0, r = this.length >>> 0; n < r; n++)n in this && e.call(t, this[n], n, this)
    }), Array.prototype.map || (Array.prototype.map = function (e, t) {
        var n = [];
        for (var r = 0, i = this.length >>> 0; r < i; r++)r in this && (n[r] = e.call(t, this[r], r, this));
        return n
    }), Array.prototype.every || (Array.prototype.every = function (e, t) {
        for (var n = 0, r = this.length >>> 0; n < r; n++)if (n in this && !e.call(t, this[n], n, this))return!1;
        return!0
    }), Array.prototype.some || (Array.prototype.some = function (e, t) {
        for (var n = 0, r = this.length >>> 0; n < r; n++)if (n in this && e.call(t, this[n], n, this))return!0;
        return!1
    }), Array.prototype.filter || (Array.prototype.filter = function (e, t) {
        var n = [], r;
        for (var i = 0, s = this.length >>> 0; i < s; i++)i in this && (r = this[i], e.call(t, r, i, this) && n.push(r));
        return n
    }), Array.prototype.reduce || (Array.prototype.reduce = function (e) {
        var t = this.length >>> 0, n = 0, r;
        if (arguments.length > 1)r = arguments[1]; else do {
            if (n in this) {
                r = this[n++];
                break
            }
            if (++n >= t)throw new TypeError
        } while (!0);
        for (; n < t; n++)n in this && (r = e.call(null, r, this[n], n, this));
        return r
    }), fabric.util.array = {invoke: t, min: r, max: n}
})();
(function () {
    function e(e, t) {
        for (var n in t)e[n] = t[n];
        return e
    }

    function t(t) {
        return e({}, t)
    }

    fabric.util.object = {extend: e, clone: t}
})();
(function () {
    function e(e) {
        return e.replace(/-+(.)?/g, function (e, t) {
            return t ? t.toUpperCase() : ""
        })
    }

    function t(e) {
        return e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()
    }

    function n(e) {
        return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }

    String.prototype.trim || (String.prototype.trim = function () {
        return this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")
    }), fabric.util.string = {camelize: e, capitalize: t, escapeXml: n}
})();
(function () {
    var e = Array.prototype.slice, t = Function.prototype.apply, n = function () {
    };
    Function.prototype.bind || (Function.prototype.bind = function (r) {
        var i = this, s = e.call(arguments, 1), o;
        return s.length ? o = function () {
            return t.call(i, this instanceof n ? this : r, s.concat(e.call(arguments)))
        } : o = function () {
            return t.call(i, this instanceof n ? this : r, arguments)
        }, n.prototype = this.prototype, o.prototype = new n, o
    })
})();
(function () {
    function i() {
    }

    function s(t) {
        var n = this.constructor.superclass.prototype[t];
        return arguments.length > 1 ? n.apply(this, e.call(arguments, 1)) : n.call(this)
    }

    function o() {
        function u() {
            this.initialize.apply(this, arguments)
        }

        var n = null, o = e.call(arguments, 0);
        typeof o[0] == "function" && (n = o.shift()), u.superclass = n, u.subclasses = [], n && (i.prototype = n.prototype, u.prototype = new i, n.subclasses.push(u));
        for (var a = 0, f = o.length; a < f; a++)r(u, o[a], n);
        return u.prototype.initialize || (u.prototype.initialize = t), u.prototype.constructor = u, u.prototype.callSuper = s, u
    }

    var e = Array.prototype.slice, t = function () {
    }, n = function () {
        for (var e in{toString: 1})if (e === "toString")return!1;
        return!0
    }(), r = function (e, t, r) {
        for (var i in t)i in e.prototype && typeof e.prototype[i] == "function" && (t[i] + "").indexOf("callSuper") > -1 ? e.prototype[i] = function (e) {
            return function () {
                var n = this.constructor.superclass;
                this.constructor.superclass = r;
                var i = t[e].apply(this, arguments);
                this.constructor.superclass = n;
                if (e !== "initialize")return i
            }
        }(i) : e.prototype[i] = t[i], n && (t.toString !== Object.prototype.toString && (e.prototype.toString = t.toString), t.valueOf !== Object.prototype.valueOf && (e.prototype.valueOf = t.valueOf))
    };
    fabric.util.createClass = o
})();
(function () {
    function e(e) {
        var t = Array.prototype.slice.call(arguments, 1), n, r, i = t.length;
        for (r = 0; r < i; r++) {
            n = typeof e[t[r]];
            if (!/^(?:function|object|unknown)$/.test(n))return!1
        }
        return!0
    }

    function i(e, t) {
        return{handler: t, wrappedHandler: s(e, t)}
    }

    function s(e, t) {
        return function (r) {
            t.call(n(e), r || fabric.window.event)
        }
    }

    function o(e, t) {
        return function (n) {
            if (l[e] && l[e][t]) {
                var r = l[e][t];
                for (var i = 0, s = r.length; i < s; i++)r[i].call(this, n || fabric.window.event)
            }
        }
    }

    function p(e, t) {
        e || (e = fabric.window.event);
        var n = e.target || (typeof e.srcElement != "unknown" ? e.srcElement : null), r = fabric.document.body || {scrollLeft: 0, scrollTop: 0}, i = fabric.document.documentElement, s = n, o = 0, u = 0, a;
        while (n && n.parentNode && !a)n = n.parentNode, n !== fabric.document && fabric.util.getElementStyle(n, "position") === "fixed" && (a = n), n !== fabric.document && s !== t && fabric.util.getElementStyle(n, "position") === "absolute" ? (o = 0, u = 0) : n === fabric.document ? (o = r.scrollLeft || i.scrollLeft || 0, u = r.scrollTop || i.scrollTop || 0) : (o += n.scrollLeft || 0, u += n.scrollTop || 0);
        return{x: d(e) + o, y: v(e) + u}
    }

    var t = function () {
        var e = 0;
        return function (t) {
            return t.__uniqueID || (t.__uniqueID = "uniqueID__" + e++)
        }
    }(), n, r;
    (function () {
        var e = {};
        n = function (t) {
            return e[t]
        }, r = function (t, n) {
            e[t] = n
        }
    })();
    var u = e(fabric.document.documentElement, "addEventListener", "removeEventListener") && e(fabric.window, "addEventListener", "removeEventListener"), a = e(fabric.document.documentElement, "attachEvent", "detachEvent") && e(fabric.window, "attachEvent", "detachEvent"), f = {}, l = {}, c, h;
    u ? (c = function (e, t, n) {
        e.addEventListener(t, n, !1)
    }, h = function (e, t, n) {
        e.removeEventListener(t, n, !1)
    }) : a ? (c = function (e, n, s) {
        var o = t(e);
        r(o, e), f[o] || (f[o] = {}), f[o][n] || (f[o][n] = []);
        var u = i(o, s);
        f[o][n].push(u), e.attachEvent("on" + n, u.wrappedHandler)
    }, h = function (e, n, r) {
        var i = t(e), s;
        if (f[i] && f[i][n])for (var o = 0, u = f[i][n].length; o < u; o++)s = f[i][n][o], s && s.handler === r && (e.detachEvent("on" + n, s.wrappedHandler), f[i][n][o] = null)
    }) : (c = function (e, n, r) {
        var i = t(e);
        l[i] || (l[i] = {});
        if (!l[i][n]) {
            l[i][n] = [];
            var s = e["on" + n];
            s && l[i][n].push(s), e["on" + n] = o(i, n)
        }
        l[i][n].push(r)
    }, h = function (e, n, r) {
        var i = t(e);
        if (l[i] && l[i][n]) {
            var s = l[i][n];
            for (var o = 0, u = s.length; o < u; o++)s[o] === r && s.splice(o, 1)
        }
    }), fabric.util.addListener = c, fabric.util.removeListener = h;
    var d = function (e) {
        return typeof e.clientX != "unknown" ? e.clientX : 0
    }, v = function (e) {
        return typeof e.clientY != "unknown" ? e.clientY : 0
    };
    fabric.isTouchSupported && (d = function (e) {
        return e.type !== "touchend" ? e.touches && e.touches[0] ? e.touches[0].pageX - (e.touches[0].pageX - e.touches[0].clientX) || e.clientX : e.clientX : e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].pageX - (e.changedTouches[0].pageX - e.changedTouches[0].clientX) || e.clientX : e.clientX
    }, v = function (e) {
        return e.type !== "touchend" ? e.touches && e.touches[0] ? e.touches[0].pageY - (e.touches[0].pageY - e.touches[0].clientY) || e.clientY : e.clientY : e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].pageY - (e.changedTouches[0].pageY - e.changedTouches[0].clientY) || e.clientY : e.clientY
    }), fabric.util.getPointer = p, fabric.util.object.extend(fabric.util, fabric.Observable)
})();
(function () {
    function e(e, t) {
        var n = e.style;
        if (!n)return e;
        if (typeof t == "string")return e.style.cssText += ";" + t, t.indexOf("opacity") > -1 ? s(e, t.match(/opacity:\s*(\d?\.?\d*)/)[1]) : e;
        for (var r in t)if (r === "opacity")s(e, t[r]); else {
            var i = r === "float" || r === "cssFloat" ? typeof n.styleFloat == "undefined" ? "cssFloat" : "styleFloat" : r;
            n[i] = t[r]
        }
        return e
    }

    var t = fabric.document.createElement("div"), n = typeof t.style.opacity == "string", r = typeof t.style.filter == "string", i = /alpha\s*\(\s*opacity\s*=\s*([^\)]+)\)/, s = function (e) {
        return e
    };
    n ? s = function (e, t) {
        return e.style.opacity = t, e
    } : r && (s = function (e, t) {
        var n = e.style;
        return e.currentStyle && !e.currentStyle.hasLayout && (n.zoom = 1), i.test(n.filter) ? (t = t >= .9999 ? "" : "alpha(opacity=" + t * 100 + ")", n.filter = n.filter.replace(i, t)) : n.filter += " alpha(opacity=" + t * 100 + ")", e
    }), fabric.util.setStyle = e
})();
(function () {
    function t(e) {
        return typeof e == "string" ? fabric.document.getElementById(e) : e
    }

    function s(e, t) {
        var n = fabric.document.createElement(e);
        for (var r in t)r === "class" ? n.className = t[r] : r === "for" ? n.htmlFor = t[r] : n.setAttribute(r, t[r]);
        return n
    }

    function o(e, t) {
        (" " + e.className + " ").indexOf(" " + t + " ") === -1 && (e.className += (e.className ? " " : "") + t)
    }

    function u(e, t, n) {
        return typeof t == "string" && (t = s(t, n)), e.parentNode && e.parentNode.replaceChild(t, e), t.appendChild(e), t
    }

    function a(e) {
        var t, n, r = {left: 0, top: 0}, i = e && e.ownerDocument, s = {left: 0, top: 0}, o = {borderLeftWidth: "left", borderTopWidth: "top", paddingLeft: "left", paddingTop: "top"};
        if (!i)return{left: 0, top: 0};
        for (var u in o)s[o[u]] += parseInt(f(e, u), 10) || 0;
        return t = i.documentElement, typeof e.getBoundingClientRect != "undefined" && (r = e.getBoundingClientRect()), i != null && i === i.window ? n = i : n = i.nodeType === 9 && (i.defaultView || i.parentWindow), {left: r.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0) + s.left, top: r.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0) + s.top}
    }

    function f(e, t) {
        e.style || (e.style = {});
        if (fabric.document.defaultView && fabric.document.defaultView.getComputedStyle)return fabric.document.defaultView.getComputedStyle(e, null)[t];
        var n = e.style[t];
        return!n && e.currentStyle && (n = e.currentStyle[t]), n
    }

    var e = Array.prototype.slice, n = function (t) {
        return e.call(t, 0)
    }, r;
    try {
        r = n(fabric.document.childNodes)instanceof Array
    } catch (i) {
    }
    r || (n = function (e) {
        var t = new Array(e.length), n = e.length;
        while (n--)t[n] = e[n];
        return t
    }), function () {
        function n(e) {
            return typeof e.onselectstart != "undefined" && (e.onselectstart = fabric.util.falseFunction), t ? e.style[t] = "none" : typeof e.unselectable == "string" && (e.unselectable = "on"), e
        }

        function r(e) {
            return typeof e.onselectstart != "undefined" && (e.onselectstart = null), t ? e.style[t] = "" : typeof e.unselectable == "string" && (e.unselectable = ""), e
        }

        var e = fabric.document.documentElement.style, t = "userSelect"in e ? "userSelect" : "MozUserSelect"in e ? "MozUserSelect" : "WebkitUserSelect"in e ? "WebkitUserSelect" : "KhtmlUserSelect"in e ? "KhtmlUserSelect" : "";
        fabric.util.makeElementUnselectable = n, fabric.util.makeElementSelectable = r
    }(), function () {
        function e(e, t) {
            var n = fabric.document.getElementsByTagName("head")[0], r = fabric.document.createElement("script"), i = !0;
            r.onload = r.onreadystatechange = function (e) {
                if (i) {
                    if (typeof this.readyState == "string" && this.readyState !== "loaded" && this.readyState !== "complete")return;
                    i = !1, t(e || fabric.window.event), r = r.onload = r.onreadystatechange = null
                }
            }, r.src = e, n.appendChild(r)
        }

        fabric.util.getScript = e
    }(), fabric.util.getById = t, fabric.util.toArray = n, fabric.util.makeElement = s, fabric.util.addClass = o, fabric.util.wrapElement = u, fabric.util.getElementOffset = a, fabric.util.getElementStyle = f
})();
(function () {
    function e(e, t) {
        return e + (/\?/.test(e) ? "&" : "?") + t
    }

    function n() {
    }

    function r(r, i) {
        i || (i = {});
        var s = i.method ? i.method.toUpperCase() : "GET", o = i.onComplete || function () {
        }, u = t(), a;
        return u.onreadystatechange = function () {
            u.readyState === 4 && (o(u), u.onreadystatechange = n)
        }, s === "GET" && (a = null, typeof i.parameters == "string" && (r = e(r, i.parameters))), u.open(s, r, !0), (s === "POST" || s === "PUT") && u.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), u.send(a), u
    }

    var t = function () {
        var e = [function () {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }, function () {
            return new ActiveXObject("Msxml2.XMLHTTP")
        }, function () {
            return new ActiveXObject("Msxml2.XMLHTTP.3.0")
        }, function () {
            return new XMLHttpRequest
        }];
        for (var t = e.length; t--;)try {
            var n = e[t]();
            if (n)return e[t]
        } catch (r) {
        }
    }();
    fabric.util.request = r
})();
(function () {
    function e(e, t, n, r) {
        return n * (e /= r) * e + t
    }

    function t(e, t, n, r) {
        return-n * (e /= r) * (e - 2) + t
    }

    function n(e, t, n, r) {
        return e /= r / 2, e < 1 ? n / 2 * e * e + t : -n / 2 * (--e * (e - 2) - 1) + t
    }

    function r(e, t, n, r) {
        return n * (e /= r) * e * e + t
    }

    function i(e, t, n, r) {
        return n * ((e = e / r - 1) * e * e + 1) + t
    }

    function s(e, t, n, r) {
        return e /= r / 2, e < 1 ? n / 2 * e * e * e + t : n / 2 * ((e -= 2) * e * e + 2) + t
    }

    function o(e, t, n, r) {
        return n * (e /= r) * e * e * e + t
    }

    function u(e, t, n, r) {
        return-n * ((e = e / r - 1) * e * e * e - 1) + t
    }

    function a(e, t, n, r) {
        return e /= r / 2, e < 1 ? n / 2 * e * e * e * e + t : -n / 2 * ((e -= 2) * e * e * e - 2) + t
    }

    function f(e, t, n, r) {
        return n * (e /= r) * e * e * e * e + t
    }

    function l(e, t, n, r) {
        return n * ((e = e / r - 1) * e * e * e * e + 1) + t
    }

    function c(e, t, n, r) {
        return e /= r / 2, e < 1 ? n / 2 * e * e * e * e * e + t : n / 2 * ((e -= 2) * e * e * e * e + 2) + t
    }

    function h(e, t, n, r) {
        return-n * Math.cos(e / r * (Math.PI / 2)) + n + t
    }

    function p(e, t, n, r) {
        return n * Math.sin(e / r * (Math.PI / 2)) + t
    }

    function d(e, t, n, r) {
        return-n / 2 * (Math.cos(Math.PI * e / r) - 1) + t
    }

    function v(e, t, n, r) {
        return e === 0 ? t : n * Math.pow(2, 10 * (e / r - 1)) + t
    }

    function m(e, t, n, r) {
        return e === r ? t + n : n * (-Math.pow(2, -10 * e / r) + 1) + t
    }

    function g(e, t, n, r) {
        return e === 0 ? t : e === r ? t + n : (e /= r / 2, e < 1 ? n / 2 * Math.pow(2, 10 * (e - 1)) + t : n / 2 * (-Math.pow(2, -10 * --e) + 2) + t)
    }

    function y(e, t, n, r) {
        return-n * (Math.sqrt(1 - (e /= r) * e) - 1) + t
    }

    function b(e, t, n, r) {
        return n * Math.sqrt(1 - (e = e / r - 1) * e) + t
    }

    function w(e, t, n, r) {
        return e /= r / 2, e < 1 ? -n / 2 * (Math.sqrt(1 - e * e) - 1) + t : n / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + t
    }

    function E(e, t, n, r) {
        var i = 1.70158, s = 0, o = n;
        return e === 0 ? t : (e /= r, e === 1 ? t + n : (s || (s = r * .3), o < Math.abs(n) ? (o = n, i = s / 4) : i = s / (2 * Math.PI) * Math.asin(n / o), -(o * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * r - i) * 2 * Math.PI / s)) + t))
    }

    function S(e, t, n, r) {
        var i = 1.70158, s = 0, o = n;
        return e === 0 ? t : (e /= r, e === 1 ? t + n : (s || (s = r * .3), o < Math.abs(n) ? (o = n, i = s / 4) : i = s / (2 * Math.PI) * Math.asin(n / o), o * Math.pow(2, -10 * e) * Math.sin((e * r - i) * 2 * Math.PI / s) + n + t))
    }

    function x(e, t, n, r) {
        var i = 1.70158, s = 0, o = n;
        return e === 0 ? t : (e /= r / 2, e === 2 ? t + n : (s || (s = r * .3 * 1.5), o < Math.abs(n) ? (o = n, i = s / 4) : i = s / (2 * Math.PI) * Math.asin(n / o), e < 1 ? -0.5 * o * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * r - i) * 2 * Math.PI / s) + t : o * Math.pow(2, -10 * (e -= 1)) * Math.sin((e * r - i) * 2 * Math.PI / s) * .5 + n + t))
    }

    function T(e, t, n, r, i) {
        return i === undefined && (i = 1.70158), n * (e /= r) * e * ((i + 1) * e - i) + t
    }

    function N(e, t, n, r, i) {
        return i === undefined && (i = 1.70158), n * ((e = e / r - 1) * e * ((i + 1) * e + i) + 1) + t
    }

    function C(e, t, n, r, i) {
        return i === undefined && (i = 1.70158), e /= r / 2, e < 1 ? n / 2 * e * e * (((i *= 1.525) + 1) * e - i) + t : n / 2 * ((e -= 2) * e * (((i *= 1.525) + 1) * e + i) + 2) + t
    }

    function k(e, t, n, r) {
        return n - L(r - e, 0, n, r) + t
    }

    function L(e, t, n, r) {
        return(e /= r) < 1 / 2.75 ? n * 7.5625 * e * e + t : e < 2 / 2.75 ? n * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + t : e < 2.5 / 2.75 ? n * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + t : n * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + t
    }

    function A(e, t, n, r) {
        return e < r / 2 ? k(e * 2, 0, n, r) * .5 + t : L(e * 2 - r, 0, n, r) * .5 + n * .5 + t
    }

    fabric.util.ease = {easeInQuad: e, easeOutQuad: t, easeInOutQuad: n, easeInCubic: r, easeOutCubic: i, easeInOutCubic: s, easeInQuart: o, easeOutQuart: u, easeInOutQuart: a, easeInQuint: f, easeOutQuint: l, easeInOutQuint: c, easeInSine: h, easeOutSine: p, easeInOutSine: d, easeInExpo: v, easeOutExpo: m, easeInOutExpo: g, easeInCirc: y, easeOutCirc: b, easeInOutCirc: w, easeInElastic: E, easeOutElastic: S, easeInOutElastic: x, easeInBack: T, easeOutBack: N, easeInOutBack: C, easeInBounce: k, easeOutBounce: L, easeInOutBounce: A}
})();
(function (e) {
    "use strict";
    function f(e) {
        return e in u ? u[e] : e
    }

    function l(e, n, r) {
        var i;
        e !== "fill" && e !== "stroke" || n !== "none" ? e === "fillRule" ? n = n === "evenodd" ? "destination-over" : n : e === "strokeDashArray" ? n = n.replace(/,/g, " ").split(/\s+/) : e === "transformMatrix" && (r && r.transformMatrix ? n = o(r.transformMatrix, t.parseTransformAttribute(n)) : n = t.parseTransformAttribute(n)) : n = "", i = Object.prototype.toString.call(n) === "[object Array]";
        var s = i ? n.map(parseFloat) : parseFloat(n);
        return!i && isNaN(s) ? n : s
    }

    function c(e) {
        for (var n in a) {
            if (!e[n] || typeof e[a[n]] == "undefined")continue;
            var r = new t.Color(e[n]);
            e[n] = r.setAlpha(s(r.getAlpha() * e[a[n]], 2)).toRgba(), delete e[a[n]]
        }
        return e
    }

    function h(e, r) {
        if (!e)return;
        var i, s = {};
        e.parentNode && /^g$/i.test(e.parentNode.nodeName) && (s = t.parseAttributes(e.parentNode, r));
        var o = r.reduce(function (t, n) {
            return i = e.getAttribute(n), i && (n = f(n), i = l(n, i, s), t[n] = i), t
        }, {});
        return o = n(o, n(b(e), t.parseStyleAttribute(e))), c(n(s, o))
    }

    function p(e) {
        if (!e)return null;
        e = e.trim();
        var t = e.indexOf(",") > -1;
        e = e.split(/\s+/);
        var n = [], r, i;
        if (t) {
            r = 0, i = e.length;
            for (; r < i; r++) {
                var s = e[r].split(",");
                n.push({x: parseFloat(s[0]), y: parseFloat(s[1])})
            }
        } else {
            r = 0, i = e.length;
            for (; r < i; r += 2)n.push({x: parseFloat(e[r]), y: parseFloat(e[r + 1])})
        }
        return n.length % 2 !== 0, n
    }

    function d(e, t) {
        var n = e.match(/(normal|italic)?\s*(normal|small-caps)?\s*(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)?\s*(\d+)px(?:\/(normal|[\d\.]+))?\s+(.*)/);
        if (!n)return;
        var r = n[1], i = n[3], s = n[4], o = n[5], u = n[6];
        r && (t.fontStyle = r), i && (t.fontSize = isNaN(parseFloat(i)) ? i : parseFloat(i)), s && (t.fontSize = parseFloat(s)), u && (t.fontFamily = u), o && (t.lineHeight = o === "normal" ? 1 : o)
    }

    function v(e) {
        var t = {}, n = e.getAttribute("style"), r, i;
        if (!n)return t;
        if (typeof n == "string")n.replace(/;$/, "").split(";").forEach(function (e) {
            var n = e.split(":");
            r = f(n[0].trim().toLowerCase()), i = l(r, n[1].trim()), r === "font" ? d(i, t) : t[r] = i
        }); else for (var s in n) {
            if (typeof n[s] == "undefined")continue;
            r = f(s.toLowerCase()), i = l(r, n[s]), r === "font" ? d(i, t) : t[r] = i
        }
        return t
    }

    function m(e) {
        for (var n = e.length; n--;) {
            var r = e[n].get("fill");
            if (/^url\(/.test(r)) {
                var i = r.slice(5, r.length - 1);
                t.gradientDefs[i] && e[n].set("fill", t.Gradient.fromElement(t.gradientDefs[i], e[n]))
            }
        }
    }

    function g(e, n, i, s) {
        function a() {
            --u === 0 && (o = o.filter(function (e) {
                return e != null
            }), m(o), n(o))
        }

        var o = new Array(e.length), u = e.length;
        for (var f = 0, l, c = e.length; f < c; f++) {
            l = e[f];
            var h = t[r(l.tagName)];
            if (h && h.fromElement)try {
                if (h.async)h.fromElement(l, function (e, t) {
                    return function (n) {
                        s && s(t, n), o.splice(e, 0, n), a()
                    }
                }(f, l), i); else {
                    var p = h.fromElement(l, i);
                    s && s(l, p), o.splice(f, 0, p), a()
                }
            } catch (d) {
                t.log(d)
            } else a()
        }
    }

    function y(e) {
        var t = e.getElementsByTagName("style"), n = {}, r;
        for (var i = 0, s = t.length; i < s; i++) {
            var o = t[0].textContent;
            o = o.replace(/\/\*[\s\S]*?\*\//g, ""), r = o.match(/[^{]*\{[\s\S]*?\}/g), r = r.map(function (e) {
                return e.trim()
            }), r.forEach(function (e) {
                var t = e.match(/([\s\S]*?)\s*\{([^}]*)\}/);
                e = t[1];
                var r = t[2].trim(), i = r.replace(/;$/, "").split(/\s*;\s*/);
                n[e] || (n[e] = {});
                for (var s = 0, o = i.length; s < o; s++) {
                    var u = i[s].split(/\s*:\s*/), a = u[0], f = u[1];
                    n[e][a] = f
                }
            })
        }
        return n
    }

    function b(e) {
        var n = e.nodeName, r = e.getAttribute("class"), i = e.getAttribute("id"), s = {};
        for (var o in t.cssRules) {
            var u = r && (new RegExp("^\\." + r)).test(o) || i && (new RegExp("^#" + i)).test(o) || (new RegExp("^" + n)).test(o);
            if (u)for (var a in t.cssRules[o])s[a] = t.cssRules[o][a]
        }
        return s
    }

    function E(e, n, r) {
        function i(i) {
            var s = i.responseXML;
            !s.documentElement && t.window.ActiveXObject && i.responseText && (s = new ActiveXObject("Microsoft.XMLDOM"), s.async = "false", s.loadXML(i.responseText.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i, "")));
            if (!s.documentElement)return;
            t.parseSVGDocument(s.documentElement, function (r, i) {
                w.set(e, {objects: t.util.array.invoke(r, "toObject"), options: i}), n(r, i)
            }, r)
        }

        e = e.replace(/^\n\s*/, "").trim(), w.has(e, function (r) {
            r ? w.get(e, function (e) {
                var t = S(e);
                n(t.objects, t.options)
            }) : new t.util.request(e, {method: "get", onComplete: i})
        })
    }

    function S(e) {
        var n = e.objects, i = e.options;
        return n = n.map(function (e) {
            return t[r(e.type)].fromObject(e)
        }), {objects: n, options: i}
    }

    function x(e, n, r) {
        e = e.trim();
        var i;
        if (typeof DOMParser != "undefined") {
            var s = new DOMParser;
            s && s.parseFromString && (i = s.parseFromString(e, "text/xml"))
        } else t.window.ActiveXObject && (i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(e.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i, "")));
        t.parseSVGDocument(i.documentElement, function (e, t) {
            n(e, t)
        }, r)
    }

    function T(e) {
        var t = "";
        for (var n = 0, r = e.length; n < r; n++) {
            if (e[n].type !== "text" || !e[n].path)continue;
            t += ["@font-face {", "font-family: ", e[n].fontFamily, "; ", "src: url('", e[n].path, "')", "}"].join("")
        }
        return t && (t = ['<style type="text/css">', "<![CDATA[", t, "]]>", "</style>"].join("")), t
    }

    function N(e) {
        var t = "";
        return e.backgroundColor && e.backgroundColor.source && (t = ['<pattern x="0" y="0" id="backgroundColorPattern" ', 'width="', e.backgroundColor.source.width, '" height="', e.backgroundColor.source.height, '" patternUnits="userSpaceOnUse">', '<image x="0" y="0" ', 'width="', e.backgroundColor.source.width, '" height="', e.backgroundColor.source.height, '" xlink:href="', e.backgroundColor.source.src, '"></image></pattern>'].join("")), t
    }

    function C(e) {
        var t = e.getElementsByTagName("linearGradient"), n = e.getElementsByTagName("radialGradient"), r, i, s = {};
        i = t.length;
        for (; i--;)r = t[i], s[r.getAttribute("id")] = r;
        i = n.length;
        for (; i--;)r = n[i], s[r.getAttribute("id")] = r;
        return s
    }

    var t = e.fabric || (e.fabric = {}), n = t.util.object.extend, r = t.util.string.capitalize, i = t.util.object.clone, s = t.util.toFixed, o = t.util.multiplyTransformMatrices;
    t.SHARED_ATTRIBUTES = ["transform", "fill", "fill-opacity", "fill-rule", "opacity", "stroke", "stroke-dasharray", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width"];
    var u = {"fill-opacity": "fillOpacity", "fill-rule": "fillRule", "font-family": "fontFamily", "font-size": "fontSize", "font-style": "fontStyle", "font-weight": "fontWeight", cx: "left", x: "left", r: "radius", "stroke-dasharray": "strokeDashArray", "stroke-linecap": "strokeLineCap", "stroke-linejoin": "strokeLineJoin", "stroke-miterlimit": "strokeMiterLimit", "stroke-opacity": "strokeOpacity", "stroke-width": "strokeWidth", "text-decoration": "textDecoration", cy: "top", y: "top", transform: "transformMatrix"}, a = {stroke: "strokeOpacity", fill: "fillOpacity"};
    t.parseTransformAttribute = function () {
        function e(e, t) {
            var n = t[0];
            e[0] = Math.cos(n), e[1] = Math.sin(n), e[2] = -Math.sin(n), e[3] = Math.cos(n)
        }

        function n(e, t) {
            var n = t[0], r = t.length === 2 ? t[1] : t[0];
            e[0] = n, e[3] = r
        }

        function r(e, t) {
            e[2] = t[0]
        }

        function i(e, t) {
            e[1] = t[0]
        }

        function s(e, t) {
            e[4] = t[0], t.length === 2 && (e[5] = t[1])
        }

        var o = [1, 0, 0, 1, 0, 0], u = "(?:[-+]?\\d+(?:\\.\\d+)?(?:e[-+]?\\d+)?)", a = "(?:\\s+,?\\s*|,\\s*)", f = "(?:(skewX)\\s*\\(\\s*(" + u + ")\\s*\\))", l = "(?:(skewY)\\s*\\(\\s*(" + u + ")\\s*\\))", c = "(?:(rotate)\\s*\\(\\s*(" + u + ")(?:" + a + "(" + u + ")" + a + "(" + u + "))?\\s*\\))", h = "(?:(scale)\\s*\\(\\s*(" + u + ")(?:" + a + "(" + u + "))?\\s*\\))", p = "(?:(translate)\\s*\\(\\s*(" + u + ")(?:" + a + "(" + u + "))?\\s*\\))", d = "(?:(matrix)\\s*\\(\\s*(" + u + ")" + a + "(" + u + ")" + a + "(" + u + ")" + a + "(" + u + ")" + a + "(" + u + ")" + a + "(" + u + ")" + "\\s*\\))", v = "(?:" + d + "|" + p + "|" + h + "|" + c + "|" + f + "|" + l + ")", m = "(?:" + v + "(?:" + a + v + ")*" + ")", g = "^\\s*(?:" + m + "?)\\s*$", y = new RegExp(g), b = new RegExp(v, "g");
        return function (u) {
            var a = o.concat(), f = [];
            if (!u || u && !y.test(u))return a;
            u.replace(b, function (t) {
                var u = (new RegExp(v)).exec(t).filter(function (e) {
                    return e !== "" && e != null
                }), l = u[1], c = u.slice(2).map(parseFloat);
                switch (l) {
                    case"translate":
                        s(a, c);
                        break;
                    case"rotate":
                        e(a, c);
                        break;
                    case"scale":
                        n(a, c);
                        break;
                    case"skewX":
                        r(a, c);
                        break;
                    case"skewY":
                        i(a, c);
                        break;
                    case"matrix":
                        a = c
                }
                f.push(a.concat()), a = o.concat()
            });
            var l = f[0];
            while (f.length > 1)f.shift(), l = t.util.multiplyTransformMatrices(l, f[0]);
            return l
        }
    }(), t.parseSVGDocument = function () {
        function s(e, t) {
            while (e && (e = e.parentNode))if (t.test(e.nodeName))return!0;
            return!1
        }

        var e = /^(path|circle|polygon|polyline|ellipse|rect|line|image|text)$/, n = "(?:[-+]?\\d+(?:\\.\\d+)?(?:e[-+]?\\d+)?)", r = new RegExp("^\\s*(" + n + "+)\\s*,?" + "\\s*(" + n + "+)\\s*,?" + "\\s*(" + n + "+)\\s*,?" + "\\s*(" + n + "+)\\s*" + "$");
        return function (n, o, u) {
            if (!n)return;
            var a = new Date, f = t.util.toArray(n.getElementsByTagName("*"));
            if (f.length === 0) {
                f = n.selectNodes("//*[name(.)!='svg']");
                var l = [];
                for (var c = 0, h = f.length; c < h; c++)l[c] = f[c];
                f = l
            }
            var p = f.filter(function (t) {
                return e.test(t.tagName) && !s(t, /^(?:pattern|defs)$/)
            });
            if (!p || p && !p.length)return;
            var d = n.getAttribute("viewBox"), v = n.getAttribute("width"), m = n.getAttribute("height"), g = null, b = null, w, E;
            d && (d = d.match(r)) && (w = parseInt(d[1], 10), E = parseInt(d[2], 10), g = parseInt(d[3], 10), b = parseInt(d[4], 10)), g = v ? parseFloat(v) : g, b = m ? parseFloat(m) : b;
            var S = {width: g, height: b};
            t.gradientDefs = t.getGradientDefs(n), t.cssRules = y(n), t.parseElements(p, function (e) {
                t.documentParsingTime = new Date - a, o && o(e, S)
            }, i(S), u)
        }
    }();
    var w = {has: function (e, t) {
        t(!1)
    }, get: function () {
    }, set: function () {
    }};
    n(t, {parseAttributes: h, parseElements: g, parseStyleAttribute: v, parsePointsAttribute: p, getCSSRules: y, loadSVGFromURL: E, loadSVGFromString: x, createSVGFontFacesMarkup: T, createSVGRefElementsMarkup: N, getGradientDefs: C})
})(typeof exports != "undefined" ? exports : this);
(function (e) {
    "use strict";
    function n(e, t) {
        this.x = e, this.y = t
    }

    var t = e.fabric || (e.fabric = {});
    if (t.Point) {
        t.warn("fabric.Point is already defined");
        return
    }
    t.Point = n, n.prototype = {constructor: n, add: function (e) {
        return new n(this.x + e.x, this.y + e.y)
    }, addEquals: function (e) {
        return this.x += e.x, this.y += e.y, this
    }, scalarAdd: function (e) {
        return new n(this.x + e, this.y + e)
    }, scalarAddEquals: function (e) {
        return this.x += e, this.y += e, this
    }, subtract: function (e) {
        return new n(this.x - e.x, this.y - e.y)
    }, subtractEquals: function (e) {
        return this.x -= e.x, this.y -= e.y, this
    }, scalarSubtract: function (e) {
        return new n(this.x - e, this.y - e)
    }, scalarSubtractEquals: function (e) {
        return this.x -= e, this.y -= e, this
    }, multiply: function (e) {
        return new n(this.x * e, this.y * e)
    }, multiplyEquals: function (e) {
        return this.x *= e, this.y *= e, this
    }, divide: function (e) {
        return new n(this.x / e, this.y / e)
    }, divideEquals: function (e) {
        return this.x /= e, this.y /= e, this
    }, eq: function (e) {
        return this.x === e.x && this.y === e.y
    }, lt: function (e) {
        return this.x < e.x && this.y < e.y
    }, lte: function (e) {
        return this.x <= e.x && this.y <= e.y
    }, gt: function (e) {
        return this.x > e.x && this.y > e.y
    }, gte: function (e) {
        return this.x >= e.x && this.y >= e.y
    }, lerp: function (e, t) {
        return new n(this.x + (e.x - this.x) * t, this.y + (e.y - this.y) * t)
    }, distanceFrom: function (e) {
        var t = this.x - e.x, n = this.y - e.y;
        return Math.sqrt(t * t + n * n)
    }, midPointFrom: function (e) {
        return new n(this.x + (e.x - this.x) / 2, this.y + (e.y - this.y) / 2)
    }, min: function (e) {
        return new n(Math.min(this.x, e.x), Math.min(this.y, e.y))
    }, max: function (e) {
        return new n(Math.max(this.x, e.x), Math.max(this.y, e.y))
    }, toString: function () {
        return this.x + "," + this.y
    }, setXY: function (e, t) {
        this.x = e, this.y = t
    }, setFromPoint: function (e) {
        this.x = e.x, this.y = e.y
    }, swap: function (e) {
        var t = this.x, n = this.y;
        this.x = e.x, this.y = e.y, e.x = t, e.y = n
    }}
})(typeof exports != "undefined" ? exports : this);
(function (e) {
    "use strict";
    function n(e) {
        this.status = e, this.points = []
    }

    var t = e.fabric || (e.fabric = {});
    if (t.Intersection) {
        t.warn("fabric.Intersection is already defined");
        return
    }
    t.Intersection = n, t.Intersection.prototype = {appendPoint: function (e) {
        this.points.push(e)
    }, appendPoints: function (e) {
        this.points = this.points.concat(e)
    }}, t.Intersection.intersectLineLine = function (e, r, i, s) {
        var o, u = (s.x - i.x) * (e.y - i.y) - (s.y - i.y) * (e.x - i.x), a = (r.x - e.x) * (e.y - i.y) - (r.y - e.y) * (e.x - i.x), f = (s.y - i.y) * (r.x - e.x) - (s.x - i.x) * (r.y - e.y);
        if (f !== 0) {
            var l = u / f, c = a / f;
            0 <= l && l <= 1 && 0 <= c && c <= 1 ? (o = new n("Intersection"), o.points.push(new t.Point(e.x + l * (r.x - e.x), e.y + l * (r.y - e.y)))) : o = new n
        } else u === 0 || a === 0 ? o = new n("Coincident") : o = new n("Parallel");
        return o
    }, t.Intersection.intersectLinePolygon = function (e, t, r) {
        var i = new n, s = r.length;
        for (var o = 0; o < s; o++) {
            var u = r[o], a = r[(o + 1) % s], f = n.intersectLineLine(e, t, u, a);
            i.appendPoints(f.points)
        }
        return i.points.length > 0 && (i.status = "Intersection"), i
    }, t.Intersection.intersectPolygonPolygon = function (e, t) {
        var r = new n, i = e.length;
        for (var s = 0; s < i; s++) {
            var o = e[s], u = e[(s + 1) % i], a = n.intersectLinePolygon(o, u, t);
            r.appendPoints(a.points)
        }
        return r.points.length > 0 && (r.status = "Intersection"), r
    }, t.Intersection.intersectPolygonRectangle = function (e, r, i) {
        var s = r.min(i), o = r.max(i), u = new t.Point(o.x, s.y), a = new t.Point(s.x, o.y), f = n.intersectLinePolygon(s, u, e), l = n.intersectLinePolygon(u, o, e), c = n.intersectLinePolygon(o, a, e), h = n.intersectLinePolygon(a, s, e), p = new n;
        return p.appendPoints(f.points), p.appendPoints(l.points), p.appendPoints(c.points), p.appendPoints(h.points), p.points.length > 0 && (p.status = "Intersection"), p
    }
})(typeof exports != "undefined" ? exports : this);
(function (e) {
    "use strict";
    function n(e) {
        e ? this._tryParsingColor(e) : this.setSource([0, 0, 0, 1])
    }

    function r(e, t, n) {
        return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < .5 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
    }

    var t = e.fabric || (e.fabric = {});
    if (t.Color) {
        t.warn("fabric.Color is already defined.");
        return
    }
    t.Color = n, t.Color.prototype = {_tryParsingColor: function (e) {
        var t;
        e in n.colorNameMap && (e = n.colorNameMap[e]), t = n.sourceFromHex(e), t || (t = n.sourceFromRgb(e)), t || (t = n.sourceFromHsl(e)), t && this.setSource(t)
    }, _rgbToHsl: function (e, n, r) {
        e /= 255, n /= 255, r /= 255;
        var i, s, o, u = t.util.array.max([e, n, r]), a = t.util.array.min([e, n, r]);
        o = (u + a) / 2;
        if (u === a)i = s = 0; else {
            var f = u - a;
            s = o > .5 ? f / (2 - u - a) : f / (u + a);
            switch (u) {
                case e:
                    i = (n - r) / f + (n < r ? 6 : 0);
                    break;
                case n:
                    i = (r - e) / f + 2;
                    break;
                case r:
                    i = (e - n) / f + 4
            }
            i /= 6
        }
        return[Math.round(i * 360), Math.round(s * 100), Math.round(o * 100)]
    }, getSource: function () {
        return this._source
    }, setSource: function (e) {
        this._source = e
    }, toRgb: function () {
        var e = this.getSource();
        return"rgb(" + e[0] + "," + e[1] + "," + e[2] + ")"
    }, toRgba: function () {
        var e = this.getSource();
        return"rgba(" + e[0] + "," + e[1] + "," + e[2] + "," + e[3] + ")"
    }, toHsl: function () {
        var e = this.getSource(), t = this._rgbToHsl(e[0], e[1], e[2]);
        return"hsl(" + t[0] + "," + t[1] + "%," + t[2] + "%)"
    }, toHsla: function () {
        var e = this.getSource(), t = this._rgbToHsl(e[0], e[1], e[2]);
        return"hsla(" + t[0] + "," + t[1] + "%," + t[2] + "%," + e[3] + ")"
    }, toHex: function () {
        var e = this.getSource(), t = e[0].toString(16);
        t = t.length === 1 ? "0" + t : t;
        var n = e[1].toString(16);
        n = n.length === 1 ? "0" + n : n;
        var r = e[2].toString(16);
        return r = r.length === 1 ? "0" + r : r, t.toUpperCase() + n.toUpperCase() + r.toUpperCase()
    }, getAlpha: function () {
        return this.getSource()[3]
    }, setAlpha: function (e) {
        var t = this.getSource();
        return t[3] = e, this.setSource(t), this
    }, toGrayscale: function () {
        var e = this.getSource(), t = parseInt((e[0] * .3 + e[1] * .59 + e[2] * .11).toFixed(0), 10), n = e[3];
        return this.setSource([t, t, t, n]), this
    }, toBlackWhite: function (e) {
        var t = this.getSource(), n = (t[0] * .3 + t[1] * .59 + t[2] * .11).toFixed(0), r = t[3];
        return e = e || 127, n = Number(n) < Number(e) ? 0 : 255, this.setSource([n, n, n, r]), this
    }, overlayWith: function (e) {
        e instanceof n || (e = new n(e));
        var t = [], r = this.getAlpha(), i = .5, s = this.getSource(), o = e.getSource();
        for (var u = 0; u < 3; u++)t.push(Math.round(s[u] * (1 - i) + o[u] * i));
        return t[3] = r, this.setSource(t), this
    }}, t.Color.reRGBa = /^rgba?\(\s*(\d{1,3}\%?)\s*,\s*(\d{1,3}\%?)\s*,\s*(\d{1,3}\%?)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/, t.Color.reHSLa = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}\%)\s*,\s*(\d{1,3}\%)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/, t.Color.reHex = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i, t.Color.colorNameMap = {aqua: "#00FFFF", black: "#000000", blue: "#0000FF", fuchsia: "#FF00FF", gray: "#808080", green: "#008000", lime: "#00FF00", maroon: "#800000", navy: "#000080", olive: "#808000", purple: "#800080", red: "#FF0000", silver: "#C0C0C0", teal: "#008080", white: "#FFFFFF", yellow: "#FFFF00"}, t.Color.fromRgb = function (e) {
        return n.fromSource(n.sourceFromRgb(e))
    }, t.Color.sourceFromRgb = function (e) {
        var t = e.match(n.reRGBa);
        if (t) {
            var r = parseInt(t[1], 10) / (/%$/.test(t[1]) ? 100 : 1) * (/%$/.test(t[1]) ? 255 : 1), i = parseInt(t[2], 10) / (/%$/.test(t[2]) ? 100 : 1) * (/%$/.test(t[2]) ? 255 : 1), s = parseInt(t[3], 10) / (/%$/.test(t[3]) ? 100 : 1) * (/%$/.test(t[3]) ? 255 : 1);
            return[parseInt(r, 10), parseInt(i, 10), parseInt(s, 10), t[4] ? parseFloat(t[4]) : 1]
        }
    }, t.Color.fromRgba = n.fromRgb, t.Color.fromHsl = function (e) {
        return n.fromSource(n.sourceFromHsl(e))
    }, t.Color.sourceFromHsl = function (e) {
        var t = e.match(n.reHSLa);
        if (!t)return;
        var i = (parseFloat(t[1]) % 360 + 360) % 360 / 360, s = parseFloat(t[2]) / (/%$/.test(t[2]) ? 100 : 1), o = parseFloat(t[3]) / (/%$/.test(t[3]) ? 100 : 1), u, a, f;
        if (s === 0)u = a = f = o; else {
            var l = o <= .5 ? o * (s + 1) : o + s - o * s, c = o * 2 - l;
            u = r(c, l, i + 1 / 3), a = r(c, l, i), f = r(c, l, i - 1 / 3)
        }
        return[Math.round(u * 255), Math.round(a * 255), Math.round(f * 255), t[4] ? parseFloat(t[4]) : 1]
    }, t.Color.fromHsla = n.fromHsl, t.Color.fromHex = function (e) {
        return n.fromSource(n.sourceFromHex(e))
    }, t.Color.sourceFromHex = function (e) {
        if (e.match(n.reHex)) {
            var t = e.slice(e.indexOf("#") + 1), r = t.length === 3, i = r ? t.charAt(0) + t.charAt(0) : t.substring(0, 2), s = r ? t.charAt(1) + t.charAt(1) : t.substring(2, 4), o = r ? t.charAt(2) + t.charAt(2) : t.substring(4, 6);
            return[parseInt(i, 16), parseInt(s, 16), parseInt(o, 16), 1]
        }
    }, t.Color.fromSource = function (e) {
        var t = new n;
        return t.setSource(e), t
    }
})(typeof exports != "undefined" ? exports : this);
(function () {
    function e(e) {
        var t = e.getAttribute("style"), n = e.getAttribute("offset"), r, i;
        n = parseFloat(n) / (/%$/.test(n) ? 100 : 1);
        if (t) {
            var s = t.split(/\s*;\s*/);
            s[s.length - 1] === "" && s.pop();
            for (var o = s.length; o--;) {
                var u = s[o].split(/\s*:\s*/), a = u[0].trim(), f = u[1].trim();
                a === "stop-color" ? r = f : a === "stop-opacity" && (i = f)
            }
        }
        return r || (r = e.getAttribute("stop-color") || "rgb(0,0,0)"), i || (i = e.getAttribute("stop-opacity")), r = (new fabric.Color(r)).toRgb(), {offset: n, color: r, opacity: isNaN(parseFloat(i)) ? 1 : parseFloat(i)}
    }

    function t(e, t) {
        for (var n in t) {
            if (typeof t[n] == "string" && /^\d+%$/.test(t[n])) {
                var r = parseFloat(t[n], 10);
                if (n === "x1" || n === "x2" || n === "r2")t[n] = fabric.util.toFixed(e.width * r / 100, 2); else if (n === "y1" || n === "y2")t[n] = fabric.util.toFixed(e.height * r / 100, 2)
            }
            if (n === "x1" || n === "x2")t[n] -= fabric.util.toFixed(e.width / 2, 2); else if (n === "y1" || n === "y2")t[n] -= fabric.util.toFixed(e.height / 2, 2)
        }
    }

    function n(e, t) {
        for (var n in t) {
            if (n === "x1" || n === "x2")t[n] += fabric.util.toFixed(e.width / 2, 2); else if (n === "y1" || n === "y2")t[n] += fabric.util.toFixed(e.height / 2, 2);
            if (n === "x1" || n === "x2" || n === "r2")t[n] = fabric.util.toFixed(t[n] / e.width * 100, 2) + "%"; else if (n === "y1" || n === "y2")t[n] = fabric.util.toFixed(t[n] / e.height * 100, 2) + "%"
        }
    }

    fabric.Gradient = fabric.util.createClass({initialize: function (e) {
        e || (e = {});
        var t = {};
        this.id = fabric.Object.__uid++, this.type = e.type || "linear", t = {x1: e.coords.x1 || 0, y1: e.coords.y1 || 0, x2: e.coords.x2 || 0, y2: e.coords.y2 || 0}, this.type === "radial" && (t.r1 = e.coords.r1 || 0, t.r2 = e.coords.r2 || 0), this.coords = t, this.gradientUnits = e.gradientUnits || "objectBoundingBox", this.colorStops = e.colorStops.slice()
    }, addColorStop: function (e) {
        for (var t in e) {
            var n = new fabric.Color(e[t]);
            this.colorStops.push({offset: t, color: n.toRgb(), opacity: n.getAlpha()})
        }
        return this
    }, toObject: function () {
        return{type: this.type, coords: this.coords, gradientUnits: this.gradientUnits, colorStops: this.colorStops}
    }, toSVG: function (e, t) {
        var r = fabric.util.object.clone(this.coords), i;
        this.colorStops.sort(function (e, t) {
            return e.offset - t.offset
        }), t && this.gradientUnits === "userSpaceOnUse" ? (r.x1 += e.width / 2, r.y1 += e.height / 2, r.x2 += e.width / 2, r.y2 += e.height / 2) : this.gradientUnits === "objectBoundingBox" && n(e, r), this.type === "linear" ? i = ["<linearGradient ", 'id="SVGID_', this.id, '" gradientUnits="', this.gradientUnits, '" x1="', r.x1, '" y1="', r.y1, '" x2="', r.x2, '" y2="', r.y2, '">'] : this.type === "radial" && (i = ["<radialGradient ", 'id="SVGID_', this.id, '" gradientUnits="', this.gradientUnits, '" cx="', r.x2, '" cy="', r.y2, '" r="', r.r2, '" fx="', r.x1, '" fy="', r.y1, '">']);
        for (var s = 0; s < this.colorStops.length; s++)i.push("<stop ", 'offset="', this.colorStops[s].offset * 100 + "%", '" style="stop-color:', this.colorStops[s].color, this.colorStops[s].opacity ? ";stop-opacity: " + this.colorStops[s].opacity : ";", '"/>');
        return i.push(this.type === "linear" ? "</linearGradient>" : "</radialGradient>"), i.join("")
    }, toLive: function (e) {
        var t;
        if (!this.type)return;
        this.type === "linear" ? t = e.createLinearGradient(this.coords.x1, this.coords.y1, this.coords.x2, this.coords.y2) : this.type === "radial" && (t = e.createRadialGradient(this.coords.x1, this.coords.y1, this.coords.r1, this.coords.x2, this.coords.y2, this.coords.r2));
        for (var n = 0, r = this.colorStops.length; n < r; n++) {
            var i = this.colorStops[n].color, s = this.colorStops[n].opacity, o = this.colorStops[n].offset;
            typeof s != "undefined" && (i = (new fabric.Color(i)).setAlpha(s).toRgba()), t.addColorStop(parseFloat(o), i)
        }
        return t
    }}), fabric.util.object.extend(fabric.Gradient, {fromElement: function (n, r) {
        var i = n.getElementsByTagName("stop"), s = n.nodeName === "linearGradient" ? "linear" : "radial", o = n.getAttribute("gradientUnits") || "objectBoundingBox", u = [], a = {};
        s === "linear" ? a = {x1: n.getAttribute("x1") || 0, y1: n.getAttribute("y1") || 0, x2: n.getAttribute("x2") || "100%", y2: n.getAttribute("y2") || 0} : s === "radial" && (a = {x1: n.getAttribute("fx") || n.getAttribute("cx") || "50%", y1: n.getAttribute("fy") || n.getAttribute("cy") || "50%", r1: 0, x2: n.getAttribute("cx") || "50%", y2: n.getAttribute("cy") || "50%", r2: n.getAttribute("r") || "50%"});
        for (var f = i.length; f--;)u.push(e(i[f]));
        return t(r, a), new fabric.Gradient({type: s, coords: a, gradientUnits: o, colorStops: u})
    }, forObject: function (e, n) {
        return n || (n = {}), t(e, n), new fabric.Gradient(n)
    }})
})();
fabric.Pattern = fabric.util.createClass({repeat: "repeat", offsetX: 0, offsetY: 0, initialize: function (e) {
    e || (e = {});
    if (e.source)if (typeof e.source == "string")if (typeof fabric.util.getFunctionBody(e.source) != "undefined")this.source = new Function(fabric.util.getFunctionBody(e.source)); else {
        var t = this;
        this.source = fabric.util.createImage(), fabric.util.loadImage(e.source, function (e) {
            t.source = e
        })
    } else this.source = e.source;
    e.repeat && (this.repeat = e.repeat), e.offsetX && (this.offsetX = e.offsetX), e.offsetY && (this.offsetY = e.offsetY)
}, toObject: function () {
    var e;
    return typeof this.source == "function" ? e = String(this.source) : typeof this.source.src == "string" && (e = this.source.src), {source: e, repeat: this.repeat, offsetX: this.offsetX, offsetY: this.offsetY}
}, toLive: function (e) {
    var t = typeof this.source == "function" ? this.source() : this.source;
    return e.createPattern(t, this.repeat)
}});
(function () {
    "use strict";
    if (fabric.StaticCanvas) {
        fabric.warn("fabric.StaticCanvas is already defined.");
        return
    }
    var e = fabric.util.object.extend, t = fabric.util.getElementOffset, n = fabric.util.removeFromArray, r = fabric.util.removeListener, i = new Error("Could not initialize `canvas` element");
    fabric.StaticCanvas = function (e, t) {
        t || (t = {}), this._initStatic(e, t), fabric.StaticCanvas.activeInstance = this
    }, e(fabric.StaticCanvas.prototype, fabric.Observable), e(fabric.StaticCanvas.prototype, fabric.Collection), e(fabric.StaticCanvas.prototype, fabric.DataURLExporter), e(fabric.StaticCanvas.prototype, {backgroundColor: "", backgroundImage: "", backgroundImageOpacity: 1, backgroundImageStretch: !0, overlayImage: "", overlayImageLeft: 0, overlayImageTop: 0, includeDefaultValues: !0, stateful: !0, renderOnAddition: !0, clipTo: null, controlsAboveOverlay: !1, onBeforeScaleRotate: function () {
    }, _initStatic: function (e, t) {
        this._objects = [], this._createLowerCanvas(e), this._initOptions(t), t.overlayImage && this.setOverlayImage(t.overlayImage, this.renderAll.bind(this)), t.backgroundImage && this.setBackgroundImage(t.backgroundImage, this.renderAll.bind(this)), t.backgroundColor && this.setBackgroundColor(t.backgroundColor, this.renderAll.bind(this)), this.calcOffset()
    }, calcOffset: function () {
        return this._offset = t(this.lowerCanvasEl), this
    }, setOverlayImage: function (e, t, n) {
        return fabric.util.loadImage(e, function (e) {
            this.overlayImage = e, n && "overlayImageLeft"in n && (this.overlayImageLeft = n.overlayImageLeft), n && "overlayImageTop"in n && (this.overlayImageTop = n.overlayImageTop), t && t()
        }, this), this
    }, setBackgroundImage: function (e, t, n) {
        return fabric.util.loadImage(e, function (e) {
            this.backgroundImage = e, n && "backgroundImageOpacity"in n && (this.backgroundImageOpacity = n.backgroundImageOpacity), n && "backgroundImageStretch"in n && (this.backgroundImageStretch = n.backgroundImageStretch), t && t()
        }, this), this
    }, setBackgroundColor: function (e, t) {
        if (e.source) {
            var n = this;
            fabric.util.loadImage(e.source, function (r) {
                n.backgroundColor = new fabric.Pattern({source: r, repeat: e.repeat}), t && t()
            })
        } else this.backgroundColor = e, t && t();
        return this
    }, _createCanvasElement: function () {
        var e = fabric.document.createElement("canvas");
        e.style || (e.style = {});
        if (!e)throw i;
        return this._initCanvasElement(e), e
    }, _initCanvasElement: function (e) {
        fabric.util.createCanvasElement(e);
        if (typeof e.getContext == "undefined")throw i
    }, _initOptions: function (e) {
        for (var t in e)this[t] = e[t];
        this.width = parseInt(this.lowerCanvasEl.width, 10) || 0, this.height = parseInt(this.lowerCanvasEl.height, 10) || 0;
        if (!this.lowerCanvasEl.style)return;
        this.lowerCanvasEl.style.width = this.width + "px", this.lowerCanvasEl.style.height = this.height + "px"
    }, _createLowerCanvas: function (e) {
        this.lowerCanvasEl = fabric.util.getById(e) || this._createCanvasElement(), this._initCanvasElement(this.lowerCanvasEl), fabric.util.addClass(this.lowerCanvasEl, "lower-canvas"), this.interactive && this._applyCanvasStyle(this.lowerCanvasEl), this.contextContainer = this.lowerCanvasEl.getContext("2d")
    }, getWidth: function () {
        return this.width
    }, getHeight: function () {
        return this.height
    }, setWidth: function (e) {
        return this._setDimension("width", e)
    }, setHeight: function (e) {
        return this._setDimension("height", e)
    }, setDimensions: function (e) {
        for (var t in e)this._setDimension(t, e[t]);
        return this
    }, _setDimension: function (e, t) {
        return this.lowerCanvasEl[e] = t, this.lowerCanvasEl.style[e] = t + "px", this.upperCanvasEl && (this.upperCanvasEl[e] = t, this.upperCanvasEl.style[e] = t + "px"), this.cacheCanvasEl && (this.cacheCanvasEl[e] = t), this.wrapperEl && (this.wrapperEl.style[e] = t + "px"), this[e] = t, this.calcOffset(), this.renderAll(), this
    }, getElement: function () {
        return this.lowerCanvasEl
    }, getActiveObject: function () {
        return null
    }, getActiveGroup: function () {
        return null
    }, _draw: function (e, t) {
        if (!t)return;
        if (this.controlsAboveOverlay) {
            var n = t.hasBorders, r = t.hasControls;
            t.hasBorders = t.hasControls = !1, t.render(e), t.hasBorders = n, t.hasControls = r
        } else t.render(e)
    }, _onObjectAdded: function (e) {
        this.stateful && e.setupState(), e.setCoords(), e.canvas = this, this.fire("object:added", {target: e}), e.fire("added")
    }, _onObjectRemoved: function (e) {
        this.fire("object:removed", {target: e}), e.fire("removed")
    }, getObjects: function () {
        return this._objects
    }, clearContext: function (e) {
        return e.clearRect(0, 0, this.width, this.height), this
    }, getContext: function () {
        return this.contextContainer
    }, clear: function () {
        return this._objects.length = 0, this.discardActiveGroup && this.discardActiveGroup(), this.discardActiveObject && this.discardActiveObject(), this.clearContext(this.contextContainer), this.contextTop && this.clearContext(this.contextTop), this.fire("canvas:cleared"), this.renderAll(), this
    }, renderAll: function (e) {
        var t = this[e === !0 && this.interactive ? "contextTop" : "contextContainer"];
        this.contextTop && this.selection && !this._groupSelector && this.clearContext(this.contextTop), e || this.clearContext(t), this.fire("before:render"), this.clipTo && fabric.util.clipContext(this, t), this.backgroundColor && (t.fillStyle = this.backgroundColor.toLive ? this.backgroundColor.toLive(t) : this.backgroundColor, t.fillRect(this.backgroundColor.offsetX || 0, this.backgroundColor.offsetY || 0, this.width, this.height)), typeof this.backgroundImage == "object" && this._drawBackroundImage(t);
        var n = this.getActiveGroup();
        for (var r = 0, i = this._objects.length; r < i; ++r)(!n || n && this._objects[r] && !n.contains(this._objects[r])) && this._draw(t, this._objects[r]);
        if (n) {
            var s = [];
            this.forEachObject(function (e) {
                n.contains(e) && s.push(e)
            }), n._set("objects", s), this._draw(t, n)
        }
        return this.clipTo && t.restore(), this.overlayImage && t.drawImage(this.overlayImage, this.overlayImageLeft, this.overlayImageTop), this.controlsAboveOverlay && this.interactive && this.drawControls(t), this.fire("after:render"), this
    }, _drawBackroundImage: function (e) {
        e.save(), e.globalAlpha = this.backgroundImageOpacity, this.backgroundImageStretch ? e.drawImage(this.backgroundImage, 0, 0, this.width, this.height) : e.drawImage(this.backgroundImage, 0, 0), e.restore()
    }, renderTop: function () {
        var e = this.contextTop || this.contextContainer;
        this.clearContext(e), this.selection && this._groupSelector && this._drawSelection();
        var t = this.getActiveGroup();
        return t && t.render(e), this.overlayImage && e.drawImage(this.overlayImage, this.overlayImageLeft, this.overlayImageTop), this.fire("after:render"), this
    }, getCenter: function () {
        return{top: this.getHeight() / 2, left: this.getWidth() / 2}
    }, centerObjectH: function (e) {
        return e.set("left", this.getCenter().left), this.renderAll(), this
    }, centerObjectV: function (e) {
        return e.set("top", this.getCenter().top), this.renderAll(), this
    }, centerObject: function (e) {
        return this.centerObjectH(e).centerObjectV(e)
    }, toDatalessJSON: function (e) {
        return this.toDatalessObject(e)
    }, toObject: function (e) {
        return this._toObjectMethod("toObject", e)
    }, toDatalessObject: function (e) {
        return this._toObjectMethod("toDatalessObject", e)
    }, _toObjectMethod: function (e, t) {
        var n = this.getActiveGroup();
        n && this.discardActiveGroup();
        var r = {objects: this.getObjects().map(function (n) {
            var r;
            this.includeDefaultValues || (r = n.includeDefaultValues, n.includeDefaultValues = !1);
            var i = n[e](t);
            return this.includeDefaultValues || (n.includeDefaultValues = r), i
        }, this), background: this.backgroundColor && this.backgroundColor.toObject ? this.backgroundColor.toObject() : this.backgroundColor};
        return this.backgroundImage && (r.backgroundImage = this.backgroundImage.src, r.backgroundImageOpacity = this.backgroundImageOpacity, r.backgroundImageStretch = this.backgroundImageStretch), this.overlayImage && (r.overlayImage = this.overlayImage.src, r.overlayImageLeft = this.overlayImageLeft, r.overlayImageTop = this.overlayImageTop), fabric.util.populateWithProperties(this, r, t), n && (this.setActiveGroup(new fabric.Group(n.getObjects())), n.forEachObject(function (e) {
            e.set("active", !0)
        })), r
    }, toSVG: function (e) {
        e || (e = {});
        var t = [];
        e.suppressPreamble || t.push('<?xml version="1.0" standalone="no" ?>', '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ', '"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'), t.push("<svg ", 'xmlns="http://www.w3.org/2000/svg" ', 'xmlns:xlink="http://www.w3.org/1999/xlink" ', 'version="1.1" ', 'width="', e.viewBox ? e.viewBox.width : this.width, '" ', 'height="', e.viewBox ? e.viewBox.height : this.height, '" ', this.backgroundColor && !this.backgroundColor.source ? 'style="background-color: ' + this.backgroundColor + '" ' : null, e.viewBox ? 'viewBox="' + e.viewBox.x + " " + e.viewBox.y + " " + e.viewBox.width + " " + e.viewBox.height + '" ' : null, 'xml:space="preserve">', "<desc>Created with Fabric.js ", fabric.version, "</desc>", "<defs>", fabric.createSVGFontFacesMarkup(this.getObjects()), fabric.createSVGRefElementsMarkup(this), "</defs>"), this.backgroundColor && this.backgroundColor.source && t.push('<rect x="0" y="0" ', 'width="', this.backgroundColor.repeat === "repeat-y" || this.backgroundColor.repeat === "no-repeat" ? this.backgroundColor.source.width : this.width, '" height="', this.backgroundColor.repeat === "repeat-x" || this.backgroundColor.repeat === "no-repeat" ? this.backgroundColor.source.height : this.height, '" fill="url(#backgroundColorPattern)"', "></rect>"), this.backgroundImage && t.push('<image x="0" y="0" ', 'width="', this.backgroundImageStretch ? this.width : this.backgroundImage.width, '" height="', this.backgroundImageStretch ? this.height : this.backgroundImage.height, '" preserveAspectRatio="', this.backgroundImageStretch ? "none" : "defer", '" xlink:href="', this.backgroundImage.src, '" style="opacity:', this.backgroundImageOpacity, '"></image>'), this.overlayImage && t.push('<image x="', this.overlayImageLeft, '" y="', this.overlayImageTop, '" width="', this.overlayImage.width, '" height="', this.overlayImage.height, '" xlink:href="', this.overlayImage.src, '"></image>');
        var n = this.getActiveGroup();
        n && this.discardActiveGroup();
        for (var r = 0, i = this.getObjects(), s = i.length; r < s; r++)t.push(i[r].toSVG());
        return n && (this.setActiveGroup(new fabric.Group(n.getObjects())), n.forEachObject(function (e) {
            e.set("active", !0)
        })), t.push("</svg>"), t.join("")
    }, remove: function (e) {
        return this.getActiveObject() === e && (this.fire("before:selection:cleared", {target: e}), this.discardActiveObject(), this.fire("selection:cleared")), fabric.Collection.remove.call(this, e)
    }, sendToBack: function (e) {
        return n(this._objects, e), this._objects.unshift(e), this.renderAll && this.renderAll()
    }, bringToFront: function (e) {
        return n(this._objects, e), this._objects.push(e), this.renderAll && this.renderAll()
    }, sendBackwards: function (e, t) {
        var r = this._objects.indexOf(e);
        if (r !== 0) {
            var i;
            if (t) {
                i = r;
                for (var s = r - 1; s >= 0; --s) {
                    var o = e.intersectsWithObject(this._objects[s]) || e.isContainedWithinObject(this._objects[s]) || this._objects[s].isContainedWithinObject(e);
                    if (o) {
                        i = s;
                        break
                    }
                }
            } else i = r - 1;
            n(this._objects, e), this._objects.splice(i, 0, e), this.renderAll && this.renderAll()
        }
        return this
    }, bringForward: function (e, t) {
        var r = this._objects.indexOf(e);
        if (r !== this._objects.length - 1) {
            var i;
            if (t) {
                i = r;
                for (var s = r + 1; s < this._objects.length; ++s) {
                    var o = e.intersectsWithObject(this._objects[s]) || e.isContainedWithinObject(this._objects[s]) || this._objects[s].isContainedWithinObject(e);
                    if (o) {
                        i = s;
                        break
                    }
                }
            } else i = r + 1;
            n(this._objects, e), this._objects.splice(i, 0, e), this.renderAll && this.renderAll()
        }
        return this
    }, moveTo: function (e, t) {
        return n(this._objects, e), this._objects.splice(t, 0, e), this.renderAll && this.renderAll()
    }, dispose: function () {
        return this.clear(), this.interactive ? (fabric.isTouchSupported ? (r(this.upperCanvasEl, "touchstart", this._onMouseDown), r(this.upperCanvasEl, "touchmove", this._onMouseMove), typeof Event != "undefined" && "remove"in Event && Event.remove(this.upperCanvasEl, "gesture", this._onGesture)) : (r(this.upperCanvasEl, "mousedown", this._onMouseDown), r(this.upperCanvasEl, "mousemove", this._onMouseMove), r(fabric.window, "resize", this._onResize)), this) : this
    }}), fabric.StaticCanvas.prototype.toString = function () {
        return"#<fabric.Canvas (" + this.complexity() + "): " + "{ objects: " + this.getObjects().length + " }>"
    }, e(fabric.StaticCanvas, {EMPTY_JSON: '{"objects": [], "background": "white"}', toGrayscale: function (e) {
        var t = e.getContext("2d"), n = t.getImageData(0, 0, e.width, e.height), r = n.data, i = n.width, s = n.height, o, u, a, f;
        for (a = 0; a < i; a++)for (f = 0; f < s; f++)o = a * 4 * s + f * 4, u = (r[o] + r[o + 1] + r[o + 2]) / 3, r[o] = u, r[o + 1] = u, r[o + 2] = u;
        t.putImageData(n, 0, 0)
    }, supports: function (e) {
        var t = fabric.util.createCanvasElement();
        if (!t || !t.getContext)return null;
        var n = t.getContext("2d");
        if (!n)return null;
        switch (e) {
            case"getImageData":
                return typeof n.getImageData != "undefined";
            case"setLineDash":
                return typeof n.setLineDash != "undefined";
            case"toDataURL":
                return typeof t.toDataURL != "undefined";
            case"toDataURLWithQuality":
                try {
                    return t.toDataURL("image/jpeg", 0), !0
                } catch (r) {
                }
                return!1;
            default:
                return null
        }
    }}), fabric.StaticCanvas.prototype.toJSON = fabric.StaticCanvas.prototype.toObject
})();
fabric.BaseBrush = fabric.util.createClass({color: "rgb(0, 0, 0)", width: 1, shadowBlur: 0, shadowColor: "", shadowOffsetX: 0, shadowOffsetY: 0, strokeLineCap: "round", strokeLineJoin: "round", setBrushStyles: function () {
    var e = this.canvas.contextTop;
    e.strokeStyle = this.color, e.lineWidth = this.width, e.lineCap = this.strokeLineCap, e.lineJoin = this.strokeLineJoin
}, setShadowStyles: function () {
    var e = this.canvas.contextTop;
    e.shadowBlur = this.shadowBlur, e.shadowColor = this.shadowColor || this.color, e.shadowOffsetX = this.shadowOffsetX, e.shadowOffsetY = this.shadowOffsetY
}, removeShadowStyles: function () {
    var e = this.canvas.contextTop;
    e.shadowColor = "", e.shadowBlur = e.shadowOffsetX = e.shadowOffsetY = 0
}});
(function () {
    var e = fabric.util.array.min, t = fabric.util.array.max;
    fabric.PencilBrush = fabric.util.createClass(fabric.BaseBrush, {initialize: function (e) {
        this.canvas = e, this._points = []
    }, onMouseDown: function (e) {
        this._prepareForDrawing(e), this._captureDrawingPath(e)
    }, onMouseMove: function (e) {
        this._captureDrawingPath(e), this.canvas.clearContext(this.canvas.contextTop), this._render(this.canvas.contextTop)
    }, onMouseUp: function () {
        this._finalizeAndAddPath()
    }, _prepareForDrawing: function (e) {
        var t = new fabric.Point(e.x, e.y);
        this._reset(), this._addPoint(t), this.canvas.contextTop.moveTo(t.x, t.y)
    }, _addPoint: function (e) {
        this._points.push(e)
    }, _reset: function () {
        this._points.length = 0, this.setBrushStyles(), this.setShadowStyles()
    }, _captureDrawingPath: function (e) {
        var t = new fabric.Point(e.x, e.y);
        this._addPoint(t)
    }, _render: function () {
        var e = this.canvas.contextTop;
        e.beginPath();
        var t = this._points[0], n = this._points[1];
        e.moveTo(t.x, t.y);
        for (var r = 1, i = this._points.length; r < i; r++) {
            var s = t.midPointFrom(n);
            e.quadraticCurveTo(t.x, t.y, s.x, s.y), t = this._points[r], n = this._points[r + 1]
        }
        e.lineTo(t.x, t.y), e.stroke()
    }, _getSVGPathData: function () {
        return this.box = this.getPathBoundingBox(this._points), this.convertPointsToSVGPath(this._points, this.box.minx, this.box.maxx, this.box.miny, this.box.maxy)
    }, getPathBoundingBox: function (n) {
        var r = [], i = [], s = n[0], o = n[1], u = s;
        for (var a = 1, f = n.length; a < f; a++) {
            var l = s.midPointFrom(o);
            r.push(u.x), r.push(l.x), i.push(u.y), i.push(l.y), s = n[a], o = n[a + 1], u = l
        }
        return r.push(s.x), i.push(s.y), {minx: e(r), miny: e(i), maxx: t(r), maxy: t(i)}
    }, convertPointsToSVGPath: function (e, t, n, r) {
        var i = [], s = new fabric.Point(e[0].x - t, e[0].y - r), o = new fabric.Point(e[1].x - t, e[1].y - r);
        i.push("M ", e[0].x - t, " ", e[0].y - r, " ");
        for (var u = 1, a = e.length; u < a; u++) {
            var f = s.midPointFrom(o);
            i.push("Q ", s.x, " ", s.y, " ", f.x, " ", f.y, " "), s = new fabric.Point(e[u].x - t, e[u].y - r), u + 1 < e.length && (o = new fabric.Point(e[u + 1].x - t, e[u + 1].y - r))
        }
        return i.push("L ", s.x, " ", s.y, " "), i
    }, createPath: function (e) {
        var t = new fabric.Path(e);
        return t.fill = null, t.stroke = this.color, t.strokeWidth = this.width, t.strokeLineCap = this.strokeLineCap, t.strokeLineJoin = this.strokeLineJoin, t.setShadow({color: this.shadowColor || this.color, blur: this.shadowBlur, offsetX: this.shadowOffsetX, offsetY: this.shadowOffsetY, affectStroke: !0}), t
    }, _finalizeAndAddPath: function () {
        var e = this.canvas.contextTop;
        e.closePath();
        var t = this._getSVGPathData().join("");
        if (t === "M 0 0 Q 0 0 0 0 L 0 0") {
            this.canvas.renderAll();
            return
        }
        var n = this.box.minx + (this.box.maxx - this.box.minx) / 2, r = this.box.miny + (this.box.maxy - this.box.miny) / 2;
        this.canvas.contextTop.arc(n, r, 3, 0, Math.PI * 2, !1);
        var i = this.createPath(t);
        i.set({left: n, top: r}), this.canvas.add(i), i.setCoords(), this.canvas.clearContext(this.canvas.contextTop), this.removeShadowStyles(), this.canvas.renderAll(), this.canvas.fire("path:created", {path: i})
    }})
})();
fabric.CircleBrush = fabric.util.createClass(fabric.BaseBrush, {width: 10, initialize: function (e) {
    this.canvas = e, this.points = []
}, onMouseDown: function () {
    this.points.length = 0, this.canvas.clearContext(this.canvas.contextTop), this.setShadowStyles()
}, onMouseMove: function (e) {
    var t = this.addPoint(e), n = this.canvas.contextTop;
    n.fillStyle = t.fill, n.beginPath(), n.arc(t.x, t.y, t.radius, 0, Math.PI * 2, !1), n.closePath(), n.fill()
}, onMouseUp: function () {
    var e = this.canvas.renderOnAddition;
    this.canvas.renderOnAddition = !1;
    for (var t = 0, n = this.points.length; t < n; t++) {
        var r = this.points[t], i = new fabric.Circle({radius: r.radius, left: r.x, top: r.y, fill: r.fill, shadow: {color: this.shadowColor || this.color, blur: this.shadowBlur, offsetX: this.shadowOffsetX, offsetY: this.shadowOffsetY}});
        this.canvas.add(i), this.canvas.fire("path:created", {path: i})
    }
    this.canvas.clearContext(this.canvas.contextTop), this.removeShadowStyles(), this.canvas.renderOnAddition = e, this.canvas.renderAll()
}, addPoint: function (e) {
    var t = new fabric.Point(e.x, e.y), n = fabric.util.getRandomInt(Math.max(0, this.width - 20), this.width + 20) / 2, r = (new fabric.Color(this.color)).setAlpha(fabric.util.getRandomInt(0, 100) / 100).toRgba();
    return t.radius = n, t.fill = r, this.points.push(t), t
}});
fabric.SprayBrush = fabric.util.createClass(fabric.BaseBrush, {width: 10, density: 20, dotWidth: 1, dotWidthVariance: 1, randomOpacity: !1, initialize: function (e) {
    this.canvas = e, this.sprayChunks = []
}, onMouseDown: function (e) {
    this.sprayChunks.length = 0, this.canvas.clearContext(this.canvas.contextTop), this.setShadowStyles(), this.addSprayChunk(e), this.render()
}, onMouseMove: function (e) {
    this.addSprayChunk(e), this.render()
}, onMouseUp: function () {
    var e = this.canvas.renderOnAddition;
    this.canvas.renderOnAddition = !1;
    for (var t = 0, n = this.sprayChunks.length; t < n; t++) {
        var r = this.sprayChunks[t];
        for (var i = 0, s = r.length; i < s; i++) {
            var o = new fabric.Rect({width: r[i].width, height: r[i].width, left: r[i].x + 1, top: r[i].y + 1, fill: this.color, shadow: {color: this.shadowColor || this.color, blur: this.shadowBlur, offsetX: this.shadowOffsetX, offsetY: this.shadowOffsetY}});
            this.canvas.add(o), this.canvas.fire("path:created", {path: o})
        }
    }
    this.canvas.clearContext(this.canvas.contextTop), this.removeShadowStyles(), this.canvas.renderOnAddition = e, this.canvas.renderAll()
}, render: function () {
    var e = this.canvas.contextTop;
    e.fillStyle = this.color, e.save();
    for (var t = 0, n = this.sprayChunkPoints.length; t < n; t++) {
        var r = this.sprayChunkPoints[t];
        typeof r.opacity != "undefined" && (e.globalAlpha = r.opacity), e.fillRect(r.x, r.y, r.width, r.width)
    }
    e.restore()
}, addSprayChunk: function (e) {
    this.sprayChunkPoints = [];
    var t, n, r, i = this.width / 2;
    for (var s = 0; s < this.density; s++) {
        t = fabric.util.getRandomInt(e.x - i, e.x + i), n = fabric.util.getRandomInt(e.y - i, e.y + i), this.dotWidthVariance ? r = fabric.util.getRandomInt(Math.max(1, this.dotWidth - this.dotWidthVariance), this.dotWidth + this.dotWidthVariance) : r = this.dotWidth;
        var o = {x: t, y: n, width: r};
        this.randomOpacity && (o.opacity = fabric.util.getRandomInt(0, 100) / 100), this.sprayChunkPoints.push(o)
    }
    this.sprayChunks.push(this.sprayChunkPoints)
}});
fabric.PatternBrush = fabric.util.createClass(fabric.PencilBrush, {getPatternSrc: function () {
    var e = 20, t = 5, n = fabric.document.createElement("canvas"), r = n.getContext("2d");
    return n.width = n.height = e + t, r.fillStyle = this.color, r.beginPath(), r.arc(e / 2, e / 2, e / 2, 0, Math.PI * 2, !1), r.closePath(), r.fill(), n
}, getPatternSrcFunction: function () {
    return String(this.getPatternSrc).replace("this.color", '"' + this.color + '"')
}, getPattern: function () {
    return this.canvas.contextTop.createPattern(this.source || this.getPatternSrc(), "repeat")
}, setBrushStyles: function () {
    this.callSuper("setBrushStyles"), this.canvas.contextTop.strokeStyle = this.getPattern()
}, createPath: function (e) {
    var t = this.callSuper("createPath", e);
    return t.stroke = new fabric.Pattern({source: this.source || this.getPatternSrcFunction()}), t
}});
(function () {
    function f() {
    }

    var e = fabric.util.object.extend, t = fabric.util.getPointer, n = fabric.util.degreesToRadians, r = fabric.util.radiansToDegrees, i = Math.atan2, s = Math.abs, o = Math.min, u = Math.max, a = .5;
    fabric.Canvas = function (e, t) {
        t || (t = {}), this._initStatic(e, t), this._initInteractive(), this._createCacheCanvas(), fabric.Canvas.activeInstance = this
    }, f.prototype = fabric.StaticCanvas.prototype, fabric.Canvas.prototype = new f;
    var l = {uniScaleTransform: !1, centerTransform: !1, interactive: !0, selection: !0, selectionColor: "rgba(100, 100, 255, 0.3)", selectionDashArray: [], selectionBorderColor: "rgba(255, 255, 255, 0.3)", selectionLineWidth: 1, hoverCursor: "move", moveCursor: "move", defaultCursor: "default", freeDrawingCursor: "crosshair", rotationCursor: "crosshair", containerClass: "canvas-container", perPixelTargetFind: !1, targetFindTolerance: 0, _initInteractive: function () {
        this._currentTransform = null, this._groupSelector = null, this._initWrapperElement(), this._createUpperCanvas(), this._initEvents(), this.freeDrawingBrush = fabric.PencilBrush && new fabric.PencilBrush(this), this.calcOffset()
    }, _resetCurrentTransform: function (e) {
        var t = this._currentTransform;
        t.target.set("scaleX", t.original.scaleX), t.target.set("scaleY", t.original.scaleY), t.target.set("left", t.original.left), t.target.set("top", t.original.top), e.altKey || this.centerTransform || t.target.centerTransform ? (t.originX !== "center" && (t.originX === "right" ? t.mouseXSign = -1 : t.mouseXSign = 1), t.originY !== "center" && (t.originY === "bottom" ? t.mouseYSign = -1 : t.mouseYSign = 1), t.originX = "center", t.originY = "center") : (t.originX = t.original.originX, t.originY = t.original.originY)
    }, containsPoint: function (e, t) {
        var n = this.getPointer(e), r = this._normalizePointer(t, n);
        return t.containsPoint(r) || t._findTargetCorner(e, this._offset)
    }, _normalizePointer: function (e, t) {
        var n = this.getActiveGroup(), r = t.x, i = t.y, s = n && e.type !== "group" && n.contains(e);
        return s && (r -= n.left, i -= n.top), {x: r, y: i}
    }, isTargetTransparent: function (e, t, n) {
        var r = this.contextCache, i = e.hasBorders, s = e.transparentCorners;
        e.hasBorders = e.transparentCorners = !1, this._draw(r, e), e.hasBorders = i, e.transparentCorners = s, this.targetFindTolerance > 0 && (t > this.targetFindTolerance ? t -= this.targetFindTolerance : t = 0, n > this.targetFindTolerance ? n -= this.targetFindTolerance : n = 0);
        var o = !0, u = r.getImageData(t, n, this.targetFindTolerance * 2 || 1, this.targetFindTolerance * 2 || 1);
        for (var a = 3, f = u.data.length; a < f; a += 4) {
            var l = u.data[a];
            o = l <= 0;
            if (o === !1)break
        }
        return u = null, this.clearContext(r), o
    }, _shouldClearSelection: function (e, t) {
        var n = this.getActiveGroup();
        return!t || t && n && !n.contains(t) && n !== t && !e.shiftKey || t && !t.selectable
    }, _setupCurrentTransform: function (e, r) {
        if (!r)return;
        var i = "drag", s, o = t(e, r.canvas.upperCanvasEl);
        s = r._findTargetCorner(e, this._offset), s && (i = s === "ml" || s === "mr" ? "scaleX" : s === "mt" || s === "mb" ? "scaleY" : s === "mtr" ? "rotate" : "scale");
        var u = "center", a = "center";
        if (s === "ml" || s === "tl" || s === "bl")u = "right"; else if (s === "mr" || s === "tr" || s === "br")u = "left";
        if (s === "tl" || s === "mt" || s === "tr")a = "bottom"; else if (s === "bl" || s === "mb" || s === "br")a = "top";
        s === "mtr" && (u = "center", a = "center"), this._currentTransform = {target: r, action: i, scaleX: r.scaleX, scaleY: r.scaleY, offsetX: o.x - r.left, offsetY: o.y - r.top, originX: u, originY: a, ex: o.x, ey: o.y, left: r.left, top: r.top, theta: n(r.angle), width: r.width * r.scaleX, mouseXSign: 1, mouseYSign: 1}, this._currentTransform.original = {left: r.left, top: r.top, scaleX: r.scaleX, scaleY: r.scaleY, originX: u, originY: a}, this._resetCurrentTransform(e)
    }, _shouldHandleGroupLogic: function (e, t) {
        var n = this.getActiveObject();
        return e.shiftKey && (this.getActiveGroup() || n && n !== t) && this.selection
    }, _handleGroupLogic: function (e, t) {
        if (t === this.getActiveGroup()) {
            t = this.findTarget(e, !0);
            if (!t || t.isType("group"))return
        }
        var n = this.getActiveGroup();
        if (n)n.contains(t) ? (n.removeWithUpdate(t), this._resetObjectTransform(n), t.set("active", !1), n.size() === 1 && this.discardActiveGroup()) : (n.addWithUpdate(t), this._resetObjectTransform(n)), this.fire("selection:created", {target: n, e: e}), n.set("active", !0); else {
            if (this._activeObject && t !== this._activeObject) {
                var r = this.getObjects(), i = r.indexOf(this._activeObject) < r.indexOf(t), s = new fabric.Group(i ? [t, this._activeObject] : [this._activeObject, t]);
                this.setActiveGroup(s), n = this.getActiveGroup(), this.fire("selection:created", {target: n, e: e})
            }
            t.set("active", !0)
        }
        n && n.saveCoords()
    }, _translateObject: function (e, t) {
        var n = this._currentTransform.target;
        n.get("lockMovementX") || n.set("left", e - this._currentTransform.offsetX), n.get("lockMovementY") || n.set("top", t - this._currentTransform.offsetY)
    }, _scaleObject: function (e, t, n) {
        var r = this._currentTransform, i = this._offset, o = r.target, u = o.get("lockScalingX"), a = o.get("lockScalingY");
        if (u && a)return;
        var f = o.translateToOriginPoint(o.getCenterPoint(), r.originX, r.originY), l = o.toLocalPoint(new fabric.Point(e - i.left, t - i.top), r.originX, r.originY);
        r.originX === "right" ? l.x *= -1 : r.originX === "center" && (l.x *= r.mouseXSign * 2, l.x < 0 && (r.mouseXSign = -r.mouseXSign)), r.originY === "bottom" ? l.y *= -1 : r.originY === "center" && (l.y *= r.mouseYSign * 2, l.y < 0 && (r.mouseYSign = -r.mouseYSign)), s(l.x) > o.padding ? l.x < 0 ? l.x += o.padding : l.x -= o.padding : l.x = 0, s(l.y) > o.padding ? l.y < 0 ? l.y += o.padding : l.y -= o.padding : l.y = 0;
        var c = o.scaleX, h = o.scaleY;
        if (n === "equally" && !u && !a) {
            var p = l.y + l.x, d = (o.height + o.strokeWidth) * r.original.scaleY + (o.width + o.strokeWidth) * r.original.scaleX;
            c = r.original.scaleX * p / d, h = r.original.scaleY * p / d, o.set("scaleX", c), o.set("scaleY", h)
        } else n ? n === "x" && !o.get("lockUniScaling") ? (c = l.x / (o.width + o.strokeWidth), u || o.set("scaleX", c)) : n === "y" && !o.get("lockUniScaling") && (h = l.y / (o.height + o.strokeWidth), a || o.set("scaleY", h)) : (c = l.x / (o.width + o.strokeWidth), h = l.y / (o.height + o.strokeWidth), u || o.set("scaleX", c), a || o.set("scaleY", h));
        c < 0 && (r.originX === "left" ? r.originX = "right" : r.originX === "right" && (r.originX = "left")), h < 0 && (r.originY === "top" ? r.originY = "bottom" : r.originY === "bottom" && (r.originY = "top")), o.setPositionByOrigin(f, r.originX, r.originY)
    }, _rotateObject: function (e, t) {
        var n = this._currentTransform, s = this._offset;
        if (n.target.get("lockRotation"))return;
        var o = i(n.ey - n.top - s.top, n.ex - n.left - s.left), u = i(t - n.top - s.top, e - n.left - s.left), a = r(u - o + n.theta);
        a < 0 && (a = 360 + a), n.target.angle = a
    }, _setCursor: function (e) {
        this.upperCanvasEl.style.cursor = e
    }, _resetObjectTransform: function (e) {
        e.scaleX = 1, e.scaleY = 1, e.setAngle(0)
    }, _drawSelection: function () {
        var e = this.contextTop, t = this._groupSelector, n = t.left, r = t.top, i = s(n), o = s(r);
        e.fillStyle = this.selectionColor, e.fillRect(t.ex - (n > 0 ? 0 : -n), t.ey - (r > 0 ? 0 : -r), i, o), e.lineWidth = this.selectionLineWidth, e.strokeStyle = this.selectionBorderColor;
        if (this.selectionDashArray.length > 1) {
            var u = t.ex + a - (n > 0 ? 0 : i), f = t.ey + a - (r > 0 ? 0 : o);
            e.beginPath(), fabric.util.drawDashedLine(e, u, f, u + i, f, this.selectionDashArray), fabric.util.drawDashedLine(e, u, f + o - 1, u + i, f + o - 1, this.selectionDashArray), fabric.util.drawDashedLine(e, u, f, u, f + o, this.selectionDashArray), fabric.util.drawDashedLine(e, u + i - 1, f, u + i - 1, f + o, this.selectionDashArray), e.closePath(), e.stroke()
        } else e.strokeRect(t.ex + a - (n > 0 ? 0 : i), t.ey + a - (r > 0 ? 0 : o), i, o)
    }, _findSelectedObjects: function (e) {
        var t = [], n = this._groupSelector.ex, r = this._groupSelector.ey, i = n + this._groupSelector.left, s = r + this._groupSelector.top, a, f = new fabric.Point(o(n, i), o(r, s)), l = new fabric.Point(u(n, i), u(r, s)), c = n === i && r === s;
        for (var h = this._objects.length; h--;) {
            a = this._objects[h];
            if (!a)continue;
            if (a.intersectsWithRect(f, l) || a.isContainedWithinRect(f, l) || a.containsPoint(f) || a.containsPoint(l))if (this.selection && a.selectable) {
                a.set("active", !0), t.push(a);
                if (c)break
            }
        }
        t.length === 1 ? this.setActiveObject(t[0], e) : t.length > 1 && (t = new fabric.Group(t.reverse()), this.setActiveGroup(t), t.saveCoords(), this.fire("selection:created", {target: t}), this.renderAll())
    }, findTarget: function (e, t) {
        var n, r = this.getPointer(e);
        if (this.controlsAboveOverlay && this.lastRenderedObjectWithControlsAboveOverlay && this.lastRenderedObjectWithControlsAboveOverlay.visible && this.containsPoint(e, this.lastRenderedObjectWithControlsAboveOverlay) && this.lastRenderedObjectWithControlsAboveOverlay._findTargetCorner(e, this._offset))return n = this.lastRenderedObjectWithControlsAboveOverlay, n;
        var i = this.getActiveGroup();
        if (i && !t && this.containsPoint(e, i))return n = i, n;
        var s = [];
        for (var o = this._objects.length; o--;)if (this._objects[o] && this._objects[o].visible && this.containsPoint(e, this._objects[o])) {
            if (!this.perPixelTargetFind && !this._objects[o].perPixelTargetFind) {
                n = this._objects[o], this.relatedTarget = n;
                break
            }
            s[s.length] = this._objects[o]
        }
        for (var u = 0, a = s.length; u < a; u++) {
            r = this.getPointer(e);
            var f = this.isTargetTransparent(s[u], r.x, r.y);
            if (!f) {
                n = s[u], this.relatedTarget = n;
                break
            }
        }
        return n
    }, getPointer: function (e) {
        var n = t(e, this.upperCanvasEl);
        return{x: n.x - this._offset.left, y: n.y - this._offset.top}
    }, _createUpperCanvas: function () {
        var e = this.lowerCanvasEl.className.replace(/\s*lower-canvas\s*/, "");
        this.upperCanvasEl = this._createCanvasElement(), fabric.util.addClass(this.upperCanvasEl, "upper-canvas " + e), this.wrapperEl.appendChild(this.upperCanvasEl), this._copyCanvasStyle(this.lowerCanvasEl, this.upperCanvasEl), this._applyCanvasStyle(this.upperCanvasEl), this.contextTop = this.upperCanvasEl.getContext("2d")
    }, _createCacheCanvas: function () {
        this.cacheCanvasEl = this._createCanvasElement(), this.cacheCanvasEl.setAttribute("width", this.width), this.cacheCanvasEl.setAttribute("height", this.height), this.contextCache = this.cacheCanvasEl.getContext("2d")
    }, _initWrapperElement: function () {
        this.wrapperEl = fabric.util.wrapElement(this.lowerCanvasEl, "div", {"class": this.containerClass}), fabric.util.setStyle(this.wrapperEl, {width: this.getWidth() + "px", height: this.getHeight() + "px", position: "relative"}), fabric.util.makeElementUnselectable(this.wrapperEl)
    }, _applyCanvasStyle: function (e) {
        var t = this.getWidth() || e.width, n = this.getHeight() || e.height;
        fabric.util.setStyle(e, {position: "absolute", width: t + "px", height: n + "px", left: 0, top: 0}), e.width = t, e.height = n, fabric.util.makeElementUnselectable(e)
    }, _copyCanvasStyle: function (e, t) {
        t.style.cssText = e.style.cssText
    }, getSelectionContext: function () {
        return this.contextTop
    }, getSelectionElement: function () {
        return this.upperCanvasEl
    }, setActiveObject: function (e, t) {
        return this._activeObject && this._activeObject.set("active", !1), this._activeObject = e, e.set("active", !0), this.renderAll(), this.fire("object:selected", {target: e, e: t}), e.fire("selected", {e: t}), this
    }, getActiveObject: function () {
        return this._activeObject
    }, discardActiveObject: function () {
        return this._activeObject && this._activeObject.set("active", !1), this._activeObject = null, this
    }, setActiveGroup: function (e) {
        return this._activeGroup = e, e && (e.canvas = this, e.set("active", !0)), this
    }, getActiveGroup: function () {
        return this._activeGroup
    }, discardActiveGroup: function () {
        var e = this.getActiveGroup();
        return e && e.destroy(), this.setActiveGroup(null)
    }, deactivateAll: function () {
        var e = this.getObjects(), t = 0, n = e.length;
        for (; t < n; t++)e[t].set("active", !1);
        return this.discardActiveGroup(), this.discardActiveObject(), this
    }, deactivateAllWithDispatch: function () {
        var e = this.getActiveGroup() || this.getActiveObject();
        return e && this.fire("before:selection:cleared", {target: e}), this.deactivateAll(), e && this.fire("selection:cleared"), this
    }, drawControls: function (e) {
        var t = this.getActiveGroup();
        if (t)e.save(), fabric.Group.prototype.transform.call(t, e), t.drawBorders(e).drawControls(e), e.restore(); else for (var n = 0, r = this._objects.length; n < r; ++n) {
            if (!this._objects[n] || !this._objects[n].active)continue;
            e.save(), fabric.Object.prototype.transform.call(this._objects[n], e), this._objects[n].drawBorders(e).drawControls(e), e.restore(), this.lastRenderedObjectWithControlsAboveOverlay = this._objects[n]
        }
    }};
    fabric.Canvas.prototype.toString = fabric.StaticCanvas.prototype.toString, e(fabric.Canvas.prototype, l);
    for (var c in fabric.StaticCanvas)c !== "prototype" && (fabric.Canvas[c] = fabric.StaticCanvas[c]);
    fabric.isTouchSupported && (fabric.Canvas.prototype._setCursorFromEvent = function () {
    }), fabric.Element = fabric.Canvas
})();
(function () {
    var e = ["n-resize", "ne-resize", "e-resize", "se-resize", "s-resize", "sw-resize", "w-resize", "nw-resize"], t = {mt: 0, tr: 1, mr: 2, br: 3, mb: 4, bl: 5, ml: 6, tl: 7}, n = fabric.util.addListener, r = fabric.util.removeListener, i = fabric.util.getPointer;
    fabric.util.object.extend(fabric.Canvas.prototype, {_initEvents: function () {
        var e = this;
        this._onMouseDown = this._onMouseDown.bind(this), this._onMouseMove = this._onMouseMove.bind(this), this._onMouseUp = this._onMouseUp.bind(this), this._onResize = this._onResize.bind(this), this._onGesture = function (t, n) {
            e.__onTransformGesture(t, n)
        }, n(fabric.window, "resize", this._onResize), fabric.isTouchSupported ? (n(this.upperCanvasEl, "touchstart", this._onMouseDown), n(this.upperCanvasEl, "touchmove", this._onMouseMove), typeof Event != "undefined" && "add"in Event && Event.add(this.upperCanvasEl, "gesture", this._onGesture)) : (n(this.upperCanvasEl, "mousedown", this._onMouseDown), n(this.upperCanvasEl, "mousemove", this._onMouseMove))
    }, _onMouseDown: function (e) {
        this.__onMouseDown(e), !fabric.isTouchSupported && n(fabric.document, "mouseup", this._onMouseUp), fabric.isTouchSupported && n(fabric.document, "touchend", this._onMouseUp), !fabric.isTouchSupported && n(fabric.document, "mousemove", this._onMouseMove), fabric.isTouchSupported && n(fabric.document, "touchmove", this._onMouseMove), !fabric.isTouchSupported && r(this.upperCanvasEl, "mousemove", this._onMouseMove), fabric.isTouchSupported && r(this.upperCanvasEl, "touchmove", this._onMouseMove)
    }, _onMouseUp: function (e) {
        this.__onMouseUp(e), !fabric.isTouchSupported && r(fabric.document, "mouseup", this._onMouseUp), fabric.isTouchSupported && r(fabric.document, "touchend", this._onMouseUp), !fabric.isTouchSupported && r(fabric.document, "mousemove", this._onMouseMove), fabric.isTouchSupported && r(fabric.document, "touchmove", this._onMouseMove), !fabric.isTouchSupported && n(this.upperCanvasEl, "mousemove", this._onMouseMove), fabric.isTouchSupported && n(this.upperCanvasEl, "touchmove", this._onMouseMove)
    }, _onMouseMove: function (e) {
        e.preventDefault && e.preventDefault(), this.__onMouseMove(e)
    }, _onResize: function () {
        this.calcOffset()
    }, __onMouseUp: function (e) {
        var t;
        if (this.isDrawingMode && this._isCurrentlyDrawing) {
            this._isCurrentlyDrawing = !1, this.freeDrawingBrush.onMouseUp(), this.fire("mouse:up", {e: e});
            return
        }
        if (this._currentTransform) {
            var n = this._currentTransform;
            t = n.target, t._scaling && (t._scaling = !1), t.isMoving = !1, t.setCoords(), this.stateful && t.hasStateChanged() && (this.fire("object:modified", {target: t}), t.fire("modified")), this._previousOriginX && (this._currentTransform.target.adjustPosition(this._previousOriginX), this._previousOriginX = null)
        }
        this._currentTransform = null, this.selection && this._groupSelector && this._findSelectedObjects(e);
        var r = this.getActiveGroup();
        r && (r.setObjectsCoords(), r.set("isMoving", !1), this._setCursor(this.defaultCursor)), this._groupSelector = null, this.renderAll(), this._setCursorFromEvent(e, t), this._setCursor("");
        var i = this;
        setTimeout(function () {
            i._setCursorFromEvent(e, t)
        }, 50), this.fire("mouse:up", {target: t, e: e}), t && t.fire("mouseup", {e: e})
    }, __onMouseDown: function (e) {
        var t, n = "which"in e ? e.which === 1 : e.button === 1;
        if (!n && !fabric.isTouchSupported)return;
        if (this.isDrawingMode) {
            t = this.getPointer(e), this._isCurrentlyDrawing = !0, this.discardActiveObject().renderAll(), this.freeDrawingBrush.onMouseDown(t), this.fire("mouse:down", {e: e});
            return
        }
        if (this._currentTransform)return;
        var r = this.findTarget(e), i;
        t = this.getPointer(e), this._shouldClearSelection(e, r) ? (this._groupSelector = {ex: t.x, ey: t.y, top: 0, left: 0}, this.deactivateAllWithDispatch(), r && r.selectable && this.setActiveObject(r, e)) : this._shouldHandleGroupLogic(e, r) ? (this._handleGroupLogic(e, r), r = this.getActiveGroup()) : (this.stateful && r.saveState(), (i = r._findTargetCorner(e, this._offset)) && this.onBeforeScaleRotate(r), r !== this.getActiveGroup() && r !== this.getActiveObject() && (this.deactivateAll(), this.setActiveObject(r, e)), this._setupCurrentTransform(e, r)), this.renderAll(), this.fire("mouse:down", {target: r, e: e}), r && r.fire("mousedown", {e: e}), i === "mtr" && (this._previousOriginX = this._currentTransform.target.originX, this._currentTransform.target.adjustPosition("center"), this._currentTransform.left = this._currentTransform.target.left, this._currentTransform.top = this._currentTransform.target.top)
    }, __onMouseMove: function (e) {
        var t, n;
        if (this.isDrawingMode) {
            this._isCurrentlyDrawing && (n = this.getPointer(e), this.freeDrawingBrush.onMouseMove(n)), this.upperCanvasEl.style.cursor = this.freeDrawingCursor, this.fire("mouse:move", {e: e});
            return
        }
        var r = this._groupSelector;
        if (r)n = i(e, this.upperCanvasEl), r.left = n.x - this._offset.left - r.ex, r.top = n.y - this._offset.top - r.ey, this.renderTop(); else if (!this._currentTransform) {
            var s = this.upperCanvasEl.style;
            t = this.findTarget(e);
            if (!t || t && !t.selectable) {
                for (var o = this._objects.length; o--;)this._objects[o] && !this._objects[o].active && this._objects[o].set("active", !1);
                s.cursor = this.defaultCursor
            } else this._setCursorFromEvent(e, t)
        } else {
            n = i(e, this.upperCanvasEl);
            var u = n.x, a = n.y, f = !1, l = this._currentTransform;
            t = l.target, t.isMoving = !0, (l.action === "scale" || l.action === "scaleX" || l.action === "scaleY") && (e.altKey && (l.originX !== "center" || l.originY !== "center") || !e.altKey && l.originX === "center" && l.originY === "center") && (this._resetCurrentTransform(e), f = !0), l.action === "rotate" ? (this._rotateObject(u, a), this.fire("object:rotating", {target: t, e: e}), t.fire("rotating", {e: e})) : l.action === "scale" ? ((e.shiftKey || this.uniScaleTransform) && !t.get("lockUniScaling") ? (l.currentAction = "scale", this._scaleObject(u, a)) : (!f && l.currentAction === "scale" && this._resetCurrentTransform(e), l.currentAction = "scaleEqually", this._scaleObject(u, a, "equally")), this.fire("object:scaling", {target: t, e: e}), t.fire("scaling", {e: e})) : l.action === "scaleX" ? (this._scaleObject(u, a, "x"), this.fire("object:scaling", {target: t, e: e}), t.fire("scaling", {e: e})) : l.action === "scaleY" ? (this._scaleObject(u, a, "y"), this.fire("object:scaling", {target: t, e: e}), t.fire("scaling", {e: e})) : (this._translateObject(u, a), this.fire("object:moving", {target: t, e: e}), t.fire("moving", {e: e}), this._setCursor(this.moveCursor)), this.renderAll()
        }
        this.fire("mouse:move", {target: t, e: e}), t && t.fire("mousemove", {e: e})
    }, _setCursorFromEvent: function (n, r) {
        var i = this.upperCanvasEl.style;
        if (!r)return i.cursor = this.defaultCursor, !1;
        var s = this.getActiveGroup(), o = r._findTargetCorner && (!s || !s.contains(r)) && r._findTargetCorner(n, this._offset);
        if (!o)i.cursor = this.hoverCursor; else if (o in t) {
            var u = Math.round(r.getAngle() % 360 / 45);
            u < 0 && (u += 8), u += t[o], u %= 8, i.cursor = e[u]
        } else {
            if (o !== "mtr" || !r.hasRotatingPoint)return i.cursor = this.defaultCursor, !1;
            i.cursor = this.rotationCursor
        }
        return!0
    }})
})();
fabric.util.object.extend(fabric.StaticCanvas.prototype, {FX_DURATION: 500, fxCenterObjectH: function (e, t) {
    t = t || {};
    var n = function () {
    }, r = t.onComplete || n, i = t.onChange || n, s = this;
    return fabric.util.animate({startValue: e.get("left"), endValue: this.getCenter().left, duration: this.FX_DURATION, onChange: function (t) {
        e.set("left", t), s.renderAll(), i()
    }, onComplete: function () {
        e.setCoords(), r()
    }}), this
}, fxCenterObjectV: function (e, t) {
    t = t || {};
    var n = function () {
    }, r = t.onComplete || n, i = t.onChange || n, s = this;
    return fabric.util.animate({startValue: e.get("top"), endValue: this.getCenter().top, duration: this.FX_DURATION, onChange: function (t) {
        e.set("top", t), s.renderAll(), i()
    }, onComplete: function () {
        e.setCoords(), r()
    }}), this
}, fxRemove: function (e, t) {
    t = t || {};
    var n = function () {
    }, r = t.onComplete || n, i = t.onChange || n, s = this;
    return fabric.util.animate({startValue: e.get("opacity"), endValue: 0, duration: this.FX_DURATION, onStart: function () {
        e.set("active", !1)
    }, onChange: function (t) {
        e.set("opacity", t), s.renderAll(), i()
    }, onComplete: function () {
        s.remove(e), r()
    }}), this
}});
fabric.util.object.extend(fabric.StaticCanvas.prototype, {toDataURL: function (e) {
    e || (e = {});
    var t = e.format || "png", n = e.quality || 1, r = e.multiplier || 1;
    return r !== 1 ? this.__toDataURLWithMultiplier(t, n, r) : this.__toDataURL(t, n)
}, __toDataURL: function (e, t) {
    this.renderAll(!0);
    var n = this.upperCanvasEl || this.lowerCanvasEl, r = fabric.StaticCanvas.supports("toDataURLWithQuality") ? n.toDataURL("image/" + e, t) : n.toDataURL("image/" + e);
    return this.contextTop && this.clearContext(this.contextTop), this.renderAll(), r
}, __toDataURLWithMultiplier: function (e, t, n) {
    var r = this.getWidth(), i = this.getHeight(), s = r * n, o = i * n, u = this.getActiveObject(), a = this.getActiveGroup(), f = this.contextTop || this.contextContainer;
    this.setWidth(s).setHeight(o), f.scale(n, n), a ? this._tempRemoveBordersControlsFromGroup(a) : u && this.deactivateAll && this.deactivateAll(), this.width = r, this.height = i, this.renderAll(!0);
    var l = this.__toDataURL(e, t);
    return f.scale(1 / n, 1 / n), this.setWidth(r).setHeight(i), a ? this._restoreBordersControlsOnGroup(a) : u && this.setActiveObject && this.setActiveObject(u), this.contextTop && this.clearContext(this.contextTop), this.renderAll(), l
}, toDataURLWithMultiplier: function (e, t, n) {
    return this.toDataURL({format: e, multiplier: t, quality: n})
}, _tempRemoveBordersControlsFromGroup: function (e) {
    e.origHasControls = e.hasControls, e.origBorderColor = e.borderColor, e.hasControls = !0, e.borderColor = "rgba(0,0,0,0)", e.forEachObject(function (e) {
        e.origBorderColor = e.borderColor, e.borderColor = "rgba(0,0,0,0)"
    })
}, _restoreBordersControlsOnGroup: function (e) {
    e.hideControls = e.origHideControls, e.borderColor = e.origBorderColor, e.forEachObject(function (e) {
        e.borderColor = e.origBorderColor, delete e.origBorderColor
    })
}});
fabric.util.object.extend(fabric.StaticCanvas.prototype, {loadFromDatalessJSON: function (e, t) {
    return this.loadFromJSON(e, t)
}, loadFromJSON: function (e, t) {
    if (!e)return;
    var n = typeof e == "string" ? JSON.parse(e) : e;
    this.clear();
    var r = this;
    return this._enlivenObjects(n.objects, function () {
        r._setBgOverlayImages(n, t)
    }), this
}, _setBgOverlayImages: function (e, t) {
    var n = this, r, i, s, o = function () {
        t && i && s && r && t()
    };
    e.backgroundImage ? this.setBackgroundImage(e.backgroundImage, function () {
        n.backgroundImageOpacity = e.backgroundImageOpacity, n.backgroundImageStretch = e.backgroundImageStretch, n.renderAll(), i = !0, o()
    }) : i = !0, e.overlayImage ? this.setOverlayImage(e.overlayImage, function () {
        n.overlayImageLeft = e.overlayImageLeft || 0, n.overlayImageTop = e.overlayImageTop || 0, n.renderAll(), s = !0, o()
    }) : s = !0, e.background ? this.setBackgroundColor(e.background, function () {
        n.renderAll(), r = !0, o()
    }) : r = !0, !e.backgroundImage && !e.overlayImage && !e.background && t && t()
}, _enlivenObjects: function (e, t) {
    var n = this;
    e.length === 0 && t && t();
    var r = this.renderOnAddition;
    this.renderOnAddition = !1, fabric.util.enlivenObjects(e, function (e) {
        e.forEach(function (e, t) {
            n.insertAt(e, t, !0)
        }), n.renderOnAddition = r, t && t()
    })
}, _toDataURL: function (e, t) {
    this.clone(function (n) {
        t(n.toDataURL(e))
    })
}, _toDataURLWithMultiplier: function (e, t, n) {
    this.clone(function (r) {
        n(r.toDataURLWithMultiplier(e, t))
    })
}, clone: function (e) {
    var t = JSON.stringify(this);
    this.cloneWithoutData(function (n) {
        n.loadFromJSON(t, function () {
            e && e(n)
        })
    })
}, cloneWithoutData: function (e) {
    var t = fabric.document.createElement("canvas");
    t.width = this.getWidth(), t.height = this.getHeight();
    var n = new fabric.Canvas(t);
    n.clipTo = this.clipTo, this.backgroundImage ? (n.setBackgroundImage(this.backgroundImage.src, function () {
        n.renderAll(), e && e(n)
    }), n.backgroundImageOpacity = this.backgroundImageOpacity, n.backgroundImageStretch = this.backgroundImageStretch) : e && e(n)
}});
(function () {
    var e = fabric.util.degreesToRadians, t = fabric.util.radiansToDegrees;
    fabric.util.object.extend(fabric.Canvas.prototype, {__onTransformGesture: function (e, t) {
        if (this.isDrawingMode || e.touches.length !== 2 || "gesture" !== t.gesture)return;
        var n = this.findTarget(e);
        "undefined" != typeof n && (this.onBeforeScaleRotate(n), this._rotateObjectByAngle(t.rotation), this._scaleObjectBy(t.scale)), this.fire("touch:gesture", {target: n, e: e, self: t})
    }, _scaleObjectBy: function (e, t) {
        var n = this._currentTransform, r = n.target, i = r.get("lockScalingX"), s = r.get("lockScalingY");
        if (i && s)return;
        r._scaling = !0, t ? t === "x" && !r.get("lockUniScaling") ? i || r.set("scaleX", n.scaleX * e) : t === "y" && !r.get("lockUniScaling") && (s || r.set("scaleY", n.scaleY * e)) : (i || r.set("scaleX", n.scaleX * e), s || r.set("scaleY", n.scaleY * e))
    }, _rotateObjectByAngle: function (n) {
        var r = this._currentTransform;
        if (r.target.get("lockRotation"))return;
        r.target.angle = t(e(n) + r.theta)
    }})
})();
(function (e) {
    "use strict";
    var t = e.fabric || (e.fabric = {}), n = t.util.object.extend, r = t.util.toFixed, i = t.util.string.capitalize, s = t.util.degreesToRadians, o = t.StaticCanvas.supports("setLineDash");
    if (t.Object)return;
    t.Object = t.util.createClass({type: "object", originX: "center", originY: "center", top: 0, left: 0, width: 0, height: 0, scaleX: 1, scaleY: 1, flipX: !1, flipY: !1, opacity: 1, angle: 0, cornerSize: 12, transparentCorners: !0, padding: 0, borderColor: "rgba(102,153,255,0.75)", cornerColor: "rgba(102,153,255,0.5)", centerTransform: !1, fill: "rgb(0,0,0)", fillRule: "source-over", overlayFill: null, stroke: null, strokeWidth: 1, strokeDashArray: null, strokeLineCap: "butt", strokeLineJoin: "miter", strokeMiterLimit: 10, shadow: null, borderOpacityWhenMoving: .4, borderScaleFactor: 1, transformMatrix: null, minScaleLimit: .01, selectable: !0, visible: !0, hasControls: !0, hasBorders: !0, hasRotatingPoint: !0, rotatingPointOffset: 40, perPixelTargetFind: !1, includeDefaultValues: !0, clipTo: null, lockMovementX: !1, lockMovementY: !1, lockRotation: !1, lockScalingX: !1, lockScalingY: !1, lockUniScaling: !1, stateProperties: "top left width height scaleX scaleY flipX flipY angle opacity cornerSize fill overlayFill originX originY stroke strokeWidth strokeDashArray fillRule borderScaleFactor transformMatrix selectable shadow visible".split(" "), initialize: function (e) {
        e && this.setOptions(e)
    }, _initGradient: function (e) {
        e.fill && e.fill.colorStops && !(e.fill instanceof t.Gradient) && this.set("fill", new t.Gradient(e.fill))
    }, _initPattern: function (e) {
        e.fill && e.fill.source && !(e.fill instanceof t.Pattern) && this.set("fill", new t.Pattern(e.fill)), e.stroke && e.stroke.source && !(e.stroke instanceof t.Pattern) && this.set("stroke", new t.Pattern(e.stroke))
    }, _initShadow: function (e) {
        e.shadow && !(e.shadow instanceof t.Shadow) && this.setShadow(e.shadow)
    }, _initClipping: function (e) {
        if (!e.clipTo || typeof e.clipTo != "string")return;
        var n = t.util.getFunctionBody(e.clipTo);
        typeof n != "undefined" && (this.clipTo = new Function("ctx", n))
    }, setOptions: function (e) {
        for (var t in e)this.set(t, e[t]);
        this._initGradient(e), this._initPattern(e), this._initShadow(e), this._initClipping(e)
    }, transform: function (e, t) {
        e.globalAlpha = this.opacity;
        var n = t ? this._getLeftTopCoords() : this.getCenterPoint();
        e.translate(n.x, n.y), e.rotate(s(this.angle)), e.scale(this.scaleX * (this.flipX ? -1 : 1), this.scaleY * (this.flipY ? -1 : 1))
    }, toObject: function (e) {
        var n = t.Object.NUM_FRACTION_DIGITS, i = {type: this.type, originX: this.originX, originY: this.originY, left: r(this.left, n), top: r(this.top, n), width: r(this.width, n), height: r(this.height, n), fill: this.fill && this.fill.toObject ? this.fill.toObject() : this.fill, overlayFill: this.overlayFill, stroke: this.stroke && this.stroke.toObject ? this.stroke.toObject() : this.stroke, strokeWidth: r(this.strokeWidth, n), strokeDashArray: this.strokeDashArray, strokeLineCap: this.strokeLineCap, strokeLineJoin: this.strokeLineJoin, strokeMiterLimit: r(this.strokeMiterLimit, n), scaleX: r(this.scaleX, n), scaleY: r(this.scaleY, n), angle: r(this.getAngle(), n), flipX: this.flipX, flipY: this.flipY, opacity: r(this.opacity, n), selectable: this.selectable, hasControls: this.hasControls, hasBorders: this.hasBorders, hasRotatingPoint: this.hasRotatingPoint, transparentCorners: this.transparentCorners, perPixelTargetFind: this.perPixelTargetFind, shadow: this.shadow && this.shadow.toObject ? this.shadow.toObject() : this.shadow, visible: this.visible, clipTo: this.clipTo && String(this.clipTo)};
        return this.includeDefaultValues || (i = this._removeDefaultValues(i)), t.util.populateWithProperties(this, i, e), i
    }, toDatalessObject: function (e) {
        return this.toObject(e)
    }, getSvgStyles: function () {
        return["stroke: ", this.stroke ? this.stroke : "none", "; ", "stroke-width: ", this.strokeWidth ? this.strokeWidth : "0", "; ", "stroke-dasharray: ", this.strokeDashArray ? this.strokeDashArray.join(" ") : "", "; ", "stroke-linecap: ", this.strokeLineCap ? this.strokeLineCap : "butt", "; ", "stroke-linejoin: ", this.strokeLineJoin ? this.strokeLineJoin : "miter", "; ", "stroke-miterlimit: ", this.strokeMiterLimit ? this.strokeMiterLimit : "4", "; ", "fill: ", this.fill ? this.fill && this.fill.toLive ? "url(#SVGID_" + this.fill.id + ")" : this.fill : "none", "; ", "opacity: ", typeof this.opacity != "undefined" ? this.opacity : "1", ";", this.visible ? "" : " visibility: hidden;"].join("")
    }, getSvgTransform: function () {
        var e = this.getAngle(), n = this.getCenterPoint(), i = t.Object.NUM_FRACTION_DIGITS, s = "translate(" + r(n.x, i) + " " + r(n.y, i) + ")", o = e !== 0 ? " rotate(" + r(e, i) + ")" : "", u = this.scaleX === 1 && this.scaleY === 1 ? "" : " scale(" + r(this.scaleX, i) + " " + r(this.scaleY, i) + ")", a = this.flipX ? "matrix(-1 0 0 1 0 0) " : "", f = this.flipY ? "matrix(1 0 0 -1 0 0)" : "";
        return[s, o, u, a, f].join("")
    }, _removeDefaultValues: function (e) {
        var n = t.Object.prototype.options;
        return n && this.stateProperties.forEach(function (t) {
            e[t] === n[t] && delete e[t]
        }), e
    }, toString: function () {
        return"#<fabric." + i(this.type) + ">"
    }, get: function (e) {
        return this[e]
    }, set: function (e, t) {
        if (typeof e == "object")for (var n in e)this._set(n, e[n]); else typeof t == "function" && e !== "clipTo" ? this._set(e, t(this.get(e))) : this._set(e, t);
        return this
    }, _set: function (e, t) {
        var n = e === "scaleX" || e === "scaleY";
        n && (t = this._constrainScale(t));
        if (e === "scaleX" && t < 0)this.flipX = !this.flipX, t *= -1; else if (e === "scaleY" && t < 0)this.flipY = !this.flipY, t *= -1; else if (e === "width" || e === "height")this.minScaleLimit = r(Math.min(.1, 1 / Math.max(this.width, this.height)), 2);
        return this[e] = t, this
    }, toggle: function (e) {
        var t = this.get(e);
        return typeof t == "boolean" && this.set(e, !t), this
    }, setSourcePath: function (e) {
        return this.sourcePath = e, this
    }, render: function (e, n) {
        if (this.width === 0 || this.height === 0 || !this.visible)return;
        e.save();
        var r = this.transformMatrix;
        r && !this.group && e.setTransform(r[0], r[1], r[2], r[3], r[4], r[5]), n || this.transform(e), this.stroke && (e.lineWidth = this.strokeWidth, e.lineCap = this.strokeLineCap, e.lineJoin = this.strokeLineJoin, e.miterLimit = this.strokeMiterLimit, e.strokeStyle = this.stroke.toLive ? this.stroke.toLive(e) : this.stroke), this.overlayFill ? e.fillStyle = this.overlayFill : this.fill && (e.fillStyle = this.fill.toLive ? this.fill.toLive(e) : this.fill), r && this.group && (e.translate(-this.group.width / 2, -this.group.height / 2), e.transform(r[0], r[1], r[2], r[3], r[4], r[5])), this._setShadow(e), this.clipTo && t.util.clipContext(this, e), this._render(e, n), this.clipTo && e.restore(), this._removeShadow(e), this.active && !n && (this.drawBorders(e), this.drawControls(e)), e.restore()
    }, _setShadow: function (e) {
        if (!this.shadow)return;
        e.shadowColor = this.shadow.color, e.shadowBlur = this.shadow.blur, e.shadowOffsetX = this.shadow.offsetX, e.shadowOffsetY = this.shadow.offsetY
    }, _removeShadow: function (e) {
        e.shadowColor = "", e.shadowBlur = e.shadowOffsetX = e.shadowOffsetY = 0
    }, _renderFill: function (e) {
        if (!this.fill)return;
        this.fill.toLive && (e.save(), e.translate(-this.width / 2 + this.fill.offsetX || 0, -this.height / 2 + this.fill.offsetY || 0)), e.fill(), this.fill.toLive && e.restore(), this.shadow && !this.shadow.affectStroke && this._removeShadow(e)
    }, _renderStroke: function (e) {
        if (!this.stroke)return;
        e.save(), this.strokeDashArray ? (1 & this.strokeDashArray.length && this.strokeDashArray.push.apply(this.strokeDashArray, this.strokeDashArray), o ? (e.setLineDash(this.strokeDashArray), this._stroke && this._stroke(e)) : this._renderDashedStroke && this._renderDashedStroke(e), e.stroke()) : this._stroke ? this._stroke(e) : e.stroke(), this._removeShadow(e), e.restore()
    }, clone: function (e, n) {
        return this.constructor.fromObject ? this.constructor.fromObject(this.toObject(n), e) : new t.Object(this.toObject(n))
    }, cloneAsImage: function (e) {
        var n = this.toDataURL();
        return t.util.loadImage(n, function (n) {
            e && e(new t.Image(n))
        }), this
    }, toDataURL: function (e) {
        e || (e = {});
        var n = t.util.createCanvasElement();
        n.width = this.getBoundingRectWidth(), n.height = this.getBoundingRectHeight(), t.util.wrapElement(n, "div");
        var r = new t.Canvas(n);
        e.format === "jpeg" && (r.backgroundColor = "#fff");
        var i = {active: this.get("active"), left: this.getLeft(), top: this.getTop()};
        this.set({active: !1, left: n.width / 2, top: n.height / 2}), r.add(this);
        var s = r.toDataURL(e);
        return this.set(i).setCoords(), r.dispose(), r = null, s
    }, isType: function (e) {
        return this.type === e
    }, toGrayscale: function () {
        var e = this.get("fill");
        return e && this.set("overlayFill", (new t.Color(e)).toGrayscale().toRgb()), this
    }, complexity: function () {
        return 0
    }, toJSON: function (e) {
        return this.toObject(e)
    }, setGradient: function (e, n) {
        n || (n = {});
        var r = {colorStops: []};
        r.type = n.type || (n.r1 || n.r2 ? "radial" : "linear"), r.coords = {x1: n.x1, y1: n.y1, x2: n.x2, y2: n.y2};
        if (n.r1 || n.r2)r.coords.r1 = n.r1, r.coords.r2 = n.r2;
        for (var i in n.colorStops) {
            var s = new t.Color(n.colorStops[i]);
            r.colorStops.push({offset: i, color: s.toRgb(), opacity: s.getAlpha()})
        }
        this.set(e, t.Gradient.forObject(this, r))
    }, setPatternFill: function (e) {
        return this.set("fill", new t.Pattern(e))
    }, setShadow: function (e) {
        return this.set("shadow", new t.Shadow(e))
    }, animate: function () {
        if (arguments[0] && typeof arguments[0] == "object") {
            var e = [], t, n;
            for (t in arguments[0])e.push(t);
            for (var r = 0, i = e.length; r < i; r++)t = e[r], n = r !== i - 1, this._animate(t, arguments[0][t], arguments[1], n)
        } else this._animate.apply(this, arguments);
        return this
    }, _animate: function (e, n, r, i) {
        var s = this, o;
        n = n.toString(), r ? r = t.util.object.clone(r) : r = {}, ~e.indexOf(".") && (o = e.split("."));
        var u = o ? this.get(o[0])[o[1]] : this.get(e);
        "from"in r || (r.from = u), ~n.indexOf("=") ? n = u + parseFloat(n.replace("=", "")) : n = parseFloat(n), t.util.animate({startValue: r.from, endValue: n, byValue: r.by, easing: r.easing, duration: r.duration, onChange: function (t) {
            o ? s[o[0]][o[1]] = t : s.set(e, t);
            if (i)return;
            r.onChange && r.onChange()
        }, onComplete: function () {
            if (i)return;
            s.setCoords(), r.onComplete && r.onComplete()
        }})
    }, centerH: function () {
        return this.canvas.centerObjectH(this), this
    }, centerV: function () {
        return this.canvas.centerObjectV(this), this
    }, center: function () {
        return this.centerH().centerV()
    }, remove: function () {
        return this.canvas.remove(this)
    }, sendToBack: function () {
        return this.group ? t.StaticCanvas.prototype.sendToBack.call(this.group, this) : this.canvas.sendToBack(this), this
    }, bringToFront: function () {
        return this.group ? t.StaticCanvas.prototype.bringToFront.call(this.group, this) : this.canvas.bringToFront(this), this
    }, sendBackwards: function (e) {
        return this.group ? t.StaticCanvas.prototype.sendBackwards.call(this.group, this, e) : this.canvas.sendBackwards(this, e), this
    }, bringForward: function (e) {
        return this.group ? t.StaticCanvas.prototype.bringForward.call(this.group, this, e) : this.canvas.bringForward(this, e), this
    }, moveTo: function (e) {
        return this.group ? t.StaticCanvas.prototype.moveTo.call(this.group, this, e) : this.canvas.moveTo(this, e), this
    }}), t.util.createAccessors(t.Object), t.Object.prototype.rotate = t.Object.prototype.setAngle, n(t.Object.prototype, t.Observable), t.Object.NUM_FRACTION_DIGITS = 2, t.Object.__uid = 0
})(typeof exports != "undefined" ? exports : this);
(function () {
    var e = fabric.util.degreesToRadians;
    fabric.util.object.extend(fabric.Object.prototype, {translateToCenterPoint: function (t, n, r) {
        var i = t.x, s = t.y;
        return n === "left" ? i = t.x + (this.getWidth() + this.strokeWidth * this.scaleX) / 2 : n === "right" && (i = t.x - (this.getWidth() + this.strokeWidth * this.scaleX) / 2), r === "top" ? s = t.y + (this.getHeight() + this.strokeWidth * this.scaleY) / 2 : r === "bottom" && (s = t.y - (this.getHeight() + this.strokeWidth * this.scaleY) / 2), fabric.util.rotatePoint(new fabric.Point(i, s), t, e(this.angle))
    }, translateToOriginPoint: function (t, n, r) {
        var i = t.x, s = t.y;
        return n === "left" ? i = t.x - (this.getWidth() + this.strokeWidth * this.scaleX) / 2 : n === "right" && (i = t.x + (this.getWidth() + this.strokeWidth * this.scaleX) / 2), r === "top" ? s = t.y - (this.getHeight() + this.strokeWidth * this.scaleY) / 2 : r === "bottom" && (s = t.y + (this.getHeight() + this.strokeWidth * this.scaleY) / 2), fabric.util.rotatePoint(new fabric.Point(i, s), t, e(this.angle))
    }, getCenterPoint: function () {
        return this.translateToCenterPoint(new fabric.Point(this.left, this.top), this.originX, this.originY)
    }, toLocalPoint: function (t, n, r) {
        var i = this.getCenterPoint(), s, o;
        return n !== undefined && r !== undefined ? (n === "left" ? s = i.x - (this.getWidth() + this.strokeWidth * this.scaleX) / 2 : n === "right" ? s = i.x + (this.getWidth() + this.strokeWidth * this.scaleX) / 2 : s = i.x, r === "top" ? o = i.y - (this.getHeight() + this.strokeWidth * this.scaleY) / 2 : r === "bottom" ? o = i.y + (this.getHeight() + this.strokeWidth * this.scaleY) / 2 : o = i.y) : (s = this.left, o = this.top), fabric.util.rotatePoint(new fabric.Point(t.x, t.y), i, -e(this.angle)).subtractEquals(new fabric.Point(s, o))
    }, setPositionByOrigin: function (e, t, n) {
        var r = this.translateToCenterPoint(e, t, n), i = this.translateToOriginPoint(r, this.originX, this.originY);
        this.set("left", i.x), this.set("top", i.y)
    }, adjustPosition: function (t) {
        var n = e(this.angle), r = this.getWidth() / 2, i = Math.cos(n) * r, s = Math.sin(n) * r, o = this.getWidth(), u = Math.cos(n) * o, a = Math.sin(n) * o;
        this.originX === "center" && t === "left" || this.originX === "right" && t === "center" ? (this.left -= i, this.top -= s) : this.originX === "left" && t === "center" || this.originX === "center" && t === "right" ? (this.left += i, this.top += s) : this.originX === "left" && t === "right" ? (this.left += u, this.top += a) : this.originX === "right" && t === "left" && (this.left -= u, this.top -= a), this.setCoords(), this.originX = t
    }, _getLeftTopCoords: function () {
        var t = e(this.angle), n = this.getWidth() / 2, r = Math.cos(t) * n, i = Math.sin(t) * n, s = this.left, o = this.top;
        if (this.originX === "center" || this.originX === "right")s -= r;
        if (this.originY === "center" || this.originY === "bottom")o -= i;
        return{x: s, y: o}
    }})
})();
(function () {
    var e = fabric.util.degreesToRadians;
    fabric.util.object.extend(fabric.Object.prototype, {intersectsWithRect: function (e, t) {
        var n = this.oCoords, r = new fabric.Point(n.tl.x, n.tl.y), i = new fabric.Point(n.tr.x, n.tr.y), s = new fabric.Point(n.bl.x, n.bl.y), o = new fabric.Point(n.br.x, n.br.y), u = fabric.Intersection.intersectPolygonRectangle([r, i, o, s], e, t);
        return u.status === "Intersection"
    }, intersectsWithObject: function (e) {
        function t(e) {
            return{tl: new fabric.Point(e.tl.x, e.tl.y), tr: new fabric.Point(e.tr.x, e.tr.y), bl: new fabric.Point(e.bl.x, e.bl.y), br: new fabric.Point(e.br.x, e.br.y)}
        }

        var n = t(this.oCoords), r = t(e.oCoords), i = fabric.Intersection.intersectPolygonPolygon([n.tl, n.tr, n.br, n.bl], [r.tl, r.tr, r.br, r.bl]);
        return i.status === "Intersection"
    }, isContainedWithinObject: function (e) {
        var t = e.getBoundingRect(), n = new fabric.Point(t.left, t.top), r = new fabric.Point(t.left + t.width, t.top + t.height);
        return this.isContainedWithinRect(n, r)
    }, isContainedWithinRect: function (e, t) {
        var n = this.getBoundingRect();
        return n.left > e.x && n.left + n.width < t.x && n.top > e.y && n.top + n.height < t.y
    }, containsPoint: function (e) {
        var t = this._getImageLines(this.oCoords), n = this._findCrossPoints(e, t);
        return n !== 0 && n % 2 === 1
    }, _getImageLines: function (e) {
        return{topline: {o: e.tl, d: e.tr}, rightline: {o: e.tr, d: e.br}, bottomline: {o: e.br, d: e.bl}, leftline: {o: e.bl, d: e.tl}}
    }, _findCrossPoints: function (e, t) {
        var n, r, i, s, o, u, a = 0, f;
        for (var l in t) {
            f = t[l];
            if (f.o.y < e.y && f.d.y < e.y)continue;
            if (f.o.y >= e.y && f.d.y >= e.y)continue;
            f.o.x === f.d.x && f.o.x >= e.x ? (o = f.o.x, u = e.y) : (n = 0, r = (f.d.y - f.o.y) / (f.d.x - f.o.x), i = e.y - n * e.x, s = f.o.y - r * f.o.x, o = -(i - s) / (n - r), u = i + n * o), o >= e.x && (a += 1);
            if (a === 2)break
        }
        return a
    }, getBoundingRectWidth: function () {
        return this.getBoundingRect().width
    }, getBoundingRectHeight: function () {
        return this.getBoundingRect().height
    }, getBoundingRect: function () {
        this.oCoords || this.setCoords();
        var e = [this.oCoords.tl.x, this.oCoords.tr.x, this.oCoords.br.x, this.oCoords.bl.x], t = fabric.util.array.min(e), n = fabric.util.array.max(e), r = Math.abs(t - n), i = [this.oCoords.tl.y, this.oCoords.tr.y, this.oCoords.br.y, this.oCoords.bl.y], s = fabric.util.array.min(i), o = fabric.util.array.max(i), u = Math.abs(s - o);
        return{left: t, top: s, width: r, height: u}
    }, getWidth: function () {
        return this.width * this.scaleX
    }, getHeight: function () {
        return this.height * this.scaleY
    }, _constrainScale: function (e) {
        return Math.abs(e) < this.minScaleLimit ? e < 0 ? -this.minScaleLimit : this.minScaleLimit : e
    }, scale: function (e) {
        return e = this._constrainScale(e), e < 0 && (this.flipX = !this.flipX, this.flipY = !this.flipY, e *= -1), this.scaleX = e, this.scaleY = e, this.setCoords(), this
    }, scaleToWidth: function (e) {
        var t = this.getBoundingRectWidth() / this.getWidth();
        return this.scale(e / this.width / t)
    }, scaleToHeight: function (e) {
        var t = this.getBoundingRectHeight() / this.getHeight();
        return this.scale(e / this.height / t)
    }, setCoords: function () {
        var t = this.strokeWidth > 1 ? this.strokeWidth : 0, n = this.padding, r = e(this.angle);
        this.currentWidth = (this.width + t) * this.scaleX + n * 2, this.currentHeight = (this.height + t) * this.scaleY + n * 2, this.currentWidth < 0 && (this.currentWidth = Math.abs(this.currentWidth));
        var i = Math.sqrt(Math.pow(this.currentWidth / 2, 2) + Math.pow(this.currentHeight / 2, 2)), s = Math.atan(isFinite(this.currentHeight / this.currentWidth) ? this.currentHeight / this.currentWidth : 0), o = Math.cos(s + r) * i, u = Math.sin(s + r) * i, a = Math.sin(r), f = Math.cos(r), l = this.getCenterPoint(), c = {x: l.x - o, y: l.y - u}, h = {x: c.x + this.currentWidth * f, y: c.y + this.currentWidth * a}, p = {x: h.x - this.currentHeight * a, y: h.y + this.currentHeight * f}, d = {x: c.x - this.currentHeight * a, y: c.y + this.currentHeight * f}, v = {x: c.x - this.currentHeight / 2 * a, y: c.y + this.currentHeight / 2 * f}, m = {x: c.x + this.currentWidth / 2 * f, y: c.y + this.currentWidth / 2 * a}, g = {x: h.x - this.currentHeight / 2 * a, y: h.y + this.currentHeight / 2 * f}, y = {x: d.x + this.currentWidth / 2 * f, y: d.y + this.currentWidth / 2 * a}, b = {x: m.x, y: m.y};
        return this.oCoords = {tl: c, tr: h, br: p, bl: d, ml: v, mt: m, mr: g, mb: y, mtr: b}, this._setCornerCoords && this._setCornerCoords(), this
    }})
})();
fabric.util.object.extend(fabric.Object.prototype, {hasStateChanged: function () {
    return this.stateProperties.some(function (e) {
        return this[e] !== this.originalState[e]
    }, this)
}, saveState: function (e) {
    return this.stateProperties.forEach(function (e) {
        this.originalState[e] = this.get(e)
    }, this), e && e.stateProperties && e.stateProperties.forEach(function (e) {
        this.originalState[e] = this.get(e)
    }, this), this
}, setupState: function () {
    return this.originalState = {}, this.saveState(), this
}});
(function () {
    var e = fabric.util.getPointer, t = fabric.util.degreesToRadians;
    fabric.util.object.extend(fabric.Object.prototype, {_findTargetCorner: function (t, n) {
        if (!this.hasControls || !this.active)return!1;
        var r = e(t, this.canvas.upperCanvasEl), i = r.x - n.left, s = r.y - n.top, o, u;
        for (var a in this.oCoords) {
            if (a === "mtr" && !this.hasRotatingPoint)continue;
            if (!(!this.get("lockUniScaling") || a !== "mt" && a !== "mr" && a !== "mb" && a !== "ml"))continue;
            u = this._getImageLines(this.oCoords[a].corner), o = this._findCrossPoints({x: i, y: s}, u);
            if (o !== 0 && o % 2 === 1)return this.__corner = a, a
        }
        return!1
    }, _setCornerCoords: function () {
        var e = this.oCoords, n = t(this.angle), r = t(45 - this.angle), i = Math.sqrt(2 * Math.pow(this.cornerSize, 2)) / 2, s = i * Math.cos(r), o = i * Math.sin(r), u = Math.sin(n), a = Math.cos(n);
        e.tl.corner = {tl: {x: e.tl.x - o, y: e.tl.y - s}, tr: {x: e.tl.x + s, y: e.tl.y - o}, bl: {x: e.tl.x - s, y: e.tl.y + o}, br: {x: e.tl.x + o, y: e.tl.y + s}}, e.tr.corner = {tl: {x: e.tr.x - o, y: e.tr.y - s}, tr: {x: e.tr.x + s, y: e.tr.y - o}, br: {x: e.tr.x + o, y: e.tr.y + s}, bl: {x: e.tr.x - s, y: e.tr.y + o}}, e.bl.corner = {tl: {x: e.bl.x - o, y: e.bl.y - s}, bl: {x: e.bl.x - s, y: e.bl.y + o}, br: {x: e.bl.x + o, y: e.bl.y + s}, tr: {x: e.bl.x + s, y: e.bl.y - o}}, e.br.corner = {tr: {x: e.br.x + s, y: e.br.y - o}, bl: {x: e.br.x - s, y: e.br.y + o}, br: {x: e.br.x + o, y: e.br.y + s}, tl: {x: e.br.x - o, y: e.br.y - s}}, e.ml.corner = {tl: {x: e.ml.x - o, y: e.ml.y - s}, tr: {x: e.ml.x + s, y: e.ml.y - o}, bl: {x: e.ml.x - s, y: e.ml.y + o}, br: {x: e.ml.x + o, y: e.ml.y + s}}, e.mt.corner = {tl: {x: e.mt.x - o, y: e.mt.y - s}, tr: {x: e.mt.x + s, y: e.mt.y - o}, bl: {x: e.mt.x - s, y: e.mt.y + o}, br: {x: e.mt.x + o, y: e.mt.y + s}}, e.mr.corner = {tl: {x: e.mr.x - o, y: e.mr.y - s}, tr: {x: e.mr.x + s, y: e.mr.y - o}, bl: {x: e.mr.x - s, y: e.mr.y + o}, br: {x: e.mr.x + o, y: e.mr.y + s}}, e.mb.corner = {tl: {x: e.mb.x - o, y: e.mb.y - s}, tr: {x: e.mb.x + s, y: e.mb.y - o}, bl: {x: e.mb.x - s, y: e.mb.y + o}, br: {x: e.mb.x + o, y: e.mb.y + s}}, e.mtr.corner = {tl: {x: e.mtr.x - o + u * this.rotatingPointOffset, y: e.mtr.y - s - a * this.rotatingPointOffset}, tr: {x: e.mtr.x + s + u * this.rotatingPointOffset, y: e.mtr.y - o - a * this.rotatingPointOffset}, bl: {x: e.mtr.x - s + u * this.rotatingPointOffset, y: e.mtr.y + o - a * this.rotatingPointOffset}, br: {x: e.mtr.x + o + u * this.rotatingPointOffset, y: e.mtr.y + s - a * this.rotatingPointOffset}}
    }, drawBorders: function (e) {
        if (!this.hasBorders)return this;
        var t = this.padding, n = t * 2, r = this.strokeWidth > 1 ? this.strokeWidth : 0;
        e.save(), e.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1, e.strokeStyle = this.borderColor;
        var i = 1 / this._constrainScale(this.scaleX), s = 1 / this._constrainScale(this.scaleY);
        e.lineWidth = 1 / this.borderScaleFactor, e.scale(i, s);
        var o = this.getWidth(), u = this.getHeight();
        e.strokeRect(~~(-(o / 2) - t - r / 2 * this.scaleX) + .5, ~~(-(u / 2) - t - r / 2 * this.scaleY) + .5, ~~(o + n + r * this.scaleX), ~~(u + n + r * this.scaleY));
        if (this.hasRotatingPoint && !this.get("lockRotation") && this.hasControls) {
            var a = (this.flipY ? u + r * this.scaleY + t * 2 : -u - r * this.scaleY - t * 2) / 2;
            e.beginPath(), e.moveTo(0, a), e.lineTo(0, a + (this.flipY ? this.rotatingPointOffset : -this.rotatingPointOffset)), e.closePath(), e.stroke()
        }
        return e.restore(), this
    }, drawControls: function (e) {
        if (!this.hasControls)return this;
        var t = this.cornerSize, n = t / 2, r = this.strokeWidth > 1 ? this.strokeWidth / 2 : 0, i = -(this.width / 2), s = -(this.height / 2), o, u, a = t / this.scaleX, f = t / this.scaleY, l = this.padding / this.scaleX, c = this.padding / this.scaleY, h = n / this.scaleY, p = n / this.scaleX, d = (n - t) / this.scaleX, v = (n - t) / this.scaleY, m = this.height, g = this.width, y = this.transparentCorners ? "strokeRect" : "fillRect", b = this.transparentCorners, w = typeof G_vmlCanvasManager != "undefined";
        return e.save(), e.lineWidth = 1 / Math.max(this.scaleX, this.scaleY), e.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1, e.strokeStyle = e.fillStyle = this.cornerColor, o = i - p - r - l, u = s - h - r - c, w || b || e.clearRect(o, u, a, f), e[y](o, u, a, f), o = i + g - p + r + l, u = s - h - r - c, w || b || e.clearRect(o, u, a, f), e[y](o, u, a, f), o = i - p - r - l, u = s + m + v + r + c, w || b || e.clearRect(o, u, a, f), e[y](o, u, a, f), o = i + g + d + r + l, u = s + m + v + r + c, w || b || e.clearRect(o, u, a, f), e[y](o, u, a, f), this.get("lockUniScaling") || (o = i + g / 2 - p, u = s - h - r - c, w || b || e.clearRect(o, u, a, f), e[y](o, u, a, f), o = i + g / 2 - p, u = s + m + v + r + c, w || b || e.clearRect(o, u, a, f), e[y](o, u, a, f), o = i + g + d + r + l, u = s + m / 2 - h, w || b || e.clearRect(o, u, a, f), e[y](o, u, a, f), o = i - p - r - l, u = s + m / 2 - h, w || b || e.clearRect(o, u, a, f), e[y](o, u, a, f)), this.hasRotatingPoint && (o = i + g / 2 - p, u = this.flipY ? s + m + this.rotatingPointOffset / this.scaleY - f / 2 + r + c : s - this.rotatingPointOffset / this.scaleY - f / 2 - r - c, w || b || e.clearRect(o, u, a, f), e[y](o, u, a, f)), e.restore(), this
    }})
})();
(function (e) {
    "use strict";
    var t = e.fabric || (e.fabric = {}), n = t.util.object.extend, r = {x1: 1, x2: 1, y1: 1, y2: 1}, i = t.StaticCanvas.supports("setLineDash");
    if (t.Line) {
        t.warn("fabric.Line is already defined");
        return
    }
    t.Line = t.util.createClass(t.Object, {type: "line", initialize: function (e, t) {
        t = t || {}, e || (e = [0, 0, 0, 0]), this.callSuper("initialize", t), this.set("x1", e[0]), this.set("y1", e[1]), this.set("x2", e[2]), this.set("y2", e[3]), this._setWidthHeight(t)
    }, _setWidthHeight: function (e) {
        e || (e = {}), this.set("width", Math.abs(this.x2 - this.x1) || 1), this.set("height", Math.abs(this.y2 - this.y1) || 1), this.set("left", "left"in e ? e.left : Math.min(this.x1, this.x2) + this.width / 2), this.set("top", "top"in e ? e.top : Math.min(this.y1, this.y2) + this.height / 2)
    }, _set: function (e, t) {
        return this[e] = t, e in r && this._setWidthHeight(), this
    }, _render: function (e) {
        e.beginPath();
        var t = this.group && this.group.type !== "group";
        t && !this.transformMatrix && e.translate(-this.group.width / 2 + this.left, -this.group.height / 2 + this.top);
        if (!this.strokeDashArray || this.strokeDashArray && i) {
            var n = this.x1 <= this.x2 ? -1 : 1, r = this.y1 <= this.y2 ? -1 : 1;
            e.moveTo(this.width === 1 ? 0 : n * this.width / 2, this.height === 1 ? 0 : r * this.height / 2), e.lineTo(this.width === 1 ? 0 : n * -1 * this.width / 2, this.height === 1 ? 0 : r * -1 * this.height / 2)
        }
        e.lineWidth = this.strokeWidth;
        var s = e.strokeStyle;
        e.strokeStyle = this.stroke || e.fillStyle, this._renderStroke(e), e.strokeStyle = s
    }, _renderDashedStroke: function (e) {
        var n = this.x1 <= this.x2 ? -1 : 1, r = this.y1 <= this.y2 ? -1 : 1, i = this.width === 1 ? 0 : n * this.width / 2, s = this.height === 1 ? 0 : r * this.height / 2;
        e.beginPath(), t.util.drawDashedLine(e, i, s, -i, -s, this.strokeDashArray), e.closePath()
    }, toObject: function (e) {
        return n(this.callSuper("toObject", e), {x1: this.get("x1"), y1: this.get("y1"), x2: this.get("x2"), y2: this.get("y2")})
    }, toSVG: function () {
        var e = [];
        return this.stroke && this.stroke.toLive && e.push(this.stroke.toSVG(this, !0)), e.push("<line ", 'x1="', this.get("x1"), '" y1="', this.get("y1"), '" x2="', this.get("x2"), '" y2="', this.get("y2"), '" style="', this.getSvgStyles(), '"/>'), e.join("")
    }, complexity: function () {
        return 1
    }}), t.Line.ATTRIBUTE_NAMES = t.SHARED_ATTRIBUTES.concat("x1 y1 x2 y2".split(" ")), t.Line.fromElement = function (e, r) {
        var i = t.parseAttributes(e, t.Line.ATTRIBUTE_NAMES), s = [i.x1 || 0, i.y1 || 0, i.x2 || 0, i.y2 || 0];
        return new t.Line(s, n(i, r))
    }, t.Line.fromObject = function (e) {
        var n = [e.x1, e.y1, e.x2, e.y2];
        return new t.Line(n, e)
    }
})(typeof exports != "undefined" ? exports : this);
(function (e) {
    "use strict";
    function i(e) {
        return"radius"in e && e.radius > 0
    }

    var t = e.fabric || (e.fabric = {}), n = Math.PI * 2, r = t.util.object.extend;
    if (t.Circle) {
        t.warn("fabric.Circle is already defined.");
        return
    }
    t.Circle = t.util.createClass(t.Object, {type: "circle", initialize: function (e) {
        e = e || {}, this.set("radius", e.radius || 0), this.callSuper("initialize", e);
        var t = this.get("radius") * 2;
        this.set("width", t).set("height", t)
    }, toObject: function (e) {
        return r(this.callSuper("toObject", e), {radius: this.get("radius")})
    }, toSVG: function () {
        var e = [];
        return this.fill && this.fill.toLive && e.push(this.fill.toSVG(this, !1)), this.stroke && this.stroke.toLive && e.push(this.stroke.toSVG(this, !1)), e.push("<circle ", 'cx="0" cy="0" ', 'r="', this.radius, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), '"/>'), e.join("")
    }, _render: function (e, t) {
        e.beginPath(), e.globalAlpha = this.group ? e.globalAlpha * this.opacity : this.opacity, e.arc(t ? this.left : 0, t ? this.top : 0, this.radius, 0, n, !1), e.closePath(), this._renderFill(e), this._renderStroke(e)
    }, getRadiusX: function () {
        return this.get("radius") * this.get("scaleX")
    }, getRadiusY: function () {
        return this.get("radius") * this.get("scaleY")
    }, setRadius: function (e) {
        this.radius = e, this.set("width", e * 2).set("height", e * 2)
    }, complexity: function () {
        return 1
    }}), t.Circle.ATTRIBUTE_NAMES = t.SHARED_ATTRIBUTES.concat("cx cy r".split(" ")), t.Circle.fromElement = function (e, n) {
        n || (n = {});
        var s = t.parseAttributes(e, t.Circle.ATTRIBUTE_NAMES);
        if (!i(s))throw new Error("value of `r` attribute is required and can not be negative");
        "left"in s && (s.left -= n.width / 2 || 0), "top"in s && (s.top -= n.height / 2 || 0);
        var o = new t.Circle(r(s, n));
        return o.cx = parseFloat(e.getAttribute("cx")) || 0, o.cy = parseFloat(e.getAttribute("cy")) || 0, o
    }, t.Circle.fromObject = function (e) {
        return new t.Circle(e)
    }
})(typeof exports != "undefined" ? exports : this);
(function (e) {
    "use strict";
    var t = e.fabric || (e.fabric = {});
    if (t.Triangle) {
        t.warn("fabric.Triangle is already defined");
        return
    }
    t.Triangle = t.util.createClass(t.Object, {type: "triangle", initialize: function (e) {
        e = e || {}, this.callSuper("initialize", e), this.set("width", e.width || 100).set("height", e.height || 100)
    }, _render: function (e) {
        var t = this.width / 2, n = this.height / 2;
        e.beginPath(), e.moveTo(-t, n), e.lineTo(0, -n), e.lineTo(t, n), e.closePath(), this._renderFill(e), this._renderStroke(e)
    }, _renderDashedStroke: function (e) {
        var n = this.width / 2, r = this.height / 2;
        e.beginPath(), t.util.drawDashedLine(e, -n, r, 0, -r, this.strokeDashArray), t.util.drawDashedLine(e, 0, -r, n, r, this.strokeDashArray), t.util.drawDashedLine(e, n, r, -n, r, this.strokeDashArray), e.closePath()
    }, toSVG: function () {
        var e = [], t = this.width / 2, n = this.height / 2, r = [-t + " " + n, "0 " + -n, t + " " + n].join(",");
        return this.fill && this.fill.toLive && e.push(this.fill.toSVG(this, !0)), this.stroke && this.stroke.toLive && e.push(this.stroke.toSVG(this, !0)), e.push("<polygon ", 'points="', r, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), '"/>'), e.join("")
    }, complexity: function () {
        return 1
    }}), t.Triangle.fromObject = function (e) {
        return new t.Triangle(e)
    }
})(typeof exports != "undefined" ? exports : this);
(function (e) {
    "use strict";
    var t = e.fabric || (e.fabric = {}), n = Math.PI * 2, r = t.util.object.extend;
    if (t.Ellipse) {
        t.warn("fabric.Ellipse is already defined.");
        return
    }
    t.Ellipse = t.util.createClass(t.Object, {type: "ellipse", rx: 0, ry: 0, initialize: function (e) {
        e = e || {}, this.callSuper("initialize", e), this.set("rx", e.rx || 0), this.set("ry", e.ry || 0), this.set("width", this.get("rx") * 2), this.set("height", this.get("ry") * 2)
    }, toObject: function (e) {
        return r(this.callSuper("toObject", e), {rx: this.get("rx"), ry: this.get("ry")})
    }, toSVG: function () {
        var e = [];
        return this.fill && this.fill.toLive && e.push(this.fill.toSVG(this, !1)), this.stroke && this.stroke.toLive && e.push(this.stroke.toSVG(this, !1)), e.push("<ellipse ", 'rx="', this.get("rx"), '" ry="', this.get("ry"), '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), '"/>'), e.join("")
    }, render: function (e, t) {
        if (this.rx === 0 || this.ry === 0)return;
        return this.callSuper("render", e, t)
    }, _render: function (e, t) {
        e.beginPath(), e.save(), e.globalAlpha = this.group ? e.globalAlpha * this.opacity : this.opacity, this.transformMatrix && this.group && e.translate(this.cx, this.cy), e.transform(1, 0, 0, this.ry / this.rx, 0, 0), e.arc(t ? this.left : 0, t ? this.top : 0, this.rx, 0, n, !1), this._renderFill(e), this._renderStroke(e), e.restore()
    }, complexity: function () {
        return 1
    }}), t.Ellipse.ATTRIBUTE_NAMES = t.SHARED_ATTRIBUTES.concat("cx cy rx ry".split(" ")), t.Ellipse.fromElement = function (e, n) {
        n || (n = {});
        var i = t.parseAttributes(e, t.Ellipse.ATTRIBUTE_NAMES), s = i.left, o = i.top;
        "left"in i && (i.left -= n.width / 2 || 0), "top"in i && (i.top -= n.height / 2 || 0);
        var u = new t.Ellipse(r(i, n));
        return u.cx = s || 0, u.cy = o || 0, u
    }, t.Ellipse.fromObject = function (e) {
        return new t.Ellipse(e)
    }
})(typeof exports != "undefined" ? exports : this);
(function (e) {
    "use strict";
    function r(e) {
        return e.left = e.left || 0, e.top = e.top || 0, e
    }

    var t = e.fabric || (e.fabric = {}), n = t.util.object.extend;
    if (t.Rect) {
        console.warn("fabric.Rect is already defined");
        return
    }
    t.Rect = t.util.createClass(t.Object, {type: "rect", rx: 0, ry: 0, strokeDashArray: null, initialize: function (e) {
        e = e || {}, this._initStateProperties(), this.callSuper("initialize", e), this._initRxRy(), this.x = e.x || 0, this.y = e.y || 0
    }, _initStateProperties: function () {
        this.stateProperties = this.stateProperties.concat(["rx", "ry"])
    }, _initRxRy: function () {
        this.rx && !this.ry ? this.ry = this.rx : this.ry && !this.rx && (this.rx = this.ry)
    }, _render: function (e) {
        var t = this.rx || 0, n = this.ry || 0, r = -this.width / 2, i = -this.height / 2, s = this.width, o = this.height, u = this.group && this.group.type !== "group";
        e.beginPath(), e.globalAlpha = u ? e.globalAlpha * this.opacity : this.opacity, this.transformMatrix && u && e.translate(this.width / 2 + this.x, this.height / 2 + this.y), !this.transformMatrix && u && e.translate(-this.group.width / 2 + this.width / 2 + this.x, -this.group.height / 2 + this.height / 2 + this.y);
        var a = t !== 0 || n !== 0;
        e.moveTo(r + t, i), e.lineTo(r + s - t, i), a && e.quadraticCurveTo(r + s, i, r + s, i + n, r + s, i + n), e.lineTo(r + s, i + o - n), a && e.quadraticCurveTo(r + s, i + o, r + s - t, i + o, r + s - t, i + o), e.lineTo(r + t, i + o), a && e.quadraticCurveTo(r, i + o, r, i + o - n, r, i + o - n), e.lineTo(r, i + n), a && e.quadraticCurveTo(r, i, r + t, i, r + t, i), e.closePath(), this._renderFill(e), this._renderStroke(e)
    }, _renderDashedStroke: function (e) {
        var n = -this.width / 2, r = -this.height / 2, i = this.width, s = this.height;
        e.beginPath(), t.util.drawDashedLine(e, n, r, n + i, r, this.strokeDashArray), t.util.drawDashedLine(e, n + i, r, n + i, r + s, this.strokeDashArray), t.util.drawDashedLine(e, n + i, r + s, n, r + s, this.strokeDashArray), t.util.drawDashedLine(e, n, r + s, n, r, this.strokeDashArray), e.closePath()
    }, _normalizeLeftTopProperties: function (e) {
        return"left"in e && this.set("left", e.left + this.getWidth() / 2), this.set("x", e.left || 0), "top"in e && this.set("top", e.top + this.getHeight() / 2), this.set("y", e.top || 0), this
    }, toObject: function (e) {
        return n(this.callSuper("toObject", e), {rx: this.get("rx") || 0, ry: this.get("ry") || 0, x: this.get("x"), y: this.get("y")})
    }, toSVG: function () {
        var e = [];
        return this.fill && this.fill.toLive && e.push(this.fill.toSVG(this, !1)), this.stroke && this.stroke.toLive && e.push(this.stroke.toSVG(this, !1)), e.push("<rect ", 'x="', -1 * this.width / 2, '" y="', -1 * this.height / 2, '" rx="', this.get("rx"), '" ry="', this.get("ry"), '" width="', this.width, '" height="', this.height, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), '"/>'), e.join("")
    }, complexity: function () {
        return 1
    }}), t.Rect.ATTRIBUTE_NAMES = t.SHARED_ATTRIBUTES.concat("x y rx ry width height".split(" ")), t.Rect.fromElement = function (e, i) {
        if (!e)return null;
        var s = t.parseAttributes(e, t.Rect.ATTRIBUTE_NAMES);
        s = r(s);
        var o = new t.Rect(n(i ? t.util.object.clone(i) : {}, s));
        return o._normalizeLeftTopProperties(s), o
    }, t.Rect.fromObject = function (e) {
        return new t.Rect(e)
    }
})(typeof exports != "undefined" ? exports : this);
(function (e) {
    "use strict";
    var t = e.fabric || (e.fabric = {}), n = t.util.toFixed, r = t.util.array.min;
    if (t.Polyline) {
        t.warn("fabric.Polyline is already defined");
        return
    }
    t.Polyline = t.util.createClass(t.Object, {type: "polyline", initialize: function (e, t, n) {
        t = t || {}, this.set("points", e), this.callSuper("initialize", t), this._calcDimensions(n)
    }, _calcDimensions: function (e) {
        return t.Polygon.prototype._calcDimensions.call(this, e)
    }, toObject: function (e) {
        return t.Polygon.prototype.toObject.call(this, e)
    }, toSVG: function () {
        var e = [], t = [];
        for (var r = 0, i = this.points.length; r < i; r++)e.push(n(this.points[r].x, 2), ",", n(this.points[r].y, 2), " ");
        return this.fill && this.fill.toLive && t.push(this.fill.toSVG(this, !1)), this.stroke && this.stroke.toLive && t.push(this.stroke.toSVG(this, !1)), t.push("<polyline ", 'points="', e.join(""), '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), '"/>'), t.join("")
    }, _render: function (e) {
        var t;
        e.beginPath(), e.moveTo(this.points[0].x, this.points[0].y);
        for (var n = 0, r = this.points.length; n < r; n++)t = this.points[n], e.lineTo(t.x, t.y);
        this._renderFill(e), this._renderStroke(e)
    }, _renderDashedStroke: function (e) {
        var n, r;
        e.beginPath();
        for (var i = 0, s = this.points.length; i < s; i++)n = this.points[i], r = this.points[i + 1] || n, t.util.drawDashedLine(e, n.x, n.y, r.x, r.y, this.strokeDashArray)
    }, complexity: function () {
        return this.get("points").length
    }}), t.Polyline.ATTRIBUTE_NAMES = t.SHARED_ATTRIBUTES.concat(), t.Polyline.fromElement = function (e, n) {
        if (!e)return null;
        n || (n = {});
        var i = t.parsePointsAttribute(e.getAttribute("points")), s = t.parseAttributes(e, t.Polyline.ATTRIBUTE_NAMES), o = r(i, "x"), u = r(i, "y");
        o = o < 0 ? o : 0, u = o < 0 ? u : 0;
        for (var a = 0, f = i.length; a < f; a++)i[a].x -= n.width / 2 + o || 0, i[a].y -= n.height / 2 + u || 0;
        return new t.Polyline(i, t.util.object.extend(s, n), !0)
    }, t.Polyline.fromObject = function (e) {
        var n = e.points;
        return new t.Polyline(n, e, !0)
    }
})(typeof exports != "undefined" ? exports : this);
(function (e) {
    "use strict";
    var t = e.fabric || (e.fabric = {}), n = t.util.object.extend, r = t.util.array.min, i = t.util.array.max, s = t.util.toFixed;
    if (t.Polygon) {
        t.warn("fabric.Polygon is already defined");
        return
    }
    t.Polygon = t.util.createClass(t.Object, {type: "polygon", initialize: function (e, t, n) {
        t = t || {}, this.points = e, this.callSuper("initialize", t), this._calcDimensions(n)
    }, _calcDimensions: function (e) {
        var t = this.points, n = r(t, "x"), s = r(t, "y"), o = i(t, "x"), u = i(t, "y");
        this.width = o - n || 1, this.height = u - s || 1, this.minX = n, this.minY = s;
        if (e)return;
        var a = this.width / 2 + this.minX, f = this.height / 2 + this.minY;
        this.points.forEach(function (e) {
            e.x -= a, e.y -= f
        }, this)
    }, toObject: function (e) {
        return n(this.callSuper("toObject", e), {points: this.points.concat()})
    }, toSVG: function () {
        var e = [], t = [];
        for (var n = 0, r = this.points.length; n < r; n++)e.push(s(this.points[n].x, 2), ",", s(this.points[n].y, 2), " ");
        return this.fill && this.fill.toLive && t.push(this.fill.toSVG(this, !1)), this.stroke && this.stroke.toLive && t.push(this.stroke.toSVG(this, !1)), t.push("<polygon ", 'points="', e.join(""), '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), '"/>'), t.join("")
    }, _render: function (e) {
        var t;
        e.beginPath(), e.moveTo(this.points[0].x, this.points[0].y);
        for (var n = 0, r = this.points.length; n < r; n++)t = this.points[n], e.lineTo(t.x, t.y);
        this._renderFill(e);
        if (this.stroke || this.strokeDashArray)e.closePath(), this._renderStroke(e)
    }, _renderDashedStroke: function (e) {
        var n, r;
        e.beginPath();
        for (var i = 0, s = this.points.length; i < s; i++)n = this.points[i], r = this.points[i + 1] || this.points[0], t.util.drawDashedLine(e, n.x, n.y, r.x, r.y, this.strokeDashArray);
        e.closePath()
    }, complexity: function () {
        return this.points.length
    }}), t.Polygon.ATTRIBUTE_NAMES = t.SHARED_ATTRIBUTES.concat(), t.Polygon.fromElement = function (e, i) {
        if (!e)return null;
        i || (i = {});
        var s = t.parsePointsAttribute(e.getAttribute("points")), o = t.parseAttributes(e, t.Polygon.ATTRIBUTE_NAMES), u = r(s, "x"), a = r(s, "y");
        u = u < 0 ? u : 0, a = u < 0 ? a : 0;
        for (var f = 0, l = s.length; f < l; f++)s[f].x -= i.width / 2 + u || 0, s[f].y -= i.height / 2 + a || 0;
        return new t.Polygon(s, n(o, i), !0)
    }, t.Polygon.fromObject = function (e) {
        return new t.Polygon(e.points, e, !0)
    }
})(typeof exports != "undefined" ? exports : this);
(function (e) {
    function a(e) {
        return e[0] === "H" ? e[1] : e[e.length - 2]
    }

    function f(e) {
        return e[0] === "V" ? e[1] : e[e.length - 1]
    }

    var t = {m: 2, l: 2, h: 1, v: 1, c: 6, s: 4, q: 4, t: 2, a: 7};
    "use strict";
    var n = e.fabric || (e.fabric = {}), r = n.util.array.min, i = n.util.array.max, s = n.util.object.extend, o = Object.prototype.toString, u = n.util.drawArc;
    if (n.Path) {
        n.warn("fabric.Path is already defined");
        return
    }
    n.Path = n.util.createClass(n.Object, {type: "path", initialize: function (e, t) {
        t = t || {}, this.setOptions(t);
        if (!e)throw new Error("`path` argument is required");
        var n = o.call(e) === "[object Array]";
        this.path = n ? e : e.match && e.match(/[mzlhvcsqta][^mzlhvcsqta]*/gi);
        if (!this.path)return;
        n || (this.path = this._parsePath()), this._initializePath(t), t.sourcePath && this.setSourcePath(t.sourcePath)
    }, _initializePath: function (e) {
        var t = "width"in e && e.width != null, n = "height"in e && e.width != null, r = "left"in e, i = "top"in e, o = r ? this.left : 0, u = i ? this.top : 0;
        !t || !n ? (s(this, this._parseDimensions()), t && (this.width = e.width), n && (this.height = e.height)) : (i || (this.top = this.height / 2), r || (this.left = this.width / 2)), this.pathOffset = this.pathOffset || this._calculatePathOffset(o, u)
    }, _calculatePathOffset: function (e, t) {
        return{x: this.left - e - this.width / 2, y: this.top - t - this.height / 2}
    }, _render: function (e) {
        var t, n = null, r = 0, i = 0, s = 0, o = 0, a, f, l, c, h = -(this.width / 2 + this.pathOffset.x), p = -(this.height / 2 + this.pathOffset.y);
        for (var d = 0, v = this.path.length; d < v; ++d) {
            t = this.path[d];
            switch (t[0]) {
                case"l":
                    r += t[1], i += t[2], e.lineTo(r + h, i + p);
                    break;
                case"L":
                    r = t[1], i = t[2], e.lineTo(r + h, i + p);
                    break;
                case"h":
                    r += t[1], e.lineTo(r + h, i + p);
                    break;
                case"H":
                    r = t[1], e.lineTo(r + h, i + p);
                    break;
                case"v":
                    i += t[1], e.lineTo(r + h, i + p);
                    break;
                case"V":
                    i = t[1], e.lineTo(r + h, i + p);
                    break;
                case"m":
                    r += t[1], i += t[2], e[!n || n[0] !== "m" && n[0] !== "M" ? "moveTo" : "lineTo"](r + h, i + p);
                    break;
                case"M":
                    r = t[1], i = t[2], e[!n || n[0] !== "m" && n[0] !== "M" ? "moveTo" : "lineTo"](r + h, i + p);
                    break;
                case"c":
                    a = r + t[5], f = i + t[6], s = r + t[3], o = i + t[4], e.bezierCurveTo(r + t[1] + h, i + t[2] + p, s + h, o + p, a + h, f + p), r = a, i = f;
                    break;
                case"C":
                    r = t[5], i = t[6], s = t[3], o = t[4], e.bezierCurveTo(t[1] + h, t[2] + p, s + h, o + p, r + h, i + p);
                    break;
                case"s":
                    a = r + t[3], f = i + t[4], s = s ? 2 * r - s : r, o = o ? 2 * i - o : i, e.bezierCurveTo(s + h, o + p, r + t[1] + h, i + t[2] + p, a + h, f + p), s = r + t[1], o = i + t[2], r = a, i = f;
                    break;
                case"S":
                    a = t[3], f = t[4], s = 2 * r - s, o = 2 * i - o, e.bezierCurveTo(s + h, o + p, t[1] + h, t[2] + p, a + h, f + p), r = a, i = f, s = t[1], o = t[2];
                    break;
                case"q":
                    a = r + t[3], f = i + t[4], s = r + t[1], o = i + t[2], e.quadraticCurveTo(s + h, o + p, a + h, f + p), r = a, i = f;
                    break;
                case"Q":
                    a = t[3], f = t[4], e.quadraticCurveTo(t[1] + h, t[2] + p, a + h, f + p), r = a, i = f, s = t[1], o = t[2];
                    break;
                case"t":
                    a = r + t[1], f = i + t[2], n[0].match(/[QqTt]/) === null ? (s = r, o = i) : n[0] === "t" ? (s = 2 * r - l, o = 2 * i - c) : n[0] === "q" && (s = 2 * r - s, o = 2 * i - o), l = s, c = o, e.quadraticCurveTo(s + h, o + p, a + h, f + p), r = a, i = f, s = r + t[1], o = i + t[2];
                    break;
                case"T":
                    a = t[1], f = t[2], s = 2 * r - s, o = 2 * i - o, e.quadraticCurveTo(s + h, o + p, a + h, f + p), r = a, i = f;
                    break;
                case"a":
                    u(e, r + h, i + p, [t[1], t[2], t[3], t[4], t[5], t[6] + r + h, t[7] + i + p]), r += t[6], i += t[7];
                    break;
                case"A":
                    u(e, r + h, i + p, [t[1], t[2], t[3], t[4], t[5], t[6] + h, t[7] + p]), r = t[6], i = t[7];
                    break;
                case"z":
                case"Z":
                    e.closePath()
            }
            n = t
        }
    }, render: function (e, t) {
        if (!this.visible)return;
        e.save();
        var r = this.transformMatrix;
        r && e.transform(r[0], r[1], r[2], r[3], r[4], r[5]), t || this.transform(e), this.overlayFill ? e.fillStyle = this.overlayFill : this.fill && (e.fillStyle = this.fill.toLive ? this.fill.toLive(e) : this.fill), this.stroke && (e.lineWidth = this.strokeWidth, e.lineCap = this.strokeLineCap, e.lineJoin = this.strokeLineJoin, e.miterLimit = this.strokeMiterLimit, e.strokeStyle = this.stroke.toLive ? this.stroke.toLive(e) : this.stroke), this._setShadow(e), this.clipTo && n.util.clipContext(this, e), e.beginPath(), this._render(e), this._renderFill(e), this._renderStroke(e), this.clipTo && e.restore(), this._removeShadow(e), !t && this.active && (this.drawBorders(e), this.drawControls(e)), e.restore()
    }, toString: function () {
        return"#<fabric.Path (" + this.complexity() + '): { "top": ' + this.top + ', "left": ' + this.left + " }>"
    }, toObject: function (e) {
        var t = s(this.callSuper("toObject", e), {path: this.path, pathOffset: this.pathOffset});
        return this.sourcePath && (t.sourcePath = this.sourcePath), this.transformMatrix && (t.transformMatrix = this.transformMatrix), t
    }, toDatalessObject: function (e) {
        var t = this.toObject(e);
        return this.sourcePath && (t.path = this.sourcePath), delete t.sourcePath, t
    }, toSVG: function () {
        var e = [], t = [];
        for (var n = 0, r = this.path.length; n < r; n++)e.push(this.path[n].join(" "));
        var i = e.join(" ");
        return this.fill && this.fill.toLive && t.push(this.fill.toSVG(this, !0)), this.stroke && this.stroke.toLive && t.push(this.stroke.toSVG(this, !0)), t.push('<g transform="', this.group ? "" : this.getSvgTransform(), '">', "<path ", 'd="', i, '" style="', this.getSvgStyles(), '" transform="translate(', -this.width / 2, " ", -this.height / 2, ")", '" stroke-linecap="round" ', "/>", "</g>"), t.join("")
    }, complexity: function () {
        return this.path.length
    }, _parsePath: function () {
        var e = [], n = [], r, i, s = /(-?\.\d+)|(-?\d+(\.\d+)?)/g, o, u;
        for (var a = 0, f, l = this.path.length; a < l; a++) {
            r = this.path[a], u = r.slice(1).trim(), n.length = 0;
            while (o = s.exec(u))n.push(o[0]);
            f = [r.charAt(0)];
            for (var c = 0, h = n.length; c < h; c++)i = parseFloat(n[c]), isNaN(i) || f.push(i);
            var p = f[0].toLowerCase(), d = t[p];
            if (f.length - 1 > d)for (var v = 1, m = f.length; v < m; v += d)e.push([f[0]].concat(f.slice(v, v + d))); else e.push(f)
        }
        return e
    }, _parseDimensions: function () {
        var e = [], t = [], n, s, o = !1, u, l;
        this.path.forEach(function (r, i) {
            r[0] !== "H" && (n = i === 0 ? a(r) : a(this.path[i - 1])), r[0] !== "V" && (s = i === 0 ? f(r) : f(this.path[i - 1])), r[0] === r[0].toLowerCase() && (o = !0), u = o ? n + a(r) : r[0] === "V" ? n : a(r), l = o ? s + f(r) : r[0] === "H" ? s : f(r);
            var c = parseInt(u, 10);
            isNaN(c) || e.push(c), c = parseInt(l, 10), isNaN(c) || t.push(c)
        }, this);
        var c = r(e), h = r(t), p = i(e), d = i(t), v = p - c, m = d - h, g = {left: this.left + (c + v / 2), top: this.top + (h + m / 2), width: v, height: m};
        return g
    }}), n.Path.fromObject = function (e, t) {
        typeof e.path == "string" ? n.loadSVGFromURL(e.path, function (r) {
            var i = r[0], s = e.path;
            delete e.path, n.util.object.extend(i, e), i.setSourcePath(s), t(i)
        }) : t(new n.Path(e.path, e))
    }, n.Path.ATTRIBUTE_NAMES = n.SHARED_ATTRIBUTES.concat(["d"]), n.Path.fromElement = function (e, t, r) {
        var i = n.parseAttributes(e, n.Path.ATTRIBUTE_NAMES);
        t && t(new n.Path(i.d, s(i, r)))
    }, n.Path.async = !0
})(typeof exports != "undefined" ? exports : this);
(function (e) {
    "use strict";
    var t = e.fabric || (e.fabric = {}), n = t.util.object.extend, r = t.util.array.invoke, i = t.Object.prototype.toObject, s = t.util.string.camelize, o = t.util.string.capitalize;
    if (t.PathGroup) {
        t.warn("fabric.PathGroup is already defined");
        return
    }
    t.PathGroup = t.util.createClass(t.Path, {type: "path-group", fill: "", initialize: function (e, t) {
        t = t || {}, this.paths = e || [];
        for (var n = this.paths.length; n--;)this.paths[n].group = this;
        this.setOptions(t), this.setCoords(), t.sourcePath && this.setSourcePath(t.sourcePath)
    }, render: function (e) {
        if (!this.visible)return;
        e.save();
        var n = this.transformMatrix;
        n && e.transform(n[0], n[1], n[2], n[3], n[4], n[5]), this.transform(e), this._setShadow(e), this.clipTo && t.util.clipContext(this, e);
        for (var r = 0, i = this.paths.length; r < i; ++r)this.paths[r].render(e, !0);
        this.clipTo && e.restore(), this._removeShadow(e), this.active && (this.drawBorders(e), this.drawControls(e)), e.restore()
    }, _set: function (e, t) {
        if ((e === "fill" || e === "overlayFill") && t && this.isSameColor()) {
            var n = this.paths.length;
            while (n--)this.paths[n]._set(e, t)
        }
        return this.callSuper("_set", e, t)
    }, toObject: function (e) {
        return n(i.call(this, e), {paths: r(this.getObjects(), "toObject", e), sourcePath: this.sourcePath})
    }, toDatalessObject: function (e) {
        var t = this.toObject(e);
        return this.sourcePath && (t.paths = this.sourcePath), t
    }, toSVG: function () {
        var e = this.getObjects(), t = ["<g ", 'style="', this.getSvgStyles(), '" ', 'transform="', this.getSvgTransform(), '" ', ">"];
        for (var n = 0, r = e.length; n < r; n++)t.push(e[n].toSVG());
        return t.push("</g>"), t.join("")
    }, toString: function () {
        return"#<fabric.PathGroup (" + this.complexity() + "): { top: " + this.top + ", left: " + this.left + " }>"
    }, isSameColor: function () {
        var e = this.getObjects()[0].get("fill");
        return this.getObjects().every(function (t) {
            return t.get("fill") === e
        })
    }, complexity: function () {
        return this.paths.reduce(function (e, t) {
            return e + (t && t.complexity ? t.complexity() : 0)
        }, 0)
    }, toGrayscale: function () {
        var e = this.paths.length;
        while (e--)this.paths[e].toGrayscale();
        return this
    }, getObjects: function () {
        return this.paths
    }}), t.PathGroup.fromObject = function (e, n) {
        typeof e.paths == "string" ? t.loadSVGFromURL(e.paths, function (r) {
            var i = e.paths;
            delete e.paths;
            var s = t.util.groupSVGElements(r, e, i);
            n(s)
        }) : t.util.enlivenObjects(e.paths, function (r) {
            delete e.paths, n(new t.PathGroup(r, e))
        })
    }, t.PathGroup.async = !0
})(typeof exports != "undefined" ? exports : this);
(function (e) {
    "use strict";
    var t = e.fabric || (e.fabric = {}), n = t.util.object.extend, r = t.util.array.min, i = t.util.array.max, s = t.util.array.invoke;
    if (t.Group)return;
    var o = {lockMovementX: !0, lockMovementY: !0, lockRotation: !0, lockScalingX: !0, lockScalingY: !0, lockUniScaling: !0};
    t.Group = t.util.createClass(t.Object, t.Collection, {type: "group", initialize: function (e, t) {
        t = t || {}, this._objects = e || [];
        for (var r = this._objects.length; r--;)this._objects[r].group = this;
        this.originalState = {}, this.callSuper("initialize"), this._calcBounds(), this._updateObjectsCoords(), t && n(this, t), this._setOpacityIfSame(), this.setCoords(!0), this.saveCoords()
    }, _updateObjectsCoords: function () {
        var e = this.left, t = this.top;
        this.forEachObject(function (n) {
            var r = n.get("left"), i = n.get("top");
            n.set("originalLeft", r), n.set("originalTop", i), n.set("left", r - e), n.set("top", i - t), n.setCoords(), n.__origHasControls = n.hasControls, n.hasControls = !1
        }, this)
    }, toString: function () {
        return"#<fabric.Group: (" + this.complexity() + ")>"
    }, getObjects: function () {
        return this._objects
    }, addWithUpdate: function (e) {
        return this._restoreObjectsState(), this._objects.push(e), e.group = this, this.forEachObject(function (e) {
            e.set("active", !0), e.group = this
        }, this), this._calcBounds(), this._updateObjectsCoords(), this
    }, removeWithUpdate: function (e) {
        return this._restoreObjectsState(), this.forEachObject(function (e) {
            e.set("active", !0), e.group = this
        }, this), this.remove(e), this._calcBounds(), this._updateObjectsCoords(), this
    }, _onObjectAdded: function (e) {
        e.group = this
    }, _onObjectRemoved: function (e) {
        delete e.group, e.set("active", !1)
    }, delegatedProperties: {fill: !0, opacity: !0, fontFamily: !0, fontWeight: !0, fontSize: !0, fontStyle: !0, lineHeight: !0, textDecoration: !0, textShadow: !0, textAlign: !0, backgroundColor: !0}, _set: function (e, t) {
        if (e in this.delegatedProperties) {
            var n = this._objects.length;
            this[e] = t;
            while (n--)this._objects[n].set(e, t)
        } else this[e] = t
    }, toObject: function (e) {
        return n(this.callSuper("toObject", e), {objects: s(this._objects, "toObject", e)})
    }, render: function (e, n) {
        if (!this.visible)return;
        e.save(), this.transform(e);
        var r = Math.max(this.scaleX, this.scaleY);
        this.clipTo && t.util.clipContext(this, e);
        for (var i = 0, s = this._objects.length; i < s; i++) {
            var o = this._objects[i], u = o.borderScaleFactor, a = o.hasRotatingPoint;
            if (!o.visible)continue;
            o.borderScaleFactor = r, o.hasRotatingPoint = !1, o.render(e), o.borderScaleFactor = u, o.hasRotatingPoint = a
        }
        this.clipTo && e.restore(), !n && this.active && (this.drawBorders(e), this.drawControls(e)), e.restore(), this.setCoords()
    }, _restoreObjectsState: function () {
        return this._objects.forEach(this._restoreObjectState, this), this
    }, _restoreObjectState: function (e) {
        var t = this.get("left"), n = this.get("top"), r = this.getAngle() * (Math.PI / 180), i = Math.cos(r) * e.get("top") * this.get("scaleY") + Math.sin(r) * e.get("left") * this.get("scaleX"), s = -Math.sin(r) * e.get("top") * this.get("scaleY") + Math.cos(r) * e.get("left") * this.get("scaleX");
        return e.setAngle(e.getAngle() + this.getAngle()), e.set("left", t + s), e.set("top", n + i), e.set("scaleX", e.get("scaleX") * this.get("scaleX")), e.set("scaleY", e.get("scaleY") * this.get("scaleY")), e.setCoords(), e.hasControls = e.__origHasControls, delete e.__origHasControls, e.set("active", !1), e.setCoords(), delete e.group, this
    }, destroy: function () {
        return this._restoreObjectsState()
    }, saveCoords: function () {
        return this._originalLeft = this.get("left"), this._originalTop = this.get("top"), this
    }, hasMoved: function () {
        return this._originalLeft !== this.get("left") || this._originalTop !== this.get("top")
    }, setObjectsCoords: function () {
        return this.forEachObject(function (e) {
            e.setCoords()
        }), this
    }, _setOpacityIfSame: function () {
        var e = this.getObjects(), t = e[0] ? e[0].get("opacity") : 1, n = e.every(function (e) {
            return e.get("opacity") === t
        });
        n && (this.opacity = t)
    }, _calcBounds: function () {
        var e = [], t = [], n, s, o, u, a, f, l, c = 0, h = this._objects.length;
        for (; c < h; ++c) {
            a = this._objects[c], a.setCoords();
            for (var p in a.oCoords)e.push(a.oCoords[p].x), t.push(a.oCoords[p].y)
        }
        n = r(e), o = i(e), s = r(t), u = i(t), f = o - n || 0, l = u - s || 0, this.width = f, this.height = l, this.left = n + f / 2 || 0, this.top = s + l / 2 || 0
    }, toSVG: function () {
        var e = [];
        for (var t = this._objects.length; t--;)e.push(this._objects[t].toSVG());
        return'<g transform="' + this.getSvgTransform() + '">' + e.join("") + "</g>"
    }, get: function (e) {
        if (e in o) {
            if (this[e])return this[e];
            for (var t = 0, n = this._objects.length; t < n; t++)if (this._objects[t][e])return!0;
            return!1
        }
        return e in this.delegatedProperties ? this._objects[0] && this._objects[0].get(e) : this[e]
    }}), t.Group.fromObject = function (e, n) {
        t.util.enlivenObjects(e.objects, function (r) {
            delete e.objects, n && n(new t.Group(r, e))
        })
    }, t.Group.async = !0
})(typeof exports != "undefined" ? exports : this);
(function (e) {
    "use strict";
    var t = fabric.util.object.extend;
    e.fabric || (e.fabric = {});
    if (e.fabric.Image) {
        fabric.warn("fabric.Image is already defined.");
        return
    }
    fabric.Image = fabric.util.createClass(fabric.Object, {type: "image", initialize: function (e, t) {
        t || (t = {}), this.callSuper("initialize", t), this._initElement(e), this._originalImage = this.getElement(), this._initConfig(t), this.filters = [], t.filters && (this.filters = t.filters, this.applyFilters())
    }, getElement: function () {
        return this._element
    }, setElement: function (e) {
        return this._element = e, this._initConfig(), this
    }, getOriginalSize: function () {
        var e = this.getElement();
        return{width: e.width, height: e.height}
    }, render: function (e, t) {
        if (!this.visible)return;
        e.save();
        var n = this.transformMatrix, r = this.group && this.group.type !== "group";
        r && e.translate(-this.group.width / 2 + this.width / 2, -this.group.height / 2 + this.height / 2), n && e.transform(n[0], n[1], n[2], n[3], n[4], n[5]), t || this.transform(e), e.save(), this._setShadow(e), this.clipTo && fabric.util.clipContext(this, e), this._render(e), this.shadow && !this.shadow.affectStroke && this._removeShadow(e), this._renderStroke(e), this.clipTo && e.restore(), e.restore(), this.active && !t && (this.drawBorders(e), this.drawControls(e)), e.restore()
    }, _stroke: function (e) {
        e.save(), e.lineWidth = this.strokeWidth, e.lineCap = this.strokeLineCap, e.lineJoin = this.strokeLineJoin, e.miterLimit = this.strokeMiterLimit, e.strokeStyle = this.stroke.toLive ? this.stroke.toLive(e) : this.stroke, e.beginPath(), e.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height), e.closePath(), e.restore()
    }, _renderDashedStroke: function (e) {
        var t = -this.width / 2, n = -this.height / 2, r = this.width, i = this.height;
        e.save(), e.lineWidth = this.strokeWidth, e.lineCap = this.strokeLineCap, e.lineJoin = this.strokeLineJoin, e.miterLimit = this.strokeMiterLimit, e.strokeStyle = this.stroke.toLive ? this.stroke.toLive(e) : this.stroke, e.beginPath(), fabric.util.drawDashedLine(e, t, n, t + r, n, this.strokeDashArray), fabric.util.drawDashedLine(e, t + r, n, t + r, n + i, this.strokeDashArray), fabric.util.drawDashedLine(e, t + r, n + i, t, n + i, this.strokeDashArray), fabric.util.drawDashedLine(e, t, n + i, t, n, this.strokeDashArray), e.closePath(), e.restore()
    }, toObject: function (e) {
        return t(this.callSuper("toObject", e), {src: this._originalImage.src || this._originalImage._src, filters: this.filters.concat()})
    }, toSVG: function () {
        var e = [];
        e.push('<g transform="', this.getSvgTransform(), '">', '<image xlink:href="', this.getSvgSrc(), '" style="', this.getSvgStyles(), '" transform="translate(' + -this.width / 2 + " " + -this.height / 2 + ")", '" width="', this.width, '" height="', this.height, '"></image>');
        if (this.stroke || this.strokeDashArray) {
            var t = this.fill;
            this.fill = null, e.push("<rect ", 'x="', -1 * this.width / 2, '" y="', -1 * this.height / 2, '" width="', this.width, '" height="', this.height, '" style="', this.getSvgStyles(), '"/>'), this.fill = t
        }
        return e.push("</g>"), e.join("")
    }, getSrc: function () {
        return this.getElement().src || this.getElement()._src
    }, toString: function () {
        return'#<fabric.Image: { src: "' + this.getSrc() + '" }>'
    }, clone: function (e, t) {
        this.constructor.fromObject(this.toObject(t), e)
    }, applyFilters: function (e) {
        if (this.filters.length === 0) {
            this.setElement(this._originalImage), e && e();
            return
        }
        var t = this._originalImage, n = fabric.util.createCanvasElement(), r = fabric.util.createImage(), i = this;
        n.width = t.width, n.height = t.height, n.getContext("2d").drawImage(t, 0, 0, t.width, t.height), this.filters.forEach(function (e) {
            e && e.applyTo(n)
        }), r.width = t.width, r.height = t.height;
        if (fabric.isLikelyNode) {
            var s = n.toDataURL("image/png").substring(22);
            r.src = new Buffer(s, "base64"), i._element = r, e && e()
        } else r.onload = function () {
            i._element = r, e && e(), r.onload = n = t = null
        }, r.src = n.toDataURL("image/png");
        return this
    }, _render: function (e) {
        e.drawImage(this._element, -this.width / 2, -this.height / 2, this.width, this.height)
    }, _resetWidthHeight: function () {
        var e = this.getElement();
        this.set("width", e.width), this.set("height", e.height)
    }, _initElement: function (e) {
        this.setElement(fabric.util.getById(e)), fabric.util.addClass(this.getElement(), fabric.Image.CSS_CANVAS)
    }, _initConfig: function (e) {
        e || (e = {}), this.setOptions(e), this._setWidthHeight(e)
    }, _initFilters: function (e) {
        e.filters && e.filters.length && (this.filters = e.filters.map(function (e) {
            return e && fabric.Image.filters[e.type].fromObject(e)
        }))
    }, _setWidthHeight: function (e) {
        this.width = "width"in e ? e.width : this.getElement().width || 0, this.height = "height"in e ? e.height : this.getElement().height || 0
    }, complexity: function () {
        return 1
    }}), fabric.Image.CSS_CANVAS = "canvas-img", fabric.Image.prototype.getSvgSrc = fabric.Image.prototype.getSrc, fabric.Image.fromObject = function (e, t) {
        var n = fabric.document.createElement("img"), r = e.src;
        e.width && (n.width = e.width), e.height && (n.height = e.height), n.onload = function () {
            fabric.Image.prototype._initFilters.call(e, e);
            var r = new fabric.Image(n, e);
            t && t(r), n = n.onload = n.onerror = null
        }, n.onerror = function () {
            fabric.log("Error loading " + n.src), t && t(null, !0), n = n.onload = n.onerror = null
        }, n.src = r
    }, fabric.Image.fromURL = function (e, t, n) {
        fabric.util.loadImage(e, function (e) {
            t(new fabric.Image(e, n))
        })
    }, fabric.Image.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat("x y width height xlink:href".split(" ")), fabric.Image.fromElement = function (e, n, r) {
        var i = fabric.parseAttributes(e, fabric.Image.ATTRIBUTE_NAMES);
        fabric.Image.fromURL(i["xlink:href"], n, t(r ? fabric.util.object.clone(r) : {}, i))
    }, fabric.Image.async = !0
})(typeof exports != "undefined" ? exports : this);
fabric.Image.filters = fabric.Image.filters || {}, fabric.Image.filters.Brightness = fabric.util.createClass({type: "Brightness", initialize: function (e) {
    e = e || {}, this.brightness = e.brightness || 100
}, applyTo: function (e) {
    var t = e.getContext("2d"), n = t.getImageData(0, 0, e.width, e.height), r = n.data, i = this.brightness;
    for (var s = 0, o = r.length; s < o; s += 4)r[s] += i, r[s + 1] += i, r[s + 2] += i;
    t.putImageData(n, 0, 0)
}, toJSON: function () {
    return{type: this.type, brightness: this.brightness}
}}), fabric.Image.filters.Brightness.fromObject = function (e) {
    return new fabric.Image.filters.Brightness(e)
};
fabric.Image.filters = fabric.Image.filters || {}, fabric.Image.filters.Convolute = fabric.util.createClass({type: "Convolute", initialize: function (e) {
    e = e || {}, this.opaque = e.opaque, this.matrix = e.matrix || [0, 0, 0, 0, 1, 0, 0, 0, 0];
    var t = fabric.util.createCanvasElement();
    this.tmpCtx = t.getContext("2d")
}, _createImageData: function (e, t) {
    return this.tmpCtx.createImageData(e, t)
}, applyTo: function (e) {
    var t = this.matrix, n = e.getContext("2d"), r = n.getImageData(0, 0, e.width, e.height), i = Math.round(Math.sqrt(t.length)), s = Math.floor(i / 2), o = r.data, u = r.width, a = r.height, f = u, l = a, c = this._createImageData(f, l), h = c.data, p = this.opaque ? 1 : 0;
    for (var d = 0; d < l; d++)for (var v = 0; v < f; v++) {
        var m = d, g = v, y = (d * f + v) * 4, b = 0, w = 0, E = 0, S = 0;
        for (var x = 0; x < i; x++)for (var T = 0; T < i; T++) {
            var N = m + x - s, C = g + T - s;
            if (N >= 0 && N < a && C >= 0 && C < u) {
                var k = (N * u + C) * 4, L = t[x * i + T];
                b += o[k] * L, w += o[k + 1] * L, E += o[k + 2] * L, S += o[k + 3] * L
            }
        }
        h[y] = b, h[y + 1] = w, h[y + 2] = E, h[y + 3] = S + p * (255 - S)
    }
    n.putImageData(c, 0, 0)
}, toJSON: function () {
    return{type: this.type, opaque: this.opaque, matrix: this.matrix}
}}), fabric.Image.filters.Convolute.fromObject = function (e) {
    return new fabric.Image.filters.Convolute(e)
};
fabric.Image.filters = fabric.Image.filters || {}, fabric.Image.filters.GradientTransparency = fabric.util.createClass({type: "GradientTransparency", initialize: function (e) {
    e = e || {}, this.threshold = e.threshold || 100
}, applyTo: function (e) {
    var t = e.getContext("2d"), n = t.getImageData(0, 0, e.width, e.height), r = n.data, i = this.threshold, s = r.length;
    for (var o = 0, u = r.length; o < u; o += 4)r[o + 3] = i + 255 * (s - o) / s;
    t.putImageData(n, 0, 0)
}, toJSON: function () {
    return{type: this.type, threshold: this.threshold}
}}), fabric.Image.filters.GradientTransparency.fromObject = function (e) {
    return new fabric.Image.filters.GradientTransparency(e)
};
fabric.Image.filters = fabric.Image.filters || {}, fabric.Image.filters.Grayscale = fabric.util.createClass({type: "Grayscale", applyTo: function (e) {
    var t = e.getContext("2d"), n = t.getImageData(0, 0, e.width, e.height), r = n.data, i = n.width * n.height * 4, s = 0, o;
    while (s < i)o = (r[s] + r[s + 1] + r[s + 2]) / 3, r[s] = o, r[s + 1] = o, r[s + 2] = o, s += 4;
    t.putImageData(n, 0, 0)
}, toJSON: function () {
    return{type: this.type}
}}), fabric.Image.filters.Grayscale.fromObject = function () {
    return new fabric.Image.filters.Grayscale
};
fabric.Image.filters = fabric.Image.filters || {}, fabric.Image.filters.Invert = fabric.util.createClass({type: "Invert", applyTo: function (e) {
    var t = e.getContext("2d"), n = t.getImageData(0, 0, e.width, e.height), r = n.data, i = r.length, s;
    for (s = 0; s < i; s += 4)r[s] = 255 - r[s], r[s + 1] = 255 - r[s + 1], r[s + 2] = 255 - r[s + 2];
    t.putImageData(n, 0, 0)
}, toJSON: function () {
    return{type: this.type}
}}), fabric.Image.filters.Invert.fromObject = function () {
    return new fabric.Image.filters.Invert
};
fabric.Image.filters = fabric.Image.filters || {}, fabric.Image.filters.Noise = fabric.util.createClass({type: "Noise", initialize: function (e) {
    e = e || {}, this.noise = e.noise || 100
}, applyTo: function (e) {
    var t = e.getContext("2d"), n = t.getImageData(0, 0, e.width, e.height), r = n.data, i = this.noise, s;
    for (var o = 0, u = r.length; o < u; o += 4)s = (.5 - Math.random()) * i, r[o] += s, r[o + 1] += s, r[o + 2] += s;
    t.putImageData(n, 0, 0)
}, toJSON: function () {
    return{type: this.type, noise: this.noise}
}}), fabric.Image.filters.Noise.fromObject = function (e) {
    return new fabric.Image.filters.Noise(e)
};
fabric.Image.filters = fabric.Image.filters || {}, fabric.Image.filters.Pixelate = fabric.util.createClass({type: "Pixelate", initialize: function (e) {
    e = e || {}, this.blocksize = e.blocksize || 4
}, applyTo: function (e) {
    var t = e.getContext("2d"), n = t.getImageData(0, 0, e.width, e.height), r = n.data, i = n.height, s = n.width, o, u, a, f, l, c, h;
    for (u = 0; u < i; u += this.blocksize)for (a = 0; a < s; a += this.blocksize) {
        o = u * 4 * s + a * 4, f = r[o], l = r[o + 1], c = r[o + 2], h = r[o + 3];
        for (var p = u, d = u + this.blocksize; p < d; p++)for (var v = a, m = a + this.blocksize; v < m; v++)o = p * 4 * s + v * 4, r[o] = f, r[o + 1] = l, r[o + 2] = c, r[o + 3] = h
    }
    t.putImageData(n, 0, 0)
}, toJSON: function () {
    return{type: this.type, blocksize: this.blocksize}
}}), fabric.Image.filters.Pixelate.fromObject = function (e) {
    return new fabric.Image.filters.Pixelate(e)
};
fabric.Image.filters = fabric.Image.filters || {}, fabric.Image.filters.RemoveWhite = fabric.util.createClass({type: "RemoveWhite", initialize: function (e) {
    e = e || {}, this.threshold = e.threshold || 30, this.distance = e.distance || 20
}, applyTo: function (e) {
    var t = e.getContext("2d"), n = t.getImageData(0, 0, e.width, e.height), r = n.data, i = this.threshold, s = this.distance, o = 255 - i, u = Math.abs, a, f, l;
    for (var c = 0, h = r.length; c < h; c += 4)a = r[c], f = r[c + 1], l = r[c + 2], a > o && f > o && l > o && u(a - f) < s && u(a - l) < s && u(f - l) < s && (r[c + 3] = 1);
    t.putImageData(n, 0, 0)
}, toJSON: function () {
    return{type: this.type, threshold: this.threshold, distance: this.distance}
}}), fabric.Image.filters.RemoveWhite.fromObject = function (e) {
    return new fabric.Image.filters.RemoveWhite(e)
};
fabric.Image.filters = fabric.Image.filters || {}, fabric.Image.filters.Sepia = fabric.util.createClass({type: "Sepia", applyTo: function (e) {
    var t = e.getContext("2d"), n = t.getImageData(0, 0, e.width, e.height), r = n.data, i = r.length, s, o;
    for (s = 0; s < i; s += 4)o = .3 * r[s] + .59 * r[s + 1] + .11 * r[s + 2], r[s] = o + 100, r[s + 1] = o + 50, r[s + 2] = o + 255;
    t.putImageData(n, 0, 0)
}, toJSON: function () {
    return{type: this.type}
}}), fabric.Image.filters.Sepia.fromObject = function () {
    return new fabric.Image.filters.Sepia
};
fabric.Image.filters = fabric.Image.filters || {}, fabric.Image.filters.Sepia2 = fabric.util.createClass({type: "Sepia2", applyTo: function (e) {
    var t = e.getContext("2d"), n = t.getImageData(0, 0, e.width, e.height), r = n.data, i = r.length, s, o, u, a;
    for (s = 0; s < i; s += 4)o = r[s], u = r[s + 1], a = r[s + 2], r[s] = (o * .393 + u * .769 + a * .189) / 1.351, r[s + 1] = (o * .349 + u * .686 + a * .168) / 1.203, r[s + 2] = (o * .272 + u * .534 + a * .131) / 2.14;
    t.putImageData(n, 0, 0)
}, toJSON: function () {
    return{type: this.type}
}}), fabric.Image.filters.Sepia2.fromObject = function () {
    return new fabric.Image.filters.Sepia2
};
fabric.Image.filters = fabric.Image.filters || {}, fabric.Image.filters.Tint = fabric.util.createClass({type: "Tint", initialize: function (e) {
    e = e || {}, this.color = e.color || 0
}, applyTo: function (e) {
    var t = e.getContext("2d"), n = t.getImageData(0, 0, e.width, e.height), r = n.data, i = r.length, s, o, u = parseInt(this.color, 10).toString(16), a = parseInt("0x" + u.substr(0, 2), 16), f = parseInt("0x" + u.substr(2, 2), 16), l = parseInt("0x" + u.substr(4, 2), 16);
    for (s = 0; s < i; s += 4)o = r[s + 3], o > 0 && (r[s] = a, r[s + 1] = f, r[s + 2] = l);
    t.putImageData(n, 0, 0)
}, toJSON: function () {
    return{type: this.type, color: this.color}
}}), fabric.Image.filters.Tint.fromObject = function (e) {
    return new fabric.Image.filters.Tint(e)
};
(function (e) {
    "use strict";
    var t = e.fabric || (e.fabric = {}), n = t.util.object.extend, r = t.util.object.clone, i = t.util.toFixed, s = t.StaticCanvas.supports("setLineDash");
    if (t.Text) {
        t.warn("fabric.Text is already defined");
        return
    }
    var o = t.Object.prototype.stateProperties.concat();
    o.push("fontFamily", "fontWeight", "fontSize", "path", "text", "textDecoration", "textShadow", "textAlign", "fontStyle", "lineHeight", "backgroundColor", "textBackgroundColor", "useNative"), t.Text = t.util.createClass(t.Object, {_dimensionAffectingProps: {fontSize: !0, fontWeight: !0, fontFamily: !0, textDecoration: !0, fontStyle: !0, lineHeight: !0, stroke: !0, strokeWidth: !0, text: !0}, type: "text", fontSize: 40, fontWeight: "normal", fontFamily: "Times New Roman", textDecoration: "", textShadow: "", textAlign: "left", fontStyle: "", lineHeight: 1.3, backgroundColor: "", textBackgroundColor: "", path: null, useNative: !0, stateProperties: o, initialize: function (e, t) {
        t = t || {}, this.text = e, this.__skipDimension = !0, this.setOptions(t), this.__skipDimension = !1, this._initDimensions(), this.setCoords()
    }, _initDimensions: function () {
        if (this.__skipDimension)return;
        var e = t.util.createCanvasElement();
        this._render(e.getContext("2d"))
    }, toString: function () {
        return"#<fabric.Text (" + this.complexity() + '): { "text": "' + this.text + '", "fontFamily": "' + this.fontFamily + '" }>'
    }, _render: function (e) {
        var t = this.group && this.group.type !== "group";
        t && !this.transformMatrix ? e.translate(-this.group.width / 2 + this.left, -this.group.height / 2 + this.top) : t && this.transformMatrix && e.translate(-this.group.width / 2, -this.group.height / 2), typeof Cufon == "undefined" || this.useNative === !0 ? this._renderViaNative(e) : this._renderViaCufon(e)
    }, _renderViaNative: function (e) {
        this.transform(e, t.isLikelyNode), this._setTextStyles(e);
        var n = this.text.split(/\r?\n/);
        this.width = this._getTextWidth(e, n), this.height = this._getTextHeight(e, n), this.clipTo && t.util.clipContext(this, e), this._renderTextBackground(e, n), this.textAlign !== "left" && this.textAlign !== "justify" && (e.save(), e.translate(this.textAlign === "center" ? this.width / 2 : this.width, 0)), e.save(), this._setTextShadow(e), this._renderTextFill(e, n), this._renderTextStroke(e, n), this.textShadow && e.restore(), e.restore(), this.textAlign !== "left" && this.textAlign !== "justify" && e.restore(), this._renderTextDecoration(e, n), this.clipTo && e.restore(), this._setBoundaries(e, n), this._totalLineHeight = 0, this.setCoords()
    }, _setBoundaries: function (e, t) {
        this._boundaries = [];
        for (var n = 0, r = t.length; n < r; n++) {
            var i = this._getLineWidth(e, t[n]), s = this._getLineLeftOffset(i);
            this._boundaries.push({height: this.fontSize * this.lineHeight, width: i, left: s})
        }
    }, _setTextStyles: function (e) {
        this.fill && (e.fillStyle = this.fill.toLive ? this.fill.toLive(e) : this.fill), this.stroke && (e.lineWidth = this.strokeWidth, e.lineCap = this.strokeLineCap, e.lineJoin = this.strokeLineJoin, e.miterLimit = this.strokeMiterLimit, e.strokeStyle = this.stroke.toLive ? this.stroke.toLive(e) : this.stroke), e.textBaseline = "alphabetic", e.textAlign = this.textAlign, e.font = this._getFontDeclaration()
    }, _getTextHeight: function (e, t) {
        return this.fontSize * t.length * this.lineHeight
    }, _getTextWidth: function (e, t) {
        var n = e.measureText(t[0]).width;
        for (var r = 1, i = t.length; r < i; r++) {
            var s = e.measureText(t[r]).width;
            s > n && (n = s)
        }
        return n
    }, _setTextShadow: function (e) {
        if (!this.textShadow)return;
        var t = /\s+(-?\d+)(?:px)?\s+(-?\d+)(?:px)?\s+(\d+)(?:px)?\s*/, n = this.textShadow, r = t.exec(this.textShadow), i = n.replace(t, "");
        e.save(), e.shadowColor = i, e.shadowOffsetX = parseInt(r[1], 10), e.shadowOffsetY = parseInt(r[2], 10), e.shadowBlur = parseInt(r[3], 10), this._shadows = [
            {blur: e.shadowBlur, color: e.shadowColor, offX: e.shadowOffsetX, offY: e.shadowOffsetY}
        ], this._shadowOffsets = [
            [parseInt(e.shadowOffsetX, 10), parseInt(e.shadowOffsetY, 10)]
        ]
    }, _drawTextLine: function (e, t, n, r, i) {
        if (this.textAlign !== "justify") {
            t[e](n, r, i);
            return
        }
        var s = t.measureText(n).width, o = this.width;
        if (o > s) {
            var u = n.split(/\s+/), a = t.measureText(n.replace(/\s+/g, "")).width, f = o - a, l = u.length - 1, c = f / l, h = 0;
            for (var p = 0, d = u.length; p < d; p++)t[e](u[p], r + h, i), h += t.measureText(u[p]).width + c
        } else t[e](n, r, i)
    }, _getLeftOffset: function () {
        return!t.isLikelyNode || this.originX !== "left" && this.originX !== "center" ? -this.width / 2 : 0
    }, _getTopOffset: function () {
        if (t.isLikelyNode)return this.originY === "center" ? -this.height / 2 : this.originY === "bottom" ? -this.height : 0;
        return-this.height / 2
    }, _renderTextFill: function (e, t) {
        if (!this.fill)return;
        this._boundaries = [];
        for (var n = 0, r = t.length; n < r; n++)this._drawTextLine("fillText", e, t[n], this._getLeftOffset(), this._getTopOffset() + n * this.fontSize * this.lineHeight + this.fontSize)
    }, _renderTextStroke: function (e, t) {
        if (!this.stroke)return;
        e.save(), this.strokeDashArray && (1 & this.strokeDashArray.length && this.strokeDashArray.push.apply(this.strokeDashArray, this.strokeDashArray), s && e.setLineDash(this.strokeDashArray)), e.beginPath();
        for (var n = 0, r = t.length; n < r; n++)this._drawTextLine("strokeText", e, t[n], this._getLeftOffset(), this._getTopOffset() + n * this.fontSize * this.lineHeight + this.fontSize);
        e.closePath(), e.restore()
    }, _renderTextBackground: function (e, t) {
        this._renderTextBoxBackground(e), this._renderTextLinesBackground(e, t)
    }, _renderTextBoxBackground: function (e) {
        if (!this.backgroundColor)return;
        e.save(), e.fillStyle = this.backgroundColor, e.fillRect(this._getLeftOffset(), this._getTopOffset(), this.width, this.height), e.restore()
    }, _renderTextLinesBackground: function (e, t) {
        if (!this.textBackgroundColor)return;
        e.save(), e.fillStyle = this.textBackgroundColor;
        for (var n = 0, r = t.length; n < r; n++)if (t[n] !== "") {
            var i = this._getLineWidth(e, t[n]), s = this._getLineLeftOffset(i);
            e.fillRect(this._getLeftOffset() + s, this._getTopOffset() + n * this.fontSize * this.lineHeight, i, this.fontSize * this.lineHeight)
        }
        e.restore()
    }, _getLineLeftOffset: function (e) {
        return this.textAlign === "center" ? (this.width - e) / 2 : this.textAlign === "right" ? this.width - e : 0
    }, _getLineWidth: function (e, t) {
        return this.textAlign === "justify" ? this.width : e.measureText(t).width
    }, _renderTextDecoration: function (e, t) {
        function i(i) {
            for (var s = 0, o = t.length; s < o; s++) {
                var u = r._getLineWidth(e, t[s]), a = r._getLineLeftOffset(u);
                e.fillRect(r._getLeftOffset() + a, i + s * r.fontSize * r.lineHeight - n, u, 1)
            }
        }

        if (!this.textDecoration)return;
        var n = this.originY === "top" ? 0 : this._getTextHeight(e, t) / 2, r = this;
        this.textDecoration.indexOf("underline") > -1 && i(this.fontSize), this.textDecoration.indexOf("line-through") > -1 && i(this.fontSize / 2), this.textDecoration.indexOf("overline") > -1 && i(0)
    }, _getFontDeclaration: function () {
        return[t.isLikelyNode ? this.fontWeight : this.fontStyle, t.isLikelyNode ? this.fontStyle : this.fontWeight, this.fontSize + "px", t.isLikelyNode ? '"' + this.fontFamily + '"' : this.fontFamily].join(" ")
    }, render: function (e, t) {
        if (!this.visible)return;
        e.save(), this._render(e), !t && this.active && (this.drawBorders(e), this.drawControls(e)), e.restore()
    }, toObject: function (e) {
        return n(this.callSuper("toObject", e), {text: this.text, fontSize: this.fontSize, fontWeight: this.fontWeight, fontFamily: this.fontFamily, fontStyle: this.fontStyle, lineHeight: this.lineHeight, textDecoration: this.textDecoration, textShadow: this.textShadow, textAlign: this.textAlign, path: this.path, backgroundColor: this.backgroundColor, textBackgroundColor: this.textBackgroundColor, useNative: this.useNative})
    }, toSVG: function () {
        var e = this.text.split(/\r?\n/), t = this.useNative ? this.fontSize * this.lineHeight : -this._fontAscent - this._fontAscent / 5 * this.lineHeight, n = -(this.width / 2), r = this.useNative ? this.fontSize - 1 : this.height / 2 - e.length * this.fontSize - this._totalLineHeight, s = this._getSVGTextAndBg(t, n, e), o = this._getSVGShadows(t, e);
        return r += this._fontAscent ? this._fontAscent / 5 * this.lineHeight : 0, ['<g transform="', this.getSvgTransform(), '">', s.textBgRects.join(""), "<text ", this.fontFamily ? "font-family=\"'" + this.fontFamily + "'\" " : "", this.fontSize ? 'font-size="' + this.fontSize + '" ' : "", this.fontStyle ? 'font-style="' + this.fontStyle + '" ' : "", this.fontWeight ? 'font-weight="' + this.fontWeight + '" ' : "", this.textDecoration ? 'text-decoration="' + this.textDecoration + '" ' : "", 'style="', this.getSvgStyles(), '" ', 'transform="translate(', i(n, 2), " ", i(r, 2), ')">', o.join(""), s.textSpans.join(""), "</text>", "</g>"].join("")
    }, _getSVGShadows: function (e, n) {
        var r = [], s, o, u, a, f = 1;
        if (!this._shadows || !this._boundaries)return r;
        for (s = 0, u = this._shadows.length; s < u; s++)for (o = 0, a = n.length; o < a; o++)if (n[o] !== "") {
            var l = this._boundaries && this._boundaries[o] ? this._boundaries[o].left : 0;
            r.push('<tspan x="', i(l + f + this._shadowOffsets[s][0], 2), o === 0 || this.useNative ? '" y' : '" dy', '="', i(this.useNative ? e * o - this.height / 2 + this._shadowOffsets[s][1] : e + (o === 0 ? this._shadowOffsets[s][1] : 0), 2), '" ', this._getFillAttributes(this._shadows[s].color), ">", t.util.string.escapeXml(n[o]), "</tspan>"), f = 1
        } else f++;
        return r
    }, _getSVGTextAndBg: function (e, n, r) {
        var s = [], o = [], u, a, f, l = 1;
        this.backgroundColor && this._boundaries && o.push("<rect ", this._getFillAttributes(this.backgroundColor), ' x="', i(-this.width / 2, 2), '" y="', i(-this.height / 2, 2), '" width="', i(this.width, 2), '" height="', i(this.height, 2), '"></rect>');
        for (u = 0, f = r.length; u < f; u++) {
            r[u] !== "" ? (a = this._boundaries && this._boundaries[u] ? i(this._boundaries[u].left, 2) : 0, s.push('<tspan x="', a, '" ', u === 0 || this.useNative ? "y" : "dy", '="', i(this.useNative ? e * u - this.height / 2 : e * l, 2), '" ', this._getFillAttributes(this.fill), ">", t.util.string.escapeXml(r[u]), "</tspan>"), l = 1) : l++;
            if (!this.textBackgroundColor || !this._boundaries)continue;
            o.push("<rect ", this._getFillAttributes(this.textBackgroundColor), ' x="', i(n + this._boundaries[u].left, 2), '" y="', i(e * u - this.height / 2, 2), '" width="', i(this._boundaries[u].width, 2), '" height="', i(this._boundaries[u].height, 2), '"></rect>')
        }
        return{textSpans: s, textBgRects: o}
    }, _getFillAttributes: function (e) {
        var n = e && typeof e == "string" ? new t.Color(e) : "";
        return!n || !n.getSource() || n.getAlpha() === 1 ? 'fill="' + e + '"' : 'opacity="' + n.getAlpha() + '" fill="' + n.setAlpha(1).toRgb() + '"'
    }, setColor: function (e) {
        return this.set("fill", e), this
    }, getText: function () {
        return this.text
    }, _set: function (e, t) {
        e === "fontFamily" && this.path && (this.path = this.path.replace(/(.*?)([^\/]*)(\.font\.js)/, "$1" + t + "$3")), this.callSuper("_set", e, t), e in this._dimensionAffectingProps && (this._initDimensions(), this.setCoords())
    }, complexity: function () {
        return 1
    }}), t.Text.ATTRIBUTE_NAMES = t.SHARED_ATTRIBUTES.concat("x y font-family font-style font-weight font-size text-decoration".split(" ")), t.Text.fromElement = function (e, n) {
        if (!e)return null;
        var r = t.parseAttributes(e, t.Text.ATTRIBUTE_NAMES);
        n = t.util.object.extend(n ? t.util.object.clone(n) : {}, r);
        var i = new t.Text(e.textContent, n);
        return i.set({left: i.getLeft() + i.getWidth() / 2, top: i.getTop() - i.getHeight() / 2}), i
    }, t.Text.fromObject = function (e) {
        return new t.Text(e.text, r(e))
    }, t.util.createAccessors(t.Text)
})(typeof exports != "undefined" ? exports : this);
fabric.util.object.extend(fabric.Text.prototype, {_renderViaCufon: function (e) {
    var t = Cufon.textOptions || (Cufon.textOptions = {});
    t.left = this.left, t.top = this.top, t.context = e, t.color = this.fill;
    var n = this._initDummyElementForCufon();
    this.transform(e), Cufon.replaceElement(n, {engine: "canvas", separate: "none", fontFamily: this.fontFamily, fontWeight: this.fontWeight, textDecoration: this.textDecoration, textShadow: this.textShadow, textAlign: this.textAlign, fontStyle: this.fontStyle, lineHeight: this.lineHeight, stroke: this.stroke, strokeWidth: this.strokeWidth, backgroundColor: this.backgroundColor, textBackgroundColor: this.textBackgroundColor}), this.width = t.width, this.height = t.height, this._totalLineHeight = t.totalLineHeight, this._fontAscent = t.fontAscent, this._boundaries = t.boundaries, this._shadowOffsets = t.shadowOffsets, this._shadows = t.shadows || [], n = null, this.setCoords()
}, _initDummyElementForCufon: function () {
    var e = fabric.document.createElement("pre"), t = fabric.document.createElement("div");
    return t.appendChild(e), typeof G_vmlCanvasManager == "undefined" ? e.innerHTML = this.text : e.innerText = this.text.replace(/\r?\n/gi, "\r"), e.style.fontSize = this.fontSize + "px", e.style.letterSpacing = "normal", e
}});