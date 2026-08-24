# Canivete Digital — Documentação Técnica Completa

> Documento para onboarding de IA/desenvolvedor. Contém tudo sobre a estrutura, configurações e decisões técnicas do projeto.

---

## 1. Visão Geral

**Nome:** Canivete Digital  
**URL produção:** https://canivetedg.com.br  
**Repositório GitHub:** https://github.com/snchacal/canivete-digital-  
**Branch principal:** `main`  
**Tipo:** Site estático (HTML + CSS + JS puro — sem framework, sem build step)  
**Hospedagem:** GitHub Pages  
**Domínio customizado:** canivetedg.com.br (arquivo `CNAME` na raiz)  
**HTTPS:** Ativado e enforçado pelo GitHub Pages  
**Monetização:** Google AdSense — publisher ID `ca-pub-3847950831860295` (conta em aprovação)  
**Contato:** sjs@sjsproject.com.br  

---

## 2. Estrutura de Pastas

```
/ (raiz)
├── index.html                  ← Homepage principal
├── sobre.html                  ← Página institucional "Sobre"
├── politica-privacidade.html   ← Política de privacidade (obrigatória para AdSense)
├── ads.txt                     ← Google AdSense ads.txt
├── robots.txt                  ← Permite tudo; aponta para sitemap
├── sitemap.xml                 ← Sitemap completo para SEO
├── CNAME                       ← "canivetedg.com.br" (GitHub Pages custom domain)
├── assets/
│   ├── css/
│   │   └── style.css           ← Único arquivo de estilos (sem preprocessador)
│   ├── js/
│   │   └── app.js              ← Único arquivo JS global (carregado em todas as páginas)
│   └── img/
│       ├── logo.png
│       └── Favicon.png
├── texto/                      ← 11 ferramentas de texto
├── imagem/                     ← 7 ferramentas de imagem
├── pdf/                        ← 5 ferramentas de PDF
├── dev/                        ← 10 ferramentas de desenvolvimento
├── cripto/                     ← 9 ferramentas de criptografia/codificação
└── calc/                       ← 7 ferramentas de calculadora/utilitários
```

---

## 3. Lista Completa de Ferramentas (50 páginas HTML)

### Texto (11)
| Arquivo | Ferramenta |
|---|---|
| texto/contador-caracteres.html | Contador de caracteres |
| texto/converter-maiusculas.html | Converter maiúsculas/minúsculas |
| texto/remover-espacos.html | Remover espaços extras |
| texto/gerador-senha.html | Gerador de senha |
| texto/json-formatter.html | JSON Formatter |
| texto/ordenar-texto.html | Ordenar texto |
| texto/freq-palavras.html | Frequência de palavras |
| texto/lorem-ipsum.html | Gerador de Lorem Ipsum |
| texto/remover-acentos.html | Remover acentos |
| texto/comparar-textos.html | Comparador de textos |
| texto/gerador-slug.html | Gerador de slug |

### Imagem (7)
| Arquivo | Ferramenta |
|---|---|
| imagem/comprimir-imagem.html | Comprimir imagem |
| imagem/converter-jpg-png.html | Converter JPG / PNG |
| imagem/redimensionar-imagem.html | Redimensionar imagem |
| imagem/cortar-imagem.html | Cortar imagem |
| imagem/converter-webp.html | WebP converter |
| imagem/svg-para-png.html | SVG para PNG |
| imagem/paleta-cores.html | Paleta de cores |

### PDF (5)
| Arquivo | Ferramenta |
|---|---|
| pdf/juntar-pdf.html | Juntar PDF |
| pdf/dividir-pdf.html | Dividir PDF |
| pdf/comprimir-pdf.html | Comprimir PDF |
| pdf/pdf-para-jpg.html | PDF para JPG |
| pdf/jpg-para-pdf.html | JPG para PDF |

### Dev (10)
| Arquivo | Ferramenta |
|---|---|
| dev/base64.html | Base64 encode / decode |
| dev/url-encode.html | URL encode / decode |
| dev/json-csv.html | JSON → CSV |
| dev/timestamp.html | Timestamp converter |
| dev/hash-generator.html | Hash generator (MD5, SHA-256, SHA-512) |
| dev/conversor-cores.html | Conversor de cores (HEX/RGB/HSL) |
| dev/gerador-uuid.html | Gerador de UUID v4 |
| dev/regex-tester.html | Testador de Regex |
| dev/minificador.html | Minificador CSS / JS |
| dev/css-formatter.html | Formatador de CSS |

### Cripto (9)
| Arquivo | Ferramenta |
|---|---|
| cripto/binario.html | Código Binário |
| cripto/morse.html | Código Morse |
| cripto/texto-criptografado.html | Texto Criptografado (AES-256) |
| cripto/qrcode.html | Gerador de QR Code |
| cripto/qrcode-wifi.html | QR Code Wi-Fi |
| cripto/qrcode-pix.html | QR Code Pix |
| cripto/leitor-qrcode.html | Leitor de QR Code |
| cripto/codigo-barras.html | Código de Barras 1D |
| cripto/codigo-barras-lote.html | Código de Barras em Lote |

### Calc (7)
| Arquivo | Ferramenta |
|---|---|
| calc/calculadora-porcentagem.html | Calculadora de porcentagem |
| calc/conversor-moedas.html | Conversor de moedas |
| calc/calculadora-imc.html | Calculadora de IMC |
| calc/gerador-cpf-cnpj.html | Gerador de CPF / CNPJ |
| calc/validador-cpf-cnpj.html | Validador de CPF / CNPJ |
| calc/juros-compostos.html | Juros compostos |
| calc/conversor-unidades.html | Conversor de unidades |

---

## 4. Arquitetura Técnica

### Stack
- **HTML5** semântico, sem template engine
- **CSS3** puro — um arquivo global (`assets/css/style.css`)
- **JavaScript** vanilla (ES6+) — um arquivo global (`assets/js/app.js`)
- **Sem build tool** (sem webpack, vite, gulp, etc.)
- **Sem framework JS** (sem React, Vue, Angular)
- **Sem backend** — 100% client-side

### Bibliotecas externas (CDN, por página onde necessário)
- `three.js r128` — animação de partículas no hero da homepage
- `pdf-lib` — operações de PDF (juntar, dividir, comprimir)
- `JSZip` — export em ZIP (código de barras em lote)
- `JsBarcode` — geração de código de barras
- `QRCode.js` — geração de QR Code
- `CryptoJS` — criptografia AES-256 e hashes

### app.js — funções principais
```
TOOLS[]         → array com todas as 50 ferramentas (id, name, cat, url, desc)
CAT_LABELS{}    → rótulos das categorias
initThemeToggle()     → tema claro/escuro (localStorage: 'cd_theme')
initLogo()            → detecta se está em subpasta e ajusta href do logo
buildNavDropdowns()   → constrói dropdowns no nav + lógica de abrir no clique
injectMobileRelated() → injeta links de ferramentas relacionadas no mobile
buildFooter()         → reconstrói colunas do footer dinamicamente + acordeão
injectSchema()        → injeta JSON-LD structured data para SEO
```

### Tema claro/escuro
- Toggle no header (ícone ☀/🌙)
- Aplicado via `data-theme="dark"` no `<html>`
- Persistido em `localStorage` com chave `cd_theme`
- Cores via variáveis CSS (`--primary`, `--bg`, `--card-bg`, `--text`, etc.)

### Favoritos e histórico
- Favoritos: `localStorage['cd_favorites']` — array de tool IDs
- Histórico recente: `localStorage['cd_history']` — array de tool IDs (últimas 5)
- Exibidos na sidebar direita de cada ferramenta ("Usadas recentemente")

---

## 5. Padrão de Cada Página de Ferramenta

### Estrutura HTML obrigatória
```html
<body data-tool-id="[id-da-ferramenta]">   ← ID usado pelo app.js
<header>...</header>

<div class="container">
  <div class="tool-page">

    <div class="tool-main">
      <div class="breadcrumb">...</div>
      <div class="tool-header tc|ic|pc|dc|cc">  ← classe define cor da categoria
        <div class="cat-badge cat-badge-c">...</div>
        <h1>Nome da Ferramenta</h1>
        <p>Descrição curta</p>
      </div>
      <div class="tool-box">
        <!-- inputs, botões, outputs da ferramenta -->
      </div>
      <div class="howto">
        <h2>Como usar</h2>
        <ol>...</ol>
      </div>
      <div class="howto">
        <h2>Dicas de uso</h2>
        <p>...</p>
        <ul>...</ul>
        <p class="tip-next">💡 <strong>Próximo passo:</strong> <a href="...">...</a></p>
      </div>
    </div>

    <aside class="tool-sidebar">
      <!-- sidebar-widget com links relacionados -->
      <!-- sidebar-widget com id="recent-wrap" para histórico recente -->
    </aside>

  </div>
</div>

<footer>...</footer>
<script src="../assets/js/app.js"></script>
<!-- script inline da ferramenta aqui -->
```

### Classes de categoria (cores)
| Categoria | Classe body/card | Cor principal |
|---|---|---|
| Texto | `tc` | Azul (#2563EB) |
| Imagem | `ic` | Verde (#059669) |
| PDF | `pc` | Vermelho (#DC2626) |
| Dev | `dc` | Roxo (#7C3AED) |
| Cripto | `cc` | Laranja (#D97706) |
| Calc | `dc` | Roxo (#7C3AED) — mesma que Dev |

---

## 6. Configurações de Hospedagem

### GitHub Pages
- **Repositório:** `snchacal/canivete-digital-` (público)
- **Branch de deploy:** `main` (raiz `/`)
- **URL padrão GitHub:** snchacal.github.io (redirecionada pelo CNAME)
- **Domínio customizado:** `canivetedg.com.br` (arquivo `CNAME` na raiz)
- **DNS check:** ✅ Verificado
- **Enforce HTTPS:** ✅ Ativado

### DNS (configurado no provedor de domínio)
Para GitHub Pages com domínio apex (`canivetedg.com.br` sem www), os registros A devem apontar para:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```
E CNAME `www` → `snchacal.github.io`

---

## 7. SEO

### Meta tags (em todas as páginas)
- `<title>` único por página
- `<meta name="description">` único por página
- `<link rel="canonical">` absoluto com https://canivetedg.com.br/...
- Open Graph (og:title, og:description, og:type, og:url, og:image)
- Twitter Card (summary)
- `<meta name="robots" content="index, follow">`

### Structured Data (JSON-LD)
Injetado via `injectSchema()` em `app.js` em páginas de ferramentas:
- Tipo: `WebApplication`
- Campos: name, description, url, applicationCategory, operatingSystem, offers

### Sitemap
- Arquivo: `sitemap.xml` na raiz
- Referenciado em `robots.txt`

### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://canivetedg.com.br/sitemap.xml
```
> ⚠️ Atenção: o `robots.txt` atual ainda tem a URL antiga `canivetedigital.com.br` no sitemap — precisa corrigir para `canivetedg.com.br`.

---

## 8. Google AdSense

- **Publisher ID:** `ca-pub-3847950831860295`
- **Status:** Em revisão ("Conteúdo de baixo valor" — revisão pendente após adicionar páginas institucionais)
- **ads.txt:** ✅ Presente na raiz — `google.com, pub-3847950831860295, DIRECT, f08c47fec0942fa0`
- **Script AdSense:** presente no `<head>` de todas as páginas
- **Modo:** Auto Ads (Google escolhe os posicionamentos automaticamente)
- **Placeholders removidos:** Todos os divs placeholder de anúncio foram removidos do HTML

---

## 9. Funcionalidades de UX

### Navigation
- Menu desktop com dropdowns por categoria
- Dropdowns abrem no **clique** (não hover) e fecham ao clicar fora
- Dropdowns ordenados **alfabeticamente** por nome de ferramenta
- Nav links ordenados alfabeticamente (Calc, Cripto, Dev, Imagem, PDF, Texto)
- Menu hamburger no mobile (≤768px)

### Mobile
- Widget "Outras ferramentas de [categoria]" injetado abaixo da `.tool-box` em mobile
- Pills de navegação rápida para ferramentas da mesma categoria
- Dropdowns do nav mobile expandem inline (position: static)

### Hero (homepage)
- Animação Three.js de pontos em onda (`#hero-dots`) — biblioteca carregada via CDN só na homepage
- Barra de busca que filtra ferramentas em tempo real
- Tags de acesso rápido às ferramentas mais populares

### Busca
- Duas barras: header (todas as páginas) e hero (homepage)
- Filtro em tempo real no array TOOLS por nome e descrição
- Resultados aparecem em dropdown autocomplete

### Sidebar
- "Usadas recentemente" — últimas 5 ferramentas visitadas (localStorage)
- Links de ferramentas relacionadas da mesma categoria

### Footer
- Colunas de ferramentas geradas dinamicamente pelo `buildFooter()`
- Máximo 6 links por coluna + link "X mais…" para overflow
- Acordeão com Sobre, Privacidade, Termos, Contato
- Links "Sobre · Privacidade" no rodapé inferior de todas as páginas

---

## 10. Pendências / Coisas a Verificar

1. **robots.txt** — URL do sitemap ainda aponta para `canivetedigital.com.br` — corrigir para `canivetedg.com.br`
2. **AdSense** — aguardando nova revisão do Google após adição das páginas institucionais
3. **Páginas antigas sem howto** — as 31 ferramentas originais ainda não têm seções `.howto` detalhadas (só as 19 novas têm)
4. **Nav das páginas antigas** — algumas páginas mais antigas não têm o link `Calc` no nav (o `buildNavDropdowns()` trata isso, mas o HTML estático não tem)
5. **sitemap.xml** — verificar se todas as 52 páginas estão listadas

---

## 11. Git / Deploy

```bash
# Fluxo padrão de deploy
cd "F:\Claude\Ferramentas Online"
git add .
git commit -m "descrição"
git push origin main
# GitHub Pages faz o deploy automaticamente em ~1-2 minutos
```

**Problema recorrente:** arquivo `.git/HEAD.lock` fica travado quando o sandbox edita arquivos. Solução:
```powershell
Remove-Item "F:\Claude\Ferramentas Online\.git\HEAD.lock" -Force
```

**GC desabilitado** (para evitar prompts de confirmação durante push):
```bash
git config --global gc.auto 0
```
