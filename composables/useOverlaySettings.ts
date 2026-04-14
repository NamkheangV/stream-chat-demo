/**
 * composables/useOverlaySettings.ts
 *
 * ── วิธี sync settings → OBS ──
 * Settings page encode ทุก setting รวมถึง badge images (Base64)
 * ลงใน URL → user copy ไปวางใน OBS
 * Overlay page decode URL params → apply CSS vars + badge map ทันที
 *
 * ── Badge image strategy ──
 * 1. Default badges → ใช้รูปจาก /public/badges/ (asset ใน project)
 * 2. Custom badges  → อัปโหลดจากหน้า /settings → แปลงเป็น Base64
 *    → encode ลง URL param เหมือน settings อื่น (ไม่ต้อง backend)
 */

export interface BadgeImages {
    broadcaster: string   // URL หรือ base64 data URL
    moderator: string
    vip: string
    subscriber: string
    // sub2: string
    // sub3: string

    // subscriber ตามระยะเวลา
    sub_1month: string
    sub_2month: string
    sub_3month: string
    sub_6month: string
    sub_9month: string
    sub_1year: string

    // turbo: string
    // partner: string
    // prime: string
    // staff: string
    // 'sub-gifter': string
}

export interface OverlaySettings {
    // ── Twitch ──────────────────────────────
    channel: string

    // ── Bubble ──────────────────────────────
    bubbleBgColor: string
    bubbleOpacity: number

    accentColor: string
    accentOpacity: number

    // ── Text ────────────────────────────────
    textColor: string
    fontSizeMsg: number
    fontSizeUser: number

    // ── Layout ──────────────────────────────
    chatWidth: number
    msgGap: number
    maxMessages: number

    // ── Role colors ─────────────────────────
    colorBroadcaster: string
    colorModerator: string
    colorVip: string
    colorSubscriber: string
    colorDefault: string

    // ── Badge images (URL หรือ base64) ──────
    // เก็บเป็น JSON string ใน URL param "bi"
    badgeImages: BadgeImages
}

// ── Default badge paths (รูปใน /public/badges/) ─────────────
// วาง badge PNG ไว้ที่ public/badges/xxx.png แล้ว Nuxt จะ serve ให้
export const DEFAULT_BADGE_IMAGES: BadgeImages = {
    broadcaster: '/badges/broadcaster.svg',
    moderator: '/badges/moderator.svg',
    vip: '/badges/vip.svg',
    subscriber: '/badges/sub1.svg',
    // sub2: '/badges/sub2.svg',
    // sub3: '/badges/sub3.svg',

    sub_1month: '/badges/sub_1month.svg',
    sub_2month: '/badges/sub_2month.svg',
    sub_3month: '/badges/sub_3month.svg',
    sub_6month: '/badges/sub_6month.svg',
    sub_9month: '/badges/sub_9month.svg',
    sub_1year: '/badges/sub_1year.svg',

    // turbo: '/badges/turbo.svg',
    // partner: '/badges/partner.svg',
    // prime: '/badges/prime.svg',
    // staff: '/badges/staff.svg',
    // 'sub-gifter': '/badges/subgifter.svg',
}

// fallback เมื่อรูป local ไม่มี → ใช้ Twitch CDN
export const TWITCH_CDN_BADGES: BadgeImages = {
    broadcaster: 'https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/2',
    moderator: 'https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/2',
    vip: 'https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/2',
    subscriber: 'https://static-cdn.jtvnw.net/badges/v1/0e6c1a38-98a9-4d8a-b8f4-8f6bbf5e09c2/2',
    // sub2: 'https://static-cdn.jtvnw.net/badges/v1/0e6c1a38-98a9-4d8a-b8f4-8f6bbf5e09c2/2',
    // sub3: 'https://static-cdn.jtvnw.net/badges/v1/0e6c1a38-98a9-4d8a-b8f4-8f6bbf5e09c2/2',
    sub_1month: '',
    sub_2month: '',
    sub_3month: '',
    sub_6month: '',
    sub_9month: '',
    sub_1year: '',
    // turbo: 'https://static-cdn.jtvnw.net/badges/v1/bd444ec6-8f34-4bf9-91f4-af1e3428d80f/2',
    // partner: 'https://static-cdn.jtvnw.net/badges/v1/d12a2e27-16f6-41d0-ab77-b780518f00a3/2',
    // prime: 'https://static-cdn.jtvnw.net/badges/v1/bbbe0db0-a598-423e-86d0-f9fb98ca1933/2',
    // staff: 'https://static-cdn.jtvnw.net/badges/v1/d97c37bd-a6f5-4c38-8f57-4e4bef88af34/2',
    // 'sub-gifter': 'https://static-cdn.jtvnw.net/badges/v1/f1d8486f-eb2e-4553-b44f-4d614617afc1/2',
}

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
    badgeImages: { ...DEFAULT_BADGE_IMAGES },
}

// ── Short param keys ─────────────────────────────────────────
const PARAM_MAP: Record<string, string> = {
    channel: 'ch',
    bubbleBgColor: 'bb',
    bubbleOpacity: 'bo',
    accentColor: 'ac',
    accentOpacity: 'ao',
    textColor: 'tc',
    fontSizeMsg: 'fm',
    fontSizeUser: 'fu',
    chatWidth: 'cw',
    msgGap: 'mg',
    maxMessages: 'mm',
    colorBroadcaster: 'cbr',
    colorModerator: 'cmo',
    colorVip: 'cv',
    colorSubscriber: 'cs',
    colorDefault: 'cd',
    // badgeImages encode เป็น JSON แล้ว compress → param "bi"
}

const REVERSE_MAP = Object.fromEntries(
    Object.entries(PARAM_MAP).map(([k, v]) => [v, k])
)

const NUMERIC_FIELDS = new Set([
    'bubbleOpacity', 'accentOpacity', 'fontSizeMsg', 'fontSizeUser',
    'chatWidth', 'msgGap', 'maxMessages',
])

// ── hex → rgb ────────────────────────────────────────────────
function hexToRgb(hex: string) {
    const c = hex.replace('#', '')
    const n = parseInt(c, 16)
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

// ── Apply CSS variables ──────────────────────────────────────
export function applyCssVars(s: OverlaySettings) {
    if (typeof document === 'undefined') return
    const root = document.documentElement

    const bg = hexToRgb(s.bubbleBgColor)
    root.style.setProperty('--bubble-bg', `rgba(${bg.r},${bg.g},${bg.b},${s.bubbleOpacity / 100})`)

    const ac = hexToRgb(s.accentColor)
    root.style.setProperty('--accent-color', `rgba(${ac.r},${ac.g},${ac.b},${s.accentOpacity / 100})`)

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

// ── Encode settings → URL query string ──────────────────────
export function encodeSettingsToUrl(s: OverlaySettings): string {
    const params = new URLSearchParams()

    for (const [field, key] of Object.entries(PARAM_MAP)) {
        params.set(key, String((s as any)[field]))
    }

    // encode badgeImages เป็น JSON → base64 → param "bi"
    // ข้าม default paths เพื่อ URL สั้นลง (overlay จะใช้ default เองถ้าไม่มี param)
    const customBadges: Partial<BadgeImages> = {}
    let hasCustom = false
    for (const [k, v] of Object.entries(s.badgeImages) as [keyof BadgeImages, string][]) {
        if (v !== DEFAULT_BADGE_IMAGES[k]) {
            customBadges[k] = v
            hasCustom = true
        }
    }
    if (hasCustom) {
        params.set('bi', btoa(encodeURIComponent(JSON.stringify(customBadges))))
    }

    return params.toString()
}

// ── Decode URL query string → settings ──────────────────────
export function decodeSettingsFromUrl(search: string): Partial<OverlaySettings> {
    const params = new URLSearchParams(search)
    const result: Partial<OverlaySettings> = {}

    for (const [key, raw] of params.entries()) {
        if (key === 'bi') {
            // decode badgeImages
            try {
                const json = decodeURIComponent(atob(raw))
                const custom = JSON.parse(json) as Partial<BadgeImages>
                result.badgeImages = { ...DEFAULT_BADGE_IMAGES, ...custom }
            } catch { /* ignore corrupt param */ }
            continue
        }
        const field = REVERSE_MAP[key]
        if (!field) continue
            ; (result as any)[field] = NUMERIC_FIELDS.has(field) ? Number(raw) : raw
    }

    return result
}

// ── localStorage ─────────────────────────────────────────────
const STORAGE_KEY = 'twitch-overlay-settings-v2'

function readStorage(): OverlaySettings | null {
    if (typeof localStorage === 'undefined') return null
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return null
        const parsed = JSON.parse(raw)
        // merge badgeImages แยก เพื่อรองรับ field ใหม่ที่เพิ่มใน future
        return {
            ...DEFAULT_SETTINGS,
            ...parsed,
            badgeImages: { ...DEFAULT_BADGE_IMAGES, ...parsed.badgeImages },
        }
    } catch { return null }
}

// ── Composable ───────────────────────────────────────────────
export function useOverlaySettings() {
    const settings = useState<OverlaySettings>('overlay-settings', () => ({
        ...DEFAULT_SETTINGS,
        badgeImages: { ...DEFAULT_BADGE_IMAGES },
    }))

    /** load() — หน้า /settings: โหลดจาก localStorage */
    function load() {
        const stored = readStorage()
        if (stored) settings.value = stored
        applyCssVars(settings.value)
    }

    /** save() — หน้า /settings: บันทึกลง localStorage + apply preview */
    function save() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings.value))
        }
        applyCssVars(settings.value)
    }

    /** loadFromUrl() — หน้า / (OBS overlay): decode จาก URL params */
    function loadFromUrl() {
        if (typeof window === 'undefined') return
        const fromUrl = decodeSettingsFromUrl(window.location.search)
        settings.value = {
            ...DEFAULT_SETTINGS,
            badgeImages: { ...DEFAULT_BADGE_IMAGES },
            ...fromUrl,
        }
        applyCssVars(settings.value)
    }

    /** buildObsUrl() — หน้า /settings: สร้าง URL พร้อม params ทั้งหมด */
    function buildObsUrl(base: string): string {
        return `${base}?${encodeSettingsToUrl(settings.value)}`
    }

    function reset() {
        settings.value = { ...DEFAULT_SETTINGS, badgeImages: { ...DEFAULT_BADGE_IMAGES } }
        save()
    }

    return { settings, load, save, loadFromUrl, buildObsUrl, reset }
}
