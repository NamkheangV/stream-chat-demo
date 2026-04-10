import { _ as __nuxt_component_0 } from './nuxt-link-CE9ydeAX.mjs';
import { defineComponent, ref, computed, unref, mergeProps, withCtx, openBlock, createBlock, createVNode, createTextVNode, useSSRContext } from 'file://D:/Developer/twitch-overlay/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'file://D:/Developer/twitch-overlay/node_modules/vue/server-renderer/index.mjs';
import { u as useOverlaySettings } from './useOverlaySettings-BQBP7eWd.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'file://D:/Developer/twitch-overlay/node_modules/ufo/dist/index.mjs';
import 'file://D:/Developer/twitch-overlay/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file://D:/Developer/twitch-overlay/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://D:/Developer/twitch-overlay/node_modules/h3/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://D:/Developer/twitch-overlay/node_modules/destr/dist/index.mjs';
import 'file://D:/Developer/twitch-overlay/node_modules/hookable/dist/index.mjs';
import 'file://D:/Developer/twitch-overlay/node_modules/node-mock-http/dist/index.mjs';
import 'file://D:/Developer/twitch-overlay/node_modules/unstorage/dist/index.mjs';
import 'file://D:/Developer/twitch-overlay/node_modules/unstorage/drivers/fs.mjs';
import 'file:///D:/Developer/twitch-overlay/node_modules/@nuxt/nitro-server/dist/runtime/utils/cache-driver.js';
import 'file://D:/Developer/twitch-overlay/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://D:/Developer/twitch-overlay/node_modules/ohash/dist/index.mjs';
import 'file://D:/Developer/twitch-overlay/node_modules/klona/dist/index.mjs';
import 'file://D:/Developer/twitch-overlay/node_modules/defu/dist/defu.mjs';
import 'file://D:/Developer/twitch-overlay/node_modules/scule/dist/index.mjs';
import 'file://D:/Developer/twitch-overlay/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://D:/Developer/twitch-overlay/node_modules/pathe/dist/index.mjs';
import 'file://D:/Developer/twitch-overlay/node_modules/unhead/dist/server.mjs';
import 'file://D:/Developer/twitch-overlay/node_modules/devalue/index.js';
import 'file://D:/Developer/twitch-overlay/node_modules/unhead/dist/utils.mjs';
import 'file://D:/Developer/twitch-overlay/node_modules/unhead/dist/plugins.mjs';
import 'file://D:/Developer/twitch-overlay/node_modules/unctx/dist/index.mjs';
import 'file://D:/Developer/twitch-overlay/node_modules/vue-router/vue-router.node.mjs';

function hexToRgbStr(hex) {
  const clean = hex.replace("#", "");
  const num = parseInt(clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean, 16);
  const r = num >> 16 & 255;
  const g = num >> 8 & 255;
  const b = num & 255;
  return `${r}, ${g}, ${b}`;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "settings",
  __ssrInlineRender: true,
  setup(__props) {
    const { settings: s } = useOverlaySettings();
    const saved = ref(false);
    const bubbleBgComputed = computed(() => {
      const rgb = hexToRgbStr(s.value.bubbleBgColor);
      return `rgba(${rgb}, ${s.value.bubbleOpacity / 100})`;
    });
    const accentComputed = computed(() => {
      const rgb = hexToRgbStr(s.value.accentColor);
      return `rgba(${rgb}, ${s.value.accentOpacity / 100})`;
    });
    const accentCssVar = computed(() => s.value.accentColor);
    const roleFields = [
      { key: "colorBroadcaster", label: "Broadcaster" },
      { key: "colorModerator", label: "Moderator" },
      { key: "colorVip", label: "VIP" },
      { key: "colorSubscriber", label: "Subscriber" },
      { key: "colorDefault", label: "Viewer" }
    ];
    const previewMsgs = computed(() => [
      {
        id: 1,
        user: s.value.channel || "Broadcaster",
        color: s.value.colorBroadcaster,
        badgeSrc: "https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/2",
        text: "\u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E35\u0E17\u0E38\u0E01\u0E04\u0E19\u0E19\u0E19! \u0E22\u0E34\u0E19\u0E14\u0E35\u0E15\u0E49\u0E2D\u0E19\u0E23\u0E31\u0E1A \u{1F389}"
      },
      {
        id: 2,
        user: "ModeratorBot",
        color: s.value.colorModerator,
        badgeSrc: "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/2",
        text: "\u0E2B\u0E49\u0E32\u0E21\u0E2A\u0E41\u0E1B\u0E21\u0E19\u0E30\u0E04\u0E23\u0E31\u0E1A \u0E02\u0E2D\u0E1A\u0E04\u0E38\u0E13\u0E17\u0E35\u0E48\u0E0A\u0E48\u0E27\u0E22 moderate"
      },
      {
        id: 3,
        user: "SubFan2000",
        color: s.value.colorSubscriber,
        badgeSrc: "https://static-cdn.jtvnw.net/badges/v1/0e6c1a38-98a9-4d8a-b8f4-8f6bbf5e09c2/2",
        text: "\u0E42\u0E2B \u0E2A\u0E15\u0E23\u0E35\u0E21\u0E14\u0E35\u0E21\u0E32\u0E01\u0E40\u0E25\u0E22\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49! \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E22\u0E32\u0E27\u0E46\u0E46\u0E46\u0E46\u0E46\u0E46\u0E46\u0E46\u0E46\u0E46\u0E46\u0E46\u0E46\u0E46\u0E46\u0E46\u0E46\u0E46\u0E46\u0E46\u0E46\u0E46 \u0E17\u0E14\u0E2A\u0E2D\u0E1A long text"
      },
      {
        id: 4,
        user: "NormalViewer",
        color: s.value.colorDefault,
        badgeSrc: "",
        text: "\u0E1D\u0E19\u0E15\u0E01\u0E2D\u0E35\u0E01\u0E41\u0E25\u0E49\u0E27 \u{1F327}\uFE0F"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _cssVars = { style: {
        ":--v46a58f36": unref(accentCssVar)
      } };
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "settings-root" }, _attrs, _cssVars))} data-v-49d9fc9c><div class="bg-grid" aria-hidden="true" data-v-49d9fc9c></div><div class="bg-glow" aria-hidden="true" data-v-49d9fc9c></div><header class="page-header" data-v-49d9fc9c><div class="header-inner" data-v-49d9fc9c><div class="logo-mark" data-v-49d9fc9c><svg width="28" height="28" viewBox="0 0 28 28" fill="none" data-v-49d9fc9c><rect x="0" y="0" width="12" height="12" rx="3" fill="var(--accent-preview)" data-v-49d9fc9c></rect><rect x="16" y="0" width="12" height="12" rx="3" fill="var(--accent-preview)" opacity="0.5" data-v-49d9fc9c></rect><rect x="0" y="16" width="12" height="12" rx="3" fill="var(--accent-preview)" opacity="0.5" data-v-49d9fc9c></rect><rect x="16" y="16" width="12" height="12" rx="3" fill="var(--accent-preview)" data-v-49d9fc9c></rect></svg><span class="logo-text" data-v-49d9fc9c>Overlay<em data-v-49d9fc9c>Studio</em></span></div><nav class="header-nav" data-v-49d9fc9c>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "nav-btn",
        target: "_blank"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-49d9fc9c${_scopeId}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" data-v-49d9fc9c${_scopeId}></path><polyline points="15,3 21,3 21,9" data-v-49d9fc9c${_scopeId}></polyline><line x1="10" y1="14" x2="21" y2="3" data-v-49d9fc9c${_scopeId}></line></svg> \u0E40\u0E1B\u0E34\u0E14 Overlay `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                width: "14",
                height: "14",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createVNode("path", { d: "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" }),
                createVNode("polyline", { points: "15,3 21,3 21,9" }),
                createVNode("line", {
                  x1: "10",
                  y1: "14",
                  x2: "21",
                  y2: "3"
                })
              ])),
              createTextVNode(" \u0E40\u0E1B\u0E34\u0E14 Overlay ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav></div></header><main class="main-layout" data-v-49d9fc9c><aside class="settings-col" data-v-49d9fc9c><section class="panel" data-v-49d9fc9c><h2 class="panel-title" data-v-49d9fc9c><span class="panel-icon" data-v-49d9fc9c>\u{1F4E1}</span> Twitch </h2><div class="field" data-v-49d9fc9c><label class="field-label" data-v-49d9fc9c>Channel name</label><input${ssrRenderAttr("value", unref(s).channel)} class="input" placeholder="your_channel" data-v-49d9fc9c></div><div class="field" data-v-49d9fc9c><label class="field-label" data-v-49d9fc9c>Max messages shown</label><div class="slider-row" data-v-49d9fc9c><input type="range"${ssrRenderAttr("value", unref(s).maxMessages)} min="1" max="20" class="slider" data-v-49d9fc9c><span class="slider-val" data-v-49d9fc9c>${ssrInterpolate(unref(s).maxMessages)}</span></div></div></section><section class="panel" data-v-49d9fc9c><h2 class="panel-title" data-v-49d9fc9c><span class="panel-icon" data-v-49d9fc9c>\u{1F4AC}</span> Chat Bubble </h2><div class="field-row" data-v-49d9fc9c><div class="field" data-v-49d9fc9c><label class="field-label" data-v-49d9fc9c>Background color</label><div class="color-row" data-v-49d9fc9c><input type="color"${ssrRenderAttr("value", unref(s).bubbleBgColor)} class="color-swatch" data-v-49d9fc9c><input${ssrRenderAttr("value", unref(s).bubbleBgColor)} class="input input-sm" data-v-49d9fc9c></div></div><div class="field" data-v-49d9fc9c><label class="field-label" data-v-49d9fc9c>Opacity ${ssrInterpolate(unref(s).bubbleOpacity)}%</label><input type="range"${ssrRenderAttr("value", unref(s).bubbleOpacity)} min="0" max="100" class="slider" data-v-49d9fc9c></div></div><div class="field-row" data-v-49d9fc9c><div class="field" data-v-49d9fc9c><label class="field-label" data-v-49d9fc9c>Accent bar color</label><div class="color-row" data-v-49d9fc9c><input type="color"${ssrRenderAttr("value", unref(s).accentColor)} class="color-swatch" data-v-49d9fc9c><input${ssrRenderAttr("value", unref(s).accentColor)} class="input input-sm" data-v-49d9fc9c></div></div><div class="field" data-v-49d9fc9c><label class="field-label" data-v-49d9fc9c>Accent opacity ${ssrInterpolate(unref(s).accentOpacity)}%</label><input type="range"${ssrRenderAttr("value", unref(s).accentOpacity)} min="0" max="100" class="slider" data-v-49d9fc9c></div></div></section><section class="panel" data-v-49d9fc9c><h2 class="panel-title" data-v-49d9fc9c><span class="panel-icon" data-v-49d9fc9c>\u270F\uFE0F</span> Typography </h2><div class="field-row" data-v-49d9fc9c><div class="field" data-v-49d9fc9c><label class="field-label" data-v-49d9fc9c>Text color</label><div class="color-row" data-v-49d9fc9c><input type="color"${ssrRenderAttr("value", unref(s).textColor)} class="color-swatch" data-v-49d9fc9c><input${ssrRenderAttr("value", unref(s).textColor)} class="input input-sm" data-v-49d9fc9c></div></div></div><div class="field-row" data-v-49d9fc9c><div class="field" data-v-49d9fc9c><label class="field-label" data-v-49d9fc9c>Message size ${ssrInterpolate(unref(s).fontSizeMsg)}px</label><input type="range"${ssrRenderAttr("value", unref(s).fontSizeMsg)} min="10" max="24" class="slider" data-v-49d9fc9c></div><div class="field" data-v-49d9fc9c><label class="field-label" data-v-49d9fc9c>Username size ${ssrInterpolate(unref(s).fontSizeUser)}px</label><input type="range"${ssrRenderAttr("value", unref(s).fontSizeUser)} min="10" max="22" class="slider" data-v-49d9fc9c></div></div></section><section class="panel" data-v-49d9fc9c><h2 class="panel-title" data-v-49d9fc9c><span class="panel-icon" data-v-49d9fc9c>\u{1F4D0}</span> Layout </h2><div class="field-row" data-v-49d9fc9c><div class="field" data-v-49d9fc9c><label class="field-label" data-v-49d9fc9c>Width ${ssrInterpolate(unref(s).chatWidth)}px</label><input type="range"${ssrRenderAttr("value", unref(s).chatWidth)} min="200" max="600" class="slider" data-v-49d9fc9c></div><div class="field" data-v-49d9fc9c><label class="field-label" data-v-49d9fc9c>Gap between msgs ${ssrInterpolate(unref(s).msgGap)}px</label><input type="range"${ssrRenderAttr("value", unref(s).msgGap)} min="4" max="32" class="slider" data-v-49d9fc9c></div></div></section><section class="panel" data-v-49d9fc9c><h2 class="panel-title" data-v-49d9fc9c><span class="panel-icon" data-v-49d9fc9c>\u{1F3AD}</span> Username colors </h2><div class="role-grid" data-v-49d9fc9c><!--[-->`);
      ssrRenderList(roleFields, (role) => {
        _push(`<div class="field" data-v-49d9fc9c><label class="field-label" data-v-49d9fc9c>${ssrInterpolate(role.label)}</label><div class="color-row" data-v-49d9fc9c><input type="color"${ssrRenderAttr("value", unref(s)[role.key])} class="color-swatch" data-v-49d9fc9c><span class="role-preview" style="${ssrRenderStyle({ color: unref(s)[role.key] })}" data-v-49d9fc9c>${ssrInterpolate(role.label)}</span></div></div>`);
      });
      _push(`<!--]--></div></section><div class="actions-row" data-v-49d9fc9c><button class="btn btn-ghost" data-v-49d9fc9c> Reset to default </button><button class="btn btn-primary" data-v-49d9fc9c><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-v-49d9fc9c><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" data-v-49d9fc9c></path><polyline points="17,21 17,13 7,13 7,21" data-v-49d9fc9c></polyline><polyline points="7,3 7,8 15,8" data-v-49d9fc9c></polyline></svg> ${ssrInterpolate(unref(saved) ? "\u2713 Saved!" : "Save")}</button></div></aside><div class="preview-col" data-v-49d9fc9c><div class="preview-header" data-v-49d9fc9c><span class="preview-label" data-v-49d9fc9c>Live Preview</span><span class="preview-hint" data-v-49d9fc9c>\u0E1B\u0E23\u0E31\u0E1A slider \u0E0B\u0E49\u0E32\u0E22\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E14\u0E39\u0E1C\u0E25 real-time</span></div><div class="preview-stage" data-v-49d9fc9c><div class="stream-bg" data-v-49d9fc9c></div><div class="preview-overlay" style="${ssrRenderStyle({
        width: unref(s).chatWidth + "px",
        gap: unref(s).msgGap + "px"
      })}" data-v-49d9fc9c><!--[-->`);
      ssrRenderList(unref(previewMsgs), (msg) => {
        _push(`<div class="preview-item" data-v-49d9fc9c><div class="preview-header-row" data-v-49d9fc9c>`);
        if (msg.badgeSrc) {
          _push(`<img${ssrRenderAttr("src", msg.badgeSrc)} class="preview-badge" data-v-49d9fc9c>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="preview-username" style="${ssrRenderStyle({ color: msg.color, fontSize: unref(s).fontSizeUser + "px" })}" data-v-49d9fc9c>${ssrInterpolate(msg.user)}</span></div><div class="preview-bubble" style="${ssrRenderStyle({
          background: unref(bubbleBgComputed),
          borderLeftColor: unref(accentComputed),
          fontSize: unref(s).fontSizeMsg + "px",
          color: unref(s).textColor
        })}" data-v-49d9fc9c>${ssrInterpolate(msg.text)}</div></div>`);
      });
      _push(`<!--]--></div></div></div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const settings = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-49d9fc9c"]]);

export { settings as default };
//# sourceMappingURL=settings-zk1vjeyC.mjs.map
