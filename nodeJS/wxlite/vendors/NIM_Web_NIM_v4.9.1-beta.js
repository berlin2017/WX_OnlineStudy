!
  function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.NIM = t() : e.NIM = t()
  }(this,
    function () {
      return function (e) {
        function t(r) {
          if (n[r]) return n[r].exports;
          var s = n[r] = {
            exports: {},
            id: r,
            loaded: !1
          };
          return e[r].call(s.exports, s, s.exports, t),
            s.loaded = !0,
            s.exports
        }
        var n = {};
        return t.m = e,
          t.c = n,
          t.p = "",
          t(0)
      }([function (e, t, n) {
        "use strict";
        n(99),
          e.exports = n(181)
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          return e && e.__esModule ? e : {
            "default": e
          }
        }
        function s(e) {
          "object" === ("undefined" == typeof e ? "undefined" : (0, i["default"])(e)) ? (this.callFunc = e.callFunc || null, this.message = e.message || "UNKNOW ERROR") : this.message = e,
            this.time = new Date,
            this.timetag = +this.time
        }
        var o = n(6),
          i = r(o),
          a = n(27),
          c = n(34),
          u = n(86),
          l = n(59);
        n(122);
        var d = n(8),
          m = d.getGlobal(),
          f = /\s+/;
        d.shouldDisplayInstallFlashHint = function () {
          var e = a.name.toLowerCase();
          if ("ie" === e) {
            var t = +a.version || 0;
            return t = Math.floor(t),
              7 === t && !c.Transport.flashsocket.check()
          }
          return !1
        },
          d.deduplicate = function (e) {
            var t = [];
            return e.forEach(function (e) {
              t.indexOf(e) === -1 && t.push(e)
            }),
              t
          },
          d.capFirstLetter = function (e) {
            return e ? (e = "" + e, e.slice(0, 1).toUpperCase() + e.slice(1)) : ""
          },
          d.guid = function () {
            var e = function () {
              return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
            };
            return function () {
              return e() + e() + e() + e() + e() + e() + e() + e()
            }
          }(),
          d.extend = function (e, t, n) {
            for (var r in t) "undefined" != typeof e[r] && n !== !0 || (e[r] = t[r])
          },
          d.filterObj = function (e, t) {
            var n = {};
            return d.isString(t) && (t = t.split(f)),
              t.forEach(function (t) {
                e.hasOwnProperty(t) && (n[t] = e[t])
              }),
              n
          },
          d.simpleClone = function (e) {
            return JSON.parse(JSON.stringify(e))
          },
          d.copy = function (e, t) {
            return t = t || {},
              e ? (Object.keys(e).forEach(function (n) {
                d.exist(e[n]) && (t[n] = e[n])
              }), t) : t
          },
          d.copyWithNull = function (e, t) {
            return t = t || {},
              e ? (Object.keys(e).forEach(function (n) {
              (d.exist(e[n]) || d.isnull(e[n])) && (t[n] = e[n])
              }), t) : t
          },
          d.findObjIndexInArray = function (e, t) {
            e = e || [];
            var n = t.keyPath || "id",
              r = -1;
            return e.some(function (e, s) {
              if (l(e, n) === t.value) return r = s,
                !0
            }),
              r
          },
          d.findObjInArray = function (e, t) {
            var n = d.findObjIndexInArray(e, t);
            return n === -1 ? null : e[n]
          },
          d.mergeObjArray = function () {
            var e = [],
              t = [].slice.call(arguments, 0, -1),
              n = arguments[arguments.length - 1];
            d.isArray(n) && (t.push(n), n = {});
            var r = n.keyPath = n.keyPath || "id";
            for (n.sortPath = n.sortPath || r; !e.length && t.length;) e = t.shift() || [],
              e = e.slice(0);
            var s;
            return t.forEach(function (t) {
              t && t.forEach(function (t) {
                s = d.findObjIndexInArray(e, {
                  keyPath: r,
                  value: l(t, r)
                }),
                  s !== -1 ? e[s] = d.merge({},
                    e[s], t) : e.push(t)
              })
            }),
              n.notSort || (e = d.sortObjArray(e, n)),
              e
          },
          d.cutObjArray = function (e) {
            var t = e.slice(0),
              n = arguments.length,
              r = [].slice.call(arguments, 1, n - 1),
              s = arguments[n - 1];
            d.isObject(s) || (r.push(s), s = {});
            var o, i = s.keyPath = s.keyPath || "id";
            return r.forEach(function (e) {
              d.isArray(e) || (e = [e]),
                e.forEach(function (e) {
                  e && (s.value = l(e, i), o = d.findObjIndexInArray(t, s), o !== -1 && t.splice(o, 1))
                })
            }),
              t
          },
          d.sortObjArray = function (e, t) {
            t = t || {};
            var n = t.sortPath || "id";
            u.insensitive = !!t.insensitive;
            var r, s, o, i = !!t.desc;
            return o = d.isFunction(t.compare) ? t.compare : function (e, t) {
              return r = l(e, n),
                s = l(t, n),
                i ? u(s, r) : u(r, s)
            },
              e.sort(o)
          },
          d.emptyFunc = function () { },
          d.isEmptyFunc = function (e) {
            return e === d.emptyFunc
          },
          d.notEmptyFunc = function (e) {
            return e !== d.emptyFunc
          },
          d.splice = function (e, t, n) {
            return [].splice.call(e, t, n)
          },
          d.reshape2d = function (e, t) {
            if (Array.isArray(e)) {
              d.verifyParamType("type", t, "number", "util::reshape2d");
              var n = e.length;
              if (n <= t) return [e];
              for (var r = Math.ceil(n / t), s = [], o = 0; o < r; o++) s.push(e.slice(o * t, (o + 1) * t));
              return s
            }
            return e
          },
          d.flatten2d = function (e) {
            if (Array.isArray(e)) {
              var t = [];
              return e.forEach(function (e) {
                t = t.concat(e)
              }),
                t
            }
            return e
          },
          d.dropArrayDuplicates = function (e) {
            if (Array.isArray(e)) {
              for (var t = {},
                n = []; e.length > 0;) {
                var r = e.shift();
                t[r] = !0
              }
              for (var s in t) t[s] === !0 && n.push(s);
              return n
            }
            return e
          },
          d.onError = function (e) {
            throw new s(e)
          },
          d.verifyParamPresent = function (e, t, n, r) {
            n = n || "";
            var s = !1;
            switch (d.typeOf(t)) {
              case "undefined":
              case "null":
                s = !0;
                break;
              case "string":
                "" === t && (s = !0);
                break;
              case "object":
                Object.keys(t).length || (s = !0);
                break;
              case "array":
                t.length ? t.some(function (e) {
                  if (d.notexist(e)) return s = !0,
                    !0
                }) : s = !0
            }
            s && d.onParamAbsent(n + e, r)
          },
          d.onParamAbsent = function (e, t) {
            d.onParamError("缺少参数 " + e + ", 请确保参数不是 空字符串、空对象、空数组、null或undefined, 或数组的内容不是 null/undefined", t)
          },
          d.verifyParamAbsent = function (e, t, n, r) {
            n = n || "",
              void 0 !== t && d.onParamPresent(n + e, r)
          },
          d.onParamPresent = function (e, t) {
            d.onParamError("多余的参数 " + e, t)
          },
          d.verifyParamType = function (e, t, n, r) {
            var s = d.typeOf(t).toLowerCase();
            d.isArray(n) || (n = [n]),
              n = n.map(function (e) {
                return e.toLowerCase()
              });
            var o = !0;
            switch (n.indexOf(s) === -1 && (o = !1), s) {
              case "number":
                isNaN(t) && (o = !1)
            }
            o || d.onParamInvalidType(e, n, "", r)
          },
          d.onParamInvalidType = function (e, t, n, r) {
            n = n || "",
              d.isArray(t) ? (t = t.map(function (e) {
                return '"' + e + '"'
              }), t = t.join(", ")) : t = '"' + t + '"',
              d.onParamError('参数"' + n + e + '"类型错误, 合法的类型包括: [' + t + "]", r)
          },
          d.verifyParamValid = function (e, t, n, r) {
            d.isArray(n) || (n = [n]),
              n.indexOf(t) === -1 && d.onParamInvalidValue(e, n, r)
          },
          d.onParamInvalidValue = function (e, t, n) {
            d.isArray(t) || (t = [t]),
              t = t.map(function (e) {
                return '"' + e + '"'
              }),
              d.isArray(t) && (t = t.join(", ")),
              d.onParamError("参数 " + e + "值错误, 合法的值包括: [" + JSON.stringify(t) + "]", n)
          },
          d.verifyParamMin = function (e, t, n, r) {
            t < n && d.onParamError("参数" + e + "的值不能小于" + n, r)
          },
          d.verifyParamMax = function (e, t, n, r) {
            t > n && d.onParamError("参数" + e + "的值不能大于" + n, r)
          },
          d.verifyArrayMax = function (e, t, n, r) {
            t.length > n && d.onParamError("参数" + e + "的长度不能大于" + n, r)
          },
          d.verifyEmail = function () {
            var e = /^\S+@\S+$/;
            return function (t, n, r) {
              e.test(n) || d.onParamError("参数" + t + "邮箱格式错误, 合法格式必须包含@符号, @符号前后至少要各有一个字符", r)
            }
          }(),
          d.verifyTel = function () {
            var e = /^[+\-()\d]+$/;
            return function (t, n, r) {
              e.test(n) || d.onParamError("参数" + t + "电话号码格式错误, 合法字符包括+、-、英文括号和数字", r)
            }
          }(),
          d.verifyBirth = function () {
            var e = /^(\d{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
            return function (t, n, r) {
              e.test(n) || d.onParamError("参数" + t + '生日格式错误, 合法为"yyyy-MM-dd"', r)
            }
          }(),
          d.onParamError = function (e, t) {
            d.onError({
              message: e,
              callFunc: t
            })
          },
          d.verifyOptions = function (e, t, n, r, s) {
            if (e = e || {},
              t && (d.isString(t) && (t = t.split(f)), d.isArray(t))) {
              "boolean" != typeof n && (s = n || null, n = !0, r = "");
              var o = n ? d.verifyParamPresent : d.verifyParamAbsent;
              t.forEach(function (t) {
                o.call(d, t, e[t], r, s)
              })
            }
            return e
          },
          d.verifyParamAtLeastPresentOne = function (e, t, n) {
            if (t && (d.isString(t) && (t = t.split(f)), d.isArray(t))) {
              var r = t.some(function (t) {
                return d.exist(e[t])
              });
              r || d.onParamError("以下参数[" + t.join(", ") + "]至少需要传入一个", n)
            }
          },
          d.verifyParamPresentJustOne = function (e, t, n) {
            if (t && (d.isString(t) && (t = t.split(f)), d.isArray(t))) {
              var r = t.reduce(function (t, n) {
                return d.exist(e[n]) && t++ ,
                  t
              },
                0);
              1 !== r && d.onParamError("以下参数[" + t.join(", ") + "]必须且只能传入一个", n)
            }
          },
          d.verifyBooleanWithDefault = function (e, t, n, r, s) {
            d.undef(n) && (n = !0),
              f.test(t) && (t = t.split(f)),
              d.isArray(t) ? t.forEach(function (t) {
                d.verifyBooleanWithDefault(e, t, n, r, s)
              }) : "undefined" == typeof e[t] ? e[t] = n : d.isBoolean(e[t]) || d.onParamInvalidType(t, "boolean", r, s)
          },
          d.verifyFileInput = function (e, t) {
            return d.verifyParamPresent("fileInput", e, "", t),
              d.isString(e) && (e = document.getElementById(e), e || d.onParamError("找不到要上传的文件对应的input, 请检查fileInput id " + e, t)),
              e.tagName && "input" === e.tagName.toLowerCase() && "file" === e.type.toLowerCase() || d.onParamError("请提供正确的 fileInput, 必须为 file 类型的 input 节点 tagname:" + e.tagName + ", filetype:" + e.type, t),
              e
          },
          d.verifyFileType = function (e, t) {
            d.verifyParamValid("type", e, d.validFileTypes, t)
          },
          d.verifyCallback = function (e, t, n) {
            f.test(t) && (t = t.split(f)),
              d.isArray(t) ? t.forEach(function (t) {
                d.verifyCallback(e, t, n)
              }) : e[t] ? d.isFunction(e[t]) || d.onParamInvalidType(t, "function", "", n) : e[t] = d.emptyFunc
          },
          d.verifyFileUploadCallback = function (e, t) {
            d.verifyCallback(e, "uploadprogress uploaddone uploaderror uploadcancel", t)
          },
          d.validFileTypes = ["image", "audio", "video", "file"],
          d.validFileExts = {
            image: ["bmp", "gif", "jpg", "jpeg", "jng", "png", "webp"],
            audio: ["mp3", "wav", "aac", "wma", "wmv", "amr", "mp2", "flac", "vorbis", "ac3"],
            video: ["mp4", "rm", "rmvb", "wmv", "avi", "mpg", "mpeg"]
          },
          d.filterFiles = function (e, t) {
            t = t.toLowerCase();
            var n, r, s, o = "file" === t,
              i = [];
            return [].forEach.call(e,
              function (e) {
                if (o) i.push(e);
                else if (n = e.name.slice(e.name.lastIndexOf(".") + 1), r = e.type.split("/"), r[0] && r[1]) {
                  s = r[0].toLowerCase();
                  var a = !1;
                  a = s === t || d.validFileExts[t].indexOf(n) !== -1,
                    a && i.push(e)
                }
              }),
              i
          };
        var p = d.supportFormData = d.notundef(m.FormData);
        d.getFileName = function () {
          return function (e) {
            return e = d.verifyFileInput(e),
              p ? e.files[0].name : e.value.slice(e.value.lastIndexOf("\\") + 1)
          }
        }(),
          d.sizeText = function () {
            var e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "BB"];
            return function (t) {
              var n, r = 0;
              do {
                t = Math.floor(100 * t) / 100;
                var s = e[r];
                n = t + s, t /= 1024, r++
              } while (t > 1);
              return n
            }
          }(),
          d.promises2cmds = function (e) {
            return e.map(function (e) {
              return e.cmd
            })
          },
          d.objs2accounts = function (e) {
            return e.map(function (e) {
              return e.account
            })
          },
          d.teams2ids = function (e) {
            return e.map(function (e) {
              return e.teamId
            })
          },
          d.objs2ids = function (e) {
            return e.map(function (e) {
              return e.id
            })
          },
          d.getMaxUpdateTime = function (e) {
            var t = e.map(function (e) {
              return + e.updateTime
            });
            return Math.max.apply(Math, t)
          },
          d.genCheckUniqueFunc = function (e, t) {
            return e = e || "id",
              t = t || 1e3,
              function (t) {
                this.uniqueSet = this.uniqueSet || {};
                var n = this.uniqueSet[e] = this.uniqueSet[e] || new Set,
                  r = t[e];
                return !n.has(r) && (n.add(r), !0)
              }
          },
          d.fillPropertyWithDefault = function (e, t, n) {
            return !!d.undef(e[t]) && (e[t] = n, !0)
          },
          e.exports = d
      },
      function (e, t, n) {
        (function (t, r) {
          /*!
       * @overview es6-promise - a tiny implementation of Promises/A+.
       * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
       * @license   Licensed under MIT license
       *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
       * @version   4.0.5
       */
          !
            function (t, n) {
              e.exports = n()
            }(this,
              function () {
                "use strict";
                function e(e) {
                  return "function" == typeof e || "object" == typeof e && null !== e
                }
                function s(e) {
                  return "function" == typeof e
                }
                function o(e) {
                  K = e
                }
                function i(e) {
                  z = e
                }
                function a() {
                  return function () {
                    return t.nextTick(m)
                  }
                }
                function c() {
                  return "undefined" != typeof G ?
                    function () {
                      G(m)
                    } : d()
                }
                function u() {
                  var e = 0,
                    t = new Z(m),
                    n = document.createTextNode("");
                  return t.observe(n, {
                    characterData: !0
                  }),
                    function () {
                      n.data = e = ++e % 2
                    }
                }
                function l() {
                  var e = new MessageChannel;
                  return e.port1.onmessage = m,
                    function () {
                      return e.port2.postMessage(0)
                    }
                }
                function d() {
                  var e = setTimeout;
                  return function () {
                    return e(m, 1)
                  }
                }
                function m() {
                  for (var e = 0; e < J; e += 2) {
                    var t = ne[e],
                      n = ne[e + 1];
                    t(n),
                      ne[e] = void 0,
                      ne[e + 1] = void 0
                  }
                  J = 0
                }
                function f() {
                  try {
                    var e = n(179);
                    return G = e.runOnLoop || e.runOnContext,
                      c()
                  } catch (t) {
                    return d()
                  }
                }
                function p(e, t) {
                  var n = arguments,
                    r = this,
                    s = new this.constructor(y);
                  void 0 === s[se] && F(s);
                  var o = r._state;
                  return o ? !
                    function () {
                      var e = n[o - 1];
                      z(function () {
                        return A(o, s, e, r._result)
                      })
                    }() : I(r, s, e, t),
                    s
                }
                function g(e) {
                  var t = this;
                  if (e && "object" == typeof e && e.constructor === t) return e;
                  var n = new t(y);
                  return w(n, e),
                    n
                }
                function y() { }
                function h() {
                  return new TypeError("You cannot resolve a promise with itself")
                }
                function v() {
                  return new TypeError("A promises callback cannot return that same promise.")
                }
                function b(e) {
                  try {
                    return e.then
                  } catch (t) {
                    return ce.error = t,
                      ce
                  }
                }
                function M(e, t, n, r) {
                  try {
                    e.call(t, n, r)
                  } catch (s) {
                    return s
                  }
                }
                function T(e, t, n) {
                  z(function (e) {
                    var r = !1,
                      s = M(n, t,
                        function (n) {
                          r || (r = !0, t !== n ? w(e, n) : O(e, n))
                        },
                        function (t) {
                          r || (r = !0, _(e, t))
                        },
                        "Settle: " + (e._label || " unknown promise")); !r && s && (r = !0, _(e, s))
                  },
                    e)
                }
                function S(e, t) {
                  t._state === ie ? O(e, t._result) : t._state === ae ? _(e, t._result) : I(t, void 0,
                    function (t) {
                      return w(e, t)
                    },
                    function (t) {
                      return _(e, t)
                    })
                }
                function k(e, t, n) {
                  t.constructor === e.constructor && n === p && t.constructor.resolve === g ? S(e, t) : n === ce ? _(e, ce.error) : void 0 === n ? O(e, t) : s(n) ? T(e, t, n) : O(e, t)
                }
                function w(t, n) {
                  t === n ? _(t, h()) : e(n) ? k(t, n, b(n)) : O(t, n)
                }
                function C(e) {
                  e._onerror && e._onerror(e._result),
                    x(e)
                }
                function O(e, t) {
                  e._state === oe && (e._result = t, e._state = ie, 0 !== e._subscribers.length && z(x, e))
                }
                function _(e, t) {
                  e._state === oe && (e._state = ae, e._result = t, z(C, e))
                }
                function I(e, t, n, r) {
                  var s = e._subscribers,
                    o = s.length;
                  e._onerror = null,
                    s[o] = t,
                    s[o + ie] = n,
                    s[o + ae] = r,
                    0 === o && e._state && z(x, e)
                }
                function x(e) {
                  var t = e._subscribers,
                    n = e._state;
                  if (0 !== t.length) {
                    for (var r = void 0,
                      s = void 0,
                      o = e._result,
                      i = 0; i < t.length; i += 3) r = t[i],
                        s = t[i + n],
                        r ? A(n, r, s, o) : s(o);
                    e._subscribers.length = 0
                  }
                }
                function E() {
                  this.error = null
                }
                function P(e, t) {
                  try {
                    return e(t)
                  } catch (n) {
                    return ue.error = n,
                      ue
                  }
                }
                function A(e, t, n, r) {
                  var o = s(n),
                    i = void 0,
                    a = void 0,
                    c = void 0,
                    u = void 0;
                  if (o) {
                    if (i = P(n, r), i === ue ? (u = !0, a = i.error, i = null) : c = !0, t === i) return void _(t, v())
                  } else i = r,
                    c = !0;
                  t._state !== oe || (o && c ? w(t, i) : u ? _(t, a) : e === ie ? O(t, i) : e === ae && _(t, i))
                }
                function R(e, t) {
                  try {
                    t(function (t) {
                      w(e, t)
                    },
                      function (t) {
                        _(e, t)
                      })
                  } catch (n) {
                    _(e, n)
                  }
                }
                function j() {
                  return le++
                }
                function F(e) {
                  e[se] = le++ ,
                    e._state = void 0,
                    e._result = void 0,
                    e._subscribers = []
                }
                function N(e, t) {
                  this._instanceConstructor = e,
                    this.promise = new e(y),
                    this.promise[se] || F(this.promise),
                    V(t) ? (this._input = t, this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? O(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && O(this.promise, this._result))) : _(this.promise, U())
                }
                function U() {
                  return new Error("Array Methods must be provided an Array")
                }
                function D(e) {
                  return new N(this, e).promise
                }
                function L(e) {
                  var t = this;
                  return new t(V(e) ?
                    function (n, r) {
                      for (var s = e.length,
                        o = 0; o < s; o++) t.resolve(e[o]).then(n, r)
                    } : function (e, t) {
                      return t(new TypeError("You must pass an array to race."))
                    })
                }
                function B(e) {
                  var t = this,
                    n = new t(y);
                  return _(n, e),
                    n
                }
                function q() {
                  throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                }
                function W() {
                  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                }
                function H(e) {
                  this[se] = j(),
                    this._result = this._state = void 0,
                    this._subscribers = [],
                    y !== e && ("function" != typeof e && q(), this instanceof H ? R(this, e) : W())
                }
                function $() {
                  var e = void 0;
                  if ("undefined" != typeof r) e = r;
                  else if ("undefined" != typeof self) e = self;
                  else try {
                    e = Function("return this")()
                  } catch (t) {
                    throw new Error("polyfill failed because global object is unavailable in this environment")
                  }
                  var n = e.Promise;
                  if (n) {
                    var s = null;
                    try {
                      s = Object.prototype.toString.call(n.resolve())
                    } catch (t) { }
                    if ("[object Promise]" === s && !n.cast) return
                  }
                  e.Promise = H
                }
                var X = void 0;
                X = Array.isArray ? Array.isArray : function (e) {
                  return "[object Array]" === Object.prototype.toString.call(e)
                };
                var V = X,
                  J = 0,
                  G = void 0,
                  K = void 0,
                  z = function (e, t) {
                    ne[J] = e,
                      ne[J + 1] = t,
                      J += 2,
                      2 === J && (K ? K(m) : re())
                  },
                  Y = "undefined" != typeof window ? window : void 0,
                  Q = Y || {},
                  Z = Q.MutationObserver || Q.WebKitMutationObserver,
                  ee = "undefined" == typeof self && "undefined" != typeof t && "[object process]" === {}.toString.call(t),
                  te = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
                  ne = new Array(1e3),
                  re = void 0;
                re = ee ? a() : Z ? u() : te ? l() : void 0 === Y ? f() : d();
                var se = Math.random().toString(36).substring(16),
                  oe = void 0,
                  ie = 1,
                  ae = 2,
                  ce = new E,
                  ue = new E,
                  le = 0;
                return N.prototype._enumerate = function () {
                  for (var e = this.length,
                    t = this._input,
                    n = 0; this._state === oe && n < e; n++) this._eachEntry(t[n], n)
                },
                  N.prototype._eachEntry = function (e, t) {
                    var n = this._instanceConstructor,
                      r = n.resolve;
                    if (r === g) {
                      var s = b(e);
                      if (s === p && e._state !== oe) this._settledAt(e._state, t, e._result);
                      else if ("function" != typeof s) this._remaining-- ,
                        this._result[t] = e;
                      else if (n === H) {
                        var o = new n(y);
                        k(o, e, s),
                          this._willSettleAt(o, t)
                      } else this._willSettleAt(new n(function (t) {
                        return t(e)
                      }), t)
                    } else this._willSettleAt(r(e), t)
                  },
                  N.prototype._settledAt = function (e, t, n) {
                    var r = this.promise;
                    r._state === oe && (this._remaining-- , e === ae ? _(r, n) : this._result[t] = n),
                      0 === this._remaining && O(r, this._result)
                  },
                  N.prototype._willSettleAt = function (e, t) {
                    var n = this;
                    I(e, void 0,
                      function (e) {
                        return n._settledAt(ie, t, e)
                      },
                      function (e) {
                        return n._settledAt(ae, t, e)
                      })
                  },
                  H.all = D,
                  H.race = L,
                  H.resolve = g,
                  H.reject = B,
                  H._setScheduler = o,
                  H._setAsap = i,
                  H._asap = z,
                  H.prototype = {
                    constructor: H,
                    then: p,
                    "catch": function (e) {
                      return this.then(null, e)
                    }
                  },
                  H.polyfill = $,
                  H.Promise = H,
                  H
              })
        }).call(t, n(173),
        function () {
          return this
        }())
      },
      function (e, t, n) {
        "use strict";
        var r = "'113f0c00341d4dc90182c03aa5169e717fe17999",
          s = "113f0c0'",
          o = "4.9.1",
          i = "2.5.0.211",
          a = "3.7.0",
          c = "46",
          u = 1,
          l = "https://lbs.netease.im/lbs/webconf.jsp",
          d = "https://dr.netease.im/1.gif",
          m = "development" === {
            WEIXIN_APP: !0
          }.NODE_ENV ? 6e3 : 42e3,
          f = {
            info: {
              hash: r,
              shortHash: s,
              version: o,
              sdkVersion: c,
              nrtcVersion: a,
              protocolVersion: u
            },
            agentVersion: i,
            lbsUrl: l,
            connectTimeout: m,
            xhrTimeout: m,
            socketTimeout: m,
            reconnectionDelay: 656.25,
            reconnectionDelayMax: m,
            reconnectionJitter: .1,
            heartbeatInterval: 18e4,
            cmdTimeout: m,
            defaultReportUrl: d
          };
        f.formatSocketUrl = function (e) {
          var t = e.url,
            n = e.secure,
            r = n ? "https" : "http";
          return t.indexOf("http") === -1 ? r + "://" + t : t
        },
          f.uploadUrl = "https://nos.netease.com",
          f.replaceUrl = "https://{bucket}.nosdn.127.net/{object}",
          f.downloadHost = "nos.netease.com",
          f.downloadUrl = "https://{bucket}.nosdn.127.net/{object}",
          f.genUploadUrl = function (e) {
            return f.uploadUrl + "/" + e
          },
          f.genDownloadUrl = function (e, t) {
            return f.replaceUrl.replace("{bucket}", e).replace("{object}", t)
          },
          e.exports = f
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          var t = this;
          u.verifyOptions(e, "appKey account token", "protocol::IMProtocol"),
            u.verifyCallback(e, ["onconnect", "onerror", "onwillreconnect", "ondisconnect", "onloginportschange", "onmyinfo", "onblacklist", "onmutelist", "onfriends", "onusers", "onrobots", "onteams", "onsessions", "onroamingmsgs", "onofflinemsgs", "onofflinefiltermsgs", "onroamingsysmsgs", "onofflinesysmsgs", "onofflinefiltersysmsgs", "onofflinecustomsysmsgs", "onofflinefiltercustomsysmsgs", "onbroadcastmsg", "onbroadcastmsgs", "onsysmsgunread", "onsyncdone", "onteammembers", "onsyncteammembersdone", "onmsg", "onsysmsg", "oncustomsysmsg", "onupdatemyinfo", "onupdateuser", "onupdateteammember", "onCreateTeam", "onUpdateTeam", "onAddTeamMembers", "onRemoveTeamMembers", "onUpdateTeamManagers", "onDismissTeam", "onTransferTeam", "onUpdateTeamMembersMute", "onupdatesession", "onupdatesysmsgunread", "onupdatesysmsg", "onsynccreateteam", "onsyncmarkinblacklist", "onsyncmarkinmutelist", "onsyncfriendaction", "shouldIgnoreNotification", "shouldCountNotifyUnread", "onPushNotificationMultiportConfig", "onPushNotificationMultiportConfigUpdate", "onpushevents"], "protocol::IMProtocol"),
            t.db = e.api.db = new o({
              logger: e.logger
            }),
            i.call(t, e)
        }
        var s = n(2).Promise,
          o = n(11),
          i = n(22),
          a = n(5),
          c = n(3),
          u = n(1),
          l = u.undef,
          d = n(92),
          m = n(28).getInstance("IM"),
          f = n(38),
          p = i.fn,
          g = r.fn = r.prototype = Object.create(p);
        g.init = function () {
          var e = this;
          p.init.call(e),
            e.socketUrls = [],
            e.parser = m,
            e.syncing = !0,
            e.hasSynced = !1,
            e.hasSyncedTeamMembers = !1,
            e.syncPromiseArray = [],
            e.syncResult = {},
            e.syncTeamMembersPromiseArray = [],
            e.syncTeamMembersResult = {},
            e.timetags = {},
            e.sysMsgUnread = f.completeUnread({}),
            e.resetUnsettledMsgs(),
            e.resetUnsettledSysMsgs(),
            e.msgPromise = s.resolve(),
            e.sysMsgPromise = s.resolve(),
            e.sessionSet = {},
            e.msgReceiptTasks = {},
            e.userSet = {},
            e.pushNotificationMultiportConfig = d.getDefaultConfig()
        },
          g.reset = function () {
            var e = this;
            p.reset.call(e);
            var t = e.options;
            e.db.reset(t.db),
              l(t.lbsUrl) && (t.lbsUrl = c.lbsUrl),
              e.resetAutoMarkRead()
          },
          g.resetAutoMarkRead = function () {
            var e = this.options;
            u.verifyBooleanWithDefault(e, "autoMarkRead", !0, "", "protocol::resetAutoMarkRead")
          },
          g.resetUnsettledMsgs = function () {
            var e = this;
            e.unhandledMsgs = [],
              e.unupdatedMsgs = []
          },
          g.resetUnsettledSysMsgs = function () {
            var e = this;
            e.unhandledSysMsgs = [],
              e.unupdatedSysMsgs = []
          },
          g.packetFromSync = function (e) {
            return !e.obj || !!e.obj.sync
          },
          g.onCustomError = function (e, t) {
            var n = a.customError(e, t),
              r = t.message || "未知错误";
            this.onMiscError(r, n)
          },
          e.exports = r,
          n(242),
          n(240),
          n(253),
          n(256),
          n(245),
          n(250),
          n(255),
          n(249),
          n(246),
          n(248),
          n(247),
          n(254),
          n(251),
          n(252),
          n(241),
          n(244),
          n(243)
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          return e && e.__esModule ? e : {
            "default": e
          }
        }
        function s(e, t) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            r = this;
          r.message = e || n.message || "",
            "object" === ("undefined" == typeof t ? "undefined" : (0, i["default"])(t)) ? (r.event = t, r.code = "Other_Error") : "undefined" != typeof t && (r.code = t),
            r.timetag = +new Date,
            "undefined" != typeof n && (r.event = n),
            r.event && (r.callFunc = r.event.callFunc || null, delete r.event.callFunc)
        }
        var o = n(6),
          i = r(o);
        s.prototype = Object.create(Error.prototype),
          s.prototype.name = "NIMError";
        var a = {
          201: "客户端版本不对, 需升级sdk",
          302: "用户名或密码错误, 请检查appKey和token是否有效, account和token是否匹配",
          403: "非法操作或没有权限",
          404: "对象(用户/群/聊天室)不存在",
          405: "参数长度过长",
          408: "客户端请求超时",
          414: "参数错误",
          415: "服务不可用/没有聊天室服务器可分配",
          416: "频率控制",
          417: "重复操作",
          422: "帐号被禁用",
          500: "服务器内部错误",
          501: "数据库操作失败",
          503: "服务器繁忙",
          508: "删除有效期过了",
          509: "已失效",
          7101: "被拉黑",
          801: "群人数达到上限",
          802: "没有权限",
          803: "群不存在或未发生变化",
          804: "用户不在群里面",
          805: "群类型不匹配",
          806: "创建群数量达到限制",
          807: "群成员状态不对",
          809: "已经在群里",
          813: "因群数量限制，部分拉人成功",
          997: "协议已失效",
          998: "解包错误",
          999: "打包错误",
          9102: "通道失效",
          9103: "已经在其他端接听/拒绝过这通电话",
          11001: "对方离线, 通话不可送达",
          13002: "聊天室状态异常",
          13003: "在黑名单中",
          13004: "在禁言名单中",
          13006: "聊天室处于整体禁言状态,只有管理员能发言",
          Connect_Failed: "无法建立连接, 请确保能 ping/telnet 到云信服务器; 如果是IE8/9, 请确保项目部署在 HTTPS 环境下",
          Error_Internet_Disconnected: "网断了",
          Error_Connection_is_not_Established: "连接未建立",
          Error_Connection_Socket_State_not_Match: "socket状态不对",
          Error_Timeout: "超时",
          Param_Error: "参数错误",
          No_File_Selected: "请选择文件",
          Wrong_File_Type: "文件类型错误",
          File_Too_Large: "文件过大",
          Cross_Origin_Iframe: "不能获取跨域Iframe的内容",
          Not_Support: "不支持",
          NO_DB: "无数据库",
          DB: "数据库错误",
          Still_In_Team: "还在群里",
          Session_Exist: "会话已存在",
          Session_Not_Exist: "会话不存在",
          Error_Unknown: "未知错误",
          Operation_Canceled: "操作取消"
        },
          c = [200, 406, 808, 810];
        c.forEach(function (e) {
          a[e] = null
        }),
          s.genError = function (e) {
            var t = a[e];
            return void 0 === t && (t = "操作失败"),
              null === t ? null : new s(t, e)
          },
          s.multiInstance = function (e) {
            return new s("不允许初始化多个实例", "Not_Allow_Multi_Instance", e)
          },
          s.newNetworkError = function (e) {
            var t = "Error_Internet_Disconnected";
            return new s(a[t], t, e)
          },
          s.newConnectError = function (e) {
            var t = "Connect_Failed";
            return new s(a[t] || null, t, e)
          },
          s.newConnectionError = function (e) {
            var t = "Error_Connection_is_not_Established";
            return new s(a[t], t, e)
          },
          s.newSocketStateError = function (e) {
            var t = "Error_Connection_Socket_State_not_Match";
            return new s(a[t], t, e)
          },
          s.newTimeoutError = function (e) {
            var t = "Error_Timeout";
            return new s(a[t], t, e)
          },
          s.newFrequencyControlError = function (e) {
            var t = 416,
              n = new s(a[t], t, e);
            return n.from = "local",
              n
          },
          s.newParamError = function (e, t) {
            var n = "Param_Error";
            return new s(e || a[n], n, t)
          },
          s.newNoFileError = function (e, t) {
            var n = "No_File_Selected";
            return new s(e || a[n], n, t)
          },
          s.newWrongFileTypeError = function (e, t) {
            var n = "Wrong_File_Type";
            return new s(e || a[n], n, t)
          },
          s.newFileTooLargeError = function (e, t) {
            var n = "File_Too_Large";
            return new s(e || a[n], n, t)
          },
          s.newCORSIframeError = function (e) {
            var t = "Cross_Origin_Iframe";
            return new s(a[t], t, e)
          },
          s.newSupportError = function (e, t, n) {
            return new s("不支持" + e, "Not_Support_" + t, n)
          },
          s.newSupportDBError = function (e) {
            return s.newSupportError("数据库", "DB", e)
          },
          s.noDBError = function (e) {
            var t = "NO_DB";
            return new s(a[t], t, e)
          },
          s.newDBError = function (e) {
            var t = "DB";
            return new s(a[t], t, e)
          },
          s.newUnknownError = function (e) {
            var t = "Error_Unknown";
            return new s(a[t], t, e)
          },
          s.stillInTeamError = function (e) {
            var t = "Still_In_Team";
            return new s(a[t], t, e)
          },
          s.sessionExist = function (e) {
            var t = "Session_Exist";
            return new s(a[t], t, e)
          },
          s.sessionNotExist = function (e) {
            var t = "Session_Not_Exist";
            return new s(a[t], t, e)
          },
          s.cancel = function (e) {
            var t = "Operation_Canceled";
            return new s(a[t], t, e)
          },
          s.customError = function (e, t) {
            e = e || "Other_Error",
              t = t || {};
            var n = "";
            return t.message || (n = a[e] || e),
              "object" !== ("undefined" == typeof e ? "undefined" : (0, i["default"])(e)) ? new s(n, e, t) : "undefined" == typeof t ? new s(n, "Other_Error", e) : new s(n, "Other_Error", t)
          },
          e.exports = s
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          return e && e.__esModule ? e : {
            "default": e
          }
        }
        t.__esModule = !0;
        var s = n(131),
          o = r(s),
          i = n(130),
          a = r(i),
          c = "function" == typeof a["default"] && "symbol" == typeof o["default"] ?
            function (e) {
              return typeof e
            } : function (e) {
              return e && "function" == typeof a["default"] && e.constructor === a["default"] && e !== a["default"].prototype ? "symbol" : typeof e
            };
        t["default"] = "function" == typeof a["default"] && "symbol" === c(o["default"]) ?
          function (e) {
            return "undefined" == typeof e ? "undefined" : c(e)
          } : function (e) {
            return e && "function" == typeof a["default"] && e.constructor === a["default"] && e !== a["default"].prototype ? "symbol" : "undefined" == typeof e ? "undefined" : c(e)
          }
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          var t = this;
          return t.subType = "im",
            e.Protocol = o,
            e.Message = a,
            e.constructor = r,
            t.init(e)
        }
        var s = n(10),
          o = n(4),
          i = n(3),
          a = n(227),
          c = n(28).getInstance("IM");
        r.Protocol = o,
          r.parser = c,
          r.use = s.use,
          r.getInstance = s.getInstance,
          r.rmAllInstances = s.rmAllInstances,
          r.genInstanceName = function (e) {
            return "NIM-account-" + e.account
          };
        var u = r.fn = r.prototype = Object.create(s.prototype);
        r.info = u.info = i.info,
          e.exports = r,
          n(191),
          n(187),
          n(196),
          n(201),
          n(190),
          n(197),
          n(200),
          n(198),
          n(192),
          n(199),
          n(186),
          n(193),
          n(194),
          n(185),
          n(188),
          n(195),
          n(189)
      },
      function (e, t) {
        (function (e) {
          "use strict";
          function n() {
            return "undefined" != typeof window ? window : "undefined" != typeof self ? self : "undefined" != typeof e ? e : {}
          }
          function r(e) {
            var t = !1,
              n = "Webkit Moz ms O".split(" "),
              r = document.createElement("div"),
              s = null;
            if (e = e.toLowerCase(), void 0 !== r.style[e] && (t = !0), t === !1) {
              s = e.charAt(0).toUpperCase() + e.substr(1);
              for (var o = 0; o < n.length; o++) if (void 0 !== r.style[n[o] + s]) {
                t = !0;
                break
              }
            }
            return t
          }
          function s(e, t) {
            t = t || 2;
            for (var n = "" + e; n.length < t;) n = "0" + n;
            return n
          }
          function o(e) {
            return "" + e.getFullYear()
          }
          function i(e) {
            return s(e.getMonth() + 1)
          }
          function a(e) {
            return s(e.getDate())
          }
          function c(e) {
            return s(e.getHours())
          }
          function u(e) {
            return s(e.getMinutes())
          }
          function l(e) {
            return s(e.getSeconds())
          }
          function d(e) {
            return s(e.getMilliseconds(), 3)
          }
          function m(e) {
            return e = "" + e,
              new Date(e.replace(/-/g, "/").replace("T", " "))
          }
          function f(e) {
            return Object.prototype.toString.call(e).slice(8, -1)
          }
          function p(e) {
            return f(e).toLowerCase()
          }
          function g(e) {
            return "string" === p(e)
          }
          function y(e) {
            return "number" === p(e)
          }
          function h(e) {
            return "boolean" === p(e)
          }
          function v(e) {
            return "array" === p(e)
          }
          function b(e) {
            return "function" === p(e)
          }
          function M(e) {
            return "date" === p(e)
          }
          function T(e) {
            return "regexp" === p(e)
          }
          function S(e) {
            return "error" === p(e)
          }
          function k(e) {
            return null === e
          }
          function w(e) {
            return null !== e
          }
          function C(e) {
            return "undefined" == typeof e
          }
          function O(e) {
            return "undefined" != typeof e
          }
          function _(e) {
            return O(e) && w(e)
          }
          function I(e) {
            return C(e) || k(e)
          }
          function x(e) {
            return _(e) && "object" === p(e)
          }
          function E(e) {
            return I(e) || (g(e) || v(e)) && 0 === e.length
          }
          function P(e, t) {
            if (e === t) return !0;
            for (; t.parentNode;) {
              if (t.parentNode === e) return !0;
              t = t.parentNode
            }
            return !1
          }
          function A(e) {
            var t = e.parentNode || document.body;
            e = e.cloneNode(!0),
              e.style.display = "block",
              e.style.opacity = 0,
              e.style.height = "auto",
              t.appendChild(e);
            var n = e.offsetHeight;
            return t.removeChild(e),
              n
          }
          function R(e) {
            e.parentNode && e.parentNode.removeChild(e)
          }
          function j(e, t, n) {
            return _(n) ? void e.setAttribute("data-" + t, n) : e.getAttribute("data-" + t)
          }
          function F(e) {
            return e.target || e.srcElement
          }
          function N(e) {
            function t(r) {
              n.src && (e.multi || oe(n, "load", t), e.onload(r))
            }
            e = e || {};
            var n;
            if (e.name) try {
              n = document.createElement('<iframe name="' + e.name + '"></iframe>'),
                n.frameBorder = 0
            } catch (r) {
              n = document.createElement("iframe"),
                n.name = e.name
            } else n = document.createElement("iframe");
            e.visible || (n.style.display = "none"),
              b(e.onload) && re(n, "load", t);
            var s = e.parent; (s || document.body).appendChild(n);
            var o = e.src || "about:blank";
            return setTimeout(function () {
              n.src = o
            },
              0),
              n
          }
          function U(e) {
            var t = document.createElement("div");
            t.innerHTML = e;
            var n = [],
              r = void 0,
              s = void 0;
            if (t.children) for (r = 0, s = t.children.length; r < s; r++) n.push(t.children[r]);
            else for (r = 0, s = t.childNodes.length; r < s; r++) {
              var o = t.childNodes[r];
              1 === o.nodeType && n.push(o)
            }
            return n.length > 1 ? t : n[0]
          }
          function D(e) {
            return _(e) && (document.documentElement.scrollTop = document.body.scrollTop = e),
              window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
          }
          function L(e) {
            var t = n(),
              r = void 0;
            r = e.split(",")[0].indexOf("base64") >= 0 ? t.atob(e.split(",")[1]) : t.decodeURIComponent(e.split(",")[1]);
            for (var s = e.split(",")[0].split(":")[1].split(";")[0], o = new Uint8Array(r.length), i = 0; i < r.length; i++) o[i] = r.charCodeAt(i);
            return new t.Blob([o], {
              type: s
            })
          }
          function B(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "image/jpeg",
              r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1;
            if (e.toBlob) e.toBlob(t, n, r);
            else {
              var s = e.toDataURL(n, r);
              t(L(s))
            }
          }
          function q() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function () { },
              n = arguments[2];
            for (var r in e) e.hasOwnProperty(r) && t.call(n, r, e[r])
          }
          function W(e, t) {
            q(t,
              function (t, n) {
                e[t] = n
              })
          }
          function H(e) {
            return g(e) && 0 === e.indexOf("{") && e.lastIndexOf("}") === e.length - 1
          }
          function $(e) {
            try {
              H(e) && (e = JSON.parse(e)),
                x(e) && q(e,
                  function (t, n) {
                    switch (p(n)) {
                      case "string":
                      case "object":
                        e[t] = $(n)
                    }
                  })
            } catch (t) {
              console.error(t)
            }
            return e
          }
          function X(e) {
            return JSON.parse(JSON.stringify(e))
          }
          function V() {
            for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
            return n.forEach(function (t) {
              W(e, t)
            }),
              e
          }
          function J(e, t) {
            return q(t,
              function (t, n) {
                C(e[t]) && (e[t] = n)
              }),
              e
          }
          function G(e, t, n) {
            var r = e[t] || e[t.toLowerCase()];
            return I(r) && (r = n, e[t] = r),
              r
          }
          function K(e, t) {
            return q(e,
              function (n, r) {
                _(t[n]) && (e[n] = t[n])
              }),
              e
          }
          function z() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
              t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ",",
              n = {};
            return e.split(t).forEach(function (e) {
              var t = e.split("="),
                r = t.shift();
              r && (n[decodeURIComponent(r)] = decodeURIComponent(t.join("=")))
            }),
              n
          }
          function Y(e, t, n) {
            if (!e) return "";
            var r = [];
            return q(e,
              function (e, t) {
                b(t) || (M(t) ? t = t.getTime() : v(t) ? t = t.join(",") : x(t) && (t = JSON.stringify(t)), n && (t = encodeURIComponent(t)), r.push(encodeURIComponent(e) + "=" + t))
              }),
              r.join(t || ",")
          }
          function Q(e) {
            return e.indexOf("?") < 0 ? "?" : "&"
          }
          function Z(e) {
            return Y(e, "&", !0)
          }
          function ee(e) {
            var t = n();
            return e.tagName && "INPUT" === e.tagName.toUpperCase() || t.Blob && e instanceof t.Blob
          }
          function te(e, t) {
            var n = Object.keys(e);
            return t && n.sort(function (t, n) {
              var r = ee(e[t]),
                s = ee(e[n]);
              return r === s ? 0 : r ? 1 : -1
            }),
              n
          }
          t.__esModule = !0,
            t.getGlobal = n,
            t.detectCSSFeature = r,
            t.fix = s,
            t.getYearStr = o,
            t.getMonthStr = i,
            t.getDayStr = a,
            t.getHourStr = c,
            t.getMinuteStr = u,
            t.getSecondStr = l,
            t.getMillisecondStr = d,
            t.dateFromDateTimeLocal = m,
            t.getClass = f,
            t.typeOf = p,
            t.isString = g,
            t.isNumber = y,
            t.isBoolean = h,
            t.isArray = v,
            t.isFunction = b,
            t.isDate = M,
            t.isRegExp = T,
            t.isError = S,
            t.isnull = k,
            t.notnull = w,
            t.undef = C,
            t.notundef = O,
            t.exist = _,
            t.notexist = I,
            t.isObject = x,
            t.isEmpty = E,
            t.containsNode = P,
            t.calcHeight = A,
            t.remove = R,
            t.dataset = j,
            t.target = F,
            t.createIframe = N,
            t.html2node = U,
            t.scrollTop = D,
            t.blobFromDataURL = L,
            t.blobFromCanvas = B,
            t.forOwn = q,
            t.mixin = W,
            t.isJSON = H,
            t.parseJSON = $,
            t.simpleClone = X,
            t.merge = V,
            t.fillUndef = J,
            t.checkWithDefault = G,
            t.fetch = K,
            t.string2object = z,
            t.object2string = Y,
            t.genUrlSep = Q,
            t.object2query = Z,
            t.isFileInput = ee,
            t.getKeys = te;
          var ne = (t.o = {},
            t.emptyObj = {},
            t.f = function () { },
            t.emptyFunc = function () { },
            t.regBlank = /\s+/gi, t.regWhiteSpace = /\s+/gi, t.format = function () {
              var e = /yyyy|MM|dd|hh|mm|ss|SSS/g,
                t = {
                  yyyy: o,
                  MM: i,
                  dd: a,
                  hh: c,
                  mm: u,
                  ss: l,
                  SSS: d
                };
              return function (n, r) {
                return n = new Date(n),
                  isNaN(+ n) ? "invalid date" : (r = r || "yyyy-MM-dd", r.replace(e,
                    function (e) {
                      return t[e](n)
                    }))
              }
            }(), t.addEventListener = function (e, t, n) {
              e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n)
            }),
            re = t.on = ne,
            se = t.removeEventListener = function (e, t, n) {
              e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent && e.detachEvent("on" + t, n)
            },
            oe = t.off = se;
          t.uniqueID = function () {
            var e = 0;
            return function () {
              return "" + e++
            }
          }(),
            t.url2origin = function () {
              var e = /^([\w]+?:\/\/.*?(?=\/|$))/i;
              return function (t) {
                return e.test(t || "") ? RegExp.$1.toLowerCase() : ""
              }
            }()
        }).call(t,
        function () {
          return this
        }())
      },
      function (e, t) {
        var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = n)
      },
      function (e, t, n) {
        "use strict";
        function r() { }
        var s = n(169),
          o = n(2).Promise,
          i = n(1),
          a = i.notundef,
          c = n(123),
          u = n(3),
          l = {};
        r.rmAllInstances = function () {
          l = {}
        },
          r.getInstance = function (e) {
            var t = this;
            i.verifyOptions(e, "account", "api::Base.getInstance");
            var n = t.genInstanceName(e),
              s = l[n];
            return s ? r.updateInstance(s, e) : s = l[n] = new t(e),
              s
          },
          r.updateInstance = function (e, t) {
            e.setOptions(t),
              e.connect()
          };
        var d = r.fn = r.prototype = Object.create(new s);
        d.init = function (e) {
          var t = this;
          i.verifyOptions(e, "account", "api::Base.init");
          var n = t.account = e.account = e.account + "",
            s = e.constructor,
            o = s.genInstanceName(e),
            a = l[o];
          if (e._disableSingleton && (a = null), a) return r.updateInstance(a, e),
            a;
          t.name = o,
            l[o] = t,
            t.logger = e.logger = new c({
              debug: e.debug,
              logFunc: e.logFunc,
              prefix: t.subType
            }),
            e.api = t;
          var d = t.protocol = new e.Protocol(e);
          return d.name = "Protocol-" + o,
            d.account = n,
            d.api = t,
            d.message = t.message = new e.Message({
              account: n,
              enabledHttpsForMessage: t.protocol.options.enabledHttpsForMessage || !1
            }),
            t.options = i.copy(e),
            u.ntServerAddress = null === e.ntServerAddress ? null : e.ntServerAddress || u.defaultReportUrl,
            u.downloadHost = e.downloadHost || u.downloadHost,
            u.replaceUrl = e.replaceUrl || u.replaceUrl,
            u.uploadUrl = e.uploadUrl || u.uploadUrl,
            u.downloadUrl = e.downloadUrl || u.downloadUrl,
            u.replaceUrl = e.replaceUrl || u.replaceUrl,
            t.reset(),
            t
        },
          d.reset = function () {
            var e = this,
              t = e.options;
            i.verifyBooleanWithDefault(t, "exifOrientation", !0, "", "api::Base.reset")
          },
          d.setOptions = function (e) {
            this.reset(),
              this.protocol.setOptions(e)
          },
          d.processCallback = function (e, t) {
            m(e, t)
          },
          d.processCallbackPromise = function (e, t) {
            var n = new o(function (n, r) {
              m(e, t, !0, n, r)
            });
            return n
          };
        var m = function (e, t, n, r, s) {
          var o = "api::processCallback";
          n && (o = "api::processCallbackPromise"),
            i.verifyCallback(e, "done", o),
            e.callback = function (c, u, l) {
              var d = e.callback.options;
              if (u = u || d, t && (u = d), i.isFunction(e.cbaop)) {
                var m = e.cbaop(c, u);
                a(m) && (u = m)
              }
              var f = e.done;
              i.isObject(u) && (delete u.done, delete u.cb, delete u.callback),
                n ? c ? s({
                  message: "生成接口回调错误",
                  callFunc: o,
                  event: c
                }) : r(u) : f(c, u, l)
            },
            e.callback.options = i.copy(e)
        };
        d.processPs = function (e) {
          i.notexist(e.ps) && (e.ps = "")
        },
          d.processCustom = function (e) {
            i.notexist(e.custom) && (e.custom = "")
          },
          d.sendCmd = function () {
            this.protocol.sendCmd.apply(this.protocol, arguments)
          },
          d.sendCmdWithResp = function (e, t, n) {
            this.sendCmd(e, t,
              function (e, t, r) {
                i.isFunction(n) && (e ? n(e, t) : n(null, r))
              })
          },
          d.cbAndSendCmd = function (e, t) {
            var n = this.processCallbackPromise(t);
            return this.sendCmd(e, t),
              n
          },
          r.use = function (e, t) {
            e && e.install && i.isFunction(e.install) && e.install(this, t)
          },
          e.exports = r,
          n(100),
          n(102),
          n(103),
          n(104),
          n(101),
          n(105)
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          y = e,
            l.set("db", e, c)
        }
        function s(e) {
          this.concurrency = 0,
            this.pendingTasks = [],
            this.queue = o.resolve(),
            this.logger = e.logger
        }
        var o = n(2).Promise,
          i = n(27),
          a = n(59),
          c = n(89),
          u = n(1),
          l = n(94),
          d = n(5),
          m = d.newSupportDBError,
          f = d.noDBError,
          p = n(203),
          g = "nim-",
          y = !1,
          h = u.getGlobal();
        if (r(!!h.indexedDB), "IE" === i.name && r(!1), "Microsoft Edge" === i.name && r(!1), "Safari" === i.name) {
          try {
            var v = parseInt(i.version.split(".")[0], 10);
            v < 10 && r(!1)
          } catch (b) { }
          r(!1)
        }
        var M = s.fn = s.prototype;
        M.reset = u.emptyFunc,
          y && (M.reset = function (e) {
            this.enable = e !== !1
          }),
          M.addTask = function (e) {
            var t = this;
            return new o(function (n, r) {
              function s(e) {
                t.concurrency--;
                var n = t.pendingTasks.shift();
                n && t.addTask(n),
                  e()
              }
              return t.concurrency < 100 ? (t.concurrency++ , e().then(function (t) {
                s(function () {
                  n(t),
                    e.resolve && e.resolve(t)
                })
              },
                function (t) {
                  s(function () {
                    var n = new d("数据库并发错误", "DB_ERROR", {
                      event: t,
                      callFunc: "db::addTask"
                    });
                    r(n),
                      e.reject && e.reject(n)
                  })
                })) : (e.resolve || (e.resolve = n, e.reject = r), void t.pendingTasks.push(e))
            })
          },
          M.init = function (e) {
            var t = this;
            return t.addTask(function () {
              return t.enable ? t.server ? o.resolve() : (t.name = g + e, c.open({
                server: t.name,
                version: p.version,
                schema: p.schema
              }).then(function (e) {
                t.logger.log("db::init: " + t.name),
                  t.server = e
              },
                function (e) {
                  throw r(!1),
                  t.server = null,
                  t.name = null,
                  e
                })) : o.reject(m({
                  callFunc: "db::init"
                }))
            })
          },
          M.destroy = function () {
            var e = this;
            return e.addTask(function () {
              return e.enable ? e.server ? c.remove(e.name).then(function () {
                e.logger.log("db::destroy: " + e.name),
                  e.server = null,
                  e.name = null
              }) : o.resolve() : o.reject(m({
                callFunc: "db::destroy"
              }))
            })
          },
          M.clear = function () {
            var e = this;
            return e.addTask(function () {
              return e.enable ? e.server ? e.server.clear("timetag").then(function () {
                var t = [].slice.call(e.server.getIndexedDB().objectStoreNames),
                  n = [];
                if (t.forEach(function (t) {
                  n.push(e.server.clear(t))
                }), n.length) return o.all(n).then(function () {
                  e.logger.log("db::clear: " + e.name)
                })
              }) : o.resolve() : o.reject(m({
                callFunc: "db::clear"
              }))
            })
          },
          M.close = function () {
            var e = this;
            e.server && (e.server.close(), e.server = null, e.name = null)
          },
          M.remove = function (e, t) {
            var n = this;
            return n.addTask(function () {
              return n.enable ? n.server ? (u.isArray(t) || (t = [t]), n.server.remove(e, t).then(function () {
                n.logger.log("db::delete: " + e + " " + (1 === t.length ? t[0] : t))
              })) : o.reject(f({
                callFunc: "db::remove"
              })) : o.reject(m({
                callFunc: "db::remove"
              }))
            })
          },
          M.put = function (e, t) {
            var n = this;
            return n.addTask(function () {
              return n.enable ? n.server ? (u.isArray(t) || (t = [t]), n.server.update(e, t).then(function (t) {
                var r = ["put", e],
                  s = p.keyPath(e),
                  o = [];
                return s && (t.forEach(function (e) {
                  o.push(a(e, s))
                }), r.push(1 === o.length ? o[0] : o)),
                  r.push(1 === t.length ? t[0] : t),
                  r.unshift("db::put:"),
                  n.logger.log.apply(n.logger.log, r),
                  t
              })) : o.reject(f({
                callFunc: "db::put"
              })) : o.reject(m({
                callFunc: "db::put"
              }))
            })
          },
          M.modifyOrPut = function (e) {
            var t = this,
              n = e.table,
              r = u.copy(e.obj),
              s = e.key,
              o = e.modifyObjWhenPut,
              i = u.copy(r);
            return delete i[s],
              t.getOne(n, null, r[s], {
                modifyObj: i
              }).then(function (e) {
                return e ? (t.logger.log("db::modifyOrPut: update table " + n, r), e) : (r = u.merge(r, o), t.put(n, r).then(function (e) {
                  return e[0]
                }))
              })
          },
          M.updateAndDelete = function (e, t, n) {
            var r = this;
            return r.addTask(function () {
              return r.enable ? r.server ? r.server.updateAndDelete(e, t, n) : o.reject(f({
                callFunc: "db::updateAndDelete"
              })) : o.reject(m({
                callFunc: "db::updateAndDelete"
              }))
            })
          },
          M.get = function (e, t) {
            var n = this;
            return n.addTask(function () {
              return n.enable ? n.server ? n.server.get(e, t) : o.reject(f({
                callFunc: "db::get"
              })) : o.reject(m({
                callFunc: "db::get"
              }))
            })
          },
          M.getAll = function (e, t) {
            var n = this;
            return n.addTask(function () {
              return n.enable ? n.server ? (t = t || {},
                t.keys = t.keys === !0, t.desc = t.desc === !0, t.distinct = t.distinct === !0, n.server.query(e, t.index).filter(t.filter).keys(t.keys).desc(t.desc).limit(t.limit).distinct(t.distinct).map(t.mapper).modify(t.modifyObj).execute()) : o.reject(f({
                  callFunc: "db::getAll"
                })) : o.reject(m({
                  callFunc: "db::getAll"
                }))
            })
          },
          M.getOnly = function (e, t, n, r) {
            var s = this;
            return s.addTask(function () {
              if (!s.enable) throw m({
                callFunc: "db::getOnly"
              });
              if (!s.server) throw f({
                callFunc: "db::getOnly"
              });
              return r = r || {},
                r.keys = r.keys === !0,
                r.desc = r.desc === !0,
                r.distinct = r.distinct === !0,
                r.remove = r.remove === !0,
                s.server.query(e, t).only(n).filter(r.filter).keys(r.keys).desc(r.desc).limit(r.limit).distinct(r.distinct).map(r.mapper).modify(r.modifyObj).remove(r.remove).execute()
            })
          },
          M.getOne = function () {
            var e = this;
            return e.getOnly.apply(e, arguments).then(function (e) {
              return e[0]
            })
          },
          M.clearTable = function (e) {
            var t = this;
            return t.addTask(function () {
              if (!t.enable) throw m({
                callFunc: "db::clearTable"
              });
              if (!t.server) throw f({
                callFunc: "db::clearTable"
              });
              return t.server.clear(e)
            })
          },
          M.checkDB = function () {
            var e = this;
            if (!e.enable) throw m({
              callFunc: "db::checkDB"
            });
            if (!e.server) throw f({
              callFunc: "db::checkDB"
            })
          },
          e.exports = s,
          n(205),
          n(211),
          n(207),
          n(204),
          n(210),
          n(212),
          n(206),
          n(209),
          n(202),
          n(208)
      },
      function (e, t, n) {
        e.exports = !n(30)(function () {
          return 7 != Object.defineProperty({},
            "a", {
              get: function () {
                return 7
              }
            }).a
        })
      },
      function (e, t) {
        var n = {}.hasOwnProperty;
        e.exports = function (e, t) {
          return n.call(e, t)
        }
      },
      function (e, t, n) {
        var r = n(25),
          s = n(78),
          o = n(54),
          i = Object.defineProperty;
        t.f = n(12) ? Object.defineProperty : function (e, t, n) {
          if (r(e), t = o(t, !0), r(n), s) try {
            return i(e, t, n)
          } catch (a) { }
          if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
          return "value" in n && (e[t] = n.value),
            e
        }
      },
      function (e, t) {
        var n = e.exports = {
          version: "2.5.3"
        };
        "number" == typeof __e && (__e = n)
      },
      function (e, t, n) {
        var r = n(14),
          s = n(31);
        e.exports = n(12) ?
          function (e, t, n) {
            return r.f(e, t, s(1, n))
          } : function (e, t, n) {
            return e[t] = n,
              e
          }
      },
      function (e, t) {
        e.exports = function (e) {
          return "object" == typeof e ? null !== e : "function" == typeof e
        }
      },
      function (e, t, n) {
        var r = n(144),
          s = n(43);
        e.exports = function (e) {
          return r(s(e))
        }
      },
      function (e, t, n) {
        var r = n(52)("wks"),
          s = n(32),
          o = n(9).Symbol,
          i = "function" == typeof o,
          a = e.exports = function (e) {
            return r[e] || (r[e] = i && o[e] || (i ? o : s)("Symbol." + e))
          };
        a.store = r
      },
      function (e, t, n) {
        "use strict";
        var r = n(41),
          s = n(117),
          o = n(121);
        r.json = s,
          r.upload = o,
          e.exports = r
      },
      function (e, t, n) {
        "use strict";
        var r = n(1),
          s = {};
        s.init = function () {
          s.deviceId = r.guid()
        },
          s.init(),
          s.clientTypeMap = {
            1: "Android",
            2: "iOS",
            4: "PC",
            8: "WindowsPhone",
            16: "Web",
            32: "Server",
            64: "Mac"
          },
          e.exports = s
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          var t = this;
          s.undef(e.secure) && (e.secure = !0),
            t.options = s.copy(e),
            t.init(),
            t.connect()
        }
        var s = n(1),
          o = n(3),
          i = n(5),
          a = r.fn = r.prototype;
        a.init = function () {
          var e = this;
          e.logger = e.options.logger,
            e.cmdTaskArray = [],
            e.timerMap = {},
            e.cmdCallbackMap = {},
            e.cmdContentMap = {},
            e.initConnect(),
            e.reset()
        },
          a.reset = function () {
            var e = this;
            e.resetConnect()
          },
          a.setOptions = function (e) {
            var t = this,
              n = t.options,
              r = Object.keys(n),
              o = r.indexOf("account");
            o !== -1 && r.splice(o, 1),
              e = s.filterObj(e, r),
              t.options = s.merge(n, e),
              t.reset()
          },
          a.sendCmd = function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
              n = arguments[2],
              r = this;
            r.heartbeat(),
              "heartbeat" !== e && r.logger.warn("protocol::sendCmd: " + e, t);
            var s = e;
            e = r.parser.createCmd(e, t);
            var o, i = e.SER;
            t = t || {},
              r.cmdContentMap[i] = t,
              t.single && (delete t.single, o = Object.keys(t), 1 === o.length && (r.cmdContentMap[i] = t[o[0]])),
              t.NOTSTORE && (o = t.NOTSTORE.split(" "), o.forEach(function (e) {
                delete t[e]
              }), delete t.NOTSTORE),
              n = n || t.callback,
              n && (r.cmdCallbackMap[i] = n),
              r.cmdTaskArray.push({
                cmdName: s,
                cmd: JSON.stringify(e)
              }),
              r.startCmdTaskTimer()
          },
          a.startCmdTaskTimer = function () {
            var e = this;
            e.cmdTaskTimer || (e.cmdTaskTimer = setTimeout(function () {
              var t = e.cmdTaskArray.shift();
              e.cmdTaskTimer = null,
                t && e.executeCmdTask(t),
                e.cmdTaskArray.length && e.startCmdTaskTimer()
            },
              0))
          },
          a.executeCmdTask = function (e) {
            var t = this,
              n = e.cmdName,
              r = e.cmd;
            r = JSON.parse(r);
            var s = r.SER;
            t.isFrequencyControlled(n) ? (t.logger.warn("protocol::executeCmdTask: " + n + " hit freq control"), t.markCallbackInvalid(s, i.newFrequencyControlError({
              callFunc: "protocol::executeCmdTask",
              message: n + " hit freq control"
            }))) : t.isConnected() ? (t.logger.log("protocol::sendCmd: " + n + " " + JSON.stringify(r)), t.doSendCmd(r)) : (t.logger.warn("protocol::executeCmdTask: " + n + " not connected"), t.markCallbackInvalid(s, i.newSocketStateError({
              callFunc: "protocol::executeCmdTask",
              message: n + " not connected"
            })))
          },
          a.isFrequencyControlled = function (e) {
            var t = this.frequencyControlMap && this.frequencyControlMap[e];
            if (t) {
              if (Date.now() < t.from + t.duration) return !0;
              delete this.frequencyControlMap[e]
            }
          },
          a.doSendCmd = function (e) {
            var t = this,
              n = e.SER;
            t.timerMap[n] = setTimeout(function () {
              t.markCallbackInvalid(n, i.newTimeoutError({
                callFunc: "protocol::doSendCmd",
                message: "ser " + n + " Timeout Error"
              }))
            },
              o.cmdTimeout);
            try {
              t.socket.send(JSON.stringify(e))
            } catch (r) {
              t.markCallbackInvalid(n, i.newSocketStateError({
                callFunc: "protocol::doSendCmd",
                message: "ser " + n + " socketSendJson Error"
              })),
                t.onDisconnect(!0, "protocol::doSendCmd:socketSendJson")
            }
          },
          a.getObjWithSer = function (e) {
            var t = this,
              n = t.cmdContentMap[e];
            return delete t.cmdContentMap[e],
              n && s.copy(n)
          },
          a.getCallbackWithSer = function (e) {
            var t = this,
              n = t.cmdCallbackMap[e];
            return delete t.cmdCallbackMap[e],
              n
          },
          a.getTimerWithSer = function (e) {
            var t = this,
              n = t.timerMap[e];
            return delete t.timerMap[e],
              n
          },
          a.clearTimerWithSer = function (e) {
            var t = this,
              n = t.getTimerWithSer(e);
            n && clearTimeout(n)
          },
          a.markCallbackInvalid = function (e, t) {
            var n = this;
            n.getObjWithSer(e),
              n.clearTimerWithSer(e);
            var r = n.getCallbackWithSer(e);
            if (r) {
              var s = r.options;
              setTimeout(function () {
                r(t || i.newUnknownError({
                  ser: e
                }), s)
              },
                0)
            }
          },
          a.markAllCallbackInvalid = function (e) {
            var t = this;
            Object.keys(this.cmdCallbackMap).forEach(function (n) {
              t.markCallbackInvalid(n, e)
            })
          },
          a.getPacketObj = function (e) {
            var t = null;
            if (e && e.raw) {
              var n = e.raw.ser;
              s.notundef(n) && (t = this.getObjWithSer(n))
            }
            return t
          },
          a.callPacketAckCallback = function (e) {
            var t = this;
            if (e && e.raw) {
              var n = e.raw.ser;
              if (s.notundef(n)) {
                t.clearTimerWithSer(n);
                var r = t.getCallbackWithSer(n);
                r && (e.promise ? e.promise.then(function () {
                  r(e.error, e.obj)
                },
                  function (s) {
                    s.callFunc = "protocol::callPacketAckCallback",
                      s.message = "Resp Promoise Error: cmd: " + e.cmd + ", ser: " + n;
                    var o = i.customError("CALLBACK_ACK_ERR", s);
                    t.logger.error("protocol::callPacketAckCallback: promise error " + JSON.stringify(s)),
                      r(o, e.obj, e.content)
                  }) : r(e.error, e.obj, e.content))
              }
            }
          },
          a.onMessage = function (e) {
            var t = this;
            t.heartbeat();
            var n = t.parser.parseResponse(e);
            n.notFound && t.logger.warn("protocol::onMessage: packet not found " + JSON.stringify(n)),
              n.error ? (n.error.message = n.cmd + " error: " + n.error.message, t.logger.error("protocol::onMessage: packet error " + JSON.stringify(n.error))) : n.content || "heartbeat" === n.cmd || t.logger.warn("protocol::onMessage: packet.content undefined " + JSON.stringify(n)),
              n.frequencyControlDuration && (t.logger.error("protocol::onMessage: server freq control " + JSON.stringify(n.cmd)), t.frequencyControlMap = t.frequencyControlMap || {},
                t.frequencyControlMap[n.cmd] = {
                  from: +new Date,
                  duration: n.frequencyControlDuration
                }),
              n.obj = t.getPacketObj(n),
              "heartbeat" !== n.cmd && t.logger.log("protocol::recvCmd: " + n.cmd + " " + n.rawStr);
            var r = "process" + s.capFirstLetter(n.service);
            t[r] ? (t.logger.warn("protocol::recvCmd: " + n.cmd + " " + r, n.content), t[r](n)) : t.logger.warn("protocol::onMessage: " + r + " not found"),
              t.callPacketAckCallback(n)
          },
          a.onMiscError = function (e, t, n) {
            t && this.notifyError(e, t, n)
          },
          a.notifyError = function (e, t, n) {
            var r = this;
            if (r.isConnected()) {
              var s = [(e || "") + " " + r.name + " " + JSON.stringify(t)];
              n && s.push(n),
                r.logger.error.apply(r.logger.error, s),
                r.options.onerror(t, n)
            }
          },
          a.emitAPI = function (e) {
            var t = e.type,
              n = e.obj;
            this.api.emit(t, n)
          },
          e.exports = r,
          n(109),
          n(108),
          n(110),
          n(111)
      },
        ,
      function (e, t, n) {
        "use strict";
        function r(e) {
          return e && e.__esModule ? e : {
            "default": e
          }
        }
        function s(e) {
          a.verifyOptions(e, "scene to type", "msg::Message"),
            a.verifyParamValid("scene", e.scene, y, "msg::Message");
          var t = this;
          t.scene = p[e.scene],
            t.to = "" + e.to,
            t.type = h[e.type],
            t.resend = e.resend ? 1 : 0,
            e.resend ? (a.verifyOptions(e, "idClient", "msg::Message"), t.idClient = e.idClient) : t.idClient = a.guid(),
            u(e.text) && (t.body = "" + e.text),
            u(e.custom) && ("object" === (0, i["default"])(e.custom) ? (t.logger.warn("model::Message: custom should be JsonString, auto transfer"), t.custom = JSON.stringify(e.custom)) : t.custom = "" + e.custom),
            u(e.body) && (t.body = "" + e.body),
            u(e.pushContent) && (t.pushContent = "" + e.pushContent),
            u(e.pushPayload) && (t.pushPayload = "" + e.pushPayload);
          var n = e.apns;
          if (u(n) && "team" === e.scene) {
            var r = n.accounts;
            u(r) && a.verifyParamType("apns.accounts", r, "array", "msg::Message"),
              t.apnsAccounts = r ? JSON.stringify(r) : f,
              t.apnsContent = n.content || e.pushContent || "",
              a.verifyBooleanWithDefault(n, "forcePush", !0, "options.apns", "msg::Message"),
              t.apnsForcePush = n.forcePush ? 1 : 0
          }
          u(e.isHistoryable) && (t.isHistoryable = e.isHistoryable ? 1 : 0),
            u(e.isRoamingable) && (t.isRoamingable = e.isRoamingable ? 1 : 0),
            u(e.isSyncable) && (t.isSyncable = e.isSyncable ? 1 : 0),
            u(e.cc) && (t.cc = e.cc ? 1 : 0),
            u(e.isPushable) && (t.isPushable = e.isPushable ? 1 : 0),
            u(e.isOfflinable) && (t.isOfflinable = e.isOfflinable ? 1 : 0),
            u(e.isUnreadable) && (t.isUnreadable = e.isUnreadable ? 1 : 0),
            u(e.needPushNick) && (t.needPushNick = e.needPushNick ? 1 : 0),
            u(e.yidunEnable) && (t.yidunEnable = e.yidunEnable ? 1 : 0),
            u(e.antiSpamUsingYidun) && (t.antiSpamUsingYidun = e.antiSpamUsingYidun ? 1 : 0),
            u(e.antiSpamContent) && ("object" === (0, i["default"])(e.antiSpamContent) ? (t.logger.warn("model::Message: antiSpamContent should be JsonString, auto transfer"), t.antiSpamContent = JSON.stringify(e.antiSpamContent)) : t.antiSpamContent = "" + e.antiSpamContent),
            u(e.antiSpamBusinessId) && ("object" === (0, i["default"])(e.antiSpamBusinessId) ? (t.logger.warn("model::Message: antiSpamBusinessId should be JsonString, auto transfer"), t.antiSpamBusinessId = JSON.stringify(e.antiSpamBusinessId)) : t.antiSpamBusinessId = "" + e.antiSpamBusinessId)
        }
        var o = n(6),
          i = r(o),
          a = n(1),
          c = a.undef,
          u = a.notundef,
          l = a.exist,
          d = n(36),
          m = n(95),
          f = "#%@all@%#",
          p = {
            p2p: 0,
            team: 1
          },
          g = {
            0: "p2p",
            1: "team"
          },
          y = Object.keys(p),
          h = m.typeMap,
          v = m.validTypes;
        s.prototype.getScene = function () {
          return g[this.scene]
        },
          s.getScene = function (e) {
            var t = e.scene;
            return g[t] || t
          },
          s.getType = m.getType,
          s.reverse = function (e) {
            var t = g[e.scene],
              n = {
                scene: t || e.scene,
                from: e.from,
                fromNick: e.fromNick,
                fromClientType: d.reverseType(e.fromClientType),
                fromDeviceId: e.fromDeviceId,
                to: "" + e.to,
                time: +e.time,
                type: s.getType(e),
                text: l(e.body) ? e.body : "",
                isHistoryable: c(e.isHistoryable) || 1 === +e.isHistoryable,
                isRoamingable: c(e.isRoamingable) || 1 === +e.isRoamingable,
                isSyncable: c(e.isSyncable) || 1 === +e.isSyncable,
                cc: c(e.cc) || 1 === +e.cc,
                isPushable: c(e.isPushable) || 1 === +e.isPushable,
                isOfflinable: c(e.isOfflinable) || 1 === +e.isOfflinable,
                isUnreadable: c(e.isUnreadable) || 1 === +e.isUnreadable,
                needPushNick: c(e.needPushNick) || 1 === +e.needPushNick,
                isLocal: !1
              };
            if (u(e.isMuted) && (n.isMuted = 1 === +e.isMuted), u(e.resend) && (n.resend = 1 === +e.resend), u(e.idClient) && (n.idClient = e.idClient), u(e.idServer) && (n.idServer = "" + e.idServer), u(e.userUpdateTime) && (n.userUpdateTime = +e.userUpdateTime), u(e.custom) && (n.custom = e.custom), u(e.pushContent) && (n.pushContent = e.pushContent), u(e.pushPayload) && (n.pushPayload = e.pushPayload), u(e.apnsAccounts)) {
              if (n.apns = {},
                e.apnsAccounts !== f) {
                var r = e.apnsAccounts;
                try {
                  n.apns.accounts = JSON.parse(r)
                } catch (o) {
                  n.apns.accounts = []
                }
              }
              n.apns.content = e.apnsContent || "",
                n.apns.forcePush = 1 === +e.apnsForcePush
            }
            return n.status = e.status || "success",
              u(e.filter) && (n.filter = e.filter),
              n
          },
          s.setExtra = function (e, t) {
            e.target = s.getMsgTarget(e, t),
              e.sessionId = e.scene + "-" + e.target,
              m.setFlow(e, t)
          },
          s.getMsgTarget = function (e, t) {
            return "p2p" === e.scene ? e.to === t ? e.from : e.to : "team" === e.scene ? e.to : void 0
          },
          s.deduplication = function (e) {
            var t, n = {},
              r = [];
            return e.forEach(function (e) {
              t = e.idClient,
                n[t] || (n[t] = !0, r.push(e))
            }),
              r
          },
          s.sortMsgs = function (e) {
            return e = e.slice(0),
              a.sortObjArray(e, {
                sortPath: "time"
              }),
              e
          },
          s.getLastMsg = function (e) {
            return e = s.sortMsgs(e),
              e[e.length - 1]
          },
          s.getLastNotIgnoredMsg = function (e) {
            e = s.sortMsgs(e);
            for (var t = null,
              n = e.length - 1; n >= 0; n--) if (t = e[n], !t.ignore) return t;
            return null
          },
          s.getMaxTimetag = function (e) {
            return s.getLastMsg(e).time
          },
          s.validScenes = y,
          s.validTypes = v,
          e.exports = s
      },
      function (e, t, n) {
        var r = n(17);
        e.exports = function (e) {
          if (!r(e)) throw TypeError(e + " is not an object!");
          return e
        }
      },
      function (e, t, n) {
        var r = n(9),
          s = n(15),
          o = n(76),
          i = n(16),
          a = "prototype",
          c = function (e, t, n) {
            var u, l, d, m = e & c.F,
              f = e & c.G,
              p = e & c.S,
              g = e & c.P,
              y = e & c.B,
              h = e & c.W,
              v = f ? s : s[t] || (s[t] = {}),
              b = v[a],
              M = f ? r : p ? r[t] : (r[t] || {})[a];
            f && (n = t);
            for (u in n) l = !m && M && void 0 !== M[u],
              l && u in v || (d = l ? M[u] : n[u], v[u] = f && "function" != typeof M[u] ? n[u] : y && l ? o(d, r) : h && M[u] == d ?
                function (e) {
                  var t = function (t, n, r) {
                    if (this instanceof e) {
                      switch (arguments.length) {
                        case 0:
                          return new e;
                        case 1:
                          return new e(t);
                        case 2:
                          return new e(t, n)
                      }
                      return new e(t, n, r)
                    }
                    return e.apply(this, arguments)
                  };
                  return t[a] = e[a],
                    t
                }(d) : g && "function" == typeof d ? o(Function.call, d) : d, g && ((v.virtual || (v.virtual = {}))[u] = d, e & c.R && b && !b[u] && i(b, u, d)))
          };
        c.F = 1,
          c.G = 2,
          c.S = 4,
          c.P = 8,
          c.B = 16,
          c.W = 32,
          c.U = 64,
          c.R = 128,
          e.exports = c
      },
      function (e, t, n) {
        var r; (function (e, s) {
          (function () {
            "use strict";
            function o(e) {
              return e = String(e),
                e.charAt(0).toUpperCase() + e.slice(1)
            }
            function i(e, t, n) {
              var r = {
                "10.0": "10",
                6.4: "10 Technical Preview",
                6.3: "8.1",
                6.2: "8",
                6.1: "Server 2008 R2 / 7",
                "6.0": "Server 2008 / Vista",
                5.2: "Server 2003 / XP 64-bit",
                5.1: "XP",
                5.01: "2000 SP1",
                "5.0": "2000",
                "4.0": "NT",
                "4.90": "ME"
              };
              return t && n && /^Win/i.test(e) && !/^Windows Phone /i.test(e) && (r = r[/[\d.]+$/.exec(e)]) && (e = "Windows " + r),
                e = String(e),
                t && n && (e = e.replace(RegExp(t, "i"), n)),
                e = c(e.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
            }
            function a(e, t) {
              var n = -1,
                r = e ? e.length : 0;
              if ("number" == typeof r && r > -1 && r <= T) for (; ++n < r;) t(e[n], n, e);
              else u(e, t)
            }
            function c(e) {
              return e = p(e),
                /^(?:webOS|i(?:OS|P))/.test(e) ? e : o(e)
            }
            function u(e, t) {
              for (var n in e) w.call(e, n) && t(e[n], n, e)
            }
            function l(e) {
              return null == e ? o(e) : C.call(e).slice(8, -1)
            }
            function d(e, t) {
              var n = null != e ? typeof e[t] : "number";
              return !(/^(?:boolean|number|string|undefined)$/.test(n) || "object" == n && !e[t])
            }
            function m(e) {
              return String(e).replace(/([ -])(?!$)/g, "$1?")
            }
            function f(e, t) {
              var n = null;
              return a(e,
                function (r, s) {
                  n = t(n, r, s, e)
                }),
                n
            }
            function p(e) {
              return String(e).replace(/^ +| +$/g, "")
            }
            function g(e) {
              function t(t) {
                return f(t,
                  function (t, n) {
                    return t || RegExp("\\b" + (n.pattern || m(n)) + "\\b", "i").exec(e) && (n.label || n)
                  })
              }
              function n(t) {
                return f(t,
                  function (t, n, r) {
                    return t || (n[V] || n[/^[a-z]+(?: +[a-z]+\b)*/i.exec(V)] || RegExp("\\b" + m(r) + "(?:\\b|\\w*\\d)", "i").exec(e)) && r
                  })
              }
              function r(t) {
                return f(t,
                  function (t, n) {
                    return t || RegExp("\\b" + (n.pattern || m(n)) + "\\b", "i").exec(e) && (n.label || n)
                  })
              }
              function s(t) {
                return f(t,
                  function (t, n) {
                    var r = n.pattern || m(n);
                    return !t && (t = RegExp("\\b" + r + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(e)) && (t = i(t, r, n.label || n)),
                      t
                  })
              }
              function o(t) {
                return f(t,
                  function (t, n) {
                    var r = n.pattern || m(n);
                    return !t && (t = RegExp("\\b" + r + " *\\d+[.\\w_]*", "i").exec(e) || RegExp("\\b" + r + " *\\w+-[\\w]*", "i").exec(e) || RegExp("\\b" + r + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(e)) && ((t = String(n.label && !RegExp(r, "i").test(n.label) ? n.label : t).split("/"))[1] && !/[\d.]+/.test(t[0]) && (t[0] += " " + t[1]), n = n.label || n, t = c(t[0].replace(RegExp(r, "i"), n).replace(RegExp("; *(?:" + n + "[_-])?", "i"), " ").replace(RegExp("(" + n + ")[-_.]?(\\w)", "i"), "$1 $2"))),
                      t
                  })
              }
              function a(t) {
                return f(t,
                  function (t, n) {
                    return t || (RegExp(n + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(e) || 0)[1] || null
                  })
              }
              function y() {
                return this.description || ""
              }
              var v = h,
                b = e && "object" == typeof e && "String" != l(e);
              b && (v = e, e = null);
              var M = v.navigator || {},
                T = M.userAgent || "";
              e || (e = T);
              var k, w, O = b ? !!M.likeChrome : /\bChrome\b/.test(e) && !/internal|\n/i.test(C.toString()),
                _ = "Object",
                I = b ? _ : "ScriptBridgingProxyObject",
                x = b ? _ : "Environment",
                E = b && v.java ? "JavaPackage" : l(v.java),
                P = b ? _ : "RuntimeObject",
                A = /\bJava/.test(E) && v.java,
                R = A && l(v.environment) == x,
                j = A ? "a" : "α",
                F = A ? "b" : "β",
                N = v.document || {},
                U = v.operamini || v.opera,
                D = S.test(D = b && U ? U["[[Class]]"] : l(U)) ? D : U = null,
                L = e,
                B = [],
                q = null,
                W = e == T,
                H = W && U && "function" == typeof U.version && U.version(),
                $ = t([{
                  label: "EdgeHTML",
                  pattern: "Edge"
                },
                  "Trident", {
                  label: "WebKit",
                  pattern: "AppleWebKit"
                },
                  "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"]),
                X = r(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Electron", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", "K-Meleon", "Konqueror", "Lunascape", "Maxthon", {
                  label: "Microsoft Edge",
                  pattern: "Edge"
                },
                  "Midori", "Nook Browser", "PaleMoon", "PhantomJS", "Raven", "Rekonq", "RockMelt", {
                    label: "Samsung Internet",
                    pattern: "SamsungBrowser"
                  },
                  "SeaMonkey", {
                    label: "Silk",
                    pattern: "(?:Cloud9|Silk-Accelerated)"
                  },
                  "Sleipnir", "SlimBrowser", {
                    label: "SRWare Iron",
                    pattern: "Iron"
                  },
                  "Sunrise", "Swiftfox", "Waterfox", "WebPositive", "Opera Mini", {
                    label: "Opera Mini",
                    pattern: "OPiOS"
                  },
                  "Opera", {
                    label: "Opera",
                    pattern: "OPR"
                  },
                  "Chrome", {
                    label: "Chrome Mobile",
                    pattern: "(?:CriOS|CrMo)"
                  },
                  {
                    label: "Firefox",
                    pattern: "(?:Firefox|Minefield)"
                  },
                  {
                    label: "Firefox for iOS",
                    pattern: "FxiOS"
                  },
                  {
                    label: "IE",
                    pattern: "IEMobile"
                  },
                  {
                    label: "IE",
                    pattern: "MSIE"
                  },
                  "Safari"]),
                V = o([{
                  label: "BlackBerry",
                  pattern: "BB10"
                },
                  "BlackBerry", {
                  label: "Galaxy S",
                  pattern: "GT-I9000"
                },
                {
                  label: "Galaxy S2",
                  pattern: "GT-I9100"
                },
                {
                  label: "Galaxy S3",
                  pattern: "GT-I9300"
                },
                {
                  label: "Galaxy S4",
                  pattern: "GT-I9500"
                },
                {
                  label: "Galaxy S5",
                  pattern: "SM-G900"
                },
                {
                  label: "Galaxy S6",
                  pattern: "SM-G920"
                },
                {
                  label: "Galaxy S6 Edge",
                  pattern: "SM-G925"
                },
                {
                  label: "Galaxy S7",
                  pattern: "SM-G930"
                },
                {
                  label: "Galaxy S7 Edge",
                  pattern: "SM-G935"
                },
                  "Google TV", "Lumia", "iPad", "iPod", "iPhone", "Kindle", {
                  label: "Kindle Fire",
                  pattern: "(?:Cloud9|Silk-Accelerated)"
                },
                  "Nexus", "Nook", "PlayBook", "PlayStation Vita", "PlayStation", "TouchPad", "Transformer", {
                  label: "Wii U",
                  pattern: "WiiU"
                },
                  "Wii", "Xbox One", {
                  label: "Xbox 360",
                  pattern: "Xbox"
                },
                  "Xoom"]),
                J = n({
                  Apple: {
                    iPad: 1,
                    iPhone: 1,
                    iPod: 1
                  },
                  Archos: {},
                  Amazon: {
                    Kindle: 1,
                    "Kindle Fire": 1
                  },
                  Asus: {
                    Transformer: 1
                  },
                  "Barnes & Noble": {
                    Nook: 1
                  },
                  BlackBerry: {
                    PlayBook: 1
                  },
                  Google: {
                    "Google TV": 1,
                    Nexus: 1
                  },
                  HP: {
                    TouchPad: 1
                  },
                  HTC: {},
                  LG: {},
                  Microsoft: {
                    Xbox: 1,
                    "Xbox One": 1
                  },
                  Motorola: {
                    Xoom: 1
                  },
                  Nintendo: {
                    "Wii U": 1,
                    Wii: 1
                  },
                  Nokia: {
                    Lumia: 1
                  },
                  Samsung: {
                    "Galaxy S": 1,
                    "Galaxy S2": 1,
                    "Galaxy S3": 1,
                    "Galaxy S4": 1
                  },
                  Sony: {
                    PlayStation: 1,
                    "PlayStation Vita": 1
                  }
                }),
                G = s(["Windows Phone", "Android", "CentOS", {
                  label: "Chrome OS",
                  pattern: "CrOS"
                },
                  "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);
              if ($ && ($ = [$]), J && !V && (V = o([J])), (k = /\bGoogle TV\b/.exec(V)) && (V = k[0]), /\bSimulator\b/i.test(e) && (V = (V ? V + " " : "") + "Simulator"), "Opera Mini" == X && /\bOPiOS\b/.test(e) && B.push("running in Turbo/Uncompressed mode"), "IE" == X && /\blike iPhone OS\b/.test(e) ? (k = g(e.replace(/like iPhone OS/, "")), J = k.manufacturer, V = k.product) : /^iP/.test(V) ? (X || (X = "Safari"), G = "iOS" + ((k = / OS ([\d_]+)/i.exec(e)) ? " " + k[1].replace(/_/g, ".") : "")) : "Konqueror" != X || /buntu/i.test(G) ? J && "Google" != J && (/Chrome/.test(X) && !/\bMobile Safari\b/i.test(e) || /\bVita\b/.test(V)) || /\bAndroid\b/.test(G) && /^Chrome/.test(X) && /\bVersion\//i.test(e) ? (X = "Android Browser", G = /\bAndroid\b/.test(G) ? G : "Android") : "Silk" == X ? (/\bMobi/i.test(e) || (G = "Android", B.unshift("desktop mode")), /Accelerated *= *true/i.test(e) && B.unshift("accelerated")) : "PaleMoon" == X && (k = /\bFirefox\/([\d.]+)\b/.exec(e)) ? B.push("identifying as Firefox " + k[1]) : "Firefox" == X && (k = /\b(Mobile|Tablet|TV)\b/i.exec(e)) ? (G || (G = "Firefox OS"), V || (V = k[1])) : !X || (k = !/\bMinefield\b/i.test(e) && /\b(?:Firefox|Safari)\b/.exec(X)) ? (X && !V && /[\/,]|^[^(]+?\)/.test(e.slice(e.indexOf(k + "/") + 8)) && (X = null), (k = V || J || G) && (V || J || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(G)) && (X = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(G) ? G : k) + " Browser")) : "Electron" == X && (k = (/\bChrome\/([\d.]+)\b/.exec(e) || 0)[1]) && B.push("Chromium " + k) : G = "Kubuntu", H || (H = a(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", m(X), "(?:Firefox|Minefield|NetFront)"])), (k = "iCab" == $ && parseFloat(H) > 3 && "WebKit" || /\bOpera\b/.test(X) && (/\bOPR\b/.test(e) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(e) && !/^(?:Trident|EdgeHTML)$/.test($) && "WebKit" || !$ && /\bMSIE\b/i.test(e) && ("Mac OS" == G ? "Tasman" : "Trident") || "WebKit" == $ && /\bPlayStation\b(?! Vita\b)/i.test(X) && "NetFront") && ($ = [k]), "IE" == X && (k = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(e) || 0)[1]) ? (X += " Mobile", G = "Windows Phone " + (/\+$/.test(k) ? k : k + ".x"), B.unshift("desktop mode")) : /\bWPDesktop\b/i.test(e) ? (X = "IE Mobile", G = "Windows Phone 8.x", B.unshift("desktop mode"), H || (H = (/\brv:([\d.]+)/.exec(e) || 0)[1])) : "IE" != X && "Trident" == $ && (k = /\brv:([\d.]+)/.exec(e)) && (X && B.push("identifying as " + X + (H ? " " + H : "")), X = "IE", H = k[1]), W) {
                if (d(v, "global")) if (A && (k = A.lang.System, L = k.getProperty("os.arch"), G = G || k.getProperty("os.name") + " " + k.getProperty("os.version")), R) {
                  try {
                    H = v.require("ringo/engine").version.join("."),
                      X = "RingoJS"
                  } catch (K) {
                  (k = v.system) && k.global.system == v.system && (X = "Narwhal", G || (G = k[0].os || null))
                  }
                  X || (X = "Rhino")
                } else "object" == typeof v.process && !v.process.browser && (k = v.process) && ("object" == typeof k.versions && ("string" == typeof k.versions.electron ? (B.push("Node " + k.versions.node), X = "Electron", H = k.versions.electron) : "string" == typeof k.versions.nw && (B.push("Chromium " + H, "Node " + k.versions.node), X = "NW.js", H = k.versions.nw)), X || (X = "Node.js", L = k.arch, G = k.platform, H = /[\d.]+/.exec(k.version), H = H ? H[0] : null));
                else l(k = v.runtime) == I ? (X = "Adobe AIR", G = k.flash.system.Capabilities.os) : l(k = v.phantom) == P ? (X = "PhantomJS", H = (k = k.version || null) && k.major + "." + k.minor + "." + k.patch) : "number" == typeof N.documentMode && (k = /\bTrident\/(\d+)/i.exec(e)) ? (H = [H, N.documentMode], (k = +k[1] + 4) != H[1] && (B.push("IE " + H[1] + " mode"), $ && ($[1] = ""), H[1] = k), H = "IE" == X ? String(H[1].toFixed(1)) : H[0]) : "number" == typeof N.documentMode && /^(?:Chrome|Firefox)\b/.test(X) && (B.push("masking as " + X + " " + H), X = "IE", H = "11.0", $ = ["Trident"], G = "Windows");
                G = G && c(G)
              }
              if (H && (k = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(H) || /(?:alpha|beta)(?: ?\d)?/i.exec(e + ";" + (W && M.appMinorVersion)) || /\bMinefield\b/i.test(e) && "a") && (q = /b/i.test(k) ? "beta" : "alpha", H = H.replace(RegExp(k + "\\+?$"), "") + ("beta" == q ? F : j) + (/\d+\+?/.exec(k) || "")), "Fennec" == X || "Firefox" == X && /\b(?:Android|Firefox OS)\b/.test(G)) X = "Firefox Mobile";
              else if ("Maxthon" == X && H) H = H.replace(/\.[\d.]+/, ".x");
              else if (/\bXbox\b/i.test(V)) "Xbox 360" == V && (G = null),
                "Xbox 360" == V && /\bIEMobile\b/.test(e) && B.unshift("mobile mode");
              else if (!/^(?:Chrome|IE|Opera)$/.test(X) && (!X || V || /Browser|Mobi/.test(X)) || "Windows CE" != G && !/Mobi/i.test(e)) if ("IE" == X && W) try {
                null === v.external && B.unshift("platform preview")
              } catch (K) {
                B.unshift("embedded")
              } else (/\bBlackBerry\b/.test(V) || /\bBB10\b/.test(e)) && (k = (RegExp(V.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(e) || 0)[1] || H) ? (k = [k, /BB10/.test(e)], G = (k[1] ? (V = null, J = "BlackBerry") : "Device Software") + " " + k[0], H = null) : this != u && "Wii" != V && (W && U || /Opera/.test(X) && /\b(?:MSIE|Firefox)\b/i.test(e) || "Firefox" == X && /\bOS X (?:\d+\.){2,}/.test(G) || "IE" == X && (G && !/^Win/.test(G) && H > 5.5 || /\bWindows XP\b/.test(G) && H > 8 || 8 == H && !/\bTrident\b/.test(e))) && !S.test(k = g.call(u, e.replace(S, "") + ";")) && k.name && (k = "ing as " + k.name + ((k = k.version) ? " " + k : ""), S.test(X) ? (/\bIE\b/.test(k) && "Mac OS" == G && (G = null), k = "identify" + k) : (k = "mask" + k, X = D ? c(D.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(k) && (G = null), W || (H = null)), $ = ["Presto"], B.push(k));
              else X += " Mobile"; (k = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(e) || 0)[1]) && (k = [parseFloat(k.replace(/\.(\d)$/, ".0$1")), k], "Safari" == X && "+" == k[1].slice(- 1) ? (X = "WebKit Nightly", q = "alpha", H = k[1].slice(0, -1)) : H != k[1] && H != (k[2] = (/\bSafari\/([\d.]+\+?)/i.exec(e) || 0)[1]) || (H = null), k[1] = (/\bChrome\/([\d.]+)/i.exec(e) || 0)[1], 537.36 == k[0] && 537.36 == k[2] && parseFloat(k[1]) >= 28 && "WebKit" == $ && ($ = ["Blink"]), W && (O || k[1]) ? ($ && ($[1] = "like Chrome"), k = k[1] || (k = k[0], k < 530 ? 1 : k < 532 ? 2 : k < 532.05 ? 3 : k < 533 ? 4 : k < 534.03 ? 5 : k < 534.07 ? 6 : k < 534.1 ? 7 : k < 534.13 ? 8 : k < 534.16 ? 9 : k < 534.24 ? 10 : k < 534.3 ? 11 : k < 535.01 ? 12 : k < 535.02 ? "13+" : k < 535.07 ? 15 : k < 535.11 ? 16 : k < 535.19 ? 17 : k < 536.05 ? 18 : k < 536.1 ? 19 : k < 537.01 ? 20 : k < 537.11 ? "21+" : k < 537.13 ? 23 : k < 537.18 ? 24 : k < 537.24 ? 25 : k < 537.36 ? 26 : "Blink" != $ ? "27" : "28")) : ($ && ($[1] = "like Safari"), k = k[0], k = k < 400 ? 1 : k < 500 ? 2 : k < 526 ? 3 : k < 533 ? 4 : k < 534 ? "4+" : k < 535 ? 5 : k < 537 ? 6 : k < 538 ? 7 : k < 601 ? 8 : "8"), $ && ($[1] += " " + (k += "number" == typeof k ? ".x" : /[.+]/.test(k) ? "" : "+")), "Safari" == X && (!H || parseInt(H) > 45) && (H = k)),
                "Opera" == X && (k = /\bzbov|zvav$/.exec(G)) ? (X += " ", B.unshift("desktop mode"), "zvav" == k ? (X += "Mini", H = null) : X += "Mobile", G = G.replace(RegExp(" *" + k + "$"), "")) : "Safari" == X && /\bChrome\b/.exec($ && $[1]) && (B.unshift("desktop mode"), X = "Chrome Mobile", H = null, /\bOS X\b/.test(G) ? (J = "Apple", G = "iOS 4.3+") : G = null),
                H && 0 == H.indexOf(k = /[\d.]+$/.exec(G)) && e.indexOf("/" + k + "-") > -1 && (G = p(G.replace(k, ""))),
                $ && !/\b(?:Avant|Nook)\b/.test(X) && (/Browser|Lunascape|Maxthon/.test(X) || "Safari" != X && /^iOS/.test(G) && /\bSafari\b/.test($[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(X) && $[1]) && (k = $[$.length - 1]) && B.push(k),
                B.length && (B = ["(" + B.join("; ") + ")"]),
                J && V && V.indexOf(J) < 0 && B.push("on " + J),
                V && B.push((/^on /.test(B[B.length - 1]) ? "" : "on ") + V),
                G && (k = / ([\d.+]+)$/.exec(G), w = k && "/" == G.charAt(G.length - k[0].length - 1), G = {
                  architecture: 32,
                  family: k && !w ? G.replace(k[0], "") : G,
                  version: k ? k[1] : null,
                  toString: function () {
                    var e = this.version;
                    return this.family + (e && !w ? " " + e : "") + (64 == this.architecture ? " 64-bit" : "")
                  }
                }),
                (k = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(L)) && !/\bi686\b/i.test(L) ? (G && (G.architecture = 64, G.family = G.family.replace(RegExp(" *" + k), "")), X && (/\bWOW64\b/i.test(e) || W && /\w(?:86|32)$/.test(M.cpuClass || M.platform) && !/\bWin64; x64\b/i.test(e)) && B.unshift("32-bit")) : G && /^OS X/.test(G.family) && "Chrome" == X && parseFloat(H) >= 39 && (G.architecture = 64),
                e || (e = null);
              var z = {};
              return z.description = e,
                z.layout = $ && $[0],
                z.manufacturer = J,
                z.name = X,
                z.prerelease = q,
                z.product = V,
                z.ua = e,
                z.version = X && H,
                z.os = G || {
                  architecture: null,
                  family: null,
                  version: null,
                  toString: function () {
                    return "null"
                  }
                },
                z.parse = g,
                z.toString = y,
                z.version && B.unshift(H),
                z.name && B.unshift(X),
                G && X && (G != String(G).split(" ")[0] || G != X.split(" ")[0] && !V) && B.push(V ? "(" + G + ")" : "on " + G),
                B.length && (z.description = B.join(" ")),
                z
            }
            var y = {
              "function": !0,
              object: !0
            },
              h = y[typeof window] && window || this,
              v = y[typeof t] && t,
              b = y[typeof e] && e && !e.nodeType && e,
              M = v && b && "object" == typeof s && s; !M || M.global !== M && M.window !== M && M.self !== M || (h = M);
            var T = Math.pow(2, 53) - 1,
              S = /\bOpera/,
              k = Object.prototype,
              w = k.hasOwnProperty,
              C = k.toString,
              O = g();
            h.platform = O,
              r = function () {
                return O
              }.call(t, n, t, e),
              !(void 0 !== r && (e.exports = r))
          }).call(this)
        }).call(t, n(88)(e),
          function () {
            return this
          }())
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          this.mixin(e)
        }
        var s = n(1),
          o = s.undef,
          i = n(5),
          a = n(93),
          c = n(114),
          u = n(116),
          l = n(112),
          d = n(113),
          m = n(115);
        r.prototype.mixin = function (e) {
          var t = this;
          this.configMap = this.configMap || {},
            ["idMap", "cmdConfig", "packetConfig"].forEach(function (n) {
              t.configMap[n] = s.merge({},
                t.configMap[n], e.configMap && e.configMap[n])
            }),
            ["serializeMap", "unserializeMap"].forEach(function (n) {
              t[n] = s.merge({},
                t[n], e[n])
            })
        };
        var f = new r({
          configMap: a,
          serializeMap: c,
          unserializeMap: u
        }),
          p = new r({
            configMap: l,
            serializeMap: d,
            unserializeMap: m
          });
        r.getInstance = function (e) {
          switch (e) {
            case "IM":
              return f;
            case "Chatroom":
              return p
          }
        },
          r.prototype.createCmd = function () {
            var e = 1;
            return function (t, n) {
              var r = this,
                s = this.configMap.cmdConfig[t];
              return t = {
                SID: s.sid,
                CID: s.cid,
                SER: "heartbeat" === t ? 0 : e++
              },
                s.params && (t.Q = [], s.params.forEach(function (e) {
                  var s = e.type,
                    i = e.name,
                    a = e.entity,
                    c = n[i];
                  if (!o(c)) {
                    switch (s) {
                      case "PropertyArray":
                        s = "ArrayMable",
                          c = c.map(function (e) {
                            return {
                              t: "Property",
                              v: r.serialize(e, a)
                            }
                          });
                        break;
                      case "Property":
                        c = r.serialize(c, i);
                        break;
                      case "bool":
                        c = c ? "true" : "false"
                    }
                    t.Q.push({
                      t: s,
                      v: c
                    })
                  }
                })),
                t
            }
          }(),
          r.prototype.parseResponse = function (e) {
            var t = this,
              n = JSON.parse(e),
              r = {
                raw: n,
                rawStr: e,
                error: i.genError(n.code)
              },
              o = t.configMap.packetConfig[n.sid + "_" + n.cid];
            if (!o) return r.notFound = {
              sid: n.sid,
              cid: n.cid
            },
              r;
            var a = n.r,
              c = "notify" === o.service && !o.cmd;
            if (r.isNotify = c, c) {
              var u = n.r[1].headerPacket;
              if (o = t.configMap.packetConfig[u.sid + "_" + u.cid], a = n.r[1].body, !o) return r.notFound = {
                sid: u.sid,
                cid: u.cid
              },
                r
            }
            if (r.service = o.service, r.cmd = o.cmd, r.error) {
              var l = n.sid + "_" + n.cid;
              if (c && (l = u.sid + "_" + u.cid), r.error.cmd = r.cmd, r.error.callFunc = "protocol::parseResponse: " + l, 416 === r.error.code) {
                var d = a[0];
                d && (r.frequencyControlDuration = 1e3 * d)
              }
            }
            var m = !1;
            return r.error && o.trivialErrorCodes && (m = o.trivialErrorCodes.indexOf(r.error.code) !== -1),
              r.error && !m || !o.response || (r.content = {},
                o.response.forEach(function (e, o) {
                  var i = a[o];
                  if (!s.undef(i)) {
                    var u = e.type,
                      l = e.name,
                      d = e.entity || l;
                    switch (u) {
                      case "Property":
                        r.content[l] = t.unserialize(i, d);
                        break;
                      case "PropertyArray":
                        r.content[l] = [],
                          i.forEach(function (e) {
                            r.content[l].push(t.unserialize(e, d))
                          });
                        break;
                      case "KVArray":
                        r.content[l] = i;
                        break;
                      case "long":
                      case "Long":
                      case "byte":
                      case "Byte":
                      case "Number":
                        r.content[l] = +i;
                        break;
                      default:
                        r.content[l] = i
                    }
                    if (c && "msg" === l || "sysMsg" === l) {
                      var m = r.content[l];
                      s.isObject(m) && !m.idServer && (m.idServer = "" + n.r[0], m.type && "8" === m.type && m.deletedIdClient && (m.idServer = m.deletedIdClient))
                    }
                  }
                })),
              r
          },
          r.prototype.serialize = function (e, t) {
            var n = this.serializeMap[t],
              r = {};
            for (var s in n) e.hasOwnProperty(s) && (r[n[s]] = e[s]);
            return r
          },
          r.prototype.unserialize = function (e, t) {
            var n = this.unserializeMap[t],
              r = {};
            if (e) for (var s in n) e.hasOwnProperty(s) && (r[n[s]] = e[s]);
            return r
          },
          e.exports = r
      },
      function (e, t) {
        "use strict";
        t.__esModule = !0,
          t["default"] = function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }
      },
      function (e, t) {
        e.exports = function (e) {
          try {
            return !!e()
          } catch (t) {
            return !0
          }
        }
      },
      function (e, t) {
        e.exports = function (e, t) {
          return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
          }
        }
      },
      function (e, t) {
        var n = 0,
          r = Math.random();
        e.exports = function (e) {
          return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + r).toString(36))
        }
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          var t = this;
          s.verifyOptions(e, "teamId", "team::TeamMember"),
            s.verifyParamAtLeastPresentOne(e, "nickInTeam muteTeam muteNotiType custom", "team::TeamMember"),
            t.teamId = e.teamId,
            o(e.account) && (t.account = e.account),
            o(e.nickInTeam) && (t.nickInTeam = e.nickInTeam),
            o(e.muteNotiType) ? t.bits = e.muteNotiType : o(e.muteTeam) && (t.bits = 0, e.muteTeam && (t.bits += 1)),
            o(e.mute) && (t.mute = e.mute ? 1 : 0),
            o(e.custom) && (t.custom = "" + e.custom)
        }
        var s = n(1),
          o = s.notundef,
          i = s.fillPropertyWithDefault,
          a = {
            0: "normal",
            1: "owner",
            2: "manager"
          };
        r.reverse = function (e) {
          var t = s.copy(e);
          if (o(t.teamId) && (t.teamId = "" + t.teamId), o(t.type) && (t.type = a[t.type]), o(t.active) && (t.active = 1 === +t.active), o(t.valid) && (t.valid = 1 === +t.valid), o(t.mute) && (t.mute = 1 === +t.mute), o(t.joinTime) && (t.joinTime = +t.joinTime), o(t.updateTime) && (t.updateTime = +t.updateTime), o(t.bits)) {
            var n = t.bits;
            delete t.bits,
              t.muteTeam = !!(1 & n),
              t.muteNotiType = n
          }
          return o(t.teamId) && o(t.account) && (t.id = r.genId(t.teamId, t.account)),
            t
        },
          r.reverseMembers = function (e) {
            return e.map(function (e) {
              return r.reverse(e)
            })
          },
          r.fillProperties = function (e) {
            var t = i(e, "mute", !1),
              n = i(e, "custom", "");
            return t || n
          },
          r.genId = function (e, t) {
            return e + "-" + t
          },
          r.accounts2ids = function (e, t) {
            return t.map(function (t) {
              return r.genId(e, t)
            })
          },
          r.assembleMembers = function (e, t) {
            return s.isArray(t) || (t = [t]),
              t.map(function (t) {
                return r.assembleMember(e, t)
              })
          },
          r.assembleMember = function (e, t) {
            return {
              id: r.genId(e.teamId, t),
              account: t,
              teamId: e.teamId,
              type: "normal",
              nickInTeam: "",
              muteTeam: !1,
              mute: !1,
              joinTime: e.memberUpdateTime,
              updateTime: e.memberUpdateTime,
              active: !0,
              valid: !0
            }
          },
          r.assembleOwner = function (e) {
            var t = r.assembleMember(e, e.owner);
            return t.type = "owner",
              t
          },
          e.exports = r
      },
      function (module, exports, __webpack_require__) {
        var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__; (function (module) {
          /*! Socket.IO.js build:0.9.11, development. Copyright(c) 2011 LearnBoost <dev@learnboost.com> MIT Licensed */
          var io = module.exports;
          window.io ? module && (module.exports = io = window.io) : window.io = io,
            function () {
              if (function (e, t) {
                var n = e;
                n.version = "0.9.11",
                  n.protocol = 1,
                  n.transports = [],
                  n.j = [],
                  n.sockets = {},
                  n.connect = function (e, r) {
                    var s, o, i = n.util.parseUri(e);
                    t && t.location && (i.protocol = i.protocol || t.location.protocol.slice(0, -1), i.host = i.host || (t.document ? t.document.domain : t.location.hostname), i.port = i.port || t.location.port),
                      s = n.util.uniqueUri(i);
                    var a = {
                      host: i.host,
                      secure: "https" == i.protocol,
                      port: i.port || ("https" == i.protocol ? 443 : 80),
                      query: i.query || ""
                    };
                    return n.util.merge(a, r),
                      !a["force new connection"] && n.sockets[s] || (o = new n.Socket(a)),
                      !a["force new connection"] && o && (n.sockets[s] = o),
                      o = o || n.sockets[s],
                      o.of(i.path.length > 1 ? i.path : "")
                  }
              }(module.exports, window),
                function (e, t) {
                  var n = e.util = {},
                    r = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    s = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
                  n.parseUri = function (e) {
                    for (var t = r.exec(e || ""), n = {},
                      o = 14; o--;) n[s[o]] = t[o] || "";
                    return n
                  },
                    n.uniqueUri = function (e) {
                      var n = e.protocol,
                        r = e.host,
                        s = e.port;
                      return "document" in t ? (r = r || document.domain, s = s || ("https" == n && "https:" !== document.location.protocol ? 443 : document.location.port)) : (r = r || "localhost", s || "https" != n || (s = 443)),
                        (n || "http") + "://" + r + ":" + (s || 80)
                    },
                    n.query = function (e, t) {
                      var r = n.chunkQuery(e || ""),
                        s = [];
                      n.merge(r, n.chunkQuery(t || ""));
                      for (var o in r) r.hasOwnProperty(o) && s.push(o + "=" + r[o]);
                      return s.length ? "?" + s.join("&") : ""
                    },
                    n.chunkQuery = function (e) {
                      for (var t, n = {},
                        r = e.split("&"), s = 0, o = r.length; s < o; ++s) t = r[s].split("="),
                          t[0] && (n[t[0]] = t[1]);
                      return n
                    };
                  var o = !1;
                  n.load = function (e) {
                    return "document" in t && "complete" === document.readyState || o ? e() : void n.on(t, "load", e, !1)
                  },
                    n.on = function (e, t, n, r) {
                      e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener && e.addEventListener(t, n, r)
                    },
                    n.request = function (e) {
                      if (e && "undefined" != typeof XDomainRequest && !n.ua.hasCORS) return new XDomainRequest;
                      if ("undefined" != typeof XMLHttpRequest && (!e || n.ua.hasCORS)) return new XMLHttpRequest;
                      if (!e) try {
                        return new (window[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
                      } catch (t) { }
                      return null
                    },
                    "undefined" != typeof window && n.load(function () {
                      o = !0
                    }),
                    n.defer = function (e) {
                      return n.ua.webkit && "undefined" == typeof importScripts ? void n.load(function () {
                        setTimeout(e, 100)
                      }) : e()
                    },
                    n.merge = function (e, t, r, s) {
                      var o, i = s || [],
                        a = "undefined" == typeof r ? 2 : r;
                      for (o in t) t.hasOwnProperty(o) && n.indexOf(i, o) < 0 && ("object" == typeof e[o] && a ? n.merge(e[o], t[o], a - 1, i) : (e[o] = t[o], i.push(t[o])));
                      return e
                    },
                    n.mixin = function (e, t) {
                      n.merge(e.prototype, t.prototype)
                    },
                    n.inherit = function (e, t) {
                      function n() { }
                      n.prototype = t.prototype,
                        e.prototype = new n
                    },
                    n.isArray = Array.isArray ||
                    function (e) {
                      return "[object Array]" === Object.prototype.toString.call(e)
                    },
                    n.intersect = function (e, t) {
                      for (var r = [], s = e.length > t.length ? e : t, o = e.length > t.length ? t : e, i = 0, a = o.length; i < a; i++)~n.indexOf(s, o[i]) && r.push(o[i]);
                      return r
                    },
                    n.indexOf = function (e, t, n) {
                      for (var r = e.length,
                        n = n < 0 ? n + r < 0 ? 0 : n + r : n || 0; n < r && e[n] !== t; n++);
                      return r <= n ? -1 : n
                    },
                    n.toArray = function (e) {
                      for (var t = [], n = 0, r = e.length; n < r; n++) t.push(e[n]);
                      return t
                    },
                    n.ua = {},
                    n.ua.hasCORS = "undefined" != typeof XMLHttpRequest &&
                    function () {
                      try {
                        var e = new XMLHttpRequest
                      } catch (t) {
                        return !1
                      }
                      return void 0 != e.withCredentials
                    }(),
                    n.ua.webkit = "undefined" != typeof navigator && /webkit/i.test(navigator.userAgent),
                    n.ua.iDevice = "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent)
                }("undefined" != typeof io ? io : module.exports, window),
                function (e, t) {
                  function n() { }
                  e.EventEmitter = n,
                    n.prototype.on = function (e, n) {
                      return this.$events || (this.$events = {}),
                        this.$events[e] ? t.util.isArray(this.$events[e]) ? this.$events[e].push(n) : this.$events[e] = [this.$events[e], n] : this.$events[e] = n,
                        this
                    },
                    n.prototype.addListener = n.prototype.on,
                    n.prototype.once = function (e, t) {
                      function n() {
                        r.removeListener(e, n),
                          t.apply(this, arguments)
                      }
                      var r = this;
                      return n.listener = t,
                        this.on(e, n),
                        this
                    },
                    n.prototype.removeListener = function (e, n) {
                      if (this.$events && this.$events[e]) {
                        var r = this.$events[e];
                        if (t.util.isArray(r)) {
                          for (var s = -1,
                            o = 0,
                            i = r.length; o < i; o++) if (r[o] === n || r[o].listener && r[o].listener === n) {
                              s = o;
                              break
                            }
                          if (s < 0) return this;
                          r.splice(s, 1),
                            r.length || delete this.$events[e]
                        } else (r === n || r.listener && r.listener === n) && delete this.$events[e]
                      }
                      return this
                    },
                    n.prototype.removeAllListeners = function (e) {
                      return void 0 === e ? (this.$events = {},
                        this) : (this.$events && this.$events[e] && (this.$events[e] = null), this)
                    },
                    n.prototype.listeners = function (e) {
                      return this.$events || (this.$events = {}),
                        this.$events[e] || (this.$events[e] = []),
                        t.util.isArray(this.$events[e]) || (this.$events[e] = [this.$events[e]]),
                        this.$events[e]
                    },
                    n.prototype.emit = function (e) {
                      if (!this.$events) return !1;
                      var n = this.$events[e];
                      if (!n) return !1;
                      var r = Array.prototype.slice.call(arguments, 1);
                      if ("function" == typeof n) n.apply(this, r);
                      else {
                        if (!t.util.isArray(n)) return !1;
                        for (var s = n.slice(), o = 0, i = s.length; o < i; o++) s[o].apply(this, r)
                      }
                      return !0
                    }
                }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports),
                function (exports, nativeJSON) {
                  "use strict";
                  function f(e) {
                    return e < 10 ? "0" + e : e
                  }
                  function date(e, t) {
                    return isFinite(e.valueOf()) ? e.getUTCFullYear() + "-" + f(e.getUTCMonth() + 1) + "-" + f(e.getUTCDate()) + "T" + f(e.getUTCHours()) + ":" + f(e.getUTCMinutes()) + ":" + f(e.getUTCSeconds()) + "Z" : null
                  }
                  function quote(e) {
                    return escapable.lastIndex = 0,
                      escapable.test(e) ? '"' + e.replace(escapable,
                        function (e) {
                          var t = meta[e];
                          return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(- 4)
                        }) + '"' : '"' + e + '"'
                  }
                  function str(e, t) {
                    var n, r, s, o, i, a = gap,
                      c = t[e];
                    switch (c instanceof Date && (c = date(e)), "function" == typeof rep && (c = rep.call(t, e, c)), typeof c) {
                      case "string":
                        return quote(c);
                      case "number":
                        return isFinite(c) ? String(c) : "null";
                      case "boolean":
                      case "null":
                        return String(c);
                      case "object":
                        if (!c) return "null";
                        if (gap += indent, i = [], "[object Array]" === Object.prototype.toString.apply(c)) {
                          for (o = c.length, n = 0; n < o; n += 1) i[n] = str(n, c) || "null";
                          return s = 0 === i.length ? "[]" : gap ? "[\n" + gap + i.join(",\n" + gap) + "\n" + a + "]" : "[" + i.join(",") + "]",
                            gap = a,
                            s
                        }
                        if (rep && "object" == typeof rep) for (o = rep.length, n = 0; n < o; n += 1)"string" == typeof rep[n] && (r = rep[n], s = str(r, c), s && i.push(quote(r) + (gap ? ": " : ":") + s));
                        else for (r in c) Object.prototype.hasOwnProperty.call(c, r) && (s = str(r, c), s && i.push(quote(r) + (gap ? ": " : ":") + s));
                        return s = 0 === i.length ? "{}" : gap ? "{\n" + gap + i.join(",\n" + gap) + "\n" + a + "}" : "{" + i.join(",") + "}",
                          gap = a,
                          s
                    }
                  }
                  if (nativeJSON && nativeJSON.parse) return exports.JSON = {
                    parse: nativeJSON.parse,
                    stringify: nativeJSON.stringify
                  };
                  var JSON = exports.JSON = {},
                    cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                    gap, indent, meta = {
                      "\b": "\\b",
                      "\t": "\\t",
                      "\n": "\\n",
                      "\f": "\\f",
                      "\r": "\\r",
                      '"': '\\"',
                      "\\": "\\\\"
                    },
                    rep;
                  JSON.stringify = function (e, t, n) {
                    var r;
                    if (gap = "", indent = "", "number" == typeof n) for (r = 0; r < n; r += 1) indent += " ";
                    else "string" == typeof n && (indent = n);
                    if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("socket.io:: replacer cannot JSON.stringify");
                    return str("", {
                      "": e
                    })
                  },
                    JSON.parse = function (text, reviver) {
                      function walk(e, t) {
                        var n, r, s = e[t];
                        if (s && "object" == typeof s) for (n in s) Object.prototype.hasOwnProperty.call(s, n) && (r = walk(s, n), void 0 !== r ? s[n] = r : delete s[n]);
                        return reviver.call(e, t, s)
                      }
                      var j;
                      if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx,
                        function (e) {
                          return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(- 4)
                        })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"),
                          "function" == typeof reviver ? walk({
                            "": j
                          },
                            "") : j;
                      throw new SyntaxError("socket.io:: reviver cannot JSON.parse")
                    }
                }("undefined" != typeof io ? io : module.exports, "undefined" != typeof JSON ? JSON : void 0),
                function (e, t) {
                  var n = e.parser = {},
                    r = n.packets = ["disconnect", "connect", "heartbeat", "message", "json", "event", "ack", "error", "noop"],
                    s = n.reasons = ["transport not supported", "client not handshaken", "unauthorized"],
                    o = n.advice = ["reconnect"],
                    i = t.JSON,
                    a = t.util.indexOf;
                  n.encodePacket = function (e) {
                    var t = a(r, e.type),
                      n = e.id || "",
                      c = e.endpoint || "",
                      u = e.ack,
                      l = null;
                    switch (e.type) {
                      case "error":
                        var d = e.reason ? a(s, e.reason) : "",
                          m = e.advice ? a(o, e.advice) : "";
                        "" === d && "" === m || (l = d + ("" !== m ? "+" + m : ""));
                        break;
                      case "message":
                        "" !== e.data && (l = e.data);
                        break;
                      case "event":
                        var f = {
                          name: e.name
                        };
                        e.args && e.args.length && (f.args = e.args),
                          l = i.stringify(f);
                        break;
                      case "json":
                        l = i.stringify(e.data);
                        break;
                      case "connect":
                        e.qs && (l = e.qs);
                        break;
                      case "ack":
                        l = e.ackId + (e.args && e.args.length ? "+" + i.stringify(e.args) : "")
                    }
                    var p = [t, n + ("data" == u ? "+" : ""), c];
                    return null !== l && void 0 !== l && p.push(l),
                      p.join(":")
                  },
                    n.encodePayload = function (e) {
                      var t = "";
                      if (1 == e.length) return e[0];
                      for (var n = 0,
                        r = e.length; n < r; n++) {
                        var s = e[n];
                        t += "�" + s.length + "�" + e[n]
                      }
                      return t
                    };
                  var c = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;
                  n.decodePacket = function (e) {
                    var t = e.match(c);
                    if (!t) return {};
                    var n = t[2] || "",
                      e = t[5] || "",
                      a = {
                        type: r[t[1]],
                        endpoint: t[4] || ""
                      };
                    switch (n && (a.id = n, t[3] ? a.ack = "data" : a.ack = !0), a.type) {
                      case "error":
                        var t = e.split("+");
                        a.reason = s[t[0]] || "",
                          a.advice = o[t[1]] || "";
                        break;
                      case "message":
                        a.data = e || "";
                        break;
                      case "event":
                        try {
                          var u = i.parse(e);
                          a.name = u.name,
                            a.args = u.args
                        } catch (l) { }
                        a.args = a.args || [];
                        break;
                      case "json":
                        try {
                          a.data = i.parse(e)
                        } catch (l) { }
                        break;
                      case "connect":
                        a.qs = e || "";
                        break;
                      case "ack":
                        var t = e.match(/^([0-9]+)(\+)?(.*)/);
                        if (t && (a.ackId = t[1], a.args = [], t[3])) try {
                          a.args = t[3] ? i.parse(t[3]) : []
                        } catch (l) { }
                        break;
                      case "disconnect":
                      case "heartbeat":
                    }
                    return a
                  },
                    n.decodePayload = function (e) {
                      var t = function (e, t) {
                        for (var n = 0,
                          r = e; r < t.length; r++) {
                          if ("�" == t.charAt(r)) return n;
                          n++
                        }
                        return n
                      };
                      if ("�" == e.charAt(0)) {
                        for (var r = [], s = 1, o = ""; s < e.length; s++) if ("�" == e.charAt(s)) {
                          var i = e.substr(s + 1).substr(0, o);
                          if ("�" != e.charAt(s + 1 + Number(o)) && s + 1 + Number(o) != e.length) {
                            var a = Number(o);
                            l = t(s + a + 1, e),
                              i = e.substr(s + 1).substr(0, a + l),
                              s += l
                          }
                          r.push(n.decodePacket(i)),
                            s += Number(o) + 1,
                            o = ""
                        } else o += e.charAt(s);
                        return r
                      }
                      return [n.decodePacket(e)]
                    }
                }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports),
                function (e, t) {
                  function n(e, t) {
                    this.socket = e,
                      this.sessid = t
                  }
                  e.Transport = n,
                    t.util.mixin(n, t.EventEmitter),
                    n.prototype.heartbeats = function () {
                      return !0
                    },
                    n.prototype.onData = function (e) {
                      if (this !== this.socket.transport) return this;
                      if (this.clearCloseTimeout(), (this.socket.connected || this.socket.connecting || this.socket.reconnecting) && this.setCloseTimeout(), "" !== e) {
                        var n = t.parser.decodePayload(e);
                        if (n && n.length) for (var r = 0,
                          s = n.length; r < s; r++) this.onPacket(n[r])
                      }
                      return this
                    },
                    n.prototype.onPacket = function (e) {
                      return this.socket.setHeartbeatTimeout(),
                        "heartbeat" == e.type ? this.onHeartbeat() : ("connect" == e.type && "" == e.endpoint && this.onConnect(), "error" == e.type && "reconnect" == e.advice && (this.isOpen = !1), this.socket.onPacket(e), this)
                    },
                    n.prototype.setCloseTimeout = function () {
                      if (!this.closeTimeout) {
                        var e = this;
                        this.closeTimeout = setTimeout(function () {
                          e.onDisconnect()
                        },
                          this.socket.closeTimeout)
                      }
                    },
                    n.prototype.onDisconnect = function () {
                      return this.isOpen && this.close(),
                        this.clearTimeouts(),
                        this.socket.transport === this ? this.socket.onDisconnect() : this.socket.setBuffer(!1),
                        this
                    },
                    n.prototype.onConnect = function () {
                      return this.socket.onConnect(),
                        this
                    },
                    n.prototype.clearCloseTimeout = function () {
                      this.closeTimeout && (clearTimeout(this.closeTimeout), this.closeTimeout = null)
                    },
                    n.prototype.clearTimeouts = function () {
                      this.clearCloseTimeout(),
                        this.reopenTimeout && clearTimeout(this.reopenTimeout)
                    },
                    n.prototype.packet = function (e) {
                      this.send(t.parser.encodePacket(e))
                    },
                    n.prototype.onHeartbeat = function (e) {
                      this.packet({
                        type: "heartbeat"
                      })
                    },
                    n.prototype.onOpen = function () {
                      this.isOpen = !0,
                        this.clearCloseTimeout(),
                        this.socket.onOpen()
                    },
                    n.prototype.onClose = function () {
                      this.isOpen = !1,
                        this.socket.transport === this ? this.socket.onClose() : this.socket.setBuffer(!1),
                        this.onDisconnect()
                    },
                    n.prototype.prepareUrl = function () {
                      var e = this.socket.options;
                      return this.scheme() + "://" + e.host + ":" + e.port + "/" + e.resource + "/" + t.protocol + "/" + this.name + "/" + this.sessid
                    },
                    n.prototype.ready = function (e, t) {
                      t.call(this)
                    }
                }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports),
                function (e, t, n) {
                  function r(e) {
                    if (this.options = {
                      port: 80,
                      secure: !1,
                      document: "document" in n && document,
                      resource: "socket.io",
                      transports: e.transports || t.transports,
                      "connect timeout": 1e4,
                      "try multiple transports": !0,
                      reconnect: !0,
                      "reconnection delay": 500,
                      "reconnection limit": 1 / 0,
                      "reopen delay": 3e3,
                      "max reconnection attempts": 10,
                      "sync disconnect on unload": !1,
                      "auto connect": !0,
                      "flash policy port": 10843,
                      manualFlush: !1
                    },
                      t.util.merge(this.options, e), this.connected = !1, this.open = !1, this.connecting = !1, this.reconnecting = !1, this.namespaces = {},
                      this.buffer = [], this.doBuffer = !1, this.options["sync disconnect on unload"] && (!this.isXDomain() || t.util.ua.hasCORS)) {
                      var r = this;
                      t.util.on(n, "beforeunload",
                        function () {
                          r.disconnectSync()
                        },
                        !1)
                    }
                    this.options["auto connect"] && this.connect()
                  }
                  function s() { }
                  e.Socket = r,
                    t.util.mixin(r, t.EventEmitter),
                    r.prototype.of = function (e) {
                      return this.namespaces[e] || (this.namespaces[e] = new t.SocketNamespace(this, e), "" !== e && this.namespaces[e].packet({
                        type: "connect"
                      })),
                        this.namespaces[e]
                    },
                    r.prototype.publish = function () {
                      this.emit.apply(this, arguments);
                      var e;
                      for (var t in this.namespaces) this.namespaces.hasOwnProperty(t) && (e = this.of(t), e.$emit.apply(e, arguments))
                    },
                    r.prototype.handshake = function (e) {
                      function n(t) {
                        t instanceof Error ? (r.connecting = !1, r.onError(t.message)) : (console.log("D handshake success " + t), e.apply(null, t.split(":")))
                      }
                      var r = this,
                        o = this.options,
                        i = ["http" + (o.secure ? "s" : "") + ":/", o.host + ":" + o.port, o.resource, t.protocol, t.util.query(this.options.query, "t=" + +new Date)].join("/");
                      if (this.isXDomain() && !t.util.ua.hasCORS) {
                        var a = document.getElementsByTagName("script")[0],
                          c = document.createElement("script");
                        c.src = i + "&jsonp=" + t.j.length,
                          c.onreadystatechange = function () {
                            "loaded" == this.readyState && c.parentNode && (c.parentNode.removeChild(c), r.connecting = !1, !r.reconnecting && r.onError("Server down or port not open"), r.publish("handshake_failed"))
                          },
                          a.parentNode.insertBefore(c, a),
                          t.j.push(function (e) {
                            n(e),
                              c.parentNode.removeChild(c)
                          })
                      } else {
                        var u = t.util.request();
                        u.open("GET", i, !0),
                          u.timeout = 1e4,
                          this.isXDomain() && (u.withCredentials = !0),
                          u.onreadystatechange = function () {
                            4 == u.readyState && (u.onreadystatechange = s, 200 == u.status ? n(u.responseText) : 403 == u.status ? (r.onError(u.responseText), r.publish("handshake_failed")) : (r.connecting = !1, !r.reconnecting && r.onError(u.responseText), r.publish("handshake_failed")))
                          },
                          u.ontimeout = function (e) {
                            r.connecting = !1,
                              !r.reconnecting && r.onError(u.responseText),
                              r.publish("handshake_failed")
                          },
                          u.send(null)
                      }
                    },
                    r.prototype.connect = function (e) {
                      if (this.connecting) return this;
                      var n = this;
                      return n.connecting = !0,
                        this.handshake(function (r, s, o, i) {
                          n.sessionid = r,
                            n.closeTimeout = 1e3 * o,
                            n.heartbeatTimeout = 1e3 * s,
                            n.transports || (n.transports = n.origTransports = i ? t.util.intersect(i.split(","), n.options.transports) : n.options.transports),
                            console.log("D options transports: " + n.options.transports),
                            console.log("D transports: " + n.transports),
                            n.setHeartbeatTimeout(),
                            n.once("connect",
                              function () {
                                clearTimeout(n.connectTimeoutTimer),
                                  n.connectTimeoutTimer = null,
                                  e && "function" == typeof e && e()
                              }),
                            n.doConnect()
                        }),
                        this
                    },
                    r.prototype.doConnect = function () {
                      var e = this;
                      return e.transport && e.transport.clearTimeouts(),
                        e.transport = e.getTransport(e.transports),
                        e.transport ? void e.transport.ready(e,
                          function () {
                            e.connecting = !0,
                              e.publish("connecting", e.transport.name),
                              e.transport.open(),
                              e.options["connect timeout"] && (e.connectTimeoutTimer && clearTimeout(e.connectTimeoutTimer), e.connectTimeoutTimer = setTimeout(e.tryNextTransport.bind(e), e.options["connect timeout"]))
                          }) : e.publish("connect_failed")
                    },
                    r.prototype.getTransport = function (e) {
                      for (var n, r = e || this.transports,
                        s = 0; n = r[s]; s++) if (console.log("D check " + n + " " + t.Transport[n].check(this) + " , cors " + t.Transport[n].xdomainCheck(this)), t.Transport[n] && t.Transport[n].check(this) && (!this.isXDomain() || t.Transport[n].xdomainCheck(this))) {
                          var o = new t.Transport[n](this, this.sessionid);
                          return o
                        }
                      return null
                    },
                    r.prototype.tryNextTransport = function () {
                      console.log("D try next transport");
                      var e = this;
                      if (!e.connected && (e.connecting = !1, e.options["try multiple transports"])) {
                        for (var t = e.transports; t.length > 0 && t.splice(0, 1)[0] != e.transport.name;);
                        t.length ? e.doConnect() : e.publish("connect_failed")
                      }
                    },
                    r.prototype.setHeartbeatTimeout = function () {
                      if (clearTimeout(this.heartbeatTimeoutTimer), !this.transport || this.transport.heartbeats()) {
                        var e = this;
                        this.heartbeatTimeoutTimer = setTimeout(function () {
                          e.transport && e.transport.onClose()
                        },
                          this.heartbeatTimeout)
                      }
                    },
                    r.prototype.packet = function (e) {
                      return this.connected && !this.doBuffer ? this.transport.packet(e) : this.buffer.push(e),
                        this
                    },
                    r.prototype.setBuffer = function (e) {
                      this.doBuffer = e,
                        !e && this.connected && this.buffer.length && (this.options.manualFlush || this.flushBuffer())
                    },
                    r.prototype.flushBuffer = function () {
                      this.transport.payload(this.buffer),
                        this.buffer = []
                    },
                    r.prototype.disconnect = function () {
                      return (this.connected || this.connecting) && (this.open && this.of("").packet({
                        type: "disconnect"
                      }), this.onDisconnect("booted")),
                        this
                    },
                    r.prototype.disconnectSync = function () {
                      var e = t.util.request(),
                        n = ["http" + (this.options.secure ? "s" : "") + ":/", this.options.host + ":" + this.options.port, this.options.resource, t.protocol, "", this.sessionid].join("/") + "/?disconnect=1";
                      e.open("GET", n, !1),
                        e.send(null),
                        this.onDisconnect("booted")
                    },
                    r.prototype.isXDomain = function () {
                      var e = n.location.port || ("https:" == n.location.protocol ? 443 : 80);
                      return this.options.host !== n.location.hostname || this.options.port != e
                    },
                    r.prototype.onConnect = function () {
                      this.connected || (this.connected = !0, this.connecting = !1, this.doBuffer || this.setBuffer(!1), this.emit("connect"))
                    },
                    r.prototype.onOpen = function () {
                      this.open = !0
                    },
                    r.prototype.onClose = function () {
                      this.open = !1,
                        clearTimeout(this.heartbeatTimeoutTimer)
                    },
                    r.prototype.onPacket = function (e) {
                      this.of(e.endpoint).onPacket(e)
                    },
                    r.prototype.onError = function (e) {
                      e && e.advice && "reconnect" === e.advice && (this.connected || this.connecting) && (this.disconnect(), this.options.reconnect && this.reconnect()),
                        this.publish("error", e && e.reason ? e.reason : e)
                    },
                    r.prototype.onDisconnect = function (e) {
                      var t = this.connected,
                        n = this.connecting;
                      this.connected = !1,
                        this.connecting = !1,
                        this.open = !1,
                        (t || n) && (this.transport.close(), this.transport.clearTimeouts(), t && (this.publish("disconnect", e), "booted" != e && this.options.reconnect && !this.reconnecting && this.reconnect()), n && this.tryNextTransport())
                    },
                    r.prototype.reconnect = function () {
                      function e() {
                        if (n.connected) {
                          for (var e in n.namespaces) n.namespaces.hasOwnProperty(e) && "" !== e && n.namespaces[e].packet({
                            type: "connect"
                          });
                          n.publish("reconnect", n.transport.name, n.reconnectionAttempts)
                        }
                        clearTimeout(n.reconnectionTimer),
                          n.removeListener("connect_failed", t),
                          n.removeListener("connect", t),
                          n.reconnecting = !1,
                          delete n.reconnectionAttempts,
                          delete n.reconnectionDelay,
                          delete n.reconnectionTimer,
                          delete n.redoTransports,
                          n.options["try multiple transports"] = s
                      }
                      function t() {
                        if (n.reconnecting) return n.connected ? e() : n.connecting && n.reconnecting ? n.reconnectionTimer = setTimeout(t, 1e3) : void (n.reconnectionAttempts++ >= r ? n.redoTransports ? (n.publish("reconnect_failed"), e()) : (n.on("connect_failed", t), n.options["try multiple transports"] = !0, n.transports = n.origTransports, n.transport = n.getTransport(), n.redoTransports = !0, n.connect()) : (n.reconnectionDelay < o && (n.reconnectionDelay *= 2), n.connect(), n.publish("reconnecting", n.reconnectionDelay, n.reconnectionAttempts), n.reconnectionTimer = setTimeout(t, n.reconnectionDelay)))
                      }
                      this.reconnecting = !0,
                        this.reconnectionAttempts = 0,
                        this.reconnectionDelay = this.options["reconnection delay"];
                      var n = this,
                        r = this.options["max reconnection attempts"],
                        s = this.options["try multiple transports"],
                        o = this.options["reconnection limit"];
                      this.options["try multiple transports"] = !1,
                        this.reconnectionTimer = setTimeout(t, this.reconnectionDelay),
                        this.on("connect", t)
                    }
                }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports, window),
                function (e, t) {
                  function n(e, t) {
                    this.socket = e,
                      this.name = t || "",
                      this.flags = {},
                      this.json = new r(this, "json"),
                      this.ackPackets = 0,
                      this.acks = {}
                  }
                  function r(e, t) {
                    this.namespace = e,
                      this.name = t
                  }
                  e.SocketNamespace = n,
                    t.util.mixin(n, t.EventEmitter),
                    n.prototype.$emit = t.EventEmitter.prototype.emit,
                    n.prototype.of = function () {
                      return this.socket.of.apply(this.socket, arguments)
                    },
                    n.prototype.packet = function (e) {
                      return e.endpoint = this.name,
                        this.socket.packet(e),
                        this.flags = {},
                        this
                    },
                    n.prototype.send = function (e, t) {
                      var n = {
                        type: this.flags.json ? "json" : "message",
                        data: e
                      };
                      return "function" == typeof t && (n.id = ++this.ackPackets, n.ack = !0, this.acks[n.id] = t),
                        this.packet(n)
                    },
                    n.prototype.emit = function (e) {
                      var t = Array.prototype.slice.call(arguments, 1),
                        n = t[t.length - 1],
                        r = {
                          type: "event",
                          name: e
                        };
                      return "function" == typeof n && (r.id = ++this.ackPackets, r.ack = "data", this.acks[r.id] = n, t = t.slice(0, t.length - 1)),
                        r.args = t,
                        this.packet(r)
                    },
                    n.prototype.disconnect = function () {
                      return "" === this.name ? this.socket.disconnect() : (this.packet({
                        type: "disconnect"
                      }), this.$emit("disconnect")),
                        this
                    },
                    n.prototype.onPacket = function (e) {
                      function n() {
                        r.packet({
                          type: "ack",
                          args: t.util.toArray(arguments),
                          ackId: e.id
                        })
                      }
                      var r = this;
                      switch (e.type) {
                        case "connect":
                          this.$emit("connect");
                          break;
                        case "disconnect":
                          "" === this.name ? this.socket.onDisconnect(e.reason || "booted") : this.$emit("disconnect", e.reason);
                          break;
                        case "message":
                        case "json":
                          var s = ["message", e.data];
                          "data" == e.ack ? s.push(n) : e.ack && this.packet({
                            type: "ack",
                            ackId: e.id
                          }),
                            this.$emit.apply(this, s);
                          break;
                        case "event":
                          var s = [e.name].concat(e.args);
                          "data" == e.ack && s.push(n),
                            this.$emit.apply(this, s);
                          break;
                        case "ack":
                          this.acks[e.ackId] && (this.acks[e.ackId].apply(this, e.args), delete this.acks[e.ackId]);
                          break;
                        case "error":
                          e.advice ? this.socket.onError(e) : "unauthorized" == e.reason ? this.$emit("connect_failed", e.reason) : this.$emit("error", e.reason)
                      }
                    },
                    r.prototype.send = function () {
                      this.namespace.flags[this.name] = !0,
                        this.namespace.send.apply(this.namespace, arguments)
                    },
                    r.prototype.emit = function () {
                      this.namespace.flags[this.name] = !0,
                        this.namespace.emit.apply(this.namespace, arguments)
                    }
                }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports),
                function (e, t, n) {
                  function r(e) {
                    t.Transport.apply(this, arguments)
                  }
                  e.websocket = r,
                    t.util.inherit(r, t.Transport),
                    r.prototype.name = "websocket",
                    r.prototype.open = function () {
                      var e, r = t.util.query(this.socket.options.query),
                        s = this;
                      return e || (e = n.MozWebSocket || n.WebSocket),
                        this.websocket = new e(this.prepareUrl() + r),
                        this.websocket.onopen = function () {
                          s.onOpen(),
                            s.socket.setBuffer(!1)
                        },
                        this.websocket.onmessage = function (e) {
                          s.onData(e.data)
                        },
                        this.websocket.onclose = function () {
                          s.socket.setBuffer(!0),
                            s.onClose()
                        },
                        this.websocket.onerror = function (e) {
                          s.onError(e)
                        },
                        this
                    },
                    t.util.ua.iDevice ? r.prototype.send = function (e) {
                      var t = this;
                      return setTimeout(function () {
                        t.websocket.send(e)
                      },
                        0),
                        this
                    } : r.prototype.send = function (e) {
                      return this.websocket.send(e),
                        this
                    },
                    r.prototype.payload = function (e) {
                      for (var t = 0,
                        n = e.length; t < n; t++) this.packet(e[t]);
                      return this
                    },
                    r.prototype.close = function () {
                      return this.websocket.close(),
                        this
                    },
                    r.prototype.onError = function (e) {
                      this.socket.onError(e)
                    },
                    r.prototype.scheme = function () {
                      return this.socket.options.secure ? "wss" : "ws"
                    },
                    r.check = function () {
                      return "WebSocket" in n && !("__addTask" in WebSocket) || "MozWebSocket" in n
                    },
                    r.xdomainCheck = function () {
                      return !0
                    },
                    t.transports.push("websocket")
                }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, window),
                function (e, t) {
                  function n() {
                    t.Transport.websocket.apply(this, arguments)
                  }
                  e.flashsocket = n,
                    t.util.inherit(n, t.Transport.websocket),
                    n.prototype.name = "flashsocket",
                    n.prototype.open = function () {
                      var e = this,
                        n = arguments;
                      return WebSocket.__addTask(function () {
                        t.Transport.websocket.prototype.open.apply(e, n)
                      }),
                        this
                    },
                    n.prototype.send = function () {
                      var e = this,
                        n = arguments;
                      return WebSocket.__addTask(function () {
                        t.Transport.websocket.prototype.send.apply(e, n)
                      }),
                        this
                    },
                    n.prototype.close = function () {
                      return WebSocket.__tasks.length = 0,
                        t.Transport.websocket.prototype.close.call(this),
                        this
                    },
                    n.prototype.ready = function (e, r) {
                      function s() {
                        var t = e.options,
                          s = t["flash policy port"],
                          i = ["http" + (t.secure ? "s" : "") + ":/", t.host + ":" + t.port, t.resource, "static/flashsocket", "WebSocketMain" + (e.isXDomain() ? "Insecure" : "") + ".swf"];
                        n.loaded || ("undefined" == typeof WEB_SOCKET_SWF_LOCATION && (WEB_SOCKET_SWF_LOCATION = i.join("/")), 843 !== s && WebSocket.loadFlashPolicyFile("xmlsocket://" + t.host + ":" + s), WebSocket.__initialize(), n.loaded = !0),
                          r.call(o)
                      }
                      var o = this;
                      return document.body ? s() : void t.util.load(s)
                    },
                    n.check = function () {
                      return !!("undefined" != typeof WebSocket && "__initialize" in WebSocket && swfobject) && swfobject.getFlashPlayerVersion().major >= 10
                    },
                    n.xdomainCheck = function () {
                      return !0
                    },
                    "undefined" != typeof window && (window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = !0),
                    t.transports.push("flashsocket")
                }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports), "undefined" != typeof window && "undefined" != typeof window.document) var swfobject = function () {
                  function e() {
                    if (!H) {
                      try {
                        var e = N.getElementsByTagName("body")[0].appendChild(y("span"));
                        e.parentNode.removeChild(e)
                      } catch (t) {
                        return
                      }
                      H = !0;
                      for (var n = L.length,
                        r = 0; r < n; r++) L[r]()
                    }
                  }
                  function t(e) {
                    H ? e() : L[L.length] = e
                  }
                  function n(e) {
                    if (typeof F.addEventListener != I) F.addEventListener("load", e, !1);
                    else if (typeof N.addEventListener != I) N.addEventListener("load", e, !1);
                    else if (typeof F.attachEvent != I) h(F, "onload", e);
                    else if ("function" == typeof F.onload) {
                      var t = F.onload;
                      F.onload = function () {
                        t(),
                          e()
                      }
                    } else F.onload = e
                  }
                  function r() {
                    D ? s() : o()
                  }
                  function s() {
                    var e = N.getElementsByTagName("body")[0],
                      t = y(x);
                    t.setAttribute("type", A);
                    var n = e.appendChild(t);
                    if (n) {
                      var r = 0; !
                        function () {
                          if (typeof n.GetVariable != I) {
                            var s = n.GetVariable("$version");
                            s && (s = s.split(" ")[1].split(","), V.pv = [parseInt(s[0], 10), parseInt(s[1], 10), parseInt(s[2], 10)])
                          } else if (r < 10) return r++ ,
                            void setTimeout(arguments.callee, 10);
                          e.removeChild(t),
                            n = null,
                            o()
                        }()
                    } else o()
                  }
                  function o() {
                    var e = B.length;
                    if (e > 0) for (var t = 0; t < e; t++) {
                      var n = B[t].id,
                        r = B[t].callbackFn,
                        s = {
                          success: !1,
                          id: n
                        };
                      if (V.pv[0] > 0) {
                        var o = g(n);
                        if (o) if (!v(B[t].swfVersion) || V.wk && V.wk < 312) if (B[t].expressInstall && a()) {
                          var l = {};
                          l.data = B[t].expressInstall,
                            l.width = o.getAttribute("width") || "0",
                            l.height = o.getAttribute("height") || "0",
                            o.getAttribute("class") && (l.styleclass = o.getAttribute("class")),
                            o.getAttribute("align") && (l.align = o.getAttribute("align"));
                          for (var d = {},
                            m = o.getElementsByTagName("param"), f = m.length, p = 0; p < f; p++)"movie" != m[p].getAttribute("name").toLowerCase() && (d[m[p].getAttribute("name")] = m[p].getAttribute("value"));
                          c(l, d, n, r)
                        } else u(o),
                          r && r(s);
                        else M(n, !0),
                          r && (s.success = !0, s.ref = i(n), r(s))
                      } else if (M(n, !0), r) {
                        var y = i(n);
                        y && typeof y.SetVariable != I && (s.success = !0, s.ref = y),
                          r(s)
                      }
                    }
                  }
                  function i(e) {
                    var t = null,
                      n = g(e);
                    if (n && "OBJECT" == n.nodeName) if (typeof n.SetVariable != I) t = n;
                    else {
                      var r = n.getElementsByTagName(x)[0];
                      r && (t = r)
                    }
                    return t
                  }
                  function a() {
                    return !$ && v("6.0.65") && (V.win || V.mac) && !(V.wk && V.wk < 312)
                  }
                  function c(e, t, n, r) {
                    $ = !0,
                      w = r || null,
                      C = {
                        success: !1,
                        id: n
                      };
                    var s = g(n);
                    if (s) {
                      "OBJECT" == s.nodeName ? (S = l(s), k = null) : (S = s, k = n),
                        e.id = R,
                        (typeof e.width == I || !/%$/.test(e.width) && parseInt(e.width, 10) < 310) && (e.width = "310"),
                        (typeof e.height == I || !/%$/.test(e.height) && parseInt(e.height, 10) < 137) && (e.height = "137"),
                        N.title = N.title.slice(0, 47) + " - Flash Player Installation";
                      var o = V.ie && V.win ? ["Active"].concat("").join("X") : "PlugIn",
                        i = "MMredirectURL=" + F.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + o + "&MMdoctitle=" + N.title;
                      if (typeof t.flashvars != I ? t.flashvars += "&" + i : t.flashvars = i, V.ie && V.win && 4 != s.readyState) {
                        var a = y("div");
                        n += "SWFObjectNew",
                          a.setAttribute("id", n),
                          s.parentNode.insertBefore(a, s),
                          s.style.display = "none",
                          function () {
                            4 == s.readyState ? s.parentNode.removeChild(s) : setTimeout(arguments.callee, 10)
                          }()
                      }
                      d(e, t, n)
                    }
                  }
                  function u(e) {
                    if (V.ie && V.win && 4 != e.readyState) {
                      var t = y("div");
                      e.parentNode.insertBefore(t, e),
                        t.parentNode.replaceChild(l(e), t),
                        e.style.display = "none",
                        function () {
                          4 == e.readyState ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10)
                        }()
                    } else e.parentNode.replaceChild(l(e), e)
                  }
                  function l(e) {
                    var t = y("div");
                    if (V.win && V.ie) t.innerHTML = e.innerHTML;
                    else {
                      var n = e.getElementsByTagName(x)[0];
                      if (n) {
                        var r = n.childNodes;
                        if (r) for (var s = r.length,
                          o = 0; o < s; o++) 1 == r[o].nodeType && "PARAM" == r[o].nodeName || 8 == r[o].nodeType || t.appendChild(r[o].cloneNode(!0))
                      }
                    }
                    return t
                  }
                  function d(e, t, n) {
                    var r, s = g(n);
                    if (V.wk && V.wk < 312) return r;
                    if (s) if (typeof e.id == I && (e.id = n), V.ie && V.win) {
                      var o = "";
                      for (var i in e) e[i] != Object.prototype[i] && ("data" == i.toLowerCase() ? t.movie = e[i] : "styleclass" == i.toLowerCase() ? o += ' class="' + e[i] + '"' : "classid" != i.toLowerCase() && (o += " " + i + '="' + e[i] + '"'));
                      var a = "";
                      for (var c in t) t[c] != Object.prototype[c] && (a += '<param name="' + c + '" value="' + t[c] + '" />');
                      s.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + o + ">" + a + "</object>",
                        q[q.length] = e.id,
                        r = g(e.id)
                    } else {
                      var u = y(x);
                      u.setAttribute("type", A);
                      for (var l in e) e[l] != Object.prototype[l] && ("styleclass" == l.toLowerCase() ? u.setAttribute("class", e[l]) : "classid" != l.toLowerCase() && u.setAttribute(l, e[l]));
                      for (var d in t) t[d] != Object.prototype[d] && "movie" != d.toLowerCase() && m(u, d, t[d]);
                      s.parentNode.replaceChild(u, s),
                        r = u
                    }
                    return r
                  }
                  function m(e, t, n) {
                    var r = y("param");
                    r.setAttribute("name", t),
                      r.setAttribute("value", n),
                      e.appendChild(r)
                  }
                  function f(e) {
                    var t = g(e);
                    t && "OBJECT" == t.nodeName && (V.ie && V.win ? (t.style.display = "none",
                      function () {
                        4 == t.readyState ? p(e) : setTimeout(arguments.callee, 10)
                      }()) : t.parentNode.removeChild(t))
                  }
                  function p(e) {
                    var t = g(e);
                    if (t) {
                      for (var n in t) "function" == typeof t[n] && (t[n] = null);
                      t.parentNode.removeChild(t)
                    }
                  }
                  function g(e) {
                    var t = null;
                    try {
                      t = N.getElementById(e)
                    } catch (n) { }
                    return t
                  }
                  function y(e) {
                    return N.createElement(e)
                  }
                  function h(e, t, n) {
                    e.attachEvent(t, n),
                      W[W.length] = [e, t, n]
                  }
                  function v(e) {
                    var t = V.pv,
                      n = e.split(".");
                    return n[0] = parseInt(n[0], 10),
                      n[1] = parseInt(n[1], 10) || 0,
                      n[2] = parseInt(n[2], 10) || 0,
                      t[0] > n[0] || t[0] == n[0] && t[1] > n[1] || t[0] == n[0] && t[1] == n[1] && t[2] >= n[2]
                  }
                  function b(e, t, n, r) {
                    if (!V.ie || !V.mac) {
                      var s = N.getElementsByTagName("head")[0];
                      if (s) {
                        var o = n && "string" == typeof n ? n : "screen";
                        if (r && (O = null, _ = null), !O || _ != o) {
                          var i = y("style");
                          i.setAttribute("type", "text/css"),
                            i.setAttribute("media", o),
                            O = s.appendChild(i),
                            V.ie && V.win && typeof N.styleSheets != I && N.styleSheets.length > 0 && (O = N.styleSheets[N.styleSheets.length - 1]),
                            _ = o
                        }
                        V.ie && V.win ? O && typeof O.addRule == x && O.addRule(e, t) : O && typeof N.createTextNode != I && O.appendChild(N.createTextNode(e + " {" + t + "}"))
                      }
                    }
                  }
                  function M(e, t) {
                    if (X) {
                      var n = t ? "visible" : "hidden";
                      H && g(e) ? g(e).style.visibility = n : b("#" + e, "visibility:" + n)
                    }
                  }
                  function T(e) {
                    var t = /[\\\"<>\.;]/,
                      n = null != t.exec(e);
                    return n && typeof encodeURIComponent != I ? encodeURIComponent(e) : e
                  }
                  var S, k, w, C, O, _, I = "undefined",
                    x = "object",
                    E = "Shockwave Flash",
                    P = "ShockwaveFlash.ShockwaveFlash",
                    A = "application/x-shockwave-flash",
                    R = "SWFObjectExprInst",
                    j = "onreadystatechange",
                    F = window,
                    N = document,
                    U = navigator,
                    D = !1,
                    L = [r],
                    B = [],
                    q = [],
                    W = [],
                    H = !1,
                    $ = !1,
                    X = !0,
                    V = function () {
                      var e = typeof N.getElementById != I && typeof N.getElementsByTagName != I && typeof N.createElement != I,
                        t = U.userAgent.toLowerCase(),
                        n = U.platform.toLowerCase(),
                        r = n ? /win/.test(n) : /win/.test(t),
                        s = n ? /mac/.test(n) : /mac/.test(t),
                        o = !!/webkit/.test(t) && parseFloat(t.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")),
                        i = !1,
                        a = [0, 0, 0],
                        c = null;
                      if (typeof U.plugins != I && typeof U.plugins[E] == x) c = U.plugins[E].description,
                        !c || typeof U.mimeTypes != I && U.mimeTypes[A] && !U.mimeTypes[A].enabledPlugin || (D = !0, i = !1, c = c.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), a[0] = parseInt(c.replace(/^(.*)\..*$/, "$1"), 10), a[1] = parseInt(c.replace(/^.*\.(.*)\s.*$/, "$1"), 10), a[2] = /[a-zA-Z]/.test(c) ? parseInt(c.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
                      else if (typeof F[["Active"].concat("Object").join("X")] != I) try {
                        var u = new (window[["Active"].concat("Object").join("X")])(P);
                        u && (c = u.GetVariable("$version"), c && (i = !0, c = c.split(" ")[1].split(","), a = [parseInt(c[0], 10), parseInt(c[1], 10), parseInt(c[2], 10)]))
                      } catch (l) { }
                      return {
                        w3: e,
                        pv: a,
                        wk: o,
                        ie: i,
                        win: r,
                        mac: s
                      }
                    }(); (function () {
                      V.w3 && ((typeof N.readyState != I && "complete" == N.readyState || typeof N.readyState == I && (N.getElementsByTagName("body")[0] || N.body)) && e(), H || (typeof N.addEventListener != I && N.addEventListener("DOMContentLoaded", e, !1), V.ie && V.win && (N.attachEvent(j,
                        function () {
                          "complete" == N.readyState && (N.detachEvent(j, arguments.callee), e())
                        }), F == top && !
                        function () {
                          if (!H) {
                            try {
                              N.documentElement.doScroll("left")
                            } catch (t) {
                              return void setTimeout(arguments.callee, 0)
                            }
                            e()
                          }
                        }()), V.wk && !
                        function () {
                          if (!H) return /loaded|complete/.test(N.readyState) ? void e() : void setTimeout(arguments.callee, 0)
                        }(), n(e)))
                    })(),
                      function () {
                        V.ie && V.win && window.attachEvent("onunload",
                          function () {
                            for (var e = W.length,
                              t = 0; t < e; t++) W[t][0].detachEvent(W[t][1], W[t][2]);
                            for (var n = q.length,
                              r = 0; r < n; r++) f(q[r]);
                            for (var s in V) V[s] = null;
                            V = null;
                            for (var o in swfobject) swfobject[o] = null;
                            swfobject = null
                          })
                      }();
                  return {
                    registerObject: function (e, t, n, r) {
                      if (V.w3 && e && t) {
                        var s = {};
                        s.id = e,
                          s.swfVersion = t,
                          s.expressInstall = n,
                          s.callbackFn = r,
                          B[B.length] = s,
                          M(e, !1)
                      } else r && r({
                        success: !1,
                        id: e
                      })
                    },
                    getObjectById: function (e) {
                      if (V.w3) return i(e)
                    },
                    embedSWF: function (e, n, r, s, o, i, u, l, m, f) {
                      var p = {
                        success: !1,
                        id: n
                      };
                      V.w3 && !(V.wk && V.wk < 312) && e && n && r && s && o ? (M(n, !1), t(function () {
                        r += "",
                          s += "";
                        var t = {};
                        if (m && typeof m === x) for (var g in m) t[g] = m[g];
                        t.data = e,
                          t.width = r,
                          t.height = s;
                        var y = {};
                        if (l && typeof l === x) for (var h in l) y[h] = l[h];
                        if (u && typeof u === x) for (var b in u) typeof y.flashvars != I ? y.flashvars += "&" + b + "=" + u[b] : y.flashvars = b + "=" + u[b];
                        if (v(o)) {
                          var T = d(t, y, n);
                          t.id == n && M(n, !0),
                            p.success = !0,
                            p.ref = T
                        } else {
                          if (i && a()) return t.data = i,
                            void c(t, y, n, f);
                          M(n, !0)
                        }
                        f && f(p)
                      })) : f && f(p)
                    },
                    switchOffAutoHideShow: function () {
                      X = !1
                    },
                    ua: V,
                    getFlashPlayerVersion: function () {
                      return {
                        major: V.pv[0],
                        minor: V.pv[1],
                        release: V.pv[2]
                      }
                    },
                    hasFlashPlayerVersion: v,
                    createSWF: function (e, t, n) {
                      return V.w3 ? d(e, t, n) : void 0
                    },
                    showExpressInstall: function (e, t, n, r) {
                      V.w3 && a() && c(e, t, n, r)
                    },
                    removeSWF: function (e) {
                      V.w3 && f(e)
                    },
                    createCSS: function (e, t, n, r) {
                      V.w3 && b(e, t, n, r)
                    },
                    addDomLoadEvent: t,
                    addLoadEvent: n,
                    getQueryParamValue: function (e) {
                      var t = N.location.search || N.location.hash;
                      if (t) {
                        if (/\?/.test(t) && (t = t.split("?")[1]), null == e) return T(t);
                        for (var n = t.split("&"), r = 0; r < n.length; r++) if (n[r].substring(0, n[r].indexOf("=")) == e) return T(n[r].substring(n[r].indexOf("=") + 1))
                      }
                      return ""
                    },
                    expressInstallCallback: function () {
                      if ($) {
                        var e = g(R);
                        e && S && (e.parentNode.replaceChild(S, e), k && (M(k, !0), V.ie && V.win && (S.style.display = "block")), w && w(C)),
                          $ = !1
                      }
                    }
                  }
                }(); !
                  function () {
                    if ("undefined" != typeof window && !window.WebSocket) {
                      var e = window.console;
                      if (e && e.log && e.error || (e = {
                        log: function () { },
                        error: function () { }
                      }), !swfobject.hasFlashPlayerVersion("10.0.0")) return void e.error("Flash Player >= 10.0.0 is required.");
                      "file:" == location.protocol && e.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."),
                        WebSocket = function (e, t, n, r, s) {
                          var o = this;
                          o.__id = WebSocket.__nextId++ ,
                            WebSocket.__instances[o.__id] = o,
                            o.readyState = WebSocket.CONNECTING,
                            o.bufferedAmount = 0,
                            o.__events = {},
                            t ? "string" == typeof t && (t = [t]) : t = [],
                            setTimeout(function () {
                              WebSocket.__addTask(function () {
                                WebSocket.__flash.create(o.__id, e, t, n || null, r || 0, s || null)
                              })
                            },
                              0)
                        },
                        WebSocket.prototype.send = function (e) {
                          if (this.readyState == WebSocket.CONNECTING) throw "socket.io::send: INVALID_STATE_ERR: Web Socket connection has not been established";
                          var t = WebSocket.__flash.send(this.__id, encodeURIComponent(e));
                          return t < 0 || (this.bufferedAmount += t, !1)
                        },
                        WebSocket.prototype.close = function () {
                          this.readyState != WebSocket.CLOSED && this.readyState != WebSocket.CLOSING && (this.readyState = WebSocket.CLOSING, WebSocket.__flash.close(this.__id))
                        },
                        WebSocket.prototype.addEventListener = function (e, t, n) {
                          e in this.__events || (this.__events[e] = []),
                            this.__events[e].push(t)
                        },
                        WebSocket.prototype.removeEventListener = function (e, t, n) {
                          if (e in this.__events) for (var r = this.__events[e], s = r.length - 1; s >= 0; --s) if (r[s] === t) {
                            r.splice(s, 1);
                            break
                          }
                        },
                        WebSocket.prototype.dispatchEvent = function (e) {
                          for (var t = this.__events[e.type] || [], n = 0; n < t.length; ++n) t[n](e);
                          var r = this["on" + e.type];
                          r && r(e)
                        },
                        WebSocket.prototype.__handleEvent = function (e) {
                          "readyState" in e && (this.readyState = e.readyState),
                            "protocol" in e && (this.protocol = e.protocol);
                          var t;
                          if ("open" == e.type || "error" == e.type) t = this.__createSimpleEvent(e.type);
                          else if ("close" == e.type) t = this.__createSimpleEvent("close");
                          else {
                            if ("message" != e.type) throw "socket.io::handleFlashEvent: unknown event type: " + e.type;
                            var n = decodeURIComponent(e.message);
                            t = this.__createMessageEvent("message", n)
                          }
                          this.dispatchEvent(t)
                        },
                        WebSocket.prototype.__createSimpleEvent = function (e) {
                          if (document.createEvent && window.Event) {
                            var t = document.createEvent("Event");
                            return t.initEvent(e, !1, !1),
                              t
                          }
                          return {
                            type: e,
                            bubbles: !1,
                            cancelable: !1
                          }
                        },
                        WebSocket.prototype.__createMessageEvent = function (e, t) {
                          if (document.createEvent && window.MessageEvent && !window.opera) {
                            var n = document.createEvent("MessageEvent");
                            return n.initMessageEvent("message", !1, !1, t, null, null, window, null),
                              n
                          }
                          return {
                            type: e,
                            data: t,
                            bubbles: !1,
                            cancelable: !1
                          }
                        },
                        WebSocket.CONNECTING = 0,
                        WebSocket.OPEN = 1,
                        WebSocket.CLOSING = 2,
                        WebSocket.CLOSED = 3,
                        WebSocket.__flash = null,
                        WebSocket.__instances = {},
                        WebSocket.__tasks = [],
                        WebSocket.__nextId = 0,
                        WebSocket.loadFlashPolicyFile = function (e) {
                          WebSocket.__addTask(function () {
                            WebSocket.__flash.loadManualPolicyFile(e)
                          })
                        },
                        WebSocket.__initialize = function () {
                          if (!WebSocket.__flash) {
                            if (WebSocket.__swfLocation && (window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation), !window.WEB_SOCKET_SWF_LOCATION) return void e.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
                            var t = document.createElement("div");
                            t.id = "webSocketContainer",
                              t.style.position = "absolute",
                              WebSocket.__isFlashLite() ? (t.style.left = "0px", t.style.top = "0px") : (t.style.left = "-100px", t.style.top = "-100px");
                            var n = document.createElement("div");
                            n.id = "webSocketFlash",
                              t.appendChild(n),
                              document.body.appendChild(t),
                              swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION, "webSocketFlash", "1", "1", "10.0.0", null, null, {
                                hasPriority: !0,
                                swliveconnect: !0,
                                allowScriptAccess: "always"
                              },
                                null,
                                function (t) {
                                  t.success || e.error("[WebSocket] swfobject.embedSWF failed")
                                })
                          }
                        },
                        WebSocket.__onFlashInitialized = function () {
                          setTimeout(function () {
                            WebSocket.__flash = document.getElementById("webSocketFlash"),
                              WebSocket.__flash.setCallerUrl(location.href),
                              WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
                            for (var e = 0; e < WebSocket.__tasks.length; ++e) WebSocket.__tasks[e]();
                            WebSocket.__tasks = []
                          },
                            0)
                        },
                        WebSocket.__onFlashEvent = function () {
                          return setTimeout(function () {
                            try {
                              for (var t = WebSocket.__flash.receiveEvents(), n = 0; n < t.length; ++n) WebSocket.__instances[t[n].webSocketId].__handleEvent(t[n])
                            } catch (r) {
                              e.error(r)
                            }
                          },
                            0),
                            !0
                        };
                      var t = function () {
                        var e = function (e, t) {
                          t = t || 2;
                          for (var n = "" + e; n.length < t;) n = "0" + n;
                          return n
                        },
                          t = new Date,
                          n = t.getFullYear() + "-" + e(t.getMonth() + 1) + "-" + e(t.getDate()) + " " + e(t.getHours()) + ":" + e(t.getMinutes()) + ":" + e(t.getSeconds()) + ":" + e(t.getMilliseconds(), 3);
                        return n
                      };
                      WebSocket.__log = function (n) {
                        e.log(t(), decodeURIComponent(n))
                      },
                        WebSocket.__error = function (n) {
                          e.error(t(), decodeURIComponent(n))
                        },
                        WebSocket.__addTask = function (e) {
                          WebSocket.__flash ? e() : WebSocket.__tasks.push(e)
                        },
                        WebSocket.__isFlashLite = function () {
                          if (!window.navigator || !window.navigator.mimeTypes) return !1;
                          var e = window.navigator.mimeTypes["application/x-shockwave-flash"];
                          return !!(e && e.enabledPlugin && e.enabledPlugin.filename) && !!e.enabledPlugin.filename.match(/flashlite/i)
                        },
                        window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION || (window.addEventListener ? window.addEventListener("load",
                          function () {
                            WebSocket.__initialize()
                          },
                          !1) : window.attachEvent("onload",
                            function () {
                              WebSocket.__initialize()
                            }))
                    }
                  }(),
                  function (e, t, n) {
                    function r(e) {
                      e && (t.Transport.apply(this, arguments), this.sendBuffer = [])
                    }
                    function s() { }
                    e.XHR = r,
                      t.util.inherit(r, t.Transport),
                      r.prototype.open = function () {
                        return this.socket.setBuffer(!1),
                          this.onOpen(),
                          this.get(),
                          this.setCloseTimeout(),
                          this
                      },
                      r.prototype.payload = function (e) {
                        for (var n = [], r = 0, s = e.length; r < s; r++) n.push(t.parser.encodePacket(e[r]));
                        this.send(t.parser.encodePayload(n))
                      },
                      r.prototype.send = function (e) {
                        return this.post(e),
                          this
                      },
                      r.prototype.post = function (e) {
                        function t() {
                          4 == this.readyState && (this.onreadystatechange = s, o.posting = !1, 200 == this.status ? o.socket.setBuffer(!1) : o.onClose())
                        }
                        function r() {
                          this.onload = s,
                            o.socket.setBuffer(!1)
                        }
                        var o = this;
                        this.socket.setBuffer(!0),
                          this.sendXHR = this.request("POST"),
                          n.XDomainRequest && this.sendXHR instanceof XDomainRequest ? this.sendXHR.onload = this.sendXHR.onerror = r : this.sendXHR.onreadystatechange = t,
                          this.sendXHR.send(e)
                      },
                      r.prototype.close = function () {
                        return this.onClose(),
                          this
                      },
                      r.prototype.request = function (e) {
                        var n = t.util.request(this.socket.isXDomain()),
                          r = t.util.query(this.socket.options.query, "t=" + +new Date);
                        if (n.open(e || "GET", this.prepareUrl() + r, !0), "POST" == e) try {
                          n.setRequestHeader ? n.setRequestHeader("Content-type", "text/plain;charset=UTF-8") : n.contentType = "text/plain"
                        } catch (s) { }
                        return n
                      },
                      r.prototype.scheme = function () {
                        return this.socket.options.secure ? "https" : "http"
                      },
                      r.check = function (e, r) {
                        try {
                          var s = t.util.request(r),
                            o = n.XDomainRequest && s instanceof XDomainRequest,
                            i = e && e.options && e.options.secure ? "https:" : "http:",
                            a = n.location && i != n.location.protocol;
                          if (s && (!o || !a)) return !0
                        } catch (c) { }
                        return !1
                      },
                      r.xdomainCheck = function (e) {
                        return r.check(e, !0)
                      }
                  }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, window),
                  function (e, t) {
                    function n(e) {
                      t.Transport.XHR.apply(this, arguments)
                    }
                    e.htmlfile = n,
                      t.util.inherit(n, t.Transport.XHR),
                      n.prototype.name = "htmlfile",
                      n.prototype.get = function () {
                        this.doc = new (window[["Active"].concat("Object").join("X")])("htmlfile"),
                          this.doc.open(),
                          this.doc.write("<html></html>"),
                          this.doc.close(),
                          this.doc.parentWindow.s = this;
                        var e = this.doc.createElement("div");
                        e.className = "socketio",
                          this.doc.body.appendChild(e),
                          this.iframe = this.doc.createElement("iframe"),
                          e.appendChild(this.iframe);
                        var n = this,
                          r = t.util.query(this.socket.options.query, "t=" + +new Date);
                        this.iframe.src = this.prepareUrl() + r,
                          t.util.on(window, "unload",
                            function () {
                              n.destroy()
                            })
                      },
                      n.prototype._ = function (e, t) {
                        this.onData(e);
                        try {
                          var n = t.getElementsByTagName("script")[0];
                          n.parentNode.removeChild(n)
                        } catch (r) { }
                      },
                      n.prototype.destroy = function () {
                        if (this.iframe) {
                          try {
                            this.iframe.src = "about:blank"
                          } catch (e) { }
                          this.doc = null,
                            this.iframe.parentNode.removeChild(this.iframe),
                            this.iframe = null,
                            CollectGarbage()
                        }
                      },
                      n.prototype.close = function () {
                        return this.destroy(),
                          t.Transport.XHR.prototype.close.call(this)
                      },
                      n.check = function (e) {
                        if ("undefined" != typeof window && ["Active"].concat("Object").join("X") in window) try {
                          var n = new (window[["Active"].concat("Object").join("X")])("htmlfile");
                          return n && t.Transport.XHR.check(e)
                        } catch (r) { }
                        return !1
                      },
                      n.xdomainCheck = function () {
                        return !1
                      },
                      t.transports.push("htmlfile")
                  }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports),
                  function (e, t, n) {
                    function r() {
                      t.Transport.XHR.apply(this, arguments)
                    }
                    function s() { }
                    e["xhr-polling"] = r,
                      t.util.inherit(r, t.Transport.XHR),
                      t.util.merge(r, t.Transport.XHR),
                      r.prototype.name = "xhr-polling",
                      r.prototype.heartbeats = function () {
                        return !1
                      },
                      r.prototype.open = function () {
                        var e = this;
                        return t.Transport.XHR.prototype.open.call(e),
                          !1
                      },
                      r.prototype.get = function () {
                        function e() {
                          4 == this.readyState && (this.onreadystatechange = s, 200 == this.status ? (o.onData(this.responseText), o.get()) : o.onClose())
                        }
                        function t() {
                          this.onload = s,
                            this.onerror = s,
                            o.retryCounter = 1,
                            o.onData(this.responseText),
                            o.get()
                        }
                        function r() {
                          o.retryCounter++ ,
                            !o.retryCounter || o.retryCounter > 3 ? o.onClose() : o.get()
                        }
                        if (this.isOpen) {
                          var o = this;
                          this.xhr = this.request(),
                            n.XDomainRequest && this.xhr instanceof XDomainRequest ? (this.xhr.onload = t, this.xhr.onerror = r) : this.xhr.onreadystatechange = e,
                            this.xhr.send(null)
                        }
                      },
                      r.prototype.onClose = function () {
                        if (t.Transport.XHR.prototype.onClose.call(this), this.xhr) {
                          this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = s;
                          try {
                            this.xhr.abort()
                          } catch (e) { }
                          this.xhr = null
                        }
                      },
                      r.prototype.ready = function (e, n) {
                        var r = this;
                        t.util.defer(function () {
                          n.call(r)
                        })
                      },
                      t.transports.push("xhr-polling")
                  }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, window),
                  function (e, t, n) {
                    function r(e) {
                      t.Transport["xhr-polling"].apply(this, arguments),
                        this.index = t.j.length;
                      var n = this;
                      t.j.push(function (e) {
                        n._(e)
                      })
                    }
                    var s = n.document && "MozAppearance" in n.document.documentElement.style;
                    e["jsonp-polling"] = r,
                      t.util.inherit(r, t.Transport["xhr-polling"]),
                      r.prototype.name = "jsonp-polling",
                      r.prototype.post = function (e) {
                        function n() {
                          r(),
                            s.socket.setBuffer(!1)
                        }
                        function r() {
                          s.iframe && s.form.removeChild(s.iframe);
                          try {
                            i = document.createElement('<iframe name="' + s.iframeId + '">')
                          } catch (e) {
                            i = document.createElement("iframe"),
                              i.name = s.iframeId
                          }
                          i.id = s.iframeId,
                            s.form.appendChild(i),
                            s.iframe = i
                        }
                        var s = this,
                          o = t.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
                        if (!this.form) {
                          var i, a = document.createElement("form"),
                            c = document.createElement("textarea"),
                            u = this.iframeId = "socketio_iframe_" + this.index;
                          a.className = "socketio",
                            a.style.position = "absolute",
                            a.style.top = "0px",
                            a.style.left = "0px",
                            a.style.display = "none",
                            a.target = u,
                            a.method = "POST",
                            a.setAttribute("accept-charset", "utf-8"),
                            c.name = "d",
                            a.appendChild(c),
                            document.body.appendChild(a),
                            this.form = a,
                            this.area = c
                        }
                        this.form.action = this.prepareUrl() + o,
                          r(),
                          this.area.value = t.JSON.stringify(e);
                        try {
                          this.form.submit()
                        } catch (l) { }
                        this.iframe.attachEvent ? i.onreadystatechange = function () {
                          "complete" == s.iframe.readyState && n()
                        } : this.iframe.onload = n,
                          this.socket.setBuffer(!0)
                      },
                      r.prototype.get = function () {
                        var e = this,
                          n = document.createElement("script"),
                          r = t.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
                        this.script && (this.script.parentNode.removeChild(this.script), this.script = null),
                          n.async = !0,
                          n.src = this.prepareUrl() + r,
                          n.onerror = function () {
                            e.onClose()
                          };
                        var o = document.getElementsByTagName("script")[0];
                        o.parentNode.insertBefore(n, o),
                          this.script = n,
                          s && setTimeout(function () {
                            var e = document.createElement("iframe");
                            document.body.appendChild(e),
                              document.body.removeChild(e)
                          },
                            100)
                      },
                      r.prototype._ = function (e) {
                        return this.onData(e),
                          this.isOpen && this.get(),
                          this
                      },
                      r.prototype.ready = function (e, n) {
                        var r = this;
                        return s ? void t.util.load(function () {
                          n.call(r)
                        }) : n.call(this)
                      },
                      r.check = function () {
                        return "document" in n
                      },
                      r.xdomainCheck = function () {
                        return !0
                      },
                      t.transports.push("jsonp-polling")
                  }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, window),
                  __WEBPACK_AMD_DEFINE_ARRAY__ = [],
                  __WEBPACK_AMD_DEFINE_RESULT__ = function () {
                    return io
                  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
                  !(void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
            }()
        }).call(exports, __webpack_require__(88)(module))
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          return e && e.__esModule ? e : {
            "default": e
          }
        }
        var s = n(6),
          o = r(s),
          i = n(29),
          a = r(i),
          c = function () {
            function e() {
              (0, a["default"])(this, e),
              this._entries = []
            }
            return e.prototype.append = function (e, t) {
              if ("string" != typeof e) throw new TypeError("FormData name must be a string");
              if ("string" != typeof t && ("object" !== ("undefined" == typeof t ? "undefined" : (0, o["default"])(t)) || "string" != typeof t.uri)) throw new TypeError("FormData value must be a string or { uri: tempFilePath }");
              this._entries.push([e, t])
            },
              e.prototype.set = function (e, t) {
                var n = this.get(e);
                n ? n[1] = t : this.append(e, t)
              },
              e.prototype["delete"] = function (e) {
                this._entries = this._entries.filter(function (t) {
                  return t[0] !== e
                })
              },
              e.prototype.entries = function () {
                return this._entries
              },
              e.prototype.get = function (e) {
                return this._entries.find(function (t) {
                  return t[0] === e
                })
              },
              e.prototype.getAll = function (e) {
                return this._entries.filter(function (t) {
                  return t[0] === e
                })
              },
              e.prototype.has = function (e) {
                return this._entries.some(function (t) {
                  return t[0] === e
                })
              },
              e.prototype.keys = function () {
                return this._entries.map(function (e) {
                  return e[0]
                })
              },
              e.prototype.values = function () {
                return this._entries.map(function (e) {
                  return e[1]
                })
              },
              e
          }();
        e.exports = c
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          return e && e.__esModule ? e : {
            "default": e
          }
        }
        function s() { }
        var o = n(21),
          i = r(o),
          a = i["default"].clientTypeMap;
        s.reverse = function (e) {
          var t = e;
          return t.type = a[t.type],
            t
        },
          s.reverseType = function (e) {
            return a[e] || e
          },
          e.exports = s
      },
      function (e, t, n) {
        "use strict";
        function r() { }
        var s = n(1);
        r.parse = function (e) {
          var t = e.split("|");
          return {
            scene: t[0],
            to: t[1]
          }
        },
          r.genSessionByMsg = function (e) {
            var t = {
              id: e.sessionId,
              scene: e.scene,
              to: e.target,
              updateTime: e.time,
              lastMsg: e
            };
            return t
          },
          r.appendLastMsg = function (e) {
            var t = e.lastMsg,
              n = s.capFirstLetter(t.type);
            e["last" + n + "Msg"] = t;
            var r = s.capFirstLetter(t.flow);
            e["last" + r + "Msg"] = t
          },
          r.genSessionByMsgs = function (e, t) {
            var n = e.getLastNotIgnoredMsg(t);
            return n ? r.genSessionByMsg(n) : null
          },
          r.trim = function (e) {
            delete e.msgReceiptSendTime,
              delete e.msgReceiptServerTime,
              delete e.ack,
              delete e.unreadMsgs
          },
          r.isComplete = function (e) {
            return e.id && e.scene && e.to
          },
          e.exports = r
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          return e && e.__esModule ? e : {
            "default": e
          }
        }
        function s(e) {
          var t = this;
          a.verifyOptions(e, "type to", "sysmsg::SystemMessage"),
            a.verifyParamValid("type", e.type, s.validTypes, "sysmsg::SystemMessage"),
            e.type.indexOf("custom") !== -1 && (a.verifyOptions(e, "content", "sysmsg::SystemMessage"), t.attach = e.content, u(e.apnsText) && (t.apnsText = "" + e.apnsText), u(e.pushPayload) && ("object" === (0, i["default"])(e.pushPayload) ? (t.logger.warn("model::Message: pushPayload should be JsonString, auto transfer"), t.pushPayload = JSON.stringify(e.pushPayload)) : t.pushPayload = "" + e.pushPayload), u(e.sendToOnlineUsersOnly) && (t.sendToOnlineUsersOnly = e.sendToOnlineUsersOnly ? 0 : 1), u(e.cc) && (t.cc = e.cc ? 1 : 0), u(e.isPushable) && (t.isPushable = e.isPushable ? 1 : 0), u(e.isUnreadable) && (t.isUnreadable = e.isUnreadable ? 1 : 0), u(e.needPushNick) && (t.needPushNick = e.needPushNick ? 1 : 0)),
            t.time = e.time || +new Date,
            t.type = f[e.type],
            t.to = e.to,
            u(e.from) && (t.from = e.from),
            u(e.ps) && (t.ps = e.ps),
            u(e.deletedIdClient) && (t.deletedIdClient = e.deletedIdClient),
            u(e.deletedIdServer) && (t.deletedIdServer = e.deletedIdServer),
            u(e.opeAccount) && (t.opeAccount = e.opeAccount),
            u(e.yidunEnable) && (t.yidunEnable = e.yidunEnable ? 1 : 0),
            u(e.antiSpamContent) && ("object" === (0, i["default"])(e.antiSpamContent) ? (t.logger.warn("model::Message: antiSpamContent should be JsonString, auto transfer"), t.antiSpamContent = JSON.stringify(e.antiSpamContent)) : t.antiSpamContent = "" + e.antiSpamContent),
            u(e.antiSpamBusinessId) && ("object" === (0, i["default"])(e.antiSpamBusinessId) ? (t.logger.warn("model::Message: antiSpamBusinessId should be JsonString, auto transfer"), t.antiSpamBusinessId = JSON.stringify(e.antiSpamBusinessId)) : t.antiSpamBusinessId = "" + e.antiSpamBusinessId),
            t.idClient = e.idClient || a.guid()
        }
        var o = n(6),
          i = r(o),
          a = n(1),
          c = a.undef,
          u = a.notundef,
          l = n(28).getInstance("IM"),
          d = n(39),
          m = n(33),
          f = {
            customP2p: 100,
            customTeam: 101,
            deleteMsgP2p: 7,
            deleteMsgTeam: 8
          },
          p = {
            0: "applyTeam",
            1: "rejectTeamApply",
            2: "teamInvite",
            3: "rejectTeamInvite",
            5: "friendRequest",
            6: "deleteFriend",
            7: "deleteMsgP2p",
            8: "deleteMsgTeam",
            100: "customP2p",
            101: "customTeam",
            102: "customP2p"
          },
          g = {
            1: "addFriend",
            2: "applyFriend",
            3: "passFriendApply",
            4: "rejectFriendApply"
          },
          y = "team",
          h = "friend",
          v = "msg",
          b = [y, h, v],
          M = {
            applyTeam: y,
            rejectTeamApply: y,
            teamInvite: y,
            rejectTeamInvite: y,
            addFriend: h,
            applyFriend: h,
            passFriendApply: h,
            rejectFriendApply: h,
            deleteFriend: h,
            deleteMsg: v
          };
        s.validTypes = Object.keys(f).concat(Object.keys(M)),
          s.validCategories = ["team", "friend"],
          s.isCustom = function (e) {
            return "custom" === e.type
          },
          s.reverse = function (e) {
            var t = {
              time: +e.time,
              to: e.to,
              type: p[e.type]
            };
            if (u(e.from) && (t.from = e.from), u(e.idServer) && (t.idServer = "" + e.idServer), u(e.deletedIdClient) && (t.deletedIdClient = e.deletedIdClient), u(e.deletedIdServer) && (t.deletedIdServer = "" + e.deletedIdServer), u(e.deletedMsgTime) && (t.deletedMsgTime = +e.deletedMsgTime), u(e.deletedMsgFromNick) && (t.deletedMsgFromNick = "" + e.deletedMsgFromNick), u(e.opeAccount) && (t.opeAccount = e.opeAccount), u(e.ps) && (t.ps = e.ps), e.attach = e.attach ? "" + e.attach : "", "customP2p" === t.type || "customTeam" === t.type) t.content = e.attach,
              u(e.apnsText) && (t.apnsText = e.apnsText),
              u(e.pushPayload) && (t.pushPayload = e.pushPayload),
              a.merge(t, {
                sendToOnlineUsersOnly: c(e.sendToOnlineUsersOnly) || 0 === +e.sendToOnlineUsersOnly,
                cc: c(e.cc) || 1 === +e.cc,
                isPushable: c(e.isPushable) || 1 === +e.isPushable,
                isUnreadable: c(e.isUnreadable) || 1 === +e.isUnreadable,
                needPushNick: u(e.needPushNick) && 1 === +e.needPushNick
              }),
              t.scene = t.type.slice(6).toLowerCase(),
              t.type = "custom";
            else if ("deleteMsgP2p" === t.type || "deleteMsgTeam" === t.type) t.scene = t.type.slice(9).toLowerCase(),
              t.type = "deleteMsg";
            else {
              if (e.attach) {
                t.attach = {};
                var n = JSON.parse(e.attach);
                u(n.vt) ? (t.type = g[n.vt], delete t.attach) : (u(n.tinfo) && (t.attach.team = d.reverse(l.unserialize(n.tinfo, "team"))), u(n.tlist) && (t.attach.member = m.reverse(l.unserialize(n.tlist, "teamMember"))), u(n.attach) && (t.attach.custom = n.attach))
              }
              t.category = M[t.type],
                t.read = !1,
                t.state = "init"
            }
            return u(e.cc) && (t.cc = 1 === +e.cc),
              t.status = e.status || "success",
              u(e.filter) && (t.filter = e.filter),
              t
          },
          s.reverseSysMsgs = function (e, t) {
            t = t || {};
            var n = t.mapper,
              r = a.isFunction(n);
            return e.map(function (e) {
              return e = s.reverse(e),
                r && (e = n(e)),
                e
            })
          },
          s.completeUnread = function (e) {
            e = e || {},
              b.forEach(function (t) {
                delete e[t]
              });
            var t;
            return Object.keys(M).forEach(function (n) {
              e[n] = e[n] || 0,
                e[n] < 0 && (e[n] = 0),
                t = M[n],
                e[t] = e[t] || 0,
                e[t] = e[t] + e[n]
            }),
              e.total = 0,
              b.forEach(function (t) {
                e.total += e[t]
              }),
              e
          },
          e.exports = s
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          var t = this;
          switch (o.verifyOptions(e, "action", "team::Team"), e.action) {
            case "create":
              o.verifyOptions(e, "teamId", !1, "team::Team"),
                o.verifyOptions(e, "type name", "team::Team"),
                o.verifyParamValid("type", e.type, g, "team::Team");
              break;
            case "update":
              o.verifyOptions(e, "teamId", "team::Team"),
                o.verifyOptions(e, "type", !1, "team::Team")
          }
          i(e.teamId) && (t.teamId = e.teamId),
            i(e.type) && (t.type = f[e.type]),
            i(e.avatar) && (t.avatar = "" + e.avatar),
            i(e.name) && (t.name = "" + e.name),
            i(e.intro) && (t.intro = "" + e.intro),
            i(e.announcement) && (t.announcement = "" + e.announcement),
            d.forEach(t.setMode.bind(t, e)),
            i(e.custom) && (t.custom = "" + e.custom)
        }
        function s(e, t) {
          t += "Mode",
            i(e[t]) && (e[t] = l[t][e[t]])
        }
        var o = n(1),
          i = o.notundef,
          a = o.fillPropertyWithDefault,
          c = Object.keys,
          u = {},
          l = {},
          d = [],
          m = {},
          f = {
            normal: 0,
            advanced: 1
          },
          p = {
            0: "normal",
            1: "advanced"
          },
          g = c(f),
          y = u.joinMode = {
            noVerify: 0,
            needVerify: 1,
            rejectAll: 2
          };
        l.joinMode = {
          0: "noVerify",
          1: "needVerify",
          2: "rejectAll"
        },
          d.push("join"),
          m.joinMode = c(y);
        var h = u.beInviteMode = {
          needVerify: 0,
          noVerify: 1
        };
        l.beInviteMode = {
          0: "needVerify",
          1: "noVerify"
        },
          d.push("beInvite"),
          m.beInviteMode = c(h);
        var v = u.inviteMode = {
          manager: 0,
          all: 1
        };
        l.inviteMode = {
          0: "manager",
          1: "all"
        },
          d.push("invite"),
          m.inviteMode = c(v);
        var b = u.updateTeamMode = {
          manager: 0,
          all: 1
        };
        l.updateTeamMode = {
          0: "manager",
          1: "all"
        },
          d.push("updateTeam"),
          m.updateTeamMode = c(b);
        var M = u.updateCustomMode = {
          manager: 0,
          all: 1
        };
        l.updateCustomMode = {
          0: "manager",
          1: "all"
        },
          d.push("updateCustom"),
          m.updateCustomMode = c(M);
        var T = r.prototype;
        T.setMode = function (e, t) {
          var n = this;
          t += "Mode",
            i(e[t]) && (o.verifyParamValid(t, e[t], m[t], "team::Team"), n[t] = u[t][e[t]])
        },
          r.reverse = function (e, t) {
            var n = o.copy(e);
            return i(n.teamId) && (n.teamId = "" + n.teamId),
              i(n.type) && (n.type = p[n.type]),
              i(n.level) && (n.level = +n.level),
              i(n.valid) && (n.valid = 1 === +n.valid),
              i(n.memberNum) && (n.memberNum = +n.memberNum),
              i(n.memberUpdateTime) && (n.memberUpdateTime = +n.memberUpdateTime),
              i(n.createTime) && (n.createTime = +n.createTime),
              i(n.updateTime) && (n.updateTime = +n.updateTime),
              i(n.validToCurrentUser) && (n.validToCurrentUser = "1" === n.validToCurrentUser),
              i(n.mute) && (n.mute = "1" === n.mute),
              d.forEach(s.bind(null, n)),
              delete n.bits,
              t || r.fillProperties(n),
              n
          },
          r.fillProperties = function (e) {
            var t = a(e, "beInviteMode", "needVerify"),
              n = a(e, "inviteMode", "manager"),
              r = a(e, "updateTeamMode", "manager"),
              s = a(e, "updateCustomMode", "manager"),
              o = a(e, "avatar", "");
            return t || n || r || s || o
          },
          e.exports = r
      },
        ,
      function (e, t, n) {
        "use strict";
        function r(e) {
          var t = e.mode,
            n = f,
            r = m.getGlobal();
          return r.FormData || (t = "iframe"),
            "iframe" === t && (n = e.upload ? p : g),
            new n(e)
        }
        function s(e) {
          var t = e.upload = "multipart/form-data" === (e.headers || m.o)["Content-Type"],
            n = !1;
          try {
            var s = (location.protocol + "//" + location.host).toLowerCase(),
              o = m.url2origin(e.url);
            n = s !== o
          } catch (i) { }
          return e.cors = n,
            t || n || e.mode ? r(e) : new f(e)
        }
        function o(e) {
          var t = y[e];
          t && (t.req.destroy(), delete y[e])
        }
        function i(e, t) {
          t = {
            data: t
          };
          var n = e.result.headers;
          return n && (t.headers = e.req.header(n)),
            t
        }
        function a(e, t, n) {
          var r = y[e];
          if (r) {
            "onload" === t && r.result && (n = i(r, n)),
              o(e);
            var s = {
              type: t,
              result: n
            };
            h(s),
              s.stopped || r[t](s.result)
          }
        }
        function c(e, t) {
          a(e, "onload", t)
        }
        function u(e, t) {
          a(e, "onerror", t)
        }
        function l(e, t) {
          var n = m.genUrlSep(e);
          return t = t || "",
            m.isObject(t) && (t = m.object2query(t)),
            t && (e += n + t),
            e
        }
        function d(e, t) {
          t = t || {};
          var n = m.uniqueID(),
            r = {
              result: t.result,
              onload: t.onload || m.f,
              onerror: t.onerror || m.f
            };
          y[n] = r,
            t.onload = c.bind(null, n),
            t.onerror = u.bind(null, n),
            t.query && (e = l(e, t.query));
          var o = t.method || "";
          return o && !/get/i.test(o) || !t.data || (e = l(e, t.data), t.data = null),
            t.url = e,
            r.req = s(t),
            n
        }
        var m = n(8),
          f = n(120),
          p = n(119),
          g = n(118),
          y = {},
          h = m.f;
        d.filter = function (e) {
          m.isFunction(e) && (h = e)
        },
          d.abort = function (e) {
            var t = y[e];
            t && t.req.abort()
          },
          e.exports = d
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          var t = this;
          e.onload && t.once("load", e.onload),
            e.onerror && t.once("error", e.onerror),
            e.onbeforesend && t.once("beforesend", e.onbeforesend),
            e.onaftersend && t.once("aftersend", e.onaftersend),
            e = t.options = s.fetch({
              method: "GET",
              url: "",
              sync: !1,
              data: null,
              headers: {},
              cookie: !1,
              timeout: 6e4,
              type: "text",
              form: null,
              input: null,
              putFileAtEnd: !1,
              proxyUrl: ""
            },
              e);
          var n = e.headers,
            r = "Content-Type";
          s.notexist(n[r]) && (n[r] = "application/x-www-form-urlencoded"),
            t.send()
        }
        var s = n(8),
          o = s.f,
          i = n(175),
          a = r.prototype = Object.create(i.prototype);
        a.send = function () {
          var e = this,
            t = e.options;
          setTimeout(function () {
            try {
              try {
                e.emit("beforesend", t)
              } catch (n) {
                console.error("ignore error ajax beforesend,", n)
              }
              e.doSend()
            } catch (n) {
              console.error("ignore error server error,", n),
                e.onError("serverError", "请求失败:" + n.message)
            }
          },
            0)
        },
          a.doSend = o,
          a.afterSend = function () {
            var e = this;
            setTimeout(function () {
              e.emit("aftersend", e.options)
            },
              0)
          },
          a.onLoad = function (e) {
            var t = this,
              n = t.options,
              r = e.status,
              s = e.result;
            if (0 !== ("" + r).indexOf("2")) return void t.onError("serverError", "服务器返回异常状态", {
              status: r,
              result: s
            });
            if ("json" === n.type) try {
              s = JSON.parse(s)
            } catch (o) {
              return console.error("ignore error parse json,", o),
                void t.onError("parseError", s)
            }
            t.emit("load", s)
          },
          a.onError = function (e, t, n) {
            var r = s.isObject(n) ? n : {};
            r.code = e || "error",
              r.message = t || "发生错误",
              this.emit("error", r)
          },
          a.onTimeout = function () {
            this.onError("timeout", "请求超时")
          },
          a.abort = function () {
            this.onError("abort", "客户端中止")
          },
          a.header = function (e) {
            var t = this;
            if (!s.isArray(e)) return t.getResponseHeader(e || "");
            var n = {};
            return e.forEach(function (e) {
              n[e] = t.header(e)
            }),
              n
          },
          a.getResponseHeader = o,
          a.destroy = o,
          e.exports = r
      },
      function (e, t) {
        e.exports = function (e) {
          if (void 0 == e) throw TypeError("Can't call method on  " + e);
          return e
        }
      },
      function (e, t) {
        e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
      },
      function (e, t) {
        e.exports = {}
      },
      function (e, t) {
        e.exports = !0
      },
      function (e, t, n) {
        var r = n(25),
          s = n(149),
          o = n(44),
          i = n(51)("IE_PROTO"),
          a = function () { },
          c = "prototype",
          u = function () {
            var e, t = n(77)("iframe"),
              r = o.length,
              s = "<",
              i = ">";
            for (t.style.display = "none", n(143).appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write(s + "script" + i + "document.F=Object" + s + "/script" + i), e.close(), u = e.F; r--;) delete u[c][o[r]];
            return u()
          };
        e.exports = Object.create ||
          function (e, t) {
            var n;
            return null !== e ? (a[c] = r(e), n = new a, a[c] = null, n[i] = e) : n = u(),
              void 0 === t ? n : s(n, t)
          }
      },
      function (e, t, n) {
        var r = n(83),
          s = n(44);
        e.exports = Object.keys ||
          function (e) {
            return r(e, s)
          }
      },
      function (e, t) {
        t.f = {}.propertyIsEnumerable
      },
      function (e, t, n) {
        var r = n(14).f,
          s = n(13),
          o = n(19)("toStringTag");
        e.exports = function (e, t, n) {
          e && !s(e = n ? e : e.prototype, o) && r(e, o, {
            configurable: !0,
            value: t
          })
        }
      },
      function (e, t, n) {
        var r = n(52)("keys"),
          s = n(32);
        e.exports = function (e) {
          return r[e] || (r[e] = s(e))
        }
      },
      function (e, t, n) {
        var r = n(9),
          s = "__core-js_shared__",
          o = r[s] || (r[s] = {});
        e.exports = function (e) {
          return o[e] || (o[e] = {})
        }
      },
      function (e, t) {
        var n = Math.ceil,
          r = Math.floor;
        e.exports = function (e) {
          return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e)
        }
      },
      function (e, t, n) {
        var r = n(17);
        e.exports = function (e, t) {
          if (!r(e)) return e;
          var n, s;
          if (t && "function" == typeof (n = e.toString) && !r(s = n.call(e))) return s;
          if ("function" == typeof (n = e.valueOf) && !r(s = n.call(e))) return s;
          if (!t && "function" == typeof (n = e.toString) && !r(s = n.call(e))) return s;
          throw TypeError("Can't convert object to primitive value")
        }
      },
      function (e, t, n) {
        var r = n(9),
          s = n(15),
          o = n(46),
          i = n(56),
          a = n(14).f;
        e.exports = function (e) {
          var t = s.Symbol || (s.Symbol = o ? {} : r.Symbol || {});
          "_" == e.charAt(0) || e in t || a(t, e, {
            value: i.f(e)
          })
        }
      },
      function (e, t, n) {
        t.f = n(19)
      },
      function (e, t) {
        "use strict";
        var n = t.createUniqueKey = "undefined" != typeof Symbol ? Symbol : function (e) {
          return "[[" + e + "_" + Math.random().toFixed(8).slice(2) + "]]"
        };
        t.LISTENERS = n("listeners"),
          t.CAPTURE = 1,
          t.BUBBLE = 2,
          t.ATTRIBUTE = 3,
          t.newNode = function (e, t) {
            return {
              listener: e,
              kind: t,
              next: null
            }
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(57),
          s = n(167),
          o = n(168),
          i = r.LISTENERS,
          a = r.CAPTURE,
          c = r.BUBBLE,
          u = r.ATTRIBUTE,
          l = r.newNode,
          d = s.defineCustomEventTarget,
          m = o.createEventWrapper,
          f = o.STOP_IMMEDIATE_PROPAGATION_FLAG,
          p = "undefined" != typeof window && "undefined" != typeof window.EventTarget,
          g = e.exports = function y() {
            if (!(this instanceof y)) {
              if (1 === arguments.length && Array.isArray(arguments[0])) return d(y, arguments[0]);
              if (arguments.length > 0) {
                for (var e = Array(arguments.length), t = 0; t < arguments.length; ++t) e[t] = arguments[t];
                return d(y, e)
              }
              throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(this, i, {
              value: Object.create(null)
            })
          };
        g.prototype = Object.create((p ? window.EventTarget : Object).prototype, {
          constructor: {
            value: g,
            writable: !0,
            configurable: !0
          },
          addEventListener: {
            value: function (e, t, n) {
              if (null == t) return !1;
              if ("function" != typeof t && "object" != typeof t) throw new TypeError('"listener" is not an object.');
              var r = n ? a : c,
                s = this[i][e];
              if (null == s) return this[i][e] = l(t, r),
                !0;
              for (var o = null; null != s;) {
                if (s.listener === t && s.kind === r) return !1;
                o = s,
                  s = s.next
              }
              return o.next = l(t, r),
                !0
            },
            configurable: !0,
            writable: !0
          },
          removeEventListener: {
            value: function (e, t, n) {
              if (null == t) return !1;
              for (var r = n ? a : c, s = null, o = this[i][e]; null != o;) {
                if (o.listener === t && o.kind === r) return null == s ? this[i][e] = o.next : s.next = o.next,
                  !0;
                s = o,
                  o = o.next
              }
              return !1
            },
            configurable: !0,
            writable: !0
          },
          dispatchEvent: {
            value: function (e) {
              var t = this[i][e.type];
              if (null == t) return !0;
              for (var n = m(e, this); null != t && ("function" == typeof t.listener ? t.listener.call(this, n) : t.kind !== u && "function" == typeof t.listener.handleEvent && t.listener.handleEvent(n), !n[f]);) t = t.next;
              return !n.defaultPrevented
            },
            configurable: !0,
            writable: !0
          }
        })
      },
      function (e, t) {
        function n(e, t) {
          for (var n = t.split("."); n.length;) {
            var r = n.shift(),
              s = !1;
            if ("?" == r[r.length - 1] && (r = r.slice(0, -1), s = !0), e = e[r], !e && s) return e
          }
          return e
        }
        e.exports = n
      },
        , ,
      function (e, t, n) {
        "use strict";
        function r(e) {
          switch (i.notundef(e.type) ? i.verifyFileType(e.type, "msg::FileMessage") : e.type = "file", i.verifyOptions(e, "file", "msg::FileMessage"), i.verifyOptions(e.file, "url ext size md5", !0, "file.", "msg::FileMessage"), e.type) {
            case "image":
              c.verifyFile(e.file, "msg::FileMessage");
              break;
            case "audio":
              u.verifyFile(e.file, "msg::FileMessage");
              break;
            case "video":
              l.verifyFile(e.file, "msg::FileMessage")
          }
          o.call(this, e),
            this.attach = JSON.stringify(e.file)
        }
        var s = n(64),
          o = n(24),
          i = n(1),
          a = n(3);
        r.prototype = Object.create(o.prototype),
          r.reverse = function (e) {
            var t = o.reverse(e);
            e.attach = e.attach ? "" + e.attach : "",
              t.file = e.attach ? JSON.parse(e.attach) : {};
            var n = t.file.url,
              r = (0, s.url2object)(n),
              i = r.hostname,
              c = r.path,
              u = a.downloadHost,
              l = a.downloadUrl;
            if (i === u) {
              var d = c.indexOf("/");
              if (d !== -1) {
                var m = c.substring(0, d),
                  f = c.substring(d + 1);
                t.file.url = l.replace("{bucket}", m).replace("{object}", f)
              }
            } else if (i.indexOf(u) !== -1) {
              var p = r.path,
                g = p.indexOf(".");
              if (g !== -1) {
                var y = p.substring(0, g),
                  h = p;
                t.file.url = l.replace("{bucket}", y).replace("{object}", h)
              }
            }
            return "audio" === t.type && (t.file.mp3Url = t.file.url + "?audioTrans&type=mp3"),
              e.enabledHttpsForMessage && (t.file.url = n.replace("http", "https")),
              t
          },
          e.exports = r;
        var c = n(226),
          u = n(223),
          l = n(232)
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          s.merge(this, e),
            s.notundef(this.gender) && (s.verifyParamValid("gender", this.gender, r.validGenders, "user::User"), this.gender = o[this.gender]),
            s.notundef(this.email) && "" !== this.email && s.verifyEmail("email", this.email, "user::User"),
            s.notundef(this.birth) && "" !== this.birth && s.verifyBirth("birth", this.birth, "user::User"),
            s.notundef(this.tel) && "" !== this.tel && s.verifyTel("tel", this.tel, "user::User")
        }
        var s = n(1),
          o = {
            unknown: 0,
            male: 1,
            female: 2
          },
          i = {
            0: "unknown",
            1: "male",
            2: "female"
          };
        r.reverse = function (e) {
          var t = s.filterObj(e, "account nick avatar sign gender email birth tel custom createTime updateTime");
          return s.notundef(t.gender) && (t.gender = i[t.gender]),
            s.notundef(t.createTime) && (t.createTime = +t.createTime),
            s.notundef(t.updateTime) && (t.updateTime = +t.updateTime),
            t
        },
          r.reverseUsers = function (e) {
            return e.map(function (e) {
              return r.reverse(e)
            })
          },
          r.validGenders = Object.keys(o),
          e.exports = r
      },
      function (e, t) {
        "use strict";
        t.__esModule = !0,
          t["default"] = {
            genUrlSep: function (e) {
              e = "" + e;
              var t = e.indexOf("?") === -1 ? "?imageView&" : "&";
              return t
            },
            url2object: function (e) {
              e = e || "";
              var t = e.indexOf("https") >= 0 ? "https://" : "http://",
                n = e.replace(t, "");
              n.indexOf("?") >= 0 && (n = n.substring(0, n.indexOf("?")));
              var r = n.split("/");
              n = r[0];
              var s = "";
              if (r.length > 0 && (s = r.slice(1).join("/")), e.indexOf("?") === -1) return {
                protocol: t,
                hostname: n,
                path: s,
                query: {}
              };
              var o = e.substr(e.indexOf("?") + 1),
                i = o.split("&"),
                a = {};
              return i.forEach(function (e) {
                if (e.indexOf("=") > 0) {
                  var t = e.split("=");
                  a[t[0]] = decodeURIComponent(t[1])
                } else a[e] = ""
              }),
                {
                  protocol: t,
                  hostname: n,
                  path: s,
                  query: a
                }
            },
            object2url: function (e) {
              var t = e.protocol,
                n = e.hostname,
                r = e.path,
                s = e.query;
              t = t || "http://",
                n = n || "",
                r && (n = n + "/" + r),
                s = s || {};
              var o = [];
              for (var i in s) "imageView" !== i && o.push(i + "=" + encodeURIComponent(s[i]));
              return o.length > 0 ? "" + t + n + "?imageView&" + o.join("&") : "" + t + n
            }
          },
          e.exports = t["default"]
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          return e && e.__esModule ? e : {
            "default": e
          }
        }
        var s = n(29),
          o = r(s),
          i = function () {
            function e() {
              (0, o["default"])(this, e)
            }
            return e.prototype.getItem = function (e) {
              return wx.getStorageSync(e)
            },
              e.prototype.setItem = function (e, t) {
                return wx.setStorageSync(e, t)
              },
              e.prototype.removeItem = function (e) {
                return this.setItem(e, "")
              },
              e.prototype.clear = function () {
                return wx.clearStorageSync()
              },
              e
          }();
        e.exports = new i
      },
      function (e, t) {
        "use strict";
        e.exports = {}
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          return e && e.__esModule ? e : {
            "default": e
          }
        }
        var s = n(29),
          o = r(s),
          i = n(132),
          a = r(i),
          c = n(74),
          u = r(c),
          l = n(73),
          d = r(l),
          m = n(87),
          f = n(58),
          p = 0,
          g = 1,
          y = 2,
          h = 3,
          v = ["open", "error", "message", "close"],
          b = function (e) {
            function t(n, r) {
              if ((0, o["default"])(this, t), !n) throw new TypeError("Failed to construct 'WebSocket': url required");
              if (r && (!wx.canIUse || !wx.canIUse("connectSocket.object.protocols"))) throw new Error("subprotocal not supported in weapp");
              var s = (0, u["default"])(this, e.call(this));
              return n = n.replace(/:\d+/, ""),
                s._url = n,
                s._protocal = r || "",
                s._readyState = p,
                s._socketTask = wx.connectSocket({
                  url: n,
                  protocals: s._protocal,
                  fail: function (e) {
                    console.info("wx::ws: sockets build failed ..."),
                      s.errorHandler.call(s, e)
                  },
                  success: function (e) {
                    console.log("wx::ws: sockets build succeed ...")
                  }
                }),
                s._socketTask.onOpen(function (e) {
                  s._readyState = g,
                    s.dispatchEvent({
                      type: "open"
                    })
                }),
                s._socketTask.onError(function (e) {
                  s.errorHandler.call(s, e)
                }),
                s._socketTask.onClose(function () {
                  s._readyState = h;
                  var e = event,
                    t = e.code,
                    n = e.reason,
                    r = e.wasClean;
                  s.dispatchEvent({
                    code: t,
                    reason: n,
                    wasClean: r,
                    type: "close"
                  }),
                    s._socketTask = null
                }),
                s._socketTask.onMessage(function (e) {
                  var t = e.data,
                    n = e.origin,
                    r = e.ports,
                    o = e.source;
                  s.dispatchEvent({
                    data: t,
                    origin: n,
                    ports: r,
                    source: o,
                    type: "message"
                  })
                }),
                s
            }
            return (0, d["default"])(t, e),
              t.prototype.close = function () {
                this._readyState !== h && (this._readyState === p && console.warn("wx::ws:close WebSocket which is connecting might not work"), this._socketTask.close({
                  code: 1e3,
                  reason: "wx::ws:user manually close websocket"
                }))
              },
              t.prototype.send = function (e) {
                if (this._readyState !== g) throw new Error("wx:ws: sendMsg when readyState=" + this._readyState);
                if (!("string" == typeof e || e instanceof ArrayBuffer)) throw new TypeError("wx:ws: sendMsg only String/ArrayBuffer supported");
                this._socketTask.send({
                  data: e
                })
              },
              t.prototype.errorHandler = function (e) {
                "" !== e.message && (this._readyState = h, this.dispatchEvent({
                  type: "error",
                  message: e.errMsg
                }), this._socketTask = null)
              },
              (0, a["default"])(t, [{
                key: "url",
                get: function () {
                  return this._url
                }
              },
              {
                key: "protocal",
                get: function () {
                  return this._protocal
                }
              },
              {
                key: "readyState",
                get: function () {
                  return this._readyState
                }
              }]),
              t
          }(f(v));
        m(b, {
          CONNECTING: p,
          OPEN: g,
          CLOSING: y,
          CLOSED: h
        }),
          e.exports = b
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          return e && e.__esModule ? e : {
            "default": e
          }
        }
        function s(e) {
          this.status = e.statusCode,
            this.statusText = e.statusCode,
            e.header && (this._responseHeaders = Object.keys(e.header).reduce(function (t, n) {
              return t[n.toLowerCase()] = e.header[n],
                t
            },
              {}));
          var t = e.data;
          "string" != typeof t && (t = JSON.stringify(t)),
            this.responseText = this.response = t,
            this.readyState = v,
            this.dispatchEvent({
              type: "readystatechange"
            })
        }
        var o = n(29),
          i = r(o),
          a = n(74),
          c = r(a),
          u = n(73),
          l = r(u),
          d = n(87),
          m = n(58),
          f = n(35),
          p = 0,
          g = 1,
          y = 2,
          h = 3,
          v = 4,
          b = ["abort", "error", "load", "loadstart", "progress", "timeout", "loadend", "readystatechange"],
          M = ["abort", "error", "load", "loadstart", "progress", "timeout", "loadend"],
          T = function (e) {
            function t() {
              return (0, i["default"])(this, t),
                (0, c["default"])(this, e.apply(this, arguments))
            }
            return (0, l["default"])(t, e),
              t
          }(m(M)),
          S = function (e) {
            function t() {
              (0, i["default"])(this, t);
              var n = (0, c["default"])(this, e.call(this));
              return n.readyState = p,
                n._headers = {},
                n.upload = new T,
                n
            }
            return (0, l["default"])(t, e),
              t.prototype.abort = function () {
                if (!this._request || this._request.abort) return this.status = 0,
                  this.readyState = v,
                  this._request.abort();
                throw new Error("该版本基础库不支持 abort request")
              },
              t.prototype.getAllResponseHeaders = function () {
                var e = this;
                return this._responseHeaders ? Object.keys(this._responseHeaders).map(function (t) {
                  return t + ": " + e._responseHeaders[t]
                }).join("\r\n") : ""
              },
              t.prototype.getResponseHeader = function (e) {
                var t = e.toLowerCase();
                return this._responseHeaders && this._responseHeaders[t] ? this._responseHeaders[t] : null
              },
              t.prototype.overrideMimeType = function () {
                throw new Error("not supported in weapp")
              },
              t.prototype.open = function (e, t) {
                var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                if (this.readyState !== p) throw new Error("request is already opened");
                if (!n) throw new Error("sync request is not supported");
                this._method = e,
                  t = t.replace(/:\d+/, ""),
                  this._url = t,
                  this.readyState = g,
                  this.dispatchEvent({
                    type: "readystatechange"
                  })
              },
              t.prototype.setRequestHeader = function (e, t) {
                if (this.readyState !== g) throw new Error("request is not opened");
                this._headers[e.toLowerCase()] = t
              },
              t.prototype.send = function (e) {
                var t = this;
                if (this.readyState !== g) throw new Error("request is not opened");
                if (e instanceof f) {
                  var n = e.entries(),
                    r = n.filter(function (e) {
                      return "string" != typeof e[1]
                    });
                  if (0 === r.length) throw new Error("Must specify a Blob field in FormData");
                  r.length > 1 && console.warn("Only the first Blob will be send in Weapp");
                  var o = n.filter(function (e) {
                    return "string" == typeof e[1]
                  }).reduce(function (e, t) {
                    var n;
                    return d(e, (n = {},
                      n[t[0]] = t[1], n))
                  },
                    {});
                  this._request = wx.uploadFile({
                    url: this._url,
                    name: r[0][0],
                    filePath: r[0][1].uri,
                    formData: o,
                    header: this._headers,
                    success: s.bind(this),
                    fail: function (e) {
                      t.status = 0,
                        t.readyState = v,
                        t.dispatchEvent({
                          type: "readystatechange"
                        }),
                        t.dispatchEvent({
                          type: "error"
                        })
                    }
                  }),
                    this._request && this._request.onProgressUpdate && this._request.onProgressUpdate(function (e) {
                      var n = e.totalBytesSent,
                        r = e.totalBytesExpectedToSend;
                      t.upload.dispatchEvent({
                        type: "progress",
                        loaded: n,
                        total: r
                      })
                    })
                } else this._request = wx.request({
                  url: this._url,
                  data: e || "",
                  method: this._method.toUpperCase(),
                  header: this._headers,
                  success: s.bind(this),
                  fail: function (e) {
                    t.status = 0,
                      t.readyState = v,
                      t.dispatchEvent({
                        type: "readystatechange"
                      }),
                      t.dispatchEvent({
                        type: "error"
                      })
                  }
                })
              },
              t
          }(m(b));
        d(S, {
          UNSENT: p,
          OPENED: g,
          HEADERS_RECEIVED: y,
          LOADING: h,
          DONE: v
        }),
          e.exports = S
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          s.verifyOptions(e, "type", "image::ImageOp"),
            s.verifyParamValid("type", e.type, r.validTypes, "image::ImageOp"),
            s.merge(this, e),
            this.type = o[e.type]
        }
        var s = n(1),
          o = {
            stripmeta: 0,
            blur: 2,
            quality: 3,
            crop: 4,
            rotate: 5,
            thumbnail: 7,
            interlace: 9
          },
          i = {
            0: "stripmeta",
            1: "type",
            2: "blur",
            3: "quality",
            4: "crop",
            5: "rotate",
            6: "pixel",
            7: "thumbnail",
            8: "watermark",
            9: "interlace",
            10: "tmp"
          };
        r.validTypes = Object.keys(o),
          r.reverse = function (e) {
            var t = s.copy(e);
            return t.type = i[t.type],
              t
          },
          r.reverseImageOps = function (e) {
            return e.map(function (e) {
              return r.reverse(e)
            })
          },
          e.exports = r
      },
      function (e, t) {
        "use strict";
        var n = {
          link: {
            id: 1,
            heartbeat: 2
          },
          misc: {
            id: 6,
            getSimpleNosToken: 1,
            getNosToken: 2,
            notifyUploadLog: 3,
            uploadSdkLogUrl: 4,
            audioToText: 5,
            processImage: 6
          }
        },
          r = {
            heartbeat: {
              sid: n.link.id,
              cid: n.link.heartbeat
            },
            getSimpleNosToken: {
              sid: n.misc.id,
              cid: n.misc.getSimpleNosToken,
              params: [{
                type: "int",
                name: "num"
              }]
            },
            getNosToken: {
              sid: n.misc.id,
              cid: n.misc.getNosToken,
              params: [{
                type: "String",
                name: "responseBody"
              }]
            },
            uploadSdkLogUrl: {
              sid: n.misc.id,
              cid: n.misc.uploadSdkLogUrl,
              params: [{
                type: "string",
                name: "url"
              }]
            },
            audioToText: {
              sid: n.misc.id,
              cid: n.misc.audioToText,
              params: [{
                type: "Property",
                name: "audioToText"
              }]
            },
            processImage: {
              sid: n.misc.id,
              cid: n.misc.processImage,
              params: [{
                type: "String",
                name: "url"
              },
              {
                type: "PropertyArray",
                name: "imageOps",
                entity: "imageOp"
              }]
            }
          },
          s = {
            "1_2": {
              service: "link",
              cmd: "heartbeat"
            },
            "6_1": {
              service: "misc",
              cmd: "getSimpleNosToken",
              response: [{
                type: "PropertyArray",
                name: "nosTokens",
                entity: "nosToken"
              }]
            },
            "6_2": {
              service: "misc",
              cmd: "getNosToken",
              response: [{
                type: "Property",
                name: "nosToken"
              }]
            },
            "6_3": {
              service: "misc",
              cmd: "notifyUploadLog"
            },
            "6_5": {
              service: "misc",
              cmd: "audioToText",
              response: [{
                type: "String",
                name: "text"
              }]
            },
            "6_6": {
              service: "misc",
              cmd: "processImage",
              response: [{
                type: "String",
                name: "url"
              }]
            }
          };
        e.exports = {
          idMap: n,
          cmdConfig: r,
          packetConfig: s
        }
      },
      function (e, t, n) {
        "use strict";
        var r = n(8),
          s = r.getGlobal(),
          o = {},
          i = s.name || "_parent",
          a = [],
          c = "MSG|",
          u = [];
        o.addMsgListener = function (e) {
          a.push(e)
        };
        var l = function (e) {
          for (var t = 0,
            n = a.length; t < n; t++) try {
              a[t].call(null, e)
            } catch (r) { }
        },
          d = function () {
            var e = /^([\w]+?:\/\/.*?(?=\/|$))/i;
            return function (t) {
              return t = t || "",
                e.test(t) ? RegExp.$1 : "*"
            }
          }(),
          m = function () {
            var e = unescape(s.name || "").trim();
            if (e && 0 === e.indexOf(c)) {
              s.name = "";
              var t = r.string2object(e.replace(c, ""), "|"),
                n = (t.origin || "").toLowerCase();
              n && "*" !== n && 0 !== location.href.toLowerCase().indexOf(n) || l({
                data: JSON.parse(t.data || "null"),
                source: s.frames[t.self] || t.self,
                origin: d(t.ref || document.referrer)
              })
            }
          },
          f = function () {
            var e, t = function (e, t) {
              for (var n = 0,
                r = e.length; n < r; n++) if (e[n] === t) return !0;
              return !1
            };
            return function () {
              if (u.length) {
                e = [];
                for (var n, r = u.length - 1; r >= 0; r--) n = u[r],
                  t(e, n.w) || (e.push(n.w), u.splice(r, 1), n.w.name = n.d);
                e = null
              }
            }
          }(),
          p = o.startTimer = function () {
            var e = !1;
            return function () {
              e || (e = !0, s.postMessage || (setInterval(f, 100), setInterval(m, 20)))
            }
          }();
        o.postMessage = function (e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          if (r.fillUndef(t, {
            origin: "*",
            source: i
          }), s.postMessage) {
            var n = t.data;
            s.FormData || (n = JSON.stringify(n)),
              e.postMessage(n, t.origin)
          } else {
            if (p(), r.isObject(t)) {
              var o = {};
              o.origin = t.origin || "",
                o.ref = location.href,
                o.self = t.source,
                o.data = JSON.stringify(t.data),
                t = c + r.object2string(o, "|", !0)
            }
            u.unshift({
              w: e,
              d: escape(t)
            })
          }
        },
          e.exports = o
      },
      function (e, t, n) {
        "use strict";
        var r = n(1),
          s = {};
        s.fromDataURL = r.blobFromDataURL,
          e.exports = s
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          return e && e.__esModule ? e : {
            "default": e
          }
        }
        t.__esModule = !0;
        var s = n(129),
          o = r(s),
          i = n(127),
          a = r(i),
          c = n(6),
          u = r(c);
        t["default"] = function (e, t) {
          if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + ("undefined" == typeof t ? "undefined" : (0, u["default"])(t)));
          e.prototype = (0, a["default"])(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }),
            t && (o["default"] ? (0, o["default"])(e, t) : e.__proto__ = t)
        }
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          return e && e.__esModule ? e : {
            "default": e
          }
        }
        t.__esModule = !0;
        var s = n(6),
          o = r(s);
        t["default"] = function (e, t) {
          if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || "object" !== ("undefined" == typeof t ? "undefined" : (0, o["default"])(t)) && "function" != typeof t ? e : t
        }
      },
      function (e, t) {
        var n = {}.toString;
        e.exports = function (e) {
          return n.call(e).slice(8, -1)
        }
      },
      function (e, t, n) {
        var r = n(139);
        e.exports = function (e, t, n) {
          if (r(e), void 0 === t) return e;
          switch (n) {
            case 1:
              return function (n) {
                return e.call(t, n)
              };
            case 2:
              return function (n, r) {
                return e.call(t, n, r)
              };
            case 3:
              return function (n, r, s) {
                return e.call(t, n, r, s)
              }
          }
          return function () {
            return e.apply(t, arguments)
          }
        }
      },
      function (e, t, n) {
        var r = n(17),
          s = n(9).document,
          o = r(s) && r(s.createElement);
        e.exports = function (e) {
          return o ? s.createElement(e) : {}
        }
      },
      function (e, t, n) {
        e.exports = !n(12) && !n(30)(function () {
          return 7 != Object.defineProperty(n(77)("div"), "a", {
            get: function () {
              return 7
            }
          }).a
        })
      },
      function (e, t, n) {
        "use strict";
        var r = n(46),
          s = n(26),
          o = n(84),
          i = n(16),
          a = n(13),
          c = n(45),
          u = n(146),
          l = n(50),
          d = n(151),
          m = n(19)("iterator"),
          f = !([].keys && "next" in [].keys()),
          p = "@@iterator",
          g = "keys",
          y = "values",
          h = function () {
            return this
          };
        e.exports = function (e, t, n, v, b, M, T) {
          u(n, t, v);
          var S, k, w, C = function (e) {
            if (!f && e in x) return x[e];
            switch (e) {
              case g:
                return function () {
                  return new n(this, e)
                };
              case y:
                return function () {
                  return new n(this, e)
                }
            }
            return function () {
              return new n(this, e)
            }
          },
            O = t + " Iterator",
            _ = b == y,
            I = !1,
            x = e.prototype,
            E = x[m] || x[p] || b && x[b],
            P = !f && E || C(b),
            A = b ? _ ? C("entries") : P : void 0,
            R = "Array" == t ? x.entries || E : E;
          if (R && (w = d(R.call(new e)), w !== Object.prototype && w.next && (l(w, O, !0), r || a(w, m) || i(w, m, h))), _ && E && E.name !== y && (I = !0, P = function () {
            return E.call(this)
          }), r && !T || !f && !I && x[m] || i(x, m, P), c[t] = P, c[O] = h, b) if (S = {
            values: _ ? P : C(y),
            keys: M ? P : C(g),
            entries: A
          },
            T) for (k in S) k in x || o(x, k, S[k]);
            else s(s.P + s.F * (f || I), t, S);
          return S
        }
      },
      function (e, t, n) {
        var r = n(49),
          s = n(31),
          o = n(18),
          i = n(54),
          a = n(13),
          c = n(78),
          u = Object.getOwnPropertyDescriptor;
        t.f = n(12) ? u : function (e, t) {
          if (e = o(e), t = i(t, !0), c) try {
            return u(e, t)
          } catch (n) { }
          if (a(e, t)) return s(!r.f.call(e, t), e[t])
        }
      },
      function (e, t, n) {
        var r = n(83),
          s = n(44).concat("length", "prototype");
        t.f = Object.getOwnPropertyNames ||
          function (e) {
            return r(e, s)
          }
      },
      function (e, t) {
        t.f = Object.getOwnPropertySymbols
      },
      function (e, t, n) {
        var r = n(13),
          s = n(18),
          o = n(141)(!1),
          i = n(51)("IE_PROTO");
        e.exports = function (e, t) {
          var n, a = s(e),
            c = 0,
            u = [];
          for (n in a) n != i && r(a, n) && u.push(n);
          for (; t.length > c;) r(a, n = t[c++]) && (~o(u, n) || u.push(n));
          return u
        }
      },
      function (e, t, n) {
        e.exports = n(16)
      },
      function (e, t) {
        function n(e) {
          var t = r.call(e);
          return "[object Function]" === t || "function" == typeof e && "[object RegExp]" !== t || "undefined" != typeof window && (e === window.setTimeout || e === window.alert || e === window.confirm || e === window.prompt)
        }
        e.exports = n;
        var r = Object.prototype.toString
      },
      function (e, t) {
        e.exports = function n(e, t) {
          "use strict";
          var r, s, o = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
            i = /(^[ ]*|[ ]*$)/g,
            a = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
            c = /^0x[0-9a-f]+$/i,
            u = /^0/,
            l = function (e) {
              return n.insensitive && ("" + e).toLowerCase() || "" + e
            },
            d = l(e).replace(i, "") || "",
            m = l(t).replace(i, "") || "",
            f = d.replace(o, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
            p = m.replace(o, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
            g = parseInt(d.match(c), 16) || 1 !== f.length && d.match(a) && Date.parse(d),
            y = parseInt(m.match(c), 16) || g && m.match(a) && Date.parse(m) || null;
          if (y) {
            if (g < y) return - 1;
            if (g > y) return 1
          }
          for (var h = 0,
            v = Math.max(f.length, p.length); h < v; h++) {
            if (r = !(f[h] || "").match(u) && parseFloat(f[h]) || f[h] || 0, s = !(p[h] || "").match(u) && parseFloat(p[h]) || p[h] || 0, isNaN(r) !== isNaN(s)) return isNaN(r) ? 1 : -1;
            if (typeof r != typeof s && (r += "", s += ""), r < s) return - 1;
            if (r > s) return 1
          }
          return 0
        }
      },
      function (e, t) {
        /*
      object-assign
      (c) Sindre Sorhus
      @license MIT
      */
        "use strict";
        function n(e) {
          if (null === e || void 0 === e) throw new TypeError("Object.assign cannot be called with null or undefined");
          return Object(e)
        }
        function r() {
          try {
            if (!Object.assign) return !1;
            var e = new String("abc");
            if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
            for (var t = {},
              n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;
            var r = Object.getOwnPropertyNames(t).map(function (e) {
              return t[e]
            });
            if ("0123456789" !== r.join("")) return !1;
            var s = {};
            return "abcdefghijklmnopqrst".split("").forEach(function (e) {
              s[e] = e
            }),
              "abcdefghijklmnopqrst" === Object.keys(Object.assign({},
                s)).join("")
          } catch (o) {
            return !1
          }
        }
        var s = Object.getOwnPropertySymbols,
          o = Object.prototype.hasOwnProperty,
          i = Object.prototype.propertyIsEnumerable;
        e.exports = r() ? Object.assign : function (e, t) {
          for (var r, a, c = n(e), u = 1; u < arguments.length; u++) {
            r = Object(arguments[u]);
            for (var l in r) o.call(r, l) && (c[l] = r[l]);
            if (s) {
              a = s(r);
              for (var d = 0; d < a.length; d++) i.call(r, a[d]) && (c[a[d]] = r[a[d]])
            }
          }
          return c
        }
      },
      function (e, t) {
        e.exports = function (e) {
          return e.webpackPolyfill || (e.deprecate = function () { },
            e.paths = [], e.children = [], e.webpackPolyfill = 1),
            e
        }
      },
      function (e, t, n) {
        var r; (function (s) {
          !
          function (o, i) {
            "use strict";
            function a() {
              return "undefined" != typeof o ? o : "undefined" != typeof self ? self : "undefined" != typeof s ? s : {}
            }
            o = a();
            var c, u = o.IDBKeyRange || o.webkitIDBKeyRange,
              l = {
                readonly: "readonly",
                readwrite: "readwrite"
              },
              d = Object.prototype.hasOwnProperty,
              m = function () {
                if (!c && (c = o.indexedDB || o.webkitIndexedDB || o.mozIndexedDB || o.oIndexedDB || o.msIndexedDB || (null === o.indexedDB && o.shimIndexedDB ? o.shimIndexedDB : i), !c)) throw "IndexedDB required";
                return c
              },
              f = function (e) {
                return e
              },
              p = function (e) {
                return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
              },
              g = function (e) {
                return "function" == typeof e
              },
              y = function (e) {
                return "number" === p(e)
              },
              h = function (e) {
                return "array" === p(e)
              },
              v = function (e) {
                return e === i
              },
              b = function (e, t) {
                var n = this,
                  r = !1;
                this.name = t,
                  this.getIndexedDB = function () {
                    return e
                  },
                  this.add = function (t) {
                    if (r) throw "Database has been closed";
                    for (var s = [], o = 0, i = 0; i < arguments.length - 1; i++) if (Array.isArray(arguments[i + 1])) for (var a = 0; a < arguments[i + 1].length; a++) s[o] = arguments[i + 1][a],
                      o++;
                    else s[o] = arguments[i + 1],
                      o++;
                    var c = e.transaction(t, l.readwrite),
                      u = c.objectStore(t);
                    return new Promise(function (e, t) {
                      s.forEach(function (e) {
                        var t;
                        if (e.item && e.key) {
                          var n = e.key;
                          e = e.item,
                            t = u.add(e, n)
                        } else t = u.add(e);
                        t.onsuccess = function (t) {
                          var n = t.target,
                            r = n.source.keyPath;
                          null === r && (r = "__id__"),
                            Object.defineProperty(e, r, {
                              value: n.result,
                              enumerable: !0
                            })
                        }
                      }),
                        c.oncomplete = function () {
                          e(s, n)
                        },
                        c.onerror = function (e) {
                          e.preventDefault(),
                            t(e)
                        },
                        c.onabort = function (e) {
                          t(e)
                        }
                    })
                  },
                  this.updateAndDelete = function (t, n, s) {
                    if (r) throw "Database has been closed";
                    var o = e.transaction(t, l.readwrite),
                      i = o.objectStore(t),
                      a = i.keyPath;
                    return new Promise(function (e, t) {
                      n.forEach(function (e) {
                        if (e.item && e.key) {
                          var t = e.key;
                          e = e.item,
                            i.put(e, t)
                        } else i.put(e)
                      }),
                        s.forEach(function (e) {
                          i["delete"](e[a])
                        }),
                        o.oncomplete = function () {
                          e([n, s])
                        },
                        o.onerror = function (e) {
                          t(e)
                        }
                    })
                  },
                  this.update = function (t) {
                    if (r) throw "Database has been closed";
                    for (var s, o = [], i = 1; i < arguments.length; i++) s = arguments[i],
                      Array.isArray(s) ? o = o.concat(s) : o.push(s);
                    var a = e.transaction(t, l.readwrite),
                      c = a.objectStore(t);
                    c.keyPath;
                    return new Promise(function (e, t) {
                      o.forEach(function (e) {
                        var t;
                        if (e.item && e.key) {
                          var n = e.key;
                          e = e.item,
                            t = c.put(e, n)
                        } else t = c.put(e);
                        t.onsuccess = function (e) { },
                          t.onerror = function (e) { }
                      }),
                        a.oncomplete = function () {
                          e(o, n)
                        },
                        a.onerror = function (e) {
                          t(e)
                        },
                        a.onabort = function (e) {
                          t(e)
                        }
                    })
                  },
                  this.remove = function (t, n) {
                    if (r) throw "Database has been closed";
                    var s = e.transaction(t, l.readwrite),
                      o = s.objectStore(t);
                    return new Promise(function (e, t) {
                      Array.isArray(n) || (n = [n]),
                        n.forEach(function (e) {
                          o["delete"](e)
                        }),
                        s.oncomplete = function () {
                          e(n)
                        },
                        s.onerror = function (e) {
                          t(e)
                        },
                        s.onabort = function (e) {
                          t(e)
                        }
                    })
                  },
                  this.clear = function (t) {
                    if (r) throw "Database has been closed";
                    var n = e.transaction(t, l.readwrite),
                      s = n.objectStore(t);
                    s.clear();
                    return new Promise(function (e, t) {
                      n.oncomplete = function () {
                        e()
                      },
                        n.onerror = function (e) {
                          t(e)
                        }
                    })
                  },
                  this.close = function () {
                    r || (e.close(), r = !0, delete k[t])
                  },
                  this.get = function (t, n) {
                    if (r) throw "Database has been closed";
                    var s = e.transaction(t),
                      o = s.objectStore(t),
                      i = o.get(n);
                    return new Promise(function (e, t) {
                      i.onsuccess = function (t) {
                        e(t.target.result)
                      },
                        s.onerror = function (e) {
                          t(e)
                        }
                    })
                  },
                  this.query = function (t, n) {
                    if (r) throw "Database has been closed";
                    return new M(t, e, n)
                  },
                  this.count = function (t, n) {
                    if (r) throw "Database has been closed";
                    var s = e.transaction(t);
                    s.objectStore(t)
                  };
                for (var s = 0,
                  o = e.objectStoreNames.length; s < o; s++) !
                    function (e) {
                      n[e] = {};
                      for (var t in n) d.call(n, t) && "close" !== t && (n[e][t] = function (t) {
                        return function () {
                          var r = [e].concat([].slice.call(arguments, 0));
                          return n[t].apply(n, r)
                        }
                      }(t))
                    }(e.objectStoreNames[s])
              },
              M = function (e, t, n) {
                var r = this,
                  s = !1,
                  o = !1,
                  a = function (r, a, c, d, m, f, p) {
                    return new Promise(function (y, h) {
                      var v = s || o ? l.readwrite : l.readonly,
                        b = t.transaction(e, v),
                        M = b.objectStore(e),
                        T = n ? M.index(n) : M,
                        S = r ? u[r].apply(null, a) : null,
                        k = [],
                        w = [S],
                        C = 0;
                      m = m ? m : null,
                        f = f ? f : [],
                        "count" !== c && w.push(d || "next");
                      var O = !!s && Object.keys(s),
                        _ = function (e) {
                          for (var t = 0; t < O.length; t++) {
                            var n = O[t],
                              r = s[n];
                            r instanceof Function && (r = r(e)),
                              e[n] = r
                          }
                          return e
                        };
                      T[c].apply(T, w).onsuccess = function (e) {
                        var t = e.target.result;
                        if ("number" == typeof t) k = t;
                        else if (t) if (null !== m && m[0] > C) C = m[0],
                          t.advance(m[0]);
                        else if (null !== m && C >= m[0] + m[1]);
                        else {
                          var n = !0,
                            r = "value" in t ? t.value : t.key;
                          f.forEach(function (e) {
                            e && e.length && (2 === e.length ? n = n && r[e[0]] === e[1] : g(e[0]) && (n = n && e[0].apply(i, [r])))
                          }),
                            n && (C++ , k.push(p(r)), o ? t["delete"]() : s && (r = _(r), t.update(r))),
                            t["continue"]()
                        }
                      },
                        b.oncomplete = function () {
                          y(k)
                        },
                        b.onerror = function (e) {
                          h(e)
                        },
                        b.onabort = function (e) {
                          h(e)
                        }
                    })
                  },
                  c = function (e, t) {
                    var n = "next",
                      r = "openCursor",
                      i = [],
                      c = null,
                      u = f,
                      l = !1,
                      d = function () {
                        return a(e, t, r, l ? n + "unique" : n, c, i, u)
                      },
                      m = function () {
                        return n = null,
                          r = "count",
                          {
                            execute: d
                          }
                      },
                      p = function () {
                        return c = h(arguments[0]) ? arguments[0] : Array.prototype.slice.call(arguments, 0, 2),
                          1 == c.length && c.unshift(0),
                          y(c[1]) || (c = null),
                          {
                            execute: d,
                            count: m,
                            keys: b,
                            filter: M,
                            asc: T,
                            desc: S,
                            distinct: k,
                            modify: w,
                            limit: p,
                            map: C,
                            remove: O
                          }
                      },
                      b = function (e) {
                        return e = !!v(e) || !!e,
                          e && (r = "openKeyCursor"),
                          {
                            execute: d,
                            keys: b,
                            filter: M,
                            asc: T,
                            desc: S,
                            distinct: k,
                            modify: w,
                            limit: p,
                            map: C,
                            remove: O
                          }
                      },
                      M = function () {
                        return i.push(Array.prototype.slice.call(arguments, 0, 2)),
                          {
                            execute: d,
                            count: m,
                            keys: b,
                            filter: M,
                            asc: T,
                            desc: S,
                            distinct: k,
                            modify: w,
                            limit: p,
                            map: C,
                            remove: O
                          }
                      },
                      T = function (e) {
                        return e = !!v(e) || !!e,
                          n = e ? "next" : "prev",
                          {
                            execute: d,
                            count: m,
                            keys: b,
                            filter: M,
                            asc: T,
                            desc: S,
                            distinct: k,
                            modify: w,
                            limit: p,
                            map: C,
                            remove: O
                          }
                      },
                      S = function (e) {
                        return e = !!v(e) || !!e,
                          n = e ? "prev" : "next",
                          {
                            execute: d,
                            count: m,
                            keys: b,
                            filter: M,
                            asc: T,
                            desc: S,
                            distinct: k,
                            modify: w,
                            limit: p,
                            map: C,
                            remove: O
                          }
                      },
                      k = function (e) {
                        return e = !!v(e) || !!e,
                          l = e,
                          {
                            execute: d,
                            count: m,
                            keys: b,
                            filter: M,
                            asc: T,
                            desc: S,
                            distinct: k,
                            modify: w,
                            limit: p,
                            map: C,
                            remove: O
                          }
                      },
                      w = function (e) {
                        return s = e,
                          {
                            execute: d,
                            count: m,
                            keys: b,
                            filter: M,
                            asc: T,
                            desc: S,
                            distinct: k,
                            modify: w,
                            limit: p,
                            map: C,
                            remove: O
                          }
                      },
                      C = function (e) {
                        return g(e) && (u = e),
                          {
                            execute: d,
                            count: m,
                            keys: b,
                            filter: M,
                            asc: T,
                            desc: S,
                            distinct: k,
                            modify: w,
                            limit: p,
                            map: C,
                            remove: O
                          }
                      },
                      O = function (e) {
                        return e = !!v(e) || !!e,
                          o = e,
                          {
                            execute: d,
                            count: m,
                            keys: b,
                            filter: M,
                            asc: T,
                            desc: S,
                            distinct: k,
                            modify: w,
                            limit: p,
                            map: C,
                            remove: O
                          }
                      };
                    return {
                      execute: d,
                      count: m,
                      keys: b,
                      filter: M,
                      asc: T,
                      desc: S,
                      distinct: k,
                      modify: w,
                      limit: p,
                      map: C,
                      remove: O
                    }
                  };
                "only bound upperBound lowerBound".split(" ").forEach(function (e) {
                  r[e] = function () {
                    return new c(e, arguments)
                  }
                }),
                  this.filter = function () {
                    var e = new c(null, null);
                    return e.filter.apply(e, arguments)
                  },
                  this.all = function () {
                    return this.filter()
                  }
              },
              T = function (e, t, n) {
                "function" == typeof t && (t = t());
                for (var r in t) {
                  var s, o = t[r];
                  s = !d.call(t, r) || n.objectStoreNames.contains(r) ? e.currentTarget.transaction.objectStore(r) : n.createObjectStore(r, o.key);
                  for (var i in o.indexes) {
                    var a = o.indexes[i];
                    try {
                      s.index(i)
                    } catch (e) {
                      s.createIndex(i, a.key || i, Object.keys(a).length ? a : {
                        unique: !1
                      })
                    }
                  }
                }
              },
              S = function (e, t, n, r) {
                var s = e.target.result,
                  o = new b(s, t);
                return k[t] = s,
                  Promise.resolve(o)
              },
              k = {},
              w = {
                version: "0.10.2",
                open: function (e) {
                  var t;
                  return new Promise(function (n, r) {
                    if (k[e.server]) S({
                      target: {
                        result: k[e.server]
                      }
                    },
                      e.server, e.version, e.schema).then(n, r);
                    else {
                      try {
                        t = m().open(e.server, e.version)
                      } catch (s) {
                        r(s)
                      }
                      t.onsuccess = function (t) {
                        S(t, e.server, e.version, e.schema).then(n, r)
                      },
                        t.onupgradeneeded = function (t) {
                          T(t, e.schema, t.target.result)
                        },
                        t.onerror = function (e) {
                          r(e)
                        }
                    }
                  })
                },
                remove: function (e) {
                  return new Promise(function (t, n) {
                    if (!e) return t();
                    typeof e === b && (e = e.name);
                    var r;
                    "string" == typeof e && (r = k[e]),
                      r && "function" == typeof r.close && r.close();
                    var s;
                    try {
                      s = m().deleteDatabase(e)
                    } catch (o) {
                      n(o)
                    }
                    s.onsuccess = function (n) {
                      delete k[e],
                        t(e)
                    },
                      s.onerror = function (e) {
                        n(e)
                      },
                      s.onblocked = function (e) {
                        n(e)
                      }
                  })
                }
              };
            "undefined" != typeof e && "undefined" != typeof e.exports ? e.exports = w : (r = function () {
              return w
            }.call(t, n, t, e), !(r !== i && (e.exports = r)))
          }(window)
        }).call(t,
          function () {
            return this
          }())
      },
      function (e, t, n) {
        "use strict";
        var r = n(27),
          s = n(177),
          o = n(34),
          i = n(86),
          a = n(59),
          c = n(89),
          u = n(1),
          l = n(94),
          d = n(72),
          m = n(20),
          f = n(2).Promise,
          p = n(124);
        e.exports = function (e) {
          u.merge(e, {
            platform: r,
            xhr: s,
            io: o,
            naturalSort: i,
            deepAccess: a,
            db: c,
            util: u,
            support: l,
            blob: d,
            ajax: m,
            Promise: f,
            LoggerPlugin: p
          })
        }
      },
        ,
      function (e, t, n) {
        "use strict";
        function r(e) {
          var t = this;
          o(e.shouldPushNotificationWhenPCOnline) && (t.open = e.shouldPushNotificationWhenPCOnline ? 2 : 1)
        }
        var s = n(1),
          o = s.notundef;
        r.getDefaultConfig = function () {
          return {
            shouldPushNotificationWhenPCOnline: !0
          }
        },
          r.reverse = function (e) {
            var t = {
              shouldPushNotificationWhenPCOnline: 1 !== +e.open
            };
            return t
          },
          e.exports = r
      },
      function (e, t, n) {
        "use strict";
        var r = n(1),
          s = n(70),
          o = r.merge({},
            s.idMap, {
              auth: {
                id: 2,
                login: 3,
                kicked: 5,
                logout: 6,
                multiPortLogin: 7,
                kick: 8
              },
              user: {
                id: 3,
                markInBlacklist: 3,
                getBlacklist: 4,
                markInMutelist: 5,
                getMutelist: 6,
                getRelations: 8,
                getUsers: 7,
                updateMyInfo: 10,
                updateDonnop: 15,
                syncMyInfo: 109,
                syncUpdateMyInfo: 110
              },
              notify: {
                id: 4,
                markRead: 3,
                syncOfflineMsgs: 4,
                batchMarkRead: 5,
                syncOfflineSysMsgs: 6,
                syncRoamingMsgs: 9,
                syncMsgReceipts: 12,
                syncRobots: 15,
                syncBroadcastMsgs: 16
              },
              sync: {
                id: 5,
                sync: 1,
                syncTeamMembers: 2
              },
              msg: {
                id: 7,
                sendMsg: 1,
                msg: 2,
                sysMsg: 3,
                getHistoryMsgs: 6,
                sendCustomSysMsg: 7,
                searchHistoryMsgs: 8,
                deleteSessions: 9,
                getSessions: 10,
                syncSendMsg: 101,
                sendMsgReceipt: 11,
                msgReceipt: 12,
                deleteMsg: 13,
                msgDeleted: 14,
                markSessionAck: 16,
                broadcastMsg: 17
              },
              team: {
                id: 8,
                createTeam: 1,
                sendTeamMsg: 2,
                teamMsg: 3,
                teamMsgs: 4,
                addTeamMembers: 5,
                removeTeamMembers: 6,
                updateTeam: 7,
                leaveTeam: 8,
                getTeam: 9,
                getTeams: 10,
                getTeamMembers: 11,
                dismissTeam: 12,
                applyTeam: 13,
                passTeamApply: 14,
                rejectTeamApply: 15,
                addTeamManagers: 16,
                removeTeamManagers: 17,
                transferTeam: 18,
                updateInfoInTeam: 19,
                updateNickInTeam: 20,
                acceptTeamInvite: 21,
                rejectTeamInvite: 22,
                getTeamHistoryMsgs: 23,
                searchTeamHistoryMsgs: 24,
                updateMuteStateInTeam: 25,
                getMyTeamMembers: 26,
                getMutedTeamMembers: 27,
                syncMyTeamMembers: 126,
                syncTeams: 109,
                syncTeamMembers: 111,
                syncCreateTeam: 101,
                syncSendTeamMsg: 102,
                syncUpdateTeamMember: 119
              },
              friend: {
                id: 12,
                friendRequest: 1,
                syncFriendRequest: 101,
                deleteFriend: 2,
                syncDeleteFriend: 102,
                updateFriend: 3,
                syncUpdateFriend: 103,
                getFriends: 4
              },
              chatroom: {
                id: 13,
                getChatroomAddress: 1
              },
              filter: {
                id: 101,
                sendFilterMsg: 1,
                filterMsg: 2,
                filterSysMsg: 3,
                sendFilterCustomSysMsg: 7
              },
              eventService: {
                id: 14,
                publishEvent: 1,
                pushEvent: 2,
                subscribeEvent: 3,
                unSubscribeEventsByAccounts: 4,
                unSubscribeEventsByType: 5,
                querySubscribeEventsByAccounts: 6,
                querySubscribeEventsByType: 7,
                pushEvents: 9
              }
            }),
          i = r.merge({},
            s.cmdConfig, {
              login: {
                sid: o.auth.id,
                cid: o.auth.login,
                params: [{
                  type: "Property",
                  name: "login"
                }]
              },
              logout: {
                sid: o.auth.id,
                cid: o.auth.logout
              },
              kick: {
                sid: o.auth.id,
                cid: o.auth.kick,
                params: [{
                  type: "StrArray",
                  name: "deviceIds"
                }]
              },
              markInBlacklist: {
                sid: o.user.id,
                cid: o.user.markInBlacklist,
                params: [{
                  type: "String",
                  name: "account"
                },
                {
                  type: "bool",
                  name: "isAdd"
                }]
              },
              getBlacklist: {
                sid: o.user.id,
                cid: o.user.getBlacklist,
                params: [{
                  type: "long",
                  name: "time"
                }]
              },
              markInMutelist: {
                sid: o.user.id,
                cid: o.user.markInMutelist,
                params: [{
                  type: "String",
                  name: "account"
                },
                {
                  type: "bool",
                  name: "isAdd"
                }]
              },
              getMutelist: {
                sid: o.user.id,
                cid: o.user.getMutelist,
                params: [{
                  type: "long",
                  name: "time"
                }]
              },
              getRelations: {
                sid: o.user.id,
                cid: o.user.getRelations,
                params: [{
                  type: "long",
                  name: "timetag"
                }]
              },
              getUsers: {
                sid: o.user.id,
                cid: o.user.getUsers,
                params: [{
                  type: "StrArray",
                  name: "accounts"
                }]
              },
              updateMyInfo: {
                sid: o.user.id,
                cid: o.user.updateMyInfo,
                params: [{
                  type: "Property",
                  name: "user"
                }]
              },
              updateDonnop: {
                sid: o.user.id,
                cid: o.user.updateDonnop,
                params: [{
                  type: "Property",
                  name: "donnop"
                }]
              },
              markRead: {
                sid: o.notify.id,
                cid: o.notify.markRead,
                params: [{
                  type: "long",
                  name: "id"
                },
                {
                  type: "ph",
                  name: "ph"
                }]
              },
              batchMarkRead: {
                sid: o.notify.id,
                cid: o.notify.batchMarkRead,
                params: [{
                  type: "byte",
                  name: "sid"
                },
                {
                  type: "byte",
                  name: "cid"
                },
                {
                  type: "LongArray",
                  name: "ids"
                }]
              },
              sync: {
                sid: o.sync.id,
                cid: o.sync.sync,
                params: [{
                  type: "Property",
                  name: "sync"
                }]
              },
              syncTeamMembers: {
                sid: o.sync.id,
                cid: o.sync.syncTeamMembers,
                params: [{
                  type: "LongLongMap",
                  name: "sync"
                }]
              },
              sendMsg: {
                sid: o.msg.id,
                cid: o.msg.sendMsg,
                params: [{
                  type: "Property",
                  name: "msg"
                }]
              },
              getHistoryMsgs: {
                sid: o.msg.id,
                cid: o.msg.getHistoryMsgs,
                params: [{
                  type: "String",
                  name: "to"
                },
                {
                  type: "long",
                  name: "beginTime"
                },
                {
                  type: "long",
                  name: "endTime"
                },
                {
                  type: "long",
                  name: "lastMsgId"
                },
                {
                  type: "int",
                  name: "limit"
                },
                {
                  type: "bool",
                  name: "reverse"
                }]
              },
              sendCustomSysMsg: {
                sid: o.msg.id,
                cid: o.msg.sendCustomSysMsg,
                params: [{
                  type: "Property",
                  name: "sysMsg"
                }]
              },
              searchHistoryMsgs: {
                sid: o.msg.id,
                cid: o.msg.searchHistoryMsgs,
                params: [{
                  type: "String",
                  name: "to"
                },
                {
                  type: "long",
                  name: "beginTime"
                },
                {
                  type: "long",
                  name: "endTime"
                },
                {
                  type: "String",
                  name: "keyword"
                },
                {
                  type: "int",
                  name: "limit"
                },
                {
                  type: "bool",
                  name: "reverse"
                }]
              },
              getSessions: {
                sid: o.msg.id,
                cid: o.msg.getSessions,
                params: [{
                  type: "long",
                  name: "time"
                }]
              },
              deleteSessions: {
                sid: o.msg.id,
                cid: o.msg.deleteSessions,
                params: [{
                  type: "StrArray",
                  name: "sessions"
                }]
              },
              sendMsgReceipt: {
                sid: o.msg.id,
                cid: o.msg.sendMsgReceipt,
                params: [{
                  type: "Property",
                  name: "msgReceipt"
                }]
              },
              deleteMsg: {
                sid: o.msg.id,
                cid: o.msg.deleteMsg,
                params: [{
                  type: "Property",
                  name: "sysMsg"
                }]
              },
              markSessionAck: {
                sid: o.msg.id,
                cid: o.msg.markSessionAck,
                params: [{
                  type: "byte",
                  name: "scene"
                },
                {
                  type: "String",
                  name: "to"
                },
                {
                  type: "long",
                  name: "timetag"
                }]
              },
              createTeam: {
                sid: o.team.id,
                cid: o.team.createTeam,
                params: [{
                  type: "Property",
                  name: "team"
                },
                {
                  type: "StrArray",
                  name: "accounts"
                },
                {
                  type: "String",
                  name: "ps"
                }]
              },
              sendTeamMsg: {
                sid: o.team.id,
                cid: o.team.sendTeamMsg,
                params: [{
                  type: "Property",
                  name: "msg"
                }]
              },
              addTeamMembers: {
                sid: o.team.id,
                cid: o.team.addTeamMembers,
                params: [{
                  type: "long",
                  name: "teamId"
                },
                {
                  type: "StrArray",
                  name: "accounts"
                },
                {
                  type: "String",
                  name: "ps"
                }]
              },
              removeTeamMembers: {
                sid: o.team.id,
                cid: o.team.removeTeamMembers,
                params: [{
                  type: "long",
                  name: "teamId"
                },
                {
                  type: "StrArray",
                  name: "accounts"
                }]
              },
              updateTeam: {
                sid: o.team.id,
                cid: o.team.updateTeam,
                params: [{
                  type: "Property",
                  name: "team"
                }]
              },
              leaveTeam: {
                sid: o.team.id,
                cid: o.team.leaveTeam,
                params: [{
                  type: "long",
                  name: "teamId"
                }]
              },
              getTeam: {
                sid: o.team.id,
                cid: o.team.getTeam,
                params: [{
                  type: "long",
                  name: "teamId"
                }]
              },
              getTeams: {
                sid: o.team.id,
                cid: o.team.getTeams,
                params: [{
                  type: "long",
                  name: "timetag"
                }]
              },
              getTeamMembers: {
                sid: o.team.id,
                cid: o.team.getTeamMembers,
                params: [{
                  type: "long",
                  name: "teamId"
                },
                {
                  type: "long",
                  name: "timetag"
                }]
              },
              dismissTeam: {
                sid: o.team.id,
                cid: o.team.dismissTeam,
                params: [{
                  type: "long",
                  name: "teamId"
                }]
              },
              applyTeam: {
                sid: o.team.id,
                cid: o.team.applyTeam,
                params: [{
                  type: "long",
                  name: "teamId"
                },
                {
                  type: "String",
                  name: "ps"
                }]
              },
              passTeamApply: {
                sid: o.team.id,
                cid: o.team.passTeamApply,
                params: [{
                  type: "long",
                  name: "teamId"
                },
                {
                  type: "String",
                  name: "from"
                }]
              },
              rejectTeamApply: {
                sid: o.team.id,
                cid: o.team.rejectTeamApply,
                params: [{
                  type: "long",
                  name: "teamId"
                },
                {
                  type: "String",
                  name: "from"
                },
                {
                  type: "String",
                  name: "ps"
                }]
              },
              addTeamManagers: {
                sid: o.team.id,
                cid: o.team.addTeamManagers,
                params: [{
                  type: "long",
                  name: "teamId"
                },
                {
                  type: "StrArray",
                  name: "accounts"
                }]
              },
              removeTeamManagers: {
                sid: o.team.id,
                cid: o.team.removeTeamManagers,
                params: [{
                  type: "long",
                  name: "teamId"
                },
                {
                  type: "StrArray",
                  name: "accounts"
                }]
              },
              transferTeam: {
                sid: o.team.id,
                cid: o.team.transferTeam,
                params: [{
                  type: "long",
                  name: "teamId"
                },
                {
                  type: "String",
                  name: "account"
                },
                {
                  type: "bool",
                  name: "leave"
                }]
              },
              updateInfoInTeam: {
                sid: o.team.id,
                cid: o.team.updateInfoInTeam,
                params: [{
                  type: "Property",
                  name: "teamMember"
                }]
              },
              updateNickInTeam: {
                sid: o.team.id,
                cid: o.team.updateNickInTeam,
                params: [{
                  type: "Property",
                  name: "teamMember"
                }]
              },
              acceptTeamInvite: {
                sid: o.team.id,
                cid: o.team.acceptTeamInvite,
                params: [{
                  type: "long",
                  name: "teamId"
                },
                {
                  type: "String",
                  name: "from"
                }]
              },
              rejectTeamInvite: {
                sid: o.team.id,
                cid: o.team.rejectTeamInvite,
                params: [{
                  type: "long",
                  name: "teamId"
                },
                {
                  type: "String",
                  name: "from"
                },
                {
                  type: "String",
                  name: "ps"
                }]
              },
              getTeamHistoryMsgs: {
                sid: o.team.id,
                cid: o.team.getTeamHistoryMsgs,
                params: [{
                  type: "long",
                  name: "to"
                },
                {
                  type: "long",
                  name: "beginTime"
                },
                {
                  type: "long",
                  name: "endTime"
                },
                {
                  type: "long",
                  name: "lastMsgId"
                },
                {
                  type: "int",
                  name: "limit"
                },
                {
                  type: "bool",
                  name: "reverse"
                }]
              },
              searchTeamHistoryMsgs: {
                sid: o.team.id,
                cid: o.team.searchTeamHistoryMsgs,
                params: [{
                  type: "long",
                  name: "to"
                },
                {
                  type: "long",
                  name: "beginTime"
                },
                {
                  type: "long",
                  name: "endTime"
                },
                {
                  type: "String",
                  name: "keyword"
                },
                {
                  type: "int",
                  name: "limit"
                },
                {
                  type: "bool",
                  name: "reverse"
                }]
              },
              updateMuteStateInTeam: {
                sid: o.team.id,
                cid: o.team.updateMuteStateInTeam,
                params: [{
                  type: "long",
                  name: "teamId"
                },
                {
                  type: "String",
                  name: "account"
                },
                {
                  type: "int",
                  name: "mute"
                }]
              },
              getMyTeamMembers: {
                sid: o.team.id,
                cid: o.team.getMyTeamMembers,
                params: [{
                  type: "LongArray",
                  name: "teamIds"
                }]
              },
              getMutedTeamMembers: {
                sid: o.team.id,
                cid: o.team.getMutedTeamMembers,
                params: [{
                  type: "long",
                  name: "teamId"
                }]
              },
              friendRequest: {
                sid: o.friend.id,
                cid: o.friend.friendRequest,
                params: [{
                  type: "String",
                  name: "account"
                },
                {
                  type: "byte",
                  name: "type"
                },
                {
                  type: "String",
                  name: "ps"
                }]
              },
              deleteFriend: {
                sid: o.friend.id,
                cid: o.friend.deleteFriend,
                params: [{
                  type: "String",
                  name: "account"
                }]
              },
              updateFriend: {
                sid: o.friend.id,
                cid: o.friend.updateFriend,
                params: [{
                  type: "Property",
                  name: "friend"
                }]
              },
              getFriends: {
                sid: o.friend.id,
                cid: o.friend.getFriends,
                params: [{
                  type: "long",
                  name: "timetag"
                }]
              },
              getChatroomAddress: {
                sid: o.chatroom.id,
                cid: o.chatroom.getChatroomAddress,
                params: [{
                  type: "long",
                  name: "chatroomId"
                }]
              },
              sendFilterMsg: {
                sid: o.filter.id,
                cid: o.filter.sendFilterMsg,
                params: [{
                  type: "Property",
                  name: "msg"
                }]
              },
              sendFilterCustomSysMsg: {
                sid: o.filter.id,
                cid: o.filter.sendFilterCustomSysMsg,
                params: [{
                  type: "Property",
                  name: "sysMsg"
                }]
              },
              publishEvent: {
                sid: o.eventService.id,
                cid: o.eventService.publishEvent,
                params: [{
                  type: "Property",
                  name: "msgEvent"
                }]
              },
              pushEvent: {
                sid: o.eventService.id,
                cid: o.eventService.pushEvent
              },
              subscribeEvent: {
                sid: o.eventService.id,
                cid: o.eventService.subscribeEvent,
                params: [{
                  type: "Property",
                  name: "msgEventSubscribe"
                },
                {
                  type: "StrArray",
                  name: "accounts"
                }]
              },
              unSubscribeEventsByAccounts: {
                sid: o.eventService.id,
                cid: o.eventService.unSubscribeEventsByAccounts,
                params: [{
                  type: "Property",
                  name: "msgEventSubscribe"
                },
                {
                  type: "StrArray",
                  name: "accounts"
                }]
              },
              unSubscribeEventsByType: {
                sid: o.eventService.id,
                cid: o.eventService.unSubscribeEventsByType,
                params: [{
                  type: "Property",
                  name: "msgEventSubscribe"
                }]
              },
              querySubscribeEventsByAccounts: {
                sid: o.eventService.id,
                cid: o.eventService.querySubscribeEventsByAccounts,
                params: [{
                  type: "Property",
                  name: "msgEventSubscribe"
                },
                {
                  type: "StrArray",
                  name: "accounts"
                }]
              },
              querySubscribeEventsByType: {
                sid: o.eventService.id,
                cid: o.eventService.querySubscribeEventsByType,
                params: [{
                  type: "Property",
                  name: "msgEventSubscribe"
                }]
              },
              pushEvents: {
                sid: o.eventService.id,
                cid: o.eventService.pushEvents
              }
            }),
          a = r.merge({},
            s.packetConfig, {
              "2_3": {
                service: "auth",
                cmd: "login",
                response: [{
                  type: "Property",
                  name: "loginRes"
                },
                {
                  type: "PropertyArray",
                  name: "loginPorts",
                  entity: "loginPort"
                }]
              },
              "2_5": {
                service: "auth",
                cmd: "kicked",
                response: [{
                  type: "Number",
                  name: "from"
                },
                {
                  type: "Number",
                  name: "reason"
                }]
              },
              "2_6": {
                service: "auth",
                cmd: "logout"
              },
              "2_7": {
                service: "auth",
                cmd: "multiPortLogin",
                response: [{
                  type: "Number",
                  name: "state"
                },
                {
                  type: "PropertyArray",
                  name: "loginPorts",
                  entity: "loginPort"
                }]
              },
              "2_8": {
                service: "auth",
                cmd: "kick",
                response: [{
                  type: "StrArray",
                  name: "deviceIds"
                }]
              },
              "3_3": {
                service: "user",
                cmd: "markInBlacklist"
              },
              "3_103": {
                service: "user",
                cmd: "syncMarkInBlacklist",
                response: [{
                  type: "String",
                  name: "account"
                },
                {
                  type: "Boolean",
                  name: "isAdd"
                }]
              },
              "3_4": {
                service: "user",
                cmd: "getBlacklist",
                response: [{
                  type: "StrArray",
                  name: "blacklist"
                }]
              },
              "3_5": {
                service: "user",
                cmd: "markInMutelist"
              },
              "3_105": {
                service: "user",
                cmd: "syncMarkInMutelist",
                response: [{
                  type: "String",
                  name: "account"
                },
                {
                  type: "Boolean",
                  name: "isAdd"
                }]
              },
              "3_6": {
                service: "user",
                cmd: "getMutelist",
                response: [{
                  type: "StrArray",
                  name: "mutelist"
                }]
              },
              "3_8": {
                service: "user",
                cmd: "getRelations",
                response: [{
                  type: "PropertyArray",
                  name: "specialRelations",
                  entity: "specialRelation"
                },
                {
                  type: "Number",
                  name: "timetag"
                }]
              },
              "3_7": {
                service: "user",
                cmd: "getUsers",
                response: [{
                  type: "PropertyArray",
                  name: "users",
                  entity: "user"
                }]
              },
              "3_10": {
                service: "user",
                cmd: "updateMyInfo",
                response: [{
                  type: "Number",
                  name: "timetag"
                }]
              },
              "3_15": {
                service: "user",
                cmd: "updateDonnop",
                response: [{
                  type: "Number",
                  name: "timetag"
                }]
              },
              "3_115": {
                service: "user",
                cmd: "syncUpdateDonnop",
                response: [{
                  type: "Property",
                  name: "donnop"
                },
                {
                  type: "Number",
                  name: "timetag"
                }]
              },
              "3_109": {
                service: "user",
                cmd: "syncMyInfo",
                response: [{
                  type: "Property",
                  name: "user"
                },
                {
                  type: "Number",
                  name: "timetag"
                }]
              },
              "3_110": {
                service: "user",
                cmd: "syncUpdateMyInfo",
                response: [{
                  type: "Property",
                  name: "user"
                }]
              },
              "4_1": {
                service: "notify"
              },
              "4_2": {
                service: "notify"
              },
              "4_3": {
                service: "notify",
                cmd: "markRead"
              },
              "4_4": {
                service: "notify",
                cmd: "syncOfflineMsgs",
                response: [{
                  type: "PropertyArray",
                  name: "msgs",
                  entity: "msg"
                }]
              },
              "4_5": {
                service: "notify",
                cmd: "batchMarkRead"
              },
              "4_6": {
                service: "notify",
                cmd: "syncOfflineSysMsgs",
                response: [{
                  type: "PropertyArray",
                  name: "sysMsgs",
                  entity: "sysMsg"
                }]
              },
              "4_9": {
                service: "notify",
                cmd: "syncRoamingMsgs",
                response: [{
                  type: "PropertyArray",
                  name: "msgs",
                  entity: "msg"
                }]
              },
              "4_12": {
                service: "notify",
                cmd: "syncMsgReceipts",
                response: [{
                  type: "PropertyArray",
                  name: "msgReceipts",
                  entity: "msgReceipt"
                },
                {
                  type: "Number",
                  name: "timetag"
                }]
              },
              "4_13": {
                service: "notify",
                cmd: "syncDonnop",
                response: [{
                  type: "Property",
                  name: "donnop"
                },
                {
                  type: "Number",
                  name: "timetag"
                }]
              },
              "4_14": {
                service: "notify",
                cmd: "syncSessionAck",
                response: [{
                  type: "StrLongMap",
                  name: "p2p"
                },
                {
                  type: "LongLongMap",
                  name: "team"
                },
                {
                  type: "Number",
                  name: "timetag"
                }]
              },
              "4_15": {
                service: "notify",
                cmd: "syncRobots",
                response: [{
                  type: "PropertyArray",
                  name: "robots",
                  entity: "robot"
                }]
              },
              "4_16": {
                service: "notify",
                cmd: "syncBroadcastMsgs",
                response: [{
                  type: "PropertyArray",
                  name: "broadcastMsgs",
                  entity: "broadcastMsg"
                }]
              },
              "4_100": {
                service: "notify",
                cmd: "syncOfflineFilterMsgs",
                response: [{
                  type: "PropertyArray",
                  name: "msgs",
                  entity: "msg"
                }]
              },
              "4_101": {
                service: "notify",
                cmd: "syncOfflineFilterSysMsgs",
                response: [{
                  type: "PropertyArray",
                  name: "sysMsgs",
                  entity: "sysMsg"
                }]
              },
              "5_1": {
                service: "sync",
                cmd: "syncDone",
                response: [{
                  type: "Number",
                  name: "timetag"
                }]
              },
              "5_2": {
                service: "sync",
                cmd: "syncTeamMembersDone",
                response: [{
                  type: "Number",
                  name: "timetag"
                }]
              },
              "7_1": {
                service: "msg",
                cmd: "sendMsg",
                response: [{
                  type: "Property",
                  name: "msg"
                }],
                trivialErrorCodes: [7101]
              },
              "7_2": {
                service: "msg",
                cmd: "msg",
                response: [{
                  type: "Property",
                  name: "msg"
                }]
              },
              "7_3": {
                service: "msg",
                cmd: "sysMsg",
                response: [{
                  type: "Property",
                  name: "sysMsg"
                }]
              },
              "7_6": {
                service: "msg",
                cmd: "getHistoryMsgs",
                response: [{
                  type: "PropertyArray",
                  name: "msgs",
                  entity: "msg"
                }]
              },
              "7_7": {
                service: "msg",
                cmd: "sendCustomSysMsg",
                trivialErrorCodes: [7101]
              },
              "7_8": {
                service: "msg",
                cmd: "searchHistoryMsgs",
                response: [{
                  type: "PropertyArray",
                  name: "msgs",
                  entity: "msg"
                }]
              },
              "7_9": {
                service: "msg",
                cmd: "deleteSessions"
              },
              "7_10": {
                service: "msg",
                cmd: "getSessions",
                response: [{
                  type: "StrArray",
                  name: "sessions"
                }]
              },
              "7_101": {
                service: "msg",
                cmd: "syncSendMsg",
                response: [{
                  type: "Property",
                  name: "msg"
                }]
              },
              "7_11": {
                service: "msg",
                cmd: "sendMsgReceipt",
                response: [{
                  type: "Property",
                  name: "msgReceipt"
                }]
              },
              "7_12": {
                service: "msg",
                cmd: "msgReceipt",
                response: [{
                  type: "Property",
                  name: "msgReceipt"
                }]
              },
              "7_13": {
                service: "msg",
                cmd: "onDeleteMsg"
              },
              "7_14": {
                service: "msg",
                cmd: "onMsgDeleted",
                response: [{
                  type: "Property",
                  name: "sysMsg"
                }]
              },
              "7_15": {
                service: "msg",
                cmd: "onDeleteMsgOfflineRoaming",
                response: [{
                  type: "PropertyArray",
                  name: "sysMsgs",
                  entity: "sysMsg"
                },
                {
                  type: "Number",
                  name: "timetag"
                },
                {
                  type: "Number",
                  name: "type"
                }]
              },
              "7_16": {
                service: "msg",
                cmd: "onMarkSessionAck"
              },
              "7_17": {
                service: "msg",
                cmd: "broadcastMsg",
                response: [{
                  type: "Property",
                  name: "broadcastMsg"
                }]
              },
              "7_116": {
                service: "msg",
                cmd: "syncMarkSessionAck",
                response: [{
                  type: "Number",
                  name: "scene"
                },
                {
                  type: "String",
                  name: "to"
                },
                {
                  type: "Number",
                  name: "timetag"
                }]
              },
              "8_1": {
                service: "team",
                cmd: "createTeam",
                response: [{
                  type: "Property",
                  name: "team"
                }]
              },
              "8_2": {
                service: "team",
                cmd: "sendTeamMsg",
                response: [{
                  type: "Property",
                  name: "msg"
                }]
              },
              "8_3": {
                service: "team",
                cmd: "teamMsg",
                response: [{
                  type: "Property",
                  name: "msg"
                }]
              },
              "8_4": {
                service: "team",
                cmd: "teamMsgs",
                response: [{
                  type: "PropertyArray",
                  name: "msgs",
                  entity: "msg"
                }]
              },
              "8_5": {
                service: "team",
                cmd: "addTeamMembers"
              },
              "8_6": {
                service: "team",
                cmd: "removeTeamMembers"
              },
              "8_7": {
                service: "team",
                cmd: "updateTeam",
                response: [{
                  type: "Number",
                  name: "id"
                },
                {
                  type: "Number",
                  name: "time"
                }]
              },
              "8_8": {
                service: "team",
                cmd: "leaveTeam"
              },
              "8_9": {
                service: "team",
                cmd: "getTeam",
                response: [{
                  type: "Property",
                  name: "team"
                }]
              },
              "8_10": {
                service: "team",
                cmd: "getTeams",
                response: [{
                  type: "PropertyArray",
                  name: "teams",
                  entity: "team"
                },
                {
                  type: "Number",
                  name: "timetag"
                }]
              },
              "8_11": {
                service: "team",
                cmd: "getTeamMembers",
                response: [{
                  type: "Number",
                  name: "teamId"
                },
                {
                  type: "PropertyArray",
                  name: "members",
                  entity: "teamMember"
                },
                {
                  type: "Number",
                  name: "timetag"
                }]
              },
              "8_12": {
                service: "team",
                cmd: "dismissTeam"
              },
              "8_13": {
                service: "team",
                cmd: "applyTeam",
                response: [{
                  type: "Property",
                  name: "team"
                }]
              },
              "8_14": {
                service: "team",
                cmd: "passTeamApply"
              },
              "8_15": {
                service: "team",
                cmd: "rejectTeamApply"
              },
              "8_16": {
                service: "team",
                cmd: "addTeamManagers"
              },
              "8_17": {
                service: "team",
                cmd: "removeTeamManagers"
              },
              "8_18": {
                service: "team",
                cmd: "transferTeam"
              },
              "8_19": {
                service: "team",
                cmd: "updateInfoInTeam"
              },
              "8_20": {
                service: "team",
                cmd: "updateNickInTeam"
              },
              "8_21": {
                service: "team",
                cmd: "acceptTeamInvite",
                response: [{
                  type: "Property",
                  name: "team"
                }]
              },
              "8_22": {
                service: "team",
                cmd: "rejectTeamInvite"
              },
              "8_23": {
                service: "team",
                cmd: "getTeamHistoryMsgs",
                response: [{
                  type: "PropertyArray",
                  name: "msgs",
                  entity: "msg"
                }]
              },
              "8_24": {
                service: "team",
                cmd: "searchTeamHistoryMsgs",
                response: [{
                  type: "PropertyArray",
                  name: "msgs",
                  entity: "msg"
                }]
              },
              "8_25": {
                service: "team",
                cmd: "updateMuteStateInTeam"
              },
              "8_26": {
                service: "team",
                cmd: "getMyTeamMembers",
                response: [{
                  type: "PropertyArray",
                  name: "teamMembers",
                  entity: "teamMember"
                }]
              },
              "8_27": {
                service: "team",
                cmd: "getMutedTeamMembers",
                response: [{
                  type: "Number",
                  name: "teamId"
                },
                {
                  type: "PropertyArray",
                  name: "teamMembers",
                  entity: "teamMember"
                }]
              },
              "8_126": {
                service: "team",
                cmd: "syncMyTeamMembers",
                response: [{
                  type: "PropertyArray",
                  name: "teamMembers",
                  entity: "teamMember"
                },
                {
                  type: "Number",
                  name: "timetag"
                }]
              },
              "8_109": {
                service: "team",
                cmd: "syncTeams",
                response: [{
                  type: "Number",
                  name: "timetag"
                },
                {
                  type: "PropertyArray",
                  name: "teams",
                  entity: "team"
                }]
              },
              "8_111": {
                service: "team",
                cmd: "syncTeamMembers",
                response: [{
                  type: "Number",
                  name: "teamId"
                },
                {
                  type: "PropertyArray",
                  name: "members",
                  entity: "teamMember"
                },
                {
                  type: "Number",
                  name: "timetag"
                }]
              },
              "8_101": {
                service: "team",
                cmd: "syncCreateTeam",
                response: [{
                  type: "Property",
                  name: "team"
                }]
              },
              "8_102": {
                service: "team",
                cmd: "syncSendTeamMsg",
                response: [{
                  type: "Property",
                  name: "msg"
                }]
              },
              "8_119": {
                service: "team",
                cmd: "syncUpdateTeamMember",
                response: [{
                  type: "Property",
                  name: "teamMember"
                }]
              },
              "12_1": {
                service: "friend",
                cmd: "friendRequest"
              },
              "12_101": {
                service: "friend",
                cmd: "syncFriendRequest",
                response: [{
                  type: "String",
                  name: "account"
                },
                {
                  type: "Number",
                  name: "type"
                },
                {
                  type: "String",
                  name: "ps"
                }]
              },
              "12_2": {
                service: "friend",
                cmd: "deleteFriend"
              },
              "12_102": {
                service: "friend",
                cmd: "syncDeleteFriend",
                response: [{
                  type: "String",
                  name: "account"
                }]
              },
              "12_3": {
                service: "friend",
                cmd: "updateFriend"
              },
              "12_103": {
                service: "friend",
                cmd: "syncUpdateFriend",
                response: [{
                  type: "Property",
                  name: "friend"
                }]
              },
              "12_4": {
                service: "friend",
                cmd: "getFriends",
                response: [{
                  type: "PropertyArray",
                  name: "friends",
                  entity: "friend"
                },
                {
                  type: "Number",
                  name: "timetag"
                }]
              },
              "12_5": {
                service: "friend",
                cmd: "syncFriends",
                response: [{
                  type: "PropertyArray",
                  name: "friends",
                  entity: "friend"
                },
                {
                  type: "Number",
                  name: "timetag"
                }]
              },
              "12_6": {
                service: "friend",
                cmd: "syncFriendUsers",
                response: [{
                  type: "PropertyArray",
                  name: "users",
                  entity: "user"
                },
                {
                  type: "Number",
                  name: "timetag"
                }]
              },
              "13_1": {
                service: "chatroom",
                cmd: "getChatroomAddress",
                response: [{
                  type: "StrArray",
                  name: "address"
                }]
              },
              "14_1": {
                service: "eventService",
                cmd: "publishEvent",
                response: [{
                  type: "Property",
                  name: "msgEvent"
                }]
              },
              "14_2": {
                service: "eventService",
                cmd: "pushEvent",
                response: [{
                  type: "Property",
                  name: "msgEvent"
                }]
              },
              "14_3": {
                service: "eventService",
                cmd: "subscribeEvent",
                response: [{
                  type: "StrArray",
                  name: "accounts"
                }]
              },
              "14_4": {
                service: "eventService",
                cmd: "unSubscribeEventsByAccounts",
                response: [{
                  type: "StrArray",
                  name: "accounts"
                }]
              },
              "14_5": {
                service: "eventService",
                cmd: "unSubscribeEventsByType"
              },
              "14_6": {
                service: "eventService",
                cmd: "querySubscribeEventsByAccounts",
                response: [{
                  type: "PropertyArray",
                  name: "msgEventSubscribes",
                  entity: "msgEventSubscribe"
                }]
              },
              "14_7": {
                service: "eventService",
                cmd: "querySubscribeEventsByType",
                response: [{
                  type: "PropertyArray",
                  name: "msgEventSubscribes",
                  entity: "msgEventSubscribe"
                }]
              },
              "14_9": {
                service: "eventService",
                cmd: "pushEvents",
                response: [{
                  type: "PropertyArray",
                  name: "msgEvents",
                  entity: "msgEvent"
                }]
              },
              "101_1": {
                service: "filter",
                cmd: "sendFilterMsg",
                response: [{
                  type: "Property",
                  name: "msg"
                }]
              },
              "101_2": {
                service: "filter",
                cmd: "filterMsg",
                response: [{
                  type: "Property",
                  name: "msg"
                }]
              },
              "101_3": {
                service: "filter",
                cmd: "filterSysMsg",
                response: [{
                  type: "Property",
                  name: "sysMsg"
                }]
              },
              "101_7": {
                service: "filter",
                cmd: "sendFilterCustomSysMsg"
              }
            });
        e.exports = {
          idMap: o,
          cmdConfig: i,
          packetConfig: a
        }
      },
      function (e, t) {
        "use strict";
        var n = {};
        n.set = function (e, t, r) {
          n[e] = t,
            r && (r.support = t)
        },
          e.exports = n
      },
      function (e, t, n) {
        "use strict";
        function r() { }
        var s = n(21);
        r.typeMap = {
          text: 0,
          image: 1,
          audio: 2,
          video: 3,
          geo: 4,
          notification: 5,
          file: 6,
          tip: 10,
          robot: 11,
          custom: 100
        };
        var o = r.typeReverseMap = {
          0: "text",
          1: "image",
          2: "audio",
          3: "video",
          4: "geo",
          5: "notification",
          6: "file",
          10: "tip",
          11: "robot",
          100: "custom"
        };
        r.validTypes = Object.keys(r.typeMap),
          r.setFlow = function (e, t) {
            var n = t === e.from;
            n && t === e.to && (n = s.deviceId === e.fromDeviceId),
              e.flow = n ? "out" : "in",
              "robot" === e.type && e.content && e.content.msgOut && (e.flow = "in")
          },
          r.getType = function (e) {
            var t = e.type;
            return o[t] || t
          },
          e.exports = r
      },
      function (e, t, n) {
        "use strict";
        var r = n(97).polyfill;
        try {
          r()
        } catch (s) { }
        try {
          r(GameGlobal)
        } catch (s) { }
        try {
          window = window || {},
            r(window)
        } catch (s) { }
        try {
          localStorage = localStorage || n(65)
        } catch (s) { }
        try {
          XMLHttpRequest = XMLHttpRequest || n(68)
        } catch (s) { }
        try {
          FormData = FormData || n(35)
        } catch (s) { }
        try {
          WebSocket = WebSocket || n(67)
        } catch (s) { }
        try {
          navigator = navigator || n(66)
        } catch (s) { }
      },
      function (e, t, n) {
        (function (t) {
          "use strict";
          function r(e) {
            return e && e.__esModule ? e : {
              "default": e
            }
          }
          var s = n(6),
            o = r(s),
            i = n(65),
            a = n(68),
            c = n(35),
            u = n(67),
            l = n(98),
            d = n(66);
          e.exports = {
            polyfill: function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : t || window;
              if ("object" !== ("undefined" == typeof e ? "undefined" : (0, o["default"])(e))) throw new Error("polyfill target is not an Object");
              var n = {
                localStorage: i,
                XMLHttpRequest: a,
                FormData: c,
                WebSocket: u,
                Object: Object,
                navigator: d
              };
              for (var r in n) e[r] || (e[r] = n[r]);
              l.polyfill(e),
                e.navigator.product = "ReactNative"
            },
            localStorage: i,
            XMLHttpRequest: a,
            FormData: c,
            WebSocket: u
          }
        }).call(t,
        function () {
          return this
        }())
      },
      function (e, t, n) {
        "use strict";
        var r = n(58);
        t.polyfill = function (e) {
          if (wx.onNetworkStatusChange && !e.__onlineOfflinePolyfilled) {
            e.__onlineOfflinePolyfilled = !0;
            var t = new r;
            e.dispatchEvent || (e.addEventListener = t.addEventListener.bind(t), e.removeEventListener = t.removeEventListener.bind(t), e.dispatchEvent = t.dispatchEvent.bind(t), "function" != typeof postMessage || e.importScripts || (e.importScripts = function () {
              throw new Error("mocked")
            })),
              wx.getNetworkType({
                success: function (t) {
                  var n = t.networkType;
                  e.onLine = "none" !== n,
                    wx.onNetworkStatusChange(function (t) {
                      var n = t.isConnected;
                      e.onLine !== n && (e.onLine = n, e.dispatchEvent({
                        type: n ? "online" : "offline"
                      }))
                    })
                }
              })
          }
        }
      },
      function (e, t, n) {
        "use strict";
        n(96)
      },
      function (e, t, n) {
        "use strict";
        var r = n(10).fn;
        r.isConnected = function () {
          return this.protocol.isConnected()
        },
          r.connect = function () {
            this.protocol.connect()
          },
          r.disconnect = function () {
            this.protocol.disconnect()
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(1),
          s = n(10).fn;
        s.uploadSdkLogUrl = function (e) {
          return r.verifyOptions(e, "url", "misc::uploadSdkLogUrl"),
            this.cbAndSendCmd("uploadSdkLogUrl", e)
        }
      },
      function (e, t, n) {
        "use strict";
        var r = n(10).fn,
          s = n(1),
          o = n(176),
          i = n(5),
          a = n(3),
          c = n(125),
          u = (n(126), n(72));
        r.sendText = function (e) {
          var t = this;
          return t.processCallback(e),
            e.msg = new t.message.TextMessage(e),
            t.sendMsg(e)
        },
          r.previewFile = function (e) {
            if (s.verifyOptions(e, "done", "msg::previewFile"), e.type || (e.type = "file"), s.verifyParamPresentJustOne(e, "dataURL blob fileInput wxFilePath", "msg::previewFile"), e.dataURL) e.blob = u.fromDataURL(e.dataURL);
            else if (e.blob);
            else if (e.fileInput) {
              if (e.fileInput = s.verifyFileInput(e.fileInput, "msg::previewFile"), e.fileInput.files && !e.fileInput.files.length) return void e.done(i.newNoFileError("请选择" + e.type + "文件", {
                callFunc: "msg::previewFile",
                fileInput: e.fileInput
              }), e);
              e.fileInputName = s.getFileName(e.fileInput)
            }
            this.processCallback(e);
            var t = c.genResponseBody(e.type) || {};
            this.getNosToken({
              responseBody: JSON.stringify(t).replace(/"/gi, '\\"'),
              callback: function (t, n) {
                return t ? void e.done(t, e.callback.options) : (e.nosToken = n, void this._doPreviewFile(e))
              }.bind(this)
            })
          },
          r._doPreviewFile = function (e) {
            function t(t, o) {
              if (e.uploaddone = r, t) return void e.done(t, e.callback.options);
              if (o = c.parseResponse(o, n.options.exifOrientation), o.url = a.genDownloadUrl(e.nosToken.bucket, i.Object), s.exist(e.fileInputName)) o.name = e.fileInputName;
              else if (e.blob) {
                var u = e.blob.name;
                if (o.name = u || "blob-" + o.md5, !u) {
                  var l = e.blob.type;
                  o.ext = l.slice(l.lastIndexOf("/") + 1)
                }
              }
              if (o.name = e.wxFilePath, !o.ext) {
                var d = o.name.lastIndexOf(".");
                d === -1 ? o.ext = "unknown" : o.ext = o.name.slice(d + 1)
              }
              return void e.done(null, s.copy(o))
            }
            var n = this,
              r = e.uploaddone,
              o = a.genUploadUrl(e.nosToken.bucket),
              i = this.assembleUploadParams(e.nosToken),
              u = "file";
            s.verifyOptions(e, "wxFilePath", "msg::_doPreviewFile"),
              wx.uploadFile({
                url: o,
                filePath: e.wxFilePath,
                name: u,
                formData: i,
                fail: function (e) {
                  console.log(e)
                },
                success: function (e) {
                  if (console.log(e), 200 === e.statusCode) try {
                    t(null, JSON.parse(e.data))
                  } catch (n) {
                    console.error("parse wx upload file res error", n),
                      t({
                        code: "PARSE_WX_UPLOAD_FILE_RES_ERROR",
                        str: e.data,
                        msg: e.errMsg
                      })
                  } else t({
                    code: e.statusCode,
                    msg: e.errMsg
                  })
                }
              })
          },
          r.sendFile = function (e) {
            var t = this;
            if (e.type || (e.type = "file"), s.verifyParamPresentJustOne(e, "dataURL blob fileInput file wxFilePath", "msg::sendFile"), t.processCallback(e), e.dataURL) t._previewAndSendFile(e);
            else if (e.blob) t._previewAndSendFile(e);
            else if (e.fileInput) {
              if (e.fileInput = s.verifyFileInput(e.fileInput, "msg::sendFile"), e.fileInput.files && !e.fileInput.files.length) return void e.done(i.newNoFileError("请选择" + e.type + "文件", {
                callFunc: "msg::sendFile",
                fileInput: e.fileInput
              }), e.callback.options);
              t._previewAndSendFile(e)
            } else if (e.wxFilePath) t._previewAndSendFile(e);
            else if (e.file) return e.msg = new t.message.FileMessage(e),
              t.sendMsg(e)
          },
          r._previewAndSendFile = function (e) {
            var t = this;
            s.verifyCallback(e, "uploaddone beforesend", "msg::_previewAndSendFile");
            var n = e.done;
            e.done = function (r, o) {
              e.done = n,
                r ? e.uploaddone(r, e.callback.options) : (e.uploaddone(null, s.copy(o)), e.file = o, e.msg = new t.message.FileMessage(e), e.beforesend(t.sendMsg(e)))
            },
              t.previewFile(e)
          },
          r.assembleUploadParams = function (e) {
            return e ? {
              Object: decodeURIComponent(e.objectName),
              "x-nos-token": e.token,
              "x-nos-entity-type": "json"
            } : null
          },
          r.sendGeo = function (e) {
            var t = this;
            return t.processCallback(e),
              e.msg = new t.message.GeoMessage(e),
              t.sendMsg(e)
          },
          r.sendTipMsg = function (e) {
            var t = this;
            return t.processCallback(e),
              e.msg = new t.message.TipMessage(e),
              t.sendMsg(e)
          },
          r.sendCustomMsg = function (e) {
            var t = this;
            return t.processCallback(e),
              e.msg = new t.message.CustomMessage(e),
              t.sendMsg(e)
          },
          r.sendRobotMsg = function (e) {
            var t = this;
            return t.processCallback(e),
              e.msg = new t.message.RobotMessage(e),
              t.sendMsg(e)
          },
          r.sendMsg = function (e) {
            var t = this,
              n = t.protocol,
              r = e.msg,
              o = {},
              i = !!e.isLocal;
            if (i && e.time && (r.time = e.time), e.resend && ("out" !== e.flow || "fail" !== e.status)) return s.onError("只能重发发送失败的消息");
            e.callback.options.idClient = r.idClient,
              t.beforeSendMsg(e, o);
            var a = e.rtnMsg = t.formatReturnMsg(r);
            return i && (a.status = "success", a.isLocal = !0),
              n.storeSendMsg && (o.promise = n.storeSendMsg(a)),
              e.cbaop = function (e) {
                if (e && "server" !== e.from) return a.status = "fail",
                  n.updateSendMsgError && n.updateSendMsgError(a),
                  a
              },
              i || (o.msg = r, t.sendCmd(e.cmd, o, e.callback)),
              t.afterSendMsg(e),
              i && setTimeout(function () {
                a = s.simpleClone(a),
                  e.done(null, a)
              },
                0),
              s.copy(a)
          },
          r.beforeSendMsg = function () { },
          r.afterSendMsg = function () { },
          r.formatReturnMsg = function (e) {
            var t = this;
            return e = s.copy(e),
              t.protocol.completeMsg(e),
              e.status = "sending",
              e = t.message.reverse(e)
          },
          r.resendMsg = function (e) {
            var t = this;
            return s.verifyOptions(e, "msg", "msg::resendMsg"),
              t.trimMsgFlag(e),
              e.resend = !0,
              t._sendMsgByType(e)
          },
          r.forwardMsg = function (e) {
            var t = this;
            return s.verifyOptions(e, "msg", "msg::forwardMsg"),
              t.beforeForwardMsg(e),
              t.trimMsgFlag(e),
              e.forward = !0,
              e.msg.idClient = s.guid(),
              t._sendMsgByType(e)
          },
          r.trimMsgFlag = function (e) {
            e && e.msg && (e.msg = s.copy(e.msg), delete e.msg.resend, delete e.msg.forward)
          },
          r.beforeForwardMsg = function () { },
          r._sendMsgByType = function (e) {
            var t = this;
            switch (s.verifyOptions(e, "msg", "msg::_sendMsgByType"), s.verifyParamValid("msg.type", e.msg.type, t.message.validTypes, "msg::_sendMsgByType"), s.merge(e, e.msg), e.type) {
              case "text":
                return t.sendText(e);
              case "image":
              case "audio":
              case "video":
              case "file":
                return t.sendFile(e);
              case "geo":
                return t.sendGeo(e);
              case "custom":
                return t.sendCustomMsg(e);
              case "tip":
                return t.sendTipMsg(e);
              default:
                throw new i("不能发送类型为 " + e.type + " 的消息")
            }
          },
          r.parseRobotTemplate = function (e) {
            function t(e) {
              if (e.link) {
                var t = e.link;
                Array.isArray(t) || (t = [t]),
                  t = t.map(function (e) {
                    return e.image && (e.image = r(e)),
                      e.text && (e.text = n(e)),
                      "url" === e._type ? (e.type = "url", e.style = e._style || "", e.target = e._target, delete e._target, delete e._style) : "block" === e._type && (e.type = "block", e.style = e._style || "", e.params = e._params || "", e.target = e._target, delete e._params, delete e._target, delete e._style),
                      delete e._type,
                      e
                  }),
                  e.link = t
              }
              return e.link
            }
            function n(e) {
              return Array.isArray(e.text) || (e.text = [e.text]),
                e.text = e.text.map(function (e) {
                  return {
                    type: "text",
                    name: e._name,
                    text: e.__text
                  }
                }),
                e.text
            }
            function r(e) {
              return Array.isArray(e.image) || (e.image = [e.image]),
                e.image = e.image.map(function (e) {
                  return {
                    type: "image",
                    name: e._name,
                    url: e._url
                  }
                }),
                e.image
            }
            if (/<template[^>\/]+\/>/.test(e)) return {
              raw: e,
              json: [{
                type: "text",
                name: "",
                text: ""
              }]
            };
            if (!/<template[^>\/]+>/.test(e)) return {
              raw: e,
              json: [{
                type: "text",
                name: "",
                text: e
              }]
            };
            var s = new o({
              escapeMode: !1
            });
            e = e.replace(/<template [^>]+>/, "<template>");
            var i = s.xml2js(e);
            i = i.template.LinearLayout,
              Array.isArray(i) || (i = [i]);
            var a = [];
            return i = i.forEach(function (e) {
              e.image && (a = a.concat(r(e))),
                e.text && (a = a.concat(n(e))),
                e.link && (a = a.concat(t(e)))
            }),
              {
                raw: e,
                json: a
              }
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(1),
          s = n(10).fn,
          o = n(69);
        s.getSimpleNosToken = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return e.num = 1,
            r.verifyOptions(e),
            this.cbAndSendCmd("getSimpleNosToken", e)
        },
          s.getNosToken = function (e) {
            this.sendCmd("getNosToken", {
              responseBody: e.responseBody
            },
              e.callback)
          },
          s.packFileDownloadName = function (e) {
            r.verifyOptions(e, "url name", !0, "", "nos::packFileDownloadName");
            var t = e.url;
            return t + r.genUrlSep(t) + "download=" + encodeURIComponent(e.name)
          },
          s.audioToMp3 = function (e) {
            r.verifyOptions(e, "url", "nos::audioToMp3");
            var t = e.url;
            return t + r.genUrlSep(t) + "audioTrans&type=mp3"
          },
          s.stripImageMeta = function (e) {
            return this.beforeProcessImage(e, "stripmeta")
          },
          s.qualityImage = function (e) {
            return this.beforeProcessImage(e, "quality")
          },
          s.interlaceImage = function (e) {
            return this.beforeProcessImage(e, "interlace")
          },
          s.rotateImage = function (e) {
            return this.beforeProcessImage(e, "rotate")
          },
          s.blurImage = function (e) {
            return this.beforeProcessImage(e, "blur")
          },
          s.cropImage = function (e) {
            return this.beforeProcessImage(e, "crop")
          },
          s.thumbnailImage = function (e) {
            return this.beforeProcessImage(e, "thumbnail")
          },
          s.beforeProcessImage = function (e, t) {
            var n = r.copy(e);
            return n.type = t,
              e.ops = [n],
              this.processImage(e)
          },
          s.processImage = function (e) {
            var t = this;
            r.verifyOptions(e, "url ops", !0, "", "nos::processImage"),
              r.verifyParamType("ops", e.ops, "array", "nos::processImage");
            var n = e.ops.map(function (e) {
              return r.verifyOptions(e, "type", !0, "", "nos::processImage"),
                r.verifyParamValid("type", e.type, o.validTypes, "nos::processImage"),
                t["gen" + e.type.slice(0, 1).toUpperCase() + e.type.slice(1) + "Op"](e)
            });
            t.processCallback(e),
              t.sendCmd("processImage", {
                url: e.url,
                imageOps: n
              },
                e.callback)
          },
          s.genStripmetaOp = function (e) {
            return new o({
              type: e.type,
              stripmeta: e.strip ? 1 : 0
            })
          },
          s.genQualityOp = function (e) {
            r.verifyOptions(e, "quality", !0, "", "nos::genQualityOp"),
              r.verifyParamType("quality", e.quality, "number", "nos::genQualityOp"),
              r.verifyParamMin("quality", e.quality, 0, "nos::genQualityOp"),
              r.verifyParamMax("quality", e.quality, 100, "nos::genQualityOp");
            var t = Math.round(e.quality);
            return new o({
              type: e.type,
              qualityQuality: t
            })
          },
          s.genInterlaceOp = function (e) {
            return new o({
              type: e.type
            })
          },
          s.genRotateOp = function (e) {
            for (r.verifyOptions(e, "angle", !0, "", "nos::genRotateOp"), r.verifyParamType("angle", e.angle, "number", "nos::genRotateOp"); e.angle < 0;) e.angle = e.angle + 360;
            e.angle = e.angle % 360;
            var t = Math.round(e.angle);
            return new o({
              type: e.type,
              rotateAngle: t
            })
          },
          s.genBlurOp = function (e) {
            r.verifyOptions(e, "radius sigma", "nos::genBlurOp"),
              r.verifyParamType("radius", e.radius, "number", "nos::genBlurOp"),
              r.verifyParamMin("radius", e.radius, 1, "nos::genBlurOp"),
              r.verifyParamMax("radius", e.radius, 50, "nos::genBlurOp"),
              r.verifyParamType("sigma", e.sigma, "number", "nos::genBlurOp"),
              r.verifyParamMin("sigma", e.sigma, 0, "nos::genBlurOp");
            var t = Math.round(e.radius),
              n = Math.round(e.sigma);
            return new o({
              type: e.type,
              blurRadius: t,
              blurSigma: n
            })
          },
          s.genCropOp = function (e) {
            r.verifyOptions(e, "x y width height", "nos::genCropOp"),
              r.verifyParamType("x", e.x, "number", "nos::genCropOp"),
              r.verifyParamMin("x", e.x, 0, "nos::genCropOp"),
              r.verifyParamType("y", e.y, "number", "nos::genCropOp"),
              r.verifyParamMin("y", e.y, 0, "nos::genCropOp"),
              r.verifyParamType("width", e.width, "number", "nos::genCropOp"),
              r.verifyParamMin("width", e.width, 0, "nos::genCropOp"),
              r.verifyParamType("height", e.height, "number", "nos::genCropOp"),
              r.verifyParamMin("height", e.height, 0, "nos::genCropOp");
            var t = Math.round(e.x),
              n = Math.round(e.y),
              s = Math.round(e.width),
              i = Math.round(e.height);
            return new o({
              type: e.type,
              cropX: t,
              cropY: n,
              cropWidth: s,
              cropHeight: i
            })
          },
          s.genThumbnailOp = function () {
            var e = {
              cover: "z",
              contain: "x",
              crop: "y"
            };
            return function (t) {
              r.verifyOptions(t, "mode", "nos::genThumbnailOp"),
                r.verifyParamValid("mode", t.mode, Object.keys(e), "nos::genThumbnailOp"),
                "contain" === t.mode ? r.verifyParamAtLeastPresentOne(t, "width height", "nos::genThumbnailOp") : r.verifyOptions(t, "width height", "nos::genThumbnailOp"),
                r.undef(t.width) && (t.width = 0),
                r.undef(t.height) && (t.height = 0),
                r.verifyParamType("width", t.width, "number", "nos::genThumbnailOp"),
                r.verifyParamMin("width", t.width, 0, "nos::genThumbnailOp"),
                r.verifyParamType("height", t.height, "number", "nos::genThumbnailOp"),
                r.verifyParamMin("height", t.height, 0, "nos::genThumbnailOp");
              var n = Math.round(t.width),
                s = Math.round(t.height),
                i = new o({
                  type: t.type,
                  thumbnailMode: e[t.mode],
                  thumbnailWidth: n,
                  thumbnailHeight: s
                });
              if ("crop" === t.mode && r.notundef(t.axis)) {
                r.undef(t.axis.x) && (t.axis.x = 5),
                  r.undef(t.axis.y) && (t.axis.y = 5),
                  r.verifyParamMin("axis.x", t.axis.x, 0, "nos::genThumbnailOp"),
                  r.verifyParamMax("axis.x", t.axis.x, 10, "nos::genThumbnailOp"),
                  r.verifyParamMin("axis.y", t.axis.y, 0, "nos::genThumbnailOp"),
                  r.verifyParamMax("axis.y", t.axis.y, 10, "nos::genThumbnailOp");
                var a = Math.round(t.axis.x),
                  c = Math.round(t.axis.y);
                i.thumbnailAxisX = a,
                  i.thumbnailAxisY = c
              }
              return r.notundef(t.enlarge) && (r.verifyParamType("enlarge", t.enlarge, "boolean", "nos::genThumbnailOp"), t.enlarge && (i.thumbnailEnlarge = 1)),
                i
            }
          }()
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          return e && e.__esModule ? e : {
            "default": e
          }
        }
        var s = n(6),
          o = r(s),
          i = n(64),
          a = n(1),
          c = n(10).fn;
        c.viewImageSync = function (e) {
          var t = this.options;
          a.verifyOptions(e, "url", "nos::viewImageSync");
          var n = e.url,
            r = (0, i.url2object)(n),
            s = r.protocol,
            c = r.hostname,
            u = r.path,
            l = r.query;
          if ("boolean" == typeof e.strip && (l.stripmeta = e.strip ? 1 : 0), "number" == typeof e.quality && (a.verifyParamMin("quality", e.quality, 0, "nos::viewImageSync"), a.verifyParamMax("quality", e.quality, 100, "nos::viewImageSync"), l.quality = Math.round(e.quality)), "boolean" == typeof e.interlace && (l.interlace = e.interlace ? 1 : 0), "number" == typeof e.rotate && (l.rotate = Math.round(e.rotate)), "object" === (0, o["default"])(e.thumbnail)) {
            var d = e.thumbnail.mode || "crop",
              m = e.thumbnail.width,
              f = e.thumbnail.height;
            if (m >= 0 && f >= 0 && m < 4096 && f < 4096 && (m > 0 || f > 0)) {
              switch (d) {
                case "crop":
                  d = "y";
                  break;
                case "contain":
                  d = "x";
                  break;
                case "cover":
                  d = "z";
                  break;
                default:
                  d = "x"
              }
              l.thumbnail = "" + m + d + f
            }
          }
          if (t.downloadUrl) {
            var p = (0, i.url2object)(e.url),
              g = t.downloadUrl,
              y = p.path,
              h = y.indexOf("/");
            if (h !== -1) {
              var v = y.substring(0, h),
                b = y.substring(h + 1);
              g = g.replace("{bucket}", v).replace("{object}", b)
            }
            var M = (0, i.url2object)(g);
            return (0, i.object2url)({
              protocol: M.protocol,
              hostname: M.hostname,
              path: M.path,
              query: a.merge(M.query, l)
            })
          }
          return (0, i.object2url)({
            protocol: s,
            hostname: c,
            path: u,
            query: l
          })
        },
          c.viewImageStripMeta = function (e) {
            a.verifyOptions(e, "url strip", "nos::viewImageStripMeta"),
              a.verifyParamType("strip", e.strip, "boolean", "nos::viewImageStripMeta");
            var t = "stripmeta=" + (e.strip ? 1 : 0),
              n = (0, i.genUrlSep)(e.url);
            return e.url + n + t
          },
          c.viewImageQuality = function (e) {
            a.verifyOptions(e, "url quality", "nos::viewImageQuality"),
              a.verifyParamType("quality", e.quality, "number", "nos::viewImageQuality"),
              a.verifyParamMin("quality", e.quality, 0, "nos::viewImageQuality"),
              a.verifyParamMax("quality", e.quality, 100, "nos::viewImageQuality");
            var t = Math.round(e.quality),
              n = "quality=" + t,
              r = (0, i.genUrlSep)(e.url);
            return e.url + r + n
          },
          c.viewImageInterlace = function (e) {
            a.verifyOptions(e, "url", "nos::viewImageInterlace");
            var t = "interlace=1",
              n = (0, i.genUrlSep)(e.url);
            return e.url + n + t
          },
          c.viewImageRotate = function (e) {
            for (a.verifyOptions(e, "url angle", "nos::viewImageRotate"), a.verifyParamType("angle", e.angle, "number", "nos::viewImageRotate"); e.angle < 0;) e.angle = e.angle + 360;
            e.angle = e.angle % 360;
            var t = Math.round(e.angle),
              n = "rotate=" + t,
              r = (0, i.genUrlSep)(e.url);
            return e.url + r + n
          },
          c.viewImageBlur = function (e) {
            a.verifyOptions(e, "url radius sigma", "nos::viewImageBlur"),
              a.verifyParamType("radius", e.radius, "number", "nos::viewImageBlur"),
              a.verifyParamMin("radius", e.radius, 1, "nos::viewImageBlur"),
              a.verifyParamMax("radius", e.radius, 50, "nos::viewImageBlur"),
              a.verifyParamType("sigma", e.sigma, "number", "nos::viewImageBlur"),
              a.verifyParamMin("sigma", e.sigma, 0, "nos::viewImageBlur");
            var t = Math.round(e.radius),
              n = Math.round(e.sigma),
              r = "blur=" + t + "x" + n,
              s = (0, i.genUrlSep)(e.url);
            return e.url + s + r
          },
          c.viewImageCrop = function (e) {
            a.verifyOptions(e, "url x y width height", "nos::viewImageCrop"),
              a.verifyParamType("x", e.x, "number", "nos::viewImageCrop"),
              a.verifyParamMin("x", e.x, 0, "nos::viewImageCrop"),
              a.verifyParamType("y", e.y, "number", "nos::viewImageCrop"),
              a.verifyParamMin("y", e.y, 0, "nos::viewImageCrop"),
              a.verifyParamType("width", e.width, "number", "nos::viewImageCrop"),
              a.verifyParamMin("width", e.width, 0, "nos::viewImageCrop"),
              a.verifyParamType("height", e.height, "number", "nos::viewImageCrop"),
              a.verifyParamMin("height", e.height, 0, "nos::viewImageCrop");
            var t = Math.round(e.x),
              n = Math.round(e.y),
              r = Math.round(e.width),
              s = Math.round(e.height),
              o = "crop=" + t + "_" + n + "_" + r + "_" + s,
              c = (0, i.genUrlSep)(e.url);
            return e.url + c + o
          },
          c.viewImageThumbnail = function () {
            var e = {
              cover: "z",
              contain: "x",
              crop: "y"
            };
            return function (t) {
              a.verifyOptions(t, "url mode", "nos::viewImageThumbnail"),
                a.verifyParamValid("mode", t.mode, Object.keys(e), "nos::viewImageThumbnail"),
                "contain" === t.mode ? a.verifyParamAtLeastPresentOne(t, "width height", "nos::viewImageThumbnail") : a.verifyOptions(t, "width height", "nos::viewImageThumbnail"),
                a.undef(t.width) && (t.width = 0),
                a.undef(t.height) && (t.height = 0),
                a.verifyParamType("width", t.width, "number", "nos::viewImageThumbnail"),
                a.verifyParamMin("width", t.width, 0, "nos::viewImageThumbnail"),
                a.verifyParamType("height", t.height, "number", "nos::viewImageThumbnail"),
                a.verifyParamMin("height", t.height, 0, "nos::viewImageThumbnail");
              var n = Math.round(t.width),
                r = Math.round(t.height),
                s = "thumbnail=" + n + e[t.mode] + r;
              if ("crop" === t.mode && a.notundef(t.axis)) {
                a.undef(t.axis.x) && (t.axis.x = 5),
                  a.undef(t.axis.y) && (t.axis.y = 5),
                  a.verifyParamMin("axis.x", t.axis.x, 0, "nos::viewImageThumbnail"),
                  a.verifyParamMax("axis.x", t.axis.x, 10, "nos::viewImageThumbnail"),
                  a.verifyParamMin("axis.y", t.axis.y, 0, "nos::viewImageThumbnail"),
                  a.verifyParamMax("axis.y", t.axis.y, 10, "nos::viewImageThumbnail");
                var o = Math.round(t.axis.x),
                  c = Math.round(t.axis.y);
                s = s + "&axis=" + o + "_" + c
              }
              a.notundef(t.enlarge) && (a.verifyParamType("enlarge", t.enlarge, "boolean", "nos::viewImageThumbnail"), t.enlarge && (s += "&enlarge=1"));
              var u = (0, i.genUrlSep)(t.url);
              return t.url + u + s
            }
          }()
      },
      function (e, t, n) {
        "use strict";
        var r = n(10).fn,
          s = n(3),
          o = n(1),
          i = n(20),
          a = n(3);
        r.reportLogs = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = this,
            n = t.options,
            r = s.info;
          e = o.merge(e, {
            appkey: n.appKey,
            uid: n.account,
            os: "web",
            session: t.protocol.sdkSession || "",
            ver: r.sdkVersion,
            type: t.subType
          });
          var c = a.ntServerAddress;
          if (c) {
            var u = c + o.genUrlSep(c),
              l = [];
            for (var d in e) l.push(d + "=" + e[d]);
            u += l.join("&"),
              i(u, {
                proxyUrl: o.url2origin(u) + "/lbs/res/cors/nej_proxy_frame.html",
                timeout: s.xhrTimeout,
                onload: function () { },
                onerror: function (e) {
                  t.logger.info("report::ajax report error", e)
                }
              })
          }
        }
      },
        ,
      function (e, t, n) {
        "use strict";
        function r(e) {
          s.verifyOptions(e, "account", "friend::Friend"),
            s.verifyParamAtLeastPresentOne(e, "alias custom", "friend::Friend"),
            this.account = e.account,
            o(e.alias) && (this.alias = e.alias),
            o(e.custom) && (this.custom = e.custom)
        }
        var s = n(1),
          o = s.notundef,
          i = {
            addFriend: 1,
            applyFriend: 2,
            passFriendApply: 3,
            rejectFriendApply: 4
          },
          a = {
            1: "addFriend",
            2: "applyFriend",
            3: "passFriendApply",
            4: "rejectFriendApply"
          };
        r.reverse = function (e) {
          var t = s.filterObj(e, "account alias custom createTime updateTime");
          return o(e.flag) && (t.valid = "1" === e.flag),
            o(t.createTime) && (t.createTime = +t.createTime),
            o(t.updateTime) && (t.updateTime = +t.updateTime),
            t
        },
          r.validTypes = function () {
            return Object.keys(i)
          },
          r.getByteFromType = function (e) {
            return i[e]
          },
          r.getTypeFromByte = function (e) {
            return a[e]
          },
          r.assembleFriend = function (e) {
            var t = +new Date;
            return {
              account: e,
              alias: "",
              createTime: t,
              custom: "",
              updateTime: t,
              valid: !0
            }
          },
          e.exports = r
      },
      function (e, t, n) {
        "use strict";
        var r = n(22).fn,
          s = n(5),
          o = n(27),
          i = n(36),
          a = n(21),
          c = n(3),
          u = n(1),
          l = u.notundef;
        r.login = function () {
          var e = this;
          e.sendCmd("login", e.assembleLogin(), e.onLogin.bind(e)),
            e.autoconnect = !1
        },
          r.genSessionKey = function () {
            var e = {};
            return function () {
              var t = this,
                n = t.name,
                r = e[n] = e[n] || u.guid();
              return r
            }
          }(),
          r.assembleIMLogin = function () {
            var e = this,
              t = e.options,
              n = t.account,
              r = e.autoconnect ? 0 : 1;
            return e.sdkSession = e.genSessionKey(),
              {
                appLogin: r,
                appKey: t.appKey,
                account: n,
                token: t.token,
                sdkVersion: c.info.sdkVersion,
                protocolVersion: c.info.protocolVersion,
                os: o.os.toString(),
                browser: o.name + " " + o.version,
                session: e.sdkSession,
                deviceId: a.deviceId
              }
          },
          r.onLogin = function (e, t) {
            var n = this;
            n.loginResult = t,
              e ? n.onAuthError(e, "link::onLogin") : (n.startHeartbeat(), n.afterLogin(t))
          },
          r.afterLogin = u.emptyFunc,
          r.notifyLogin = function () {
            var e = this,
              t = e.loginResult;
            e.logger.info("link::notifyLogin: on connect", t),
              e.options.onconnect(t)
          },
          r.logout = function () {
            var e = this;
            if (e.isConnected()) {
              var t = new s("主动退出", "logout");
              e.onAuthError(t, "link::logout")
            }
          },
          r.onKicked = function (e) {
            var t = this,
              n = e.content,
              r = n.from,
              o = n.reason,
              a = n.custom,
              c = {
                reason: t.kickedReasons[o] || "unknown",
                message: t.kickedMessages[o] || "未知原因"
              };
            if (l(r) && (c.from = i.reverseType(r)), l(a) && (c.custom = a), t.shouldNotifyKicked(c)) {
              var d = new s("被踢了", "kicked");
              u.merge(d, c),
                t.onAuthError(d, "link::onKicked")
            } else t.logger.warn("link::onKicked: silentlyKick"),
              t.shouldReconnect = !0,
              t.hasNotifyDisconnected = !0,
              t.disconnectSocket()
          },
          r.shouldNotifyKicked = function (e) {
            return "silentlyKick" !== e.reason
          },
          r.onAuthError = function (e, t) {
            var n = this;
            n.shouldReconnect = !1,
              e = e || s.newConnectionError({
                callFunc: t
              }),
              e.callFunc = e.callFunc || t || null,
              n.markAllCallbackInvalid(e),
              n.notifyDisconnect(e)
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(22).fn,
          s = n(5),
          o = n(133),
          i = n(34),
          a = n(3),
          c = n(1);
        r.initConnect = function () {
          var e = this;
          e.socket = null,
            e.retryCount = 0,
            e.connecting = !1,
            e.shouldReconnect = !0,
            e.hasNotifyDisconnected = !1
        },
          r.resetConnect = function () {
            var e = this,
              t = e.options;
            c.notundef(t.needReconnect) ? (c.verifyParamType("needReconnect", t.needReconnect, "boolean", "link::resetConnect"), e.needReconnect = t.needReconnect) : e.needReconnect = !0,
              e.logger.log("link::resetConnect: needReconnect " + e.needReconnect),
              c.notundef(t.reconnectionAttempts) && c.verifyParamType("reconnectionAttempts", t.reconnectionAttempts, "number", "link::resetConnect"),
              e.reconnectionAttempts = t.reconnectionAttempts || 1 / 0,
              e.backoff = new o({
                min: a.reconnectionDelay,
                max: a.reconnectionDelayMax,
                jitter: a.reconnectionJitter
              })
          },
          r.connect = function () {
            var e = this;
            if (e.isConnected() || e.connecting) return void e.logger.warn("link::connect: already connected or connecting");
            if (e.connecting = !0, e.hasNotifyDisconnected = !1, e.socket) e.logger.info("link::connect: try connecting..."),
              e.socket.socket.connect();
            else {
              var t = e.getNextSocketUrl();
              t ? e.connectToUrl(t) : e.refreshSocketUrl()
            }
          },
          r.getNextSocketUrl = function () {
            return this.socketUrls.shift()
          },
          r.isConnected = function () {
            var e = this;
            return !!e.socket && !!e.socket.socket && e.socket.socket.connected
          },
          r.connectToUrl = function (e) {
            var t = this;
            if (t.logger.log("link::connectToUrl: " + e), !window.location) {
              var n = e.split(":");
              window.location = {
                protocol: n[0],
                hostname: n[1].slice(2),
                port: n[2]
              }
            }
            this.options.transports = ["websocket"];
            var r = this.options.transports || ["websocket", "xhr-polling"];
            t.socket = i.connect(e, {
              transports: r,
              reconnect: !1,
              "force new connection": !0,
              "connect timeout": a.connectTimeout
            }),
              t.logger.info("link::connectToUrl: socket url: " + e + ", transports: " + JSON.stringify(r)),
              t.socket.on("connect", t.onConnect.bind(t)),
              t.socket.on("handshake_failed", t.onHandshakeFailed.bind(t)),
              t.socket.on("connect_failed", t.onConnectFailed.bind(t)),
              t.socket.on("error", t.onError.bind(t)),
              t.socket.on("message", t.onMessage.bind(t)),
              t.socket.on("disconnect",
                function () {
                  t.logger.warn("link::connectToUrl: socket url: " + e + ", disconnected"),
                    t.onDisconnect(!0, "link::socketDisconnect")
                })
          },
          r.disconnect = function () {
            var e = this;
            e.isConnected() && (e.logger.log("link::disconnect: start disconnecting"), e.logout())
          },
          r.onConnect = function () {
            var e = this;
            e.backoff && e.backoff.reset(),
              e.retryCount = 0,
              e.connecting = !1,
              e.shouldReconnect = !0,
              e.hasNotifyDisconnected = !1,
              e.logger.log("link::onConnect: socket onconnected, start login"),
              e.login()
          },
          r.onHandshakeFailed = function () {
            this.api.reportLogs({
              event: "ws_handshake_failed"
            }),
              this.onDisconnect(!1, "link::onHandshakeFailed")
          },
          r.onConnectFailed = function () {
            this.api.reportLogs({
              event: "ws_connect_failed"
            }),
              this.onDisconnect(!1, "link::onConnectFailed")
          },
          r.onError = function () {
            var e = arguments[0];
            e && (this.api.reportLogs({
              event: "connect_timeout"
            }), this.onMiscError("连接错误", new s(e, "LINK_ERROR", {
              callFunc: "link::onError"
            })))
          },
          r.onDisconnect = function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
              t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
              n = this;
            n.connected = e,
              n.connecting = !1,
              n.markAllCallbackInvalid(s.newNetworkError({
                callFunc: t
              })),
              n.stopHeartbeat(),
              n.reconnect()
          },
          r.willReconnect = function () {
            var e = this;
            return e.shouldReconnect && e.needReconnect && e.retryCount < e.reconnectionAttempts
          },
          r.reconnect = function () {
            var e = this;
            if (e.willReconnect()) {
              e.socket = null,
                e.connected && (e.autoconnect = !0),
                e.retryCount++;
              var t = e.backoff.duration();
              e.logger.info("link::reconnect: will retry after " + t + "ms, retryCount " + e.retryCount),
                e.options.onwillreconnect({
                  retryCount: e.retryCount,
                  duration: t
                }),
                setTimeout(function () {
                  e.connect()
                },
                  t)
            } else e.notifyDisconnect()
          },
          r.notifyConnectError = function (e) {
            var t = this,
              n = s.newConnectError({
                message: e,
                callFunc: "link::notifyConnectError"
              });
            t.logger.error("link::notifyConnectError:", n),
              t.options.onerror(n)
          },
          r.notifyDisconnect = function (e) {
            var t = this;
            t.hasNotifyDisconnected || (t.hasNotifyDisconnected = !0, t.disconnectSocket(), e = e || new s, e.retryCount = t.retryCount, e.willReconnect = t.willReconnect(), t.backoff && t.backoff.reset(), t.retryCount = 0, t.connecting = !1, t.logger.info("link::notifyDisconnect: ondisconnected ", e), t.options.ondisconnect(e))
          },
          r.disconnectSocket = function () {
            var e = this;
            if (e.isConnected()) try {
              e.socket.disconnect(),
                e.socket = null
            } catch (t) {
              e.logger.info("link::disconnectSocket: disconnect failed, error ", t)
            }
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(22).fn,
          s = n(3);
        r.processLink = function (e) {
          switch (e.cmd) {
            case "heartbeat":
          }
        },
          r.startHeartbeat = function () {
            var e = this;
            e.stopHeartbeat(),
              e.heartbeatTimer = setTimeout(function () {
                e.sendCmd("heartbeat", null, e.onHeartbeat.bind(e))
              },
                s.heartbeatInterval)
          },
          r.stopHeartbeat = function () {
            var e = this;
            e.heartbeatTimer && (clearTimeout(e.heartbeatTimer), e.heartbeatTimer = null)
          },
          r.onHeartbeat = function (e, t) {
            var n = this;
            e ? (e.callFunc = "link::onHeartbeat", n.api.reportLogs({
              event: "ping_timeout"
            }), n.onCustomError("heartbeat error", "HEARTBEAT_ERROR", e)) : n.startHeartbeat()
          },
          r.heartbeat = function () { }
      },
      function (e, t, n) {
        "use strict";
        var r = n(22).fn,
          s = n(69);
        r.processMisc = function (e) {
          switch (e.cmd) {
            case "getSimpleNosToken":
              e.error || (e.obj = e.content.nosTokens[0]);
              break;
            case "getNosToken":
              e.error || (e.obj = e.content.nosToken);
              break;
            case "notifyUploadLog":
              e.error || this.emitAPI({
                type: "notifyUploadLog"
              });
              break;
            case "audioToText":
              e.error || (e.obj.text = e.content.text);
              break;
            case "processImage":
              e.obj.imageOps = s.reverseImageOps(e.obj.imageOps),
                e.error || (e.obj = {
                  url: e.content.url
                })
          }
        }
      },
      function (e, t, n) {
        "use strict";
        var r = n(1),
          s = n(70),
          o = r.merge({},
            s.idMap, {
              chatroom: {
                id: 13,
                login: 2,
                kicked: 3,
                logout: 4,
                sendMsg: 6,
                msg: 7,
                getChatroomMembers: 8,
                getHistoryMsgs: 9,
                markChatroomMember: 11,
                closeChatroom: 12,
                getChatroom: 13,
                updateChatroom: 14,
                updateMyChatroomMemberInfo: 15,
                getChatroomMembersInfo: 16,
                kickChatroomMember: 17,
                updateChatroomMemberTempMute: 19,
                queueOffer: 20,
                queuePoll: 21,
                queueList: 22,
                peak: 23,
                queueDrop: 24,
                queueInit: 25
              },
              user: {
                id: 3,
                syncRobot: 16
              }
            }),
          i = r.merge({},
            s.cmdConfig, {
              login: {
                sid: o.chatroom.id,
                cid: o.chatroom.login,
                params: [{
                  type: "byte",
                  name: "type"
                },
                {
                  type: "Property",
                  name: "login"
                },
                {
                  type: "Property",
                  name: "imLogin"
                }]
              },
              logout: {
                sid: o.chatroom.id,
                cid: o.chatroom.logout
              },
              sendMsg: {
                sid: o.chatroom.id,
                cid: o.chatroom.sendMsg,
                params: [{
                  type: "Property",
                  name: "msg"
                }]
              },
              getChatroomMembers: {
                sid: o.chatroom.id,
                cid: o.chatroom.getChatroomMembers,
                params: [{
                  type: "byte",
                  name: "type"
                },
                {
                  type: "long",
                  name: "time"
                },
                {
                  type: "int",
                  name: "limit"
                }]
              },
              getHistoryMsgs: {
                sid: o.chatroom.id,
                cid: o.chatroom.getHistoryMsgs,
                params: [{
                  type: "long",
                  name: "timetag"
                },
                {
                  type: "int",
                  name: "limit"
                },
                {
                  type: "bool",
                  name: "reverse"
                },
                {
                  type: "LongArray",
                  name: "msgTypes"
                }]
              },
              markChatroomMember: {
                sid: o.chatroom.id,
                cid: o.chatroom.markChatroomMember,
                params: [{
                  type: "string",
                  name: "account"
                },
                {
                  type: "int",
                  name: "type"
                },
                {
                  type: "bool",
                  name: "isAdd"
                },
                {
                  type: "int",
                  name: "level"
                },
                {
                  type: "string",
                  name: "custom"
                }]
              },
              closeChatroom: {
                sid: o.chatroom.id,
                cid: o.chatroom.closeChatroom,
                params: [{
                  type: "string",
                  name: "custom"
                }]
              },
              getChatroom: {
                sid: o.chatroom.id,
                cid: o.chatroom.getChatroom
              },
              updateChatroom: {
                sid: o.chatroom.id,
                cid: o.chatroom.updateChatroom,
                params: [{
                  type: "Property",
                  name: "chatroom"
                },
                {
                  type: "bool",
                  name: "needNotify"
                },
                {
                  type: "String",
                  name: "custom"
                }]
              },
              updateMyChatroomMemberInfo: {
                sid: o.chatroom.id,
                cid: o.chatroom.updateMyChatroomMemberInfo,
                params: [{
                  type: "Property",
                  name: "chatroomMember"
                },
                {
                  type: "bool",
                  name: "needNotify"
                },
                {
                  type: "String",
                  name: "custom"
                },
                {
                  type: "bool",
                  name: "needSave"
                }]
              },
              getChatroomMembersInfo: {
                sid: o.chatroom.id,
                cid: o.chatroom.getChatroomMembersInfo,
                params: [{
                  type: "StrArray",
                  name: "accounts"
                }]
              },
              kickChatroomMember: {
                sid: o.chatroom.id,
                cid: o.chatroom.kickChatroomMember,
                params: [{
                  type: "string",
                  name: "account"
                },
                {
                  type: "string",
                  name: "custom"
                }]
              },
              updateChatroomMemberTempMute: {
                sid: o.chatroom.id,
                cid: o.chatroom.updateChatroomMemberTempMute,
                params: [{
                  type: "String",
                  name: "account"
                },
                {
                  type: "long",
                  name: "duration"
                },
                {
                  type: "bool",
                  name: "needNotify"
                },
                {
                  type: "String",
                  name: "custom"
                }]
              },
              queueOffer: {
                sid: o.chatroom.id,
                cid: o.chatroom.queueOffer,
                params: [{
                  type: "string",
                  name: "elementKey"
                },
                {
                  type: "string",
                  name: "elementValue"
                },
                {
                  type: "bool",
                  name: "transient"
                }]
              },
              queuePoll: {
                sid: o.chatroom.id,
                cid: o.chatroom.queuePoll,
                params: [{
                  type: "string",
                  name: "elementKey"
                }]
              },
              queueList: {
                sid: o.chatroom.id,
                cid: o.chatroom.queueList
              },
              peak: {
                sid: o.chatroom.id,
                cid: o.chatroom.peak
              },
              queueDrop: {
                sid: o.chatroom.id,
                cid: o.chatroom.queueDrop
              },
              queueInit: {
                sid: o.chatroom.id,
                cid: o.chatroom.queueInit,
                params: [{
                  type: "int",
                  name: "limit"
                }]
              },
              syncRobot: {
                sid: o.user.id,
                cid: o.user.syncRobot,
                params: [{
                  type: "long",
                  name: "timetag"
                }]
              }
            }),
          a = "chatroom",
          c = r.merge({},
            s.packetConfig, {
              "4_10": {
                service: "notify"
              },
              "4_11": {
                service: "notify"
              },
              "3_16": {
                service: a,
                cmd: "syncRobot",
                response: [{
                  type: "PropertyArray",
                  name: "robots",
                  entity: "robot"
                }]
              },
              "13_2": {
                service: a,
                cmd: "login",
                response: [{
                  type: "Property",
                  name: "chatroom"
                },
                {
                  type: "Property",
                  name: "chatroomMember"
                }]
              },
              "13_3": {
                service: a,
                cmd: "kicked",
                response: [{
                  type: "Number",
                  name: "reason"
                },
                {
                  type: "String",
                  name: "custom"
                }]
              },
              "13_4": {
                service: a,
                cmd: "logout"
              },
              "13_6": {
                service: a,
                cmd: "sendMsg",
                response: [{
                  type: "Property",
                  name: "msg"
                }]
              },
              "13_7": {
                service: a,
                cmd: "msg",
                response: [{
                  type: "Property",
                  name: "msg"
                }]
              },
              "13_8": {
                service: a,
                cmd: "getChatroomMembers",
                response: [{
                  type: "PropertyArray",
                  name: "members",
                  entity: "chatroomMember"
                }]
              },
              "13_9": {
                service: a,
                cmd: "getHistoryMsgs",
                response: [{
                  type: "PropertyArray",
                  name: "msgs",
                  entity: "msg"
                }]
              },
              "13_11": {
                service: a,
                cmd: "markChatroomMember",
                response: [{
                  type: "Property",
                  name: "chatroomMember"
                }]
              },
              "13_12": {
                service: a,
                cmd: "closeChatroom"
              },
              "13_13": {
                service: a,
                cmd: "getChatroom",
                response: [{
                  type: "Property",
                  name: "chatroom"
                }]
              },
              "13_14": {
                service: a,
                cmd: "updateChatroom"
              },
              "13_15": {
                service: a,
                cmd: "updateMyChatroomMemberInfo"
              },
              "13_16": {
                service: a,
                cmd: "getChatroomMembersInfo",
                response: [{
                  type: "PropertyArray",
                  name: "members",
                  entity: "chatroomMember"
                }]
              },
              "13_17": {
                service: a,
                cmd: "kickChatroomMember"
              },
              "13_19": {
                service: a,
                cmd: "updateChatroomMemberTempMute"
              },
              "13_20": {
                service: a,
                cmd: "queueOffer"
              },
              "13_21": {
                service: a,
                cmd: "queuePoll",
                response: [{
                  type: "String",
                  name: "elementKey"
                },
                {
                  type: "String",
                  name: "elementValue"
                }]
              },
              "13_22": {
                service: a,
                cmd: "queueList",
                response: [{
                  type: "KVArray",
                  name: "queueList"
                }]
              },
              "13_23": {
                service: a,
                cmd: "peak",
                response: [{
                  type: "String",
                  name: "elementKey"
                },
                {
                  type: "String",
                  name: "elementValue"
                }]
              },
              "13_24": {
                service: a,
                cmd: "queueDrop"
              },
              "13_25": {
                service: a,
                cmd: "queueInit"
              }
            });
        e.exports = {
          idMap: o,
          cmdConfig: i,
          packetConfig: c
        }
      },
      function (e, t) {
        "use strict";
        e.exports = {
          imLogin: {
            os: 4,
            sdkVersion: 6,
            appLogin: 8,
            protocolVersion: 9,
            deviceId: 13,
            appKey: 18,
            account: 19,
            browser: 24,
            session: 26,
            token: 1e3
          },
          nosToken: {
            objectName: 1,
            token: 2,
            bucket: 3,
            expireTime: 4
          },
          audioToText: {
            url: 2
          },
          imageOp: {
            type: 0,
            stripmeta: 1,
            typeType: 2,
            blurRadius: 3,
            blurSigma: 4,
            qualityQuality: 5,
            cropX: 6,
            cropY: 7,
            cropWidth: 8,
            cropHeight: 9,
            rotateAngle: 10,
            pixelPixel: 11,
            thumbnailMode: 12,
            thumbnailWidth: 13,
            thumbnailHeight: 14,
            thumbnailAxisX: 15,
            thumbnailAxisY: 16,
            thumbnailCenterX: 17,
            thumbnailCenterY: 18,
            thumbnailEnlarge: 19,
            thumbnailToStatic: 20,
            watermarkType: 21,
            watermarkGravity: 22,
            watermarkDissolve: 23,
            watermarkDx: 24,
            watermarkDy: 25,
            watermarkImage: 26,
            watermarkText: 27,
            watermarkFont: 28,
            watermarkFontSize: 29,
            watermarkFontColor: 30,
            interlace: 31
          },
          robot: {
            account: 4,
            nick: 5,
            avatar: 6,
            intro: 7,
            config: 8,
            valid: 9,
            createTime: 10,
            updateTime: 11,
            custid: 12,
            botid: 13,
            bindTime: 14
          },
          login: {
            appKey: 1,
            account: 2,
            deviceId: 3,
            chatroomId: 5,
            chatroomNick: 20,
            chatroomAvatar: 21,
            chatroomCustom: 22,
            chatroomEnterCustom: 23,
            session: 26,
            isAnonymous: 38
          },
          chatroom: {
            id: 1,
            name: 3,
            announcement: 4,
            broadcastUrl: 5,
            custom: 12,
            createTime: 14,
            updateTime: 15,
            queuelevel: 16,
            creator: 100,
            onlineMemberNum: 101,
            mute: 102
          },
          msg: {
            idClient: 1,
            type: 2,
            attach: 3,
            custom: 4,
            resend: 5,
            userUpdateTime: 6,
            fromNick: 7,
            fromAvatar: 8,
            fromCustom: 9,
            yidunEnable: 10,
            antiSpamContent: 11,
            skipHistory: 12,
            body: 13,
            antiSpamBusinessId: 14,
            clientAntiSpam: 15,
            antiSpamUsingYidun: 16,
            time: 20,
            from: 21,
            chatroomId: 22,
            fromClientType: 23
          },
          chatroomMember: {
            chatroomId: 1,
            account: 2,
            type: 3,
            level: 4,
            nick: 5,
            avatar: 6,
            custom: 7,
            online: 8,
            guest: 9,
            enterTime: 10,
            blacked: 12,
            gaged: 13,
            valid: 14,
            updateTime: 15,
            tempMuted: 16,
            tempMuteDuration: 17
          }
        }
      },
      function (e, t) {
        "use strict";
        e.exports = {
          nosToken: {
            objectName: 1,
            token: 2,
            bucket: 3,
            expireTime: 4
          },
          audioToText: {
            url: 2
          },
          imageOp: {
            type: 0,
            stripmeta: 1,
            typeType: 2,
            blurRadius: 3,
            blurSigma: 4,
            qualityQuality: 5,
            cropX: 6,
            cropY: 7,
            cropWidth: 8,
            cropHeight: 9,
            rotateAngle: 10,
            pixelPixel: 11,
            thumbnailMode: 12,
            thumbnailWidth: 13,
            thumbnailHeight: 14,
            thumbnailAxisX: 15,
            thumbnailAxisY: 16,
            thumbnailCenterX: 17,
            thumbnailCenterY: 18,
            thumbnailEnlarge: 19,
            thumbnailToStatic: 20,
            watermarkType: 21,
            watermarkGravity: 22,
            watermarkDissolve: 23,
            watermarkDx: 24,
            watermarkDy: 25,
            watermarkImage: 26,
            watermarkText: 27,
            watermarkFont: 28,
            watermarkFontSize: 29,
            watermarkFontColor: 30,
            interlace: 31
          },
          robot: {
            account: 4,
            nick: 5,
            avatar: 6,
            intro: 7,
            config: 8,
            valid: 9,
            createTime: 10,
            updateTime: 11,
            custid: 12,
            botid: 13,
            bindTime: 14
          },
          login: {
            os: 4,
            sdkVersion: 6,
            appLogin: 8,
            protocolVersion: 9,
            deviceId: 13,
            appKey: 18,
            account: 19,
            browser: 24,
            session: 26,
            token: 1e3
          },
          loginRes: {
            lastLoginDeviceId: 17,
            connectionId: 102,
            ip: 103,
            port: 104,
            country: 106
          },
          loginPort: {
            type: 3,
            os: 4,
            mac: 5,
            deviceId: 13,
            account: 19,
            connectionId: 102,
            ip: 103,
            time: 109
          },
          sync: {
            myInfo: 1,
            offlineMsgs: 2,
            teams: 3,
            netcallMsgs: 6,
            roamingMsgs: 7,
            relations: 9,
            friends: 11,
            sessions: 12,
            friendUsers: 13,
            msgReceipts: 14,
            myTeamMembers: 15,
            donnop: 16,
            deleteMsg: 17,
            sessionAck: 18,
            robots: 19,
            broadcastMsgs: 20,
            filterMsgs: 100
          },
          donnop: {
            open: 1
          },
          team: {
            teamId: 1,
            name: 3,
            type: 4,
            owner: 5,
            level: 6,
            selfCustom: 7,
            valid: 8,
            memberNum: 9,
            memberUpdateTime: 10,
            createTime: 11,
            updateTime: 12,
            validToCurrentUser: 13,
            intro: 14,
            announcement: 15,
            joinMode: 16,
            bits: 17,
            custom: 18,
            serverCustom: 19,
            avatar: 20,
            beInviteMode: 21,
            inviteMode: 22,
            updateTeamMode: 23,
            updateCustomMode: 24,
            mute: 100
          },
          teamMember: {
            teamId: 1,
            account: 3,
            type: 4,
            nickInTeam: 5,
            bits: 7,
            active: 8,
            valid: 9,
            joinTime: 10,
            updateTime: 11,
            custom: 12,
            mute: 13
          },
          msg: {
            scene: 0,
            to: 1,
            from: 2,
            fromClientType: 4,
            fromDeviceId: 5,
            fromNick: 6,
            time: 7,
            type: 8,
            body: 9,
            attach: 10,
            idClient: 11,
            idServer: 12,
            resend: 13,
            userUpdateTime: 14,
            custom: 15,
            pushPayload: 16,
            pushContent: 17,
            apnsAccounts: 18,
            apnsContent: 19,
            apnsForcePush: 20,
            yidunEnable: 21,
            antiSpamContent: 22,
            antiSpamBusinessId: 23,
            clientAntiSpam: 24,
            antiSpamUsingYidun: 25,
            isHistoryable: 100,
            isRoamingable: 101,
            isSyncable: 102,
            isMuted: 104,
            cc: 105,
            isPushable: 107,
            isOfflinable: 108,
            isUnreadable: 109,
            needPushNick: 110
          },
          msgReceipt: {
            to: 1,
            from: 2,
            time: 7,
            idClient: 11
          },
          sysMsg: {
            time: 0,
            type: 1,
            to: 2,
            from: 3,
            ps: 4,
            attach: 5,
            idServer: 6,
            sendToOnlineUsersOnly: 7,
            apnsText: 8,
            pushPayload: 9,
            deletedIdClient: 10,
            deletedIdServer: 11,
            yidunEnable: 12,
            antiSpamContent: 13,
            deletedMsgTime: 14,
            deletedMsgFromNick: 15,
            opeAccount: 16,
            cc: 105,
            isPushable: 107,
            isUnreadable: 109,
            needPushNick: 110
          },
          broadcastMsg: {
            broadcastId: 1,
            fromAccid: 2,
            fromUid: 3,
            timestamp: 4,
            body: 5
          },
          friend: {
            account: 4,
            flag: 5,
            beflag: 6,
            source: 7,
            alias: 8,
            bits: 9,
            custom: 10,
            createTime: 11,
            updateTime: 12
          },
          user: {
            account: 1,
            nick: 3,
            avatar: 4,
            sign: 5,
            gender: 6,
            email: 7,
            birth: 8,
            tel: 9,
            custom: 10,
            createTime: 12,
            updateTime: 13
          },
          specialRelation: {
            account: 0,
            isMuted: 1,
            isBlacked: 2,
            createTime: 3,
            updateTime: 4
          },
          msgType: {
            text: 0,
            picture: 1,
            audio: 2,
            video: 3,
            location: 4,
            notification: 5,
            file: 6,
            netcall_audio: 7,
            netcall_vedio: 8,
            datatunnel_new: 9,
            tips: 10,
            robot: 11,
            custom: 100
          },
          msgEvent: {
            type: 1,
            value: 2,
            idClient: 3,
            custom: 4,
            validTime: 5,
            broadcastType: 6,
            sync: 7,
            validTimeType: 8,
            durable: 9,
            time: 10,
            idServer: 11,
            clientType: 12,
            serverConfig: 13,
            serverCustom: 14,
            appid: 101,
            account: 103,
            enableMultiClient: 104,
            consid: 106
          },
          msgEventSubscribe: {
            type: 1,
            subscribeTime: 2,
            sync: 3,
            to: 102,
            from: 104,
            time: 105
          }
        }
      },
      function (e, t) {
        "use strict";
        e.exports = {
          imLogin: {
            4: "os",
            6: "sdkVersion",
            8: "appLogin",
            9: "protocolVersion",
            13: "deviceId",
            18: "appKey",
            19: "account",
            24: "browser",
            26: "session",
            1000: "token"
          },
          nosToken: {
            1: "objectName",
            2: "token",
            3: "bucket",
            4: "expireTime"
          },
          audioToText: {
            2: "url"
          },
          imageOp: {
            0: "type",
            1: "stripmeta",
            2: "typeType",
            3: "blurRadius",
            4: "blurSigma",
            5: "qualityQuality",
            6: "cropX",
            7: "cropY",
            8: "cropWidth",
            9: "cropHeight",
            10: "rotateAngle",
            11: "pixelPixel",
            12: "thumbnailMode",
            13: "thumbnailWidth",
            14: "thumbnailHeight",
            15: "thumbnailAxisX",
            16: "thumbnailAxisY",
            17: "thumbnailCenterX",
            18: "thumbnailCenterY",
            19: "thumbnailEnlarge",
            20: "thumbnailToStatic",
            21: "watermarkType",
            22: "watermarkGravity",
            23: "watermarkDissolve",
            24: "watermarkDx",
            25: "watermarkDy",
            26: "watermarkImage",
            27: "watermarkText",
            28: "watermarkFont",
            29: "watermarkFontSize",
            30: "watermarkFontColor",
            31: "interlace"
          },
          robot: {
            4: "account",
            5: "nick",
            6: "avatar",
            7: "intro",
            8: "config",
            9: "valid",
            10: "createTime",
            11: "updateTime",
            12: "custid",
            13: "botid",
            14: "bindTime"
          },
          login: {
            1: "appKey",
            2: "account",
            3: "deviceId",
            5: "chatroomId",
            20: "chatroomNick",
            21: "chatroomAvatar",
            22: "chatroomCustom",
            23: "chatroomEnterCustom",
            26: "session",
            38: "isAnonymous"
          },
          chatroom: {
            1: "id",
            3: "name",
            4: "announcement",
            5: "broadcastUrl",
            12: "custom",
            14: "createTime",
            15: "updateTime",
            16: "queuelevel",
            100: "creator",
            101: "onlineMemberNum",
            102: "mute"
          },
          msg: {
            1: "idClient",
            2: "type",
            3: "attach",
            4: "custom",
            5: "resend",
            6: "userUpdateTime",
            7: "fromNick",
            8: "fromAvatar",
            9: "fromCustom",
            10: "yidunEnable",
            11: "antiSpamContent",
            12: "skipHistory",
            13: "body",
            14: "antiSpamBusinessId",
            15: "clientAntiSpam",
            16: "antiSpamUsingYidun",
            20: "time",
            21: "from",
            22: "chatroomId",
            23: "fromClientType"
          },
          chatroomMember: {
            1: "chatroomId",
            2: "account",
            3: "type",
            4: "level",
            5: "nick",
            6: "avatar",
            7: "custom",
            8: "online",
            9: "guest",
            10: "enterTime",
            12: "blacked",
            13: "gaged",
            14: "valid",
            15: "updateTime",
            16: "tempMuted",
            17: "tempMuteDuration"
          }
        }
      },
      function (e, t) {
        "use strict";
        e.exports = {
          nosToken: {
            1: "objectName",
            2: "token",
            3: "bucket",
            4: "expireTime"
          },
          audioToText: {
            2: "url"
          },
          imageOp: {
            0: "type",
            1: "stripmeta",
            2: "typeType",
            3: "blurRadius",
            4: "blurSigma",
            5: "qualityQuality",
            6: "cropX",
            7: "cropY",
            8: "cropWidth",
            9: "cropHeight",
            10: "rotateAngle",
            11: "pixelPixel",
            12: "thumbnailMode",
            13: "thumbnailWidth",
            14: "thumbnailHeight",
            15: "thumbnailAxisX",
            16: "thumbnailAxisY",
            17: "thumbnailCenterX",
            18: "thumbnailCenterY",
            19: "thumbnailEnlarge",
            20: "thumbnailToStatic",
            21: "watermarkType",
            22: "watermarkGravity",
            23: "watermarkDissolve",
            24: "watermarkDx",
            25: "watermarkDy",
            26: "watermarkImage",
            27: "watermarkText",
            28: "watermarkFont",
            29: "watermarkFontSize",
            30: "watermarkFontColor",
            31: "interlace"
          },
          robot: {
            4: "account",
            5: "nick",
            6: "avatar",
            7: "intro",
            8: "config",
            9: "valid",
            10: "createTime",
            11: "updateTime",
            12: "custid",
            13: "botid",
            14: "bindTime"
          },
          login: {
            4: "os",
            6: "sdkVersion",
            8: "appLogin",
            9: "protocolVersion",
            13: "deviceId",
            18: "appKey",
            19: "account",
            24: "browser",
            26: "session",
            1000: "token"
          },
          loginRes: {
            17: "lastLoginDeviceId",
            102: "connectionId",
            103: "ip",
            104: "port",
            106: "country"
          },
          loginPort: {
            3: "type",
            4: "os",
            5: "mac",
            13: "deviceId",
            19: "account",
            102: "connectionId",
            103: "ip",
            109: "time"
          },
          sync: {
            1: "myInfo",
            2: "offlineMsgs",
            3: "teams",
            6: "netcallMsgs",
            7: "roamingMsgs",
            9: "relations",
            11: "friends",
            12: "sessions",
            13: "friendUsers",
            14: "msgReceipts",
            15: "myTeamMembers",
            16: "donnop",
            17: "deleteMsg",
            18: "sessionAck",
            19: "robots",
            20: "broadcastMsgs",
            100: "filterMsgs"
          },
          donnop: {
            1: "open"
          },
          team: {
            1: "teamId",
            3: "name",
            4: "type",
            5: "owner",
            6: "level",
            7: "selfCustom",
            8: "valid",
            9: "memberNum",
            10: "memberUpdateTime",
            11: "createTime",
            12: "updateTime",
            13: "validToCurrentUser",
            14: "intro",
            15: "announcement",
            16: "joinMode",
            17: "bits",
            18: "custom",
            19: "serverCustom",
            20: "avatar",
            21: "beInviteMode",
            22: "inviteMode",
            23: "updateTeamMode",
            24: "updateCustomMode",
            100: "mute"
          },
          teamMember: {
            1: "teamId",
            3: "account",
            4: "type",
            5: "nickInTeam",
            7: "bits",
            8: "active",
            9: "valid",
            10: "joinTime",
            11: "updateTime",
            12: "custom",
            13: "mute"
          },
          msg: {
            0: "scene",
            1: "to",
            2: "from",
            4: "fromClientType",
            5: "fromDeviceId",
            6: "fromNick",
            7: "time",
            8: "type",
            9: "body",
            10: "attach",
            11: "idClient",
            12: "idServer",
            13: "resend",
            14: "userUpdateTime",
            15: "custom",
            16: "pushPayload",
            17: "pushContent",
            18: "apnsAccounts",
            19: "apnsContent",
            20: "apnsForcePush",
            21: "yidunEnable",
            22: "antiSpamContent",
            23: "antiSpamBusinessId",
            24: "clientAntiSpam",
            25: "antiSpamUsingYidun",
            100: "isHistoryable",
            101: "isRoamingable",
            102: "isSyncable",
            104: "isMuted",
            105: "cc",
            107: "isPushable",
            108: "isOfflinable",
            109: "isUnreadable",
            110: "needPushNick"
          },
          msgReceipt: {
            1: "to",
            2: "from",
            7: "time",
            11: "idClient"
          },
          sysMsg: {
            0: "time",
            1: "type",
            2: "to",
            3: "from",
            4: "ps",
            5: "attach",
            6: "idServer",
            7: "sendToOnlineUsersOnly",
            8: "apnsText",
            9: "pushPayload",
            10: "deletedIdClient",
            11: "deletedIdServer",
            12: "yidunEnable",
            13: "antiSpamContent",
            14: "deletedMsgTime",
            15: "deletedMsgFromNick",
            16: "opeAccount",
            105: "cc",
            107: "isPushable",
            109: "isUnreadable",
            110: "needPushNick"
          },
          broadcastMsg: {
            1: "broadcastId",
            2: "fromAccid",
            3: "fromUid",
            4: "timestamp",
            5: "body"
          },
          friend: {
            4: "account",
            5: "flag",
            6: "beflag",
            7: "source",
            8: "alias",
            9: "bits",
            10: "custom",
            11: "createTime",
            12: "updateTime"
          },
          user: {
            1: "account",
            3: "nick",
            4: "avatar",
            5: "sign",
            6: "gender",
            7: "email",
            8: "birth",
            9: "tel",
            10: "custom",
            12: "createTime",
            13: "updateTime"
          },
          specialRelation: {
            0: "account",
            1: "isMuted",
            2: "isBlacked",
            3: "createTime",
            4: "updateTime"
          },
          msgType: {
            0: "text",
            1: "picture",
            2: "audio",
            3: "video",
            4: "location",
            5: "notification",
            6: "file",
            7: "netcall_audio",
            8: "netcall_vedio",
            9: "datatunnel_new",
            10: "tips",
            11: "robot",
            100: "custom"
          },
          msgEvent: {
            1: "type",
            2: "value",
            3: "idClient",
            4: "custom",
            5: "validTime",
            6: "broadcastType",
            7: "sync",
            8: "validTimeType",
            9: "durable",
            10: "time",
            11: "idServer",
            12: "clientType",
            13: "serverConfig",
            14: "serverCustom",
            101: "appid",
            103: "account",
            104: "enableMultiClient",
            106: "consid"
          },
          msgEventSubscribe: {
            1: "type",
            2: "subscribeTime",
            3: "sync",
            102: "to",
            104: "from",
            105: "time"
          }
        }
      },
      function (e, t, n) {
        "use strict";
        var r = n(8),
          s = n(41),
          o = function () {
            var e = /json/i,
              t = /post/i;
            return function (n, o) {
              o = o || {};
              var i = o.data = o.data || {},
                a = o.headers = o.headers || {},
                c = r.checkWithDefault(a, "Accept", "application/json"),
                u = r.checkWithDefault(a, "Content-Type", "application/json");
              return e.test(c) && (o.type = "json"),
                t.test(o.method) && e.test(u) && (o.data = JSON.stringify(i)),
                s(n, o)
            }
          }();
        e.exports = o
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          var t = this;
          t.init(),
            i.call(t, e)
        }
        var s = n(8),
          o = n(71),
          i = n(42),
          a = {},
          c = i.prototype,
          u = r.prototype = Object.create(c);
        u.init = function () {
          function e(e) {
            var t = e.data;
            if (0 === t.indexOf(n)) {
              t = JSON.parse(t.replace(n, ""));
              var r = t.key,
                s = a[r];
              s && (delete a[r], t.result = decodeURIComponent(t.result || ""), s.onLoad(t))
            }
          }
          function t() {
            if (!r) {
              r = !0;
              var t = s.getGlobal();
              t.postMessage ? s.on(t, "message", e) : o.addMsgListener(e)
            }
          }
          var n = "NEJ-AJAX-DATA:",
            r = !1;
          return function () {
            t()
          }
        }(),
          u.doSend = function () {
            var e = this,
              t = e.options,
              n = s.url2origin(t.url),
              r = t.proxyUrl || n + "/res/nej_proxy_frame.html",
              i = a[r];
            if (s.isArray(i)) return void i.push(e.doSend.bind(e, t));
            if (!i) return a[r] = [e.doSend.bind(e, t)],
              void s.createIframe({
                src: r,
                onload: function (e) {
                  var t = a[r];
                  a[r] = s.target(e).contentWindow,
                    t.forEach(function (e) {
                      try {
                        e()
                      } catch (t) {
                        console.error(t)
                      }
                    })
                }
              });
            if (!e.aborted) {
              var c = e.key = s.uniqueID();
              a[c] = e;
              var u = s.fetch({
                method: "GET",
                url: "",
                data: null,
                headers: {},
                timeout: 0
              },
                t);
              u.key = c,
                o.postMessage(i, {
                  data: u
                }),
                e.afterSend()
            }
          },
          u.abort = function () {
            var e = this;
            e.aborted = !0,
              delete a[e.key],
              c.abort.call(e)
          },
          e.exports = r
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          var t = this;
          t.init(),
            o.call(t, e)
        }
        var s = n(8),
          o = n(42),
          i = n(71),
          a = "NEJ-UPLOAD-RESULT:",
          c = {},
          u = o.prototype,
          l = r.prototype = Object.create(u);
        l.init = function () {
          function e(e) {
            var t = e.data;
            if (0 === t.indexOf(a)) {
              t = JSON.parse(t.replace(a, ""));
              var n = t.key,
                r = c[n];
              r && (delete c[n], t.result = decodeURIComponent(t.result || ""), r.onLoad(t.result))
            }
          }
          function t() {
            if (!n) {
              n = !0;
              var t = s.getGlobal();
              t.postMessage ? s.on(t, "message", e) : (i.addMsgListener(e), i.startTimer())
            }
          }
          var n = !1;
          return function () {
            t()
          }
        }(),
          l.doSend = function () {
            function e() {
              l.forEach(function (e, t) {
                var n = d[t];
                n.parentNode && (e.name = n.name, s.isFunction(e.setAttribute) && e.setAttribute("form", n.getAttribute("form")), n.parentNode.replaceChild(e, n))
              })
            }
            var t = this,
              n = t.options,
              r = t.key = "zoro-ajax-upload-iframe-" + s.uniqueID();
            c[r] = t;
            var o = t.form = s.html2node('<form style="display:none;"></form>');
            document.body.appendChild(o),
              o.target = r,
              o.method = "POST",
              o.enctype = "multipart/form-data",
              o.encoding = "multipart/form-data";
            var i = n.url,
              a = s.genUrlSep(i);
            o.action = i + a + "_proxy_=form";
            var u = n.data,
              l = [],
              d = [];
            u && s.getKeys(u, n.putFileAtEnd).forEach(function (e) {
              var t = u[e];
              if (t.tagName && "INPUT" === t.tagName.toUpperCase()) {
                if ("file" === t.type) {
                  var n = t,
                    r = n.cloneNode(!0);
                  n.parentNode.insertBefore(r, n);
                  var i = s.dataset(n, "name");
                  i && (n.name = i),
                    o.appendChild(n),
                    s.isFunction(n.setAttribute) && (n.setAttribute("form", ""), n.removeAttribute("form")),
                    l.push(t),
                    d.push(r)
                }
              } else {
                var a = s.html2node('<input type="hidden"/>');
                a.name = e,
                  a.value = t,
                  o.appendChild(a)
              }
            });
            var m = t.iframe = s.createIframe({
              name: r,
              onload: function () {
                return t.aborted ? void e() : (s.on(m, "load", t.checkResult.bind(t)), o.submit(), e(), void t.afterSend())
              }
            })
          },
          l.checkResult = function () {
            var e, t, n = this;
            try {
              if (e = n.iframe.contentWindow.document.body, t = (e.innerText || e.textContent || "").trim(), t.indexOf(a) >= 0 || e.innerHTML.indexOf(a) >= 0) return
            } catch (r) {
              return void console.error("ignore error if not same domain,", r)
            }
            n.onLoad(t)
          },
          l.onLoad = function (e) {
            var t = this;
            u.onLoad.call(t, {
              status: 200,
              result: e
            }),
              s.remove(t.form),
              s.remove(t.iframe),
              u.destroy.call(t)
          },
          l.destroy = function () {
            s.remove(this.iframe),
              s.remove(this.form)
          },
          l.abort = function () {
            var e = this;
            e.aborted = !0,
              delete c[e.key],
              u.abort.call(e)
          },
          e.exports = r
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          var t = this;
          e.onuploading && t.on("uploading", e.onuploading),
            o.call(t, e)
        }
        var s = n(8),
          o = n(42),
          i = o.prototype,
          a = r.prototype = Object.create(i);
        a.doSend = function () {
          var e = this,
            t = e.options,
            n = t.headers,
            r = e.xhr = new XMLHttpRequest;
          if ("multipart/form-data" === n["Content-Type"]) {
            delete n["Content-Type"],
              r.upload.onprogress = e.onProgress.bind(e),
              r.upload.onload = e.onProgress.bind(e);
            var o = t.data;
            t.data = new window.FormData,
              o && s.getKeys(o, t.putFileAtEnd).forEach(function (e) {
                var n = o[e];
                n.tagName && "INPUT" === n.tagName.toUpperCase() ? "file" === n.type && [].forEach.call(n.files,
                  function (e) {
                    t.data.append(s.dataset(n, "name") || n.name || e.name || "file-" + s.uniqueID(), e)
                  }) : t.data.append(e, n)
              })
          }
          r.onreadystatechange = e.onStateChange.bind(e),
            0 !== t.timeout && (e.timer = setTimeout(e.onTimeout.bind(e), t.timeout)),
            r.open(t.method, t.url, !t.sync),
            Object.keys(n).forEach(function (e) {
              r.setRequestHeader(e, n[e])
            }),
            t.cookie && "withCredentials" in r && (r.withCredentials = !0),
            r.send(t.data),
            e.afterSend()
        },
          a.onProgress = function (e) {
            e.lengthComputable && e.loaded <= e.total && this.emit("uploading", e)
          },
          a.onStateChange = function () {
            var e = this,
              t = e.xhr;
            4 === t.readyState && e.onLoad({
              status: t.status,
              result: t.responseText || ""
            })
          },
          a.getResponseHeader = function (e) {
            var t = this.xhr;
            return t ? t.getResponseHeader(e) : ""
          },
          a.destroy = function () {
            var e = this;
            clearTimeout(e.timer);
            try {
              e.xhr.onreadystatechange = s.f,
                e.xhr.abort()
            } catch (t) {
              console.error("ignore error ajax destroy,", t)
            }
            i.destroy.call(e)
          },
          e.exports = r
      },
      function (e, t, n) {
        "use strict";
        var r = n(41),
          s = function (e, t) {
            return t.method = "POST",
              t.headers = t.headers || {},
              t.headers["Content-Type"] = "multipart/form-data",
              t.timeout = 0,
              t.type = t.type || "json",
              r(e, t)
          };
        e.exports = s
      },
      function (e, t, n) {
        "use strict";
        "undefined" != typeof window && (!window.console, 1)
      },
      function (e, t, n) {
        "use strict";
        function r() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          o.merge(this, {
            options: e,
            debug: !1,
            api: "log",
            style: "color:blue;",
            log: o.emptyFunc,
            info: o.emptyFunc,
            warn: o.emptyFunc,
            error: o.emptyFunc
          }),
            this.prefix = e.prefix || "",
            this.setDebug(e.debug)
        }
        var s = n(27),
          o = n(1),
          i = (n(20), r.prototype),
          a = ["Chrome", "Safari", "Firefox"];
        i.setDebug = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            t = this;
          if (t.debug = e, e.style && (t.style = e.style), t.debug && o.exist(console)) {
            var n = console;
            t.debug = function () {
              var e = t.formatArgs(arguments);
              a.indexOf(s.name) !== -1 && o.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)),
                t._log("debug", e)
            },
              t.log = function () {
                var e = t.formatArgs(arguments);
                a.indexOf(s.name) !== -1 && o.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)),
                  t._log("log", e)
              },
              t.info = function () {
                var e = t.formatArgs(arguments);
                a.indexOf(s.name) !== -1 && o.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)),
                  t._log("info", e)
              },
              t.warn = function () {
                var e = t.formatArgs(arguments);
                a.indexOf(s.name) !== -1 && o.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)),
                  t._log("warn", e)
              },
              t.error = function () {
                var e = t.formatArgs(arguments);
                a.indexOf(s.name) !== -1 && o.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)),
                  t._log("error", e)
              },
              t._log = function (e, r) {
                var s = !1,
                  i = t.options.logFunc,
                  a = null;
                if (i && !s && (i[e] && (a = i[e]), o.isFunction(a))) return void a.apply(i, r);
                if (n[e]) try {
                  n[e].apply ? t.chrome(e, r) : t.ie(e, r)
                } catch (c) { }
              },
              t.chrome = function (e, r) {
                a.indexOf(s.name) !== -1 ? n[e].apply(n, r) : t.ie(e, r)
              },
              t.ie = function (e, t) {
                t.forEach(function (t) {
                  n[e](JSON.stringify(t, null, 4))
                })
              }
          }
        },
          i.formatArgs = function (e) {
            var t = this;
            e = [].slice.call(e, 0);
            var n = new Date,
              r = c(n.getMonth() + 1) + "-" + c(n.getDate()) + " " + c(n.getHours()) + ":" + c(n.getMinutes()) + ":" + c(n.getSeconds()) + ":" + c(n.getMilliseconds(), 3),
              s = "[NIM LOG " + r + " " + t.prefix.toUpperCase() + "]  ";
            return o.isString(e[0]) ? e[0] = s + e[0] : e.splice(0, 0, s),
              e.forEach(function (t, n) {
              (o.isArray(t) || o.isObject(t)) && (e[n] = o.simpleClone(t))
              }),
              e
          };
        var c = function (e, t) {
          t = t || 2;
          for (var n = "" + e; n.length < t;) n = "0" + n;
          return n
        };
        e.exports = r
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          return e && e.__esModule ? e : {
            "default": e
          }
        }
        function s(e) {
          var t = {
            debug: 0,
            log: 1,
            info: 2,
            warn: 3,
            error: 4
          },
            n = this,
            r = e.url || null;
          n.level = t[e.level] || 0,
            n.logCache = [],
            n.logNum = 1,
            n.timeInterval = 5e3,
            window.onerror = function (e, t, r, s, o) {
              n.error.call(n, o)
            },
            setInterval(function () {
              n.logCache.length > 0 && r && n.postLogs(r, n.logCache)
            },
              n.timeInterval)
        }
        var o = n(6),
          i = r(o);
        s.prototype.debug = function () {
          this.level > 0 || (console.debug.apply(this, arguments), this.cacheLogs.apply(this, ["[degbug]"].concat(arguments)))
        },
          s.prototype.log = function () {
            this.level > 1 || (console.log.apply(this, arguments), this.cacheLogs.apply(this, ["[log]"].concat(arguments)))
          },
          s.prototype.info = function () {
            this.level > 2 || (console.info.apply(this, arguments), this.cacheLogs.apply(this, ["[info]"].concat(arguments)))
          },
          s.prototype.warn = function () {
            this.level > 3 || (console.warn.apply(this, arguments), this.cacheLogs.apply(this, ["[warn]"].concat(arguments)))
          },
          s.prototype.error = function () {
            this.level > 4 || (console.error.apply(this, arguments), this.cacheLogs.apply(this, ["[error]"].concat(arguments)))
          },
          s.prototype.cacheLogs = function (e, t) {
            for (var n = [], r = 0; r < t.length; r++) {
              var s = t[r];
              "object" === ("undefined" == typeof s ? "undefined" : (0, i["default"])(s)) ? n.push(JSON.stringify(s)) : n.push(s)
            }
            var o = this.logNum++ + " " + e + " " + n.join("; ");
            this.logCache.push(o.replace("%c", ""))
          },
          s.prototype.postLogs = function (e, t) {
            var n = this,
              r = new XMLHttpRequest;
            r.onreadystatechange = function () {
              4 === r.readyState && (200 === r.status ? (console.info("LoggerPlugin::日志上报完成"), n.logCache = [], n.timeInterval = 5e3) : n.timeInterval += 5e3)
            },
              r.open("POST", e),
              r.setRequestHeader("Content-Type", "plain/text;charset=utf-8"),
              r.timeout = 360,
              r.send(t.join("\n"))
          },
          e.exports = s
      },
      function (e, t, n) {
        "use strict";
        var r = n(1),
          s = {
            file: {
              md5: "$(Etag)",
              size: "$(ObjectSize)"
            },
            image: {
              md5: "$(Etag)",
              size: "$(ObjectSize)",
              w: "$(ImageInfo.Width)",
              h: "$(ImageInfo.Height)",
              orientation: "$(ImageInfo.Orientation)"
            },
            audio: {
              md5: "$(Etag)",
              size: "$(ObjectSize)",
              dur: "$(AVinfo.Audio.Duration)"
            },
            video: {
              md5: "$(Etag)",
              size: "$(ObjectSize)",
              dur: "$(AVinfo.Video.Duration)",
              w: "$(AVinfo.Video.Width)",
              h: "$(AVinfo.Video.Height)"
            }
          },
          o = {};
        o.genResponseBody = function (e) {
          return e = e || "file",
            s[e]
        },
          o.parseResponse = function (e, t) {
            r.notundef(e.size) && (e.size = +e.size),
              r.notundef(e.w) && (e.w = +e.w),
              r.notundef(e.h) && (e.h = +e.h),
              r.notundef(e.dur) && (e.dur = +e.dur);
            var n = e.orientation;
            if (r.notundef(n) && (delete e.orientation, t && ("right, top" === n || "left, bottom" === n))) {
              var s = e.w;
              e.w = e.h,
                e.h = s
            }
            return e
          },
          e.exports = o
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          var t = this;
          t.options = s.copy(e),
            s.verifyOptions(e, "url fileName"),
            s.verifyParamPresentJustOne(e, "blob fileInput"),
            s.verifyCallback(e, "beginupload uploadprogress uploaddone"),
            e.fileInput && (e.fileInput = s.verifyFileInput(e.fileInput)),
            e.type && s.verifyFileType(e.type),
            e.timeout ? s.verifyParamType("timeout", e.timeout, "number") : e.timeout = 6e5,
            s.verifyFileUploadCallback(e),
            e.data = {};
          var n = e.fileName,
            r = e.fileInput;
          if (c) if (r) {
            var a = e.type ? s.filterFiles(r.files, e.type) : [].slice.call(r.files, 0);
            if (!a || !a.length) return void e.uploaddone(o.newWrongFileTypeError("未读取到" + e.type + "类型的文件, 请确保文件选择节点的文件不为空, 并且请确保选择了" + e.type + "类型的文件"));
            var l = r.files[0].size;
            if (l > u) return void e.uploaddone(o.newFileTooLargeError("文件大小超过100M"));
            e.data[n] = a[0]
          } else e.blob && (e.data[n] = e.blob);
          else s.dataset(r, "name", n),
            e.data.input = r;
          e.params && s.merge(e.data, e.params);
          var d = {
            data: e.data,
            onaftersend: function () {
              e.beginupload(t)
            },
            onuploading: function (t) {
              var n = Math.floor(1e4 * t.loaded / t.total) / 100,
                r = {
                  total: t.total,
                  loaded: t.loaded,
                  percentage: n,
                  percentageText: n + "%"
                };
              e.fileInput && (r.fileInput = e.fileInput),
                e.blob && (r.blob = e.blob),
                e.uploadprogress(r)
            },
            onload: function (n) {
              n.Error ? t.onError(n) : e.uploaddone(null, n)
            },
            onerror: function (n) {
              try {
                if (n.result) var r = JSON.parse(n.result);
                else r = n;
                t.onError(r)
              } catch (s) {
                console.error("ignore error if could not parse obj.result", s),
                  e.uploaddone(new o(n.message, n.code), t.options)
              }
            }
          };
          c || (d.mode = "iframe"),
            d.putFileAtEnd = !0,
            t.sn = i(e.url, d)
        }
        var s = n(1),
          o = n(5),
          i = n(20).upload,
          a = n(20).abort,
          c = s.supportFormData,
          u = 104857600;
        r.prototype.onError = function (e) {
          var t, n, r, s = this,
            i = s.options;
          e = e || {},
            t = e.Error || e || {},
            n = t.Code || t.code || "unknown",
            r = t.Message || t.message || "未知错误",
            i.uploaddone(new o(n + "(" + r + ")", n))
        },
          r.prototype.abort = function () {
            a(this.sn)
          },
          e.exports = r
      },
      function (e, t, n) {
        e.exports = {
          "default": n(134),
          __esModule: !0
        }
      },
      function (e, t, n) {
        e.exports = {
          "default": n(135),
          __esModule: !0
        }
      },
      function (e, t, n) {
        e.exports = {
          "default": n(136),
          __esModule: !0
        }
      },
      function (e, t, n) {
        e.exports = {
          "default": n(137),
          __esModule: !0
        }
      },
      function (e, t, n) {
        e.exports = {
          "default": n(138),
          __esModule: !0
        }
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          return e && e.__esModule ? e : {
            "default": e
          }
        }
        t.__esModule = !0;
        var s = n(128),
          o = r(s);
        t["default"] = function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value" in r && (r.writable = !0),
                (0, o["default"])(e, r.key, r)
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n),
              r && e(t, r),
              t
          }
        }()
      },
      function (e, t) {
        function n(e) {
          e = e || {},
            this.ms = e.min || 100,
            this.max = e.max || 1e4,
            this.factor = e.factor || 2,
            this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0,
            this.attempts = 0
        }
        e.exports = n,
          n.prototype.duration = function () {
            var e = this.ms * Math.pow(this.factor, this.attempts++);
            if (this.jitter) {
              var t = Math.random(),
                n = Math.floor(t * this.jitter * e);
              e = 0 == (1 & Math.floor(10 * t)) ? e - n : e + n
            }
            return 0 | Math.min(e, this.max)
          },
          n.prototype.reset = function () {
            this.attempts = 0
          },
          n.prototype.setMin = function (e) {
            this.ms = e
          },
          n.prototype.setMax = function (e) {
            this.max = e
          },
          n.prototype.setJitter = function (e) {
            this.jitter = e
          }
      },
      function (e, t, n) {
        n(158);
        var r = n(15).Object;
        e.exports = function (e, t) {
          return r.create(e, t)
        }
      },
      function (e, t, n) {
        n(159);
        var r = n(15).Object;
        e.exports = function (e, t, n) {
          return r.defineProperty(e, t, n)
        }
      },
      function (e, t, n) {
        n(160),
          e.exports = n(15).Object.setPrototypeOf
      },
      function (e, t, n) {
        n(163),
          n(161),
          n(164),
          n(165),
          e.exports = n(15).Symbol
      },
      function (e, t, n) {
        n(162),
          n(166),
          e.exports = n(56).f("iterator")
      },
      function (e, t) {
        e.exports = function (e) {
          if ("function" != typeof e) throw TypeError(e + " is not a function!");
          return e
        }
      },
      function (e, t) {
        e.exports = function () { }
      },
      function (e, t, n) {
        var r = n(18),
          s = n(155),
          o = n(154);
        e.exports = function (e) {
          return function (t, n, i) {
            var a, c = r(t),
              u = s(c.length),
              l = o(i, u);
            if (e && n != n) {
              for (; u > l;) if (a = c[l++], a != a) return !0
            } else for (; u > l; l++) if ((e || l in c) && c[l] === n) return e || l || 0;
            return !e && -1
          }
        }
      },
      function (e, t, n) {
        var r = n(48),
          s = n(82),
          o = n(49);
        e.exports = function (e) {
          var t = r(e),
            n = s.f;
          if (n) for (var i, a = n(e), c = o.f, u = 0; a.length > u;) c.call(e, i = a[u++]) && t.push(i);
          return t
        }
      },
      function (e, t, n) {
        var r = n(9).document;
        e.exports = r && r.documentElement
      },
      function (e, t, n) {
        var r = n(75);
        e.exports = Object("z").propertyIsEnumerable(0) ? Object : function (e) {
          return "String" == r(e) ? e.split("") : Object(e)
        }
      },
      function (e, t, n) {
        var r = n(75);
        e.exports = Array.isArray ||
          function (e) {
            return "Array" == r(e)
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(47),
          s = n(31),
          o = n(50),
          i = {};
        n(16)(i, n(19)("iterator"),
          function () {
            return this
          }),
          e.exports = function (e, t, n) {
            e.prototype = r(i, {
              next: s(1, n)
            }),
              o(e, t + " Iterator")
          }
      },
      function (e, t) {
        e.exports = function (e, t) {
          return {
            value: t,
            done: !!e
          }
        }
      },
      function (e, t, n) {
        var r = n(32)("meta"),
          s = n(17),
          o = n(13),
          i = n(14).f,
          a = 0,
          c = Object.isExtensible ||
            function () {
              return !0
            },
          u = !n(30)(function () {
            return c(Object.preventExtensions({}))
          }),
          l = function (e) {
            i(e, r, {
              value: {
                i: "O" + ++a,
                w: {}
              }
            })
          },
          d = function (e, t) {
            if (!s(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
            if (!o(e, r)) {
              if (!c(e)) return "F";
              if (!t) return "E";
              l(e)
            }
            return e[r].i
          },
          m = function (e, t) {
            if (!o(e, r)) {
              if (!c(e)) return !0;
              if (!t) return !1;
              l(e)
            }
            return e[r].w
          },
          f = function (e) {
            return u && p.NEED && c(e) && !o(e, r) && l(e),
              e
          },
          p = e.exports = {
            KEY: r,
            NEED: !1,
            fastKey: d,
            getWeak: m,
            onFreeze: f
          }
      },
      function (e, t, n) {
        var r = n(14),
          s = n(25),
          o = n(48);
        e.exports = n(12) ? Object.defineProperties : function (e, t) {
          s(e);
          for (var n, i = o(t), a = i.length, c = 0; a > c;) r.f(e, n = i[c++], t[n]);
          return e
        }
      },
      function (e, t, n) {
        var r = n(18),
          s = n(81).f,
          o = {}.toString,
          i = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
          a = function (e) {
            try {
              return s(e)
            } catch (t) {
              return i.slice()
            }
          };
        e.exports.f = function (e) {
          return i && "[object Window]" == o.call(e) ? a(e) : s(r(e))
        }
      },
      function (e, t, n) {
        var r = n(13),
          s = n(156),
          o = n(51)("IE_PROTO"),
          i = Object.prototype;
        e.exports = Object.getPrototypeOf ||
          function (e) {
            return e = s(e),
              r(e, o) ? e[o] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? i : null
          }
      },
      function (e, t, n) {
        var r = n(17),
          s = n(25),
          o = function (e, t) {
            if (s(e), !r(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
          };
        e.exports = {
          set: Object.setPrototypeOf || ("__proto__" in {} ?
            function (e, t, r) {
              try {
                r = n(76)(Function.call, n(80).f(Object.prototype, "__proto__").set, 2),
                  r(e, []),
                  t = !(e instanceof Array)
              } catch (s) {
                t = !0
              }
              return function (e, n) {
                return o(e, n),
                  t ? e.__proto__ = n : r(e, n),
                  e
              }
            }({},
              !1) : void 0),
          check: o
        }
      },
      function (e, t, n) {
        var r = n(53),
          s = n(43);
        e.exports = function (e) {
          return function (t, n) {
            var o, i, a = String(s(t)),
              c = r(n),
              u = a.length;
            return c < 0 || c >= u ? e ? "" : void 0 : (o = a.charCodeAt(c), o < 55296 || o > 56319 || c + 1 === u || (i = a.charCodeAt(c + 1)) < 56320 || i > 57343 ? e ? a.charAt(c) : o : e ? a.slice(c, c + 2) : (o - 55296 << 10) + (i - 56320) + 65536)
          }
        }
      },
      function (e, t, n) {
        var r = n(53),
          s = Math.max,
          o = Math.min;
        e.exports = function (e, t) {
          return e = r(e),
            e < 0 ? s(e + t, 0) : o(e, t)
        }
      },
      function (e, t, n) {
        var r = n(53),
          s = Math.min;
        e.exports = function (e) {
          return e > 0 ? s(r(e), 9007199254740991) : 0
        }
      },
      function (e, t, n) {
        var r = n(43);
        e.exports = function (e) {
          return Object(r(e))
        }
      },
      function (e, t, n) {
        "use strict";
        var r = n(140),
          s = n(147),
          o = n(45),
          i = n(18);
        e.exports = n(79)(Array, "Array",
          function (e, t) {
            this._t = i(e),
              this._i = 0,
              this._k = t
          },
          function () {
            var e = this._t,
              t = this._k,
              n = this._i++;
            return !e || n >= e.length ? (this._t = void 0, s(1)) : "keys" == t ? s(0, n) : "values" == t ? s(0, e[n]) : s(0, [n, e[n]])
          },
          "values"),
          o.Arguments = o.Array,
          r("keys"),
          r("values"),
          r("entries")
      },
      function (e, t, n) {
        var r = n(26);
        r(r.S, "Object", {
          create: n(47)
        })
      },
      function (e, t, n) {
        var r = n(26);
        r(r.S + r.F * !n(12), "Object", {
          defineProperty: n(14).f
        })
      },
      function (e, t, n) {
        var r = n(26);
        r(r.S, "Object", {
          setPrototypeOf: n(152).set
        })
      },
      function (e, t) { },
      function (e, t, n) {
        "use strict";
        var r = n(153)(!0);
        n(79)(String, "String",
          function (e) {
            this._t = String(e),
              this._i = 0
          },
          function () {
            var e, t = this._t,
              n = this._i;
            return n >= t.length ? {
              value: void 0,
              done: !0
            } : (e = r(t, n), this._i += e.length, {
              value: e,
              done: !1
            })
          })
      },
      function (e, t, n) {
        "use strict";
        var r = n(9),
          s = n(13),
          o = n(12),
          i = n(26),
          a = n(84),
          c = n(148).KEY,
          u = n(30),
          l = n(52),
          d = n(50),
          m = n(32),
          f = n(19),
          p = n(56),
          g = n(55),
          y = n(142),
          h = n(145),
          v = n(25),
          b = n(17),
          M = n(18),
          T = n(54),
          S = n(31),
          k = n(47),
          w = n(150),
          C = n(80),
          O = n(14),
          _ = n(48),
          I = C.f,
          x = O.f,
          E = w.f,
          P = r.Symbol,
          A = r.JSON,
          R = A && A.stringify,
          j = "prototype",
          F = f("_hidden"),
          N = f("toPrimitive"),
          U = {}.propertyIsEnumerable,
          D = l("symbol-registry"),
          L = l("symbols"),
          B = l("op-symbols"),
          q = Object[j],
          W = "function" == typeof P,
          H = r.QObject,
          $ = !H || !H[j] || !H[j].findChild,
          X = o && u(function () {
            return 7 != k(x({},
              "a", {
                get: function () {
                  return x(this, "a", {
                    value: 7
                  }).a
                }
              })).a
          }) ?
            function (e, t, n) {
              var r = I(q, t);
              r && delete q[t],
                x(e, t, n),
                r && e !== q && x(q, t, r)
            } : x,
          V = function (e) {
            var t = L[e] = k(P[j]);
            return t._k = e,
              t
          },
          J = W && "symbol" == typeof P.iterator ?
            function (e) {
              return "symbol" == typeof e
            } : function (e) {
              return e instanceof P
            },
          G = function (e, t, n) {
            return e === q && G(B, t, n),
              v(e),
              t = T(t, !0),
              v(n),
              s(L, t) ? (n.enumerable ? (s(e, F) && e[F][t] && (e[F][t] = !1), n = k(n, {
                enumerable: S(0, !1)
              })) : (s(e, F) || x(e, F, S(1, {})), e[F][t] = !0), X(e, t, n)) : x(e, t, n)
          },
          K = function (e, t) {
            v(e);
            for (var n, r = y(t = M(t)), s = 0, o = r.length; o > s;) G(e, n = r[s++], t[n]);
            return e
          },
          z = function (e, t) {
            return void 0 === t ? k(e) : K(k(e), t)
          },
          Y = function (e) {
            var t = U.call(this, e = T(e, !0));
            return !(this === q && s(L, e) && !s(B, e)) && (!(t || !s(this, e) || !s(L, e) || s(this, F) && this[F][e]) || t)
          },
          Q = function (e, t) {
            if (e = M(e), t = T(t, !0), e !== q || !s(L, t) || s(B, t)) {
              var n = I(e, t);
              return !n || !s(L, t) || s(e, F) && e[F][t] || (n.enumerable = !0),
                n
            }
          },
          Z = function (e) {
            for (var t, n = E(M(e)), r = [], o = 0; n.length > o;) s(L, t = n[o++]) || t == F || t == c || r.push(t);
            return r
          },
          ee = function (e) {
            for (var t, n = e === q,
              r = E(n ? B : M(e)), o = [], i = 0; r.length > i;) !s(L, t = r[i++]) || n && !s(q, t) || o.push(L[t]);
            return o
          };
        W || (P = function () {
          if (this instanceof P) throw TypeError("Symbol is not a constructor!");
          var e = m(arguments.length > 0 ? arguments[0] : void 0),
            t = function (n) {
              this === q && t.call(B, n),
                s(this, F) && s(this[F], e) && (this[F][e] = !1),
                X(this, e, S(1, n))
            };
          return o && $ && X(q, e, {
            configurable: !0,
            set: t
          }),
            V(e)
        },
          a(P[j], "toString",
            function () {
              return this._k
            }), C.f = Q, O.f = G, n(81).f = w.f = Z, n(49).f = Y, n(82).f = ee, o && !n(46) && a(q, "propertyIsEnumerable", Y, !0), p.f = function (e) {
              return V(f(e))
            }),
          i(i.G + i.W + i.F * !W, {
            Symbol: P
          });
        for (var te = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), ne = 0; te.length > ne;) f(te[ne++]);
        for (var re = _(f.store), se = 0; re.length > se;) g(re[se++]);
        i(i.S + i.F * !W, "Symbol", {
          "for": function (e) {
            return s(D, e += "") ? D[e] : D[e] = P(e)
          },
          keyFor: function (e) {
            if (!J(e)) throw TypeError(e + " is not a symbol!");
            for (var t in D) if (D[t] === e) return t
          },
          useSetter: function () {
            $ = !0
          },
          useSimple: function () {
            $ = !1
          }
        }),
          i(i.S + i.F * !W, "Object", {
            create: z,
            defineProperty: G,
            defineProperties: K,
            getOwnPropertyDescriptor: Q,
            getOwnPropertyNames: Z,
            getOwnPropertySymbols: ee
          }),
          A && i(i.S + i.F * (!W || u(function () {
            var e = P();
            return "[null]" != R([e]) || "{}" != R({
              a: e
            }) || "{}" != R(Object(e))
          })), "JSON", {
              stringify: function (e) {
                for (var t, n, r = [e], s = 1; arguments.length > s;) r.push(arguments[s++]);
                if (n = t = r[1], (b(t) || void 0 !== e) && !J(e)) return h(t) || (t = function (e, t) {
                  if ("function" == typeof n && (t = n.call(this, e, t)), !J(t)) return t
                }),
                  r[1] = t,
                  R.apply(A, r)
              }
            }),
          P[j][N] || n(16)(P[j], N, P[j].valueOf),
          d(P, "Symbol"),
          d(Math, "Math", !0),
          d(r.JSON, "JSON", !0)
      },
      function (e, t, n) {
        n(55)("asyncIterator")
      },
      function (e, t, n) {
        n(55)("observable")
      },
      function (e, t, n) {
        n(157);
        for (var r = n(9), s = n(16), o = n(45), i = n(19)("toStringTag"), a = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), c = 0; c < a.length; c++) {
          var u = a[c],
            l = r[u],
            d = l && l.prototype;
          d && !d[i] && s(d, i, u),
            o[u] = o.Array
        }
      },
      function (e, t, n) {
        "use strict";
        function r(e, t) {
          for (var n = e[i][t]; null != n;) {
            if (n.kind === a) return n.listener;
            n = n.next
          }
          return null
        }
        function s(e, t, n) {
          "function" != typeof n && "object" != typeof n && (n = null);
          for (var r = null,
            s = e[i][t]; null != s;) s.kind === a ? null == r ? e[i][t] = s.next : r.next = s.next : r = s,
              s = s.next;
          null != n && (null == r ? e[i][t] = c(n, a) : r.next = c(n, a))
        }
        var o = n(57),
          i = o.LISTENERS,
          a = o.ATTRIBUTE,
          c = o.newNode;
        t.defineCustomEventTarget = function (e, t) {
          function n() {
            e.call(this)
          }
          var o = {
            constructor: {
              value: n,
              configurable: !0,
              writable: !0
            }
          };
          return t.forEach(function (e) {
            o["on" + e] = {
              get: function () {
                return r(this, e)
              },
              set: function (t) {
                s(this, e, t)
              },
              configurable: !0,
              enumerable: !0
            }
          }),
            n.prototype = Object.create(e.prototype, o),
            n
        }
      },
      function (e, t, n) {
        "use strict";
        var r = n(57).createUniqueKey,
          s = r("stop_immediate_propagation_flag"),
          o = r("canceled_flag"),
          i = r("original_event"),
          a = Object.freeze({
            stopPropagation: Object.freeze({
              value: function () {
                var e = this[i];
                "function" == typeof e.stopPropagation && e.stopPropagation()
              },
              writable: !0,
              configurable: !0
            }),
            stopImmediatePropagation: Object.freeze({
              value: function () {
                this[s] = !0;
                var e = this[i];
                "function" == typeof e.stopImmediatePropagation && e.stopImmediatePropagation()
              },
              writable: !0,
              configurable: !0
            }),
            preventDefault: Object.freeze({
              value: function () {
                this.cancelable === !0 && (this[o] = !0);
                var e = this[i];
                "function" == typeof e.preventDefault && e.preventDefault()
              },
              writable: !0,
              configurable: !0
            }),
            defaultPrevented: Object.freeze({
              get: function () {
                return this[o]
              },
              enumerable: !0,
              configurable: !0
            })
          });
        t.STOP_IMMEDIATE_PROPAGATION_FLAG = s,
          t.createEventWrapper = function (e, t) {
            var n = "number" == typeof e.timeStamp ? e.timeStamp : Date.now(),
              r = {
                type: {
                  value: e.type,
                  enumerable: !0
                },
                target: {
                  value: t,
                  enumerable: !0
                },
                currentTarget: {
                  value: t,
                  enumerable: !0
                },
                eventPhase: {
                  value: 2,
                  enumerable: !0
                },
                bubbles: {
                  value: Boolean(e.bubbles),
                  enumerable: !0
                },
                cancelable: {
                  value: Boolean(e.cancelable),
                  enumerable: !0
                },
                timeStamp: {
                  value: n,
                  enumerable: !0
                },
                isTrusted: {
                  value: !1,
                  enumerable: !0
                }
              };
            return r[s] = {
              value: !1,
              writable: !0
            },
              r[o] = {
                value: !1,
                writable: !0
              },
              r[i] = {
                value: e
              },
              "undefined" != typeof e.detail && (r.detail = {
                value: e.detail,
                enumerable: !0
              }),
              Object.create(Object.create(e, a), r)
          }
      },
      function (e, t, n) {
        "use strict";
        function r() { }
        function s(e, t, n) {
          this.fn = e,
            this.context = t,
            this.once = n || !1
        }
        function o() {
          this._events = new r,
            this._eventsCount = 0
        }
        var i = Object.prototype.hasOwnProperty,
          a = "~";
        Object.create && (r.prototype = Object.create(null), (new r).__proto__ || (a = !1)),
          o.prototype.eventNames = function () {
            var e, t, n = [];
            if (0 === this._eventsCount) return n;
            for (t in e = this._events) i.call(e, t) && n.push(a ? t.slice(1) : t);
            return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(e)) : n
          },
          o.prototype.listeners = function (e, t) {
            var n = a ? a + e : e,
              r = this._events[n];
            if (t) return !!r;
            if (!r) return [];
            if (r.fn) return [r.fn];
            for (var s = 0,
              o = r.length,
              i = new Array(o); s < o; s++) i[s] = r[s].fn;
            return i
          },
          o.prototype.emit = function (e, t, n, r, s, o) {
            var i = a ? a + e : e;
            if (!this._events[i]) return !1;
            var c, u, l = this._events[i],
              d = arguments.length;
            if (l.fn) {
              switch (l.once && this.removeListener(e, l.fn, void 0, !0), d) {
                case 1:
                  return l.fn.call(l.context),
                    !0;
                case 2:
                  return l.fn.call(l.context, t),
                    !0;
                case 3:
                  return l.fn.call(l.context, t, n),
                    !0;
                case 4:
                  return l.fn.call(l.context, t, n, r),
                    !0;
                case 5:
                  return l.fn.call(l.context, t, n, r, s),
                    !0;
                case 6:
                  return l.fn.call(l.context, t, n, r, s, o),
                    !0
              }
              for (u = 1, c = new Array(d - 1); u < d; u++) c[u - 1] = arguments[u];
              l.fn.apply(l.context, c)
            } else {
              var m, f = l.length;
              for (u = 0; u < f; u++) switch (l[u].once && this.removeListener(e, l[u].fn, void 0, !0), d) {
                case 1:
                  l[u].fn.call(l[u].context);
                  break;
                case 2:
                  l[u].fn.call(l[u].context, t);
                  break;
                case 3:
                  l[u].fn.call(l[u].context, t, n);
                  break;
                case 4:
                  l[u].fn.call(l[u].context, t, n, r);
                  break;
                default:
                  if (!c) for (m = 1, c = new Array(d - 1); m < d; m++) c[m - 1] = arguments[m];
                  l[u].fn.apply(l[u].context, c)
              }
            }
            return !0
          },
          o.prototype.on = function (e, t, n) {
            var r = new s(t, n || this),
              o = a ? a + e : e;
            return this._events[o] ? this._events[o].fn ? this._events[o] = [this._events[o], r] : this._events[o].push(r) : (this._events[o] = r, this._eventsCount++),
              this
          },
          o.prototype.once = function (e, t, n) {
            var r = new s(t, n || this, !0),
              o = a ? a + e : e;
            return this._events[o] ? this._events[o].fn ? this._events[o] = [this._events[o], r] : this._events[o].push(r) : (this._events[o] = r, this._eventsCount++),
              this
          },
          o.prototype.removeListener = function (e, t, n, s) {
            var o = a ? a + e : e;
            if (!this._events[o]) return this;
            if (!t) return 0 === --this._eventsCount ? this._events = new r : delete this._events[o],
              this;
            var i = this._events[o];
            if (i.fn) i.fn !== t || s && !i.once || n && i.context !== n || (0 === --this._eventsCount ? this._events = new r : delete this._events[o]);
            else {
              for (var c = 0,
                u = [], l = i.length; c < l; c++)(i[c].fn !== t || s && !i[c].once || n && i[c].context !== n) && u.push(i[c]);
              u.length ? this._events[o] = 1 === u.length ? u[0] : u : 0 === --this._eventsCount ? this._events = new r : delete this._events[o]
            }
            return this
          },
          o.prototype.removeAllListeners = function (e) {
            var t;
            return e ? (t = a ? a + e : e, this._events[t] && (0 === --this._eventsCount ? this._events = new r : delete this._events[t])) : (this._events = new r, this._eventsCount = 0),
              this
          },
          o.prototype.off = o.prototype.removeListener,
          o.prototype.addListener = o.prototype.on,
          o.prototype.setMaxListeners = function () {
            return this
          },
          o.prefixed = a,
          o.EventEmitter = o,
          e.exports = o
      },
      function (e, t, n) {
        function r(e, t, n) {
          if (!a(t)) throw new TypeError("iterator must be a function");
          arguments.length < 3 && (n = this),
            "[object Array]" === c.call(e) ? s(e, t, n) : "string" == typeof e ? o(e, t, n) : i(e, t, n)
        }
        function s(e, t, n) {
          for (var r = 0,
            s = e.length; r < s; r++) u.call(e, r) && t.call(n, e[r], r, e)
        }
        function o(e, t, n) {
          for (var r = 0,
            s = e.length; r < s; r++) t.call(n, e.charAt(r), r, e)
        }
        function i(e, t, n) {
          for (var r in e) u.call(e, r) && t.call(n, e[r], r, e)
        }
        var a = n(85);
        e.exports = r;
        var c = Object.prototype.toString,
          u = Object.prototype.hasOwnProperty
      },
      function (e, t) {
        (function (t) {
          var n;
          n = "undefined" != typeof window ? window : "undefined" != typeof t ? t : "undefined" != typeof self ? self : {},
            e.exports = n
        }).call(t,
        function () {
          return this
        }())
      },
      function (e, t, n) {
        var r = n(174),
          s = n(170),
          o = function (e) {
            return "[object Array]" === Object.prototype.toString.call(e)
          };
        e.exports = function (e) {
          if (!e) return {};
          var t = {};
          return s(r(e).split("\n"),
            function (e) {
              var n = e.indexOf(":"),
                s = r(e.slice(0, n)).toLowerCase(),
                i = r(e.slice(n + 1));
              "undefined" == typeof t[s] ? t[s] = i : o(t[s]) ? t[s].push(i) : t[s] = [t[s], i]
            }),
            t
        }
      },
      function (e, t) {
        function n() {
          throw new Error("setTimeout has not been defined")
        }
        function r() {
          throw new Error("clearTimeout has not been defined")
        }
        function s(e) {
          if (l === setTimeout) return setTimeout(e, 0);
          if ((l === n || !l) && setTimeout) return l = setTimeout,
            setTimeout(e, 0);
          try {
            return l(e, 0)
          } catch (t) {
            try {
              return l.call(null, e, 0)
            } catch (t) {
              return l.call(this, e, 0)
            }
          }
        }
        function o(e) {
          if (d === clearTimeout) return clearTimeout(e);
          if ((d === r || !d) && clearTimeout) return d = clearTimeout,
            clearTimeout(e);
          try {
            return d(e)
          } catch (t) {
            try {
              return d.call(null, e)
            } catch (t) {
              return d.call(this, e)
            }
          }
        }
        function i() {
          g && f && (g = !1, f.length ? p = f.concat(p) : y = -1, p.length && a())
        }
        function a() {
          if (!g) {
            var e = s(i);
            g = !0;
            for (var t = p.length; t;) {
              for (f = p, p = []; ++y < t;) f && f[y].run();
              y = -1,
                t = p.length
            }
            f = null,
              g = !1,
              o(e)
          }
        }
        function c(e, t) {
          this.fun = e,
            this.array = t
        }
        function u() { }
        var l, d, m = e.exports = {}; !
          function () {
            try {
              l = "function" == typeof setTimeout ? setTimeout : n
            } catch (e) {
              l = n
            }
            try {
              d = "function" == typeof clearTimeout ? clearTimeout : r
            } catch (e) {
              d = r
            }
          }();
        var f, p = [],
          g = !1,
          y = -1;
        m.nextTick = function (e) {
          var t = new Array(arguments.length - 1);
          if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
          p.push(new c(e, t)),
            1 !== p.length || g || s(a)
        },
          c.prototype.run = function () {
            this.fun.apply(null, this.array)
          },
          m.title = "browser",
          m.browser = !0,
          m.env = {},
          m.argv = [],
          m.version = "",
          m.versions = {},
          m.on = u,
          m.addListener = u,
          m.once = u,
          m.off = u,
          m.removeListener = u,
          m.removeAllListeners = u,
          m.emit = u,
          m.prependListener = u,
          m.prependOnceListener = u,
          m.listeners = function (e) {
            return []
          },
          m.binding = function (e) {
            throw new Error("process.binding is not supported")
          },
          m.cwd = function () {
            return "/"
          },
          m.chdir = function (e) {
            throw new Error("process.chdir is not supported")
          },
          m.umask = function () {
            return 0
          }
      },
      function (e, t) {
        function n(e) {
          return e.replace(/^\s*|\s*$/g, "")
        }
        t = e.exports = n,
          t.left = function (e) {
            return e.replace(/^\s*/, "")
          },
          t.right = function (e) {
            return e.replace(/\s*$/, "")
          }
      },
      function (e, t, n) {
        var r; !
          function (t) {
            "use strict";
            function s() { }
            function o(e, t) {
              for (var n = e.length; n--;) if (e[n].listener === t) return n;
              return - 1
            }
            function i(e) {
              return function () {
                return this[e].apply(this, arguments)
              }
            }
            function a(e) {
              return "function" == typeof e || e instanceof RegExp || !(!e || "object" != typeof e) && a(e.listener)
            }
            var c = s.prototype,
              u = t.EventEmitter;
            c.getListeners = function (e) {
              var t, n, r = this._getEvents();
              if (e instanceof RegExp) {
                t = {};
                for (n in r) r.hasOwnProperty(n) && e.test(n) && (t[n] = r[n])
              } else t = r[e] || (r[e] = []);
              return t
            },
              c.flattenListeners = function (e) {
                var t, n = [];
                for (t = 0; t < e.length; t += 1) n.push(e[t].listener);
                return n
              },
              c.getListenersAsObject = function (e) {
                var t, n = this.getListeners(e);
                return n instanceof Array && (t = {},
                  t[e] = n),
                  t || n
              },
              c.addListener = function (e, t) {
                if (!a(t)) throw new TypeError("listener must be a function");
                var n, r = this.getListenersAsObject(e),
                  s = "object" == typeof t;
                for (n in r) r.hasOwnProperty(n) && o(r[n], t) === -1 && r[n].push(s ? t : {
                  listener: t,
                  once: !1
                });
                return this
              },
              c.on = i("addListener"),
              c.addOnceListener = function (e, t) {
                return this.addListener(e, {
                  listener: t,
                  once: !0
                })
              },
              c.once = i("addOnceListener"),
              c.defineEvent = function (e) {
                return this.getListeners(e),
                  this
              },
              c.defineEvents = function (e) {
                for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
                return this
              },
              c.removeListener = function (e, t) {
                var n, r, s = this.getListenersAsObject(e);
                for (r in s) s.hasOwnProperty(r) && (n = o(s[r], t), n !== -1 && s[r].splice(n, 1));
                return this
              },
              c.off = i("removeListener"),
              c.addListeners = function (e, t) {
                return this.manipulateListeners(!1, e, t)
              },
              c.removeListeners = function (e, t) {
                return this.manipulateListeners(!0, e, t)
              },
              c.manipulateListeners = function (e, t, n) {
                var r, s, o = e ? this.removeListener : this.addListener,
                  i = e ? this.removeListeners : this.addListeners;
                if ("object" != typeof t || t instanceof RegExp) for (r = n.length; r--;) o.call(this, t, n[r]);
                else for (r in t) t.hasOwnProperty(r) && (s = t[r]) && ("function" == typeof s ? o.call(this, r, s) : i.call(this, r, s));
                return this
              },
              c.removeEvent = function (e) {
                var t, n = typeof e,
                  r = this._getEvents();
                if ("string" === n) delete r[e];
                else if (e instanceof RegExp) for (t in r) r.hasOwnProperty(t) && e.test(t) && delete r[t];
                else delete this._events;
                return this
              },
              c.removeAllListeners = i("removeEvent"),
              c.emitEvent = function (e, t) {
                var n, r, s, o, i, a = this.getListenersAsObject(e);
                for (o in a) if (a.hasOwnProperty(o)) for (n = a[o].slice(0), s = 0; s < n.length; s++) r = n[s],
                  r.once === !0 && this.removeListener(e, r.listener),
                  i = r.listener.apply(this, t || []),
                  i === this._getOnceReturnValue() && this.removeListener(e, r.listener);
                return this
              },
              c.trigger = i("emitEvent"),
              c.emit = function (e) {
                var t = Array.prototype.slice.call(arguments, 1);
                return this.emitEvent(e, t)
              },
              c.setOnceReturnValue = function (e) {
                return this._onceReturnValue = e,
                  this
              },
              c._getOnceReturnValue = function () {
                return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
              },
              c._getEvents = function () {
                return this._events || (this._events = {})
              },
              s.noConflict = function () {
                return t.EventEmitter = u,
                  s
              },
              r = function () {
                return s
              }.call(t, n, t, e),
              !(void 0 !== r && (e.exports = r))
          }(this || {})
      },
      function (e, t, n) {
        var r, s, o; !
          function (n, i) {
            "use strict";
            s = [],
              r = i,
              o = "function" == typeof r ? r.apply(t, s) : r,
              !(void 0 !== o && (e.exports = o))
          }(this,
            function (e) {
              "use strict";
              return function (t) {
                function n() {
                  t.arrayAccessForm = t.arrayAccessForm || "none",
                    t.emptyNodeForm = t.emptyNodeForm || "text",
                    t.attributeConverters = t.attributeConverters || [],
                    t.datetimeAccessFormPaths = t.datetimeAccessFormPaths || [],
                    t.arrayAccessFormPaths = t.arrayAccessFormPaths || [],
                    void 0 === t.enableToStringFunc && (t.enableToStringFunc = !0),
                    void 0 === t.skipEmptyTextNodesForObj && (t.skipEmptyTextNodesForObj = !0),
                    void 0 === t.stripWhitespaces && (t.stripWhitespaces = !0),
                    void 0 === t.useDoubleQuotes && (t.useDoubleQuotes = !0),
                    void 0 === t.ignoreRoot && (t.ignoreRoot = !1),
                    void 0 === t.escapeMode && (t.escapeMode = !0),
                    void 0 === t.attributePrefix && (t.attributePrefix = "_"),
                    void 0 === t.selfClosingElements && (t.selfClosingElements = !0),
                    void 0 === t.keepCData && (t.keepCData = !1)
                }
                function r() {
                  function e(e) {
                    var t = String(e);
                    return 1 === t.length && (t = "0" + t),
                      t
                  }
                  "function" != typeof String.prototype.trim && (String.prototype.trim = function () {
                    return this.replace(/^\s+|^\n+|(\s|\n)+$/g, "")
                  }),
                    "function" != typeof Date.prototype.toISOString && (Date.prototype.toISOString = function () {
                      var t = 1e3;
                      return this.getUTCFullYear() + "-" + e(this.getUTCMonth() + 1) + "-" + e(this.getUTCDate()) + "T" + e(this.getUTCHours()) + ":" + e(this.getUTCMinutes()) + ":" + e(this.getUTCSeconds()) + "." + String((this.getUTCMilliseconds() / t).toFixed(3)).slice(2, 5) + "Z"
                    })
                }
                function s(e) {
                  var t = e.localName;
                  return null == t && (t = e.baseName),
                    null != t && "" !== t || (t = e.nodeName),
                    t
                }
                function o(e) {
                  return e.prefix
                }
                function i(e) {
                  return "string" == typeof e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;") : e
                }
                function a(e) {
                  return e.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, "&")
                }
                function c(e, n, r) {
                  switch (t.arrayAccessForm) {
                    case "property":
                      e[n] instanceof Array ? e[n + "_asArray"] = e[n] : e[n + "_asArray"] = [e[n]]
                  }
                  if (!(e[n] instanceof Array) && t.arrayAccessFormPaths.length > 0) {
                    for (var s = !1,
                      o = 0; o < t.arrayAccessFormPaths.length; o++) {
                      var i = t.arrayAccessFormPaths[o];
                      if ("string" == typeof i) {
                        if (i === r) {
                          s = !0;
                          break
                        }
                      } else if (i instanceof RegExp) {
                        if (i.test(r)) {
                          s = !0;
                          break
                        }
                      } else if ("function" == typeof i && i(n, r)) {
                        s = !0;
                        break
                      }
                    }
                    s && (e[n] = [e[n]])
                  }
                }
                function u(e) {
                  var t = 60,
                    n = e.split(/[-T:+Z]/g),
                    r = new Date(n[0], n[1] - 1, n[2]),
                    s = n[5].split(".");
                  if (r.setHours(n[3], n[4], s[0]), s.length > 1 && r.setMilliseconds(s[1]), n[6] && n[7]) {
                    var o = n[6] * t + Number(n[7]),
                      i = /\d\d-\d\d:\d\d$/.test(e) ? "-" : "+";
                    o = 0 + ("-" === i ? -1 * o : o),
                      r.setMinutes(r.getMinutes() - o - r.getTimezoneOffset())
                  } else e.indexOf("Z", e.length - 1) !== -1 && (r = new Date(Date.UTC(r.getFullYear(), r.getMonth(), r.getDate(), r.getHours(), r.getMinutes(), r.getSeconds(), r.getMilliseconds())));
                  return r
                }
                function l(e, n, r) {
                  if (t.datetimeAccessFormPaths.length > 0) for (var s = r.split(".#")[0], o = 0; o < t.datetimeAccessFormPaths.length; o++) {
                    var i = t.datetimeAccessFormPaths[o];
                    if ("string" == typeof i) {
                      if (i === s) return u(e)
                    } else if (i instanceof RegExp) {
                      if (i.test(s)) return u(e)
                    } else if ("function" == typeof i && i(s)) return u(e)
                  }
                  return e
                }
                function d(e) {
                  for (var n = {},
                    r = e.childNodes,
                    o = 0; o < r.length; o++) {
                    var i = r.item(o);
                    if (i.nodeType === _.ELEMENT_NODE) {
                      var a = s(i);
                      t.ignoreRoot ? n = f(i, a) : n[a] = f(i, a)
                    }
                  }
                  return n
                }
                function m(e, n) {
                  var r = {};
                  r.__cnt = 0;
                  for (var i = e.childNodes,
                    u = 0; u < i.length; u++) {
                    var d = i.item(u),
                      m = s(d);
                    d.nodeType !== _.COMMENT_NODE && (r.__cnt++ , null == r[m] ? (r[m] = f(d, n + "." + m), c(r, m, n + "." + m)) : (r[m] instanceof Array || (r[m] = [r[m]], c(r, m, n + "." + m)), r[m][r[m].length] = f(d, n + "." + m)))
                  }
                  for (var p = 0; p < e.attributes.length; p++) {
                    var g = e.attributes.item(p);
                    r.__cnt++;
                    for (var y = g.value,
                      h = 0; h < t.attributeConverters.length; h++) {
                      var v = t.attributeConverters[h];
                      v.test.call(null, g.name, g.value) && (y = v.convert.call(null, g.name, g.value))
                    }
                    r[t.attributePrefix + g.name] = y
                  }
                  var b = o(e);
                  return b && (r.__cnt++ , r.__prefix = b),
                    r["#text"] && (r.__text = r["#text"], r.__text instanceof Array && (r.__text = r.__text.join("\n")), t.escapeMode && (r.__text = a(r.__text)), t.stripWhitespaces && (r.__text = r.__text.trim()), delete r["#text"], "property" === t.arrayAccessForm && delete r["#text_asArray"], r.__text = l(r.__text, "#text", n + ".#text")),
                    r.hasOwnProperty("#cdata-section") && (r.__cdata = r["#cdata-section"], delete r["#cdata-section"], "property" === t.arrayAccessForm && delete r["#cdata-section_asArray"]),
                    1 === r.__cnt && r.__text ? r = r.__text : 0 === r.__cnt && "text" === t.emptyNodeForm ? r = "" : r.__cnt > 1 && void 0 !== r.__text && t.skipEmptyTextNodesForObj && (t.stripWhitespaces && "" === r.__text || "" === r.__text.trim()) && delete r.__text,
                    delete r.__cnt,
                    t.keepCData || r.hasOwnProperty("__text") || !r.hasOwnProperty("__cdata") ? (t.enableToStringFunc && (r.__text || r.__cdata) && (r.toString = function () {
                      return (this.__text ? this.__text : "") + (this.__cdata ? this.__cdata : "")
                    }), r) : r.__cdata ? r.__cdata : ""
                }
                function f(e, t) {
                  return e.nodeType === _.DOCUMENT_NODE ? d(e) : e.nodeType === _.ELEMENT_NODE ? m(e, t) : e.nodeType === _.TEXT_NODE || e.nodeType === _.CDATA_SECTION_NODE ? e.nodeValue : null
                }
                function p(e, n, r, s) {
                  var o = "<" + (e && e.__prefix ? e.__prefix + ":" : "") + n;
                  if (r) for (var a = 0; a < r.length; a++) {
                    var c = r[a],
                      u = e[c];
                    t.escapeMode && (u = i(u)),
                      o += " " + c.substr(t.attributePrefix.length) + "=",
                      o += t.useDoubleQuotes ? '"' + u + '"' : "'" + u + "'"
                  }
                  return o += s ? " />" : ">"
                }
                function g(e, t) {
                  return "</" + (e && e.__prefix ? e.__prefix + ":" : "") + t + ">"
                }
                function y(e, t) {
                  return e.indexOf(t, e.length - t.length) !== -1
                }
                function h(e, n) {
                  return !!("property" === t.arrayAccessForm && y(n.toString(), "_asArray") || 0 === n.toString().indexOf(t.attributePrefix) || 0 === n.toString().indexOf("__") || e[n] instanceof Function)
                }
                function v(e) {
                  var t = 0;
                  if (e instanceof Object) for (var n in e) h(e, n) || t++;
                  return t
                }
                function b(e) {
                  var n = [];
                  if (e instanceof Object) for (var r in e) r.toString().indexOf("__") === -1 && 0 === r.toString().indexOf(t.attributePrefix) && n.push(r);
                  return n
                }
                function M(e) {
                  var n = "";
                  return e.__cdata && (n += "<![CDATA[" + e.__cdata + "]]>"),
                    e.__text && (n += t.escapeMode ? i(e.__text) : e.__text),
                    n
                }
                function T(e) {
                  var n = "";
                  return e instanceof Object ? n += M(e) : null !== e && (n += t.escapeMode ? i(e) : e),
                    n
                }
                function S(e, t, n) {
                  var r = "";
                  if (0 === e.length) r += p(e, t, n, !0);
                  else for (var s = 0; s < e.length; s++) r += k(e[s], t, b(e[s]));
                  return r
                }
                function k(e, n, r) {
                  var s = "";
                  if (void 0 !== e && null !== e && "" !== e || !t.selfClosingElements) if ("object" == typeof e) if ("[object Array]" === Object.prototype.toString.call(e)) s += S(e, n, r);
                  else if (e instanceof Date) s += p(e, n, r, !1),
                    s += e.toISOString(),
                    s += g(e, n);
                  else {
                    var o = v(e);
                    o > 0 || e.__text || e.__cdata ? (s += p(e, n, r, !1), s += w(e), s += g(e, n)) : t.selfClosingElements ? s += p(e, n, r, !0) : (s += p(e, n, r, !1), s += g(e, n))
                  } else s += p(e, n, r, !1),
                    s += T(e),
                    s += g(e, n);
                  else s += p(e, n, r, !0);
                  return s
                }
                function w(e) {
                  var t = "",
                    n = v(e);
                  if (n > 0) for (var r in e) if (!h(e, r)) {
                    var s = e[r],
                      o = b(s);
                    t += k(s, r, o)
                  }
                  return t += T(e)
                }
                function C(t) {
                  if (void 0 === t) return null;
                  if ("string" != typeof t) return null;
                  var n = null,
                    r = null;
                  if (e) n = new e,
                    r = n.parseFromString(t, "text/xml");
                  else if (window && window.DOMParser) {
                    n = new window.DOMParser;
                    var s = null,
                      o = window.ActiveXObject || "ActiveXObject" in window;
                    if (!o) try {
                      s = n.parseFromString("INVALID", "text/xml").childNodes[0].namespaceURI
                    } catch (i) {
                      s = null
                    }
                    try {
                      r = n.parseFromString(t, "text/xml"),
                        null !== s && r.getElementsByTagNameNS(s, "parsererror").length > 0 && (r = null)
                    } catch (i) {
                      r = null
                    }
                  } else 0 === t.indexOf("<?") && (t = t.substr(t.indexOf("?>") + 2)),
                    r = new ActiveXObject("Microsoft.XMLDOM"),
                    r.async = "false",
                    r.loadXML(t);
                  return r
                }
                var O = "3.1.1";
                t = t || {},
                  n(),
                  r();
                var _ = {
                  ELEMENT_NODE: 1,
                  TEXT_NODE: 3,
                  CDATA_SECTION_NODE: 4,
                  COMMENT_NODE: 8,
                  DOCUMENT_NODE: 9
                };
                this.asArray = function (e) {
                  return void 0 === e || null === e ? [] : e instanceof Array ? e : [e]
                },
                  this.toXmlDateTime = function (e) {
                    return e instanceof Date ? e.toISOString() : "number" == typeof e ? new Date(e).toISOString() : null
                  },
                  this.asDateTime = function (e) {
                    return "string" == typeof e ? u(e) : e
                  },
                  this.xml2dom = function (e) {
                    return C(e)
                  },
                  this.dom2js = function (e) {
                    return f(e, null)
                  },
                  this.js2dom = function (e) {
                    var t = this.js2xml(e);
                    return C(t)
                  },
                  this.xml2js = function (e) {
                    var t = C(e);
                    return null != t ? this.dom2js(t) : null
                  },
                  this.js2xml = function (e) {
                    return w(e)
                  },
                  this.getVersion = function () {
                    return O
                  }
              }
            })
      },
      function (e, t, n) {
        "use strict";
        function r(e, t) {
          for (var n = 0; n < e.length; n++) t(e[n])
        }
        function s(e) {
          for (var t in e) if (e.hasOwnProperty(t)) return !1;
          return !0
        }
        function o(e, t, n) {
          var r = e;
          return d(t) ? (n = t, "string" == typeof e && (r = {
            uri: e
          })) : r = f(t, {
            uri: e
          }),
            r.callback = n,
            r
        }
        function i(e, t, n) {
          return t = o(e, t, n),
            a(t)
        }
        function a(e) {
          function t() {
            4 === l.readyState && setTimeout(o, 0)
          }
          function n() {
            var e = void 0;
            if (e = l.response ? l.response : l.responseText || c(l), M) try {
              e = JSON.parse(e)
            } catch (t) { }
            return e
          }
          function r(e) {
            return clearTimeout(p),
              e instanceof Error || (e = new Error("" + (e || "Unknown XMLHttpRequest Error"))),
              e.statusCode = 0,
              u(e, T)
          }
          function o() {
            if (!f) {
              var t;
              clearTimeout(p),
                t = e.useXDR && void 0 === l.status ? 200 : 1223 === l.status ? 204 : l.status;
              var r = T,
                s = null;
              return 0 !== t ? (r = {
                body: n(),
                statusCode: t,
                method: y,
                headers: {},
                url: g,
                rawRequest: l
              },
                l.getAllResponseHeaders && (r.headers = m(l.getAllResponseHeaders()))) : s = new Error("Internal XMLHttpRequest Error"),
                u(s, r, r.body)
            }
          }
          if ("undefined" == typeof e.callback) throw new Error("callback argument missing");
          var a = !1,
            u = function (t, n, r) {
              a || (a = !0, e.callback(t, n, r))
            },
            l = e.xhr || null;
          l || (l = e.cors || e.useXDR ? new i.XDomainRequest : new i.XMLHttpRequest);
          var d, f, p, g = l.url = e.uri || e.url,
            y = l.method = e.method || "GET",
            h = e.body || e.data,
            v = l.headers = e.headers || {},
            b = !!e.sync,
            M = !1,
            T = {
              body: void 0,
              headers: {},
              statusCode: 0,
              method: y,
              url: g,
              rawRequest: l
            };
          if ("json" in e && e.json !== !1 && (M = !0, v.accept || v.Accept || (v.Accept = "application/json"), "GET" !== y && "HEAD" !== y && (v["content-type"] || v["Content-Type"] || (v["Content-Type"] = "application/json"), h = JSON.stringify(e.json === !0 ? h : e.json))), l.onreadystatechange = t, l.onload = o, l.onerror = r, l.onprogress = function () { },
            l.onabort = function () {
              f = !0
            },
            l.ontimeout = r, l.open(y, g, !b, e.username, e.password), b || (l.withCredentials = !!e.withCredentials), !b && e.timeout > 0 && (p = setTimeout(function () {
              if (!f) {
                f = !0,
                  l.abort("timeout");
                var e = new Error("XMLHttpRequest timeout");
                e.code = "ETIMEDOUT",
                  r(e)
              }
            },
              e.timeout)), l.setRequestHeader) for (d in v) v.hasOwnProperty(d) && l.setRequestHeader(d, v[d]);
          else if (e.headers && !s(e.headers)) throw new Error("Headers cannot be set on an XDomainRequest object");
          return "responseType" in e && (l.responseType = e.responseType),
            "beforeSend" in e && "function" == typeof e.beforeSend && e.beforeSend(l),
            l.send(h || null),
            l
        }
        function c(e) {
          try {
            if ("document" === e.responseType) return e.responseXML;
            var t = e.responseXML && "parsererror" === e.responseXML.documentElement.nodeName;
            if ("" === e.responseType && !t) return e.responseXML
          } catch (n) { }
          return null
        }
        function u() { }
        var l = n(171),
          d = n(85),
          m = n(172),
          f = n(178);
        e.exports = i,
          i.XMLHttpRequest = l.XMLHttpRequest || u,
          i.XDomainRequest = "withCredentials" in new i.XMLHttpRequest ? i.XMLHttpRequest : l.XDomainRequest,
          r(["get", "put", "post", "patch", "head", "delete"],
            function (e) {
              i["delete" === e ? "del" : e] = function (t, n, r) {
                return n = o(t, n, r),
                  n.method = e.toUpperCase(),
                  a(n)
              }
            })
      },
      function (e, t) {
        function n() {
          for (var e = {},
            t = 0; t < arguments.length; t++) {
            var n = arguments[t];
            for (var s in n) r.call(n, s) && (e[s] = n[s])
          }
          return e
        }
        e.exports = n;
        var r = Object.prototype.hasOwnProperty
      },
      function (e, t) { },
        ,
      function (e, t, n) {
        "use strict";
        var r = n(7),
          s = n(90);
        s(r),
          e.exports = r
      },
        , , ,
      function (e, t, n) {
        "use strict";
        var r = n(7).fn,
          s = n(1);
        r.audioToText = function (e) {
          s.verifyOptions(e, "url", "audio::audioToText"),
            e.audioToText = s.filterObj(e, "url");
          var t = this;
          t.processCallback(e),
            t.sendCmd("audioToText", e)
        }
      },
      function (e, t, n) {
        "use strict";
        var r = n(7).fn,
          s = n(1);
        r.getChatroomAddress = function (e) {
          s.verifyOptions(e, "chatroomId", "chatroom::getChatroomAddress");
          var t = this;
          t.processCallback(e),
            t.sendCmd("getChatroomAddress", e)
        }
      },
      function (e, t, n) {
        "use strict";
        var r = n(7).fn,
          s = n(1);
        r.kick = function (e) {
          s.verifyOptions(e, "deviceIds", "link::kick"),
            this.processCallback(e),
            this.sendCmd("kick", {
              deviceIds: e.deviceIds.slice(0)
            },
              e.callback)
        }
      },
      function (e, t, n) {
        "use strict";
        var r = n(7).fn;
        r.clearDB = function (e) {
          var t = this,
            n = t.db;
          t.processCallback(e);
          var r = e.done;
          n.enable ? n.clear().then(r, r) : r()
        },
          r.removeDB = function (e) {
            var t = this,
              n = t.db;
            t.processCallback(e);
            var r = e.done;
            n.enable ? n.destroy().then(r, r) : r()
          }
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          return e && e.__esModule ? e : {
            "default": e
          }
        }
        function s(e) {
          return "object" === ("undefined" == typeof e ? "undefined" : (0, i["default"])(e)) && (e.msgEventSubscribes ? e = e.msgEventSubscribes : e.msgEventSubscribe ? e = e.msgEventSubscribe : e.accounts ? e = e.accounts : e.msgEvent && (e = e.msgEvent, e.time && (e.time = +e.time)), 1 === e.sync ? e.sync = !0 : 0 === e.sync && (e.sync = !1)),
            e
        }
        var o = n(6),
          i = r(o),
          a = n(2).Promise,
          c = n(7).fn,
          u = n(1),
          l = n(233),
          d = n(234);
        c.batchSendEventsCmds = function (e, t, n) {
          var r = this,
            o = 100,
            i = u.dropArrayDuplicates(t.accounts);
          i = u.reshape2d(i, o);
          var c = [];
          i.forEach(function (n) {
            c.push(new a(function (o, i) {
              var a = u.simpleClone(t);
              a.accounts = n,
                r.sendCmdWithResp(e, a,
                  function (e, t) {
                    e ? i(e) : o(s(t))
                  })
            }))
          }),
            a.all(c).then(function (e) {
              var t = null;
              if (e.length > 0) if (e[0].msgEventSubscribe) {
                var r = e[0].msgEventSubscribe;
                r = s(r);
                var o = [];
                e.forEach(function (e) {
                  o = o.concat(e.accounts)
                }),
                  t = {
                    accounts: o,
                    msgEventSubscribe: r
                  }
              } else t = [],
                e.forEach(function (e) {
                  t = t.concat(e)
                });
              n(null, t)
            },
              function (e) {
                n(e, null)
              })
        },
          c.publishEvent = function (e) {
            var t = this,
              n = new l(e);
            n = n.assembleEvent(),
              t.processCallback(e),
              this.sendCmdWithResp("publishEvent", {
                msgEvent: n
              },
                function (t, n) {
                  t || (n = s(n)),
                    e.callback(t, n)
                })
          },
          c.subscribeEvent = function (e) {
            var t = this;
            u.verifyOptions(e, "accounts", "event::subscribeEvent");
            var n = new d(e);
            u.verifyParamType("accounts", e.accounts, "array", "event::subscribeEvent"),
              t.processCallback(e),
              n = n.assembleEvent(),
              this.batchSendEventsCmds("subscribeEvent", {
                msgEventSubscribe: n,
                accounts: e.accounts
              },
                function (t, n) {
                !t && n && (n = {
                  failedAccounts: n
                }),
                  e.callback(t, n)
                })
          },
          c.unSubscribeEventsByAccounts = function (e) {
            var t = this;
            u.verifyOptions(e, "accounts", "event::unSubscribeEventsByAccounts"),
              u.verifyParamType("accounts", e.accounts, "array", "event::unSubscribeEventsByAccounts");
            var n = new d(e);
            n = n.assembleEvent(),
              t.processCallback(e),
              this.batchSendEventsCmds("unSubscribeEventsByAccounts", {
                msgEventSubscribe: n,
                accounts: e.accounts
              },
                function (t, n) {
                !t && n && (n = {
                  failedAccounts: n
                }),
                  e.callback(t, n)
                })
          },
          c.unSubscribeEventsByType = function (e) {
            var t = this,
              n = new d(e);
            n = n.assembleEvent(),
              t.processCallback(e),
              this.sendCmdWithResp("unSubscribeEventsByType", {
                msgEventSubscribe: n
              },
                function (t, n) {
                  e.callback(t)
                })
          },
          c.querySubscribeEventsByAccounts = function (e) {
            var t = this;
            u.verifyOptions(e, "accounts", "event::querySubscribeEventsByAccounts"),
              u.verifyParamType("accounts", e.accounts, "array", "event::querySubscribeEventsByAccounts");
            var n = new d(e);
            n = n.assembleEvent(),
              t.processCallback(e),
              this.batchSendEventsCmds("querySubscribeEventsByAccounts", {
                msgEventSubscribe: n,
                accounts: e.accounts
              },
                function (t, n) {
                !t && n && (n = {
                  msgEventSubscribes: n
                }),
                  e.callback(t, n)
                })
          },
          c.querySubscribeEventsByType = function (e) {
            var t = this,
              n = new d(e);
            n = n.assembleEvent(),
              t.processCallback(e),
              this.sendCmdWithResp("querySubscribeEventsByType", {
                msgEventSubscribe: n
              },
                function (t, n) {
                  t || (n = {
                    msgEventSubscribes: s(n)
                  }),
                    e.callback(t, n)
                })
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(7).fn,
          s = n(1),
          o = s.notundef,
          i = n(107);
        r.friendRequest = function (e) {
          s.verifyOptions(e, "type account", "friend::friendRequest"),
            s.verifyParamValid("type", e.type, i.validTypes(), "friend::friendRequest"),
            this.processPs(e),
            this.processCallback(e);
          var t = {
            account: e.account,
            type: i.getByteFromType(e.type),
            ps: e.ps
          };
          o(e.idServer) && (t.idServer = e.idServer),
            this.sendCmd("friendRequest", t, e.callback)
        },
          r.addFriend = function (e) {
            e.type = "addFriend",
              this.friendRequest(e)
          },
          r.applyFriend = function (e) {
            e.type = "applyFriend",
              this.friendRequest(e)
          },
          r.passFriendApply = function (e) {
            s.verifyOptions(e, "idServer", "friend::passFriendApply"),
              e.type = "passFriendApply",
              this.friendRequest(e)
          },
          r.rejectFriendApply = function (e) {
            s.verifyOptions(e, "idServer", "friend::rejectFriendApply"),
              e.type = "rejectFriendApply",
              this.friendRequest(e)
          },
          r.deleteFriend = function (e) {
            s.verifyOptions(e, "account", "friend::deleteFriend"),
              this.processCallback(e),
              this.sendCmd("deleteFriend", {
                account: e.account
              },
                e.callback)
          },
          r.updateFriend = function (e) {
            this.processCallback(e);
            var t = new i(e);
            this.sendCmd("updateFriend", {
              friend: t,
              single: !0
            },
              e.callback)
          },
          r.getFriends = function (e) {
            function t() {
              n.sendCmd("getFriends", {
                timetag: o,
                NOTSTORE: "timetag"
              },
                e.callback)
            }
            var n = this,
              r = n.db,
              o = 0;
            s.verifyOptions(e),
              n.processCallback(e),
              r.enable ? r.getFriendsTimetag().then(function (e) {
                o = e,
                  t()
              },
                t) : t()
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(7).fn,
          s = n(1),
          o = s.isArray,
          i = n(33);
        r.mergeObjArray = function (e, t, n) {
          return e || (e = []),
            t ? (o(t) || (t = [t]), t.length ? (n = n || {},
              s.mergeObjArray(e, t, n)) : e) : e
        },
          r.cutObjArray = function (e, t, n) {
            return e && t ? (o(t) || (t = [t]), t.length ? (n = n || {},
              s.cutObjArray(e, t, n)) : e) : e
          },
          r.mergeLoginPorts = function (e, t) {
            return this.mergeObjArray(e, t, {
              keyPath: "deviceId"
            })
          },
          r.cutLoginPorts = function (e, t) {
            return this.cutObjArray(e, t, {
              keyPath: "deviceId",
              sortPath: "type"
            })
          },
          r.mergeRelations = function (e, t) {
            return this.mergeObjArray(e, t, {
              keyPath: "account"
            })
          },
          r.cutRelations = function (e, t) {
            return this.cutObjArray(e, t, {
              keyPath: "account"
            })
          },
          r.findRelation = function (e, t) {
            return s.findObjInArray(e, {
              keyPath: "account",
              value: t
            })
          },
          r.mergeFriends = function (e, t) {
            return this.mergeObjArray(e, t, {
              keyPath: "account"
            })
          },
          r.cutFriends = function (e, t) {
            return this.cutObjArray(e, t, {
              keyPath: "account"
            })
          },
          r.cutFriendsByAccounts = function (e, t) {
            o(t) || (t = [t]);
            var n = t.map(function (e) {
              return {
                account: e
              }
            });
            return this.cutFriends(e, n)
          },
          r.findFriend = function (e, t) {
            return s.findObjInArray(e, {
              keyPath: "account",
              value: t
            })
          },
          r.mergeUsers = function (e, t) {
            return this.mergeObjArray(e, t, {
              keyPath: "account"
            })
          },
          r.findUser = function (e, t) {
            return s.findObjInArray(e, {
              keyPath: "account",
              value: t
            })
          },
          r.mergeTeams = function (e, t) {
            return this.mergeObjArray(e, t, {
              keyPath: "teamId"
            })
          },
          r.cutTeams = function (e, t) {
            return this.cutObjArray(e, t, {
              keyPath: "teamId"
            })
          },
          r.findTeam = function (e, t) {
            return s.findObjInArray(e, {
              keyPath: "teamId",
              value: t
            })
          },
          r.assembleTeamOwner = i.assembleOwner,
          r.assembleTeamMembers = i.assembleMembers,
          r.genTeamMemberId = i.genId,
          r.mergeTeamMembers = function (e, t) {
            return this.mergeObjArray(e, t)
          },
          r.cutTeamMembers = function (e, t) {
            return this.cutObjArray(e, t)
          },
          r.cutTeamMembersByAccounts = function (e, t, n) {
            o(n) || (n = [n]);
            var r = i.assembleMembers({
              teamId: t
            },
              n);
            return this.cutTeamMembers(e, r)
          },
          r.findTeamMember = function (e, t) {
            return s.findObjInArray(e, {
              keyPath: "id",
              value: t
            })
          },
          r.mergeSessions = function (e, t) {
            return this.mergeObjArray(e, t, {
              sortPath: "updateTime",
              desc: !0
            })
          },
          r.cutSessions = function (e, t) {
            return this.cutObjArray(e, t)
          },
          r.cutSessionsByIds = function (e, t) {
            o(t) || (t = [t]);
            var n = t.map(function (e) {
              return {
                id: e
              }
            });
            return this.cutSessions(e, n)
          },
          r.findSession = function (e, t) {
            return s.findObjInArray(e, {
              keyPath: "id",
              value: t
            })
          },
          r.mergeMsgs = function (e, t) {
            return this.mergeObjArray(e, t, {
              keyPath: "idClient",
              sortPath: "time"
            })
          },
          r.cutMsgs = function (e, t) {
            return this.cutObjArray(e, t, {
              keyPath: "idClient"
            })
          },
          r.cutMsgsByIdClients = function (e, t) {
            o(t) || (t = [t]);
            var n = t.map(function (e) {
              return {
                idClient: e
              }
            });
            return this.cutMsgs(e, n)
          },
          r.findMsg = function (e, t) {
            return s.findObjInArray(e, {
              keyPath: "idClient",
              value: t
            })
          },
          r.mergeSysMsgs = function (e, t) {
            return this.mergeObjArray(e, t, {
              keyPath: "idServer",
              desc: !0
            })
          },
          r.cutSysMsgs = function (e, t) {
            return this.cutObjArray(e, t, {
              keyPath: "idServer"
            })
          },
          r.cutSysMsgsByIdServers = function (e, t) {
            o(t) || (t = [t]);
            var n = t.map(function (e) {
              return {
                idServer: e
              }
            });
            return this.cutSysMsgs(e, n)
          },
          r.findSysMsg = function (e, t) {
            return s.findObjInArray(e, {
              keyPath: "idServer",
              value: t
            })
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(7).fn,
          s = n(1),
          o = s.undef,
          i = s.notundef,
          a = n(21),
          c = n(37),
          u = n(38),
          l = n(5);
        r.beforeSendMsg = function (e) {
          var t = this,
            n = t.protocol,
            r = e.msg;
          r.to === t.account && (r.fromDeviceId = a.deviceId),
            r.userUpdateTime = n.myInfo && n.myInfo.updateTime;
          var s;
          switch (r.getScene()) {
            case "p2p":
              s = "sendMsg";
              break;
            case "team":
              s = "sendTeamMsg"
          }
          e.filter && (s = "sendFilterMsg", r.filter = !0),
            e.cmd = s
        },
          r.afterSendMsg = function (e) {
            var t = e.rtnMsg,
              n = c.genSessionByMsg(t);
            this.protocol.onUpdateSession(n)
          },
          r.beforeForwardMsg = function (e) {
            s.verifyOptions(e, "msg scene to", "msg::beforeForwardMsg"),
              e.msg.scene = e.scene,
              e.msg.to = e.to
          },
          r.markMsgRead = function (e) {
            var t = this,
              n = t.protocol;
            return !e || t.db.enable || n.options.autoMarkRead ? void t.logger.warn("api::markMsgRead: 不需要标记消息为已收到 (没有消息, 或者启用了数据库, 或者启用了自动标记已收到)") : void n.markMsgRead(e, !0)
          },
          r.sendMsgReceipt = function (e) {
            var t = this;
            if (s.verifyOptions(e), t.processCallback(e), !e.msg) return void e.done();
            var n = "target idClient time";
            s.verifyOptions(e, "msg", "msg::sendMsgReceipt");
            var r = e.msg;
            s.verifyOptions(r, n, !0, "msg.", "msg::sendMsgReceipt"),
              t.protocol.shouldSendMsgReceipt(r) ? t.sendCmd("sendMsgReceipt", {
                msgReceipt: {
                  to: r.target,
                  idClient: r.idClient,
                  time: r.time
                }
              },
                e.callback) : e.done()
          },
          r.isMsgRemoteRead = function (e) {
            return this.protocol.isMsgRemoteRead(e)
          },
          r.deleteMsg = function (e) {
            var t = this;
            s.verifyOptions(e, "msg", "msg::deleteMsg");
            var n = e.msg;
            if ("team" !== n.scene && "out" !== n.flow || "success" !== n.status || n.from === n.to || n.isLocal) return e.done(l.newParamError("只能删除自己发送给别人的, 并且发送成功的非本地消息", {
              callFunc: "msg::deleteMsg"
            }), e);
            s.verifyOptions(n, ["scene", "to", "from", "time", "idClient", "idServer"], !0, "msg.", "msg::deleteMsg"),
              s.verifyParamValid("msg.scene", n.scene, t.message.validScenes, "msg::deleteMsg");
            var r = s.simpleClone(n);
            this.processPs(r),
              this.processCallback(e),
              i(e.opeAccount) ? r.opeAccount = e.opeAccount : o(r.opeAccount) && (r.opeAccount = r.from),
              "p2p" === r.scene ? r.type = "deleteMsgP2p" : r.type = "deleteMsgTeam",
              r.deletedIdClient = r.idClient,
              r.deletedIdServer = r.idServer,
              r = new u(r),
              t.sendCmd("deleteMsg", {
                sysMsg: r,
                msg: n
              },
                e.callback)
          },
          r.getHistoryMsgs = function (e) {
            var t = this;
            s.verifyOptions(e, "scene to", "msg::getHistoryMsgs"),
              s.verifyParamValid("scene", e.scene, t.message.validScenes, "msg::getHistoryMsgs"),
              "undefined" == typeof e.beginTime && (e.beginTime = 0),
              s.verifyParamType("beginTime", e.beginTime, "number", "msg::getHistoryMsgs"),
              "undefined" == typeof e.endTime && (e.endTime = 0),
              s.verifyParamType("endTime", e.endTime, "number", "msg::getHistoryMsgs"),
              "undefined" != typeof e.lastMsgId && null !== e.lastMsgId || (e.lastMsgId = "0"),
              "undefined" == typeof e.limit && (e.limit = 100),
              s.verifyParamType("limit", e.limit, "number", "msg::getHistoryMsgs"),
              s.verifyParamMax("limit", e.limit, 100, "msg::getHistoryMsgs"),
              i(e.reverse) ? s.verifyParamType("reverse", e.reverse, "boolean", "msg::getHistoryMsgs") : e.reverse = !1,
              i(e.asc) ? s.verifyParamType("asc", e.asc, "boolean", "msg::getHistoryMsgs") : e.asc = !1,
              t.processCallback(e),
              e.asc && (e.cbaop = function (e, t) {
                e || (t.msgs = t.msgs.reverse())
              });
            var n;
            switch (e.scene) {
              case "p2p":
                n = "getHistoryMsgs";
                break;
              case "team":
                n = "getTeamHistoryMsgs"
            }
            var r = {
              scene: e.scene,
              to: e.to,
              beginTime: e.beginTime,
              endTime: e.endTime,
              lastMsgId: e.lastMsgId,
              limit: e.limit,
              reverse: e.reverse
            };
            t.sendCmd(n, r, e.callback)
          },
          r.searchHistoryMsgs = function (e) {
            var t = this;
            s.verifyOptions(e, "scene to keyword", "msg::searchHistoryMsgs"),
              s.verifyParamValid("scene", e.scene, t.message.validScenes, "msg::searchHistoryMsgs"),
              "undefined" == typeof e.beginTime && (e.beginTime = 0),
              s.verifyParamType("beginTime", e.beginTime, "number", "msg::searchHistoryMsgs"),
              "undefined" == typeof e.endTime && (e.endTime = 0),
              s.verifyParamType("endTime", e.endTime, "number", "msg::searchHistoryMsgs"),
              "undefined" == typeof e.limit && (e.limit = 100),
              s.verifyParamType("limit", e.limit, "number", "msg::searchHistoryMsgs"),
              s.verifyParamMax("limit", e.limit, 100, "msg::searchHistoryMsgs"),
              i(e.reverse) ? s.verifyParamType("reverse", e.reverse, "boolean", "msg::searchHistoryMsgs") : e.reverse = !1,
              i(e.asc) ? s.verifyParamType("asc", e.asc, "boolean", "msg::searchHistoryMsgs") : e.asc = !1,
              t.processCallback(e),
              e.asc && (e.cbaop = function (e, t) {
                e || (t.msgs = t.msgs.reverse())
              });
            var n;
            switch (e.scene) {
              case "p2p":
                n = "searchHistoryMsgs";
                break;
              case "team":
                n = "searchTeamHistoryMsgs"
            }
            var r = s.filterObj(e, "scene to beginTime endTime keyword limit reverse");
            t.sendCmd(n, r, e.callback)
          },
          r.getLocalMsgs = function (e) {
            function t() {
              e.msgs = c,
                e.done(n, e)
            }
            var n, r = this,
              a = r.db,
              c = [];
            s.verifyOptions(e);
            var u = !1;
            i(e.start) && (u = !0, s.verifyParamType("start", e.start, "number", "msg::getLocalMsgs"));
            var l = !1;
            i(e.end) && (l = !0, s.verifyParamType("end", e.end, "number", "msg::getLocalMsgs")),
              u && l && e.end <= e.start && s.onParamError("参数 end 必须晚于 start"),
              o(e.limit) && (e.limit = 100),
              s.verifyParamType("limit", e.limit, "number", "msg::getLocalMsgs"),
              s.verifyParamMin("limit", e.limit, 1, "msg::getLocalMsgs"),
              r.processCallback(e),
              a.enable ? a.getMsgs(e).then(function (e) {
                c = e,
                  t()
              },
                function (e) {
                  n = e,
                    t()
                }) : t()
          },
          r.getLocalMsgByIdClient = function (e) {
            function t() {
              e.msg = i,
                e.done(n, e)
            }
            var n, r = this,
              o = r.db,
              i = null;
            s.verifyOptions(e, "idClient", "msg::getLocalMsgByIdClient"),
              r.processCallback(e),
              o.enable ? o.getMsgByIdClient(e.idClient).then(function (e) {
                e && (i = e),
                  t()
              },
                function (e) {
                  n = e,
                    t()
                }) : t()
          },
          r.getLocalMsgsByIdClients = function (e) {
            function t() {
              e.msgs = i,
                e.done(n, e)
            }
            var n, r = this,
              o = r.db,
              i = [];
            s.verifyOptions(e, "idClients", "msg::getLocalMsgByIdClient"),
              s.verifyParamType("idClients", e.idClients, "array", "msg::getLocalMsgByIdClient"),
              r.processCallback(e),
              o.enable ? o.getMsgsByIdClients(e.idClients).then(function (e) {
                i = e.filter(function (e) {
                  return !!e
                }),
                  t()
              },
                function (e) {
                  n = e,
                    t()
                }) : t()
          },
          r.updateLocalMsg = function (e) {
            function t() {
              e.msg = i,
                e.done(n, e)
            }
            var n, r = this,
              o = r.db,
              i = null;
            if (s.verifyOptions(e, "idClient", "msg::updateLocalMsg"), r.processCallback(e), o.enable) {
              var a = s.filterObj(e, "idClient localCustom");
              o.updateMsg(a).then(function (e) {
                i = e,
                  t()
              },
                function (e) {
                  n = e,
                    t()
                })
            } else t()
          },
          r.deleteLocalMsg = function (e) {
            function t() {
              e.done(n, e)
            }
            var n, r = this;
            s.verifyOptions(e, "msg", "msg::deleteLocalMsg");
            var o = e.msg;
            s.verifyOptions(o, "idClient sessionId", !0, "msg.", "msg::deleteLocalMsg"),
              r.processCallback(e),
              r.protocol.deleteLocalMsg(o).then(t,
                function (e) {
                  n = e,
                    t()
                })
          },
          r.deleteLocalMsgsBySession = function (e) {
            function t() {
              e.done(n, e)
            }
            var n, r = this,
              o = r.db;
            s.verifyOptions(e, "scene to", "msg::deleteLocalMsgsBySession"),
              s.verifyParamValid("scene", e.scene, r.message.validScenes, "msg::deleteLocalMsgsBySession"),
              e.sessionId = e.scene + "-" + e.to,
              r.processCallback(e),
              o.enable ? o.deleteMsgsBySessionId(e.sessionId).then(function () {
                t()
              },
                function (e) {
                  n = e,
                    t()
                }) : t()
          },
          r.deleteAllLocalMsgs = function (e) {
            function t() {
              e.done(n, e)
            }
            var n, r = this,
              s = r.db;
            r.processCallback(e),
              s.enable && s.deleteAllMsgs().then(function () {
                t()
              },
                function (e) {
                  n = e,
                    t()
                })
          }
      },
      function (e, t) {
        "use strict"
      },
      function (e, t) {
        "use strict"
      },
      function (e, t, n) {
        "use strict";
        var r = n(7).fn,
          s = n(92),
          o = n(1),
          i = o.undef;
        r.getPushNotificationMultiportConfig = function () {
          return this.protocol.getPushNotificationMultiportConfig()
        },
          r.updatePushNotificationMultiportConfig = function (e) {
            o.verifyOptions(e),
              i(e.shouldPushNotificationWhenPCOnline) && (e.shouldPushNotificationWhenPCOnline = !0),
              e.donnop = new s(e),
              this.processCallback(e),
              this.sendCmd("updateDonnop", e)
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(7).fn,
          s = n(1);
        r.markInBlacklist = function (e) {
          s.verifyOptions(e, "account isAdd", "relation::markInBlacklist"),
            s.verifyParamType("isAdd", e.isAdd, "boolean", "relation::markInBlacklist"),
            this.processCallback(e),
            this.sendCmd("markInBlacklist", {
              account: e.account,
              isAdd: e.isAdd
            },
              e.callback)
        },
          r.addToBlacklist = function (e) {
            return e.isAdd = !0,
              this.markInBlacklist(e)
          },
          r.removeFromBlacklist = function (e) {
            return e.isAdd = !1,
              this.markInBlacklist(e)
          },
          r.markInMutelist = function (e) {
            s.verifyOptions(e, "account", "relation::markInMutelist"),
              s.verifyParamType("isAdd", e.isAdd, "boolean", "relation::markInMutelist"),
              this.processCallback(e),
              this.sendCmd("markInMutelist", {
                account: e.account,
                isAdd: e.isAdd
              },
                e.callback)
          },
          r.addToMutelist = function (e) {
            return e.isAdd = !0,
              this.markInMutelist(e)
          },
          r.removeFromMutelist = function (e) {
            return e.isAdd = !1,
              this.markInMutelist(e)
          },
          r.getRelations = function (e) {
            function t() {
              n.sendCmd("getRelations", {
                timetag: o,
                NOTSTORE: "timetag"
              },
                e.callback)
            }
            var n = this,
              r = n.db,
              o = 0;
            e = s.verifyOptions(e),
              n.processCallback(e),
              r.enable ? r.getRelationsTimetag().then(function (e) {
                o = e,
                  t()
              },
                t) : t()
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(7).fn;
        r.getRobots = function (e) {
          e = e || {},
            e.type = "getRobots",
            this.processCallback(e),
            this.sendCmd("sync", {
              sync: {
                robots: 0
              }
            },
              e.callback)
        }
      },
      function (e, t, n) {
        "use strict";
        var r = n(7).fn,
          s = n(1),
          o = s.undef,
          i = s.notundef;
        r.setCurrSession = function (e) {
          var t = this;
          t.resetSessionUnread(e),
            t.protocol.setCurrSession(e)
        },
          r.resetAllSessionUnread = function () {
            var e = this;
            for (var t in e.protocol.sessionSet) e.protocol.sessionSet[t].unread > 0 && e.resetSessionUnread(t)
          },
          r.resetSessionUnread = function (e) {
            var t = this;
            if (t.protocol.resetSessionUnread(e), t.options.syncSessionUnread) {
              var n = t.protocol.findSession(e);
              if (!n) return void t.logger.warn("api::resetSessionUnread: session undefined " + e);
              if (!n.lastMsg) return void t.logger.warn("api::resetSessionUnread: session.lastMsg undefined " + e);
              if (!n.scene || !n.to) return void t.logger.warn("api::resetSessionUnread: session.scene|to undefined " + e);
              var r = n.lastMsg.time;
              if (n && n.ack && n.ack >= r) return void t.logger.warn("api::resetSessionUnread: session ack not needs " + e);
              var s = {
                scene: "p2p" === n.scene ? 0 : 1,
                to: n.to,
                timetag: r
              };
              t.sendCmd("markSessionAck", s)
            }
          },
          r.resetCurrSession = function () {
            this.protocol.setCurrSession("")
          },
          r.insertLocalSession = function (e) {
            function t() {
              e.session = r,
                e.done(n, e)
            }
            var n, r, o = this;
            s.verifyOptions(e, "scene to", "scene::insertLocalSession"),
              s.verifyParamValid("scene", e.scene, o.message.validScenes, "scene::insertLocalSession"),
              o.processCallback(e),
              o.protocol.insertLocalSession(e).then(function (e) {
                r = e,
                  t()
              },
                function (e) {
                  n = e,
                    t()
                })
          },
          r.getLocalSessions = function (e) {
            function t() {
              e.sessions = c,
                e.done(n, e)
            }
            var n, r = this,
              a = r.db,
              c = [];
            s.verifyOptions(e),
              o(e.limit) && (e.limit = 100),
              s.verifyParamType("limit", e.limit, "number", "scene::getLocalSessions"),
              s.verifyParamMax("limit", e.limit, 100, "scene::getLocalSessions"),
              i(e.reverse) ? s.verifyParamType("reverse", e.reverse, "boolean", "scene::getLocalSessions") : e.reverse = !1,
              r.processCallback(e),
              a.enable ? a.getSessions(e).then(function (e) {
                c = e,
                  r.protocol.mergeSessions(c),
                  t()
              },
                function (e) {
                  n = e,
                    t()
                }) : t()
          },
          r.updateLocalSession = function (e) {
            function t() {
              r.protocol.onUpdateSession(i),
                e.session = i,
                e.done(n, e)
            }
            var n, r = this,
              o = r.db;
            s.verifyOptions(e, "id", "scene::updateLocalSession"),
              r.processCallback(e);
            var i = s.filterObj(e, "id localCustom");
            o.enable ? o.updateSession(i).then(function (e) {
              i = e,
                t()
            },
              function (e) {
                n = e,
                  t()
              }) : t()
          },
          r.deleteLocalSession = function (e) {
            function t() {
              e.done(n, e)
            }
            var n, r = this,
              o = r.db;
            s.verifyOptions(e, "id", "session::deleteLocalSession"),
              r.processCallback(e),
              o.enable ? o.deleteSession(e.id).then(function () {
                r.protocol.deleteLocalSession(e.id),
                  t()
              },
                function (e) {
                  n = e,
                    t()
                }) : t()
          },
          r.deleteSession = function (e) {
            s.verifyOptions(e, "scene to", "session::deleteSession"),
              this.processCallback(e),
              e.sessions = [{
                scene: e.scene,
                to: e.to
              }],
              this.deleteSessions(e)
          },
          r.deleteSessions = function (e) {
            s.verifyOptions(e, "sessions", "session::deleteSessions"),
              s.verifyParamType("sessions", e.sessions, "array", "session::deleteSessions"),
              e.sessions.forEach(function (e, t) {
                s.verifyOptions(e, "scene to", !0, "sessions[" + t + "].", "session::deleteSessions")
              }),
              this.processCallback(e),
              this.sendCmd("deleteSessions", {
                sessions: e.sessions.map(function (e) {
                  return e.scene + "|" + e.to
                })
              },
                e.callback)
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(2).Promise,
          s = n(7).fn,
          o = n(1),
          i = o.undef,
          a = o.notundef,
          c = n(38);
        s.markSysMsgRead = function (e) {
          function t() {
            e.done(n, e)
          }
          var n, s = this,
            i = s.db,
            a = r.resolve(),
            c = s.protocol;
          o.verifyOptions(e, "sysMsgs", "sysmsg::markSysMsgRead");
          var u = e.sysMsgs;
          o.isArray(u) || (u = [u]),
            i.enable ? a = i.markSysMsgRead(u).then(function (e) {
              u = e,
                c.onUpdateSysMsg(e)
            }) : (u = u.filter(function (e) {
              return !e.read
            }), u.length && (c.options.autoMarkRead || c.markSysMsgRead(u, !0), u.forEach(function (e) {
              e.read = !0
            }), c.onUpdateSysMsg(u))),
            a.then(function () {
              return c.reduceSysMsgUnread(u)
            }).then(t,
              function (e) {
                n = e,
                  t()
              })
        },
          s.sendCustomSysMsg = function (e) {
            var t = this;
            o.verifyOptions(e, "scene to content", "sysmsg::sendCustomSysMsg"),
              o.verifyParamValid("scene", e.scene, t.message.validScenes, "sysmsg::sendCustomSysMsg"),
              t.processCallback(e),
              "p2p" === e.scene ? e.type = "customP2p" : e.type = "customTeam",
              e.sysMsg = new c(e);
            var n = "sendCustomSysMsg";
            return e.filter && (n = "sendFilterCustomSysMsg"),
              t.sendCmd(n, {
                sysMsg: e.sysMsg,
                single: !0
              },
                e.callback),
              t.formatReturnSysMsg(e.sysMsg)
          },
          s.formatReturnSysMsg = function (e) {
            var t = this;
            return e = o.copy(e),
              t.protocol.completeSysMsg(e),
              e.status = "sending",
              e = c.reverse(e)
          },
          s.getLocalSysMsgs = function (e) {
            function t() {
              e.sysMsgs = u,
                e.done(n, e)
            }
            var n, r = this,
              s = r.db,
              u = [];
            o.verifyOptions(e),
              e.category && o.verifyParamValid("category", e.category, c.validCategories, "sysmsg::getLocalSysMsgs"),
              e.type && o.verifyParamValid("type", e.type, c.validTypes, "sysmsg::getLocalSysMsgs"),
              i(e.limit) && (e.limit = 100),
              o.verifyParamType("limit", e.limit, "number", "sysmsg::getLocalSysMsgs"),
              o.verifyParamMax("limit", e.limit, 100, "sysmsg::getLocalSysMsgs"),
              a(e.reverse) ? o.verifyParamType("reverse", e.reverse, "boolean", "sysmsg::getLocalSysMsgs") : e.reverse = !1,
              r.processCallback(e),
              s.enable ? s.getSysMsgs(e).then(function (e) {
                u = e,
                  t()
              },
                function (e) {
                  n = e,
                    t()
                }) : t()
          },
          s.updateLocalSysMsg = function (e) {
            function t() {
              e.sysMsg = i,
                e.done(n, e)
            }
            var n, r = this,
              s = r.db,
              i = null;
            if (o.verifyOptions(e, "idServer", "sysmsg::updateLocalSysMsg"), r.processCallback(e), s.enable) {
              var a = o.filterObj(e, "idServer state localCustom");
              s.updateSysMsg(a).then(function (e) {
                i = e,
                  t()
              },
                function (e) {
                  n = e,
                    t()
                })
            } else t()
          },
          s.deleteLocalSysMsg = function (e) {
            function t() {
              e.done(n, e)
            }
            var n, r = this,
              s = r.db;
            o.verifyOptions(e, "idServer", "sysmsg::deleteLocalSysMsg"),
              r.processCallback(e),
              s.enable ? s.deleteSysMsg(e.idServer).then(function () {
                t()
              },
                function (e) {
                  n = e,
                    t()
                }) : t()
          },
          s.deleteAllLocalSysMsgs = function (e) {
            function t() {
              r.protocol.onUpdateSysMsgUnread({}),
                e.done(n, e)
            }
            var n, r = this,
              s = r.db;
            r.processCallback(e),
              s.enable && s.deleteAllSysMsgs().then(function () {
                t()
              },
                function (e) {
                  n = e,
                    t()
                })
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(7).fn,
          s = n(1),
          o = s.undef,
          i = n(39),
          a = n(33);
        r.createTeam = function (e) {
          s.verifyOptions(e, "type name", "team::createTeam"),
            o(e.accounts) ? e.accounts = [] : s.verifyParamType("accounts", e.accounts, "array", "team::createTeam"),
            e.action = "create",
            this.processPs(e),
            this.processCallback(e),
            e.team = new i(e);
          var t = {
            team: e.team,
            accounts: e.accounts.slice(0),
            ps: e.ps
          };
          this.sendCmd("createTeam", t, e.callback)
        },
          r.updateTeam = function (e) {
            s.verifyOptions(e, "teamId", "team::updateTeam"),
              e.action = "update",
              this.processCallback(e),
              e.team = new i(e),
              this.sendCmd("updateTeam", {
                team: e.team,
                single: !0
              },
                e.callback)
          },
          r.addTeamMembers = function (e) {
            s.verifyOptions(e, "teamId accounts", "team::addTeamMembers"),
              s.verifyParamType("accounts", e.accounts, "array", "team::addTeamMembers"),
              this.processPs(e),
              this.processCallback(e);
            var t = {
              teamId: e.teamId,
              accounts: e.accounts.slice(0),
              ps: e.ps
            };
            this.sendCmd("addTeamMembers", t, e.callback)
          },
          r.removeTeamMembers = function (e) {
            s.verifyOptions(e, "teamId accounts", "team::removeTeamMembers"),
              s.verifyParamType("accounts", e.accounts, "array", "team::removeTeamMembers"),
              this.processCallback(e);
            var t = {
              teamId: e.teamId,
              accounts: e.accounts.slice(0)
            };
            this.sendCmd("removeTeamMembers", t, e.callback)
          },
          r.acceptTeamInvite = function (e) {
            s.verifyOptions(e, "idServer teamId from", "team::acceptTeamInvite"),
              this.processCallback(e);
            var t = {
              idServer: e.idServer,
              teamId: e.teamId,
              from: e.from
            };
            this.sendCmd("acceptTeamInvite", t, e.callback)
          },
          r.rejectTeamInvite = function (e) {
            s.verifyOptions(e, "idServer teamId from", "team::rejectTeamInvite"),
              this.processPs(e),
              this.processCallback(e);
            var t = {
              idServer: e.idServer,
              teamId: e.teamId,
              from: e.from,
              ps: e.ps
            };
            this.sendCmd("rejectTeamInvite", t, e.callback)
          },
          r.applyTeam = function (e) {
            s.verifyOptions(e, "teamId", "team::applyTeam"),
              this.processPs(e),
              this.processCallback(e);
            var t = {
              teamId: e.teamId,
              ps: e.ps
            };
            this.sendCmd("applyTeam", t, e.callback)
          },
          r.passTeamApply = function (e) {
            s.verifyOptions(e, "idServer teamId from", "team::passTeamApply"),
              this.processCallback(e);
            var t = {
              idServer: e.idServer,
              teamId: e.teamId,
              from: e.from
            };
            this.sendCmd("passTeamApply", t, e.callback)
          },
          r.rejectTeamApply = function (e) {
            s.verifyOptions(e, "idServer teamId from", "team::rejectTeamApply"),
              this.processPs(e),
              this.processCallback(e);
            var t = {
              idServer: e.idServer,
              teamId: e.teamId,
              from: e.from,
              ps: e.ps
            };
            this.sendCmd("rejectTeamApply", t, e.callback)
          },
          r.addTeamManagers = function (e) {
            s.verifyOptions(e, "teamId accounts", "team::addTeamManagers"),
              s.verifyParamType("accounts", e.accounts, "array", "team::addTeamManagers"),
              this.processCallback(e);
            var t = {
              teamId: e.teamId,
              accounts: e.accounts.slice(0)
            };
            this.sendCmd("addTeamManagers", t, e.callback)
          },
          r.removeTeamManagers = function (e) {
            s.verifyOptions(e, "teamId accounts", "team::removeTeamManagers"),
              s.verifyParamType("accounts", e.accounts, "array", "team::removeTeamManagers"),
              this.processCallback(e);
            var t = {
              teamId: e.teamId,
              accounts: e.accounts.slice(0)
            };
            this.sendCmd("removeTeamManagers", t, e.callback)
          },
          r.updateInfoInTeam = function (e) {
            s.verifyOptions(e, "teamId", "team::updateInfoInTeam"),
              this.processCallback(e),
              this.sendCmd("updateInfoInTeam", {
                teamMember: new a(e),
                single: !0
              },
                e.callback)
          },
          r.updateNickInTeam = function (e) {
            s.verifyOptions(e, "teamId account", "team::updateNickInTeam"),
              this.processCallback(e),
              this.sendCmd("updateNickInTeam", {
                teamMember: new a(e),
                single: !0
              },
                e.callback)
          },
          r.updateMuteStateInTeam = function (e) {
            var t = this;
            s.verifyOptions(e, "teamId account mute", "team::updateMuteStateInTeam"),
              t.processCallback(e),
              e.mute = e.mute ? 1 : 0,
              t.sendCmd("updateMuteStateInTeam", e)
          },
          r.getMutedTeamMembers = function (e) {
            var t = this;
            s.verifyOptions(e, "teamId", "team::getMutedTeamMembers"),
              t.processCallback(e),
              t.sendCmd("getMutedTeamMembers", e)
          },
          r.leaveTeam = function (e) {
            s.verifyOptions(e, "teamId", "team::leaveTeam"),
              this.processCallback(e);
            var t = {
              teamId: e.teamId
            };
            this.sendCmd("leaveTeam", t, e.callback)
          },
          r.transferTeam = function (e) {
            s.verifyOptions(e, "teamId account leave", "team::transferTeam"),
              s.verifyParamType("leave", e.leave, "boolean", "team::transferTeam"),
              this.processCallback(e);
            var t = {
              teamId: e.teamId,
              account: e.account,
              leave: e.leave
            };
            this.sendCmd("transferTeam", t, e.callback)
          },
          r.dismissTeam = function (e) {
            s.verifyOptions(e, "teamId", "team::dismissTeam"),
              this.processCallback(e);
            var t = {
              teamId: e.teamId
            };
            this.sendCmd("dismissTeam", t, e.callback)
          },
          r.getTeam = function (e) {
            function t() {
              r.sendCmd("getTeam", {
                teamId: e.teamId
              },
                e.callback)
            }
            var n, r = this,
              o = r.db;
            s.verifyOptions(e, "teamId", "team::getTeam"),
              r.processCallback(e),
              e.cbaop = function (e, t) {
                e || r.logger.log("api::getTeam: cbaop " + n, t)
              },
              n = e.teamId,
              o.enable && !e.sync ? o.getTeam(n).then(function (s) {
                s ? (r.logger.log("api::getTeam: db.getTeam " + n, s), e.done(null, s)) : t()
              },
                t) : t()
          },
          r.getTeams = function (e) {
            function t() {
              n.sendCmd("getTeams", {
                timetag: o,
                NOTSTORE: "timetag"
              },
                e.callback)
            }
            var n = this,
              r = n.db,
              o = 0;
            s.verifyOptions(e),
              n.processCallback(e),
              r.enable ? r.getTeamsTimetag().then(function (e) {
                o = e,
                  t()
              },
                t) : t()
          },
          r.getTeamMembers = function (e) {
            function t() {
              n.sendCmd("getTeamMembers", {
                teamId: e.teamId,
                timetag: r,
                NOTSTORE: "timetag"
              },
                e.callback)
            }
            var n = this,
              r = 0;
            s.verifyOptions(e, "teamId", "team::getTeamMembers"),
              n.processCallback(e),
              t()
          },
          r.notifyForNewTeamMsg = function (e) {
            var t = this;
            s.verifyOptions(e, "teamIds", "team::notifyForNewTeamMsg");
            var n = t.protocol.notifyForNewTeamMsg(e.teamIds);
            n.then(function (t) {
              e.done(null, t)
            },
              function (t) {
                e.done(t)
              })
          },
          r.getMyTeamMembers = function (e) {
            var t = this;
            s.verifyOptions(e, "teamIds", "team::getMyTeamMembers");
            var n = t.processCallbackPromise(e);
            return t.sendCmd("getMyTeamMembers", e),
              n
          },
          r.getLocalTeams = function (e) {
            function t() {
              e.teams = i,
                e.done(n, e)
            }
            var n, r = this,
              o = r.db,
              i = [];
            s.verifyOptions(e, "teamIds", "team::getLocalTeams"),
              s.verifyParamType("teamIds", e.teamIds, "array", "team::getLocalTeams"),
              r.processCallback(e),
              o.enable ? o.getTeamsByTeamIds(e.teamIds).then(function (e) {
                i = e.filter(function (e) {
                  return !!e
                }),
                  t()
              },
                function (e) {
                  n = e,
                    t()
                }) : t()
          },
          r.getLocalTeamMembers = function (e) {
            function t() {
              e.members = i,
                e.done(n, e)
            }
            var n, r = this,
              o = r.db,
              i = [];
            s.verifyOptions(e, "teamId accounts", "team::getLocalTeamMembers"),
              s.verifyParamType("accounts", e.accounts, "array", "team::getLocalTeamMembers"),
              r.processCallback(e),
              o.enable ? o.getInvalidTeamMembers(e.teamId, e.accounts).then(function (e) {
                i = e.filter(function (e) {
                  return !!e
                }),
                  t()
              },
                function (e) {
                  n = e,
                    t()
                }) : t()
          },
          r.deleteLocalTeam = function (e) {
            function t() {
              e.done(n, e)
            }
            var n, r = this,
              o = r.db;
            s.verifyOptions(e, "teamId", "team::deleteLocalTeam"),
              r.processCallback(e),
              o.enable ? o.deleteTeam(e.teamId).then(function () {
                t()
              },
                function (e) {
                  n = e,
                    t()
                }) : t()
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(7).fn,
          s = n(1),
          o = s.objs2accounts,
          i = n(63);
        r.updateMyInfo = function (e) {
          s.verifyOptions(e),
            this.processCallback(e),
            e.user = new i(e),
            delete e.user.account,
            this.sendCmd("updateMyInfo", {
              user: e.user,
              single: !0
            },
              e.callback)
        },
          r.getMyInfo = function (e) {
            var t = this;
            return e = e || {},
              e.account = t.account,
              t.getUser(e)
          },
          r.getUser = function (e) {
            function t() {
              r.sendCmd("getUsers", {
                accounts: [n],
                single: !0
              },
                e.callback)
            }
            var n, r = this,
              o = r.db;
            s.verifyOptions(e, "account", "user::getUser"),
              r.processCallback(e),
              e.cbaop = function (e, t) {
                if (!e) return t = t[0] || null,
                  r.logger.log("api::getUser: cbaop " + n, t),
                  t
              },
              n = e.account,
              e.sync ? t() : o.enable ? o.getUser(n).then(function (s) {
                s ? (r.logger.log("api::getUser: db.getUser " + n, s), e.done(null, s)) : t()
              },
                t) : t()
          },
          r.getUsers = function (e) {
            function t() {
              r.sendCmd("getUsers", {
                accounts: n,
                single: !0
              },
                e.callback)
            }
            var n, r = this,
              i = r.db,
              a = [];
            s.verifyOptions(e, "accounts", "user::getUsers"),
              s.verifyParamType("accounts", e.accounts, "array", "user::getUsers"),
              r.processCallback(e),
              e.cbaop = function (e, t) {
                if (!e) return t = t.concat(a),
                  r.logger.log("api::getUsers: cbaop " + n, t),
                  t
              },
              n = s.deduplicate(e.accounts),
              s.verifyArrayMax("accounts", e.accounts, 150, "user::getUsers"),
              e.sync ? t() : i.enable ? i.getUsers(n).then(function (s) {
                if (s && s.length === n.length) r.logger.log("api::getUsers: db.getUsers", s),
                  e.done(null, s);
                else {
                  a = s;
                  var i = o(s),
                    c = [];
                  n.forEach(function (e) {
                    i.indexOf(e) === -1 && c.push(e)
                  }),
                    n = c,
                    t()
                }
              },
                t) : t()
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(2).Promise,
          s = n(11).fn,
          o = n(1),
          i = (o.notundef, "broadcastMsg");
        s.putBroadcastMsg = function (e) {
          var t = this;
          return new r(function (n) {
            function r() {
              a-- ,
                0 === a && n(s)
            }
            o.isArray(e) || (e = [e]);
            var s = [],
              a = e.length;
            e.forEach(function (e) {
              e = o.copy(e),
                t.put(i, e).then(function (e) {
                  s.push(e[0]),
                    r()
                },
                  r)
            })
          })
        },
          s.getBroadcastMsgs = function (e) {
            var t = this;
            return e = e || {},
              t.getAll(i, e)
          }
      },
      function (e, t) {
        "use strict";
        var n = {
          version: 8
        },
          r = {
            kv: {
              key: {
                keyPath: "key"
              }
            },
            timetag: {
              key: {
                keyPath: "name"
              }
            },
            blacklist: {
              key: {
                keyPath: "account"
              }
            },
            mutelist: {
              key: {
                keyPath: "account"
              }
            },
            friend: {
              key: {
                keyPath: "account"
              }
            },
            user: {
              key: {
                keyPath: "account"
              }
            },
            team: {
              key: {
                keyPath: "teamId"
              }
            },
            teamMember: {
              key: {
                keyPath: "id"
              },
              indexes: {
                teamId: {
                  unique: !1
                },
                account: {
                  unique: !1
                }
              }
            },
            msg: {
              key: {
                autoIncrement: !0
              },
              indexes: {
                idClient: {
                  unique: !0
                },
                sessionId: {
                  unique: !1
                },
                time: {
                  unique: !1
                },
                type: {
                  unique: !1
                },
                sessionType: {
                  unique: !1
                },
                status: {
                  unique: !1
                },
                sessionTime: {
                  key: ["sessionId", "time"],
                  unique: !1
                }
              }
            },
            msg1: {
              key: {
                keyPath: "idClient"
              },
              indexes: {
                sessionId: {
                  unique: !1
                },
                time: {
                  unique: !1
                },
                status: {
                  unique: !1
                },
                sessionTime: {
                  key: ["sessionId", "time"],
                  unique: !1
                }
              }
            },
            broadcastMsg: {
              key: {
                keyPath: "broadcastId"
              },
              indexes: {
                time: {
                  unique: !1
                }
              }
            },
            sysMsg: {
              key: {
                autoIncrement: !0
              },
              indexes: {
                idServer: {
                  unique: !0
                },
                category: {
                  unique: !1
                },
                type: {
                  unique: !1
                }
              }
            },
            sysMsgUnread: {
              key: {
                keyPath: "type"
              }
            },
            session: {
              key: {
                keyPath: "id"
              },
              indexes: {
                updateTime: {
                  unique: !1
                }
              }
            }
          };
        n.keyPath = function (e) {
          return r[e].key.keyPath
        },
          n.schema = function () {
            return window._nimForceSyncIM = !0,
              r
          },
          e.exports = n
      },
      function (e, t, n) {
        "use strict";
        var r = n(2).Promise,
          s = n(11).fn,
          o = n(1),
          i = "friend";
        s.mergeFriends = function (e, t, n) {
          var r = this;
          return r.updateAndDelete(i, e, t).then(function () {
            return r.logger.log("db::mergeFriends: updateAndDelete done", e),
              n && r.updateFriendTimetag(n),
              [e, t, n]
          })
        },
          s.putFriend = function (e) {
            return this.put(i, e)
          },
          s.updateFriend = function (e) {
            var t = this;
            e = o.copy(e);
            var n = e.account;
            return this.getOne(i, null, n, {
              modifyObj: e
            }).then(function (r) {
              return r ? t.logger.log("db::updateFriend: " + n, e) : t.logger.warn("db::updateFriend: no record " + n),
                r
            })
          },
          s.deleteFriend = function (e) {
            var t = this,
              n = t.remove(i, e),
              s = t.deleteUser(e);
            return r.all([n, s])
          },
          s.getFriends = function () {
            var e = function (e) {
              return e.valid
            };
            return this.getAll(i, {
              filter: e
            })
          },
          s.getFriend = function (e) {
            return this.getOne(i, null, e)
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(11).fn,
          s = "kv";
        r.setKey = function (e, t) {
          return this.put(s, {
            key: e,
            value: t
          })
        },
          r.getKey = function (e) {
            return this.get(s, e).then(function (e) {
              return e && e.value
            })
          },
          r.setDonnop = function (e) {
            return this.setKey("donnop", e)
          },
          r.getDonnop = function () {
            return this.getKey("donnop")
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(2).Promise,
          s = n(11).fn,
          o = n(1),
          i = "session",
          a = "msg1",
          c = "sessionId",
          u = "time",
          l = "status",
          d = "sessionTime";
        s.putMsg = function (e) {
          var t = this;
          return o.isArray(e) || (e = [e]),
            !e.length || e[0].filter ? r.resolve() : (e = e.filter(function (e) {
              return !e.ignore
            }), t.put(a, e))
        },
          s.updateMsg = function (e) {
            var t = this;
            if (!e.filter) {
              var n = e.idClient,
                r = o.filterObj(e, "resend status idServer time localCustom");
              return t.getOne(a, null, n, {
                modifyObj: r
              }).then(function (e) {
                return e ? t.logger.log("db::updateMsg: " + n, r) : t.logger.warn("db::updateMsg: no record " + n),
                  e
              })
            }
          },
          s.getMsgs = function (e) {
            var t = this;
            t.checkDB(),
              e = e || {};
            var n = u,
              r = !1,
              s = !1,
              i = e.sessionId,
              c = e.sessionIds;
            o.exist(i) ? (r = !0, n = d) : o.exist(c) && (r = !0, o.isString(c) ? (n = d, i = c) : Array.isArray(c) && (1 === c.length ? (n = d, i = c[0]) : s = !0));
            var l = e.start || 0,
              m = e.end || 1 / 0,
              f = l,
              p = m;
            r && !s && (f = [i, l], p = [i, m]);
            var g = e.desc !== !1,
              y = e.limit || 100,
              h = !1,
              v = !1,
              b = e.type,
              M = e.types;
            o.exist(b) ? h = !0 : o.exist(M) && (h = !0, o.isString(M) ? b = M : Array.isArray(M) && (1 === M.length ? b = M[0] : v = !0));
            var T = e.keyword || "",
              S = e.filterFunc,
              k = void 0;
            return (s || h || T || o.isFunction(S)) && (k = function (e) {
              if (s && c.indexOf(e.sessionId) === -1) return !1;
              if (h) if (v) {
                if (M.indexOf(e.type) === -1) return !1
              } else if (b !== e.type) return !1;
              if (T) {
                var t = e.text || e.tip || "";
                if (t.indexOf(T) === -1) return !1
              }
              return !S || S(e)
            }),
              t.server.query(a, n).bound(f, p, !0, !0).desc(g).limit(y).filter(k).execute()
          },
          s.getMsgCountAfterAck = function (e) {
            var t = this;
            e = e || {};
            var n = e,
              s = n.sessionId;
            return t.checkDB(),
              t.server.query(a, d).bound([s, e.ack], [s, 1 / 0], !0, !0).execute().then(function (t) {
                var n = t.filter(function (t) {
                  return "out" !== t.flow && ("notification" !== t.type || !!e.shouldCountNotifyUnread(t))
                });
                return r.resolve(n.length)
              })
          },
          s.amendMsg = function (e) {
            return e ? (o.notexist(e.text) && (e.text = ""), e) : null
          },
          s.getMsgByIdClient = function (e) {
            var t = this;
            return t.getOne(a, null, e).then(function (e) {
              return t.amendMsg(e)
            })
          },
          s.getMsgsByIdClients = function (e) {
            var t, n = this,
              s = [];
            return e.forEach(function (e) {
              t = n.getMsgByIdClient(e),
                s.push(t)
            }),
              r.all(s)
          },
          s.clearSendingMsgs = function () {
            var e = this;
            return e.getOnly(a, l, "sending", {
              modifyObj: {
                status: "fail"
              }
            }).then(function (t) {
              e.logger.log("db::clearSendingMsgs: msgs send failed", t)
            })
          },
          s.deleteMsg = function (e) {
            var t, n = this,
              s = [];
            return o.isArray(e) || (e = [e]),
              e.forEach(function (e) {
                t = n.getOne(a, null, e, {
                  remove: !0
                }).then(function (e) {
                  return n.logger.log("db::deleteMsg:", e),
                    e
                }),
                  s.push(t)
              }),
              1 === s.length ? s[0] : r.all(s)
          },
          s.deleteMsgsBySessionId = function (e) {
            var t = this;
            return t.getOnly(a, c, e, {
              remove: !0
            })
          },
          s.deleteAllMsgs = function () {
            var e = this,
              t = e.clearTable(a),
              n = e.clearTable(i);
            return r.all([t, n])
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(2).Promise,
          s = n(11).fn,
          o = n(1),
          i = "blacklist",
          a = "mutelist";
        s.mergeRelations = function (e, t, n, s, o) {
          var c = this,
            u = c.updateAndDelete(i, e, t),
            l = c.updateAndDelete(a, n, s);
          return r.all([u, l]).then(function () {
            return c.logger.log("db::mergeRelations: timetag " + o),
              c.updateRelationTimetag(o),
              [e, t, n, s, o]
          })
        },
          s.getRelations = function () {
            var e = this,
              t = e.getAll(i),
              n = e.getAll(a);
            return r.all([t, n])
          },
          s.markInBlacklist = function (e) {
            var t = this;
            if (e = o.copy(e), e.isAdd) {
              var n = e.record;
              return t.put(i, n)
            }
            var r = e.account;
            return t.remove(i, r)
          },
          s.markInMutelist = function (e) {
            var t = this;
            if (e = o.copy(e), e.isAdd) {
              var n = e.record;
              return t.put(a, n)
            }
            var r = e.account;
            return t.remove(a, r)
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(11).fn,
          s = n(1),
          o = s.notundef,
          i = "session",
          a = "updateTime";
        r.putSession = function (e) {
          return e = s.merge({},
            e),
            delete e.unread,
            this.modifyOrPut({
              table: i,
              obj: e,
              key: "id",
              modifyObjWhenPut: {
                unread: 0
              }
            })
        },
          r.getSessions = function (e) {
            e = e || {};
            var t, n = !e.reverse,
              r = e.limit || 100,
              s = e.lastSessionId,
              c = e.sessionId,
              u = !1;
            if (o(s)) t = function (e) {
              return !!u || (e.id === s && (u = !0), !1)
            };
            else if (o(c)) return this.get(i, c);
            return this.getAll(i, {
              index: a,
              desc: n,
              limit: r,
              filter: t
            })
          },
          r.getSession = function (e) {
            return this.get(i, e)
          },
          r.updateSession = function (e) {
            var t = this,
              n = e.id,
              r = s.filterObj(e, "ack unread lastMsg localCustom msgReceiptTime msgReceiptServerTime");
            return Object.keys(e).forEach(function (t) {
              0 === t.indexOf("last") && (r[t] = e[t])
            }),
              this.getOne(i, null, n, {
                modifyObj: r
              }).then(function (e) {
                return e ? t.logger.log("db::updateSession: " + n, r) : t.logger.warn("db::updateSession: no record " + n),
                  e
              })
          },
          r.resetSessionUnread = function (e) {
            return this.updateSession({
              id: e,
              unread: 0
            })
          },
          r.deleteSession = function (e) {
            return this.remove(i, e)
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(2).Promise,
          s = n(11).fn,
          o = n(1),
          i = o.notundef,
          a = "sysMsg",
          c = "idServer",
          u = "type",
          l = "category",
          d = "sysMsgUnread";
        s.putSysMsg = function (e) {
          var t = this;
          return new r(function (n) {
            function r() {
              i-- ,
                0 === i && n(s)
            }
            if (o.isArray(e) || (e = [e]), !e[0].filter) {
              var s = [],
                i = e.length;
              e.forEach(function (e) {
                e = o.copy(e),
                  t.put(a, e).then(function (e) {
                    s.push(e[0]),
                      r()
                  },
                    r)
              })
            }
          })
        },
          s.getSysMsgs = function (e) {
            var t = this;
            e = e || {};
            var n = !e.reverse,
              r = e.limit || 100,
              s = null,
              o = null;
            e.category && (s = l, o = e.category),
              e.type && (s = u, o = e.type);
            var c, d = e.lastIdServer,
              m = !1,
              f = e.read;
            return (i(d) || i(f)) && (c = function (e) {
              function t() {
                return !i(f) || e.read === f
              }
              return i(d) ? (d = "" + d, m ? t() : (e.idServer === d && (m = !0), !1)) : t()
            }),
              e = {
                filter: c,
                desc: n,
                limit: r
              },
              s ? t.getOnly(a, s, o, e) : t.getAll(a, e)
          },
          s.getSysMsgByIdServer = function (e) {
            return this.getOne(a, c, e)
          },
          s.updateSysMsg = function (e) {
            var t = this;
            if (!e.filter) {
              var n = "" + e.idServer,
                r = o.filterObj(e, "read state error localCustom");
              return this.getOne(a, c, n, {
                modifyObj: r
              }).then(function (e) {
                return e ? t.logger.log("db::updateSysMsg: " + n, r) : t.logger.warn("db::updateSession: " + n),
                  e
              })
            }
          },
          s.markSysMsgRead = function (e) {
            var t = this;
            return new r(function (n, s) {
              o.isArray(e) || (e = [e]);
              var i, a, c = [],
                u = [];
              e.forEach(function (e) {
                i = t.getSysMsgByIdServer(e.idServer).then(function (e) {
                  e && !e.read && (a = t.updateSysMsg({
                    idServer: e.idServer,
                    read: !0
                  }), u.push(a))
                },
                  s),
                  c.push(i)
              }),
                r.all(c).then(function () {
                  r.all(u).then(function (e) {
                    n(e)
                  },
                    s)
                },
                  s)
            })
          },
          s.deleteSysMsg = function (e) {
            var t, n = this,
              s = [];
            return o.isArray(e) || (e = [e]),
              e.forEach(function (e) {
                e = "" + e,
                  t = n.getOne(a, c, e, {
                    remove: !0
                  }),
                  s.push(t)
              }),
              1 === s.length ? s[0] : r.all(s)
          },
          s.deleteAllSysMsgs = function () {
            var e = this,
              t = e.clearTable(a),
              n = e.clearTable(d);
            return r.all([t, n])
          },
          s.getSysMsgUnread = function () {
            return this.getAll(d).then(function (e) {
              var t = {};
              return e.forEach(function (e) {
                t[e.type] = e.num
              }),
                t
            })
          },
          s.updateSysMsgUnread = function (e) {
            var t = this;
            e = o.copy(e);
            var n = [];
            return Object.keys(e).forEach(function (t) {
              n.push({
                type: t,
                num: e[t]
              })
            }),
              this.put(d, n).then(function () {
                return t.logger.log("db::updateSysMsgUnread: ", e),
                  e
              })
          }
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          return e.valid && e.validToCurrentUser
        }
        function s(e) {
          return e && e.valid
        }
        function o(e) {
          return e && c.fillUndef(e, {
            mute: !1,
            custom: ""
          }),
            e
        }
        var i = n(2).Promise,
          a = n(11).fn,
          c = n(1),
          u = n(5),
          l = n(39),
          d = n(33),
          m = "team",
          f = "teamId",
          p = "account",
          g = "teamMember";
        a.mergeTeams = function (e, t, n) {
          var r = this,
            s = r.put(m, e),
            o = r.leaveTeams(t, n);
          return i.all([s, o]).then(function () {
            return r.logger.log("db::mergeTeams:"),
              r.updateTeamTimetag(n),
              [e, t, n]
          })
        },
          a.putTeam = function (e) {
            if (e) return c.isArray(e) || (e = [e]),
              e.forEach(function (e) {
                e.validToCurrentUser = !0
              }),
              this.put(m, e)
          },
          a.updateTeam = function (e) {
            var t = this;
            e = c.copy(e);
            var n = e.teamId;
            return t.getOne(m, null, n, {
              modifyObj: e
            }).then(function (r) {
              return r ? (t.logger.log("db::updateTeam: " + n, e), r) : (t.logger.warn("db::updateTeam: no record " + n), t.putTeam(e))
            })
          },
          a.transferTeam = function (e, t, n) {
            var r = this,
              s = e.teamId,
              o = e.memberUpdateTime,
              i = {
                teamId: s,
                account: t,
                type: "normal",
                updateTime: o
              },
              a = {
                teamId: s,
                account: n,
                type: "owner",
                updateTime: o
              };
            return r.updateTeamMembers([i, a]).then(function () {
              return r.putTeam(e).then(function () {
                return r.logger.log("db::transferTeam: " + e.teamId + " " + t + " -> " + n),
                  [e, t, n]
              })
            })
          },
          a.leaveTeam = function (e) {
            var t = this;
            return t.updateTeam({
              teamId: e,
              validToCurrentUser: !1
            }).then(function () {
              return t.removeAllTeamMembers(e)
            })
          },
          a.dismissTeam = function (e, t) {
            var n = this,
              r = {
                teamId: e,
                valid: !1,
                validToCurrentUser: !1,
                updateTime: t
              };
            return n.updateTeam(r).then(function () {
              return n.removeAllTeamMembers(e)
            })
          },
          a.leaveTeams = function (e, t) {
            var n, r = this,
              s = [];
            return e.forEach(function (e) {
              n = r.leaveTeam(e.teamId, t),
                s.push(n)
            }),
              i.all(s)
          },
          a.getTeamsByTeamIds = function (e) {
            var t, n = this,
              r = [];
            return e.forEach(function (e) {
              t = n.getTeam(e),
                r.push(t)
            }),
              i.all(r)
          },
          a.getTeam = function (e) {
            e = "" + e;
            var t = this;
            return t.getOne(m, null, e).then(function (e) {
              return t.updateTeamProperties([e]),
                e
            })
          },
          a.getTeams = function () {
            var e = this;
            return e.getAll(m, {
              filter: r
            }).then(function (t) {
              return e.updateTeamProperties(t),
                t
            })
          },
          a.updateTeamProperties = function (e) {
            e.forEach(function (e) {
              l.fillProperties(e)
            })
          },
          a.mergeTeamMembers = function (e, t, n, r) {
            var s = this,
              o = s.putTeamMembers(t),
              a = s.updateTeamMembers(n);
            return i.all([o, a]).then(function () {
              return s.logger.log("db::mergeTeamMembers: " + e),
                s.updateTeamMemberTimetag(e, r)
            })
          },
          a.putTeamMembers = function (e) {
            return this.put(g, e)
          },
          a.getTeamMembersByAccount = function (e) {
            var t = this;
            return t.getOnly(g, p, e, {
              filter: s,
              mapper: o
            }).then()
          },
          a.getTeamMembers = function (e) {
            var t = this;
            e = "" + e;
            var n = function (e) {
              return e.valid
            };
            return t.getOnly(g, f, e, {
              filter: n,
              mapper: o
            }).then(function (e) {
              return t.updateTeamMemberProperties(e).then(function () {
                return e
              })
            })
          },
          a.updateTeamMemberProperties = function (e) {
            var t, n = this,
              r = [];
            return e.forEach(function (e) {
              d.fillProperties(e) && (t = n.updateTeamMember(e), r.push(t))
            }),
              i.all(r)
          },
          a.getInvalidTeamMembers = function (e, t) {
            var n = this;
            e = "" + e;
            var r, s = [];
            return t.forEach(function (t) {
              r = n.getOne(g, null, d.genId(e, t)).then(function (e) {
                return o(e)
              }),
                s.push(r)
            }),
              i.all(s)
          },
          a.updateTeamMember = function (e) {
            var t = this,
              n = e.teamId,
              r = e.account,
              s = d.genId(n, r),
              i = c.filterObj(e, "nickInTeam muteTeam mute custom updateTime type valid");
            return this.getOne(g, null, s, {
              modifyObj: i,
              mapper: o
            }).then(function (e) {
              return e ? t.logger.log("db::updateTeamMember: " + n + " " + r, i) : t.logger.warn("db::updateTeam: no record " + n + " " + r),
                e
            })
          },
          a.updateTeamMembers = function (e) {
            var t = this;
            if (!e.length) return i.resolve();
            var n, r = [];
            return e.forEach(function (e) {
              n = t.updateTeamMember(e),
                r.push(n)
            }),
              i.all(r)
          },
          a.updateTeamManagers = function (e, t, n, r) {
            var s = t.map(function (t) {
              return {
                teamId: e,
                account: t,
                type: n ? "manager" : "normal",
                updateTime: r
              }
            });
            return this.updateTeamMembers(s)
          },
          a.removeTeamMembersByAccounts = function (e, t) {
            var n = t.map(function (t) {
              return {
                teamId: e,
                account: t,
                valid: !1
              }
            });
            return this.updateTeamMembers(n)
          },
          a.removeAllTeamMembers = function (e) {
            var t = this,
              n = {
                valid: !1
              };
            return t.getOnly(g, f, e, {
              modifyObj: n
            }).then(function () {
              return t.logger.warn("db::removeAllTeamMembers: " + e),
                t.deleteTeamMemberTimetag(e)
            })
          },
          a.deleteTeamMembers = function (e) {
            var t = this;
            return t.getOnly(g, f, e, {
              remove: !0
            }).then(function () {
              t.logger.warn("db::deleteTeamMembers: " + e),
                t.deleteTeamMemberTimetag(e)
            })
          },
          a.deleteTeam = function (e) {
            var t, n = this,
              s = [];
            return c.isArray(e) || (e = [e]),
              e.forEach(function (e) {
                e = "" + e,
                  t = n.get(m, e).then(function (t) {
                    if (t && r(t)) throw u.stillInTeamError({
                      callFunc: "team::deleteTeam",
                      team: t
                    });
                    var s = n.remove(m, e),
                      o = n.deleteTeamMembers(e);
                    return i.all([s, o])
                  }),
                  s.push(t)
              }),
              1 === s.length ? s[0] : i.all(s)
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(11).fn;
        r.getTimetags = function (e) {
          var t = {},
            n = function (e) {
              return e.name.indexOf("team-") !== -1 ? t[e.name] = 0 : t[e.name] = e.value,
                e
            };
          return this.getAll("timetag", {
            filter: e,
            mapper: n
          }).then(function () {
            return t
          })
        },
          r.getTeamMemberTimetags = function () {
            return this.getTimetags(function (e) {
              return e.name.indexOf("team-") !== -1
            })
          },
          r.getTimetag = function (e) {
            return this.getOne("timetag", null, e).then(function (e) {
              return e = e || {
                value: 0
              },
                e.value
            })
          },
          r.getTeamMemberTimetag = function (e) {
            return 0
          },
          r.updateTimetag = function (e, t) {
            var n = {
              name: e,
              value: t
            };
            return this.put("timetag", n)
          },
          r.updateMyInfoTimetag = function (e) {
            return this.updateTimetag("myInfo", e)
          },
          r.updateRelationTimetag = function (e) {
            return this.updateTimetag("relations", e)
          },
          r.getRelationsTimetag = function () {
            return this.getTimetag("relations")
          },
          r.updateFriendTimetag = function (e) {
            return this.updateTimetag("friends", e)
          },
          r.getFriendsTimetag = function () {
            return this.getTimetag("friends")
          },
          r.updateFriendUserTimetag = function (e) {
            return this.updateTimetag("friendUsers", e)
          },
          r.updateTeamTimetag = function (e) {
            return this.updateTimetag("teams", e)
          },
          r.getTeamsTimetag = function () {
            return this.getTimetag("teams")
          },
          r.updateTeamMemberTimetag = function (e, t) {
            return this.updateTimetag("team-" + e, t)
          },
          r.getTeamMembersTimetag = function (e) {
            return this.getTimetag("team-" + e)
          },
          r.updateMyTeamMembersTimetag = function (e) {
            return this.updateTimetag("myTeamMembers", e)
          },
          r.getBroadcastMsgTimetag = function (e) {
            return this.getTimetag("broadcastMsg")
          },
          r.updateBroadcastMsgTimetag = function (e) {
            return this.updateTimetag("broadcastMsg", parseInt(e))
          },
          r.updateRoamingMsgTimetag = function (e) {
            return this.updateTimetag("roamingMsgs", e);
          },
          r.updateMsgReceiptsTimetag = function (e) {
            return this.updateTimetag("msgReceipts", e)
          },
          r.updateDonnopTimetag = function (e) {
            return this.updateTimetag("donnop", e)
          },
          r.updateDeleteMsgTimetag = function (e) {
            return this.updateTimetag("deleteMsg", e)
          },
          r.updateSessionAck = function (e) {
            return this.updateTimetag("sessionAck", e)
          },
          r.deleteTimetag = function (e) {
            return this.remove("timetag", e)
          },
          r.deleteTeamMemberTimetag = function (e) {
            return this.deleteTimetag("team-" + e)
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(2).Promise,
          s = n(11).fn,
          o = n(1),
          i = "user";
        s.mergeMyInfo = function (e, t) {
          var n = this;
          return n.put(i, e).then(function () {
            return t ? n.updateMyInfoTimetag(e.updateTime) : e
          })
        },
          s.mergeFriendUsers = function (e, t) {
            var n = this;
            return n.putUsers(e).then(function () {
              n.updateFriendUserTimetag(t)
            })
          },
          s.putUsers = function (e) {
            return this.put(i, e)
          },
          s.putUser = function (e) {
            return this.put(i, e)
          },
          s.updateUser = function (e) {
            var t = this;
            e = o.copy(e);
            var n = e.account;
            return this.getOne(i, null, n, {
              modifyObj: e
            }).then(function (r) {
              return r ? t.logger.log("db::updateUser: " + n, e) : t.logger.warn("db::updateUser: no record " + n),
                r
            })
          },
          s.putUsersIfIsFriend = function (e) {
            var t, n = this,
              s = [],
              o = [];
            return e.forEach(function (e) {
              t = n.getFriend(e.account).then(function (r) {
                return r && (t = n.putUser(e), o.push(t)),
                  r
              }),
                s.push(t)
            }),
              r.all(s).then(function () {
                return r.all(o).then(function (e) {
                  return e
                })
              })
          },
          s.deleteUser = function (e) {
            return this.remove(i, e)
          },
          s.getUser = function (e) {
            return this.getOne(i, null, e)
          },
          s.getUsers = function (e) {
            function t(t) {
              return e.indexOf(t.account) !== -1
            }
            return this.getAll(i, {
              filter: t
            })
          },
          s.getAllUsers = function () {
            return this.getAll(i)
          }
      },
        , , , , , , , , , ,
      function (e, t, n) {
        "use strict";
        function r() { }
        var s = n(62),
          o = n(1);
        r.prototype = Object.create(s.prototype),
          r.verifyFile = function (e, t) {
            o.verifyOptions(e, "dur", !0, "file.", t)
          },
          e.exports = r
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          o.verifyOptions(e, "content", "msg::CustomMessage"),
            e.type = "custom",
            s.call(this, e),
            this.attach = e.content
        }
        var s = n(24),
          o = n(1);
        r.prototype = Object.create(s.prototype),
          r.reverse = function (e) {
            var t = s.reverse(e);
            return t.content = e.attach,
              t
          },
          e.exports = r
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          e.type = "geo",
            o.verifyOptions(e, "geo", "msg::GeoMessage"),
            o.verifyOptions(e.geo, "lng lat title", !0, "geo.", "msg::GeoMessage"),
            o.verifyParamType("geo.lng", e.geo.lng, "number", "msg::GeoMessage"),
            o.verifyParamType("geo.lat", e.geo.lat, "number", "msg::GeoMessage"),
            o.verifyParamType("geo.title", e.geo.title, "string", "msg::GeoMessage"),
            s.call(this, e),
            this.attach = JSON.stringify(e.geo)
        }
        var s = n(24),
          o = n(1);
        r.prototype = Object.create(s.prototype),
          r.reverse = function (e) {
            var t = s.reverse(e);
            return e.attach = e.attach ? "" + e.attach : "",
              t.geo = e.attach ? JSON.parse(e.attach) : {},
              t
          },
          e.exports = r
      },
      function (e, t, n) {
        "use strict";
        function r() { }
        var s = n(1),
          o = n(62);
        r.prototype = Object.create(o.prototype),
          r.verifyFile = function (e, t) {
            s.verifyOptions(e, "w h", !0, "file.", t)
          },
          e.exports = r
      },
      function (e, t, n) {
        "use strict";
        var r = n(1),
          s = function (e) {
            this.account = e.account,
              this.enabledHttpsForMessage = e.enabledHttpsForMessage || !1
          },
          o = s.prototype,
          i = o.Message = n(24),
          a = o.TextMessage = n(230),
          c = o.FileMessage = n(62),
          u = o.GeoMessage = n(225),
          l = o.NotificationMessage = n(228),
          d = o.CustomMessage = n(224),
          m = o.TipMessage = n(231),
          f = o.RobotMessage = n(229);
        o.validScenes = i.validScenes,
          o.validTypes = i.validTypes,
          o.reverse = function (e) {
            var t, n = i.getType(e);
            switch (n) {
              case "text":
                t = a.reverse(e);
                break;
              case "image":
              case "audio":
              case "video":
              case "file":
                e.enabledHttpsForMessage = this.enabledHttpsForMessage,
                  t = c.reverse(e);
                break;
              case "geo":
                t = u.reverse(e);
                break;
              case "notification":
                t = l.reverse(e);
                break;
              case "custom":
                t = d.reverse(e);
                break;
              case "tip":
                t = m.reverse(e);
                break;
              case "robot":
                t = f.reverse(e);
                break;
              default:
                t = i.reverse(e)
            }
            return i.setExtra(t, this.account),
              t
          },
          o.reverseMsgs = function (e, t) {
            var n, s, o = this;
            return e.map(function (e) {
              return e = o.reverse(e),
                t && (n = t.modifyObj, n && (e = r.merge(e, n)), s = t.mapper, r.isFunction(s) && (e = s(e))),
                e
            })
          },
          e.exports = s
      },
      function (e, t, n) {
        "use strict";
        function r() { }
        var s = n(1),
          o = s.notundef,
          i = n(24),
          a = n(28).getInstance("IM"),
          c = n(39),
          u = n(63),
          l = {
            0: "addTeamMembers",
            1: "removeTeamMembers",
            2: "leaveTeam",
            3: "updateTeam",
            4: "dismissTeam",
            5: "passTeamApply",
            6: "transferTeam",
            7: "addTeamManagers",
            8: "removeTeamManagers",
            9: "acceptTeamInvite",
            10: "updateTeamMute",
            101: "netcallMiss",
            102: "netcallBill"
          };
        r.prototype = Object.create(i.prototype),
          r.reverse = function (e) {
            var t = i.reverse(e);
            if (e.attach = e.attach ? "" + e.attach : "", e.attach) {
              var n = JSON.parse(e.attach);
              if (t.attach = {
                type: l[n.id] || n.id
              },
                o(n.data)) {
                var r = n.data;
                o(r.tinfo) && (t.attach.team = c.reverse(a.unserialize(r.tinfo, "team"), !0)),
                  o(r.ids) && (t.attach.accounts = r.ids),
                  o(r.id) && (t.attach.account = r.id),
                  o(r.uinfos) && (t.attach.users = r.uinfos.map(function (e) {
                    return u.reverse(a.unserialize(e, "user"))
                  })),
                  o(r.mute) && (t.attach.mute = 1 === +r.mute),
                  o(r.attach) && (t.attach.custom = r.attach),
                  o(r.channel) && (t.attach.channelId = r.channel),
                  o(r.calltype) && (t.attach.netcallType = r.calltype),
                  o(r.duration) && (t.attach.duration = r.duration),
                  o(r.time) && (t.attach.time = r.time),
                  t.attach.accounts && t.attach.accounts.length <= 2 && t.from === t.to && t.attach.accounts.some(function (e) {
                    if (e !== t.to) return t.to = e,
                      !0
                  })
              }
            } else t.attach = {};
            return t
          },
          e.exports = r
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          o.verifyOptions(e, "content", "msg::RobotMessage"),
            o.undef(e.robotAccid) && (e.robotAccid = e.to);
          var t = e.content;
          switch (t.type) {
            case "welcome":
              o.undef(e.body) && (this.body = "欢迎消息");
              break;
            case "text":
              o.verifyOptions(t, "content", "msg::RobotMessage"),
                o.undef(e.body) && (this.body = t.content);
              break;
            case "link":
              o.verifyOptions(t, "target", "msg::RobotMessage")
          }
          t.type && (t.type = i[t.type]),
            t = {
              param: t,
              robotAccid: e.robotAccid
            },
            this.attach = JSON.stringify(t),
            e.type = "robot",
            s.call(this, e)
        }
        var s = n(24),
          o = n(1),
          i = {
            welcome: "00",
            text: "01",
            link: "03"
          },
          a = {
            "01": "text",
            "02": "image",
            "03": "answer",
            11: "template"
          };
        r.prototype = Object.create(s.prototype),
          r.reverse = function (e) {
            var t = s.reverse(e);
            if ("robot" === t.type) {
              var n = JSON.parse(e.attach);
              if (n.param && (n.param.type = a[n.param.type] || "unknown"), n.robotMsg) {
                n = o.merge(n, n.robotMsg);
                var r = n.message;
                "bot" === n.flag ? n.message = r.map(function (e) {
                  return e.type = a[e.type] || "unknown",
                    e
                }) : "faq" === n.flag,
                  delete n.robotMsg
              }
              t.content = n
            }
            return t
          },
          e.exports = r
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          o.verifyOptions(e, "text", "msg::TextMessage"),
            e.type = "text",
            s.call(this, e)
        }
        var s = n(24),
          o = n(1);
        r.prototype = Object.create(s.prototype),
          r.reverse = function (e) {
            var t = s.reverse(e);
            return t
          },
          e.exports = r
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          o.verifyOptions(e, "tip", "msg::TipMessage"),
            e.type = "tip",
            s.call(this, e),
            this.body = e.tip
        }
        var s = n(24),
          o = n(1);
        r.prototype = Object.create(s.prototype),
          r.reverse = function (e) {
            var t = s.reverse(e);
            return t.text = "",
              t.tip = e.body,
              e.attach && (t.attach = e.attach),
              t
          },
          e.exports = r
      },
      function (e, t, n) {
        "use strict";
        function r() { }
        var s = n(62),
          o = n(1);
        r.prototype = Object.create(s.prototype),
          r.verifyFile = function (e, t) {
            o.verifyOptions(e, "dur w h", !0, "file.", t)
          },
          e.exports = r
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          if (s.verifyOptions(e, "type value", "event::MsgEvent"), s.verifyParamType("type", e.type, "number", "event::MsgEvent"), s.verifyParamMin("type", e.type, 1e5, "event::MsgEvent"), s.verifyParamType("value", e.value, "number", "event::MsgEvent"), this.type = e.type, this.value = e.value, this.idClient = s.guid(), o(e.custom) && (this.custom = "" + e.custom), this.validTime = e.validTime || 604800, s.verifyParamType("validTime", this.validTime, "number", "event::MsgEvent"), s.verifyParamMin("validTime", this.validTime, 60, "event::MsgEvent"), s.verifyParamMax("validTime", this.validTime, 604800, "event::MsgEvent"), o(e.broadcastType)) {
            if (s.verifyParamType("broadcastType", e.broadcastType, "number", "event::MsgEvent"), [1, 2].indexOf(e.broadcastType) < 0) throw new i('参数错误"broadcastType":只能为1或2');
            this.broadcastType = e.broadcastType
          } else this.broadcastType = 2;
          o(e.sync) ? (s.verifyParamType("sync", e.sync, "boolean", "event::MsgEvent"), this.sync = e.sync) : this.sync = !1
        }
        var s = n(1),
          o = s.notundef,
          i = n(5);
        r.prototype.assembleEvent = function () {
          return {
            type: this.type,
            value: this.value,
            idClient: this.idClient,
            custom: this.custom || "",
            validTime: this.validTime,
            broadcastType: this.broadcastType,
            sync: this.sync === !0 ? 1 : 0
          }
        },
          e.exports = r
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          s.verifyOptions(e, "type", "event::MsgEventSubscribe"),
            s.verifyParamType("type", e.type, "number", "event::MsgEventSubscribe"),
            s.findObjIndexInArray([1, 2, 3], e.type) < 0 && s.verifyParamMin("type", e.type, 1e5, "event::MsgEventSubscribe"),
            this.type = e.type,
            o(e.subscribeTime) ? (s.verifyParamType("subscribeTime", e.subscribeTime, "number", "event::MsgEventSubscribe"), s.verifyParamMin("subscribeTime", e.subscribeTime, 60, "event::MsgEventSubscribe"), s.verifyParamMax("subscribeTime", e.subscribeTime, 2592e3, "event::MsgEventSubscribe"), this.subscribeTime = e.subscribeTime) : this.subscribeTime = 2592e3,
            o(e.sync) ? (s.verifyParamType("sync", e.sync, "boolean", "event::MsgEventSubscribe"), this.sync = e.sync) : this.sync = !0
        }
        var s = n(1),
          o = s.notundef;
        r.prototype.assembleEvent = function (e) {
          return {
            type: this.type,
            subscribeTime: this.subscribeTime,
            sync: this.sync === !0 ? 1 : 0
          }
        },
          e.exports = r
      },
      function (e, t, n) {
        "use strict";
        function r() { }
        var s = n(1);
        r.parse = function (e) {
          var t = s.copy(e);
          return t.isBlacked = "1" === t.isBlacked,
            t.isMuted = "1" === t.isMuted,
            t.createTime = +t.createTime,
            t.updateTime = +t.updateTime,
            t
        },
          e.exports = r
      },
        , , , ,
      function (e, t, n) {
        "use strict";
        var r = n(4).fn,
          s = n(36);
        r.assembleLogin = function () {
          return {
            login: this.assembleIMLogin()
          }
        },
          r.afterLogin = function () {
            var e = this,
              t = e.db;
            if (t.enable) {
              var n = e.account;
              e.options.appendAppKeyForDBName && (n += "-" + e.options.appKey),
                e.db.init(n).then(function () {
                  e.syncData()
                },
                  function (n) {
                    e.logger.warn("link::afterLogin: no db", n),
                      t.reset(!1),
                      e.syncData()
                  })
            } else e.logger.info("link::afterLogin: no db"),
              e.syncData()
          },
          r.processAuth = function (e) {
            var t = this;
            switch (e.cmd) {
              case "login":
                e.error || (e.obj = e.content.loginRes, t.connectionId = e.content.loginRes.connectionId, t.onLoginPortsChange(e, 2));
                break;
              case "kicked":
                return void t.onKicked(e);
              case "multiPortLogin":
                t.onLoginPortsChange(e, e.content.state);
                break;
              case "kick":
                e.error || (e.obj.deviceIds = e.content.deviceIds)
            }
          },
          r.onLoginPortsChange = function (e, t) {
            var n = this,
              r = e.content.loginPorts;
            if (r && r.length) {
              var o = !0;
              switch (t) {
                case 2:
                  o = !0;
                  break;
                case 3:
                  o = !1
              }
              r.forEach(function (e) {
                e.type = s.reverseType(e.type),
                  e.time = +e.time,
                  e.online = o
              }),
                r = r.filter(function (e) {
                  return e.connectionId !== n.connectionId
                }),
                r.length && (n.logger.info("link::onLoginPortsChange:", r), n.options.onloginportschange(r))
            }
          },
          r.kickedReasons = ["", "samePlatformKick", "serverKick", "otherPlatformKick", "silentlyKick"],
          r.kickedMessages = ["", "不允许同一个帐号在多个地方同时登录", "被服务器踢了", "被其它端踢了", "悄悄被踢"]
      },
      function (e, t, n) {
        "use strict";
        var r = n(4).fn;
        r.processChatroom = function (e) {
          var t = this;
          switch (e.cmd) {
            case "getChatroomAddress":
              t.onChatroomAddress(e)
          }
        },
          r.onChatroomAddress = function (e) {
            e.error || (e.obj.address = e.content.address)
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(4).fn,
          s = n(3),
          o = n(1),
          i = n(20);
        r.refreshSocketUrl = function () {
          function e(e) {
            n.socketUrls = [],
              e = JSON.parse(e),
              e.common.link.forEach(function (e) {
                n.socketUrls.push(s.formatSocketUrl({
                  url: e,
                  secure: n.options.secure
                }))
              }),
              e.common["link.default"].forEach(function (e) {
                e = s.formatSocketUrl({
                  url: e,
                  secure: n.options.secure
                }),
                  n.socketUrls.indexOf(e) === -1 && n.socketUrls.push(e)
              });
            try {
              s.uploadUrl = e.nosup[0]
            } catch (t) { }
            n.logger.info("link::refreshSocketUrl: ajax load, got socket urls ", n.socketUrls),
              n.connectToUrl(n.getNextSocketUrl())
          }
          function t(e) {
            n.api.reportLogs({
              event: "nimlb",
              code: 3001
            }),
              n.logger.error("link::refreshSocketUrl: ajax lbs error", e),
              n.onDisconnect(!1, "link::refreshSocketUrl")
          }
          var n = this,
            r = n.options,
            a = s.info,
            c = r.lbsUrl;
          c = c + o.genUrlSep(c) + "k=" + r.appKey + "&id=" + r.account + "&sv=" + a.sdkVersion + "&pv=" + a.protocolVersion,
            n.logger.info("link::refreshSocketUrl: ajax " + c),
            i(c, {
              proxyUrl: o.url2origin(c) + "/lbs/res/cors/nej_proxy_frame.html",
              timeout: s.xhrTimeout,
              onload: e,
              onerror: t
            })
        }
      },
      function (e, t, n) {
        "use strict";
        function r(e) {
          return e && e.__esModule ? e : {
            "default": e
          }
        }
        function s(e) {
          e = e || {};
          var t = c.copy(e);
          return t.clientType && (t.clientType = u[t.clientType] || ""),
            t.serverCustom && (t.custom = JSON.parse(t.serverCustom), "string" == typeof t.custom[0] && (t.custom = t.custom[0]), delete t.serverCustom),
            t
        }
        var o = n(21),
          i = r(o),
          a = n(4).fn,
          c = n(1),
          u = i["default"].clientTypeMap;
        a.processEventService = function (e) {
          var t = this,
            n = e.content,
            r = e.error,
            o = t.options || {};
          switch (r && (r.callFunc = "events::processEventService", t.onCustomError("事件服务解包失败", "EVENT_SERVICE_ERROR", r)), e.cmd) {
            case "pushEvent":
              if (c.isFunction(o.onpushevents)) {
                var i = {
                  msgEvents: [s(n.msgEvent)]
                };
                o.onpushevents(i)
              }
              break;
            case "pushEvents":
              if (c.isFunction(o.onpushevents)) {
                var a = n.msgEvents,
                  u = a.map(function (e) {
                    return s(e)
                  });
                a = {
                  msgEvents: u
                },
                  o.onpushevents(a)
              }
          }
        }
      },
      function (e, t, n) {
        "use strict";
        var r = n(4).fn;
        r.processFilter = function (e) {
          var t = this;
          switch (e.cmd) {
            case "sendFilterMsg":
              t.onSendMsg(e, !0);
              break;
            case "filterMsg":
              t.onMsg(e, !0);
              break;
            case "filterSysMsg":
              t.onSysMsg(e, !0);
              break;
            case "sendFilterCustomSysMsg":
              t.onSendSysMsg(e, !0)
          }
        }
      },
      function (e, t, n) {
        "use strict";
        var r = n(2).Promise,
          s = n(4).fn,
          o = n(1),
          i = o.objs2accounts,
          a = n(107),
          c = n(63);
        s.processFriend = function (e) {
          var t = this,
            n = e.obj,
            r = e.content,
            s = e.error;
          switch (e.cmd) {
            case "friendRequest":
              t.updateFriendSysMsg(e),
                s || t.onFriendRequest(n);
              break;
            case "syncFriendRequest":
              t.onFriendRequest(r, !0);
              break;
            case "deleteFriend":
              s || t.onDeleteFriend(n);
              break;
            case "syncDeleteFriend":
              t.onDeleteFriend(r, !0);
              break;
            case "updateFriend":
              s || t.onUpdateFriend(n);
              break;
            case "syncUpdateFriend":
              t.onUpdateFriend(r.friend, !0);
              break;
            case "getFriends":
              t.onFriends(e);
              break;
            case "syncFriends":
              t.onFriends(e);
              break;
            case "syncFriendUsers":
              t.onFriendUsers(e)
          }
        },
          s.onFriends = function (e) {
            function t() {
              f && m.forEach(function (e) {
                e = a.reverse(e),
                  e.valid ? p.push(e) : g.push(e)
              }),
                c.logger.info("friend::onFriends: parse friends", i(p), p, "delete", i(g), g),
                m.length ? (f = !0, o = e.content.timetag) : f = !1
            }
            function n(t, n) {
              e.promise = new r(function (e, r) {
                function i() {
                  d ? (s(), e(), t()) : u.getFriends().then(function (n) {
                    p = n,
                      s(),
                      e(),
                      t()
                  }).then(void 0,
                    function (e) {
                      e._msg = "get friends error",
                        r(e),
                        n(e)
                    })
                }
                f ? u.mergeFriends(p, g, o).then(function () {
                  i()
                }).then(void 0,
                  function (e) {
                    e._msg = "merge friends error",
                      r(e),
                      n(e)
                  }) : (c.logger.info("friend::onFriends: no merge friends"), i())
              }).then(void 0,
                function (e) {
                  throw e._msg = "merge friends data error",
                  n(e),
                  e
                })
            }
            function s() {
              c.timetags.friends = o,
                p.invalid = g,
                d ? (c.syncResult.friends = p, c.syncResult.invalidFriends = g) : (c.logger.info("friend::onFriends: get friends bingo", i(p), p), e.obj = p)
            }
            var o, c = this,
              u = c.db,
              l = e.error,
              d = c.packetFromSync(e),
              m = e.content.friends,
              f = !0,
              p = [],
              g = [],
              y = new r(function (e, r) {
                l ? d && r(l) : (t(), u.enable ? n(e, r) : (s(), e()))
              });
            d && (y.cmd = "friends", c.syncPromiseArray.push(y))
          },
          s.onFriendRequest = function (e, t) {
            var n = r.resolve(),
              s = this,
              o = s.db,
              i = e.type;
            i = e.type = a.getTypeFromByte(i) || i;
            var c = "addFriend" === i || "passFriendApply" === i;
            if (c) {
              var u = e.friend = a.assembleFriend(e.account);
              o.enable && (n = o.putFriend(u))
            }
            return t && s.onSyncFriendAction(e),
              n
          },
          s.onSyncFriendAction = function (e) {
            var t = this;
            t.logger.info("friend::onSyncFriendActionon:", e),
              t.options.onsyncfriendaction(e)
          },
          s.onDeleteFriend = function (e, t) {
            var n = r.resolve(),
              s = this,
              o = s.db;
            return o.enable && (n = o.deleteFriend(e.account)),
              t && (e.type = "deleteFriend", s.onSyncFriendAction(e)),
              n
          },
          s.onUpdateFriend = function (e, t) {
            var n = this,
              r = n.db,
              s = a.reverse(e);
            r.enable && r.updateFriend(s),
              t && n.onSyncFriendAction({
                type: "updateFriend",
                friend: s
              })
          },
          s.onFriendUsers = function (e) {
            var t = this,
              n = t.db,
              s = e.content,
              o = s.users.map(function (e) {
                return c.reverse(e)
              });
            t.logger.warn("friend::onFriendUsers: parse users", i(o), o);
            var a = s.timetag,
              u = r.resolve();
            n.enable && (u = n.mergeFriendUsers(o, a)),
              t.timetags.friendUsers = a,
              u.cmd = "friendUsers",
              t.syncPromiseArray.push(u),
              t.syncResult.users = o
          },
          s.updateFriendSysMsg = function (e) {
            var t, n, r = e.obj,
              s = e.error;
            if (e.obj.idServer) {
              if (s) t = "error",
                s = o.filterObj(s, "code message");
              else {
                var i = r.type;
                switch (i = a.getTypeFromByte(i) || i) {
                  case "passFriendApply":
                    t = "passed";
                    break;
                  case "rejectFriendApply":
                    t = "rejected"
                }
              }
              n = {
                idServer: r.idServer,
                state: t
              },
                s && (n.error = s),
                this.updateSysMsg(n)
            }
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(2).Promise,
          s = n(4).fn,
          o = n(1),
          i = o.undef,
          a = n(21),
          c = n(33),
          u = n(37),
          l = n(93);
        s.processMsg = function (e) {
          var t = this;
          switch (e.cmd) {
            case "sendMsg":
              t.onSendMsg(e);
              break;
            case "msg":
              t.onMsg(e);
              break;
            case "sysMsg":
              t.onSysMsg(e);
              break;
            case "broadcastMsg":
              t.onBroadcastMsg(e);
              break;
            case "sendCustomSysMsg":
              t.onSendSysMsg(e);
              break;
            case "getHistoryMsgs":
            case "searchHistoryMsgs":
              t.onHistoryMsgs(e);
              break;
            case "syncSendMsg":
              t.onMsg(e);
              break;
            case "deleteSessions":
              t.onDeleteSessions(e);
              break;
            case "sendMsgReceipt":
              t.onSendMsgReceipt(e);
              break;
            case "msgReceipt":
              t.onMsgReceipt(e);
              break;
            case "onDeleteMsg":
              t.onDeleteMsg(e);
              break;
            case "onMsgDeleted":
              t.onMsgDeleted(e);
              break;
            case "onDeleteMsgOfflineRoaming":
              t.onDeleteMsgOfflineRoaming(e);
              break;
            case "onMarkSessionAck":
              t.onMarkSessionAck(e);
              break;
            case "syncMarkSessionAck":
              t.syncMarkSessionAck(e)
          }
        },
          s.checkIgnore = function (e) {
            var t = this;
            e.forEach(function (e) {
              "notification" === e.type && !e.ignore && t.options.shouldIgnoreNotification(e) && (e.ignore = !0)
            })
          },
          s.filterIgnore = function (e) {
            return e.filter(function (e) {
              return !e.ignore
            })
          },
          s.genSessionByMsgs = function (e) {
            var t = this;
            return t.checkIgnore(e),
              u.genSessionByMsgs(t.message.Message, e)
          },
          s.onRoamingMsgs = function (e) {
            var t = this,
              n = t.message,
              r = n.Message,
              s = r.getMaxTimetag,
              o = n.reverseMsgs(e.content.msgs),
              i = s(o);
            o = r.sortMsgs(o),
              o = r.deduplication(o);
            var a = o[0],
              c = a.sessionId,
              u = t.genSessionByMsgs(o);
            t.cacheSyncedSession(u);
            var l = t.putMsg(o, "roamingMsgs").then(function (e) {
              o = e,
                o = t.filterIgnore(o),
                o.length && (t.logger.info("msg::onRoamingMsgs: putRoamingMsgs", c, o.length, o), t.syncResult.roamingMsgs = t.syncResult.roamingMsgs || [], t.syncResult.roamingMsgs.push({
                  sessionId: c,
                  scene: a.scene,
                  to: a.target,
                  msgs: o,
                  timetag: i
                }))
            });
            l.cmd = "roamingMsgs-" + c,
              t.syncPromiseArray.push(l)
          },
          s.onOfflineMsgs = function (e, t) {
            function n(e) {
              if (l.length) {
                var t = o.getMaxTimetag(l),
                  n = l[0].scene,
                  s = l[0].target;
                r.markMsgRead(l),
                  l = o.sortMsgs(l),
                  l = o.deduplication(l);
                var i = r.genSessionByMsgs(l);
                r.cacheSyncedSession(i),
                  c = r.putMsg(l, "offlineMsgs").then(function (o) {
                    l = o,
                      l = r.filterIgnore(l),
                      l.length && (r.logger.info("msg::onOfflineMsgs： toreLastSession", m, e, l.length, l), r.syncResult[m] = r.syncResult[m] || [], r.syncResult[m].push({
                        sessionId: e,
                        scene: n,
                        to: s,
                        msgs: l,
                        timetag: t
                      }))
                  }),
                  c.cmd = "offlineMsgs-" + e,
                  r.syncPromiseArray.push(c)
              }
            }
            var r = this,
              s = r.message,
              o = s.Message,
              i = null;
            t && (i = {
              filter: !0
            });
            var a, c, u = s.reverseMsgs(e.content.msgs, {
              modifyObj: i
            }),
              l = [],
              d = "",
              m = t ? "offlineFilterMsgs" : "offlineMsgs";
            u.forEach(function (e) {
              a = e.sessionId,
                a !== d ? (n(d), l = [], l.push(e), d = a) : l.push(e)
            }),
              n(d)
          },
          s.markUnreadByMsgsPromise = function (e) {
            var t = this,
              n = t.db;
            n.enable && n.getSession(e).then(function (n) {
              n.ack && t.markUnreadBySessionAck({
                sessionId: e,
                ack: n.ack
              })
            })
          },
          s.completeMsg = function (e) {
            var t = this;
            return e.from = t.account,
              e.fromNick = t.myInfo && t.myInfo.nick,
              e.fromClientType = "Web",
              e.fromDeviceId = a.deviceId,
              e.time || (e.time = +new Date),
              e
          },
          s.onMsgs = function (e) {
            var t = this;
            t.message.reverseMsgs(e.content.msgs, {
              mapper: function (e) {
                t.handleMsg(e)
              }
            })
          },
          s.onMsg = function (e, t) {
            var n = this,
              r = n.message.reverse(e.content.msg);
            t && (r.filter = !0),
              n.syncing ? n.unhandledMsgs.push({
                type: "onMsg",
                msg: r
              }) : n.handleMsg(r)
          },
          s.onBroadcastMsgs = function (e) {
            var t = this,
              n = e.content.broadcastMsgs;
            n = n.sort(function (e, t) {
              return e.broadcastId - t.broadcastId
            }),
              t.putBroadcastMsgs(n)
          },
          s.onBroadcastMsg = function (e) {
            var t = this,
              n = e.content.broadcastMsg;
            n.time = n.timestamp,
              t.syncing ? t.unhandledMsgs.push({
                type: "onBroadcastMsg",
                msg: n
              }) : n && t.putBroadcastMsg(n)
          },
          s.pushMsgTask = function (e) {
            var t = this;
            t.msgPromise = t.msgPromise.then(function () {
              return e()
            })
          },
          s.handleMsg = function (e) {
            var t = this,
              n = e.time;
            t.markMsgRead(e),
              t.msgPromise = t.msgPromise.then(function () {
                return t.putMsg(e, "onMsg")
              }).then(function (r) {
                return e = r[0],
                  t.updateRoamingMsgTimetag(n)
              }).then(function () {
                if (e) return t.checkUserUpdate(e)
              }).then(function () {
                if (e) {
                  var n = e.type;
                  switch (t.logger.log("msg::handleMsg:checkUserUpdate: " + e.scene + " " + n + " msg" + ("notification" === n ? " " + e.attach.type : ""), e), n) {
                    case "notification":
                      return t.onTeamNotificationMsg(e)
                  }
                }
              }).then(function () {
                e && !e.ignore && (t.logger.info("msg::handleMsg:onmsg: ", e), setTimeout(function () {
                  t.options.onmsg(o.copy(e))
                },
                  0))
              }).then(void 0,
                function (e) {
                  e.callFunc = "msg::handleMsg",
                    t.onCustomError("消息处理错误", e)
                })
          },
          s.putMsg = function (e, t) {
            function n(e) {
              "roamingMsgs" !== t && "offlineMsgs" !== t || s.cacheSyncedSession(e)
            }
            if (o.isArray(e) || (e = [e]), e[0].filter) return r.resolve(e);
            var s = this,
              a = s.db,
              c = a.enable,
              u = r.resolve(),
              l = s.message.Message,
              d = l.getLastMsg(e),
              m = d.flow,
              f = d.sessionId !== s.currSessionId,
              p = s.genSessionByMsgs(e);
            n(p);
            var g = !1,
              y = [];
            return s.checkIgnore(e),
              u = u.then(function () {
                return c || s.options.autoMarkRead || "roamingMsgs" === t || !p || (s.sessionUnreadMsgs = s.sessionUnreadMsgs || {},
                  s.sessionUnreadMsgs[p.id] = s.sessionUnreadMsgs[p.id] || [], s.sessionUnreadMsgs[p.id] = s.sessionUnreadMsgs[p.id].concat(e.filter(function (e) {
                    var t = s.options.shouldCountNotifyUnread(e);
                    return t
                  }))),
                  c && "roamingMsgs" !== t && "offlineMsgs" !== t ? (s.logger.log("msg::putMsg:db.putMsg: ", p), a.putMsg(e)) : e
              }).then(function (t) {
                var n = [];
                return e.forEach(function (e) {
                  s.checkMsgUnique(e) && n.push(e)
                }),
                  e = n,
                  y = c ? t : e,
                  r.resolve(e)
              }),
              u = u.then(function (e) {
                return e.length && (p = s.genSessionByMsgs(e), n(p), c && p) ? new r(function (t, n) {
                  a.getSessions({
                    sessionId: p.id
                  }).then(function (n) {
                    if (n && n.lastMsg) {
                      var r = n.lastMsg;
                      p.lastMsg && p.lastMsg.time < r.time && (p.lastMsg = r)
                    }
                    s.logger.log("msg::putMsg:db.getSessions: ", p),
                      y.length ? p ? a.putSession(p).then(function (e) {
                        t(e)
                      }) : t(n) : (g = !0, y = e, t(n))
                  })
                }) : r.resolve(p)
              }),
              u = u.then(function (e) {
                if (p && y.length) {
                  var r = "roamingMsgs" === t,
                    o = s.options.syncSessionUnread,
                    u = p.id,
                    l = s.findSession(u) || {},
                    d = l.ack || 0,
                    h = "offlineMsgs" === t || r && o || "onMsg" === t && "in" === m && f;
                  if (h) {
                    c && e ? (p = e, d = d || p.ack || 0) : (e = l, e && (p.unread = e.unread || 0)),
                      n(p),
                      p.unread = p.unread || 0;
                    var v = 0;
                    if (y.forEach(function (e) {
                      var t = s.options.shouldCountNotifyUnread(e),
                        n = ("notification" !== e.type || "notification" === e.type && t) && (i(e.isUnreadable) || e.isUnreadable);
                      if (n && o && (n = e.time > d && "out" !== e.flow), n && (v++ , o && !c)) {
                        var r = l.unreadMsgs || [];
                        r.push(e),
                          p.unreadMsgs = r
                      }
                    }), p.unread += v, s.logger.log("msg::putMsg:updateSession: ", p), n(p), c && !g) return a.updateSession({
                      id: p.id,
                      unread: p.unread
                    })
                  }
                }
              }),
              "onMsg" === t ? u = u.then(function () {
                e.length && p && (s.onUpdateSession(p), s.options.syncSessionUnread && !f && s.api.resetSessionUnread(s.currSessionId))
              }) : "sendMsg" === t && !f && p && p.lastMsg && p.lastMsg.isLocal && (s.onUpdateSession(p), s.api.resetSessionUnread(s.currSessionId)),
              u.then(function () {
                return r.resolve(e)
              })
          },
          s.putBroadcastMsgs = function (e) {
            var t = this,
              n = t.db,
              s = e.length;
            if (s > 0) {
              if (t.doMarkBroadcastMsgsRead(e), n.enable) {
                var i = e[s - 1].broadcastId;
                return n.updateBroadcastMsgTimetag(i),
                  n.putBroadcastMsg(e).then(function () {
                    return setTimeout(function () {
                      t.doMarkMsgsRead(),
                        t.options.onbroadcastmsgs(o.copy(e))
                    },
                      0),
                      r.resolve(e)
                  })
              }
              setTimeout(function () {
                t.options.onbroadcastmsgs(o.copy(e))
              },
                0)
            }
            return e
          },
          s.putBroadcastMsg = function (e) {
            var t = this,
              n = t.db;
            return t.doMarkBroadcastMsgsRead([e]),
              n.enable ? (e.broadcastId && n.updateBroadcastMsgTimetag(e.broadcastId), n.putBroadcastMsg(e).then(function () {
                return setTimeout(function () {
                  t.options.onbroadcastmsg(o.copy(e))
                },
                  0),
                  r.resolve(e)
              })) : (setTimeout(function () {
                t.options.onbroadcastmsg(o.copy(e))
              },
                0), e)
          },
          s.doMarkBroadcastMsgsRead = function (e) {
            var t = 7,
              n = 17;
            e = e.map(function (e) {
              return e.broadcastId
            }),
              this.sendCmd("batchMarkRead", {
                sid: t,
                cid: n,
                ids: e
              })
          },
          s.cacheSyncedSession = function (e) {
            var t = this;
            if (e && t.syncResult) {
              e = o.merge({},
                e),
                t.syncResult.sessions = t.syncResult.sessions || {};
              var n = e.id;
              t.syncResult.sessions[n] = o.merge(t.syncResult.sessions[n], e),
                i(t.syncResult.sessions[n].unread) && (t.syncResult.sessions[n].unread = 0),
                t.mergeSession(t.syncResult.sessions[n])
            }
          },
          s.checkMsgUnique = o.genCheckUniqueFunc("idClient"),
          s.storeSendMsg = function (e) {
            var t = this;
            if (!t.syncing) {
              var n = t.putMsg(e, "sendMsg");
              return t.msgPromise = t.msgPromise.then(function () {
                return n
              }),
                n
            }
            t.unhandledMsgs.push({
              type: "sendMsg",
              msg: e
            })
          },
          s.updateSendMsgError = function (e) {
            var t = this;
            if (!t.syncing) {
              var n = t.updateMsg(e);
              return t.msgPromise = t.msgPromise.then(function () {
                return n
              }),
                n
            }
            t.unupdatedMsgs.push(e)
          },
          s.onSendMsg = function (e, t) {
            var n = this,
              s = e.obj && e.obj.msg || e.content.msg;
            n.completeMsg(s);
            var o = e.error && 7101 === e.error.code;
            e.error && !o || (s.idServer = e.content.msg.idServer, s.time = +e.content.msg.time),
              e.error ? s.status = "fail" : s.status = "success",
              s = n.message.reverse(s),
              t && (s.filter = !0),
              e.obj = s,
              n.syncing ? n.unupdatedMsgs.push(s) : n.msgPromise = r.all([n.msgPromise, e.obj.promise]).then(function (e) {
                return e.length || (s.resend = !0),
                  n.updateMsg(s).then(function () {
                    return n.options.syncSessionUnread && n.currSessionId === s.sessionId && n.api.resetSessionUnread(n.currSessionId),
                      n.resolveMsgReceiptTask(s),
                      s
                  })
              })
          },
          s.updateLocalMsg = function (e) {
            var t = this,
              n = t.updateMsg(e);
            return t.msgPromise = t.msgPromise.then(function () {
              return n
            }),
              n
          },
          s.updateMsg = function (e) {
            if (e.filter) return r.resolve(e);
            var t = this,
              n = t.db,
              s = "success" === e.status,
              o = u.genSessionByMsg(e),
              i = !!e.isLocal;
            return t.onUpdateSession(o),
              n.enable ? n.updateMsg(e).then(function (e) {
                var t = n.updateSession(o),
                  a = r.resolve();
                return s && e && !i && (a = n.updateRoamingMsgTimetag(e.time)),
                  r.all([t, a])
              }) : (s && !i && (t.timetags.roamingMsgs = e.time), r.resolve(e))
          },
          s.updateRoamingMsgTimetag = function (e) {
            var t = this,
              n = t.db;
            return n.enable ? n.updateRoamingMsgTimetag(e) : (t.timetags.roamingMsgs = e, r.resolve(e))
          },
          s.checkUserUpdate = function (e) {
            var t = this,
              n = e.from;
            return n === t.account ? r.resolve() : new r(function (r) {
              function s() {
                t.api.getUser({
                  account: n,
                  sync: !0,
                  done: function (e, n) {
                    e || setTimeout(function () {
                      t.logger.log("user::checkUserUpdate: onupdateuser", n.account, n),
                        t.options.onupdateuser(n)
                    },
                      0),
                      r()
                  }
                })
              }
              var i = t.userSet[n];
              if (i) {
                var a = +i.updateTime,
                  c = +e.userUpdateTime; !isNaN(a) && !isNaN(c) && o.isNumber(a) && o.isNumber(c) && a < c ? s() : r()
              } else s()
            })
          },
          s.processUnsettledMsgs = function () {
            var e = this;
            e.unhandledMsgs.forEach(function (t) {
              var n = t.msg;
              switch (t.type) {
                case "onMsg":
                  e.handleMsg(n);
                  break;
                case "sendMsg":
                  e.msgPromise = e.msgPromise.then(function () {
                    return e.putMsg(n)
                  });
                  break;
                case "onBroadcastMsg":
                  e.msgPromise = e.msgPromise.then(function () {
                    return e.putBroadcastMsg(n)
                  })
              }
            }),
              e.unupdatedMsgs.forEach(function (t) {
                e.msgPromise = e.msgPromise.then(function () {
                  return e.updateMsg(t)
                })
              }),
              e.resetUnsettledMsgs()
          },
          s.onTeamNotificationMsg = function (e) {
            var t = this,
              n = t.db,
              r = e.attach,
              s = r.type,
              o = e.from,
              i = e.to,
              a = e.time,
              c = r.team,
              u = r.account,
              l = r.accounts;
            switch (s) {
              case "updateTeam":
                if (!n.enable) return;
                return c.updateTime = a,
                  t.onUpdateTeam(c),
                  n.updateTeam(c);
              case "addTeamMembers":
                return t.onAddTeamMembers(e, c, l);
              case "removeTeamMembers":
                return t.onRemoveTeamMembers(c, i, l);
              case "acceptTeamInvite":
                return t.onAddTeamMembers(e, c, [o]);
              case "passTeamApply":
                return t.onAddTeamMembers(e, c, [u]);
              case "addTeamManagers":
                return t.updateTeamManagers(e, i, l, !0, a);
              case "removeTeamManagers":
                return t.updateTeamManagers(e, i, l, !1, a);
              case "leaveTeam":
                return t.onRemoveTeamMembers(c, i, [o]);
              case "dismissTeam":
                return t.onDismissTeam(i, a);
              case "transferTeam":
                return t.transferTeam(e, c, o, u);
              case "updateTeamMute":
                return t.onUpdateTeamMembersMute(e, c, [u], r.mute)
            }
          },
          s.onAddTeamMembers = function (e, t, n) {
            var s = this,
              i = s.db,
              a = t.teamId,
              u = c.assembleMembers(t, n);
            e.attach.members = u;
            var l = {
              team: t,
              accounts: n,
              members: u
            };
            if (s.logger.info("team::onAddTeamMembers: ", l), s.options.onAddTeamMembers(o.simpleClone(l)), i.enable) {
              var d, m = i.putTeam(t),
                f = n.indexOf(s.account) === -1;
              return f ? d = i.putTeamMembers(u) : (s.logger.warn("team::onAddTeamMembers: user join team", a), m = new r(function (e) {
                s.api.getTeamMembers({
                  teamId: a,
                  sync: !0,
                  done: function () {
                    e()
                  }
                })
              })),
                r.all([d, m])
            }
          },
          s.onRemoveTeamMembers = function (e, t, n) {
            var s = this,
              i = s.db,
              a = {
                team: e,
                accounts: n
              };
            if (s.logger.info("team::onRemoveTeamMembers:", a), s.options.onRemoveTeamMembers(o.simpleClone(a)), i.enable) {
              if (n.indexOf(s.account) === -1) {
                var c = i.removeTeamMembersByAccounts(t, n),
                  u = r.resolve();
                return e && (u = i.putTeam(e)),
                  r.all([c, u])
              }
              return i.leaveTeam(t)
            }
          },
          s.updateTeamManagers = function (e, t, n, s, i) {
            var a = this,
              u = a.db,
              l = e.attach.members = n.map(function (e) {
                return {
                  id: c.genId(t, e),
                  type: s ? "manager" : "normal",
                  updateTime: i
                }
              }),
              d = {
                teamId: "" + t,
                memberUpdateTime: i
              };
            e.attach.team = d;
            var m = {
              team: d,
              accounts: n,
              isManager: s,
              members: l
            };
            if (a.logger.info("team::updateTeamManagers:", m), a.options.onUpdateTeamManagers(o.simpleClone(m)), u.enable) {
              var f = u.updateTeam(d),
                p = u.updateTeamManagers(t, n, s, i);
              return r.all([f, p])
            }
          },
          s.onDismissTeam = function (e, t) {
            var n = this,
              r = n.db,
              s = {
                teamId: e
              };
            if (n.logger.info("team::onDismissTeam:", s), n.options.onDismissTeam(s), r.enable) return r.dismissTeam(e, t)
          },
          s.transferTeam = function (e, t, n, r) {
            var s = this,
              i = s.db,
              a = t.teamId,
              u = t.memberUpdateTime,
              l = {
                id: c.genId(a, n),
                type: "normal",
                updateTime: u
              },
              d = {
                id: c.genId(a, r),
                type: "owner",
                updateTime: u
              };
            e.attach.members = [l, d];
            var m = {
              team: t,
              from: l,
              to: d
            };
            if (s.logger.info("team::transferTeam:", m), s.options.onTransferTeam(o.simpleClone(m)), i.enable) return i.transferTeam(t, n, r)
          },
          s.onUpdateTeamMembersMute = function (e, t, n, s) {
            var i = this,
              a = i.db,
              u = n.map(function (e) {
                return {
                  id: c.genId(t.teamId, e),
                  account: e,
                  teamId: t.teamId,
                  mute: s,
                  updateTime: t.memberUpdateTime
                }
              });
            e.attach.members = u;
            var l = {
              team: t,
              accounts: n,
              members: u,
              mute: s
            };
            if (i.logger.info("team::onUpdateTeamMembersMute:", l), i.options.onUpdateTeamMembersMute(o.simpleClone(l)), a.enable) {
              var d = a.updateTeamMembers(u),
                m = a.putTeam(t);
              return r.all([d, m])
            }
          },
          s.onHistoryMsgs = function (e) {
            e.error || (e.obj.msgs = this.message.reverseMsgs(e.content.msgs))
          },
          s.isFilterMsgs = function (e) {
            return !!e[0].filter
          },
          s.splitMsgs = function (e, t, n, r) {
            e.forEach(function (e) {
              if (e.filter) r.push(e);
              else switch (e.scene) {
                case "p2p":
                  t.push(e);
                  break;
                case "team":
                  n.push(e)
              }
            })
          },
          s.markMsgRead = function (e, t) {
            o.isArray(e) || (e = [e]);
            var n = this,
              r = n.db;
            if (r.enable || n.options.autoMarkRead || t) {
              var s = [],
                i = [],
                a = [];
              n.splitMsgs(e, s, i, a),
                n.markP2pMsgsRead(s),
                n.markTeamMsgsRead(i),
                n.markFilterMsgsRead(a)
            }
          },
          s.markP2pMsgsRead = function (e) {
            if (e.length) {
              var t = l.idMap.msg.id,
                n = l.idMap.msg.msg;
              this.doMarkMsgsRead(t, n, e)
            }
          },
          s.markTeamMsgsRead = function (e) {
            if (e.length) {
              var t = l.idMap.team.id,
                n = l.idMap.team.teamMsg;
              this.doMarkMsgsRead(t, n, e)
            }
          },
          s.markFilterMsgsRead = function (e) {
            if (e.length) {
              var t = l.idMap.filter.id,
                n = l.idMap.filter.filterMsg;
              this.doMarkMsgsRead(t, n, e)
            }
          },
          s.markSysMsgRead = function (e, t) {
            o.isArray(e) || (e = [e]);
            var n = this,
              r = n.db;
            if (r.enable || n.options.autoMarkRead || t) {
              var s, i;
              n.isFilterMsgs(e) ? (s = l.idMap.filter.id, i = l.idMap.filter.filterSysMsg) : (s = l.idMap.msg.id, i = l.idMap.msg.sysMsg),
                n.doMarkMsgsRead(s, i, e)
            }
          },
          s.doMarkMsgsRead = function (e, t, n) {
            n && n.length && this.sendCmd("batchMarkRead", {
              sid: e,
              cid: t,
              ids: n.map(function (e) {
                return e.idServer
              })
            })
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(2).Promise,
          s = n(4).fn,
          o = n(38),
          i = n(37),
          a = n(1);
        s.onDeleteMsg = function (e) {
          delete e.obj.sysMsg,
            e.error || (e.promise = this.deleteLocalMsg(e.obj.msg))
        },
          s.onMsgDeleted = function (e) {
            if (!e.error) {
              var t = this,
                n = t.db,
                r = o.reverse(e.content.sysMsg);
              r = t.processDeleteMsgSysMsg(r),
                t.markSysMsgRead(r),
                t.deleteLocalMsg(r.msg).then(function () {
                  n.enable && n.updateDeleteMsgTimetag(r.time + 1),
                    t.handleSysMsg(r)
                })
            }
          },
          s.processDeleteMsgSysMsg = function (e) {
            var t = this;
            return e.msg = {},
              ["scene", "from", "to"].forEach(function (t) {
                e.msg[t] = e[t]
              }),
              e.msg.idClient = e.deletedIdClient,
              e.msg.idServer = e.deletedIdServer,
              e.msg.time = e.deletedMsgTime,
              e.msg.fromNick = e.deletedMsgFromNick,
              e.opeAccount = e.opeAccount || e.from,
              e.msg.opeAccount = e.opeAccount,
              t.message.Message.setExtra(e.msg, t.account),
              e
          },
          s.onDeleteMsgOfflineRoaming = function (e) {
            if (!e.error) {
              var t = this,
                n = 1 === +e.content.type ? "offline" : "roaming",
                r = o.reverseSysMsgs(e.content.sysMsgs, {
                  mapper: function (e) {
                    return t.processDeleteMsgSysMsg(e)
                  }
                });
              t.logger.info("msg::onDeleteMsgOfflineRoaming: on delete " + n, r),
                "offline" === n && t.markSysMsgRead(r);
              var s = e.content.timetag;
              t.timetags.deleteMsg = s,
                t.syncResult.deleteMsgTimetag = s;
              var i = t.putSysMsg(r, "offlineSysMsgs");
              i.cmd = "deleteMsgSysMsgs " + n,
                t.syncPromiseArray.push(i),
                t.syncResult.deleteMsgSysMsgs = t.syncResult.deleteMsgSysMsgs || [],
                t.syncResult.deleteMsgSysMsgs.push({
                  type: n,
                  sysMsgs: r
                })
            }
          },
          s.deleteMsgOfflineRoaming = function (e, t) {
            if (!e) return r.resolve();
            var n = this;
            n.logger.info("msg::deleteMsgOfflineRoaming: ", e, t);
            var s = n.db,
              o = [];
            return e.forEach(function (e) {
              e.sysMsgs.forEach(function (e) {
                var r = n.deleteLocalMsg(e.msg, {
                  cbUpdateSession: function (e) {
                    e = n.mergeSession(e),
                      e = a.simpleClone(e),
                      i.trim(e);
                    var r = a.findObjIndexInArray(t, {
                      value: e.id
                    });
                    if (r !== -1 && (t[r] = a.merge({},
                      t[r], e)), s.enable) return s.updateSession(e)
                  }
                });
                o.push(r)
              })
            }),
              r.all(o).then(function () {
                if (s.enable) return s.updateDeleteMsgTimetag(n.syncResult.deleteMsgTimetag)
              })
          },
          s.deleteLocalMsg = function (e, t) {
            var n = this,
              s = n.db;
            t = t || {};
            var o = t.cbUpdateSession || n.updateLocalSession.bind(n);
            if (s.enable && e) {
              var i = !1,
                a = null,
                c = e.sessionId;
              return s.getMsgs({
                sessionId: c,
                limit: 1
              }).then(function (t) {
                t && t[0] && t[0].idClient === e.idClient && (i = !0)
              }).then(function () {
                return s.deleteMsg(e.idClient)
              }).then(function () {
                if (i) return s.getMsgs({
                  sessionId: c,
                  limit: 1
                })
              }).then(function (e) {
                if (i) return e && e[0] && (a = e[0]),
                  o({
                    id: c,
                    lastMsg: a
                  })
              })
            }
            return r.resolve()
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(2).Promise,
          s = n(4).fn,
          o = n(1);
        s.onOfflineMsgReceipts = function (e) {
          var t, n = this,
            s = n.db,
            o = e.content.msgReceipts,
            i = n.syncResult.msgReceipts = [],
            a = [],
            c = "msgReceipts",
            u = n.syncResult.sessions || {};
          o.forEach(function (e) {
            e.time = +e.time;
            var o = e.sessionId = "p2p-" + e.from;
            c += "-" + o,
              t = r.resolve();
            var l = u[o];
            s.enable ? t = s.getSession(o).then(function (t) {
              if (t = t || l, t && n.shouldUpdateSessionFromMsgReceipt(t, e)) {
                var r = n.genSessionFromMsgReceipt(t, e),
                  i = n.syncResult.sessions;
                return i && i[o] && (i = i[o], i.lastMsg && r.lastMsg && i.lastMsg.time > r.lastMsg.time && (r.lastMsg = i.lastMsg)),
                  s.putSession(r).then(function (e) {
                    e && n.cacheSyncedSession(e)
                  })
              }
            }) : l && i.push(e),
              a.push(t)
          }),
            t = r.all(a).then(function () {
              if (s.enable) return s.updateMsgReceiptsTimetag(e.content.timetag)
            }),
            t.cmd = c,
            n.syncPromiseArray.push(t)
        },
          s.mergeSessionAndMsgReceipts = function (e, t) {
            var n = this,
              r = {};
            return e = e || [],
              t = t || [],
              e.forEach(function (e) {
                r[e.id] = e
              }),
              t.forEach(function (t) {
                var s = r[t.sessionId];
                if (n.shouldUpdateSessionFromMsgReceipt(s, t)) {
                  var o = n.genSessionFromMsgReceipt(s, t);
                  e = n.api.mergeSessions(e, o)
                }
              }),
              e
          },
          s.shouldUpdateSessionFromMsgReceipt = function (e, t) {
            return !e || !e.msgReceiptServerTime || t.time > e.msgReceiptServerTime
          },
          s.genSessionFromMsgReceipt = function (e, t) {
            var n = t.time,
              r = {
                id: t.sessionId,
                msgReceiptTime: n,
                msgReceiptServerTime: n
              };
            return e && e.id === t.sessionId && (r = o.merge({},
              e, r)),
              e && e.updateTime || (r.updateTime = n),
              r
          },
          s.onMsgReceipt = function (e) {
            var t = this,
              n = t.db,
              s = e.content.msgReceipt;
            s.time = +s.time;
            var o = s.idClient,
              i = r.resolve();
            n.enable && o && (i = n.getMsgByIdClient(o)),
              i.then(function (e) {
                var n;
                if (e) {
                  if (!e.idServer) return void (t.msgReceiptTasks[o] = s);
                  n = e.time
                } else n = s.time;
                s.msgReceiptTime = n,
                  t.updateSessionMsgReceiptTime(s)
              })
          },
          s.resolveMsgReceiptTask = function (e) {
            var t = this,
              n = t.msgReceiptTasks[e.idClient];
            n && (n.msgReceiptTime = e.time, this.updateSessionMsgReceiptTime(n))
          },
          s.updateSessionMsgReceiptTime = function (e) {
            var t = this,
              n = t.db,
              r = {
                id: "p2p-" + e.from,
                msgReceiptTime: e.msgReceiptTime,
                msgReceiptServerTime: e.time
              };
            n.enable && n.putSession(r),
              t.onUpdateSession(r)
          },
          s.onSendMsgReceipt = function (e) {
            var t = this;
            if (!e.error) {
              var n = e.obj.msgReceipt,
                r = +n.time,
                s = +e.content.msgReceipt.time,
                o = t.sessionSet["p2p-" + n.to];
              o.msgReceiptSendTime = Math.min(r, s)
            }
          },
          s.shouldSendMsgReceipt = function (e) {
            if (e && "p2p" === e.scene && "success" === e.status) {
              var t = this.sessionSet[e.sessionId];
              if (t) {
                var n = t.msgReceiptSendTime;
                return !n || n < e.time
              }
            }
            return !1
          },
          s.isMsgRemoteRead = function (e) {
            var t = this;
            if (e && "p2p" === e.scene && "out" === e.flow && "success" === e.status) {
              var n = t.sessionSet[e.sessionId];
              if (n && n.msgReceiptTime) return e.time <= n.msgReceiptTime
            }
            return !1
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(2).Promise,
          s = n(4).fn,
          o = n(1),
          i = n(92);
        s.processNotify = function (e) {
          var t = this;
          switch (e.cmd) {
            case "syncOfflineMsgs":
              t.onOfflineMsgs(e);
              break;
            case "batchMarkRead":
              break;
            case "syncOfflineSysMsgs":
              t.onOfflineSysMsgs(e);
              break;
            case "syncRoamingMsgs":
              t.onRoamingMsgs(e);
              break;
            case "syncOfflineFilterMsgs":
              t.onOfflineMsgs(e, !0);
              break;
            case "syncOfflineFilterSysMsgs":
              t.onOfflineSysMsgs(e, !0);
              break;
            case "syncMsgReceipts":
              t.onOfflineMsgReceipts(e);
              break;
            case "syncDonnop":
              t.onDonnop(e, !0);
              break;
            case "syncSessionAck":
              t.syncSessionAck(e);
              break;
            case "syncRobots":
              t.onRobots(e);
              break;
            case "syncBroadcastMsgs":
              t.onBroadcastMsgs(e)
          }
        },
          s.onDonnop = function (e, t) {
            if (!e.error) {
              var n = this,
                r = n.db,
                s = i.reverse(e.content.donnop);
              n.mergeDonnop(s);
              var o = n.dbDonnop();
              if (t) {
                var a = e.content.timetag;
                n.timetags.donnop = a,
                  r.enable && (o = o.then(function () {
                    return n.db.updateDonnopTimetag(a)
                  })),
                  o.cmd = "donnop",
                  n.syncPromiseArray.push(o)
              } else n.onPushNotificationMultiportConfigUpdate()
            }
          },
          s.onUpdateDonnop = function (e) {
            var t = this;
            if (!e.error) {
              var n = e.obj;
              n && (t.mergeDonnop(o.filterObj(n, ["shouldPushNotificationWhenPCOnline"])), t.dbDonnop(), t.onPushNotificationMultiportConfigUpdate())
            }
          },
          s.getPushNotificationMultiportConfig = function () {
            var e = this;
            return o.merge({},
              e.pushNotificationMultiportConfig)
          },
          s.mergeDonnop = function (e) {
            var t = this;
            t.pushNotificationMultiportConfig = o.merge({},
              t.pushNotificationMultiportConfig, e)
          },
          s.dbDonnop = function () {
            var e = this,
              t = e.db;
            return t.enable ? e.db.setDonnop(e.pushNotificationMultiportConfig) : r.resolve()
          },
          s.onPushNotificationMultiportConfigUpdate = function () {
            var e = this;
            setTimeout(function () {
              var t = e.getPushNotificationMultiportConfig();
              e.logger.info("link::onPushNotificationMultiportConfigUpdate:", t),
                e.options.onPushNotificationMultiportConfigUpdate(t)
            })
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(4).fn,
          s = n(1);
        r.onRobots = function (e) {
          var t = this,
            n = e.content;
          if (s.isFunction(t.options.onrobots) && Array.isArray(n.robots)) {
            var r = n.robots.filter(function (e) {
              return !!e.botid
            });
            r.length > 0 && t.options.onrobots(r || [])
          }
        }
      },
      function (e, t, n) {
        "use strict";
        var r = n(2).Promise,
          s = n(4).fn,
          o = n(1),
          i = n(37),
          a = n(5);
        s.mergeSession = function (e) {
          e = o.copyWithNull(e);
          var t = this.sessionSet,
            n = e.id,
            r = t[n];
          if (r && r.lastMsg && e && e.lastMsg && e.lastMsg.isLocal) {
            var s = r.lastMsg.time || 0,
              i = e.lastMsg.time || 0;
            if (i < s) return r
          }
          return t[n] = o.merge(r, e),
            e = t[n],
            o.undef(e.unread) && (e.unread = 0),
            e
        },
          s.mergeSessions = function (e) {
            var t = this;
            e.forEach(function (e) {
              t.mergeSession(e)
            })
          },
          s.deleteLocalSession = function (e) {
            var t = this;
            o.isArray(e) || (e = [e]),
              e.forEach(function (e) {
                delete t.sessionSet[e]
              })
          },
          s.onDeleteSessions = function (e) {
            e.obj = e.obj.sessions.map(function (e) {
              return i.parse(e)
            })
          },
          s.onUpdateSession = function (e) {
            var t = this;
            return new r(function (n) {
              e ? (e = t.mergeSession(e), e = o.simpleClone(e), i.trim(e), i.isComplete(e) && setTimeout(function () {
                t.logger.info("session::onUpdateSession:", e.id, o.simpleClone(e)),
                  t.options.onupdatesession(e),
                  n(e)
              },
                0)) : n(e)
            })
          },
          s.setCurrSession = function (e) {
            var t = this;
            e = "" + e,
              t.currSessionId = e,
              t.logger.info("session::setCurrSession:", e)
          },
          s.findSession = function (e) {
            return this.sessionSet[e]
          },
          s.resetSessionUnread = function (e) {
            function t() {
              n = {
                id: e,
                unread: 0
              },
                r.onUpdateSession(n)
            }
            e = "" + e;
            var n, r = this,
              s = r.db;
            if (!r.findSession(e)) return void r.logger.warn("session::resetSessionUnread: no session " + e);
            if (s.enable && s.resetSessionUnread(e), !r.options.autoMarkRead && r.sessionUnreadMsgs && r.sessionUnreadMsgs[e]) {
              var o = r.sessionUnreadMsgs[e];
              r.markMsgRead(o, !0),
                r.sessionUnreadMsgs[e] = []
            }
            t()
          },
          s.insertLocalSession = function (e) {
            var t = this,
              n = t.db,
              s = t.sessionSet;
            return new r(function (c, u) {
              var l = e.scene,
                d = e.to,
                m = l + "-" + d,
                f = t.findSession(m);
              if (f) u(a.sessionExist({
                callFunc: "session::insertLocalSession",
                session: f
              }));
              else {
                var p;
                if (o.isNumber(e.updateTime)) p = e.updateTime;
                else {
                  var g, y = [];
                  for (var h in s) s.hasOwnProperty(h) && (g = s[h], o.isNumber(g.updateTime) && y.push(g.updateTime));
                  p = Math.max.apply(Math, y) + 1,
                    p = Math.max(p, +new Date)
                }
                var v = r.resolve();
                n.enable && (v = n.getMsgs({
                  sessionId: m,
                  limit: 1
                })),
                  v.then(function (e) {
                    if (o.isArray(e) && 1 === e.length) {
                      var r = e[0];
                      f = i.genSessionByMsg(r),
                        f.updateTime = p
                    } else f = {
                      id: m,
                      scene: l,
                      to: d,
                      updateTime: p,
                      lastMsg: null
                    };
                    n.enable ? n.putSession(f).then(c, u) : c(f),
                      t.onUpdateSession(f)
                  })
              }
            })
          },
          s.updateLocalSession = function (e, t) {
            var n = this;
            return new r(function (s, i) {
              var c = n.db,
                u = n.findSession(e.id);
              if (u) {
                var l = r.resolve(),
                  d = o.filterObj(e, "id lastMsg localCustom");
                c.enable && (l = c.updateSession(d)),
                  l.then(function (e) {
                    return n.onUpdateSession(e, t)
                  }).then(s,
                    function (e) {
                      i({
                        callFunc: "session::updateLocalSession",
                        event: e
                      })
                    })
              } else i(a.sessionNotExist({
                sessionId: e.id,
                callFunc: "session::updateLocalSession"
              }))
            })
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(2).Promise,
          s = n(4).fn;
        s.syncSessionAck = function (e) {
          var t = this,
            n = t.db,
            s = r.resolve();[[e.content.p2p, "p2p"], [e.content.team.m_map, "team"]].forEach(function (e) {
              var r = e[0],
                o = e[1];
              Object.keys(r).forEach(function (e) {
                var i = o + "-" + e,
                  a = {
                    id: i,
                    ack: r[e]
                  };
                n.enable && (s = s.then(function () {
                  return n.putSession(a)
                }).then(function () {
                  t.markUnreadBySessionAck({
                    sessionId: i,
                    ack: r[e]
                  })
                })),
                  t.mergeSession(a)
              })
            }),
              t.logger.warn("session::syncSessionAck: parse offline session ack", t.sessionSet);
          var o = e.content.timetag;
          n.enable && (s = s.then(function () {
            return t.db.updateSessionAck(o)
          })),
            s.cmd = "sessionAck",
            t.syncPromiseArray.push(s)
        },
          s.onMarkSessionAck = function (e) {
            e.error || this.storeSessionAck(e.obj)
          },
          s.syncMarkSessionAck = function (e) {
            this.storeSessionAck(e.content)
          },
          s.storeSessionAck = function (e) {
            var t = this,
              n = t.options.syncSessionUnread;
            if (n) {
              var r = t.db,
                s = 0 === e.scene ? "p2p" : "team",
                o = s + "-" + e.to,
                i = e.timetag,
                a = t.findSession(o) || {},
                c = a.ack || 0;
              if (i <= c) return void t.logger.warn("session::storeSessionAck: ack <= ackInMemory", i);
              var u = {
                id: o,
                ack: i
              };
              t.mergeSession(u),
                r.enable && r.updateSession(u),
                t.logger.info("session::storeSessionAck:", u),
                t.markUnreadBySessionAck({
                  sessionId: o,
                  ack: u.ack
                })
            }
          },
          s.markUnreadBySessionAck = function (e) {
            var t = e.sessionId,
              n = e.ack,
              r = this,
              s = r.db;
            if (s.enable) r.pushMsgTask(function () {
              return s.getMsgCountAfterAck({
                shouldCountNotifyUnread: r.options.shouldCountNotifyUnread,
                sessionId: t,
                ack: n
              }).then(function (e) {
                var n = {
                  id: t,
                  unread: e
                };
                return r.logger.log("session::markUnreadBySessionAck: db.getMsgCountAfterAck done"),
                  r.syncing && r.cacheSyncedSession(n),
                  r.onUpdateSession(n),
                  s.updateSession(n)
              })
            });
            else {
              var o = r.findSession(t);
              if (o) {
                var i = o.unreadMsgs;
                if (i && i.length) {
                  for (var a = 0,
                    c = [], u = i.length - 1; u >= 0; u--) {
                    var l = i[u];
                    if (!(l.time > n)) break;
                    a++ ,
                      c.push(l)
                  }
                  o.unreadMsgs = c,
                    o.unread = a,
                    r.logger.info("session::markUnreadBySessionAck: unread " + a),
                    r.onUpdateSession(o)
                }
              }
            }
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(2).Promise,
          s = n(4).fn,
          o = n(1),
          i = n(5),
          a = o.undef,
          c = o.objs2ids,
          u = o.objs2accounts,
          l = o.teams2ids,
          d = n(37);
        s.beforeSync = function () {
          var e = this,
            t = e.db;
          return t.enable ? t.clearSendingMsgs() : r.resolve()
        },
          s.syncData = function () {
            function e(e) {
              t.syncPromiseArray = [],
                t.syncResult = {},
                t.syncTeamMembersPromiseArray = [],
                t.syncTeamMembersResult = {},
                o.verifyBooleanWithDefault(r, "syncRelations syncFriends syncFriendUsers syncTeams syncRoamingMsgs syncMsgReceipts syncExtraTeamInfo", !0, "", "sync::syncData"),
                o.verifyBooleanWithDefault(r, "syncFilter syncTeamMembers", !1, "", "sync::syncData");
              var n = {};
              e = e || {},
                window._nimForceSyncIM && (t.logger.warn("sync::syncData: nimForceSyncIM"), delete e.teams, window._nimForceSyncIM = !1),
                n.myInfo = e.myInfo || 0,
                n.offlineMsgs = 0,
                r.syncRelations && (n.relations = e.relations || 0),
                r.syncFriends && (n.friends = e.friends || 0),
                r.syncFriendUsers && (n.friendUsers = e.friendUsers || 0),
                r.syncRobots && (n.robots = e.robots || 0),
                r.syncTeams && (n.teams = e.teams || 0),
                r.syncRoamingMsgs && (n.roamingMsgs = e.roamingMsgs || 0),
                r.syncMsgReceipts && (n.msgReceipts = e.msgReceipts || 0),
                r.syncExtraTeamInfo && (n.myTeamMembers = e.myTeamMembers || 0),
                r.syncSessionUnread && (n.sessionAck = e.sessionAck || 0),
                r.syncBroadcastMsgs && (n.broadcastMsgs = e.broadcastMsg || 0),
                n.donnop = e.donnop || 0,
                n.deleteMsg = e.deleteMsg || 0,
                r.syncFilter && (n.filterMsgs = 0),
                t.sendCmd("sync", {
                  sync: n
                },
                  t.onSyncData.bind(t))
            }
            var t = this,
              n = t.db,
              r = t.options,
              s = n.enable;
            t.notifyLogin(),
              t.syncing = !0,
              s ? t.beforeSync().then(function () {
                return t.db.getTimetags()
              }).then(function (t) {
                e(t)
              },
                function () {
                  e()
                }) : e(t.timetags)
          },
          s.onSyncData = function (e, t) {
            e && this.syncRetryTimes > 3 && (this.syncRetryTimes = 0, e.callFunc = "sync::onSyncData", this.onCustomError("SYNC_DATA_ERROR", e))
          },
          s.processSync = function (e) {
            var t = this;
            switch (t.syncRetryTimes = t.syncRetryTimes || 0, t.syncRetryTimes++ , e.cmd) {
              case "syncDone":
                e.error ? t.syncRetryTimes > 3 || t.syncData() : (t.timetags.sync = e.content.timetag, t.onSyncDone());
                break;
              case "syncTeamMembersDone":
                t.onSyncTeamMembersDone()
            }
          },
          s.onSyncDone = function (e) {
            function t() {
              if (!$) return void B.logger.warn("sync::onSyncDone: after sync --no promiseArray");
              if (B.logger.info("sync::onSyncDone: after sync", o.promises2cmds($)), $ = [], v = X.blacklist || [], b = X.invalidBlacklist || [], M = X.mutelist || [], T = X.invalidMutelist || [], S = X.friends, k = X.invalidFriends || [], w = X.myInfo, C = X.users, O = X.teams, _ = X.invalidTeams || [], I = X.sessions, x = X.msgReceipts, E = X.roamingMsgs, P = X.offlineMsgs, A = X.offlineFilterMsgs, j = X.offlineSysMsgs, F = X.offlineCustomSysMsgs, N = X.offlineFilterSysMsgs, U = X.offlineFilterCustomSysMsgs, D = X.broadcastMsgs, L = X.sysMsgUnread, I) {
                var e = [];
                Object.keys(I).forEach(function (t) {
                  e.push(I[t])
                }),
                  I = e.sort(function (e, t) {
                    return t.updateTime - e.updateTime
                  })
              }
              var t = r.resolve();
              W && (t = n().then(function (e) {
                var t = {};
                e.forEach(function (e) {
                  var n = e.sessionId;
                  t[n] || (t[n] = !0, B.markUnreadByMsgsPromise(n))
                })
              })),
                t.then(function () {
                  W && !B.hasSynced && (B.hasSynced = !0, s());
                  var e = $.filter(function (e) {
                    return "sessionAck" === e.cmd
                  });
                  0 === e.length && e.push(r.resolve());
                  var t = $.filter(function (e) {
                    return "sessionAck" !== e.cmd
                  });
                  0 === t.length && t.push(r.resolve()),
                    r.all(t).then(function () {
                      return r.all(e)
                    }).then(m).then(p,
                      function (e) {
                        e.callFunc = "sync::onSyncDone",
                          e.message = "taskAfterSync syncSessionAckPromise 出错",
                          B.onCustomError("SYNC_SESSION_ACK_ERROR", e)
                      })
                })
            }
            function n() {
              var e, t = [],
                n = [];
              return E && E.forEach(function (e) {
                n = [].concat(n, e.msgs)
              }),
                P && P.forEach(function (e) {
                  n = [].concat(n, e.msgs)
                }),
                e = q.putMsg(n),
                t.push(e),
                r.all(t).then(function () {
                  return n
                })
            }
            function s() {
              H.syncRelations && (h = q.getRelations().then(function (e) {
                v = e[0],
                  M = e[1],
                  v.invalid = b,
                  M.invalid = T
              },
                function (e) {
                  return e._msg = "on relations error",
                    e
                }), $.push(h)),
                H.syncFriends && (h = q.getFriends().then(function (e) {
                  S = e,
                    S.invalid = k
                },
                  function (e) {
                    return e._msg = "on friends error",
                      e
                  }), $.push(h)),
                a(w) && (h = q.getUser(B.account).then(function (e) {
                  w = e
                },
                  function (e) {
                    return e._msg = "on myInfo error",
                      e
                  }), $.push(h)),
                H.syncFriendUsers && (h = q.getFriends().then(function (e) {
                  return e.map(function (e) {
                    return e.account
                  })
                }).then(function (e) {
                  return q.getUsers(e)
                }).then(function (e) {
                  C = e
                },
                  function (e) {
                    return e._msg = "on users error",
                      e
                  }), $.push(h)),
                H.syncTeams && (h = q.getTeams().then(function (e) {
                  O = e,
                    O.invalid = _
                },
                  function (e) {
                    return e._msg = "on teams error",
                      e
                  }), $.push(h)),
                h = q.getTeamMembersByAccount(B.account).then(function (e) {
                  B.mergeMyTeamMembers(e)
                }),
                $.push(h),
                h = q.getDonnop().then(function (e) {
                  B.mergeDonnop(e)
                }),
                $.push(h),
                h = q.getSessions().then(function (e) {
                  I = e
                },
                  function (e) {
                    return e._msg = "on sessions error",
                      e
                  }),
                $.push(h),
                h = q.getSysMsgUnread().then(function (e) {
                  L = e
                },
                  function (e) {
                    return e._msg = "on sysMsgUnread error",
                      e
                  }),
                $.push(h)
            }
            function m() {
              B.logger.info("sync::onSyncDone: taskAfterSync"),
                f();
              var e = [];
              return e.push(B.deleteMsgOfflineRoaming(X.deleteMsgSysMsgs, I)),
                r.all(e)
            }
            function f() {
              if (X.deleteMsgSysMsgs) {
                var e = {};
                E && E.forEach(function (t) {
                  e[t.sessionId] = t
                });
                var t = {};
                P && P.forEach(function (e) {
                  t[e.sessionId] = e
                });
                var n = B.api;
                X.deleteMsgSysMsgs.forEach(function (r) {
                  r.sysMsgs.forEach(function (r) {
                    var s = r.msg,
                      o = s.sessionId;[e, t].forEach(function (e) {
                        e[o] && (e[o].msgs = n.cutMsgs(e[o].msgs, s))
                      })
                  })
                }),
                  q.enable || [E, P].forEach(function (e) {
                    e && e.forEach(function (e) {
                      if (e.msgs.length) {
                        var t = B.genSessionByMsgs(e.msgs);
                        B.cacheSyncedSession(t),
                          I = n.mergeSessions(I, t)
                      } else I = n.cutSessions(I, {
                        id: e.sessionId
                      })
                    })
                  })
              }
            }
            function p() {
              setTimeout(g, 0)
            }
            function g() {
              var e, t, n = [];
              v && (B.logger.info("sync::notifyDataAsync: on blacklist", u(v), v), H.onblacklist(v)),
                M && (B.logger.info("sync::notifyDataAsync: on mutelist", u(M), M), H.onmutelist(M)),
                S && (B.logger.info("sync::notifyDataAsync: on friends", u(S), S), H.onfriends(S)),
                w && (B.logger.info("sync::notifyDataAsync: on myInfo", w), B.myInfo = w, H.onmyinfo(o.copy(w))),
                C && (C.forEach(function (e) {
                  B.mergeUser(e)
                }), B.logger.info("sync::notifyDataAsync: on users", u(C), C), H.onusers(C)),
                O && (B.logger.info("sync::notifyDataAsync: on teams", l(O), O), H.onteams(O)),
                x && (!B.hasSynced && I && I.length || B.hasSynced) && (I = B.mergeSessionAndMsgReceipts(I, x)),
                I && I.length && (I.forEach(function (e) {
                  B.syncResult.sessions && B.syncResult.sessions[e.id] && "number" == typeof B.syncResult.sessions[e.id].unread && (e.unread = B.syncResult.sessions[e.id].unread),
                    B.mergeSession(e),
                    d.trim(e)
                }), B.logger.info("sync::notifyDataAsync: on sessions", c(I), I), H.onsessions(I)),
                E && E.forEach(function (e) {
                  n.push(e.timetag),
                    t = e.msgs,
                    t.length && (B.logger.info("sync::notifyDataAsync: on roaming msgs", e.sessionId, t.length, t), H.onroamingmsgs(e))
                }),
                P && P.forEach(function (e) {
                  n.push(e.timetag),
                    t = e.msgs,
                    t.length && (B.logger.info("sync::notifyDataAsync: on offline msgs", e.sessionId, t.length, t), H.onofflinemsgs(e))
                }),
                A && A.forEach(function (e) {
                  n.push(e.timetag),
                    t = e.msgs,
                    t.length && (B.logger.info("sync::notifyDataAsync: on offline filter msgs", e.sessionId, t.length, t), H.onofflinefiltermsgs(t))
                });
              var r = [],
                s = [];
              X.deleteMsgSysMsgs && X.deleteMsgSysMsgs.forEach(function (e) {
                "roaming" === e.type ? r = r.concat(e.sysMsgs) : s = s.concat(e.sysMsgs)
              }),
                r.length && (R = R || [], R = R.concat(r)),
                s.length && (j = j || [], j = j.concat(s)),
                R && (B.logger.info("sync::notifyDataAsync: on roaming sys msgs", R.length, R), H.onroamingsysmsgs(R)),
                j && (B.logger.info("sync::notifyDataAsync: on offline sys msgs", j.length, j), H.onofflinesysmsgs(j)),
                N && (B.logger.info("sync::notifyDataAsync: on offline filter sys msgs", N.length, N), H.onofflinefiltersysmsgs(N)),
                F && (B.logger.info("sync::notifyDataAsync: on offline custom sys msgs", F.length, F), H.onofflinecustomsysmsgs(F)),
                U && (B.logger.info("sync::notifyDataAsync: on offline filter custom sys msgs", U.length, U), H.onofflinefiltercustomsysmsgs(U)),
                L && (L = o.merge({},
                  B.sysMsgUnread, L), B.sysMsgUnread = o.merge({},
                    L), B.logger.info("sync::notifyDataAsync: on sysMsgUnread", L), H.onsysmsgunread(L));
              var i = B.getPushNotificationMultiportConfig();
              B.logger.info("sync::notifyDataAsync: on pushNotificationMultiportConfig", i),
                H.onPushNotificationMultiportConfig(i),
                n.length ? (e = Math.max.apply(Math, n), B.updateRoamingMsgTimetag(e).then(y, y)) : y(),
                B.syncPromiseArray = null,
                B.syncResult = null
            }
            function y() {
              if (B.processUnsettledMsgs(), B.processUnsettledSysMsgs(), B.syncing = !1, H.onsyncdone(), H.syncTeamMembers && O && O.length) throw new i("sync team members api deprecated!")
            }
            var h, v, b, M, T, S, k, w, C, O, _, I, x, E, P, A, R, j, F, N, U, D, L, B = this,
              q = B.db,
              W = q.enable,
              H = B.options,
              $ = B.syncPromiseArray,
              X = B.syncResult;
            if ($ && $.length) {
              var V = $.filter(function (e) {
                return "sessionAck" === e.cmd
              });
              0 === V.length && V.push(r.resolve());
              var J = $.filter(function (e) {
                return "sessionAck" !== e.cmd
              });
              0 === J.length && J.push(r.resolve()),
                r.all(J).then(function () {
                  return r.all(V)
                }).then(t,
                  function (e) {
                    e.callFunc = "sync::onSyncDone",
                      e.message = "afterSync syncSessionAckPromise 出错",
                      B.onCustomError("SYNC_SESSION_ACK_ERROR", e)
                  })["catch"](function (e) {
                    B.syncData()
                  })
            } else t()
          },
          s.syncTeamMembers = function (e) {
            function t(t) {
              var r = {};
              t = t || {},
                e.forEach(function (e) {
                  r[e.teamId] = 0
                },
                  n),
                n.sendCmd("syncTeamMembers", {
                  sync: r
                },
                  n.onSyncTeamMembers.bind(n))
            }
            var n = this;
            t(n.timetags)
          },
          s.onSyncTeamMembers = function (e, t) {
            e.callFunc = "sync::onSyncTeamMembers",
              e.message = "同步群成员错误",
              this.onCustomError("SYNC_TEAM_MEMBERS_ERROR", e)
          },
          s.onSyncTeamMembersDone = function () {
            function e() {
              l.logger.log("sync::onSyncTeamMembersDone: afterSync", o.promises2cmds(p)),
                p = [],
                d.enable && !l.hasSyncedTeamMembers ? (l.hasSyncedTeamMembers = !0, t()) : n()
            }
            function t() {
              return m.syncTeams && m.syncTeamMembers ? void d.getTeams().then(function (e) {
                e.forEach(function (e) {
                  var t = e.teamId;
                  c = new r(function (e, n) {
                    l.api.getTeamMembers({
                      teamId: t,
                      done: function (r, s) {
                        r && n({
                          callFunc: "sync::getTeamMembers: teamId-" + t,
                          message: "sync team members error"
                        }),
                          f[t] = s.members || [],
                          e()
                      }
                    })
                  }),
                    p.push(c)
                }),
                  p.length ? r.all(p).then(n,
                    function (e) {
                      e.callFunc = "sync::onSyncTeamMembersDone",
                        e.message = "pullFullData promiseArray notifyData 错误",
                        l.onCustomError("SYNC_TEAM_MEMBERS_ERROR", e)
                    }) : n()
              },
                function (e) {
                  e.callFunc = "sync::onSyncTeamMembersDone",
                    e.message = "pullFullData getTeams 错误",
                    l.onCustomError("SYNC_TEAM_MEMBERS_ERROR", e)
                }) : a()
            }
            function n() {
              setTimeout(s, 0)
            }
            function s() {
              var e, t;
              Object.keys(f).forEach(function (n) {
                n.indexOf("invalid") === -1 && (e = f[n], t = f[n + "-invalid"] || [], e.invalid = t, i(n, e))
              }),
                a()
            }
            function i(e, t) {
              l.logger.info("sync::onSyncTeamMembersDone: onTeamMembers", e, u(t), t),
                m.onteammembers({
                  teamId: e,
                  members: t
                })
            }
            function a() {
              l.logger.info("sync::onSyncTeamMembersDone: bingo"),
                m.onsyncteammembersdone(),
                l.syncTeamMembersResult = null,
                l.syncTeamMembersPromiseArray = null
            }
            var c, l = this,
              d = l.db,
              m = l.options,
              f = l.syncTeamMembersResult,
              p = l.syncTeamMembersPromiseArray;
            p.length ? r.all(p).then(e,
              function (e) {
                e.callFunc = "sync::onSyncTeamMembersDone",
                  e.message = "同步群成员 syncTeamMembersPromiseArray 错误",
                  l.onCustomError("SYNC_TEAM_MEMBERS_ERROR", e)
              })["catch"](function (t) {
                l.logger.log("sync::onSyncTeamMembersDone: syncTeamMembersPromiseArray promise ", t),
                  e()
              }) : e()
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(2).Promise,
          s = n(4).fn,
          o = n(1),
          i = n(38);
        s.splitSysMsgs = function (e, t) {
          for (var n, r = e.length - 1; r >= 0; r--) n = e[r],
            i.isCustom(n) && (e.splice(r, 1), t.push(n))
        },
          s.onOfflineSysMsgs = function (e, t) {
            var n = this,
              r = e.content.sysMsgs.map(function (e) {
                return e = i.reverse(e),
                  t && (e.filter = !0),
                  e
              });
            r = r.reverse(),
              n.markSysMsgRead(r);
            var s = [];
            n.splitSysMsgs(r, s);
            var o = t ? "offlineFilterSysMsgs" : "offlineSysMsgs",
              a = t ? "offlineFilterCustomSysMsgs" : "offlineCustomSysMsgs";
            if (r.length) {
              var c = n.putSysMsg(r, "offlineSysMsgs").then(function (e) {
                r = e,
                  r.length && (n.logger.info("sysmsg::onOfflineSysMsgs: ", o, r.length, r), n.syncResult[o] = r)
              });
              c.cmd = "sysMsgs",
                n.syncPromiseArray.push(c)
            }
            s.length && (n.logger.info("sysmsg::onOfflineSysMsgs: ", a, s), n.syncResult[a] = s)
          },
          s.onSendSysMsg = function (e, t) {
            var n = this,
              r = e.obj;
            n.completeSysMsg(r),
              e.error ? r.status = "fail" : r.status = "success",
              r = i.reverse(r),
              t && (e.obj.filter = !0),
              e.obj = r
          },
          s.completeSysMsg = function (e) {
            return e.from = this.account,
              e
          },
          s.onSysMsg = function (e, t) {
            var n = this,
              r = i.reverse(e.content.sysMsg);
            n.markSysMsgRead(r),
              t && (r.filter = !0),
              i.isCustom(r) ? (n.logger.info("sysmsg::onSysMsg: on customSysMsg", r), n.options.oncustomsysmsg(r)) : n.syncing ? n.unhandledSysMsgs.push(r) : n.handleSysMsg(r)
          },
          s.handleSysMsg = function (e) {
            var t = this,
              n = e.type,
              s = e.from;
            t.sysMsgPromise = t.sysMsgPromise.then(function () {
              return t.putSysMsg(e, "onSysMsg")
            }).then(function (t) {
              e = t[0]
            }).then(function () {
              if (e) {
                var o, i = r.resolve();
                switch (n) {
                  case "addFriend":
                    o = {
                      type: "addFriend",
                      account: s
                    },
                      i = t.onFriendRequest(o);
                    break;
                  case "passFriendApply":
                    o = {
                      type: "passFriendApply",
                      account: s
                    },
                      i = t.onFriendRequest(o);
                    break;
                  case "deleteFriend":
                    i = t.onDeleteFriend({
                      account: s
                    })
                }
                return o && o.friend && (e.friend = o.friend),
                  i
              }
            }).then(function () {
              e && (t.logger.info("sysmsg::handleSysMsg: ", n, e), setTimeout(function () {
                t.options.onsysmsg(e)
              },
                0))
            })
          },
          s.putSysMsg = function (e, t) {
            if (o.isArray(e) || (e = [e]), e[0].filter) return r.resolve(e);
            var n = this,
              s = n.db,
              i = s.enable,
              a = r.resolve(),
              c = [];
            return a = a.then(function () {
              return i ? s.putSysMsg(e) : e
            }).then(function (t) {
              var r = [];
              e.forEach(function (e) {
                n.checkSysMsgUnique(e) && r.push(e)
              }),
                e = r,
                c = i ? t : e
            }),
              a = a.then(function () {
                return n.getSysMsgUnread().then(function (r) {
                  return c.length || (c = e, c.backward = !0),
                    n.updateSysMsgUnread(c, r, 1).then(function (e) {
                      "offlineSysMsgs" === t && (n.syncResult.sysMsgUnread = e),
                        "onSysMsg" === t && n.onUpdateSysMsgUnread(e)
                    })
                })
              }),
              a.then(function () {
                return e
              })
          },
          s.checkSysMsgUnique = o.genCheckUniqueFunc("idServer"),
          s.getSysMsgUnread = function () {
            var e = this,
              t = e.db;
            return new r(function (n) {
              t.enable ? t.getSysMsgUnread().then(function (e) {
                n(e)
              },
                function () {
                  n(e.sysMsgUnread)
                }) : n(e.sysMsgUnread)
            })
          },
          s.updateSysMsgUnread = function (e, t, n) {
            if (o.isArray(e) || (e = [e]), !e.length) return r.resolve(t);
            t = t || {};
            var s, a = this,
              c = a.db;
            return e.forEach(function (e) {
            (n > 0 && !e.read || n < 0 && e.read) && (s = e.type, t[s] = (t[s] || 0) + n)
            }),
              t = i.completeUnread(t),
              a.sysMsgUnread = t,
              c.enable && !e.backward ? c.updateSysMsgUnread(t) : r.resolve(t)
          },
          s.reduceSysMsgUnread = function (e) {
            var t = this;
            return t.getSysMsgUnread().then(function (n) {
              return t.updateSysMsgUnread(e, n, -1)
            }).then(function (e) {
              t.onUpdateSysMsgUnread(e)
            })
          },
          s.onUpdateSysMsgUnread = function (e) {
            var t = this;
            setTimeout(function () {
              t.logger.info("sysmsg::onUpdateSysMsgUnread:", e),
                t.options.onupdatesysmsgunread(e)
            },
              0)
          },
          s.updateSysMsg = function (e) {
            var t, n = this,
              s = n.db;
            t = s.enable ? s.updateSysMsg(e) : r.resolve(e),
              t.then(function (e) {
                n.onUpdateSysMsg(e)
              })
          },
          s.onUpdateSysMsg = function (e) {
            var t = this;
            setTimeout(function () {
              o.isArray(e) || (e = [e]),
                e.forEach(function (e) {
                  t.logger.info("sysmsg::onUpdateSysMsg:", e),
                    t.options.onupdatesysmsg(e)
                })
            },
              0)
          },
          s.processUnsettledSysMsgs = function () {
            var e = this;
            e.unhandledSysMsgs.forEach(function (t) {
              e.handleSysMsg(t)
            }),
              e.resetUnsettledSysMsgs()
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(2).Promise,
          s = n(4).fn,
          o = n(1),
          i = o.objs2accounts,
          a = o.teams2ids,
          c = n(39),
          u = n(33);
        s.processTeam = function (e) {
          var t = this,
            n = e.error,
            r = void 0,
            s = void 0,
            o = void 0;
          switch (e.cmd) {
            case "createTeam":
              if (r = e.obj.team, n || (r = e.content.team), r = c.reverse(r), e.obj.team = r, o = u.assembleOwner(r), e.obj.owner = o, !n) {
                var i = {
                  team: r,
                  owner: o
                };
                t.logger.info("team::processTeam: create team", i),
                  t.options.onCreateTeam(i),
                  t.onCreateTeam(r, o)
              }
              break;
            case "syncCreateTeam":
              r = c.reverse(e.content.team),
                o = u.assembleOwner(r),
                t.logger.info("team::processTeam: sync createTeam", r, o),
                t.options.onsynccreateteam(r, o),
                t.onCreateTeam(r, o);
              break;
            case "sendTeamMsg":
              t.onSendMsg(e);
              break;
            case "teamMsg":
              t.onMsg(e);
              break;
            case "teamMsgs":
              t.onMsgs(e);
              break;
            case "addTeamMembers":
            case "removeTeamMembers":
            case "leaveTeam":
            case "dismissTeam":
            case "addTeamManagers":
            case "removeTeamManagers":
            case "transferTeam":
              break;
            case "updateInfoInTeam":
              n || (s = e.obj, s.account = t.account, s.id = u.genId(s.teamId, s.account), s = u.reverse(s), e.obj = s, t.mergeMyTeamMembers(s), t.onUpdateTeamMember(s));
              break;
            case "updateNickInTeam":
              e.obj = u.reverse(e.obj);
              break;
            case "updateTeam":
              e.obj = c.reverse(e.obj, !0);
              break;
            case "applyTeam":
              e.error || (e.obj = c.reverse(e.content.team));
              break;
            case "passTeamApply":
              t.updateTeamSysMsgState(e, "passed");
              break;
            case "rejectTeamApply":
              t.updateTeamSysMsgState(e, "rejected");
              break;
            case "acceptTeamInvite":
              t.updateTeamSysMsgState(e, "passed"),
                e.error || (e.obj = c.reverse(e.content.team));
              break;
            case "rejectTeamInvite":
              t.updateTeamSysMsgState(e, "rejected");
              break;
            case "getTeam":
              e.error || (e.obj = c.reverse(e.content.team));
              break;
            case "getTeams":
              t.onTeams(e);
              break;
            case "getTeamMembers":
              t.onTeamMembers(e);
              break;
            case "syncTeams":
              t.onTeams(e);
              break;
            case "syncTeamMembers":
              t.onTeamMembers(e);
              break;
            case "getTeamHistoryMsgs":
            case "searchTeamHistoryMsgs":
              t.onHistoryMsgs(e);
              break;
            case "syncSendTeamMsg":
              t.onMsg(e);
              break;
            case "syncUpdateTeamMember":
              s = u.reverse(e.content.teamMember),
                t.onUpdateTeamMember(s),
                s.account === t.account && t.mergeMyTeamMembers(s);
              break;
            case "updateMuteStateInTeam":
              break;
            case "getMyTeamMembers":
              e.error || (e.obj = u.reverseMembers(e.content.teamMembers));
              break;
            case "getMutedTeamMembers":
              e.error || (e.obj = {
                teamId: e.obj.teamId,
                members: u.reverseMembers(e.content.teamMembers)
              });
              break;
            case "syncMyTeamMembers":
              t.onSyncMyTeamMembers(e)
          }
        },
          s.onCreateTeam = function (e, t) {
            var n = this.db;
            n.enable && (n.putTeam(e), n.putTeamMembers(t))
          },
          s.onTeams = function (e) {
            function t() {
              m && d.forEach(function (e) {
                e = c.reverse(e),
                  e.validToCurrentUser ? f.push(e) : p.push(e)
              }),
                i.logger.info("team::onTeams: parseData", a(f), f, "invalid", a(p), p),
                d.length ? (m = !0, o = e.content.timetag) : m = !1
            }
            function n(t, n) {
              e.promise = new r(function (e, r) {
                function a() {
                  l ? (s(), e(), t()) : u.getTeams().then(function (n) {
                    f = n,
                      s(),
                      e(),
                      t()
                  }).then(void 0,
                    function (e) {
                      e.message = "db.getTeams error",
                        e.callFunc = "team::afterMergeData",
                        r(e),
                        n(e)
                    })
                }
                m ? u.mergeTeams(f, p, o).then(function () {
                  a()
                }).then(void 0,
                  function (e) {
                    var t = {
                      callFunc: "team::onTeams:mergeData",
                      message: "db.mergeTeams error",
                      event: e
                    };
                    r(t),
                      n(t)
                  }) : (i.logger.warn("team::onTeams:mergeData: no teams need merge"), a())
              }).then(void 0,
                function (e) {
                  throw e.message = "merge teams data error",
                  e.callFunc = "team::mergeData",
                  n(e),
                  e
                })
            }
            function s() {
              i.timetags.teams = o,
                f.invalid = p,
                l ? (i.syncResult.teams = f, i.syncResult.invalidTeams = p) : (i.logger.info("team::onTeams: not in syncing, get teams", a(f), f), e.obj = f)
            }
            e.content = e.content || {};
            var o, i = this,
              u = i.db,
              l = i.packetFromSync(e),
              d = e.content.teams || [],
              m = !0,
              f = [],
              p = [];
            if (e.error) switch (e.error.code) {
              case 803:
                e.error = null,
                  m = !1
            }
            var g = new r(function (r, o) {
              e.error ? l && o(e.error) : (t(), u.enable ? n(r, o) : (s(), r()))
            });
            l && (g.cmd = "teams", i.syncPromiseArray.push(g))
          },
          s.onTeamMembers = function (e) {
            function t() {
              d && l.forEach(function (e) {
                e = u.reverse(e),
                  e.valid ? m.push(e) : f.push(e)
              }),
                a.logger.warn("team::onTeamMembers: parseData", o, i(m), m, "invalid", i(f), f),
                l.length ? (d = !0, s = e.content.timetag) : d = !1
            }
            function n() {
              m.invalid = f,
                c ? (a.syncTeamMembersResult[o] = m, a.syncTeamMembersResult[o + "-invalid"] = f, a.timetags["team-" + o] = s) : (a.logger.info("team::onTeamMembers: not syncing, get members", o, i(m), m), e.obj = {
                  teamId: o,
                  members: m
                })
            }
            e.content = e.content || {};
            var s, o, a = this,
              c = (a.db, a.packetFromSync(e)),
              l = e.content.members || [],
              d = !0,
              m = [],
              f = [];
            if (e.obj && (o = e.obj.teamId), o || (o = e.content.teamId), o = "" + o, e.error) switch (e.error.code) {
              case 406:
                e.error = null,
                  d = !1
            }
            var p = new r(function (r, s) {
              e.error ? c && s({
                callFunc: "team::onTeamMembers",
                event: e.error,
                message: "teamId-" + o + " 获取群成员错误"
              }) : (t(), n(), r())
            });
            c && (p.cmd = o, a.syncTeamMembersPromiseArray.push(p))
          },
          s.onUpdateTeamMember = function (e) {
            var t = this;
            e.updateTime || (e.updateTime = +new Date),
              t.logger.info("team::onUpdateTeamMember: ", e),
              t.options.onupdateteammember(o.simpleClone(e));
            var n = {
              teamId: e.teamId,
              memberUpdateTime: e.updateTime
            };
            t.onUpdateTeam(n);
            var r = this.db;
            r.enable && r.updateTeamMember(e)
          },
          s.onUpdateTeam = function (e) {
            var t = this;
            t.logger.info("team::onUpdateTeam:", e),
              t.options.onUpdateTeam(o.simpleClone(e));
            var n = t.db;
            n.enable && n.updateTeam(e)
          },
          s.onSyncMyTeamMembers = function (e) {
            var t = this,
              n = t.db,
              r = u.reverseMembers(e.content.teamMembers);
            if (t.logger.info("team::onSyncMyTeamMembers:", r), n.enable) {
              var s = n.putTeamMembers(r).then(function () {
                return n.updateMyTeamMembersTimetag(e.content.timetag)
              });
              s.cmd = "myTeamMembers",
                t.syncTeamMembersPromiseArray.push(s)
            }
            t.mergeMyTeamMembers(r)
          },
          s.mergeMyTeamMembers = function (e) {
            o.isArray(e) || (e = [e]);
            var t = this,
              n = t.myTeamMembersMap = t.myTeamMembersMap || {};
            e.forEach(function (e) {
              var t = e.teamId;
              n[t] = o.merge(n[t], e)
            }),
              t.logger.info("team::mergeMyTeamMembers:", n)
          },
          s.notifyForNewTeamMsg = function (e) {
            o.isArray(e) || (e = [e]);
            var t = this,
              n = this.myTeamMembersMap || {},
              s = {},
              i = [];
            e.forEach(function (e) {
              o.exist(n[e]) ? s[e] = !n[e].muteTeam : i.push(e)
            });
            var a = r.resolve(s);
            return i.length && (a = t.api.getMyTeamMembers({
              teamIds: i,
              promise: !0
            }).then(function (e) {
              return t.mergeMyTeamMembers(e),
                e.forEach(function (e) {
                  s[e.teamId] = !e.muteTeam
                }),
                s
            })),
              a
          },
          s.updateTeamSysMsgState = function (e, t) {
            var n, r = e.error;
            r && (t = "error", r = o.filterObj(r, "code message")),
              n = {
                idServer: e.obj.idServer,
                state: t
              },
              r && (n.error = r),
              this.updateSysMsg(n)
          }
      },
      function (e, t, n) {
        "use strict";
        var r = n(2).Promise,
          s = n(4).fn,
          o = n(1),
          i = o.objs2accounts,
          a = n(235),
          c = n(63);
        s.processUser = function (e) {
          var t, n = this,
            r = n.db,
            s = e.obj,
            o = e.error,
            i = e.content;
          switch (e.cmd) {
            case "markInBlacklist":
              o || n.markInBlacklist(s);
              break;
            case "syncMarkInBlacklist":
              n.markInBlacklist(i, !0);
              break;
            case "markInMutelist":
              o || n.markInMutelist(s);
              break;
            case "syncMarkInMutelist":
              n.markInMutelist(i, !0);
              break;
            case "getRelations":
              o || n.onRelations(e);
              break;
            case "syncMyInfo":
              n.onMyInfo(e, !0);
              break;
            case "updateMyInfo":
              o || (s.updateTime = i.timetag, n.onUpdateMyInfo(e, s));
              break;
            case "syncUpdateMyInfo":
              n.onUpdateMyInfo(e, i.user, !0);
              break;
            case "getUsers":
              o || (t = i.users.map(function (e) {
                return e = c.reverse(e),
                  n.mergeUser(e),
                  e
              }), e.obj = t, r.enable && r.putUsers(t));
              break;
            case "updateDonnop":
              n.onUpdateDonnop(e);
              break;
            case "syncUpdateDonnop":
              n.onDonnop(e, !1)
          }
        },
          s.onMyInfo = function (e) {
            function t() {
              d = c.reverse(u.user),
                o.logger.info("user::onMyInfo: parseData", d)
            }
            function n(e, t) {
              i.mergeMyInfo(d, l).then(function () {
                s(),
                  e()
              }).then(void 0,
                function (e) {
                  e.message = "db.mergeMyInfo error",
                    e.callFunc = "user::onMyInfo",
                    t(e)
                })
            }
            function s() {
              o.timetags.myInfo = d.updateTime,
                l && (o.syncResult.myInfo = d)
            }
            var o = this,
              i = o.db,
              a = e.error,
              u = e.content,
              l = !0,
              d = void 0,
              m = new r(function (e, r) {
                a ? l && (a && (a.callFunc = "user::onMyInfo"), e(a), o.syncData()) : (t(), i.enable ? n(e, r) : (s(), e()))
              });
            l && (m.cmd = "myInfo", o.syncPromiseArray.push(m))
          },
          s.onUpdateMyInfo = function (e, t, n) {
            var r = this,
              s = r.db,
              i = c.reverse(t),
              a = o.merge(r.myInfo, i);
            r.myInfo = a,
              n ? (r.logger.info("user::onUpdateMyInfo:", a), r.options.onupdatemyinfo(a)) : e.obj = a,
              s.enable && (i.account = r.account, s.updateUser(i))
          },
          s.onRelations = function (e) {
            function t() {
              d.forEach(function (e) {
                e = a.parse(e);
                var t = {
                  account: e.account,
                  createTime: e.createTime,
                  updateTime: e.updateTime
                };
                e.isBlacked ? p.push(t) : g.push(t),
                  e.isMuted ? y.push(t) : h.push(t)
              }),
                o.logger.info("user::onRelations: parse blacklist", i(p), p, "delete", i(g), g),
                o.logger.info("user::onRelations: parse mutelist", i(y), y, "delete", i(h), h),
                d.length ? (m = !0, f = e.content.timetag) : m = !1
            }
            function n(t, n) {
              e.promise = new r(function (e, r) {
                function i() {
                  l ? (s(), e(), t()) : c.getRelations().then(function (n) {
                    p = n[0],
                      y = n[1],
                      s(),
                      e(),
                      t()
                  }).then(void 0,
                    function (e) {
                      e.message = "db.getRelations error",
                        e.callFunc = "user::onRelations",
                        r(e),
                        n(e)
                    })
                }
                m ? c.mergeRelations(p, g, y, h, f).then(function () {
                  i()
                }).then(void 0,
                  function (e) {
                    e.message = "db.mergeRelations error",
                      e.callFunc = "user::onRelations",
                      r(e),
                      n(e)
                  }) : (o.logger.warn("user::onRelations: no relations need merge"), i())
              }).then(void 0,
                function (e) {
                  throw e.message = "merge relations data error",
                  e.callFunc = "user::onRelations",
                  n(e),
                  e
                })
            }
            function s() {
              o.timetags.relations = f,
                p.invalid = g,
                y.invalid = h,
                l ? (o.syncResult.blacklist = p, o.syncResult.mutelist = y, o.syncResult.invalidBlacklist = g, o.syncResult.invalidMutelist = h) : (o.logger.info("user::onRelations: get relations", p, y), e.obj.blacklist = p, e.obj.mutelist = y)
            }
            var o = this,
              c = o.db,
              u = e.error,
              l = o.packetFromSync(e),
              d = e.content.specialRelations,
              m = !0,
              f = void 0,
              p = [],
              g = [],
              y = [],
              h = [],
              v = new r(function (e, r) {
                u ? l && (e(u), o.syncData()) : (t(), c.enable ? n(e, r) : (s(), e()))
              });
            l && (v.cmd = "relations", o.syncPromiseArray.push(v))
          },
          s.markInBlacklist = function (e, t) {
            var n = this,
              r = n.db;
            e.record = {
              account: e.account,
              updateTime: +new Date
            },
              r.enable && r.markInBlacklist(e),
              t && (n.logger.info("user::markInBlacklist:", e), n.options.onsyncmarkinblacklist(e))
          },
          s.markInMutelist = function (e, t) {
            var n = this,
              r = n.db;
            e.record = {
              account: e.account,
              updateTime: +new Date
            },
              r.enable && r.markInMutelist(e),
              t && (n.logger.info("user::markInMutelist:", e), n.options.onsyncmarkinmutelist(e))
          },
          s.mergeUser = function (e) {
            this.userSet[e.account] = e
          }
      }])
    });