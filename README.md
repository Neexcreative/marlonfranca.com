# marlonfranca.com

Portfólio pessoal de Marlon França, Multidisciplinary Digital Designer em Dublin.

- **Site:** https://www.marlonfranca.com
- **Repositório:** https://github.com/Neexcreative/marlonfranca.com
- **Hospedagem:** Vercel (deploy automático a cada push no `main`)
- **DNS:** Cloudflare

Guias complementares: [DEPLOY.md](DEPLOY.md) (git e Vercel) · [SEO.md](SEO.md) (Google, Search Console, Analytics) · [public/projects/README.md](public/projects/README.md) (exportar vídeos e imagens).

---

## Índice

1. [Stack](#1-stack)
2. [Correr localmente](#2-correr-localmente)
3. [Estrutura de pastas](#3-estrutura-de-pastas)
4. [Editar conteúdo](#4-editar-conteúdo)
5. [Projetos e galeria](#5-projetos-e-galeria)
6. [Tamanhos das imagens](#6-tamanhos-das-imagens)
7. [Faixa de logos (Tools)](#7-faixa-de-logos-tools)
8. [CV](#8-cv)
9. [Cores, fonte e modo claro/escuro](#9-cores-fonte-e-modo-claroescuro)
10. [SEO, ícones e partilha](#10-seo-ícones-e-partilha)
11. [Publicar](#11-publicar)
12. [Variáveis de ambiente](#12-variáveis-de-ambiente)
13. [Problemas conhecidos](#13-problemas-conhecidos)
14. [Checklist de conteúdo pendente](#14-checklist-de-conteúdo-pendente)

---

## 1. Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, Cache Components) |
| Linguagem | TypeScript |
| Estilos | Tailwind CSS 4 (configurado em CSS, sem `tailwind.config`) |
| Animações | Framer Motion |
| Fonte | Inter Tight (Google Fonts via `next/font`) |
| Analytics | Google Analytics 4 via `@next/third-parties` (opcional) |

> O Next.js 16 tem mudanças grandes em relação a versões antigas. A documentação da versão instalada está em `node_modules/next/dist/docs/`.

---

## 2. Correr localmente

Requisitos: Node.js 20+ e npm. Terminal: PowerShell, **um comando de cada vez** (nunca `&&`).

Na pasta `marlon-franca` (onde está o `package.json`):

```powershell
npm install
```
```powershell
npm run dev
```

Abre http://localhost:3000. As alterações aparecem sozinhas ao guardar.

Outros comandos:

| Comando | O que faz |
|---|---|
| `npm run build` | Build de produção (corre antes de publicar para apanhar erros) |
| `npm run start` | Serve a build de produção localmente |
| `npm run lint` | Verifica o código |

---

## 3. Estrutura de pastas

```
marlon-franca/
├── public/
│   ├── cv/marlon-franca-cv.pdf      ← CV para download
│   ├── icons/                       ← ícones PNG (16 a 512) e maskable
│   ├── images/portrait.jpg          ← foto do About
│   ├── logos/                       ← SVGs da faixa de ferramentas
│   └── projects/<slug>/             ← imagens e vídeos de cada projeto
├── src/
│   ├── app/
│   │   ├── layout.tsx               ← fonte, metadata global, script do tema, GA
│   │   ├── page.tsx                 ← Home (hero + projetos + logos)
│   │   ├── about/page.tsx           ← About, Experience, CV, Contact
│   │   ├── globals.css              ← cores (claro e escuro)
│   │   ├── sitemap.ts · robots.ts · manifest.ts
│   │   ├── llms.txt/ · llms-full.txt/  ← resumo para IAs
│   │   ├── opengraph-image.tsx      ← imagem de partilha gerada
│   │   ├── favicon.ico · icon.svg · apple-icon.png
│   │   └── not-found.tsx            ← página 404
│   ├── components/
│   │   ├── Navbar.tsx · Footer.tsx · ThemeToggle.tsx
│   │   ├── ProjectCard.tsx · ProjectModal.tsx   ← cards e popup dos projetos
│   │   ├── CVModal.tsx · useModal.ts            ← popup do CV e comportamento dos popups
│   │   ├── Media.tsx · LoopVideo.tsx            ← imagem/vídeo/placeholder
│   │   └── sections/  HeroSection · ProjectsGrid · ToolsMarquee · CVPreview · ContactSection
│   ├── data/
│   │   ├── site.ts                  ← nome, email, redes, keywords
│   │   ├── projects.ts              ← os 8 projetos
│   │   └── cv.ts                    ← conteúdo do CV
│   └── lib/                         ← JSON-LD (structured-data.ts) e llms.ts
├── vercel.json                      ← fixa o preset Next.js na Vercel
├── DEPLOY.md · SEO.md
└── .env.example
```

---

## 4. Editar conteúdo

Quase todo o texto vem de 3 ficheiros em `src/data/`. Mudar aqui atualiza o site, o SEO, o JSON-LD e o `llms.txt` ao mesmo tempo.

### `src/data/site.ts`
- `name`, `jobTitle`, `description` (meta description, ~155 caracteres)
- `email`: contacto público (`contact@marlonfranca.com`)
- `socials`: Instagram, LinkedIn e Behance (links completos)
- `keywords`: palavras-chave de SEO
- `updated`: data da última atualização. **Mude sempre que publicar trabalho novo** (vai para o sitemap)

### Textos das páginas
| O quê | Onde |
|---|---|
| Hero da Home (frase de apresentação) | `src/components/sections/HeroSection.tsx` |
| Bio, áreas principais (tags) e Experience | `src/app/about/page.tsx` (`coreAreas`, `experience`) |
| Contact | `src/components/sections/ContactSection.tsx` |
| Footer | `src/components/Footer.tsx` |

### Foto do About
Substitua `public/images/portrait.jpg` **mantendo o mesmo nome**. Vertical 4:5, ~1200 × 1500 px, menos de 500 KB.

> Regra de estilo do site: **não usar travessões (—)** nos textos.

---

## 5. Projetos e galeria

Os projetos estão em `src/data/projects.ts`. A Home é uma grelha **bento fixa de 8 posições**, e a **ordem no array define a posição**:

```
┌──────────── 1 ────────────┬──── 2 ────┐
├──── 3 ─────┬──── 4 ───────┼──── 5 ────┤
├── 6 ──┬── 7 ──┬── 8 ──────┤  (alto)   │
└───────┴───────┴───────────┴───────────┘
1 Brand Strategy & Design   2 Websites & Landing Pages
3 Photo & Video Production  4 Large Print
5 3D Design (alto)          6, 7, 8 Multimedia Design
```

Cada projeto:

```ts
{
  slug: "halden-coffee",            // nome da pasta em public/projects/
  title: "Halden Coffee",
  client: "Halden Coffee Co.",
  year: 2026,
  category: "Brand Strategy & Design",
  services: ["Brand Strategy", "Visual Identity"],
  summary: "Briefing curto, máximo 2 linhas no card.",
  description: ["Parágrafo 1 do popup", "Parágrafo 2"],
  tone: "#d8cfc0",                  // cor dos placeholders da galeria
  cover: "/projects/halden-coffee/cover.mp4",   // imagem ou vídeo (card + capa do popup)
  poster: "/projects/halden-coffee/cover.jpg",  // 1.º frame do vídeo
  images: ["/projects/halden-coffee/01.jpg", "/projects/halden-coffee/02.mp4"],
}
```

- **Vídeos 3D:** `.mp4` ou `.webm` em `cover` ou `images` tocam em loop, sem som, só quando estão visíveis, e ficam parados para quem pede menos movimento no sistema.
- **Sem `cover`:** o card fica preto. **Sem `images`:** a galeria mostra placeholders.
- **Trocar uma imagem:** use **sempre um nome de ficheiro novo** (ex.: `cover-v2.jpg`) e atualize o caminho em `projects.ts`. Com o mesmo nome, o Next.js, a Vercel e o navegador continuam a mostrar a versão antiga em cache, às vezes só no desktop ou só no mobile.
- **Galeria do popup:** segue o padrão 2 meias (4:5), 1 inteira (16:9), 2 meias…
- Como exportar vídeos (ffmpeg, peso, codec): [public/projects/README.md](public/projects/README.md).

---

## 6. Tamanhos das imagens

Todas as imagens usam `object-cover`: preenchem o espaço e cortam nas bordas. **Mantenha o assunto no centro.**

### Cards da Home (desktop, largura máxima 1440 px · espaço 12 px · cantos 16 px)

| Card | 1× | Exportar @2× |
|---|---|---|
| 1 · Brand (largo) | 956 × 240 | **1912 × 480** |
| 2, 3, 4 | 472 × 240 | **944 × 480** |
| 5 · 3D (alto) | 472 × 492 | **944 × 984** |
| 6, 7, 8 | 310,67 × 240 | **622 × 480** |

No tablet a grelha passa a 2 colunas e no mobile a 1 coluna, com todos os cards em ~1.1:1. Template Illustrator: `Website/templates/home-bento-template.svg` (fora do repositório).

### Popup do projeto

| Onde | Proporção | Exportar |
|---|---|---|
| Capa | 2:1 desktop, 16:10 mobile | **2560 × 1280** (essencial nos 2048 × 1280 centrais) |
| Galeria, meia largura | 4:5 | **1200 × 1500** |
| Galeria, largura total | 16:9 | **2560 × 1440** |

**Nota:** o card e a capa do popup usam o **mesmo ficheiro** `cover`. Uma capa de 2560 × 1280 com o essencial no centro funciona nos dois.

**Formato:** JPG ou WebP, qualidade 75–85%, até ~500 KB. Vídeos: MP4 H.264 sem áudio, 1600–1920 px, até ~5 MB.

---

## 7. Faixa de logos (Tools)

Arquivo: `src/components/sections/ToolsMarquee.tsx`.

- Para **adicionar** uma ferramenta: coloque o SVG em `public/logos/` e acrescente `{ name: 'Nome', logo: '/logos/ficheiro.svg' }` à lista `tools`.
- Sem `logo`, mostra só o nome.
- Os logos aparecem em cinzento e ganham cor ao passar o rato.
- **Modo escuro:** logos de uma cor só (pretos) são invertidos para branco. Logos **coloridos** (ex.: apps da Adobe) têm de estar na lista `colouredLogos`, senão viram silhuetas brancas.
- O Premiere Pro ainda usa o logo geral da Adobe (`adobe.svg`). Para trocar, adicione `premiere.svg` e atualize a linha.

---

## 8. CV

- **Conteúdo do popup:** `src/data/cv.ts` (resumo, experiência, formação, certificações, skills, ferramentas).
- **PDF para download:** `public/cv/marlon-franca-cv.pdf`. Ao atualizar o CV, **substitua o PDF e atualize o `cv.ts`**.
- A versão web mostra só o email do site e o LinkedIn. **O PDF é público** e contém os dados que estiverem nele (telefone, email pessoal).

---

## 9. Cores, fonte e modo claro/escuro

### Cores: `src/app/globals.css`
| Variável | Claro | Escuro | Uso |
|---|---|---|---|
| `--paper` | `#f3f1ec` | `#0f0f0e` | fundo |
| `--paper-2` | `#e9e6df` | `#171715` | fundos secundários |
| `--ink` | `#111110` | `#f3f1ec` | texto |
| `--muted` | `#6f6c66` | `#9a968e` | texto secundário |
| `--line` | `#d9d5cc` | `#2a2925` | linhas |
| `--accent` | `#e63329` | `#e63329` | destaque vermelho |

Nas classes Tailwind usam-se como `bg-paper`, `text-ink`, `border-line`, `text-accent`…

### Fonte
Inter Tight, definida em `src/app/layout.tsx`. Para trocar, mude o import (`Inter_Tight`) e mantenha a variável `--font-main`.

### Modo claro/escuro
- O switch está no navbar (`ThemeToggle.tsx`).
- Na primeira visita segue o sistema do visitante; depois guarda a escolha no navegador (`localStorage`).
- Um script no `<head>` (em `layout.tsx`) aplica o tema antes de a página aparecer, por isso não há flash branco.
- Para estilos só do escuro, use o prefixo `dark:` (ex.: `dark:bg-[#1c1c1a]`).

---

## 10. SEO, ícones e partilha

Tudo é gerado automaticamente a partir de `src/data/`:

| URL | O quê |
|---|---|
| `/sitemap.xml` | Home e About (só páginas reais) |
| `/robots.txt` | Permite Google, Bing e assistentes de IA |
| `/llms.txt`, `/llms-full.txt` | Resumo para ChatGPT, Claude, Perplexity… |
| `/opengraph-image` | Imagem de partilha 1200 × 630 |
| `/manifest.webmanifest` | Nome, cores e ícones da app |
| JSON-LD | `Person`, `WebSite`, `CollectionPage` (projetos), `ProfilePage` (About) |

**Ícones:** `src/app/favicon.ico` (16/32/48), `src/app/icon.svg`, `src/app/apple-icon.png` (180) e `public/icons/` (PNG 16–512 e maskable 192/512). Para trocar pelo logo final, substitua estes ficheiros com os mesmos nomes e tamanhos.

**Imagem de partilha personalizada:** apague `src/app/opengraph-image.tsx` e coloque um `opengraph-image.jpg` (1200 × 630) na mesma pasta.

Google Search Console, Analytics e testes: ver [SEO.md](SEO.md).

---

## 11. Publicar

O site publica sozinho a cada push no `main` (1–3 minutos). Um comando de cada vez:

```powershell
npm run build
```
```powershell
git add .
```
```powershell
git commit -m "descricao curta em ingles"
```
```powershell
git push
```

Erro `dubious ownership` (drive externo):

```powershell
git config --global --add safe.directory 'G:/trabalhos diversos/Marlon Franca Design/Website/marlon-franca'
```

Domínio, DNS (Cloudflare, registos em **DNS only**) e detalhes da Vercel: [DEPLOY.md](DEPLOY.md).

---

## 12. Variáveis de ambiente

Definidas na Vercel em **Settings → Environment Variables**. Para testar localmente, copie `.env.example` para `.env.local` (este nunca vai para o git).

| Variável | Para quê | Obrigatória |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 (`G-XXXXXXXXXX`) | Não. Sem ela, o GA não carrega |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Verificação do Search Console por meta tag | Não, se verificou por DNS |

Depois de mudar uma variável na Vercel, faça **Redeploy**.

---

## 13. Problemas conhecidos

| Sintoma | Causa | Solução |
|---|---|---|
| Vercel mostra 404 em tudo | Framework Preset em "Other" | Já corrigido pelo `vercel.json` (`"framework": "nextjs"`). Não apague esse ficheiro |
| Build na Vercel falha em `next/font/google ... queries have exactly one entry` | Regra do Tailwind no Turbopack aplicada a todos os `.css` | A regra em `next.config.ts` está limitada a `globals.css`. Não volte a `*.css` |
| Fonte antiga aparece em `npm run dev` | Cache do servidor de desenvolvimento | Parar o servidor, apagar a pasta `.next` e correr `npm run dev` de novo |
| Favicon novo não aparece | Cache do navegador | `Ctrl + Shift + R` ou janela anónima |
| SSL falha no domínio | Proxy da Cloudflare ligado | Registos da Vercel em **DNS only** (nuvem cinzenta) |
| Email de contacto não recebe mensagens | Sem registo MX no domínio | Cloudflare → Email → Email Routing → reencaminhar para o seu email |

---

## 14. Checklist de conteúdo pendente

- [ ] Projetos reais em `projects.ts` (títulos, briefings, descrições, capas e galerias)
- [ ] Logo do Premiere Pro (`public/logos/premiere.svg`)
- [ ] Alinhar a secção Experience do About com o CV (cargo na WTS, Total Expo)
- [ ] Versão do PDF do CV sem telefone pessoal, se preferir
- [ ] Ativar o Email Routing para `contact@marlonfranca.com`
- [ ] Google Analytics (`NEXT_PUBLIC_GA_ID`) e banner de cookies
- [ ] Logo/ícone final para substituir o "MF" provisório
