# 🎮 Twitch Chat Overlay — Nuxt 3

Chat overlay สำหรับ OBS พร้อมหน้า settings ปรับแต่งได้

## โครงสร้าง Project

```
twitch-overlay/
├── pages/
│   ├── index.vue          ← Chat overlay (ใช้ใน OBS Browser Source)
│   └── settings.vue       ← หน้าปรับแต่ง สี/opacity/layout
├── composables/
│   ├── useOverlaySettings.ts  ← จัดการ settings + localStorage
│   └── useTwitchChat.ts       ← เชื่อมต่อ Twitch IRC + parse emote/badge
├── utils/
│   └── color.ts           ← hex → rgb helper
├── assets/css/
│   └── global.css         ← CSS variables (design tokens)
└── nuxt.config.ts
```

## 🚀 เริ่มใช้งาน

```bash
# 1. ติดตั้ง dependencies
npm install

# 2. รัน dev server
npm run dev

# 3. เปิด settings → http://localhost:3000/settings
# 4. เปิด overlay → http://localhost:3000/
```

## ⚙️ ตั้งค่าใน OBS

1. Add Source → **Browser Source**
2. URL: `http://localhost:3000/` (หรือ URL หลัง deploy)
3. Width: ตามที่ตั้งไว้ใน settings (default: `340`)
4. Height: `700` (หรือตามต้องการ)
5. Custom CSS:
   ```css
   body { background: transparent !important; overflow: hidden; }
   ```
6. ✅ **Shutdown source when not visible**
7. ✅ **Refresh browser when scene becomes active**

## 🎨 ปรับแต่ง

เปิด `http://localhost:3000/settings` เพื่อ:
- เปลี่ยนสี bubble + opacity
- เปลี่ยนสี accent bar + opacity  
- ปรับสี text / ขนาด font
- ปรับความกว้าง / ช่องว่างระหว่าง message
- ปรับสี username ตาม role (broadcaster/mod/vip/sub)
- ดู live preview ได้ทันที

Settings จะ save อัตโนมัติใน **localStorage** และ apply ทันทีที่หน้า overlay โหลด

## 🌐 Deploy (ไม่ต้อง run local)

```bash
# Build static files
npm run generate

# Upload โฟลเดอร์ .output/public/ ขึ้น:
# - GitHub Pages
# - Netlify (drag & drop)
# - Vercel
```

แล้วใช้ URL ที่ได้ใน OBS แทน localhost

## 🏷️ Badge รองรับ

| Badge | Key |
|-------|-----|
| Broadcaster | `broadcaster` |
| Moderator | `moderator` |
| VIP | `vip` |
| Subscriber | `subscriber` |
| Turbo | `turbo` |
| Partner | `partner` |
| Prime Gaming | `prime` |
| Staff | `staff` |
| Gift Sub | `sub-gifter` |

## 📌 Feature เพิ่มเติม (กำลังจะทำ...)

— /Settings
- [ ] รองรับ Twitch API v5 (สำหรับ badge/emote ที่ไม่ได้อยู่ใน IRC)
- [ ] เพิ่ม option ปรับ layout (เช่น bubble shape, spacing, animation)
- [ ] เพิ่ม option ปรับ font family + weight
- [ ] เพิ่มการเปลี่ยนพื้นหลัง (background) ของ preview (เช่น gradient, image)

— UX/UI
- [ ] เพิ่ม loading ก่อนเข้าหน้า settings (ตอนดึงข้อมูลจาก Twitch API)
- [ ] เพิ่ม loading state ในหน้า settings
- [ ] เปลี่ยน background ในหน้า settings ให้เป็น animation หรือ ภาพขยับได้ (ตอนนี้เป็นแค่สีทึบๆ)
- [ ] responsive design สำหรับมือถือ (ถ้าใครอยากปรับจากมือถือก็ได้)
- [ ] เพิ่ม dark mode (อาจจะใช้ prefers-color-scheme หรือ toggle ใน settings)
- [ ] เพิ่ม modal คู่มือการใช้งาน (เช่น วิธีตั้งค่าใน OBS, วิธีใช้ Twitch API)