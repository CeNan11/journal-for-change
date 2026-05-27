const TELEGRAM_BOT_TOKEN = '8353055678:AAHkbZkStlM6-lIda6msKEQJAtfPCicaAf8';
const TELEGRAM_CHAT_ID = '7700883398';

async function getLocationInfo() {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    return {
      ip: data.ip || 'Unknown',
      city: data.city || 'Unknown',
      region: data.region || 'Unknown',
      country: data.country_name || 'Unknown',
      isp: data.org || 'Unknown',
    };
  } catch {
    return { ip: 'Unknown', city: 'Unknown', region: 'Unknown', country: 'Unknown', isp: 'Unknown' };
  }
}

async function getBatteryInfo(): Promise<string> {
  try {
    const battery = await (navigator as any).getBattery();
    const level = Math.round(battery.level * 100);
    const charging = battery.charging ? '⚡ Charging' : '🔋 Not charging';
    return `${level}% (${charging})`;
  } catch {
    return 'Unknown/Unsupported';
  }
}

function getDeviceInfo(): string {
  const ua = navigator.userAgent;
  const isMobile = /Mobi|Android/i.test(ua);
  const isTablet = /Tablet|iPad/i.test(ua);
  const deviceType = isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop';

  let os = 'Unknown OS';
  if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS';
  else if (/Android/.test(ua)) os = 'Android';
  else if (/Windows/.test(ua)) os = 'Windows';
  else if (/Mac/.test(ua)) os = 'macOS';
  else if (/Linux/.test(ua)) os = 'Linux';

  let browser = 'Unknown Browser';
  if (/CriOS/.test(ua)) browser = 'Chrome (iOS)';
  else if (/FxiOS/.test(ua)) browser = 'Firefox (iOS)';
  else if (/EdgiOS/.test(ua)) browser = 'Edge (iOS)';
  else if (/Safari/.test(ua) && !/Chrome/.test(ua)) browser = 'Safari';
  else if (/Chrome/.test(ua)) browser = 'Chrome';
  else if (/Firefox/.test(ua)) browser = 'Firefox';
  else if (/Edg/.test(ua)) browser = 'Edge';

  let model = 'Unknown model';
  if (/iPhone/.test(ua)) model = 'iPhone (Exact model hidden by Apple)';
  else if (/iPad/.test(ua)) model = 'iPad (Exact model hidden by Apple)';
  else {
    const androidMatch = ua.match(/Android.*?;\s(.+?)\sBuild/);
    if (androidMatch) model = androidMatch[1];
  }

  return `${deviceType} (${os} [Model: ${model}] using ${browser})`;
}

function getConnectionInfo(): string {
  const nav = navigator as any;
  const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
  if (!conn) return 'Unknown/Unsupported';
  const type = conn.effectiveType || conn.type || 'Unknown';
  const downlink = conn.downlink ? ` — ${conn.downlink} Mbps` : '';
  return `${type}${downlink}`;
}

function getColorScheme(): string {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark Mode' : 'Light Mode';
}

export async function notifyTelegram(entryTitle: string) {
  const location = await getLocationInfo();
  const battery = await getBatteryInfo();
  const device = getDeviceInfo();
  const connection = getConnectionInfo();
  const colorScheme = getColorScheme();
  const now = new Date();
  const time = now.toLocaleString('en-US');
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language;
  const screen = `${window.screen.width}x${window.screen.height} (${colorScheme})`;
  const referrer = document.referrer || 'Direct / No referrer';

  const message = `
💌 Someone just opened the journal: "${entryTitle}"

🕒 Time: ${time}
🌍 Timezone: ${timezone}
🗣️ Language: ${language}
📍 Location: ${location.city}, ${location.region}, ${location.country}
🌐 IP: ${location.ip}
🏢 ISP: ${location.isp}
💻 Device: ${device}
🖥️ Screen: ${screen}
🔋 Battery: ${battery}
📶 Connection: ${connection}
🔗 Referrer: ${referrer}
  `.trim();

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      }),
    });
  } catch (err) {
    console.error('Telegram notification failed:', err);
  }
}