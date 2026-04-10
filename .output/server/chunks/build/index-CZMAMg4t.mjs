import { defineComponent, computed, ref, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import tmi from 'tmi.js';
import { u as useOverlaySettings } from './useOverlaySettings-BQBP7eWd.mjs';
import { _ as _export_sfc, u as useRoute } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { settings } = useOverlaySettings();
    const route = useRoute();
    const channelParam = computed(
      () => route.query.channel || settings.value.channel || "ReienOkami"
    );
    const chats = ref([]);
    const status = ref("connecting");
    const statusText = computed(() => ({
      connecting: `\u0E01\u0E33\u0E25\u0E31\u0E07\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D #${channelParam.value}\u2026`,
      connected: "",
      disconnected: "\u0E2B\u0E25\u0E38\u0E14\u0E01\u0E32\u0E23\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D \u2014 \u0E01\u0E33\u0E25\u0E31\u0E07 reconnect\u2026",
      error: "\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A channel name"
    })[status.value]);
    const BADGE_URLS = {
      broadcaster: "https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/2",
      moderator: "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/2",
      vip: "https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/2",
      subscriber: "https://static-cdn.jtvnw.net/badges/v1/0e6c1a38-98a9-4d8a-b8f4-8f6bbf5e09c2/2",
      turbo: "https://static-cdn.jtvnw.net/badges/v1/bd444ec6-8f34-4bf9-91f4-af1e3428d80f/2",
      partner: "https://static-cdn.jtvnw.net/badges/v1/d12a2e27-16f6-41d0-ab77-b780518f00a3/2",
      prime: "https://static-cdn.jtvnw.net/badges/v1/bbbe0db0-a598-423e-86d0-f9fb98ca1933/2",
      staff: "https://static-cdn.jtvnw.net/badges/v1/d97c37bd-a6f5-4c38-8f57-4e4bef88af34/2",
      "sub-gifter": "https://static-cdn.jtvnw.net/badges/v1/f1d8486f-eb2e-4553-b44f-4d614617afc1/2"
    };
    function escapeHtml(str) {
      return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    function parseEmotes(message, emotes) {
      if (!emotes) return escapeHtml(message);
      const positions = [];
      for (const [id, ranges] of Object.entries(emotes)) {
        for (const range of ranges) {
          const [start, end] = range.split("-").map(Number);
          positions.push({ id, start, end });
        }
      }
      positions.sort((a, b) => b.start - a.start);
      let result = message;
      for (const { id, start, end } of positions) {
        const name = escapeHtml(result.slice(start, end + 1));
        const img = `<img class="emote" src="https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/3.0" alt="${name}" title="${name}">`;
        result = escapeHtml(result.slice(0, start)) + img + escapeHtml(result.slice(end + 1));
      }
      return result;
    }
    function parseBadges(badges) {
      if (!badges) return { icons: [], nameColor: "var(--color-default)" };
      let nameColor = "var(--color-default)";
      if (badges.broadcaster) nameColor = "var(--color-broadcaster)";
      else if (badges.moderator) nameColor = "var(--color-moderator)";
      else if (badges.vip) nameColor = "var(--color-vip)";
      else if (badges.subscriber) nameColor = "var(--color-subscriber)";
      const icons = [];
      for (const [key, value] of Object.entries(badges)) {
        const src = BADGE_URLS[key];
        if (src) icons.push(`<img class="badge-img" src="${src}" alt="${key}" title="${key} ${value}">`);
      }
      return { icons, nameColor };
    }
    let client = null;
    let reconnectTimer;
    function connect(channel) {
      if (client) {
        client.removeAllListeners();
        client.disconnect().catch(() => {
        });
        client = null;
      }
      clearTimeout(reconnectTimer);
      status.value = "connecting";
      client = new tmi.Client({ channels: [channel] });
      client.on("connected", () => {
        status.value = "connected";
      });
      client.on("disconnected", (reason) => {
        console.warn("[TwitchChat] Disconnected:", reason);
        status.value = "disconnected";
        reconnectTimer = setTimeout(() => connect(channel), 5e3);
      });
      client.on("message", (_ch, tags, message) => {
        const { icons, nameColor } = parseBadges(tags.badges);
        chats.value.push({
          id: Date.now(),
          user: tags["display-name"] || tags.username || "Unknown",
          html: parseEmotes(message, tags.emotes),
          badges: icons,
          nameColor
        });
        const max = settings.value.maxMessages || 8;
        if (chats.value.length > max) chats.value.shift();
      });
      client.connect().catch((err) => {
        console.error("[TwitchChat] Error:", err);
        status.value = "error";
        reconnectTimer = setTimeout(() => connect(channel), 1e4);
      });
    }
    watch(channelParam, (newCh) => connect(newCh));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overlay-root" }, _attrs))} data-v-8583c229>`);
      if (unref(status) !== "connected") {
        _push(`<div class="${ssrRenderClass([unref(status), "status-badge"])}" data-v-8583c229><span class="status-dot" data-v-8583c229></span> ${ssrInterpolate(unref(statusText))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div${ssrRenderAttrs({
        name: "msg",
        class: "chat-list"
      })} data-v-8583c229>`);
      ssrRenderList(unref(chats), (msg) => {
        var _a;
        _push(`<div class="chat-item" data-v-8583c229><div class="chat-header" data-v-8583c229><!--[-->`);
        ssrRenderList(msg.badges, (badge, i) => {
          _push(`<span class="badge-slot" data-v-8583c229>${badge != null ? badge : ""}</span>`);
        });
        _push(`<!--]--><span class="username" style="${ssrRenderStyle({ color: msg.nameColor })}" data-v-8583c229>${ssrInterpolate(msg.user)}</span></div><div class="chat-bubble" data-v-8583c229>${(_a = msg.html) != null ? _a : ""}</div></div>`);
      });
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8583c229"]]);

export { index as default };
//# sourceMappingURL=index-CZMAMg4t.mjs.map
