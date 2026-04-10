/**
 * composables/useOverlaySettings.ts
 *
 * จัดการ overlay settings ทั้งหมด
 * - โหลดจาก localStorage เมื่อ mount
 * - บันทึกลง localStorage ทุกครั้งที่ settings เปลี่ยน
 * - apply CSS variables ลงที่ document.documentElement
 * - export ใช้ได้ทั้งหน้า / (overlay) และ /settings
 */

export interface OverlaySettings {
  // ── Twitch ────────────────────────────────
  channel: string

  // ── Bubble background ─────────────────────
  bubbleBgColor: string   // hex เช่น "#0a0c16"
  bubbleOpacity: number   // 0–100

  // ── Accent bar (เส้นซ้าย) ─────────────────
  accentColor: string     // hex
  accentOpacity: number   // 0–100

  // ── Text ──────────────────────────────────
  textColor: string       // hex
  fontSizeMsg: number     // px
  fontSizeUser: number    // px

  // ── Layout ────────────────────────────────
  chatWidth: number       // px
  msgGap: number          // px
  maxMessages: number

  // ── Role colors ───────────────────────────
  colorBroadcaster: string
  colorModerator: string
  colorVip: string
  colorSubscriber: string
  colorDefault: string
}

// ── Default settings ─────────────────────────────────────────
export const DEFAULT_SETTINGS: OverlaySettings = {
  channel: 'ReienOkami',

  bubbleBgColor: '#0a0c16',
  bubbleOpacity: 82,

  accentColor: '#7ecfdc',
  accentOpacity: 55,

  textColor: '#dde3ee',
  fontSizeMsg: 14,
  fontSizeUser: 13,

  chatWidth: 340,
  msgGap: 10,
  maxMessages: 8,

  colorBroadcaster: '#FFD700',
  colorModerator: '#00E676',
  colorVip: '#E040FB',
  colorSubscriber: '#40C4FF',
  colorDefault: '#FFFFFF',
}

const STORAGE_KEY = 'twitch-overlay-settings'

// ── Utility: hex → { r, g, b } ───────────────────────────────
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '')
  const num = parseInt(clean, 16)
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  }
}

// ── Apply settings → CSS variables ───────────────────────────
export function applyCssVars(s: OverlaySettings) {
  if (typeof document === 'undefined') return
  const root = document.documentElement

  const bubbleRgb = hexToRgb(s.bubbleBgColor)
  root.style.setProperty('--bubble-bg-r', String(bubbleRgb.r))
  root.style.setProperty('--bubble-bg-g', String(bubbleRgb.g))
  root.style.setProperty('--bubble-bg-b', String(bubbleRgb.b))
  root.style.setProperty('--bubble-opacity', String(s.bubbleOpacity / 100))
  root.style.setProperty('--bubble-bg', `rgba(${bubbleRgb.r},${bubbleRgb.g},${bubbleRgb.b},${s.bubbleOpacity / 100})`)

  const accentRgb = hexToRgb(s.accentColor)
  root.style.setProperty('--accent-color', `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},${s.accentOpacity / 100})`)

  root.style.setProperty('--text-color', s.textColor)
  root.style.setProperty('--font-size-msg', `${s.fontSizeMsg}px`)
  root.style.setProperty('--font-size-user', `${s.fontSizeUser}px`)

  root.style.setProperty('--chat-width', `${s.chatWidth}px`)
  root.style.setProperty('--msg-gap', `${s.msgGap}px`)

  root.style.setProperty('--color-broadcaster', s.colorBroadcaster)
  root.style.setProperty('--color-moderator', s.colorModerator)
  root.style.setProperty('--color-vip', s.colorVip)
  root.style.setProperty('--color-subscriber', s.colorSubscriber)
  root.style.setProperty('--color-default', s.colorDefault)
}

// ── Composable ────────────────────────────────────────────────
export function useOverlaySettings() {
  const settings = useState<OverlaySettings>('overlay-settings', () => ({ ...DEFAULT_SETTINGS }))

  // โหลดจาก localStorage
  function load() {
    if (typeof localStorage === 'undefined') return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        // merge กับ default เพื่อรองรับ field ใหม่ที่เพิ่มในอนาคต
        settings.value = { ...DEFAULT_SETTINGS, ...parsed }
      }
    } catch {
      // ถ้า parse ไม่ได้ → ใช้ default
    }
    applyCssVars(settings.value)
  }

  // บันทึกลง localStorage + apply CSS vars
  function save() {
    if (typeof localStorage === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings.value))
    applyCssVars(settings.value)
  }

  // reset กลับ default
  function reset() {
    settings.value = { ...DEFAULT_SETTINGS }
    save()
  }

  return { settings, load, save, reset }
}
