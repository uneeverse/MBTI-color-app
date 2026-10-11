// 카카오톡 공유용 카드 이미지(800x400)를 유형별로 만든다. 사용: node scripts/make-share-images.mjs
// 결과 화면의 대표 카드(색 블록 + 눈 + 유형 코드·이름)를 헤드리스 Chrome/Edge로 캡처한다.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { PALETTES } from '../src/data/palettes.js'

const BROWSERS = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
]
const browser = BROWSERS.find(existsSync)
if (!browser) throw new Error('Chrome 또는 Edge를 찾지 못했어요')

const outDir = resolve('public/share')
mkdirSync(outDir, { recursive: true })
const tmp = mkdtempSync(join(tmpdir(), 'share-'))

// 눈 204px, 눈동자 76px, 눈동자 기본 위치는 ResultCard.jsx의 DEFAULTS와 같다
const EYE = 204
const pupils = [
  { x: 74.8272 - 102, y: 78.3184 - 102 },
  { x: 119.032 - 102, y: 117.787 - 102 },
]

function html(code, { name, colors }) {
  const eyes = pupils
    .map(
      (p) => `<div class="eye"><div class="pupil" style="transform:translate(-50%,-50%) translate(${p.x}px,${p.y}px)"></div></div>`,
    )
    .join('')
  return `<!doctype html><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}
body{width:800px;height:400px;display:flex;gap:24px;padding:18px;background:#fbf0dc;color:#000;overflow:hidden;
font-family:"Pretendard","Malgun Gothic","Apple SD Gothic Neo",sans-serif}
.monster{width:440px;height:364px;display:flex;align-items:center;justify-content:center;gap:4px;background:${colors[0]}}
.eye{position:relative;width:${EYE}px;height:${EYE}px;border-radius:50%;background:#fbf0dc;overflow:hidden;flex:none}
.pupil{position:absolute;top:50%;left:50%;width:76px;height:76px;border-radius:50%;background:#000}
.legend{flex:1;display:flex;flex-direction:column;justify-content:center}
.code{font-size:80px;font-weight:700;letter-spacing:.02em;line-height:1.1}
.name{font-size:32px;font-weight:500;margin-top:8px;word-break:keep-all}
</style><div class="monster">${eyes}</div>
<div class="legend"><p class="code">${code}</p><h1 class="name">${name}</h1></div>`
}

for (const [code, palette] of Object.entries(PALETTES)) {
  const page = join(tmp, `${code}.html`)
  writeFileSync(page, html(code, palette))
  execFileSync(browser, [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=800,400',
    `--screenshot=${join(outDir, `${code}.png`)}`,
    pathToFileURL(page).href,
  ])
  console.log(`${code}.png`)
}
