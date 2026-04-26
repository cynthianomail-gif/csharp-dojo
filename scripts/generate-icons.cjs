// Pure Node.js PNG generator — no external packages needed
const fs = require('fs')
const zlib = require('zlib')
const path = require('path')

function crc32(buf) {
  let crc = 0xFFFFFFFF
  for (const b of buf) {
    crc ^= b
    for (let i = 0; i < 8; i++)
      crc = (crc & 1) ? (0xEDB88320 ^ (crc >>> 1)) : (crc >>> 1)
  }
  return (crc ^ 0xFFFFFFFF) >>> 0
}

function chunk(type, data) {
  const len = Buffer.allocUnsafe(4)
  len.writeUInt32BE(data.length)
  const t = Buffer.from(type)
  const crcVal = crc32(Buffer.concat([t, data]))
  const crcBuf = Buffer.allocUnsafe(4)
  crcBuf.writeUInt32BE(crcVal)
  return Buffer.concat([len, t, data, crcBuf])
}

function createPNG(size) {
  const BG  = [0x15, 0x17, 0x2B]   // #15172B  深藍背景
  const ACC = [0xC4, 0xA8, 0xFF]   // #C4A8FF  薰衣草
  const PKG = [0xFF, 0xD6, 0xE8]   // #FFD6E8  粉紅

  const cx = size / 2
  const cy = size / 2
  const r  = size * 0.42           // 外圓半徑（裝飾用）

  // IHDR
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8   // bit depth
  ihdr[9] = 2   // RGB
  ihdr[10] = ihdr[11] = ihdr[12] = 0

  // Pixel data
  const raw = Buffer.alloc((size * 3 + 1) * size, 0)

  for (let y = 0; y < size; y++) {
    raw[y * (size * 3 + 1)] = 0  // filter byte
    for (let x = 0; x < size; x++) {
      const off = y * (size * 3 + 1) + 1 + x * 3
      const dx = x - cx, dy = y - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      // Radial glow: blend BG toward ACC near top-left
      const glowFactor = Math.max(0, 1 - Math.sqrt((x - size*0.3)**2 + (y - size*0.25)**2) / (size * 0.6))
      let rgb = [
        Math.min(255, BG[0] + (ACC[0] - BG[0]) * glowFactor * 0.35),
        Math.min(255, BG[1] + (ACC[1] - BG[1]) * glowFactor * 0.35),
        Math.min(255, BG[2] + (ACC[2] - BG[2]) * glowFactor * 0.35),
      ]

      // "C" letter — large arc (left half of a circle)
      const letterR = size * 0.28
      const letterCx = size * 0.38, letterCy = size * 0.5
      const lDist = Math.sqrt((x - letterCx)**2 + (y - letterCy)**2)
      const thick = size * 0.06
      const angle = Math.atan2(y - letterCy, x - letterCx) * 180 / Math.PI
      if (lDist > letterR - thick && lDist < letterR + thick) {
        // Open on the right side (40° gap top and bottom)
        if (angle > 150 || angle < -150 || (angle > -130 && angle < 130 && !(angle > -30 && angle < 30))) {
          const t = 1 - Math.abs(lDist - letterR) / thick
          rgb = [
            rgb[0] * (1 - t) + ACC[0] * t,
            rgb[1] * (1 - t) + ACC[1] * t,
            rgb[2] * (1 - t) + ACC[2] * t,
          ]
        }
      }

      // "#" symbol — two vertical bars + two horizontal bars
      const hx = size * 0.65, hy = size * 0.5
      const bw = size * 0.028, bh = size * 0.22
      const gap = size * 0.065
      // Vertical bars
      const inV1 = x > hx - gap - bw/2 && x < hx - gap + bw/2 && y > hy - bh/2 && y < hy + bh/2
      const inV2 = x > hx + gap - bw/2 && x < hx + gap + bw/2 && y > hy - bh/2 && y < hy + bh/2
      // Horizontal bars
      const hbar = size * 0.028
      const hOff = size * 0.055
      const inH1 = x > hx - gap - bw/2 - size*0.02 && x < hx + gap + bw/2 + size*0.02 && y > hy - hOff - hbar/2 && y < hy - hOff + hbar/2
      const inH2 = x > hx - gap - bw/2 - size*0.02 && x < hx + gap + bw/2 + size*0.02 && y > hy + hOff - hbar/2 && y < hy + hOff + hbar/2

      if (inV1 || inV2 || inH1 || inH2) {
        rgb = [...PKG]
      }

      raw[off]     = Math.round(rgb[0])
      raw[off + 1] = Math.round(rgb[1])
      raw[off + 2] = Math.round(rgb[2])
    }
  }

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 6 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

const publicDir = path.join(__dirname, '..', 'public')
fs.mkdirSync(publicDir, { recursive: true })

const sizes = [
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  ['apple-touch-icon.png', 180],
]

for (const [name, size] of sizes) {
  const buf = createPNG(size)
  fs.writeFileSync(path.join(publicDir, name), buf)
  console.log(`✓ ${name} (${size}×${size})`)
}
console.log('Icons generated.')
