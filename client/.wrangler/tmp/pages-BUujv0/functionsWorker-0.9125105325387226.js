var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};

// [[path]].js
globalThis.process = {
  argv: [],
  env: {}
};
var Un = Object.create;
var Oe = Object.defineProperty;
var Hn = Object.getOwnPropertyDescriptor;
var Dn = Object.getOwnPropertyNames;
var Fn = Object.getPrototypeOf;
var qn = Object.prototype.hasOwnProperty;
var P = (e2, t) => () => (e2 && (t = e2(e2 = 0)), t);
var te = (e2, t) => () => (t || e2((t = { exports: {} }).exports, t), t.exports);
var re = (e2, t) => {
  for (var r in t)
    Oe(e2, r, { get: t[r], enumerable: true });
};
var Wn = (e2, t, r, n) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let s of Dn(t))
      !qn.call(e2, s) && s !== r && Oe(e2, s, { get: () => t[s], enumerable: !(n = Hn(t, s)) || n.enumerable });
  return e2;
};
var U = (e2, t, r) => (r = e2 != null ? Un(Fn(e2)) : {}, Wn(t || !e2 || !e2.__esModule ? Oe(r, "default", { value: e2, enumerable: true }) : r, e2));
var z;
var he = P(() => {
  z = [];
});
function Ft(e2) {
  return e2.endsWith("/") ? e2 : e2 + "/";
}
function ne(e2) {
  return e2[0] === "/" ? e2 : "/" + e2;
}
function ke(e2) {
  return e2.replace(/(?<!:)\/\/+/g, "/");
}
function ge(e2) {
  return e2.endsWith("/") ? e2.slice(0, e2.length - 1) : e2;
}
function Vn(e2) {
  return e2.startsWith("/") ? e2.substring(1) : e2;
}
function Ue(e2) {
  return e2.replace(/^\/|\/$/g, "");
}
function zn(e2) {
  return typeof e2 == "string" || e2 instanceof String;
}
function H(...e2) {
  return e2.filter(zn).map((t, r) => r === 0 ? ge(t) : r === e2.length - 1 ? Vn(t) : Ue(t)).join("/");
}
function B(e2) {
  return /^(http|ftp|https|ws):?\/\//.test(e2) || e2.startsWith("data:");
}
function He(e2) {
  return e2.replace(/\\/g, "/");
}
var se = P(() => {
});
var Fe = te((De) => {
  "use strict";
  De.parse = Gn;
  De.serialize = Jn;
  var Bn = Object.prototype.toString, ye = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  function Gn(e2, t) {
    if (typeof e2 != "string")
      throw new TypeError("argument str must be a string");
    for (var r = {}, n = t || {}, s = n.decode || Yn, i = 0; i < e2.length; ) {
      var a = e2.indexOf("=", i);
      if (a === -1)
        break;
      var o = e2.indexOf(";", i);
      if (o === -1)
        o = e2.length;
      else if (o < a) {
        i = e2.lastIndexOf(";", a - 1) + 1;
        continue;
      }
      var l = e2.slice(i, a).trim();
      if (r[l] === void 0) {
        var p = e2.slice(a + 1, o).trim();
        p.charCodeAt(0) === 34 && (p = p.slice(1, -1)), r[l] = Zn(p, s);
      }
      i = o + 1;
    }
    return r;
  }
  function Jn(e2, t, r) {
    var n = r || {}, s = n.encode || Xn;
    if (typeof s != "function")
      throw new TypeError("option encode is invalid");
    if (!ye.test(e2))
      throw new TypeError("argument name is invalid");
    var i = s(t);
    if (i && !ye.test(i))
      throw new TypeError("argument val is invalid");
    var a = e2 + "=" + i;
    if (n.maxAge != null) {
      var o = n.maxAge - 0;
      if (isNaN(o) || !isFinite(o))
        throw new TypeError("option maxAge is invalid");
      a += "; Max-Age=" + Math.floor(o);
    }
    if (n.domain) {
      if (!ye.test(n.domain))
        throw new TypeError("option domain is invalid");
      a += "; Domain=" + n.domain;
    }
    if (n.path) {
      if (!ye.test(n.path))
        throw new TypeError("option path is invalid");
      a += "; Path=" + n.path;
    }
    if (n.expires) {
      var l = n.expires;
      if (!Kn(l) || isNaN(l.valueOf()))
        throw new TypeError("option expires is invalid");
      a += "; Expires=" + l.toUTCString();
    }
    if (n.httpOnly && (a += "; HttpOnly"), n.secure && (a += "; Secure"), n.partitioned && (a += "; Partitioned"), n.priority) {
      var p = typeof n.priority == "string" ? n.priority.toLowerCase() : n.priority;
      switch (p) {
        case "low":
          a += "; Priority=Low";
          break;
        case "medium":
          a += "; Priority=Medium";
          break;
        case "high":
          a += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (n.sameSite) {
      var c = typeof n.sameSite == "string" ? n.sameSite.toLowerCase() : n.sameSite;
      switch (c) {
        case true:
          a += "; SameSite=Strict";
          break;
        case "lax":
          a += "; SameSite=Lax";
          break;
        case "strict":
          a += "; SameSite=Strict";
          break;
        case "none":
          a += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return a;
  }
  function Yn(e2) {
    return e2.indexOf("%") !== -1 ? decodeURIComponent(e2) : e2;
  }
  function Xn(e2) {
    return encodeURIComponent(e2);
  }
  function Kn(e2) {
    return Bn.call(e2) === "[object Date]" || e2 instanceof Date;
  }
  function Zn(e2, t) {
    try {
      return t(e2);
    } catch {
      return e2;
    }
  }
});
function S(e2, t) {
  let r = new RegExp(`\\x1b\\[${t}m`, "g"), n = `\x1B[${e2}m`, s = `\x1B[${t}m`;
  return function(i) {
    return !Qn.enabled || i == null ? i : n + (~("" + i).indexOf(s) ? i.replace(r, s + n) : i) + s;
  };
}
var qe;
var qt;
var Wt;
var Vt;
var zt;
var Qn;
var Wa;
var we;
var We;
var Va;
var za;
var Ba;
var Ga;
var Ja;
var Ya;
var Bt;
var Xa;
var Gt;
var Jt;
var Ka;
var Za;
var Qa;
var eo;
var to;
var ro;
var no;
var so;
var io;
var ao;
var oo;
var co;
var lo;
var ie = P(() => {
  zt = true;
  typeof process < "u" && ({ FORCE_COLOR: qe, NODE_DISABLE_COLORS: qt, NO_COLOR: Wt, TERM: Vt } = process.env || {}, zt = process.stdout && process.stdout.isTTY);
  Qn = { enabled: !qt && Wt == null && Vt !== "dumb" && (qe != null && qe !== "0" || zt) };
  Wa = S(0, 0), we = S(1, 22), We = S(2, 22), Va = S(3, 23), za = S(4, 24), Ba = S(7, 27), Ga = S(8, 28), Ja = S(9, 29), Ya = S(30, 39), Bt = S(31, 39), Xa = S(32, 39), Gt = S(33, 39), Jt = S(34, 39), Ka = S(35, 39), Za = S(36, 39), Qa = S(37, 39), eo = S(90, 39), to = S(90, 39), ro = S(40, 49), no = S(41, 49), so = S(42, 49), io = S(43, 49), ao = S(44, 49), oo = S(45, 49), co = S(46, 49), lo = S(47, 49);
});
var es;
var ts;
var rs;
var ns;
var Yt;
var G = P(() => {
  ({ replace: es } = ""), ts = /[&<>'"]/g, rs = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }, ns = (e2) => rs[e2], Yt = (e2) => es.call(e2, ts, ns);
});
function Xt(e2) {
  var t, r, n = "";
  if (typeof e2 == "string" || typeof e2 == "number")
    n += e2;
  else if (typeof e2 == "object")
    if (Array.isArray(e2)) {
      var s = e2.length;
      for (t = 0; t < s; t++)
        e2[t] && (r = Xt(e2[t])) && (n && (n += " "), n += r);
    } else
      for (r in e2)
        e2[r] && (n && (n += " "), n += r);
  return n;
}
function Ve() {
  for (var e2, t, r = 0, n = "", s = arguments.length; r < s; r++)
    (e2 = arguments[r]) && (t = Xt(e2)) && (n && (n += " "), n += t);
  return n;
}
var J = P(() => {
});
var ae = te((mo, Kt) => {
  "use strict";
  var ss = {}, is = ss.hasOwnProperty, as = function(t, r) {
    if (!t)
      return r;
    var n = {};
    for (var s in r)
      n[s] = is.call(t, s) ? t[s] : r[s];
    return n;
  }, os = /[ -,\.\/:-@\[-\^`\{-~]/, cs = /[ -,\.\/:-@\[\]\^`\{-~]/, ls = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g, ze = function e2(t, r) {
    r = as(r, e2.options), r.quotes != "single" && r.quotes != "double" && (r.quotes = "single");
    for (var n = r.quotes == "double" ? '"' : "'", s = r.isIdentifier, i = t.charAt(0), a = "", o = 0, l = t.length; o < l; ) {
      var p = t.charAt(o++), c = p.charCodeAt(), u = void 0;
      if (c < 32 || c > 126) {
        if (c >= 55296 && c <= 56319 && o < l) {
          var d = t.charCodeAt(o++);
          (d & 64512) == 56320 ? c = ((c & 1023) << 10) + (d & 1023) + 65536 : o--;
        }
        u = "\\" + c.toString(16).toUpperCase() + " ";
      } else
        r.escapeEverything ? os.test(p) ? u = "\\" + p : u = "\\" + c.toString(16).toUpperCase() + " " : /[\t\n\f\r\x0B]/.test(p) ? u = "\\" + c.toString(16).toUpperCase() + " " : p == "\\" || !s && (p == '"' && n == p || p == "'" && n == p) || s && cs.test(p) ? u = "\\" + p : u = p;
      a += u;
    }
    return s && (/^-[-\d]/.test(a) ? a = "\\-" + a.slice(1) : /\d/.test(i) && (a = "\\3" + i + " " + a.slice(1))), a = a.replace(ls, function(b, f, y) {
      return f && f.length % 2 ? b : (f || "") + y;
    }), !s && r.wrap ? n + a + n : a;
  };
  ze.options = { escapeEverything: false, isIdentifier: false, quotes: "single", wrap: false };
  ze.version = "3.0.0";
  Kt.exports = ze;
});
function ds(e2) {
  return e2.replace(/\r\n|\r(?!\n)|\n/g, `
`);
}
function us(e2, t) {
  if (!t || t.line === void 0 || t.column === void 0)
    return "";
  let r = ds(e2).split(`
`).map((a) => a.replace(/\t/g, "  ")), n = [];
  for (let a = -2; a <= 2; a++)
    r[t.line + a] && n.push(t.line + a);
  let s = 0;
  for (let a of n) {
    let o = `> ${a}`;
    o.length > s && (s = o.length);
  }
  let i = "";
  for (let a of n) {
    let o = a === t.line - 1;
    i += o ? "> " : "  ", i += `${a + 1} | ${r[a]}
`, o && (i += `${Array.from({ length: s }).join(" ")}  | ${Array.from({ length: t.column }).join(" ")}^
`);
  }
  return i;
}
function fs(e2) {
  return !(e2.length !== 3 || !e2[0] || typeof e2[0] != "object");
}
function br(e2, t, r) {
  let n = t?.split("/").pop()?.replace(".astro", "") ?? "", s = (...i) => {
    if (!fs(i))
      throw new m({ ...tr, message: tr.message(n) });
    return e2(...i);
  };
  return Object.defineProperty(s, "name", { value: n, writable: false }), s.isAstroComponentFactory = true, s.moduleId = t, s.propagation = r, s;
}
function ms(e2) {
  return br(e2.factory, e2.moduleId, e2.propagation);
}
function q(e2, t, r) {
  return typeof e2 == "function" ? br(e2, t, r) : ms(e2);
}
function hs() {
  return (t) => {
    if (typeof t == "string")
      throw new m({ ...rr, message: rr.message(JSON.stringify(t)) });
    let r = [...Object.values(t)];
    if (r.length === 0)
      throw new m({ ...nr, message: nr.message(JSON.stringify(t)) });
    return Promise.all(r.map((n) => n()));
  };
}
function W(e2) {
  return { site: e2 ? new URL(e2) : void 0, generator: `Astro v${gt}`, glob: hs() };
}
async function wt(e2, t, r, n) {
  let { request: s, url: i } = t, a = s.method.toUpperCase(), o = e2[a] ?? e2.ALL;
  if (!r && r === false && a !== "GET" && n.warn("router", `${i.pathname} ${we(a)} requests are not available for a static site. Update your config to \`output: 'server'\` or \`output: 'hybrid'\` to enable.`), typeof o != "function")
    return n.warn("router", `No API Route handler exists for the method "${a}" for the route ${i.pathname}.
Found handlers: ${Object.keys(e2).map((p) => JSON.stringify(p)).join(", ")}
` + ("all" in e2 ? `One of the exported handlers is "all" (lowercase), did you mean to export 'ALL'?
` : "")), new Response(null, { status: 404 });
  let l = await o.call(e2, t);
  return (l.status === 404 || l.status === 500) && l.headers.set(pe, "no"), l;
}
function bt(e2) {
  return !!e2 && typeof e2 == "object" && typeof e2.then == "function";
}
function gs(e2) {
  return Object.prototype.toString.call(e2) === "[object HTMLString]";
}
function sr(e2) {
  return e2 && typeof e2 == "object" && e2[vr];
}
function be(e2) {
  return Object.defineProperty(e2, xr, { value: true });
}
function ys(e2) {
  return e2 && typeof e2 == "object" && e2[xr];
}
function Je(e2, t = {}, r = /* @__PURE__ */ new WeakSet()) {
  if (r.has(e2))
    throw new Error(`Cyclic reference detected while serializing props for <${t.displayName} client:${t.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  r.add(e2);
  let n = e2.map((s) => Ar(s, t, r));
  return r.delete(e2), n;
}
function Sr(e2, t = {}, r = /* @__PURE__ */ new WeakSet()) {
  if (r.has(e2))
    throw new Error(`Cyclic reference detected while serializing props for <${t.displayName} client:${t.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  r.add(e2);
  let n = Object.fromEntries(Object.entries(e2).map(([s, i]) => [s, Ar(i, t, r)]));
  return r.delete(e2), n;
}
function Ar(e2, t = {}, r = /* @__PURE__ */ new WeakSet()) {
  switch (Object.prototype.toString.call(e2)) {
    case "[object Date]":
      return [E.Date, e2.toISOString()];
    case "[object RegExp]":
      return [E.RegExp, e2.source];
    case "[object Map]":
      return [E.Map, Je(Array.from(e2), t, r)];
    case "[object Set]":
      return [E.Set, Je(Array.from(e2), t, r)];
    case "[object BigInt]":
      return [E.BigInt, e2.toString()];
    case "[object URL]":
      return [E.URL, e2.toString()];
    case "[object Array]":
      return [E.JSON, Je(e2, t, r)];
    case "[object Uint8Array]":
      return [E.Uint8Array, Array.from(e2)];
    case "[object Uint16Array]":
      return [E.Uint16Array, Array.from(e2)];
    case "[object Uint32Array]":
      return [E.Uint32Array, Array.from(e2)];
    default:
      return e2 !== null && typeof e2 == "object" ? [E.Value, Sr(e2, t, r)] : e2 === void 0 ? [E.Value] : [E.Value, e2];
  }
}
function $r(e2, t) {
  return JSON.stringify(Sr(e2, t));
}
function ws(e2, t) {
  let r = { isPage: false, hydration: null, props: {}, propsWithoutTransitionAttributes: {} };
  for (let [n, s] of Object.entries(e2))
    if (n.startsWith("server:") && n === "server:root" && (r.isPage = true), n.startsWith("client:"))
      switch (r.hydration || (r.hydration = { directive: "", value: "", componentUrl: "", componentExport: { value: "" } }), n) {
        case "client:component-path": {
          r.hydration.componentUrl = s;
          break;
        }
        case "client:component-export": {
          r.hydration.componentExport.value = s;
          break;
        }
        case "client:component-hydration":
          break;
        case "client:display-name":
          break;
        default: {
          if (r.hydration.directive = n.split(":")[1], r.hydration.value = s, !t.has(r.hydration.directive)) {
            let i = Array.from(t.keys()).map((a) => `client:${a}`).join(", ");
            throw new Error(`Error: invalid hydration directive "${n}". Supported hydration methods: ${i}`);
          }
          if (r.hydration.directive === "media" && typeof r.hydration.value != "string")
            throw new m(ps);
          break;
        }
      }
    else
      r.props[n] = s, Er.includes(n) || (r.propsWithoutTransitionAttributes[n] = s);
  for (let n of Object.getOwnPropertySymbols(e2))
    r.props[n] = e2[n], r.propsWithoutTransitionAttributes[n] = e2[n];
  return r;
}
async function bs(e2, t) {
  let { renderer: r, result: n, astroId: s, props: i, attrs: a } = e2, { hydrate: o, componentUrl: l, componentExport: p } = t;
  if (!p.value)
    throw new m({ ...er, message: er.message(t.displayName) });
  let c = { children: "", props: { uid: s } };
  if (a)
    for (let [d, b] of Object.entries(a))
      c.props[d] = ce(b);
  c.props["component-url"] = await n.resolve(decodeURI(l)), r.clientEntrypoint && (c.props["component-export"] = p.value, c.props["renderer-url"] = await n.resolve(decodeURI(r.clientEntrypoint)), c.props.props = ce($r(i, t))), c.props.ssr = "", c.props.client = o;
  let u = await n.resolve("astro:scripts/before-hydration.js");
  return u.length && (c.props["before-hydration-url"] = u), c.props.opts = ce(JSON.stringify({ name: t.displayName, value: t.hydrateArgs || "" })), Er.forEach((d) => {
    i[d] && (c.props[d] = i[d]);
  }), c;
}
function vs(e2) {
  let t = 0;
  if (e2.length === 0)
    return t;
  for (let r = 0; r < e2.length; r++) {
    let n = e2.charCodeAt(r);
    t = (t << 5) - t + n, t = t & t;
  }
  return t;
}
function xs(e2) {
  let t, r = "", n = vs(e2), s = n < 0 ? "Z" : "";
  for (n = Math.abs(n); n >= Ye; )
    t = n % Ye, n = Math.floor(n / Ye), r = Ke[t] + r;
  return n > 0 && (r = Ke[n] + r), s + r;
}
function Rr(e2) {
  return e2 == null ? false : e2.isAstroComponentFactory === true;
}
function Ss(e2, t) {
  let r = t.propagation || "none";
  return t.moduleId && e2.componentMetadata.has(t.moduleId) && r === "none" && (r = e2.componentMetadata.get(t.moduleId).propagation), r === "in-tree" || r === "self";
}
function vt(e2) {
  return typeof e2 == "object" && !!e2[As];
}
function Rs(e2) {
  return e2._metadata.hasHydrationScript ? false : e2._metadata.hasHydrationScript = true;
}
function js(e2, t) {
  return e2._metadata.hasDirectives.has(t) ? false : (e2._metadata.hasDirectives.add(t), true);
}
function ir(e2, t) {
  let n = e2.clientDirectives.get(t);
  if (!n)
    throw new Error(`Unknown directive: ${t}`);
  return n;
}
function Ts(e2, t, r) {
  switch (t) {
    case "both":
      return `${Es}<script>${ir(e2, r)};${$s}<\/script>`;
    case "directive":
      return `<script>${ir(e2, r)}<\/script>`;
  }
  return "";
}
function Ns(e2) {
  let t = "";
  for (let [r, n] of Object.entries(e2))
    t += `const ${Ms(r)} = ${JSON.stringify(n)?.replace(/<\/script>/g, "\\x3C/script>")};
`;
  return v(t);
}
function or(e2) {
  return e2.length === 1 ? e2[0] : `${e2.slice(0, -1).join(", ")} or ${e2[e2.length - 1]}`;
}
function I(e2, t, r = true) {
  if (e2 == null)
    return "";
  if (e2 === false)
    return Ls.test(t) || Is.test(t) ? v(` ${t}="false"`) : "";
  if (Cs.has(t))
    return console.warn(`[astro] The "${t}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${t}={value}\`) instead of the dynamic spread syntax (\`{...{ "${t}": value }}\`).`), "";
  if (t === "class:list") {
    let n = Y(Ve(e2), r);
    return n === "" ? "" : v(` ${t.slice(0, -5)}="${n}"`);
  }
  if (t === "style" && !(e2 instanceof F)) {
    if (Array.isArray(e2) && e2.length === 2)
      return v(` ${t}="${Y(`${ar(e2[0])};${e2[1]}`, r)}"`);
    if (typeof e2 == "object")
      return v(` ${t}="${Y(ar(e2), r)}"`);
  }
  return t === "className" ? v(` class="${Y(e2, r)}"`) : e2 === true && (t.startsWith("data-") || Ps.test(t)) ? v(` ${t}`) : v(` ${t}="${Y(e2, r)}"`);
}
function Ze(e2, t = true) {
  let r = "";
  for (let [n, s] of Object.entries(e2))
    r += I(s, n, t);
  return v(r);
}
function oe(e2, { props: t, children: r = "" }, n = true) {
  let { lang: s, "data-astro-id": i, "define:vars": a, ...o } = t;
  return a && (e2 === "style" && (delete o["is:global"], delete o["is:scoped"]), e2 === "script" && (delete o.hoist, r = Ns(a) + `
` + r)), (r == null || r == "") && xt.test(e2) ? `<${e2}${Ze(o, n)} />` : `<${e2}${Ze(o, n)}>${r}</${e2}>`;
}
function jr(e2) {
  let t = [], r = { write: (s) => t.push(s) }, n = e2(r);
  return { async renderToFinalDestination(s) {
    for (let i of t)
      s.write(i);
    r.write = (i) => s.write(i), await n;
  } };
}
function cr(e2) {
  e2._metadata.hasRenderedHead = true;
  let t = Array.from(e2.styles).filter(Xe).map((i) => i.props.rel === "stylesheet" ? oe("link", i) : oe("style", i));
  e2.styles.clear();
  let r = Array.from(e2.scripts).filter(Xe).map((i) => oe("script", i, false)), n = Array.from(e2.links).filter(Xe).map((i) => oe("link", i, false)), s = t.join(`
`) + n.join(`
`) + r.join(`
`);
  if (e2._metadata.extraHead.length > 0)
    for (let i of e2._metadata.extraHead)
      s += i;
  return v(s);
}
function* Tr() {
  yield be({ type: "head" });
}
function* Z() {
  yield be({ type: "maybe-head" });
}
function Os(e2) {
  return !!e2[Qe];
}
function je(e2, t, r) {
  return !t && r ? je(e2, r) : { async render(n) {
    await X(n, typeof t == "function" ? t(e2) : t);
  } };
}
async function V(e2, t, r) {
  let n = "", s = null, i = { write(o) {
    o instanceof Response || (typeof o == "object" && "type" in o && typeof o.type == "string" ? (s === null && (s = []), s.push(o)) : n += O(e2, o));
  } };
  return await je(e2, t, r).render(i), v(new ve(n, s));
}
async function Pr(e2, t = {}) {
  let r = null, n = {};
  return t && await Promise.all(Object.entries(t).map(([s, i]) => V(e2, i).then((a) => {
    a.instructions && (r === null && (r = []), r.push(...a.instructions)), n[s] = a;
  }))), { slotInstructions: r, children: n };
}
function St(e2, t) {
  if (ys(t)) {
    let r = t;
    switch (r.type) {
      case "directive": {
        let { hydration: n } = r, s = n && Rs(e2), i = n && js(e2, n.directive), a = s ? "both" : i ? "directive" : null;
        if (a) {
          let o = Ts(e2, a, n.directive);
          return v(o);
        } else
          return "";
      }
      case "head":
        return e2._metadata.hasRenderedHead || e2.partial ? "" : cr(e2);
      case "maybe-head":
        return e2._metadata.hasRenderedHead || e2._metadata.headInTree || e2.partial ? "" : cr(e2);
      case "renderer-hydration-script": {
        let { rendererSpecificHydrationScripts: n } = e2._metadata, { rendererName: s } = r;
        return n.has(s) ? "" : (n.add(s), r.render());
      }
      default:
        throw new Error(`Unknown chunk type: ${t.type}`);
    }
  } else {
    if (t instanceof Response)
      return "";
    if (Os(t)) {
      let r = "", n = t;
      if (n.instructions)
        for (let s of n.instructions)
          r += St(e2, s);
      return r += t.toString(), r;
    }
  }
  return t.toString();
}
function O(e2, t) {
  return ArrayBuffer.isView(t) ? Us.decode(t) : St(e2, t);
}
function Hs(e2, t) {
  if (ArrayBuffer.isView(t))
    return t;
  {
    let r = St(e2, t);
    return xe.encode(r.toString());
  }
}
function Ds(e2) {
  return !!e2 && typeof e2 == "object" && "render" in e2 && typeof e2.render == "function";
}
async function X(e2, t) {
  if (t = await t, t instanceof ve)
    e2.write(t);
  else if (gs(t))
    e2.write(t);
  else if (Array.isArray(t)) {
    let r = t.map((n) => jr((s) => X(s, n)));
    for (let n of r)
      n && await n.renderToFinalDestination(e2);
  } else if (typeof t == "function")
    await X(e2, t());
  else if (typeof t == "string")
    e2.write(v(ce(t)));
  else if (!(!t && t !== 0))
    if (Ds(t))
      await t.render(e2);
    else if (Cr(t))
      await t.render(e2);
    else if (Ws(t))
      await t.render(e2);
    else if (ArrayBuffer.isView(t))
      e2.write(t);
    else if (typeof t == "object" && (Symbol.asyncIterator in t || Symbol.iterator in t))
      for await (let r of t)
        await X(e2, r);
    else
      e2.write(t);
}
function Fs(e2, t) {
  if (e2 != null)
    for (let r of Object.keys(e2))
      r.startsWith("client:") && console.warn(`You are attempting to render <${t} ${r} />, but ${t} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`);
}
function qs(e2, t, r, n, s = {}) {
  Fs(n, t);
  let i = new et(e2, n, s, r);
  return Ss(e2, r) && e2._metadata.propagators.add(i), i;
}
function Ws(e2) {
  return typeof e2 == "object" && !!e2[Lr];
}
function Cr(e2) {
  return typeof e2 == "object" && !!e2[Ir];
}
function C(e2, ...t) {
  return new tt(e2, t);
}
async function Mr(e2, t, r, n, s = false, i) {
  let a = await _r(e2, t, r, n, i);
  if (a instanceof Response)
    return a;
  let o = "", l = false, p = { write(c) {
    if (s && !l && (l = true, !e2.partial && !/<!doctype html/i.test(String(c)))) {
      let u = e2.compressHTML ? "<!DOCTYPE html>" : `<!DOCTYPE html>
`;
      o += u;
    }
    c instanceof Response || (o += O(e2, c));
  } };
  return await a.render(p), o;
}
async function Vs(e2, t, r, n, s = false, i) {
  let a = await _r(e2, t, r, n, i);
  if (a instanceof Response)
    return a;
  let o = false;
  return s && await zs(e2), new ReadableStream({ start(l) {
    let p = { write(c) {
      if (s && !o && (o = true, !e2.partial && !/<!doctype html/i.test(String(c)))) {
        let d = e2.compressHTML ? "<!DOCTYPE html>" : `<!DOCTYPE html>
`;
        l.enqueue(xe.encode(d));
      }
      if (c instanceof Response)
        throw new m({ ...$e });
      let u = Hs(e2, c);
      l.enqueue(u);
    } };
    (async () => {
      try {
        await a.render(p), l.close();
      } catch (c) {
        m.is(c) && !c.loc && c.setLocation({ file: i?.component }), setTimeout(() => l.error(c), 0);
      }
    })();
  } });
}
async function _r(e2, t, r, n, s) {
  let i = await t(e2, r, n);
  if (i instanceof Response)
    return i;
  if (!Cr(i))
    throw new m({ ...Zt, message: Zt.message(s?.route, typeof i), location: { file: s?.component } });
  return vt(i) ? i.content : i;
}
async function zs(e2) {
  let t = e2._metadata.propagators.values();
  for (; ; ) {
    let { value: r, done: n } = t.next();
    if (n)
      break;
    let s = await r.init(e2);
    vt(s) && e2._metadata.extraHead.push(s.head);
  }
}
function Bs(e2) {
  return typeof HTMLElement < "u" && HTMLElement.isPrototypeOf(e2);
}
async function Gs(e2, t, r, n) {
  let s = Js(t), i = "";
  for (let a in r)
    i += ` ${a}="${Y(await r[a])}"`;
  return v(`<${s}${i}>${await V(e2, n?.default)}</${s}>`);
}
function Js(e2) {
  let t = customElements.getName(e2);
  return t || e2.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
}
function Xs(e2) {
  switch (e2?.split(".").pop()) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/solid-js", "@astrojs/vue (jsx)"];
    default:
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/solid-js", "@astrojs/vue", "@astrojs/svelte", "@astrojs/lit"];
  }
}
function Ks(e2) {
  return e2 === ks;
}
function Zs(e2) {
  return e2 && e2["astro:html"] === true;
}
function ti(e2, t) {
  let r = t ? ei : Qs;
  return e2.replace(r, "");
}
async function ri(e2, t, r, n, s = {}) {
  if (!r && !n["client:only"])
    throw new Error(`Unable to render ${t} because it is ${r}!
Did you forget to import the component or is it possible there is a typo?`);
  let { renderers: i, clientDirectives: a } = e2, o = { astroStaticSlot: true, displayName: t }, { hydration: l, isPage: p, props: c, propsWithoutTransitionAttributes: u } = ws(n, a), d = "", b;
  l && (o.hydrate = l.directive, o.hydrateArgs = l.value, o.componentExport = l.componentExport, o.componentUrl = l.componentUrl);
  let f = Xs(o.componentUrl), y = i.filter((h) => h.name !== "astro:jsx"), { children: w, slotInstructions: A } = await Pr(e2, s), g;
  if (o.hydrate !== "only") {
    let h = false;
    try {
      h = r && r[lr];
    } catch {
    }
    if (h) {
      let x = r[lr];
      g = i.find(({ name: $ }) => $ === x);
    }
    if (!g) {
      let x;
      for (let $ of i)
        try {
          if (await $.ssr.check.call({ result: e2 }, r, c, w)) {
            g = $;
            break;
          }
        } catch (ee) {
          x ??= ee;
        }
      if (!g && x)
        throw x;
    }
    if (!g && typeof HTMLElement == "function" && Bs(r)) {
      let x = await Gs(e2, r, n, s);
      return { render($) {
        $.write(x);
      } };
    }
  } else {
    if (o.hydrateArgs) {
      let h = o.hydrateArgs, x = pr.has(h) ? pr.get(h) : h;
      g = i.find(({ name: $ }) => $ === `@astrojs/${x}` || $ === x);
    }
    if (!g && y.length === 1 && (g = y[0]), !g) {
      let h = o.componentUrl?.split(".").pop();
      g = i.filter(({ name: x }) => x === `@astrojs/${h}` || x === h)[0];
    }
  }
  if (g)
    o.hydrate === "only" ? d = await V(e2, s?.fallback) : { html: d, attrs: b } = await g.ssr.renderToStaticMarkup.call({ result: e2 }, r, u, w, o);
  else {
    if (o.hydrate === "only")
      throw new m({ ...Ge, message: Ge.message(o.displayName), hint: Ge.hint(f.map((h) => h.replace("@astrojs/", "")).join("|")) });
    if (typeof r != "string") {
      let h = y.filter(($) => f.includes($.name)), x = y.length > 1;
      if (h.length === 0)
        throw new m({ ...Be, message: Be.message(o.displayName, o?.componentUrl?.split(".").pop(), x, y.length), hint: Be.hint(or(f.map(($) => "`" + $ + "`"))) });
      if (h.length === 1)
        g = h[0], { html: d, attrs: b } = await g.ssr.renderToStaticMarkup.call({ result: e2 }, r, u, w, o);
      else
        throw new Error(`Unable to render ${o.displayName}!

This component likely uses ${or(f)},
but Astro encountered an error during server-side rendering.

Please ensure that ${o.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
    }
  }
  if (g && !g.clientEntrypoint && g.name !== "@astrojs/lit" && o.hydrate)
    throw new m({ ...Qt, message: Qt.message(t, o.hydrate, g.name) });
  if (!d && typeof r == "string") {
    let h = ni(r), x = Object.values(w).join(""), $ = C`<${h}${Ze(c)}${v(x === "" && xt.test(h) ? "/>" : `>${x}</${h}>`)}`;
    d = "";
    let ee = { write(Dt) {
      Dt instanceof Response || (d += O(e2, Dt));
    } };
    await $.render(ee);
  }
  if (!l)
    return { render(h) {
      if (A)
        for (let x of A)
          h.write(x);
      p || g?.name === "astro:jsx" ? h.write(d) : d && d.length > 0 && h.write(v(ti(d, g?.ssr?.supportsAstroStaticSlot ?? false)));
    } };
  let R = xs(`<!--${o.componentExport.value}:${o.componentUrl}-->
${d}
${$r(c, o)}`), T = await bs({ renderer: g, result: e2, astroId: R, props: c, attrs: b }, o), _ = [];
  if (d) {
    if (Object.keys(w).length > 0)
      for (let h of Object.keys(w)) {
        let x = g?.ssr?.supportsAstroStaticSlot ? o.hydrate ? "astro-slot" : "astro-static-slot" : "astro-slot", $ = h === "default" ? `<${x}>` : `<${x} name="${h}">`;
        d.includes($) || _.push(h);
      }
  } else
    _ = Object.keys(w);
  let L = _.length > 0 ? _.map((h) => `<template data-astro-template${h !== "default" ? `="${h}"` : ""}>${w[h]}</template>`).join("") : "";
  return T.children = `${d ?? ""}${L}`, T.children && (T.props["await-children"] = "", T.children += "<!--astro:end-->"), { render(h) {
    if (A)
      for (let x of A)
        h.write(x);
    h.write(be({ type: "directive", hydration: l })), l.directive !== "only" && g?.ssr.renderHydrationScript && h.write(be({ type: "renderer-hydration-script", rendererName: g.name, render: g.ssr.renderHydrationScript })), h.write(v(oe("astro-island", T, false)));
  } };
}
function ni(e2) {
  let t = /[&<>'"\s]+/g;
  return t.test(e2) ? e2.trim().split(t)[0].trim() : e2;
}
async function si(e2, t = {}) {
  let r = await V(e2, t?.default);
  return { render(n) {
    r != null && n.write(r);
  } };
}
async function ii(e2, t, r, n = {}) {
  let { slotInstructions: s, children: i } = await Pr(e2, n), a = t({ slots: i }), o = s ? s.map((l) => O(e2, l)).join("") : "";
  return { render(l) {
    l.write(v(o + a));
  } };
}
function ai(e2, t, r, n, s = {}) {
  let i = qs(e2, t, r, n, s);
  return { async render(a) {
    await i.render(a);
  } };
}
async function Te(e2, t, r, n, s = {}) {
  return bt(r) && (r = await r), Ks(r) ? await si(e2, s) : (n = oi(n), Zs(r) ? await ii(e2, r, n, s) : Rr(r) ? ai(e2, t, r, n, s) : await ri(e2, t, r, n, s));
}
function oi(e2) {
  if (e2["class:list"] !== void 0) {
    let t = e2["class:list"];
    delete e2["class:list"], e2.class = Ve(e2.class, t), e2.class === "" && delete e2.class;
  }
  return e2;
}
async function rt(e2, t, r, n, s = {}, i = false, a) {
  let o = "", l = false, p = "";
  if (ci(r))
    for (let c of Z())
      p += O(e2, c);
  try {
    let c = { write(d) {
      if (i && !l && (l = true, !e2.partial && !/<!doctype html/i.test(String(d)))) {
        let b = e2.compressHTML ? "<!DOCTYPE html>" : `<!DOCTYPE html>
`;
        o += b + p;
      }
      d instanceof Response || (o += O(e2, d));
    } };
    await (await Te(e2, t, r, n, s)).render(c);
  } catch (c) {
    throw m.is(c) && !c.loc && c.setLocation({ file: a?.component }), c;
  }
  return o;
}
function ci(e2) {
  return !!e2?.[Ys];
}
async function N(e2, t) {
  switch (true) {
    case t instanceof F:
      return t.toString().trim() === "" ? "" : t;
    case typeof t == "string":
      return v(ce(t));
    case typeof t == "function":
      return t;
    case (!t && t !== 0):
      return "";
    case Array.isArray(t):
      return v((await Promise.all(t.map((n) => N(e2, n)))).join(""));
  }
  let r;
  return t.props ? t.props[D.symbol] ? r = t.props[D.symbol] : r = new D(t) : r = new D(t), st(e2, t, r);
}
async function st(e2, t, r) {
  if (sr(t)) {
    switch (true) {
      case !t.type:
        throw new Error(`Unable to render ${e2.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
      case t.type === Symbol.for("astro:fragment"):
        return N(e2, t.props.children);
      case t.type.isAstroComponentFactory: {
        let n = {}, s = {};
        for (let [o, l] of Object.entries(t.props ?? {}))
          o === "children" || l && typeof l == "object" && l.$$slot ? s[o === "children" ? "default" : o] = () => N(e2, l) : n[o] = l;
        let i = await Mr(e2, t.type, n, s);
        if (i instanceof Response)
          throw i;
        return v(i);
      }
      case (!t.type && t.type !== 0):
        return "";
      case (typeof t.type == "string" && t.type !== dr):
        return v(await li(e2, t.type, t.props ?? {}));
    }
    if (t.type) {
      let n = function(c) {
        if (Array.isArray(c))
          return c.map((u) => n(u));
        if (!sr(c)) {
          a.default.push(c);
          return;
        }
        if ("slot" in c.props) {
          a[c.props.slot] = [...a[c.props.slot] ?? [], c], delete c.props.slot;
          return;
        }
        a.default.push(c);
      };
      if (typeof t.type == "function" && t.type["astro:renderer"] && r.increment(), typeof t.type == "function" && t.props["server:root"]) {
        let c = await t.type(t.props ?? {});
        return await N(e2, c);
      }
      if (typeof t.type == "function")
        if (r.haveNoTried() || r.isCompleted()) {
          di();
          try {
            let c = await t.type(t.props ?? {}), u;
            if (c?.[vr])
              return u = await st(e2, c, r), u;
            if (!c)
              return u = await st(e2, c, r), u;
          } catch (c) {
            if (r.isCompleted())
              throw c;
            r.increment();
          } finally {
            ui();
          }
        } else
          r.increment();
      let { children: s = null, ...i } = t.props ?? {}, a = { default: [] };
      n(s);
      for (let [c, u] of Object.entries(i))
        u.$$slot && (a[c] = u, delete i[c]);
      let o = [], l = {};
      for (let [c, u] of Object.entries(a))
        o.push(N(e2, u).then((d) => {
          d.toString().trim().length !== 0 && (l[c] = () => d);
        }));
      await Promise.all(o), i[D.symbol] = r;
      let p;
      return t.type === dr && t.props["client:only"] ? p = await rt(e2, t.props["client:display-name"] ?? "", null, i, l) : p = await rt(e2, typeof t.type == "function" ? t.type.name : t.type, t.type, i, l), v(p);
    }
  }
  return v(`${t}`);
}
async function li(e2, t, { children: r, ...n }) {
  return v(`<${t}${k(n)}${v((r == null || r == "") && xt.test(t) ? "/>" : `>${r == null ? "" : await N(e2, pi(t, r))}</${t}>`)}`);
}
function pi(e2, t) {
  return typeof t == "string" && (e2 === "style" || e2 === "script") ? v(t) : t;
}
function di() {
  if (At++, !nt) {
    nt = console.error;
    try {
      console.error = fi;
    } catch {
    }
  }
}
function ui() {
  At--;
}
function fi(e2, ...t) {
  At > 0 && typeof e2 == "string" && e2.includes("Warning: Invalid hook call.") && e2.includes("https://reactjs.org/link/invalid-hook-call") || nt(e2, ...t);
}
async function Nr(e2, t, r, n, s, i) {
  if (!Rr(t)) {
    e2._metadata.headInTree = e2.componentMetadata.get(t.moduleId)?.containsHead ?? false;
    let c = { ...r ?? {}, "server:root": true }, u = await rt(e2, t.name, t, c, {}, true, i), d = xe.encode(u);
    return new Response(d, { headers: new Headers([["Content-Type", "text/html; charset=utf-8"], ["Content-Length", d.byteLength.toString()]]) });
  }
  e2._metadata.headInTree = e2.componentMetadata.get(t.moduleId)?.containsHead ?? false;
  let a;
  if (s ? a = await Vs(e2, t, r, n, true, i) : a = await Mr(e2, t, r, n, true, i), a instanceof Response)
    return a;
  let o = e2.response, l = new Headers(o.headers);
  return !s && typeof a == "string" && (a = xe.encode(a), l.set("Content-Length", a.byteLength.toString())), i?.component.endsWith(".md") && l.set("Content-Type", "text/html; charset=utf-8"), new Response(a, { ...o, headers: l });
}
function k(e2 = {}, t, { class: r } = {}) {
  let n = "";
  r && (typeof e2.class < "u" ? e2.class += ` ${r}` : typeof e2["class:list"] < "u" ? e2["class:list"] = [e2["class:list"], r] : e2.class = r);
  for (let [s, i] of Object.entries(e2))
    n += I(i, s, true);
  return v(n);
}
var wo;
var le;
var it;
var Se;
var Zt;
var ps;
var Be;
var Qt;
var Ge;
var at;
var ot;
var ur;
var ct;
var fr;
var lt;
var er;
var tr;
var pt;
var dt;
var mr;
var ut;
var ft;
var hr;
var Ae;
var K;
var mt;
var gr;
var $e;
var yr;
var Ee;
var Re;
var ht;
var rr;
var nr;
var wr;
var m;
var gt;
var yt;
var pe;
var ce;
var F;
var v;
var vr;
var xr;
var E;
var Er;
var Ke;
var Ye;
var As;
var $s;
var Es;
var xt;
var Ps;
var Ls;
var Is;
var Cs;
var Ms;
var Y;
var _s;
var ar;
var Xe;
var Qe;
var ve;
var ks;
var lr;
var xe;
var Us;
var Lr;
var et;
var Ir;
var tt;
var Ys;
var pr;
var Qs;
var ei;
var dr;
var D;
var nt;
var At;
var Q = P(() => {
  ie();
  G();
  J();
  wo = U(ae(), 1), le = { name: "ClientAddressNotAvailable", title: "`Astro.clientAddress` is not available in current adapter.", message: (e2) => `\`Astro.clientAddress\` is not available in the \`${e2}\` adapter. File an issue with the adapter to add support.` }, it = { name: "StaticClientAddressNotAvailable", title: "`Astro.clientAddress` is not available in static mode.", message: "`Astro.clientAddress` is only available when using `output: 'server'` or `output: 'hybrid'`. Update your Astro config if you need SSR features.", hint: "See https://docs.astro.build/en/guides/server-side-rendering/ for more information on how to enable SSR." }, Se = { name: "NoMatchingStaticPathFound", title: "No static path found for requested path.", message: (e2) => `A \`getStaticPaths()\` route pattern was matched, but no matching static path was found for requested path \`${e2}\`.`, hint: (e2) => `Possible dynamic routes being matched: ${e2.join(", ")}.` }, Zt = { name: "OnlyResponseCanBeReturned", title: "Invalid type returned by Astro page.", message: (e2, t) => `Route \`${e2 || ""}\` returned a \`${t}\`. Only a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) can be returned from Astro files.`, hint: "See https://docs.astro.build/en/guides/server-side-rendering/#response for more information." }, ps = { name: "MissingMediaQueryDirective", title: "Missing value for `client:media` directive.", message: 'Media query not provided for `client:media` directive. A media query similar to `client:media="(max-width: 600px)"` must be provided' }, Be = { name: "NoMatchingRenderer", title: "No matching renderer found.", message: (e2, t, r, n) => `Unable to render \`${e2}\`.

${n > 0 ? `There ${r ? "are" : "is"} ${n} renderer${r ? "s" : ""} configured in your \`astro.config.mjs\` file,
but ${r ? "none were" : "it was not"} able to server-side render \`${e2}\`.` : `No valid renderer was found ${t ? `for the \`.${t}\` file extension.` : "for this file extension."}`}`, hint: (e2) => `Did you mean to enable the ${e2} integration?

See https://docs.astro.build/en/core-concepts/framework-components/ for more information on how to install and configure integrations.` }, Qt = { name: "NoClientEntrypoint", title: "No client entrypoint specified in renderer.", message: (e2, t, r) => `\`${e2}\` component has a \`client:${t}\` directive, but no client entrypoint was provided by \`${r}\`.`, hint: "See https://docs.astro.build/en/reference/integrations-reference/#addrenderer-option for more information on how to configure your renderer." }, Ge = { name: "NoClientOnlyHint", title: "Missing hint on client:only directive.", message: (e2) => `Unable to render \`${e2}\`. When using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.`, hint: (e2) => `Did you mean to pass \`client:only="${e2}"\`? See https://docs.astro.build/en/reference/directives-reference/#clientonly for more information on client:only` }, at = { name: "InvalidGetStaticPathsEntry", title: "Invalid entry inside getStaticPath's return value", message: (e2) => `Invalid entry returned by getStaticPaths. Expected an object, got \`${e2}\``, hint: "If you're using a `.map` call, you might be looking for `.flatMap()` instead. See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." }, ot = { name: "InvalidGetStaticPathsReturn", title: "Invalid value returned by getStaticPaths.", message: (e2) => `Invalid type returned by \`getStaticPaths\`. Expected an \`array\`, got \`${e2}\``, hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." }, ur = { name: "GetStaticPathsExpectedParams", title: "Missing params property on `getStaticPaths` route.", message: "Missing or empty required `params` property on `getStaticPaths` route.", hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." }, ct = { name: "GetStaticPathsInvalidRouteParam", title: "Invalid value for `getStaticPaths` route parameter.", message: (e2, t, r) => `Invalid getStaticPaths route parameter for \`${e2}\`. Expected undefined, a string or a number, received \`${r}\` (\`${t}\`)`, hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." }, fr = { name: "GetStaticPathsRequired", title: "`getStaticPaths()` function required for dynamic routes.", message: "`getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.", hint: 'See https://docs.astro.build/en/core-concepts/routing/#dynamic-routes for more information on dynamic routes.\n\nAlternatively, set `output: "server"` or `output: "hybrid"` in your Astro config file to switch to a non-static server build. This error can also occur if using `export const prerender = true;`.\nSee https://docs.astro.build/en/guides/server-side-rendering/ for more information on non-static rendering.' }, lt = { name: "ReservedSlotName", title: "Invalid slot name.", message: (e2) => `Unable to create a slot named \`${e2}\`. \`${e2}\` is a reserved slot name. Please update the name of this slot.` }, er = { name: "NoMatchingImport", title: "No import found for component.", message: (e2) => `Could not render \`${e2}\`. No matching import has been found for \`${e2}\`.`, hint: "Please make sure the component is properly imported." }, tr = { name: "InvalidComponentArgs", title: "Invalid component arguments.", message: (e2) => `Invalid arguments passed to${e2 ? ` <${e2}>` : ""} component.`, hint: "Astro components cannot be rendered directly via function call, such as `Component()` or `{items.map(Component)}`." }, pt = { name: "PageNumberParamNotFound", title: "Page number param not found.", message: (e2) => `[paginate()] page number param \`${e2}\` not found in your filepath.`, hint: "Rename your file to `[page].astro` or `[...page].astro`." }, dt = { name: "ImageMissingAlt", title: 'Image missing required "alt" property.', message: 'Image missing "alt" property. "alt" text is required to describe important images on the page.', hint: 'Use an empty string ("") for decorative images.' }, mr = { name: "InvalidImageService", title: "Error while loading image service.", message: "There was an error loading the configured image service. Please see the stack trace for more information." }, ut = { name: "MissingImageDimension", title: "Missing image dimensions", message: (e2, t) => `Missing ${e2 === "both" ? "width and height attributes" : `${e2} attribute`} for ${t}. When using remote images, both dimensions are always required in order to avoid CLS.`, hint: "If your image is inside your `src` folder, you probably meant to import it instead. See [the Imports guide for more information](https://docs.astro.build/en/guides/imports/#other-assets)." }, ft = { name: "UnsupportedImageFormat", title: "Unsupported image format", message: (e2, t, r) => `Received unsupported format \`${e2}\` from \`${t}\`. Currently only ${r.join(", ")} are supported by our image services.`, hint: "Using an `img` tag directly instead of the `Image` component might be what you're looking for." }, hr = { name: "UnsupportedImageConversion", title: "Unsupported image conversion", message: "Converting between vector (such as SVGs) and raster (such as PNGs and JPEGs) images is not currently supported." }, Ae = { name: "PrerenderDynamicEndpointPathCollide", title: "Prerendered dynamic endpoint has path collision.", message: (e2) => `Could not render \`${e2}\` with an \`undefined\` param as the generated path will collide during prerendering. Prevent passing \`undefined\` as \`params\` for the endpoint's \`getStaticPaths()\` function, or add an additional extension to the endpoint's filename.`, hint: (e2) => `Rename \`${e2}\` to \`${e2.replace(/\.(js|ts)/, (t) => ".json" + t)}\`` }, K = { name: "ExpectedImage", title: "Expected src to be an image.", message: (e2, t, r) => `Expected \`src\` property for \`getImage\` or \`<Image />\` to be either an ESM imported image or a string with the path of a remote image. Received \`${e2}\` (type: \`${t}\`).

Full serialized options received: \`${r}\`.`, hint: "This error can often happen because of a wrong path. Make sure the path to your image is correct. If you're passing an async function, make sure to call and await it." }, mt = { name: "ExpectedImageOptions", title: "Expected image options.", message: (e2) => `Expected getImage() parameter to be an object. Received \`${e2}\`.` }, gr = { name: "IncompatibleDescriptorOptions", title: "Cannot set both `densities` and `widths`", message: "Only one of `densities` or `widths` can be specified. In most cases, you'll probably want to use only `widths` if you require specific widths.", hint: "Those attributes are used to construct a `srcset` attribute, which cannot have both `x` and `w` descriptors." }, $e = { name: "ResponseSentError", title: "Unable to set response.", message: "The response has already been sent to the browser and cannot be altered." }, yr = { name: "MiddlewareNoDataOrNextCalled", title: "The middleware didn't return a `Response`.", message: "Make sure your middleware returns a `Response` object, either directly or by returning the `Response` from calling the `next` function." }, Ee = { name: "MiddlewareNotAResponse", title: "The middleware returned something that is not a `Response` object.", message: "Any data returned from middleware must be a valid `Response` object." }, Re = { name: "LocalsNotAnObject", title: "Value assigned to `locals` is not accepted.", message: "`locals` can only be assigned to an object. Other values like numbers, strings, etc. are not accepted.", hint: "If you tried to remove some information from the `locals` object, try to use `delete` or set the property to `undefined`." }, ht = { name: "LocalImageUsedWrongly", title: "Local images must be imported.", message: (e2) => `\`Image\`'s and \`getImage\`'s \`src\` parameter must be an imported image or an URL, it cannot be a string filepath. Received \`${e2}\`.`, hint: "If you want to use an image from your `src` folder, you need to either import it or if the image is coming from a content collection, use the [image() schema helper](https://docs.astro.build/en/guides/images/#images-in-content-collections). See https://docs.astro.build/en/guides/images/#src-required for more information on the `src` property." }, rr = { name: "AstroGlobUsedOutside", title: "Astro.glob() used outside of an Astro file.", message: (e2) => `\`Astro.glob(${e2})\` can only be used in \`.astro\` files. \`import.meta.glob(${e2})\` can be used instead to achieve a similar result.`, hint: "See Vite's documentation on `import.meta.glob` for more information: https://vitejs.dev/guide/features.html#glob-import" }, nr = { name: "AstroGlobNoMatch", title: "Astro.glob() did not match any files.", message: (e2) => `\`Astro.glob(${e2})\` did not return any matching files.`, hint: "Check the pattern for typos." }, wr = { name: "CantRenderPage", title: "Astro can't render the route.", message: "Astro cannot find any content to render for this route. There is no file or redirect associated with this route.", hint: "If you expect to find a route here, this may be an Astro bug. Please file an issue/restart the dev server" };
  m = class extends Error {
    loc;
    title;
    hint;
    frame;
    type = "AstroError";
    constructor(t, r) {
      let { name: n, title: s, message: i, stack: a, location: o, hint: l, frame: p } = t;
      super(i, r), this.title = s, this.name = n, i && (this.message = i), this.stack = a || this.stack, this.loc = o, this.hint = l, this.frame = p;
    }
    setLocation(t) {
      this.loc = t;
    }
    setName(t) {
      this.name = t;
    }
    setMessage(t) {
      this.message = t;
    }
    setHint(t) {
      this.hint = t;
    }
    setFrame(t, r) {
      this.frame = us(t, r);
    }
    static is(t) {
      return t.type === "AstroError";
    }
  }, gt = "4.2.8", yt = "astro.routeData", pe = "X-Astro-Reroute";
  ce = Yt, F = class extends String {
    get [Symbol.toStringTag]() {
      return "HTMLString";
    }
  }, v = (e2) => e2 instanceof F ? e2 : typeof e2 == "string" ? new F(e2) : e2;
  vr = "astro:jsx";
  xr = Symbol.for("astro:render");
  E = { Value: 0, JSON: 1, RegExp: 2, Date: 3, Map: 4, Set: 5, BigInt: 6, URL: 7, Uint8Array: 8, Uint16Array: 9, Uint32Array: 10 };
  Er = Object.freeze(["data-astro-transition-scope", "data-astro-transition-persist"]);
  Ke = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY", Ye = Ke.length;
  As = Symbol.for("astro.headAndContent");
  $s = '(()=>{var b=Object.defineProperty;var f=(c,o,i)=>o in c?b(c,o,{enumerable:!0,configurable:!0,writable:!0,value:i}):c[o]=i;var l=(c,o,i)=>(f(c,typeof o!="symbol"?o+"":o,i),i);var p;{let c={0:t=>m(t),1:t=>i(t),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(i(t)),5:t=>new Set(i(t)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(t),9:t=>new Uint16Array(t),10:t=>new Uint32Array(t)},o=t=>{let[e,r]=t;return e in c?c[e](r):void 0},i=t=>t.map(o),m=t=>typeof t!="object"||t===null?t:Object.fromEntries(Object.entries(t).map(([e,r])=>[e,o(r)]));customElements.get("astro-island")||customElements.define("astro-island",(p=class extends HTMLElement{constructor(){super(...arguments);l(this,"Component");l(this,"hydrator");l(this,"hydrate",async()=>{var d;if(!this.hydrator||!this.isConnected)return;let e=(d=this.parentElement)==null?void 0:d.closest("astro-island[ssr]");if(e){e.addEventListener("astro:hydrate",this.hydrate,{once:!0});return}let r=this.querySelectorAll("astro-slot"),a={},h=this.querySelectorAll("template[data-astro-template]");for(let n of h){let s=n.closest(this.tagName);s!=null&&s.isSameNode(this)&&(a[n.getAttribute("data-astro-template")||"default"]=n.innerHTML,n.remove())}for(let n of r){let s=n.closest(this.tagName);s!=null&&s.isSameNode(this)&&(a[n.getAttribute("name")||"default"]=n.innerHTML)}let u;try{u=this.hasAttribute("props")?m(JSON.parse(this.getAttribute("props"))):{}}catch(n){let s=this.getAttribute("component-url")||"<unknown>",y=this.getAttribute("component-export");throw y&&(s+=` (export ${y})`),console.error(`[hydrate] Error parsing props for component ${s}`,this.getAttribute("props"),n),n}await this.hydrator(this)(this.Component,u,a,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),this.dispatchEvent(new CustomEvent("astro:hydrate"))});l(this,"unmount",()=>{this.isConnected||this.dispatchEvent(new CustomEvent("astro:unmount"))})}disconnectedCallback(){document.removeEventListener("astro:after-swap",this.unmount),document.addEventListener("astro:after-swap",this.unmount,{once:!0})}connectedCallback(){if(!this.hasAttribute("await-children")||document.readyState==="interactive"||document.readyState==="complete")this.childrenConnectedCallback();else{let e=()=>{document.removeEventListener("DOMContentLoaded",e),r.disconnect(),this.childrenConnectedCallback()},r=new MutationObserver(()=>{var a;((a=this.lastChild)==null?void 0:a.nodeType)===Node.COMMENT_NODE&&this.lastChild.nodeValue==="astro:end"&&(this.lastChild.remove(),e())});r.observe(this,{childList:!0}),document.addEventListener("DOMContentLoaded",e)}}async childrenConnectedCallback(){let e=this.getAttribute("before-hydration-url");e&&await import(e),this.start()}start(){let e=JSON.parse(this.getAttribute("opts")),r=this.getAttribute("client");if(Astro[r]===void 0){window.addEventListener(`astro:${r}`,()=>this.start(),{once:!0});return}Astro[r](async()=>{let a=this.getAttribute("renderer-url"),[h,{default:u}]=await Promise.all([import(this.getAttribute("component-url")),a?import(a):()=>()=>{}]),d=this.getAttribute("component-export")||"default";if(!d.includes("."))this.Component=h[d];else{this.Component=h;for(let n of d.split("."))this.Component=this.Component[n]}return this.hydrator=u,this.hydrate},e,this)}attributeChangedCallback(){this.hydrate()}},l(p,"observedAttributes",["props"]),p))}})();', Es = "<style>astro-island,astro-slot,astro-static-slot{display:contents}</style>";
  xt = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i, Ps = /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i, Ls = /^(contenteditable|draggable|spellcheck|value)$/i, Is = /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i, Cs = /* @__PURE__ */ new Set(["set:html", "set:text"]), Ms = (e2) => e2.trim().replace(/(?:(?!^)\b\w|\s+|[^\w]+)/g, (t, r) => /[^\w]|\s/.test(t) ? "" : r === 0 ? t : t.toUpperCase()), Y = (e2, t = true) => t ? String(e2).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : e2, _s = (e2) => e2.toLowerCase() === e2 ? e2 : e2.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`), ar = (e2) => Object.entries(e2).filter(([t, r]) => typeof r == "string" && r.trim() || typeof r == "number").map(([t, r]) => t[0] !== "-" && t[1] !== "-" ? `${_s(t)}:${r}` : `${t}:${r}`).join(";");
  Xe = (e2, t, r) => {
    let n = JSON.stringify(e2.props), s = e2.children;
    return t === r.findIndex((i) => JSON.stringify(i.props) === n && i.children == s);
  };
  Qe = Symbol.for("astro:slot-string"), ve = class extends F {
    instructions;
    [Qe];
    constructor(t, r) {
      super(t), this.instructions = r, this[Qe] = true;
    }
  };
  ks = Symbol.for("astro:fragment"), lr = Symbol.for("astro:renderer"), xe = new TextEncoder(), Us = new TextDecoder();
  Lr = Symbol.for("astro.componentInstance"), et = class {
    [Lr] = true;
    result;
    props;
    slotValues;
    factory;
    returnValue;
    constructor(t, r, n, s) {
      this.result = t, this.props = r, this.factory = s, this.slotValues = {};
      for (let i in n) {
        let a = false, o = n[i](t);
        this.slotValues[i] = () => a ? n[i](t) : (a = true, o);
      }
    }
    async init(t) {
      return this.returnValue !== void 0 ? this.returnValue : (this.returnValue = this.factory(t, this.props, this.slotValues), this.returnValue);
    }
    async render(t) {
      this.returnValue === void 0 && await this.init(this.result);
      let r = this.returnValue;
      bt(r) && (r = await r), vt(r) ? await r.content.render(t) : await X(t, r);
    }
  };
  Ir = Symbol.for("astro.renderTemplateResult"), tt = class {
    [Ir] = true;
    htmlParts;
    expressions;
    error;
    constructor(t, r) {
      this.htmlParts = t, this.error = void 0, this.expressions = r.map((n) => bt(n) ? Promise.resolve(n).catch((s) => {
        if (!this.error)
          throw this.error = s, s;
      }) : n);
    }
    async render(t) {
      let r = this.expressions.map((n) => jr((s) => {
        if (n || n === 0)
          return X(s, n);
      }));
      for (let n = 0; n < this.htmlParts.length; n++) {
        let s = this.htmlParts[n], i = r[n];
        t.write(v(s)), i && await i.renderToFinalDestination(t);
      }
    }
  };
  Ys = Symbol.for("astro.needsHeadRendering"), pr = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
  Qs = /\<\/?astro-slot\b[^>]*>/g, ei = /\<\/?astro-static-slot\b[^>]*>/g;
  dr = "astro-client-only", D = class {
    constructor(t) {
      this.vnode = t, this.count = 0;
    }
    count;
    increment() {
      this.count++;
    }
    haveNoTried() {
      return this.count === 0;
    }
    isCompleted() {
      return this.count > 2;
    }
    static symbol = Symbol("astro:jsx:skip");
  }, At = 0;
});
var zr = te((Io, Vr) => {
  "use strict";
  function Ie() {
    this._types = /* @__PURE__ */ Object.create(null), this._extensions = /* @__PURE__ */ Object.create(null);
    for (let e2 = 0; e2 < arguments.length; e2++)
      this.define(arguments[e2]);
    this.define = this.define.bind(this), this.getType = this.getType.bind(this), this.getExtension = this.getExtension.bind(this);
  }
  Ie.prototype.define = function(e2, t) {
    for (let r in e2) {
      let n = e2[r].map(function(s) {
        return s.toLowerCase();
      });
      r = r.toLowerCase();
      for (let s = 0; s < n.length; s++) {
        let i = n[s];
        if (i[0] !== "*") {
          if (!t && i in this._types)
            throw new Error('Attempt to change mapping for "' + i + '" extension from "' + this._types[i] + '" to "' + r + '". Pass `force=true` to allow this, otherwise remove "' + i + '" from the list of extensions for "' + r + '".');
          this._types[i] = r;
        }
      }
      if (t || !this._extensions[r]) {
        let s = n[0];
        this._extensions[r] = s[0] !== "*" ? s : s.substr(1);
      }
    }
  };
  Ie.prototype.getType = function(e2) {
    e2 = String(e2);
    let t = e2.replace(/^.*[/\\]/, "").toLowerCase(), r = t.replace(/^.*\./, "").toLowerCase(), n = t.length < e2.length;
    return (r.length < t.length - 1 || !n) && this._types[r] || null;
  };
  Ie.prototype.getExtension = function(e2) {
    return e2 = /^\s*([^;\s]*)/.test(e2) && RegExp.$1, e2 && this._extensions[e2.toLowerCase()] || null;
  };
  Vr.exports = Ie;
});
var Gr = te((Co, Br) => {
  Br.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
});
var Yr = te((Mo, Jr) => {
  "use strict";
  var Ai = zr();
  Jr.exports = new Ai(Gr());
});
var en = {};
re(en, { D: () => Ce, a: () => Rt, b: () => Et, c: () => Me, i: () => M, n: () => Ii });
function M(e2) {
  return typeof e2 == "object";
}
function Et(e2) {
  return typeof e2 == "string";
}
function $i(e2, t) {
  return Ri(e2, t.protocol) && Qr(e2, t.hostname, true) && Ei(e2, t.port) && ji(e2, t.pathname, true);
}
function Ei(e2, t) {
  return !t || t === e2.port;
}
function Ri(e2, t) {
  return !t || t === e2.protocol.slice(0, -1);
}
function Qr(e2, t, r) {
  if (t) {
    if (!r || !t.startsWith("*"))
      return t === e2.hostname;
    if (t.startsWith("**.")) {
      let n = t.slice(2);
      return n !== e2.hostname && e2.hostname.endsWith(n);
    } else if (t.startsWith("*.")) {
      let n = t.slice(1);
      return e2.hostname.replace(n, "").split(".").filter(Boolean).length === 1;
    }
  } else
    return true;
  return false;
}
function ji(e2, t, r) {
  if (t) {
    if (!r || !t.endsWith("*"))
      return t === e2.pathname;
    if (t.endsWith("/**")) {
      let n = t.slice(0, -2);
      return n !== e2.pathname && e2.pathname.startsWith(n);
    } else if (t.endsWith("/*")) {
      let n = t.slice(0, -1);
      return e2.pathname.replace(n, "").split("/").filter(Boolean).length === 1;
    }
  } else
    return true;
  return false;
}
function Me(e2, { domains: t = [], remotePatterns: r = [] }) {
  if (!B(e2))
    return false;
  let n = new URL(e2);
  return t.some((s) => Qr(n, s)) || r.some((s) => $i(n, s));
}
function Rt(e2) {
  return e2 ? "transform" in e2 : false;
}
function Zr(e2) {
  let t = e2.width, r = e2.height;
  if (M(e2.src)) {
    let n = e2.src.width / e2.src.height;
    r && !t ? t = Math.round(r * n) : t && !r ? r = Math.round(t / n) : !t && !r && (t = e2.src.width, r = e2.src.height);
  }
  return { targetWidth: t, targetHeight: r };
}
var Xr;
var Kr;
var Ce;
var Ti;
var Pi;
var Li;
var Ii;
var jt = P(() => {
  se();
  Q();
  Xr = ["jpeg", "jpg", "png", "tiff", "webp", "gif", "svg", "avif"], Kr = "webp", Ce = ["src", "width", "height", "format", "quality"];
  Ti = { propertiesToHash: Ce, validateOptions(e2) {
    if (!e2.src || typeof e2.src != "string" && typeof e2.src != "object")
      throw new m({ ...K, message: K.message(JSON.stringify(e2.src), typeof e2.src, JSON.stringify(e2, (t, r) => r === void 0 ? null : r)) });
    if (M(e2.src)) {
      if (!Xr.includes(e2.src.format))
        throw new m({ ...ft, message: ft.message(e2.src.format, e2.src.src, Xr) });
      if (e2.widths && e2.densities)
        throw new m(gr);
      if (e2.src.format === "svg" && (e2.format = "svg"), e2.src.format === "svg" && e2.format !== "svg" || e2.src.format !== "svg" && e2.format === "svg")
        throw new m(hr);
    } else {
      if (e2.src.startsWith("/@fs/") || !B(e2.src) && !e2.src.startsWith("/"))
        throw new m({ ...ht, message: ht.message(e2.src) });
      let t;
      if (!e2.width && !e2.height ? t = "both" : !e2.width && e2.height ? t = "width" : e2.width && !e2.height && (t = "height"), t)
        throw new m({ ...ut, message: ut.message(t, e2.src) });
    }
    return e2.format || (e2.format = Kr), e2.width && (e2.width = Math.round(e2.width)), e2.height && (e2.height = Math.round(e2.height)), e2;
  }, getHTMLAttributes(e2) {
    let { targetWidth: t, targetHeight: r } = Zr(e2), { src: n, width: s, height: i, format: a, quality: o, densities: l, widths: p, formats: c, ...u } = e2;
    return { ...u, width: t, height: r, loading: u.loading ?? "lazy", decoding: u.decoding ?? "async" };
  }, getSrcSet(e2) {
    let t = [], { targetWidth: r } = Zr(e2), { widths: n, densities: s } = e2, i = e2.format ?? Kr, a = e2.width, o = 1 / 0;
    M(e2.src) && (a = e2.src.width, o = a);
    let { width: l, height: p, ...c } = e2, u = [];
    if (s) {
      let d = s.map((f) => typeof f == "number" ? f : parseFloat(f)), b = d.sort().map((f) => Math.round(r * f));
      u.push(...b.map((f, y) => ({ maxTargetWidth: Math.min(f, o), descriptor: `${d[y]}x` })));
    } else
      n && u.push(...n.map((d) => ({ maxTargetWidth: Math.min(d, o), descriptor: `${d}w` })));
    for (let { maxTargetWidth: d, descriptor: b } of u) {
      let f = { ...c };
      d !== a ? f.width = d : e2.width && e2.height && (f.width = e2.width, f.height = e2.height), t.push({ transform: f, descriptor: b, attributes: { type: `image/${i}` } });
    }
    return t;
  }, getURL(e2, t) {
    let r = new URLSearchParams();
    if (M(e2.src))
      r.append("href", e2.src.src);
    else if (Me(e2.src, t))
      r.append("href", e2.src);
    else
      return e2.src;
    return Object.entries({ w: "width", h: "height", q: "quality", f: "format" }).forEach(([i, a]) => {
      e2[a] && r.append(i, e2[a].toString());
    }), `${H("/", "/_image")}?${r}`;
  }, parseURL(e2) {
    let t = e2.searchParams;
    return t.has("href") ? { src: t.get("href"), width: t.has("w") ? parseInt(t.get("w")) : void 0, height: t.has("h") ? parseInt(t.get("h")) : void 0, format: t.get("f"), quality: t.get("q") } : void 0;
  } };
  Pi = { ...Ti, propertiesToHash: ["src"], async transform(e2, t) {
    return { data: e2, format: t.format };
  } }, Li = Pi, Ii = Object.freeze(Object.defineProperty({ __proto__: null, default: Li }, Symbol.toStringTag, { value: "Module" }));
});
var nn = {};
re(nn, { GET: () => Di });
async function rn() {
  if (!globalThis?.astroAsset?.imageService) {
    let { default: e2 } = await Promise.resolve().then(() => (jt(), en)).then((t) => t.n).catch((t) => {
      let r = new m(mr);
      throw r.cause = t, r;
    });
    return globalThis.astroAsset || (globalThis.astroAsset = {}), globalThis.astroAsset.imageService = e2, e2;
  }
  return globalThis.astroAsset.imageService;
}
async function Ci(e2, t) {
  if (!e2 || typeof e2 != "object")
    throw new m({ ...mt, message: mt.message(JSON.stringify(e2)) });
  if (typeof e2.src > "u")
    throw new m({ ...K, message: K.message(e2.src, "undefined", JSON.stringify(e2)) });
  let r = await rn(), n = { ...e2, src: typeof e2.src == "object" && "then" in e2.src ? (await e2.src).default ?? await e2.src : e2.src }, s = M(n.src) ? n.src.fsPath : n.src, i = M(n.src) ? n.src.clone ?? n.src : n.src;
  n.src = i;
  let a = r.validateOptions ? await r.validateOptions(n, t) : n, o = r.getSrcSet ? await r.getSrcSet(a, t) : [], l = await r.getURL(a, t), p = await Promise.all(o.map(async (c) => ({ transform: c.transform, url: await r.getURL(c.transform, t), descriptor: c.descriptor, attributes: c.attributes })));
  if (Rt(r) && globalThis.astroAsset.addStaticImage && !(Et(a.src) && l === a.src)) {
    let c = r.propertiesToHash ?? Ce;
    l = globalThis.astroAsset.addStaticImage(a, c, s), p = o.map((u) => ({ transform: u.transform, url: globalThis.astroAsset.addStaticImage(u.transform, c, s), descriptor: u.descriptor, attributes: u.attributes }));
  }
  return { rawOptions: n, options: a, src: l, srcSet: { values: p, attribute: p.map((c) => `${c.url} ${c.descriptor}`).join(", ") }, attributes: r.getHTMLAttributes !== void 0 ? await r.getHTMLAttributes(a, t) : {} };
}
async function Hi(e2) {
  try {
    let t = await fetch(e2);
    return t.ok ? await t.arrayBuffer() : void 0;
  } catch {
    return;
  }
}
var tn;
var Mi;
var _i;
var Ni;
var Oi;
var ki;
var Ui;
var _e;
var Tt;
var Di;
var sn = P(() => {
  se();
  tn = U(Yr(), 1);
  Q();
  jt();
  G();
  J();
  Mi = (e2) => {
    let t = e2.length, r = 0, n = 0, s = 8997, i = 0, a = 33826, o = 0, l = 40164, p = 0, c = 52210;
    for (; r < t; )
      s ^= e2.charCodeAt(r++), n = s * 435, i = a * 435, o = l * 435, p = c * 435, o += s << 8, p += a << 8, i += n >>> 16, s = n & 65535, o += i >>> 16, a = i & 65535, c = p + (o >>> 16) & 65535, l = o & 65535;
    return (c & 15) * 281474976710656 + l * 4294967296 + a * 65536 + (s ^ c >> 4);
  }, _i = (e2, t = false) => (t ? 'W/"' : '"') + Mi(e2).toString(36) + e2.length.toString(36) + '"', Ni = W(), Oi = q(async (e2, t, r) => {
    let n = e2.createAstro(Ni, t, r);
    n.self = Oi;
    let s = n.props;
    if (s.alt === void 0 || s.alt === null)
      throw new m(dt);
    typeof s.width == "string" && (s.width = parseInt(s.width)), typeof s.height == "string" && (s.height = parseInt(s.height));
    let i = await Tt(s), a = {};
    return i.srcSet.values.length > 0 && (a.srcset = i.srcSet.attribute), C`${Z()}<img${I(i.src, "src")}${k(a)}${k(i.attributes)}>`;
  }, "C:/Users/aradh/git/stic_2023-24/node_modules/astro/components/Image.astro", void 0), ki = W(), Ui = q(async (e2, t, r) => {
    let n = e2.createAstro(ki, t, r);
    n.self = Ui;
    let s = ["webp"], i = "png", a = ["gif", "svg", "jpg", "jpeg"], { formats: o = s, pictureAttributes: l = {}, fallbackFormat: p, ...c } = n.props;
    if (c.alt === void 0 || c.alt === null)
      throw new m(dt);
    let u = await Promise.all(o.map(async (w) => await Tt({ ...c, format: w, widths: c.widths, densities: c.densities }))), d = p ?? i;
    !p && M(c.src) && a.includes(c.src.format) && (d = c.src.format);
    let b = await Tt({ ...c, format: d, widths: c.widths, densities: c.densities }), f = {}, y = {};
    return c.sizes && (y.sizes = c.sizes), b.srcSet.values.length > 0 && (f.srcset = b.srcSet.attribute), C`${Z()}<picture${k(l)}> ${Object.entries(u).map(([w, A]) => {
      let g = c.densities || !c.densities && !c.widths ? `${A.src}${A.srcSet.values.length > 0 ? ", " + A.srcSet.attribute : ""}` : A.srcSet.attribute;
      return C`<source${I(g, "srcset")}${I("image/" + A.options.format, "type")}${k(y)}>`;
    })} <img${I(b.src, "src")}${k(f)}${k(b.attributes)}> </picture>`;
  }, "C:/Users/aradh/git/stic_2023-24/node_modules/astro/components/Picture.astro", void 0), _e = { service: { entrypoint: "astro/assets/services/noop", config: {} }, domains: [], remotePatterns: [] };
  new URL("file:///C:/Users/aradh/git/stic_2023-24/client/dist/");
  Tt = async (e2) => await Ci(e2, _e);
  Di = async ({ request: e2 }) => {
    try {
      let t = await rn();
      if (!("transform" in t))
        throw new Error("Configured image service is not a local service");
      let r = new URL(e2.url), n = await t.parseURL(r, _e);
      if (!n?.src)
        throw new Error("Incorrect transform returned by `parseURL`");
      let s, i = B(n.src) ? new URL(n.src) : new URL(n.src, r.origin);
      if (B(n.src) && Me(n.src, _e) === false)
        return new Response("Forbidden", { status: 403 });
      if (s = await Hi(i), !s)
        return new Response("Not Found", { status: 404 });
      let { data: a, format: o } = await t.transform(new Uint8Array(s), n, _e);
      return new Response(a, { status: 200, headers: { "Content-Type": tn.default.getType(o) ?? `image/${o}`, "Cache-Control": "public, max-age=31536000", ETag: _i(a.toString()), Date: (/* @__PURE__ */ new Date()).toUTCString() } });
    } catch (t) {
      return console.error("Could not process image request:", t), new Response(`Server Error: ${t}`, { status: 500 });
    }
  };
});
var an = {};
re(an, { page: () => Fi, renderers: () => z });
var Fi;
var on = P(() => {
  he();
  Fi = () => Promise.resolve().then(() => (sn(), nn));
});
var dn = {};
re(dn, { default: () => pn, file: () => zi, url: () => Bi });
var Bo;
var qi;
var cn;
var Wi;
var ln;
var Vi;
var pn;
var zi;
var Bi;
var un = P(() => {
  Q();
  ie();
  G();
  J();
  Bo = U(ae(), 1), qi = W(), cn = q(async (e2, t, r) => {
    let n = e2.createAstro(qi, t, r);
    n.self = cn;
    let { title: s } = n.props;
    return C`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${I(n.generator, "content")}><title>${s}</title><link rel="stylesheet" href="styles/global.css"><link rel="stylesheet" href="base.css">${Tr()}</head> <body> ${je(e2, r.default)} </body></html>`;
  }, "C:/Users/aradh/git/stic_2023-24/client/src/layouts/Layout.astro", void 0), Wi = W(), ln = q(async (e2, t, r) => {
    let n = e2.createAstro(Wi, t, r);
    return n.self = ln, C`${Z()}<header class="flex justify-between h-[7vh] px-2 items-center"> <div id="logo" class="w-10 h-10 add-border rounded-full"></div> <ul id="nav-link" class="flex h-full items-center"> <li class="px-3">Home</li> <li class="px-3">Team</li> <li class="px-3">About</li> <li class="px-3">Events</li> <li class="px-3">Gallery</li> </ul> <button type="button" class="add-border py-1 px-3 rounded-md">Subscribe</button> </header>`;
  }, "C:/Users/aradh/git/stic_2023-24/client/src/components/Header.astro", void 0), Vi = W(), pn = q(async (e2, t, r) => {
    let n = e2.createAstro(Vi, t, r);
    return n.self = pn, C`${Te(e2, "Layout", cn, { title: "Welcome to Astro." })} ${Te(e2, "Header", ln, {})} `;
  }, "C:/Users/aradh/git/stic_2023-24/client/src/pages/index.astro", void 0), zi = "C:/Users/aradh/git/stic_2023-24/client/src/pages/index.astro", Bi = "";
});
var fn = {};
re(fn, { page: () => Gi, renderers: () => z });
var Gi;
var mn = P(() => {
  he();
  Gi = () => Promise.resolve().then(() => (un(), dn));
});
he();
se();
var So = U(Fe(), 1);
ie();
G();
J();
Q();
var jo = U(ae(), 1);
function mi(e2) {
  for (var t = [], r = 0; r < e2.length; ) {
    var n = e2[r];
    if (n === "*" || n === "+" || n === "?") {
      t.push({ type: "MODIFIER", index: r, value: e2[r++] });
      continue;
    }
    if (n === "\\") {
      t.push({ type: "ESCAPED_CHAR", index: r++, value: e2[r++] });
      continue;
    }
    if (n === "{") {
      t.push({ type: "OPEN", index: r, value: e2[r++] });
      continue;
    }
    if (n === "}") {
      t.push({ type: "CLOSE", index: r, value: e2[r++] });
      continue;
    }
    if (n === ":") {
      for (var s = "", i = r + 1; i < e2.length; ) {
        var a = e2.charCodeAt(i);
        if (a >= 48 && a <= 57 || a >= 65 && a <= 90 || a >= 97 && a <= 122 || a === 95) {
          s += e2[i++];
          continue;
        }
        break;
      }
      if (!s)
        throw new TypeError("Missing parameter name at ".concat(r));
      t.push({ type: "NAME", index: r, value: s }), r = i;
      continue;
    }
    if (n === "(") {
      var o = 1, l = "", i = r + 1;
      if (e2[i] === "?")
        throw new TypeError('Pattern cannot start with "?" at '.concat(i));
      for (; i < e2.length; ) {
        if (e2[i] === "\\") {
          l += e2[i++] + e2[i++];
          continue;
        }
        if (e2[i] === ")") {
          if (o--, o === 0) {
            i++;
            break;
          }
        } else if (e2[i] === "(" && (o++, e2[i + 1] !== "?"))
          throw new TypeError("Capturing groups are not allowed at ".concat(i));
        l += e2[i++];
      }
      if (o)
        throw new TypeError("Unbalanced pattern at ".concat(r));
      if (!l)
        throw new TypeError("Missing pattern at ".concat(r));
      t.push({ type: "PATTERN", index: r, value: l }), r = i;
      continue;
    }
    t.push({ type: "CHAR", index: r, value: e2[r++] });
  }
  return t.push({ type: "END", index: r, value: "" }), t;
}
function hi(e2, t) {
  t === void 0 && (t = {});
  for (var r = mi(e2), n = t.prefixes, s = n === void 0 ? "./" : n, i = "[^".concat(yi(t.delimiter || "/#?"), "]+?"), a = [], o = 0, l = 0, p = "", c = function(L) {
    if (l < r.length && r[l].type === L)
      return r[l++].value;
  }, u = function(L) {
    var h = c(L);
    if (h !== void 0)
      return h;
    var x = r[l], $ = x.type, ee = x.index;
    throw new TypeError("Unexpected ".concat($, " at ").concat(ee, ", expected ").concat(L));
  }, d = function() {
    for (var L = "", h; h = c("CHAR") || c("ESCAPED_CHAR"); )
      L += h;
    return L;
  }; l < r.length; ) {
    var b = c("CHAR"), f = c("NAME"), y = c("PATTERN");
    if (f || y) {
      var w = b || "";
      s.indexOf(w) === -1 && (p += w, w = ""), p && (a.push(p), p = ""), a.push({ name: f || o++, prefix: w, suffix: "", pattern: y || i, modifier: c("MODIFIER") || "" });
      continue;
    }
    var A = b || c("ESCAPED_CHAR");
    if (A) {
      p += A;
      continue;
    }
    p && (a.push(p), p = "");
    var g = c("OPEN");
    if (g) {
      var w = d(), R = c("NAME") || "", T = c("PATTERN") || "", _ = d();
      u("CLOSE"), a.push({ name: R || (T ? o++ : ""), pattern: R && !T ? i : T, prefix: w, suffix: _, modifier: c("MODIFIER") || "" });
      continue;
    }
    u("END");
  }
  return a;
}
function Or(e2, t) {
  return gi(hi(e2, t), t);
}
function gi(e2, t) {
  t === void 0 && (t = {});
  var r = wi(t), n = t.encode, s = n === void 0 ? function(l) {
    return l;
  } : n, i = t.validate, a = i === void 0 ? true : i, o = e2.map(function(l) {
    if (typeof l == "object")
      return new RegExp("^(?:".concat(l.pattern, ")$"), r);
  });
  return function(l) {
    for (var p = "", c = 0; c < e2.length; c++) {
      var u = e2[c];
      if (typeof u == "string") {
        p += u;
        continue;
      }
      var d = l ? l[u.name] : void 0, b = u.modifier === "?" || u.modifier === "*", f = u.modifier === "*" || u.modifier === "+";
      if (Array.isArray(d)) {
        if (!f)
          throw new TypeError('Expected "'.concat(u.name, '" to not repeat, but got an array'));
        if (d.length === 0) {
          if (b)
            continue;
          throw new TypeError('Expected "'.concat(u.name, '" to not be empty'));
        }
        for (var y = 0; y < d.length; y++) {
          var w = s(d[y], u);
          if (a && !o[c].test(w))
            throw new TypeError('Expected all "'.concat(u.name, '" to match "').concat(u.pattern, '", but got "').concat(w, '"'));
          p += u.prefix + w + u.suffix;
        }
        continue;
      }
      if (typeof d == "string" || typeof d == "number") {
        var w = s(String(d), u);
        if (a && !o[c].test(w))
          throw new TypeError('Expected "'.concat(u.name, '" to match "').concat(u.pattern, '", but got "').concat(w, '"'));
        p += u.prefix + w + u.suffix;
        continue;
      }
      if (!b) {
        var A = f ? "an array" : "a string";
        throw new TypeError('Expected "'.concat(u.name, '" to be ').concat(A));
      }
    }
    return p;
  };
}
function yi(e2) {
  return e2.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function wi(e2) {
  return e2 && e2.sensitive ? "" : "i";
}
var bi = new Intl.DateTimeFormat([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
var de = { debug: 20, info: 30, warn: 40, error: 50, silent: 90 };
function $t(e2, t, r, n, s = true) {
  let i = e2.level, a = e2.dest, o = { label: r, level: t, message: n, newLine: s };
  vi(i, t) && a.write(o);
}
function vi(e2, t) {
  return de[e2] <= de[t];
}
function kr(e2, t, r, n = true) {
  return $t(e2, "info", t, r, n);
}
function Ur(e2, t, r, n = true) {
  return $t(e2, "warn", t, r, n);
}
function Hr(e2, t, r, n = true) {
  return $t(e2, "error", t, r, n);
}
function Dr(...e2) {
  "_astroGlobalDebug" in globalThis && globalThis._astroGlobalDebug(...e2);
}
function Fr({ level: e2, label: t }) {
  let r = `${bi.format(/* @__PURE__ */ new Date())}`, n = [];
  return e2 === "error" || e2 === "warn" ? (n.push(we(r)), n.push(`[${e2.toUpperCase()}]`)) : n.push(r), t && n.push(`[${t}]`), e2 === "error" ? Bt(n.join(" ")) : e2 === "warn" ? Gt(n.join(" ")) : n.length === 1 ? We(n[0]) : We(n[0]) + " " + Jt(n.splice(1).join(" "));
}
if (typeof process < "u") {
  let e2 = process;
  "argv" in e2 && Array.isArray(e2.argv) && (e2.argv.includes("--verbose") || e2.argv.includes("--silent"));
}
var Pe = class {
  options;
  constructor(t) {
    this.options = t;
  }
  info(t, r, n = true) {
    kr(this.options, t, r, n);
  }
  warn(t, r, n = true) {
    Ur(this.options, t, r, n);
  }
  error(t, r, n = true) {
    Hr(this.options, t, r, n);
  }
  debug(t, ...r) {
    Dr(t, ...r);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(t) {
    return new ue(this.options, t);
  }
};
var ue = class e {
  options;
  label;
  constructor(t, r) {
    this.options = t, this.label = r;
  }
  fork(t) {
    return new e(this.options, t);
  }
  info(t) {
    kr(this.options, this.label, t);
  }
  warn(t) {
    Ur(this.options, this.label, t);
  }
  error(t) {
    Hr(this.options, this.label, t);
  }
  debug(t) {
    Dr(this.label, t);
  }
};
function xi(e2, t) {
  let r = e2.map((i) => "/" + i.map((a) => a.spread ? `:${a.content.slice(3)}(.*)?` : a.dynamic ? `:${a.content}` : a.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("")).join(""), n = "";
  return t === "always" && e2.length && (n = "/"), Or(r + n);
}
function Le(e2) {
  return { route: e2.route, type: e2.type, pattern: new RegExp(e2.pattern), params: e2.params, component: e2.component, generate: xi(e2.segments, e2._meta.trailingSlash), pathname: e2.pathname || void 0, segments: e2.segments, prerender: e2.prerender, redirect: e2.redirect, redirectRoute: e2.redirectRoute ? Le(e2.redirectRoute) : void 0, fallbackRoutes: e2.fallbackRoutes.map((t) => Le(t)) };
}
function Si(e2) {
  let t = [];
  for (let i of e2.routes) {
    t.push({ ...i, routeData: Le(i.routeData) });
    let a = i;
    a.routeData = Le(i.routeData);
  }
  let r = new Set(e2.assets), n = new Map(e2.componentMetadata), s = new Map(e2.clientDirectives);
  return { middleware(i, a) {
    return a();
  }, ...e2, assets: r, componentMetadata: n, clientDirectives: s, routes: t };
}
var qr = Si({ adapterName: "@astrojs/cloudflare", routes: [{ file: "", links: [], scripts: [], styles: [], routeData: { type: "endpoint", isIndex: false, route: "/_image", pattern: "^\\/_image$", segments: [[{ content: "_image", dynamic: false, spread: false }]], params: [], component: "../node_modules/astro/dist/assets/endpoint/generic.js", pathname: "/_image", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }, { file: "", links: [], scripts: [], styles: [{ type: "external", src: "/_astro/index.8P4VTZtv.css" }], routeData: { route: "/", isIndex: true, type: "page", pattern: "^\\/$", segments: [], params: [], component: "src/pages/index.astro", pathname: "/", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }], base: "/", trailingSlash: "ignore", compressHTML: true, componentMetadata: [["C:/Users/aradh/git/stic_2023-24/client/src/pages/index.astro", { propagation: "none", containsHead: true }]], renderers: [], clientDirectives: [["idle", '(()=>{var i=t=>{let e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event("astro:idle"));})();'], ["load", '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event("astro:load"));})();'], ["media", '(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener("change",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event("astro:media"));})();'], ["only", '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event("astro:only"));})();'], ["visible", '(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value=="object"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event("astro:visible"));})();']], entryModules: { "\0@astrojs-ssr-virtual-entry": "_worker.mjs", "\0@astro-renderers": "renderers.mjs", "\0noop-middleware": "_noop-middleware.mjs", "/../node_modules/astro/dist/assets/endpoint/generic.js": "chunks/pages/generic_IkwlXvV8.mjs", "/src/pages/index.astro": "chunks/pages/index_1swzwv2_.mjs", "\0@astrojs-manifest": "manifest_umRMbdcW.mjs", "\0@astro-page:../node_modules/astro/dist/assets/endpoint/generic@_@js": "chunks/generic_9SpHF2X8.mjs", "\0@astro-page:src/pages/index@_@astro": "chunks/index_ZNBdlcrJ.mjs", "astro:scripts/before-hydration.js": "" }, assets: ["/_astro/index.8P4VTZtv.css", "/favicon.svg", "/$server_build/renderers.mjs", "/$server_build/_noop-middleware.mjs", "/$server_build/_worker.mjs", "/$server_build/chunks/astro_muZ_ePlF.mjs", "/$server_build/chunks/generic_9SpHF2X8.mjs", "/$server_build/chunks/index_ZNBdlcrJ.mjs", "/$server_build/_astro/index.8P4VTZtv.css", "/$server_build/chunks/astro/assets-service_upLq72Qx.mjs", "/$server_build/chunks/pages/generic_IkwlXvV8.mjs", "/$server_build/chunks/pages/index_1swzwv2_.mjs"], buildFormat: "directory" });
se();
Q();
var fe = U(Fe(), 1);
ie();
G();
J();
var tc = U(ae(), 1);
var Wr = (e2, t) => t();
function Ji(e2, t) {
  switch (e2) {
    case "always":
      return true;
    case "never":
      return false;
    case "ignore":
      switch (t) {
        case "directory":
          return true;
        case "file":
          return false;
      }
  }
}
function Yi(e2, t) {
  for (let r of t)
    if (typeof r == "string") {
      if (r === e2)
        return r;
    } else
      for (let n of r.codes)
        if (n === e2)
          return r.path;
  throw new It();
}
function j(e2) {
  return e2.replaceAll("_", "-").toLowerCase();
}
function Xi(e2) {
  let t = [];
  for (let r of e2)
    if (typeof r == "string")
      t.push(r);
    else
      for (let n of r.codes)
        t.push(n);
  return t;
}
var It = class extends Error {
  constructor() {
    super(`Astro encountered an unexpected line of code.
In most cases, this is not your fault, but a bug in astro code.
If there isn't one already, please create an issue.
https://astro.build/issues`);
  }
};
var Rn = Symbol.for(yt);
function hn(e2, t) {
  let r = e2.split("/");
  for (let n of r)
    for (let s of t)
      if (typeof s == "string") {
        if (j(n) === j(s))
          return true;
      } else if (n === s.path)
        return true;
  return false;
}
function Ki(e2, t, r, n) {
  return e2 ? async (s, i) => {
    let a = Reflect.get(s.request, Rn);
    if (a?.type !== "page" && a?.type !== "fallback")
      return await i();
    let o = s.url, { locales: l, defaultLocale: p, fallback: c, routing: u } = e2, d = await i();
    if (d instanceof Response) {
      let b = o.pathname.includes(`/${p}`);
      switch (e2.routing) {
        case "pathname-prefix-other-locales": {
          if (b) {
            let f = o.pathname.replace(`/${p}`, "");
            return d.headers.set("Location", f), new Response(null, { status: 404, headers: d.headers });
          }
          break;
        }
        case "pathname-prefix-always-no-redirect": {
          if (!(o.pathname === t + "/" || o.pathname === t || hn(o.pathname, e2.locales)))
            return new Response(null, { status: 404, headers: d.headers });
          break;
        }
        case "pathname-prefix-always": {
          if (o.pathname === t + "/" || o.pathname === t)
            return Ji(r, n) ? s.redirect(`${Ft(H(t, e2.defaultLocale))}`) : s.redirect(`${H(t, e2.defaultLocale)}`);
          if (!hn(o.pathname, e2.locales))
            return new Response(null, { status: 404, headers: d.headers });
        }
      }
      if (d.status >= 300 && c) {
        let f = e2.fallback ? Object.keys(e2.fallback) : [], w = o.pathname.split("/").find((A) => {
          for (let g of l)
            if (typeof g == "string") {
              if (g === A)
                return true;
            } else if (g.path === A)
              return true;
          return false;
        });
        if (w && f.includes(w)) {
          let A = c[w], g = Yi(A, l), R;
          return g === p && u === "pathname-prefix-other-locales" ? R = o.pathname.replace(`/${w}`, "") : R = o.pathname.replace(`/${w}`, `/${g}`), s.redirect(R);
        }
      }
    }
    return d;
  } : (s, i) => i();
}
var Zi = (e2) => {
  Reflect.set(e2.request, Rn, e2.route);
};
var Qi = /* @__PURE__ */ new Date(0);
var gn = "deleted";
var ea = Symbol.for("astro.responseSent");
var Ne = class {
  constructor(t) {
    this.value = t;
  }
  json() {
    if (this.value === void 0)
      throw new Error("Cannot convert undefined to an object.");
    return JSON.parse(this.value);
  }
  number() {
    return Number(this.value);
  }
  boolean() {
    return this.value === "false" || this.value === "0" ? false : !!this.value;
  }
};
var me = class {
  #e;
  #t;
  #r;
  #s;
  constructor(t) {
    this.#e = t, this.#t = null, this.#r = null, this.#s = false;
  }
  delete(t, r) {
    let n = { expires: Qi };
    r?.domain && (n.domain = r.domain), r?.path && (n.path = r.path), this.#n().set(t, [gn, (0, fe.serialize)(t, gn, n), false]);
  }
  get(t, r = void 0) {
    if (this.#r?.has(t)) {
      let [s, , i] = this.#r.get(t);
      return i ? new Ne(s) : void 0;
    }
    let n = this.#i(r);
    if (t in n) {
      let s = n[t];
      return new Ne(s);
    }
  }
  has(t, r = void 0) {
    if (this.#r?.has(t)) {
      let [, , s] = this.#r.get(t);
      return s;
    }
    return !!this.#i(r)[t];
  }
  set(t, r, n) {
    if (this.#s) {
      let a = new Error(`Astro.cookies.set() was called after the cookies had already been sent to the browser.
This may have happened if this method was called in an imported component.
Please make sure that Astro.cookies.set() is only called in the frontmatter of the main page.`);
      a.name = "Warning", console.warn(a);
    }
    let s;
    if (typeof r == "string")
      s = r;
    else {
      let a = r.toString();
      a === Object.prototype.toString.call(r) ? s = JSON.stringify(r) : s = a;
    }
    let i = {};
    if (n && Object.assign(i, n), this.#n().set(t, [s, (0, fe.serialize)(t, s, i), true]), this.#e[ea])
      throw new m({ ...$e });
  }
  *headers() {
    if (this.#r != null)
      for (let [, t] of this.#r)
        yield t[1];
  }
  static consume(t) {
    return t.#s = true, t.headers();
  }
  #i(t = void 0) {
    return this.#t || this.#a(t), this.#t || (this.#t = {}), this.#t;
  }
  #n() {
    return this.#r || (this.#r = /* @__PURE__ */ new Map()), this.#r;
  }
  #a(t = void 0) {
    let r = this.#e.headers.get("cookie");
    r && (this.#t = (0, fe.parse)(r, t));
  }
};
var kt = Symbol.for("astro.cookies");
function Ut(e2, t) {
  Reflect.set(e2, kt, t);
}
function ta(e2) {
  return Reflect.has(e2, kt);
}
function ra(e2) {
  let t = Reflect.get(e2, kt);
  if (t != null)
    return t;
}
function* yn(e2) {
  let t = ra(e2);
  if (!t)
    return [];
  for (let r of me.consume(t))
    yield r;
  return [];
}
var na = { write(e2) {
  let t = console.error;
  return de[e2.level] < de.error && (t = console.log), e2.label === "SKIP_FORMAT" ? t(e2.message) : t(Fr(e2) + " " + e2.message), true;
} };
async function jn(e2, t, r) {
  let n = false, s, a = e2(t, async () => (n = true, s = r(), s));
  return await Promise.resolve(a).then(async (o) => {
    if (n)
      if (typeof o < "u") {
        if (!(o instanceof Response))
          throw new m(Ee);
        return wn(t, o);
      } else {
        if (s)
          return s;
        throw new m(Ee);
      }
    else {
      if (typeof o > "u")
        throw new m(yr);
      if (o instanceof Response)
        return wn(t, o);
      throw new m(Ee);
    }
  });
}
function wn(e2, t) {
  return e2.cookies !== void 0 && !ta(t) && Ut(t, e2.cookies), t;
}
function Tn(e2) {
  return e2?.type === "redirect";
}
function Pn(e2) {
  return e2?.type === "fallback";
}
function sa(e2, t) {
  let r = e2.redirectRoute, n = e2.redirect;
  if (typeof r < "u")
    return r?.generate(t) || r?.pathname || "/";
  if (typeof n == "string") {
    let s = n;
    for (let i of Object.keys(t)) {
      let a = t[i];
      s = s.replace(`[${i}]`, a), s = s.replace(`[...${i}]`, a);
    }
    return s;
  } else if (typeof n > "u")
    return "/";
  return n.destination;
}
function ia(e2, t = "GET") {
  return e2.redirectRoute && typeof e2.redirect == "object" ? e2.redirect.status : t !== "GET" ? 308 : 301;
}
var aa = { default() {
  return new Response(null, { status: 301 });
} };
var oa = { page: () => Promise.resolve(aa), onRequest: (e2, t) => t(), renderers: [] };
var ca = ["string", "number", "undefined"];
function la([e2, t], r) {
  if (!ca.includes(typeof t))
    throw new m({ ...ct, message: ct.message(e2, t, typeof t), location: { file: r } });
}
function pa(e2, { ssr: t, route: r }) {
  if ((!t || r.prerender) && !e2.getStaticPaths)
    throw new m({ ...fr, location: { file: r.component } });
}
function da(e2, t, r) {
  if (!Array.isArray(e2))
    throw new m({ ...ot, message: ot.message(typeof e2), location: { file: r.component } });
  e2.forEach((n) => {
    if (typeof n == "object" && Array.isArray(n) || n === null)
      throw new m({ ...at, message: at.message(Array.isArray(n) ? "array" : typeof n) });
    if (n.params === void 0 || n.params === null || n.params && Object.keys(n.params).length === 0)
      throw new m({ ...ur, location: { file: r.component } });
    for (let [s, i] of Object.entries(n.params))
      typeof i > "u" || typeof i == "string" || typeof i == "number" || t.warn("router", `getStaticPaths() returned an invalid path param: "${s}". A string, number or undefined value was expected, but got \`${JSON.stringify(i)}\`.`), typeof i == "string" && i === "" && t.warn("router", `getStaticPaths() returned an invalid path param: "${s}". \`undefined\` expected for an optional param, but got empty string.`);
  });
}
function ua(e2) {
  return (r) => {
    let n = {};
    return e2.forEach((s, i) => {
      s.startsWith("...") ? n[s.slice(3)] = r[i + 1] ? r[i + 1] : void 0 : n[s] = r[i + 1];
    }), n;
  };
}
function Ln(e2, t) {
  let r = Object.entries(e2).reduce((n, s) => {
    la(s, t.component);
    let [i, a] = s;
    return a !== void 0 && (n[i] = typeof a == "string" ? Ue(a) : a.toString()), n;
  }, {});
  return JSON.stringify(t.generate(r));
}
function fa(e2) {
  return function(r, n = {}) {
    let { pageSize: s, params: i, props: a } = n, o = s || 10, l = "page", p = i || {}, c = a || {}, u;
    if (e2.params.includes(`...${l}`))
      u = false;
    else if (e2.params.includes(`${l}`))
      u = true;
    else
      throw new m({ ...pt, message: pt.message(l) });
    let d = Math.max(1, Math.ceil(r.length / o));
    return [...Array(d).keys()].map((f) => {
      let y = f + 1, w = o === 1 / 0 ? 0 : (y - 1) * o, A = Math.min(w + o, r.length), g = { ...p, [l]: u || y > 1 ? String(y) : void 0 }, R = Pt(e2.generate({ ...g })), T = y === d ? void 0 : Pt(e2.generate({ ...g, page: String(y + 1) })), _ = y === 1 ? void 0 : Pt(e2.generate({ ...g, page: !u && y - 1 === 1 ? void 0 : String(y - 1) }));
      return { params: g, props: { ...c, page: { data: r.slice(w, A), start: w, end: A - 1, size: o, total: r.length, currentPage: y, lastPage: d, url: { current: R, next: T, prev: _ } } } };
    });
  };
}
function Pt(e2) {
  return e2 === "" ? "/" : e2;
}
async function ma({ mod: e2, route: t, routeCache: r, logger: n, ssr: s }) {
  let i = r.get(t);
  if (!e2)
    throw new Error("This is an error caused by Astro and not your code. Please file an issue.");
  if (i?.staticPaths)
    return i.staticPaths;
  if (pa(e2, { ssr: s, route: t }), s && !t.prerender) {
    let l = Object.assign([], { keyed: /* @__PURE__ */ new Map() });
    return r.set(t, { ...i, staticPaths: l }), l;
  }
  let a = [];
  if (!e2.getStaticPaths)
    throw new Error("Unexpected Error.");
  a = await e2.getStaticPaths({ paginate: fa(t) }), da(a, n, t);
  let o = a;
  o.keyed = /* @__PURE__ */ new Map();
  for (let l of o) {
    let p = Ln(l.params, t);
    o.keyed.set(p, l);
  }
  return r.set(t, { ...i, staticPaths: o }), o;
}
var Ct = class {
  logger;
  cache = {};
  mode;
  constructor(t, r = "production") {
    this.logger = t, this.mode = r;
  }
  clearAll() {
    this.cache = {};
  }
  set(t, r) {
    this.mode === "production" && this.cache[t.component]?.staticPaths && this.logger.warn(null, `Internal Warning: route cache overwritten. (${t.component})`), this.cache[t.component] = r;
  }
  get(t) {
    return this.cache[t.component];
  }
};
function ha(e2, t, r, n) {
  let s = Ln(t, r), i = e2.keyed.get(s);
  if (i)
    return i;
  n.debug("router", `findPathItemByKey() - Unexpected cache miss looking for ${s}`);
}
async function ga(e2) {
  let { logger: t, mod: r, route: n, routeCache: s, pathname: i, ssr: a } = e2;
  if (!n || n.pathname)
    return [{}, {}];
  let o = ya(n, i) ?? {};
  if (Tn(n) || Pn(n))
    return [o, {}];
  r && wa(n, r, o);
  let l = await ma({ mod: r, route: n, routeCache: s, logger: t, ssr: a }), p = ha(l, o, n, t);
  if (!p && (!a || n.prerender))
    throw new m({ ...Se, message: Se.message(i), hint: Se.hint([n.component]) });
  let c = p?.props ? { ...p.props } : {};
  return [o, c];
}
function ya(e2, t) {
  if (e2.params.length) {
    let r = e2.pattern.exec(decodeURIComponent(t));
    if (r)
      return ua(e2.params)(r);
  }
}
function wa(e2, t, r) {
  if (e2.type === "endpoint" && t.getStaticPaths) {
    let n = e2.segments[e2.segments.length - 1], s = Object.values(r), i = s[s.length - 1];
    if (n.length === 1 && n[0].dynamic && i === void 0)
      throw new m({ ...Ae, message: Ae.message(e2.route), hint: Ae.hint(e2.component), location: { file: e2.component } });
  }
}
var bn = Symbol.for("astro.locals");
var ba = Symbol.for(yt);
async function vn(e2) {
  let t = e2.request, r = e2.pathname ?? new URL(t.url).pathname, [n, s] = await ga({ mod: e2.mod, route: e2.route, routeCache: e2.env.routeCache, pathname: r, logger: e2.env.logger, ssr: e2.env.ssr }), i = { ...e2, pathname: r, params: n, props: s, locales: e2.locales, routing: e2.routing, defaultLocale: e2.defaultLocale };
  return Object.defineProperty(i, "locals", { enumerable: true, get() {
    return Reflect.get(t, bn);
  }, set(a) {
    if (typeof a != "object")
      throw new m(Re);
    Reflect.set(t, bn, a);
  } }), i;
}
function In(e2) {
  if (e2 === "*")
    return [{ locale: e2, qualityValue: void 0 }];
  let t = [], r = e2.split(",").map((n) => n.trim());
  for (let n of r) {
    let s = n.split(";").map((o) => o.trim()), i = s[0], a = s[1];
    if (s)
      if (a && a.startsWith("q=")) {
        let o = Number.parseFloat(a.slice(2));
        Number.isNaN(o) || o > 1 ? t.push({ locale: i, qualityValue: void 0 }) : t.push({ locale: i, qualityValue: o });
      } else
        t.push({ locale: i, qualityValue: void 0 });
  }
  return t;
}
function Cn(e2, t) {
  let r = Xi(t).map(j);
  return e2.filter((n) => n.locale !== "*" ? r.includes(j(n.locale)) : true).sort((n, s) => {
    if (n.qualityValue && s.qualityValue) {
      if (n.qualityValue > s.qualityValue)
        return -1;
      if (n.qualityValue < s.qualityValue)
        return 1;
    }
    return 0;
  });
}
function Mn(e2, t) {
  let r = e2.headers.get("Accept-Language"), n;
  if (r) {
    let i = Cn(In(r), t).at(0);
    if (i && i.locale !== "*")
      for (let a of t)
        if (typeof a == "string")
          j(a) === j(i.locale) && (n = a);
        else
          for (let o of a.codes)
            j(o) === j(i.locale) && (n = a.path);
  }
  return n;
}
function _n(e2, t) {
  let r = e2.headers.get("Accept-Language"), n = [];
  if (r) {
    let s = Cn(In(r), t);
    if (s.length === 1 && s.at(0).locale === "*")
      return t.map((i) => typeof i == "string" ? i : i.codes.at(0));
    if (s.length > 0)
      for (let i of s)
        for (let a of t)
          if (typeof a == "string")
            j(a) === j(i.locale) && n.push(a);
          else
            for (let o of a.codes)
              o === i.locale && n.push(a.path);
  }
  return n;
}
function Nn(e2, t, r, n) {
  let s = Reflect.get(e2, ba);
  if (!s)
    return n;
  for (let i of s.route.split("/"))
    for (let a of t)
      if (typeof a == "string") {
        if (j(a) === j(i))
          return a;
      } else if (a.path === i)
        return a.codes.at(0);
  if (r === "pathname-prefix-other-locales")
    return n;
}
var xn = Symbol.for("astro.clientAddress");
var Lt = Symbol.for("astro.locals");
function On({ request: e2, params: t, site: r, props: n, adapterName: s, locales: i, routingStrategy: a, defaultLocale: o }) {
  let l, p, c;
  return { cookies: new me(e2), request: e2, params: t, site: r ? new URL(r) : void 0, generator: `Astro v${gt}`, props: n, redirect(d, b) {
    return new Response(null, { status: b || 302, headers: { Location: d } });
  }, get preferredLocale() {
    if (l)
      return l;
    if (i)
      return l = Mn(e2, i), l;
  }, get preferredLocaleList() {
    if (p)
      return p;
    if (i)
      return p = _n(e2, i), p;
  }, get currentLocale() {
    return c || (i && (c = Nn(e2, i, a, o)), c);
  }, url: new URL(e2.url), get clientAddress() {
    if (xn in e2)
      return Reflect.get(e2, xn);
    throw s ? new m({ ...le, message: le.message(s) }) : new m(it);
  }, get locals() {
    let d = Reflect.get(e2, Lt);
    if (d === void 0 && (d = {}, Reflect.set(e2, Lt, d)), typeof d != "object")
      throw new m(Re);
    return d;
  }, set locals(d) {
    if (typeof d != "object")
      throw new m(Re);
    Reflect.set(e2, Lt, d);
  } };
}
async function va(e2, t, r, n) {
  let s = On({ request: r.request, params: r.params, props: r.props, site: t.site, adapterName: t.adapterName, routingStrategy: r.routing, defaultLocale: r.defaultLocale, locales: r.locales }), i;
  return n ? i = await jn(n, s, async () => await wt(e2, s, t.ssr, t.logger)) : i = await wt(e2, s, t.ssr, t.logger), Ut(i, s.cookies), i;
}
function xa(...e2) {
  let t = e2.filter((n) => !!n), r = t.length;
  return r ? (n, s) => {
    return i(0, n);
    function i(a, o) {
      let l = t[a];
      return l(o, async () => a < r - 1 ? i(a + 1, o) : s());
    }
  } : (s, i) => i();
}
function Ht(e2, t, r) {
  return r ? H(r, He(e2)) : t ? ne(H(t, He(e2))) : e2;
}
function Sa(e2, t, r) {
  return e2.type === "inline" ? { props: {}, children: e2.content } : { props: { rel: "stylesheet", href: Ht(e2.src, t, r) }, children: "" };
}
function Aa(e2, t, r) {
  return new Set(e2.map((n) => Sa(n, t, r)));
}
function $a(e2, t, r) {
  return e2.type === "external" ? Ea(e2.value, t, r) : { props: { type: "module" }, children: e2.value };
}
function Ea(e2, t, r) {
  return { props: { type: "module", src: Ht(e2, t, r) }, children: "" };
}
function Sn(e2, t) {
  let r = decodeURI(e2);
  return t.routes.find((n) => n.pattern.test(r) || n.fallbackRoutes.some((s) => s.pattern.test(r)));
}
var An = Symbol.for("astro.clientAddress");
var Ra = Symbol.for("astro.responseSent");
function ja(e2) {
  if (e2 && e2.expressions?.length === 1)
    return e2.expressions[0];
}
var Mt = class {
  #e;
  #t;
  #r;
  constructor(t, r, n) {
    if (this.#e = t, this.#t = r, this.#r = n, r)
      for (let s of Object.keys(r)) {
        if (this[s] !== void 0)
          throw new m({ ...lt, message: lt.message(s) });
        Object.defineProperty(this, s, { get() {
          return true;
        }, enumerable: true });
      }
  }
  has(t) {
    return this.#t ? !!this.#t[t] : false;
  }
  async render(t, r = []) {
    if (!this.#t || !this.has(t))
      return;
    let n = this.#e;
    if (!Array.isArray(r))
      this.#r.warn(null, `Expected second parameter to be an array, received a ${typeof r}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as a item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`);
    else if (r.length > 0) {
      let a = this.#t[t], o = typeof a == "function" ? await a(n) : await a, l = ja(o);
      if (l)
        return await V(n, async () => typeof l == "function" ? l(...r) : l).then((c) => c != null ? String(c) : c);
      if (typeof o == "function")
        return await N(n, o(...r)).then((p) => p != null ? String(p) : p);
    }
    let s = await V(n, this.#t[t]);
    return O(n, s);
  }
};
function Ta(e2) {
  let { params: t, request: r, resolve: n, locals: s } = e2, i = new URL(r.url), a = new Headers();
  a.set("Content-Type", "text/html");
  let o = { status: e2.status, statusText: "OK", headers: a };
  Object.defineProperty(o, "headers", { value: o.headers, enumerable: true, writable: false });
  let l = e2.cookies, p, c, u, d = { styles: e2.styles ?? /* @__PURE__ */ new Set(), scripts: e2.scripts ?? /* @__PURE__ */ new Set(), links: e2.links ?? /* @__PURE__ */ new Set(), componentMetadata: e2.componentMetadata ?? /* @__PURE__ */ new Map(), renderers: e2.renderers, clientDirectives: e2.clientDirectives, compressHTML: e2.compressHTML, partial: e2.partial, pathname: e2.pathname, cookies: l, createAstro(b, f, y) {
    let w = new Mt(d, y, e2.logger);
    return { __proto__: b, get clientAddress() {
      if (!(An in r))
        throw e2.adapterName ? new m({ ...le, message: le.message(e2.adapterName) }) : new m(it);
      return Reflect.get(r, An);
    }, get cookies() {
      return l || (l = new me(r), d.cookies = l, l);
    }, get preferredLocale() {
      if (p)
        return p;
      if (e2.locales)
        return p = Mn(r, e2.locales), p;
    }, get preferredLocaleList() {
      if (c)
        return c;
      if (e2.locales)
        return c = _n(r, e2.locales), c;
    }, get currentLocale() {
      if (u || e2.locales && (u = Nn(r, e2.locales, e2.routingStrategy, e2.defaultLocale), u))
        return u;
    }, params: t, props: f, locals: s, request: r, url: i, redirect(g, R) {
      if (r[Ra])
        throw new m({ ...$e });
      return new Response(null, { status: R || 302, headers: { Location: g } });
    }, response: o, slots: w };
  }, resolve: n, response: o, _metadata: { hasHydrationScript: false, rendererSpecificHydrationScripts: /* @__PURE__ */ new Set(), hasRenderedHead: false, hasDirectives: /* @__PURE__ */ new Set(), headInTree: false, extraHead: [], propagators: /* @__PURE__ */ new Set() } };
  return d;
}
async function $n({ mod: e2, renderContext: t, env: r, cookies: n }) {
  if (Tn(t.route))
    return new Response(null, { status: ia(t.route, t.request.method), headers: { location: sa(t.route, t.params) } });
  if (Pn(t.route))
    return new Response(null, { status: 404 });
  if (!e2)
    throw new m(wr);
  let s = e2.default;
  if (!s)
    throw new Error(`Expected an exported Astro component but received typeof ${typeof s}`);
  let i = Ta({ adapterName: r.adapterName, links: t.links, styles: t.styles, logger: r.logger, params: t.params, pathname: t.pathname, componentMetadata: t.componentMetadata, resolve: r.resolve, renderers: r.renderers, clientDirectives: r.clientDirectives, compressHTML: r.compressHTML, request: t.request, partial: !!e2.partial, site: r.site, scripts: t.scripts, ssr: r.ssr, status: t.status ?? 200, cookies: n, locals: t.locals ?? {}, locales: t.locales, defaultLocale: t.defaultLocale, routingStrategy: t.routing }), a = await Nr(i, s, t.props, {}, r.streaming, t.route);
  return i.cookies && Ut(a, i.cookies), a;
}
var _t = class {
  env;
  #e;
  #t = { before: [] };
  constructor(t) {
    this.env = t;
  }
  setEnvironment() {
  }
  setMiddlewareFunction(t) {
    this.#e = t;
  }
  unsetMiddlewareFunction() {
    this.#e = void 0;
  }
  getEnvironment() {
    return this.env;
  }
  async renderRoute(t, r) {
    for (let n of this.#t.before)
      n(t, r);
    return await this.#r(t, this.env, r, this.#e);
  }
  async #r(t, r, n, s) {
    let i = On({ request: t.request, params: t.params, props: t.props, site: r.site, adapterName: r.adapterName, locales: t.locales, routingStrategy: t.routing, defaultLocale: t.defaultLocale });
    switch (t.route.type) {
      case "page":
      case "fallback":
      case "redirect":
        return s ? await jn(s, i, () => $n({ mod: n, renderContext: t, env: r, cookies: i.cookies })) : await $n({ mod: n, renderContext: t, env: r, cookies: i.cookies });
      case "endpoint":
        return await va(n, r, t, s);
      default:
        throw new Error(`Couldn't find route of type [${t.route.type}]`);
    }
  }
  onBeforeRenderRoute(t) {
    this.#t.before.push(t);
  }
};
var Nt = class extends _t {
};
var Pa = Symbol.for("astro.locals");
var La = Symbol.for("astro.clientAddress");
var En = Symbol.for("astro.responseSent");
var Ia = /* @__PURE__ */ new Set([404, 500]);
var _e2, _t2, _r2, _s2, _i2, _n2, _a2, _l, _u, u_fn, _f, f_fn, _m, m_fn, _a, _p, p_fn, _o, o_fn, _c, c_fn, _h, h_fn, _d, d_fn;
var Ot = (_a = class {
  constructor(t, r = true) {
    __privateAdd(this, _u);
    __privateAdd(this, _f);
    __privateAdd(this, _m);
    __privateAdd(this, _p);
    __privateAdd(this, _o);
    __privateAdd(this, _c);
    __privateAdd(this, _h);
    __privateAdd(this, _d);
    __privateAdd(this, _e2, void 0);
    __privateAdd(this, _t2, void 0);
    __privateAdd(this, _r2, void 0);
    __privateAdd(this, _s2, new Pe({ dest: na, level: "info" }));
    __privateAdd(this, _i2, void 0);
    __privateAdd(this, _n2, void 0);
    __privateAdd(this, _a2, void 0);
    __privateAdd(this, _l, false);
    __privateSet(this, _e2, t), __privateSet(this, _t2, { routes: t.routes.map((n) => n.routeData) }), __privateSet(this, _r2, new Map(t.routes.map((n) => [n.routeData, n]))), __privateSet(this, _i2, ge(__privateGet(this, _e2).base)), __privateSet(this, _n2, new Nt(__privateMethod(this, _u, u_fn).call(this, r))), __privateSet(this, _a2, new ue(__privateGet(this, _s2).options, __privateGet(this, _e2).adapterName));
  }
  getAdapterLogger() {
    return __privateGet(this, _a2);
  }
  set setManifestData(t) {
    __privateSet(this, _t2, t);
  }
  removeBase(t) {
    return t.startsWith(__privateGet(this, _e2).base) ? t.slice(__privateGet(this, _i2).length + 1) : t;
  }
  match(t) {
    let r = new URL(t.url);
    if (__privateGet(this, _e2).assets.has(r.pathname))
      return;
    let n = ne(this.removeBase(r.pathname)), s = Sn(n, __privateGet(this, _t2));
    if (!(!s || s.prerender))
      return s;
  }
  async render(t, r, n) {
    let s, i, a, o;
    if (r && ("addCookieHeader" in r || "clientAddress" in r || "locals" in r || "routeData" in r) ? ("addCookieHeader" in r && (o = r.addCookieHeader), "clientAddress" in r && (a = r.clientAddress), "routeData" in r && (s = r.routeData), "locals" in r && (i = r.locals)) : (s = r, i = n, (r || i) && __privateMethod(this, _m, m_fn).call(this)), i && Reflect.set(t, Pa, i), a && Reflect.set(t, La, a), t.url !== ke(t.url) && (t = new Request(ke(t.url), t)), s || (s = this.match(t)), !s)
      return __privateMethod(this, _o, o_fn).call(this, t, { status: 404 });
    let l = __privateMethod(this, _f, f_fn).call(this, t), p = __privateMethod(this, _h, h_fn).call(this, s, l), c = await __privateMethod(this, _d, d_fn).call(this, s), u = await c.page(), d = new URL(t.url), b = await __privateMethod(this, _p, p_fn).call(this, d, t, s, c, p), f;
    try {
      let y = Ki(__privateGet(this, _e2).i18n, __privateGet(this, _e2).base, __privateGet(this, _e2).trailingSlash, __privateGet(this, _e2).buildFormat);
      y ? (__privateGet(this, _n2).setMiddlewareFunction(xa(y, __privateGet(this, _e2).middleware)), __privateGet(this, _n2).onBeforeRenderRoute(Zi)) : __privateGet(this, _n2).setMiddlewareFunction(__privateGet(this, _e2).middleware), f = await __privateGet(this, _n2).renderRoute(b, u);
    } catch (y) {
      return __privateGet(this, _s2).error(null, y.stack || y.message || String(y)), __privateMethod(this, _o, o_fn).call(this, t, { status: 500 });
    }
    if (Ia.has(f.status) && f.headers.get(pe) !== "no")
      return __privateMethod(this, _o, o_fn).call(this, t, { response: f, status: f.status });
    if (f.headers.has(pe) && f.headers.delete(pe), o)
      for (let y of _a.getSetCookieFromResponse(f))
        f.headers.append("set-cookie", y);
    return Reflect.set(f, En, true), f;
  }
  setCookieHeaders(t) {
    return yn(t);
  }
}, _e2 = new WeakMap(), _t2 = new WeakMap(), _r2 = new WeakMap(), _s2 = new WeakMap(), _i2 = new WeakMap(), _n2 = new WeakMap(), _a2 = new WeakMap(), _l = new WeakMap(), _u = new WeakSet(), u_fn = function(t = false) {
  return { adapterName: __privateGet(this, _e2).adapterName, logger: __privateGet(this, _s2), mode: "production", compressHTML: __privateGet(this, _e2).compressHTML, renderers: __privateGet(this, _e2).renderers, clientDirectives: __privateGet(this, _e2).clientDirectives, resolve: async (r) => {
    if (!(r in __privateGet(this, _e2).entryModules))
      throw new Error(`Unable to resolve [${r}]`);
    let n = __privateGet(this, _e2).entryModules[r];
    switch (true) {
      case n.startsWith("data:"):
      case n.length === 0:
        return n;
      default:
        return Ht(n, __privateGet(this, _e2).base, __privateGet(this, _e2).assetsPrefix);
    }
  }, routeCache: new Ct(__privateGet(this, _s2)), site: __privateGet(this, _e2).site, ssr: true, streaming: t };
}, _f = new WeakSet(), f_fn = function(t) {
  let r = new URL(t.url);
  return ne(this.removeBase(r.pathname));
}, _m = new WeakSet(), m_fn = function() {
  __privateGet(this, _l) || (__privateGet(this, _s2).warn("deprecated", `The adapter ${__privateGet(this, _e2).adapterName} is using a deprecated signature of the 'app.render()' method. From Astro 4.0, locals and routeData are provided as properties on an optional object to this method. Using the old signature will cause an error in Astro 5.0. See https://github.com/withastro/astro/pull/9199 for more information.`), __privateSet(this, _l, true));
}, _p = new WeakSet(), p_fn = async function(t, r, n, s, i = 200) {
  if (n.type === "endpoint") {
    let a = "/" + this.removeBase(t.pathname), l = await s.page();
    return await vn({ request: r, pathname: a, route: n, status: i, env: __privateGet(this, _n2).env, mod: l, locales: __privateGet(this, _e2).i18n?.locales, routing: __privateGet(this, _e2).i18n?.routing, defaultLocale: __privateGet(this, _e2).i18n?.defaultLocale });
  } else {
    let a = ne(this.removeBase(t.pathname)), o = __privateGet(this, _r2).get(n), l = /* @__PURE__ */ new Set(), p = Aa(o.styles), c = /* @__PURE__ */ new Set();
    for (let d of o.scripts)
      "stage" in d ? d.stage === "head-inline" && c.add({ props: {}, children: d.children }) : c.add($a(d));
    let u = await s.page();
    return await vn({ request: r, pathname: a, componentMetadata: __privateGet(this, _e2).componentMetadata, scripts: c, styles: p, links: l, route: n, status: i, mod: u, env: __privateGet(this, _n2).env, locales: __privateGet(this, _e2).i18n?.locales, routing: __privateGet(this, _e2).i18n?.routing, defaultLocale: __privateGet(this, _e2).i18n?.defaultLocale });
  }
}, _o = new WeakSet(), o_fn = async function(t, { status: r, response: n, skipMiddleware: s = false }) {
  let i = `/${r}${__privateGet(this, _e2).trailingSlash === "always" ? "/" : ""}`, a = Sn(i, __privateGet(this, _t2)), o = new URL(t.url);
  if (a) {
    if (a.prerender) {
      let c = a.route.endsWith(`/${r}`) ? ".html" : "", u = new URL(`${__privateGet(this, _i2)}/${r}${c}`, o), d = await fetch(u.toString()), b = { status: r };
      return __privateMethod(this, _c, c_fn).call(this, d, n, b);
    }
    let p = await __privateMethod(this, _d, d_fn).call(this, a);
    try {
      let c = await __privateMethod(this, _p, p_fn).call(this, o, t, a, p, r), u = await p.page();
      s === false && __privateGet(this, _n2).setMiddlewareFunction(__privateGet(this, _e2).middleware), s && __privateGet(this, _n2).unsetMiddlewareFunction();
      let d = await __privateGet(this, _n2).renderRoute(c, u);
      return __privateMethod(this, _c, c_fn).call(this, d, n);
    } catch {
      if (s === false)
        return __privateMethod(this, _o, o_fn).call(this, t, { status: r, response: n, skipMiddleware: true });
    }
  }
  let l = __privateMethod(this, _c, c_fn).call(this, new Response(null, { status: r }), n);
  return Reflect.set(l, En, true), l;
}, _c = new WeakSet(), c_fn = function(t, r, n) {
  if (!r)
    return n !== void 0 ? new Response(t.body, { status: n.status, statusText: t.statusText, headers: t.headers }) : t;
  let s = n?.status ? n.status : r.status === 200 ? t.status : r.status;
  try {
    r.headers.delete("Content-type");
  } catch {
  }
  return new Response(t.body, { status: s, statusText: s === 200 ? t.statusText : r.statusText, headers: new Headers([...Array.from(t.headers), ...Array.from(r.headers)]) });
}, _h = new WeakSet(), h_fn = function(t, r) {
  if (!t.pattern.exec(r)) {
    for (let s of t.fallbackRoutes)
      if (s.pattern.test(r))
        return 302;
  }
  let n = ge(t.route);
  return n.endsWith("/404") ? 404 : n.endsWith("/500") ? 500 : 200;
}, _d = new WeakSet(), d_fn = async function(t) {
  if (t.type === "redirect")
    return oa;
  if (__privateGet(this, _e2).pageMap) {
    let r = __privateGet(this, _e2).pageMap.get(t.component);
    if (!r)
      throw new Error(`Unexpectedly unable to find a component instance for route ${t.route}`);
    return await r();
  } else {
    if (__privateGet(this, _e2).pageModule)
      return __privateGet(this, _e2).pageModule;
    throw new Error("Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue.");
  }
}, __publicField(_a, "getSetCookieFromResponse", yn), _a);
var Ca = typeof process == "object" && Object.prototype.toString.call(process) === "[object process]";
function Ma() {
  return new Proxy({}, { get: (e2, t) => {
    console.warn(`Unable to access \`import.meta\0.env.${t.toString()}\` on initialization as the Cloudflare platform only provides the environment variables per request. Please move the environment variable access inside a function that's only called after a request has been received.`);
  } });
}
Ca || (process.env = Ma());
function _a3(e2) {
  let t = new Ot(e2);
  return { onRequest: async (n) => {
    let s = n.request, { env: i } = n;
    process.env = i;
    let { pathname: a } = new URL(s.url);
    if (e2.assets.has(a))
      return i.ASSETS.fetch(s);
    let o = t.match(s);
    Reflect.set(s, Symbol.for("astro.clientAddress"), s.headers.get("cf-connecting-ip"));
    let l = { runtime: { waitUntil: (c) => {
      n.waitUntil(c);
    }, env: n.env, cf: s.cf, caches } }, p = await t.render(s, { routeData: o, locals: l });
    if (t.setCookieHeaders)
      for (let c of t.setCookieHeaders(p))
        p.headers.append("Set-Cookie", c);
    return p;
  }, manifest: e2 };
}
var Na = () => Promise.resolve().then(() => (on(), an));
var Oa = () => Promise.resolve().then(() => (mn(), fn));
var ka = /* @__PURE__ */ new Map([["../node_modules/astro/dist/assets/endpoint/generic.js", Na], ["src/pages/index.astro", Oa]]);
var Ua = Object.assign(qr, { pageMap: ka, renderers: z, middleware: Wr });
var kn = _a3(Ua);
var nc = kn.onRequest;
var sc = kn.manifest;

// ../.wrangler/tmp/pages-BUujv0/functionsRoutes-0.40786011956858714.mjs
var routes = [
  {
    routePath: "/:path*",
    mountPath: "/",
    method: "",
    middlewares: [],
    modules: [nc]
  }
];

// ../../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j2 = i + 1;
      while (j2 < str.length) {
        var code = str.charCodeAt(j2);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j2++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j2;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j2 = i + 1;
      if (str[j2] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j2));
      }
      while (j2 < str.length) {
        if (str[j2] === "\\") {
          pattern += str[j2++] + str[j2++];
          continue;
        }
        if (str[j2] === ")") {
          count--;
          if (count === 0) {
            j2++;
            break;
          }
        } else if (str[j2] === "(") {
          count++;
          if (str[j2 + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j2));
          }
        }
        pattern += str[j2++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j2;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a4 = options.prefixes, prefixes = _a4 === void 0 ? "./" : _a4;
  var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a5 = tokens[i], nextType = _a5.type, index = _a5.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || defaultPattern,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function match(str, options) {
  var keys = [];
  var re2 = pathToRegexp(str, keys, options);
  return regexpToFunction(re2, keys, options);
}
function regexpToFunction(re2, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a4 = options.decode, decode = _a4 === void 0 ? function(x) {
    return x;
  } : _a4;
  return function(pathname) {
    var m2 = re2.exec(pathname);
    if (!m2)
      return false;
    var path = m2[0], index = m2.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m2[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m2[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m2[i2], key);
      }
    };
    for (var i = 1; i < m2.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a4 = options.strict, strict = _a4 === void 0 ? false : _a4, _b = options.start, start = _b === void 0 ? true : _b, _c2 = options.end, end = _c2 === void 0 ? true : _c2, _d2 = options.encode, encode = _d2 === void 0 ? function(x) {
    return x;
  } : _d2, _e3 = options.delimiter, delimiter = _e3 === void 0 ? "/#?" : _e3, _f2 = options.endsWith, endsWith = _f2 === void 0 ? "" : _f2;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i3 = 0, tokens_1 = tokens; _i3 < tokens_1.length; _i3++) {
    var token = tokens_1[_i3];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            route += "((?:".concat(token.pattern, ")").concat(token.modifier, ")");
          } else {
            route += "(".concat(token.pattern, ")").concat(token.modifier);
          }
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}

// ../../../../AppData/Roaming/npm/node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: () => {
            isFailOpen = true;
          }
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    };
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = (response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
);
export {
  pages_template_worker_default as default
};
/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

cssesc/cssesc.js:
  (*! https://mths.be/cssesc v3.0.0 by @mathias *)
*/
