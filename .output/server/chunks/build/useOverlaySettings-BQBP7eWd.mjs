import { toRef, isRef } from 'vue';
import { b as useNuxtApp } from './server.mjs';

const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const DEFAULT_SETTINGS = {
  channel: "ReienOkami",
  bubbleBgColor: "#0a0c16",
  bubbleOpacity: 82,
  accentColor: "#7ecfdc",
  accentOpacity: 55,
  textColor: "#dde3ee",
  fontSizeMsg: 14,
  fontSizeUser: 13,
  chatWidth: 340,
  msgGap: 10,
  maxMessages: 8,
  colorBroadcaster: "#FFD700",
  colorModerator: "#00E676",
  colorVip: "#E040FB",
  colorSubscriber: "#40C4FF",
  colorDefault: "#FFFFFF"
};
const STORAGE_KEY = "twitch-overlay-settings";
function applyCssVars(s) {
  return;
}
function useOverlaySettings() {
  const settings = useState("overlay-settings", () => ({ ...DEFAULT_SETTINGS }));
  function load() {
    if (typeof localStorage === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        settings.value = { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch {
    }
    applyCssVars(settings.value);
  }
  function save() {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings.value));
    applyCssVars(settings.value);
  }
  function reset() {
    settings.value = { ...DEFAULT_SETTINGS };
    save();
  }
  return { settings, load, save, reset };
}

export { useOverlaySettings as u };
//# sourceMappingURL=useOverlaySettings-BQBP7eWd.mjs.map
