'use client'

import { useState } from 'react'

export default function Home() {
  return (
    <div className="container">
      <div className="header">
        <h1>🤖 Avtomatizacijski Center</h1>
        <p>Izberi orodje za avtomatizacijo spodnjih opravil</p>
      </div>

      <div className="tools-grid">
        <PasswordGenerator />
        <TextCounter />
        <QRCodeGenerator />
        <ColorConverter />
        <Base64Tool />
        <UUIDGenerator />
        <TextCaseConverter />
        <LoremIpsumGenerator />
        <UrlEncoder />
        <JsonFormatter />
        <HashGenerator />
        <TimestampConverter />
      </div>
    </div>
  )
}

function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [includeUpper, setIncludeUpper] = useState(true)
  const [includeLower, setIncludeLower] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [password, setPassword] = useState('')
  const [strength, setStrength] = useState('')

  const generatePassword = () => {
    let chars = ''
    if (includeLower) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (includeUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeNumbers) chars += '0123456789'
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'

    if (!chars) {
      setPassword('Izberi vsaj eno možnost!')
      return
    }

    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(result)

    // Calculate strength
    let score = 0
    if (length >= 12) score++
    if (length >= 16) score++
    if (includeUpper && includeLower) score++
    if (includeNumbers) score++
    if (includeSymbols) score++

    if (score <= 2) setStrength('weak')
    else if (score <= 4) setStrength('medium')
    else setStrength('strong')
  }

  return (
    <div className="tool-card">
      <h2>🔐 Generator Gesel</h2>
      <p>Ustvari varno naključno geslo</p>

      <div className="input-group">
        <label>Dolžina: {length}</label>
        <input
          type="range"
          min="8"
          max="32"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </div>

      <div className="checkbox-group">
        <div className="checkbox-item">
          <input
            type="checkbox"
            checked={includeUpper}
            onChange={(e) => setIncludeUpper(e.target.checked)}
          />
          <label>Velike črke (A-Z)</label>
        </div>
        <div className="checkbox-item">
          <input
            type="checkbox"
            checked={includeLower}
            onChange={(e) => setIncludeLower(e.target.checked)}
          />
          <label>Male črke (a-z)</label>
        </div>
        <div className="checkbox-item">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          <label>Številke (0-9)</label>
        </div>
        <div className="checkbox-item">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          <label>Simboli (!@#$...)</label>
        </div>
      </div>

      <button onClick={generatePassword}>Generiraj Geslo</button>

      {password && (
        <div className="result result-success">
          <h3>Tvoje Geslo:</h3>
          <pre>{password}</pre>
          {strength && (
            <div className={`password-strength strength-${strength}`}>
              Moč gesla: {strength === 'weak' ? 'Šibko' : strength === 'medium' ? 'Srednje' : 'Močno'}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function TextCounter() {
  const [text, setText] = useState('')

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const charCount = text.length
  const charNoSpaces = text.replace(/\s/g, '').length
  const lineCount = text ? text.split('\n').length : 0

  return (
    <div className="tool-card">
      <h2>📊 Števec Besedila</h2>
      <p>Preštej besede, znake in vrstice</p>

      <div className="input-group">
        <textarea
          placeholder="Vnesi besedilo tukaj..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="result">
        <h3>Statistika:</h3>
        <pre>
          Besede: {wordCount}
          {'\n'}Znaki: {charCount}
          {'\n'}Znaki (brez presledkov): {charNoSpaces}
          {'\n'}Vrstice: {lineCount}
        </pre>
      </div>
    </div>
  )
}

function QRCodeGenerator() {
  const [text, setText] = useState('')
  const [qrCode, setQrCode] = useState('')

  const generateQR = async () => {
    if (!text) return
    // Using QR Server API
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`
    setQrCode(qrUrl)
  }

  return (
    <div className="tool-card">
      <h2>📱 QR Koda Generator</h2>
      <p>Ustvari QR kodo iz besedila ali URL-ja</p>

      <div className="input-group">
        <input
          type="text"
          placeholder="Vnesi URL ali besedilo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button onClick={generateQR}>Generiraj QR Kodo</button>

      {qrCode && (
        <div className="result result-success">
          <h3>Tvoja QR Koda:</h3>
          <div className="qr-preview">
            <img src={qrCode} alt="QR Code" />
          </div>
        </div>
      )}
    </div>
  )
}

function ColorConverter() {
  const [hex, setHex] = useState('#667eea')
  const [rgb, setRgb] = useState({ r: 102, g: 126, b: 234 })

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')
  }

  const handleHexChange = (value: string) => {
    setHex(value)
    const rgbValue = hexToRgb(value)
    if (rgbValue) setRgb(rgbValue)
  }

  const handleRgbChange = (color: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...rgb, [color]: value }
    setRgb(newRgb)
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
  }

  return (
    <div className="tool-card">
      <h2>🎨 Pretvornik Barv</h2>
      <p>Pretvori med HEX in RGB</p>

      <div className="input-group">
        <label>HEX:</label>
        <input
          type="text"
          value={hex}
          onChange={(e) => handleHexChange(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>RGB:</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="number"
            min="0"
            max="255"
            value={rgb.r}
            onChange={(e) => handleRgbChange('r', Number(e.target.value))}
            placeholder="R"
          />
          <input
            type="number"
            min="0"
            max="255"
            value={rgb.g}
            onChange={(e) => handleRgbChange('g', Number(e.target.value))}
            placeholder="G"
          />
          <input
            type="number"
            min="0"
            max="255"
            value={rgb.b}
            onChange={(e) => handleRgbChange('b', Number(e.target.value))}
            placeholder="B"
          />
        </div>
      </div>

      <div className="color-preview" style={{ backgroundColor: hex }}></div>

      <div className="result" style={{ marginTop: '15px' }}>
        <h3>Vrednosti:</h3>
        <pre>
          HEX: {hex}
          {'\n'}RGB: rgb({rgb.r}, {rgb.g}, {rgb.b})
        </pre>
      </div>
    </div>
  )
}

function Base64Tool() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const handleConvert = () => {
    try {
      if (mode === 'encode') {
        setResult(btoa(text))
      } else {
        setResult(atob(text))
      }
    } catch (error) {
      setResult('Napaka pri pretvorbi!')
    }
  }

  return (
    <div className="tool-card">
      <h2>🔄 Base64 Kodiranje</h2>
      <p>Kodiraj ali dekodiraj Base64</p>

      <div className="input-group">
        <label>Način:</label>
        <select value={mode} onChange={(e) => setMode(e.target.value as 'encode' | 'decode')}>
          <option value="encode">Kodiraj</option>
          <option value="decode">Dekodiraj</option>
        </select>
      </div>

      <div className="input-group">
        <textarea
          placeholder="Vnesi besedilo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button onClick={handleConvert}>
        {mode === 'encode' ? 'Kodiraj' : 'Dekodiraj'}
      </button>

      {result && (
        <div className="result result-success">
          <h3>Rezultat:</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  )
}

function UUIDGenerator() {
  const [uuid, setUuid] = useState('')
  const [count, setCount] = useState(1)

  const generateUUID = () => {
    const uuids = []
    for (let i = 0; i < count; i++) {
      uuids.push(crypto.randomUUID())
    }
    setUuid(uuids.join('\n'))
  }

  return (
    <div className="tool-card">
      <h2>🆔 UUID Generator</h2>
      <p>Ustvari unikatne identifikatorje</p>

      <div className="input-group">
        <label>Število UUID-jev: {count}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
      </div>

      <button onClick={generateUUID}>Generiraj UUID</button>

      {uuid && (
        <div className="result result-success">
          <h3>UUID:</h3>
          <pre>{uuid}</pre>
        </div>
      )}
    </div>
  )
}

function TextCaseConverter() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')

  const convert = (type: string) => {
    switch (type) {
      case 'upper':
        setResult(text.toUpperCase())
        break
      case 'lower':
        setResult(text.toLowerCase())
        break
      case 'title':
        setResult(text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()))
        break
      case 'sentence':
        setResult(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase())
        break
      case 'toggle':
        setResult(text.split('').map(char =>
          char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        ).join(''))
        break
    }
  }

  return (
    <div className="tool-card">
      <h2>🔤 Pretvornik Velikih/Malih Črk</h2>
      <p>Spremeni velikost črk v besedilu</p>

      <div className="input-group">
        <textarea
          placeholder="Vnesi besedilo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
        <button onClick={() => convert('upper')}>VELIKE</button>
        <button onClick={() => convert('lower')}>male</button>
        <button onClick={() => convert('title')}>Title Case</button>
        <button onClick={() => convert('sentence')}>Sentence case</button>
        <button onClick={() => convert('toggle')} style={{ gridColumn: '1 / -1' }}>tOGGLE cASE</button>
      </div>

      {result && (
        <div className="result result-success">
          <h3>Rezultat:</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  )
}

function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3)
  const [result, setResult] = useState('')

  const lorem = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.',
    'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.'
  ]

  const generate = () => {
    let text = ''
    for (let i = 0; i < paragraphs; i++) {
      const randomParagraphs = Math.floor(Math.random() * 3) + 3
      let paragraph = ''
      for (let j = 0; j < randomParagraphs; j++) {
        paragraph += lorem[Math.floor(Math.random() * lorem.length)] + ' '
      }
      text += paragraph.trim() + '\n\n'
    }
    setResult(text.trim())
  }

  return (
    <div className="tool-card">
      <h2>📝 Lorem Ipsum Generator</h2>
      <p>Generiraj poljubno besedilo</p>

      <div className="input-group">
        <label>Število odstavkov: {paragraphs}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={paragraphs}
          onChange={(e) => setParagraphs(Number(e.target.value))}
        />
      </div>

      <button onClick={generate}>Generiraj Besedilo</button>

      {result && (
        <div className="result result-success">
          <h3>Besedilo:</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{result}</pre>
        </div>
      )}
    </div>
  )
}

function UrlEncoder() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const handleConvert = () => {
    try {
      if (mode === 'encode') {
        setResult(encodeURIComponent(text))
      } else {
        setResult(decodeURIComponent(text))
      }
    } catch (error) {
      setResult('Napaka pri pretvorbi!')
    }
  }

  return (
    <div className="tool-card">
      <h2>🔗 URL Encoder/Decoder</h2>
      <p>Kodiraj ali dekodiraj URL parametre</p>

      <div className="input-group">
        <label>Način:</label>
        <select value={mode} onChange={(e) => setMode(e.target.value as 'encode' | 'decode')}>
          <option value="encode">Kodiraj</option>
          <option value="decode">Dekodiraj</option>
        </select>
      </div>

      <div className="input-group">
        <textarea
          placeholder="Vnesi URL ali besedilo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button onClick={handleConvert}>
        {mode === 'encode' ? 'Kodiraj' : 'Dekodiraj'}
      </button>

      {result && (
        <div className="result result-success">
          <h3>Rezultat:</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  )
}

function JsonFormatter() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')

  const format = () => {
    try {
      const parsed = JSON.parse(text)
      setResult(JSON.stringify(parsed, null, 2))
    } catch (error) {
      setResult('Neveljaven JSON!')
    }
  }

  const minify = () => {
    try {
      const parsed = JSON.parse(text)
      setResult(JSON.stringify(parsed))
    } catch (error) {
      setResult('Neveljaven JSON!')
    }
  }

  return (
    <div className="tool-card">
      <h2>{ } JSON Formatter</h2>
      <p>Formatiraj in minimiraj JSON</p>

      <div className="input-group">
        <textarea
          placeholder='Vnesi JSON... {"key": "value"}'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <button onClick={format}>Formatiraj</button>
        <button onClick={minify}>Minimiraj</button>
      </div>

      {result && (
        <div className="result result-success">
          <h3>Rezultat:</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  )
}

function HashGenerator() {
  const [text, setText] = useState('')
  const [hashes, setHashes] = useState<any>({})

  const generate = async () => {
    if (!text) return

    const encoder = new TextEncoder()
    const data = encoder.encode(text)

    // SHA-256
    const sha256Buffer = await crypto.subtle.digest('SHA-256', data)
    const sha256 = Array.from(new Uint8Array(sha256Buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    // SHA-1
    const sha1Buffer = await crypto.subtle.digest('SHA-1', data)
    const sha1 = Array.from(new Uint8Array(sha1Buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    setHashes({ sha256, sha1 })
  }

  return (
    <div className="tool-card">
      <h2>#️⃣ Hash Generator</h2>
      <p>Generiraj hash vrednosti</p>

      <div className="input-group">
        <textarea
          placeholder="Vnesi besedilo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button onClick={generate}>Generiraj Hash</button>

      {hashes.sha256 && (
        <div className="result result-success">
          <h3>Hash vrednosti:</h3>
          <pre>
            SHA-256:
            {'\n'}{hashes.sha256}
            {'\n\n'}SHA-1:
            {'\n'}{hashes.sha1}
          </pre>
        </div>
      )}
    </div>
  )
}

function TimestampConverter() {
  const [timestamp, setTimestamp] = useState(Date.now())
  const [date, setDate] = useState(new Date())

  const timestampToDate = (ts: number) => {
    const d = new Date(ts)
    setDate(d)
  }

  const now = () => {
    const ts = Date.now()
    setTimestamp(ts)
    timestampToDate(ts)
  }

  return (
    <div className="tool-card">
      <h2>⏰ Timestamp Pretvornik</h2>
      <p>Pretvori med časovnim žigom in datumom</p>

      <div className="input-group">
        <label>Unix Timestamp (ms):</label>
        <input
          type="number"
          value={timestamp}
          onChange={(e) => {
            const ts = Number(e.target.value)
            setTimestamp(ts)
            timestampToDate(ts)
          }}
        />
      </div>

      <button onClick={now}>Trenutni Čas</button>

      <div className="result" style={{ marginTop: '15px' }}>
        <h3>Datum in čas:</h3>
        <pre>
          {date.toLocaleString('sl-SI')}
          {'\n'}
          {date.toISOString()}
          {'\n'}
          UTC: {date.toUTCString()}
        </pre>
      </div>
    </div>
  )
}
