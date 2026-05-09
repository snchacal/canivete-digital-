/* ========================================
   CANIVETE DIGITAL — app.js
   Busca, favoritos, última ferramenta usada
   ======================================== */

// Aplica tema salvo imediatamente (evita flash)
(function() {
  const t = localStorage.getItem('cd_theme');
  if (t) document.documentElement.setAttribute('data-theme', t);
})();

// ---- BANCO DE FERRAMENTAS ----
const TOOLS = [
  // Texto
  { id: 'contador-caracteres',   name: 'Contador de caracteres',        cat: 'texto',  url: '/texto/contador-caracteres.html',   desc: 'Conte letras, palavras e parágrafos' },
  { id: 'converter-maiusculas',  name: 'Converter maiúsculas/minúsculas', cat: 'texto', url: '/texto/converter-maiusculas.html',  desc: 'Mude o case do seu texto com um clique' },
  { id: 'remover-espacos',       name: 'Remover espaços extras',         cat: 'texto',  url: '/texto/remover-espacos.html',       desc: 'Elimine espaços duplos e linhas em branco' },
  { id: 'gerador-senha',         name: 'Gerador de senha',               cat: 'texto',  url: '/texto/gerador-senha.html',         desc: 'Crie senhas fortes e seguras' },
  { id: 'json-formatter',        name: 'JSON Formatter',                 cat: 'texto',  url: '/texto/json-formatter.html',        desc: 'Formate e valide JSON com identação' },
  { id: 'ordenar-texto',         name: 'Ordenar texto',                  cat: 'texto',  url: '/texto/ordenar-texto.html',         desc: 'Ordene linhas: A-Z, comprimento, aleatório' },
  // Imagem
  { id: 'converter-jpg-png',     name: 'Converter JPG / PNG',            cat: 'imagem', url: '/imagem/converter-jpg-png.html',    desc: 'Converta imagens entre formatos' },
  { id: 'redimensionar-imagem',  name: 'Redimensionar imagem',           cat: 'imagem', url: '/imagem/redimensionar-imagem.html', desc: 'Mude as dimensões da sua imagem' },
  { id: 'comprimir-imagem',      name: 'Comprimir imagem',               cat: 'imagem', url: '/imagem/comprimir-imagem.html',     desc: 'Reduza o peso sem perder qualidade' },
  { id: 'cortar-imagem',         name: 'Cortar imagem',                  cat: 'imagem', url: '/imagem/cortar-imagem.html',        desc: 'Corte e recorte imagens com proporções' },
  { id: 'converter-webp',        name: 'WebP converter',                 cat: 'imagem', url: '/imagem/converter-webp.html',       desc: 'Converta imagens para WebP e vice-versa' },
  // PDF
  { id: 'juntar-pdf',            name: 'Juntar PDF',                     cat: 'pdf',    url: '/pdf/juntar-pdf.html',              desc: 'Una vários PDFs em um único arquivo' },
  { id: 'dividir-pdf',           name: 'Dividir PDF',                    cat: 'pdf',    url: '/pdf/dividir-pdf.html',             desc: 'Separe páginas de um PDF em arquivos individuais' },
  { id: 'comprimir-pdf',         name: 'Comprimir PDF',                  cat: 'pdf',    url: '/pdf/comprimir-pdf.html',           desc: 'Reduza o tamanho do seu PDF' },
  { id: 'pdf-para-jpg',          name: 'PDF para JPG',                   cat: 'pdf',    url: '/pdf/pdf-para-jpg.html',            desc: 'Converta páginas de PDF em imagens JPG' },
  { id: 'jpg-para-pdf',          name: 'JPG para PDF',                   cat: 'pdf',    url: '/pdf/jpg-para-pdf.html',            desc: 'Une imagens em um arquivo PDF' },
  // Dev
  { id: 'base64',                name: 'Base64 encode / decode',         cat: 'dev',    url: '/dev/base64.html',                  desc: 'Codifique e decodifique em Base64' },
  { id: 'url-encode',            name: 'URL encode / decode',            cat: 'dev',    url: '/dev/url-encode.html',              desc: 'Encode e decode de URLs e query strings' },
  { id: 'json-csv',              name: 'JSON → CSV',                     cat: 'dev',    url: '/dev/json-csv.html',                desc: 'Converta array JSON para planilha CSV' },
  { id: 'timestamp',             name: 'Timestamp converter',            cat: 'dev',    url: '/dev/timestamp.html',               desc: 'Converta timestamps Unix para datas' },
  { id: 'hash-generator',        name: 'Hash generator',                 cat: 'dev',    url: '/dev/hash-generator.html',          desc: 'Gere MD5, SHA-256 e SHA-512 de texto ou arquivo' },
  // Cripto
  { id: 'binario',               name: 'Código Binário',                 cat: 'cripto', url: '/cripto/binario.html',              desc: 'Converta texto em código binário e vice-versa' },
  { id: 'morse',                 name: 'Código Morse',                   cat: 'cripto', url: '/cripto/morse.html',                desc: 'Converta texto em código Morse e vice-versa' },
  { id: 'texto-criptografado',   name: 'Texto Criptografado',            cat: 'cripto', url: '/cripto/texto-criptografado.html',  desc: 'Criptografe e descriptografe texto com chave AES-256' },
  { id: 'qrcode',                name: 'Gerador de QR Code',             cat: 'cripto', url: '/cripto/qrcode.html',               desc: 'Gere QR Codes de qualquer texto ou URL' },
  { id: 'qrcode-wifi',           name: 'QR Code Wi-Fi',                  cat: 'cripto', url: '/cripto/qrcode-wifi.html',          desc: 'Gere QR Code para conectar ao Wi-Fi sem digitar senha' },
  { id: 'qrcode-pix',            name: 'QR Code Pix',                    cat: 'cripto', url: '/cripto/qrcode-pix.html',           desc: 'Gere QR Codes Pix para receber pagamentos' },
  { id: 'leitor-qrcode',         name: 'Leitor de QR Code',              cat: 'cripto', url: '/cripto/leitor-qrcode.html',        desc: 'Leia QR Codes por upload de imagem ou câmera' },
  { id: 'codigo-barras',         name: 'Código de Barras 1D',            cat: 'cripto', url: '/cripto/codigo-barras.html',        desc: 'Gere EAN-13, Code 128, UPC-A e outros formatos' },
  { id: 'codigo-barras-lote',    name: 'Código de Barras em Lote',       cat: 'cripto', url: '/cripto/codigo-barras-lote.html',   desc: 'Gere vários códigos de barras e baixe em ZIP' },
  // Texto (novas)
  { id: 'freq-palavras',         name: 'Frequência de palavras',         cat: 'texto',  url: '/texto/freq-palavras.html',          desc: 'Descubra quais palavras aparecem mais no seu texto' },
  { id: 'lorem-ipsum',           name: 'Gerador de Lorem Ipsum',         cat: 'texto',  url: '/texto/lorem-ipsum.html',            desc: 'Gere texto placeholder para protótipos e layouts' },
  { id: 'remover-acentos',       name: 'Remover acentos',                cat: 'texto',  url: '/texto/remover-acentos.html',        desc: 'Remove acentos e caracteres especiais do texto' },
  { id: 'comparar-textos',       name: 'Comparador de textos',           cat: 'texto',  url: '/texto/comparar-textos.html',        desc: 'Compare dois textos e veja as diferenças destacadas' },
  { id: 'gerador-slug',          name: 'Gerador de slug',                cat: 'texto',  url: '/texto/gerador-slug.html',           desc: 'Converta títulos em slugs limpos para URLs' },
  // Dev (novas)
  { id: 'conversor-cores',       name: 'Conversor de cores',             cat: 'dev',    url: '/dev/conversor-cores.html',          desc: 'Converta cores entre HEX, RGB e HSL' },
  { id: 'gerador-uuid',          name: 'Gerador de UUID',                cat: 'dev',    url: '/dev/gerador-uuid.html',             desc: 'Gere UUIDs v4 únicos e aleatórios' },
  { id: 'regex-tester',          name: 'Testador de Regex',              cat: 'dev',    url: '/dev/regex-tester.html',             desc: 'Teste expressões regulares em tempo real' },
  { id: 'minificador',           name: 'Minificador CSS / JS',           cat: 'dev',    url: '/dev/minificador.html',              desc: 'Minifique CSS e JavaScript, reduza o tamanho do arquivo' },
  { id: 'css-formatter',         name: 'Formatador de CSS',              cat: 'dev',    url: '/dev/css-formatter.html',            desc: 'Formate e embeleze seu CSS ou HTML' },
  // Imagem (novas)
  { id: 'svg-para-png',          name: 'SVG para PNG',                   cat: 'imagem', url: '/imagem/svg-para-png.html',          desc: 'Converta arquivos SVG em PNG com qualquer tamanho' },
  { id: 'paleta-cores',          name: 'Paleta de cores',                cat: 'imagem', url: '/imagem/paleta-cores.html',          desc: 'Extraia as cores dominantes de qualquer imagem' },
  // Calc
  { id: 'calc-porcentagem',      name: 'Calculadora de porcentagem',     cat: 'calc',   url: '/calc/calculadora-porcentagem.html', desc: 'Calcule descontos, aumentos e porcentagens' },
  { id: 'conversor-moedas',      name: 'Conversor de moedas',            cat: 'calc',   url: '/calc/conversor-moedas.html',        desc: 'Converta moedas com câmbio atualizado em tempo real' },
  { id: 'calc-imc',              name: 'Calculadora de IMC',             cat: 'calc',   url: '/calc/calculadora-imc.html',         desc: 'Calcule seu IMC e veja a classificação da OMS' },
  { id: 'gerador-cpf-cnpj',      name: 'Gerador de CPF / CNPJ',         cat: 'calc',   url: '/calc/gerador-cpf-cnpj.html',        desc: 'Gere CPF e CNPJ válidos para testes de desenvolvimento' },
  { id: 'validador-cpf-cnpj',    name: 'Validador de CPF / CNPJ',       cat: 'calc',   url: '/calc/validador-cpf-cnpj.html',      desc: 'Valide CPF e CNPJ em tempo real' },
  { id: 'juros-compostos',       name: 'Juros compostos',                cat: 'calc',   url: '/calc/juros-compostos.html',         desc: 'Simule rendimentos com juros compostos e aportes mensais' },
  { id: 'conversor-unidades',    name: 'Conversor de unidades',          cat: 'calc',   url: '/calc/conversor-unidades.html',      desc: 'Converta comprimento, peso, temperatura, área e volume' },
];

const CAT_LABELS = { texto: 'Texto', imagem: 'Imagem', pdf: 'PDF', dev: 'Dev', cripto: 'Cripto', calc: 'Calc' };
const CAT_CLASSES = { texto: 'tc', imagem: 'ic', pdf: 'pc', dev: 'dc', cripto: 'cc', calc: 'dc' };

// ---- FAVORITOS ----
const FAV_KEY  = 'cd_favorites';
const HIST_KEY = 'cd_history';

function getFavorites() {
  try { return JSON.parse(localStorage.getItem(FAV_KEY) || '[]'); } catch { return []; }
}
function saveFavorites(arr) {
  try { localStorage.setItem(FAV_KEY, JSON.stringify(arr)); } catch {}
}
function isFavorite(id) { return getFavorites().includes(id); }
function toggleFavorite(id) {
  const favs = getFavorites();
  const idx = favs.indexOf(id);
  if (idx >= 0) favs.splice(idx, 1);
  else favs.push(id);
  saveFavorites(favs);
  return favs.includes(id);
}

// ---- HISTÓRICO ----
function markUsed(id) {
  const tool = TOOLS.find(t => t.id === id);
  if (!tool) return;
  try {
    const hist = JSON.parse(localStorage.getItem(HIST_KEY) || '[]');
    const filtered = hist.filter(x => x.id !== id);
    filtered.unshift({ id, name: tool.name, url: tool.url, ts: Date.now() });
    localStorage.setItem(HIST_KEY, JSON.stringify(filtered.slice(0, 8)));
  } catch {}
}
function getHistory() {
  try { return JSON.parse(localStorage.getItem(HIST_KEY) || '[]'); } catch { return []; }
}

// ---- BOTÕES DE FAVORITO ----
function initFavButtons() {
  document.querySelectorAll('.fav-btn').forEach(btn => {
    const id = btn.dataset.tool;
    if (!id) return;
    btn.classList.toggle('active', isFavorite(id));
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const active = toggleFavorite(id);
      btn.classList.toggle('active', active);
      btn.style.transform = 'scale(1.35)';
      setTimeout(() => { btn.style.transform = ''; }, 180);
    });
  });
}

// ---- BUSCA ----
function buildDropdown(matches) {
  return matches.map(t => `
    <a href="${t.url}" class="search-result-item">
      <span class="search-result-cat">${CAT_LABELS[t.cat]}</span>
      ${t.name}
    </a>
  `).join('');
}

function initSearch(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;

  let dropdown = null;

  function show(query) {
    if (!query || query.length < 2) { hide(); return; }
    const q = query.toLowerCase();
    const matches = TOOLS.filter(t =>
      t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
    ).slice(0, 7);

    if (!matches.length) { hide(); return; }

    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.className = 'search-dropdown';
      input.parentNode.style.position = 'relative';
      input.parentNode.appendChild(dropdown);
    }
    dropdown.innerHTML = buildDropdown(matches);
    dropdown.style.display = 'block';
  }
  function hide() {
    if (dropdown) dropdown.style.display = 'none';
  }

  input.addEventListener('input', e => show(e.target.value));
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = input.value.toLowerCase();
      const m = TOOLS.find(t => t.name.toLowerCase().includes(q));
      if (m) window.location.href = m.url;
    }
    if (e.key === 'Escape') hide();
  });
  document.addEventListener('click', e => {
    if (!input.parentNode.contains(e.target)) hide();
  });
}

// ---- COPIAR ----
function initCopyBtn(btnId, sourceId) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.addEventListener('click', () => {
    const src = document.getElementById(sourceId);
    const text = src ? (src.value || src.textContent) : '';
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = 'Copiado!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'Copiar'; btn.classList.remove('copied'); }, 1600);
    });
  });
}

// ---- FILE DROP ----
function initDropArea(dropId, inputId, onFiles) {
  const drop = document.getElementById(dropId);
  const input = document.getElementById(inputId);
  if (!drop || !input) return;

  drop.addEventListener('click', () => input.click());
  input.addEventListener('change', () => { if (input.files.length) onFiles(Array.from(input.files)); });

  drop.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('dragover'); });
  drop.addEventListener('dragleave', () => drop.classList.remove('dragover'));
  drop.addEventListener('drop', e => {
    e.preventDefault();
    drop.classList.remove('dragover');
    if (e.dataTransfer.files.length) onFiles(Array.from(e.dataTransfer.files));
  });
}

// ---- FORMAT FILE SIZE ----
function fmtSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

// ---- DOWNLOAD FILE ----
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

// ---- DARK MODE ----
const THEME_KEY = 'cd_theme';

const ICON_MOON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
const ICON_SUN  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

function getTheme() {
  return localStorage.getItem(THEME_KEY) || 'light';
}
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.innerHTML = theme === 'dark' ? ICON_SUN : ICON_MOON;
    btn.title = theme === 'dark' ? 'Modo claro' : 'Modo escuro';
  }
}
function toggleTheme() {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}
function initThemeToggle() {
  const headerInner = document.querySelector('.header-inner');
  if (!headerInner) return;
  const btn = document.createElement('button');
  btn.id = 'theme-toggle';
  btn.className = 'theme-toggle-btn';
  btn.addEventListener('click', toggleTheme);
  headerInner.appendChild(btn);
  applyTheme(getTheme());
}

// ---- LOGO IMAGE ----
function initLogo() {
  // Detecta base pelo link do próprio logo (mais confiável que nav links)
  const logoLink = document.querySelector('a.logo');
  const logoHref = logoLink ? logoLink.getAttribute('href') : '';
  const base = logoHref.startsWith('../') ? '../' : '';

  // Header logo: substitui SVG + esconde texto duplicado quando imagem carregar
  document.querySelectorAll('.logo .logo-icon').forEach(icon => {
    const logoLink = icon.closest('.logo');
    const img = document.createElement('img');
    img.src = base + 'assets/img/logo.png';
    img.alt = 'Canivete Digital';
    img.className = 'logo-img';
    img.onload = () => {
      icon.style.display = 'none';
      // Esconde o nó de texto "Canivete Digital" (o logo já tem o nome embutido)
      logoLink.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) node.textContent = '';
      });
    };
    img.onerror = () => img.remove();
    icon.after(img);
  });

  // Footer logo: mesma lógica
  document.querySelectorAll('.footer-logo').forEach(footerLink => {
    const svg = footerLink.querySelector('svg');
    if (!svg) return;
    const img = document.createElement('img');
    img.src = base + 'assets/img/logo.png';
    img.alt = 'Canivete Digital';
    img.className = 'footer-logo-img';
    img.onload = () => {
      svg.style.display = 'none';
      footerLink.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) node.textContent = '';
      });
    };
    img.onerror = () => img.remove();
    svg.after(img);
  });
}

// ---- NAV DROPDOWNS ----
const NAV_CATS = [
  { label: 'Texto',  id: 'texto'  },
  { label: 'Imagem', id: 'imagem' },
  { label: 'PDF',    id: 'pdf'    },
  { label: 'Dev',    id: 'dev'    },
  { label: 'Cripto', id: 'cripto' },
  { label: 'Calc',   id: 'calc'   },
];

function buildNavDropdowns() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  // Detect base path: if any nav link starts with '../' we're inside a subdir
  const navLinks = Array.from(nav.querySelectorAll('a'));
  const inSubdir = navLinks.some(a => a.getAttribute('href').startsWith('../'));
  const base = inSubdir ? '../' : '';

  // Reorder nav links alphabetically
  const sorted = [...navLinks].sort((a, b) =>
    a.textContent.trim().localeCompare(b.textContent.trim(), 'pt-BR')
  );
  sorted.forEach(a => nav.appendChild(a));

  navLinks.forEach(a => {
    const catInfo = NAV_CATS.find(c => a.textContent.trim() === c.label);
    if (!catInfo) return;

    const tools = TOOLS.filter(t => t.cat === catInfo.id);
    if (!tools.length) return;

    // Wrap the <a> in a .nav-item div
    const wrapper = document.createElement('div');
    wrapper.className = 'nav-item';
    a.parentNode.insertBefore(wrapper, a);
    wrapper.appendChild(a);

    // Add caret to link
    const caret = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    caret.setAttribute('class', 'nav-caret');
    caret.setAttribute('viewBox', '0 0 24 24');
    caret.setAttribute('fill', 'none');
    caret.setAttribute('stroke', 'currentColor');
    caret.setAttribute('stroke-width', '2.5');
    caret.setAttribute('stroke-linecap', 'round');
    caret.innerHTML = '<polyline points="6 9 12 15 18 9"/>';
    a.appendChild(caret);

    // Build dropdown
    const dd = document.createElement('div');
    dd.className = 'nav-dropdown';

    const header = document.createElement('div');
    header.className = 'nav-dd-header';
    header.textContent = catInfo.label;
    dd.appendChild(header);

    tools.forEach(tool => {
      const link = document.createElement('a');
      link.className = 'nav-dd-item';
      link.href = base + tool.url.slice(1); // remove leading /
      link.textContent = tool.name;
      dd.appendChild(link);
    });

    wrapper.appendChild(dd);
  });
}

// ---- SCHEMA.ORG JSON-LD ----
function injectSchema() {
  const canonical = document.querySelector('link[rel="canonical"]');
  const pageUrl = canonical ? canonical.getAttribute('href') : window.location.href;
  const toolId = document.body.dataset.toolId;

  let schema;

  if (toolId) {
    // Página de ferramenta: WebApplication
    const tool = TOOLS.find(t => t.id === toolId);
    const name = tool ? tool.name : document.title.split('—')[0].trim();
    const desc = tool ? tool.desc : (document.querySelector('meta[name="description"]') || {}).content || '';

    schema = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': name,
      'description': desc,
      'url': pageUrl,
      'applicationCategory': 'UtilitiesApplication',
      'operatingSystem': 'Web',
      'browserRequirements': 'Requires JavaScript. Requires HTML5.',
      'inLanguage': 'pt-BR',
      'isAccessibleForFree': true,
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'BRL'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Canivete Digital',
        'url': 'https://canivetedg.com.br'
      }
    };
  } else {
    // Homepage: WebSite com SearchAction
    schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Canivete Digital',
      'url': 'https://canivetedg.com.br/',
      'description': 'Ferramentas online gratuitas para texto, imagem, PDF e dev. Sem cadastro.',
      'inLanguage': 'pt-BR',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://canivetedg.com.br/?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    };
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

// ---- FOOTER ----
function buildFooter() {
  const footer = document.querySelector('footer');
  if (!footer) return;

  // Detect base path from logo link
  const logoLink = document.querySelector('a.logo, .footer-logo');
  const logoHref = logoLink ? logoLink.getAttribute('href') : '';
  const base = logoHref.includes('../') ? '../' : '';

  // Rebuild tool columns with complete listings
  const footerGrid = footer.querySelector('.footer-grid');
  if (footerGrid) {
    footerGrid.querySelectorAll('.footer-col').forEach(c => c.remove());

    const catGroups = [
      { label: 'Texto',        cats: ['texto'],           first: 'texto/contador-caracteres.html'       },
      { label: 'Imagem & PDF', cats: ['imagem', 'pdf'],   first: 'imagem/comprimir-imagem.html'         },
      { label: 'Dev & Cripto', cats: ['dev', 'cripto'],   first: 'dev/base64.html'                      },
      { label: 'Calc',         cats: ['calc'],             first: 'calc/calculadora-porcentagem.html'    },
    ];

    catGroups.forEach(group => {
      const col = document.createElement('div');
      col.className = 'footer-col';
      col.innerHTML = `<h4>${group.label}</h4>`;
      const tools = group.cats.flatMap(catId => TOOLS.filter(t => t.cat === catId));
      const shown = tools.slice(0, 6);
      shown.forEach(tool => {
        const a = document.createElement('a');
        a.href = base + tool.url.slice(1);
        a.textContent = tool.name;
        col.appendChild(a);
      });
      if (tools.length > 6) {
        const more = document.createElement('a');
        more.href = base + group.first;
        more.textContent = `+ ${tools.length - 6} mais…`;
        more.className = 'footer-more';
        col.appendChild(more);
      }
      footerGrid.appendChild(col);
    });
  }

  // Replace footer-sobre with accordion
  const sobreEl = footer.querySelector('.footer-sobre');
  if (!sobreEl) return;

  sobreEl.className = 'footer-accordion';
  sobreEl.innerHTML = `
    <details>
      <summary>Sobre o Site</summary>
      <p>O Canivete Digital reúne ferramentas gratuitas para uso no dia a dia: texto, imagem, PDF, desenvolvimento e codificação. Tudo direto no browser, sem instalar nada e sem precisar criar conta.</p>
    </details>
    <details>
      <summary>Privacidade</summary>
      <p>Não coletamos dados pessoais. Tudo o que você processa aqui fica no seu próprio dispositivo. Não há rastreamento, não há venda de informações e nenhum dado é enviado para servidores externos.</p>
    </details>
    <details>
      <summary>Termos de Uso</summary>
      <p>As ferramentas são oferecidas no estado em que se encontram, sem garantia de exatidão. O uso é de inteira responsabilidade do usuário. Para dúvidas ou sugestões, entre em contato pelo e-mail do site.</p>
    </details>
    <details>
      <summary>Contato</summary>
      <p>Para dúvidas, sugestões ou parcerias: <a href="mailto:sjs@sjsproject.com.br">sjs@sjsproject.com.br</a></p>
    </details>
  `;
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initLogo();
  buildNavDropdowns();
  buildFooter();
  injectSchema();
  initFavButtons();
  initSearch('header-search');
  initSearch('hero-search');

  // Marcar última ferramenta usada
  const toolId = document.body.dataset.toolId;
  if (toolId) markUsed(toolId);

  // Renderizar "Ferramentas recentes" se existir o container
  const recentWrap = document.getElementById('recent-tools');
  if (recentWrap) {
    const hist = getHistory();
    if (hist.length) {
      recentWrap.innerHTML = hist.map(h => `
        <a href="${h.url}" class="related-link">
          <span class="r-icon" style="background:#F1F5F9">
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </span>
          ${h.name}
        </a>
      `).join('');
    } else {
      document.getElementById('recent-wrap') && (document.getElementById('recent-wrap').style.display = 'none');
    }
  }
});

// ---- HAMBURGUER MENU ----
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.querySelector('header nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    nav.classList.toggle('open');
    const isOpen = nav.classList.contains('open');
    toggle.innerHTML = isOpen
      ? '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 18L18 6M6 6l12 12"/></svg>'
      : '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg>';
  });

  document.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.innerHTML = '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg>';
  });
});
