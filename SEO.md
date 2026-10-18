# SEO — Marlon França Portfolio

Tudo o que é SEO lê de `src/data/site.ts` e `src/data/projects.ts`. Atualiza esses ficheiros e o resto (metadata, JSON-LD, sitemap, llms.txt) acompanha sozinho.

## O que já está montado

| Ficheiro / URL | O que faz |
|---|---|
| `/robots.txt` | Permite Google, Bing e assistentes de IA (ChatGPT, Claude, Perplexity, Gemini). Aponta para o sitemap |
| `/sitemap.xml` | Home + About, com data de atualização (`site.updated`) e imagens dos projetos |
| `/llms.txt` | Resumo para IAs: quem és, serviços, páginas e projetos |
| `/llms-full.txt` | Versão completa com todos os detalhes de cada projeto |
| `/opengraph-image` | Imagem de partilha 1200×630 (WhatsApp, LinkedIn, Instagram DM, X) |
| `/icon.svg`, `/apple-icon`, `/manifest.webmanifest` | Favicon, ícone iOS e manifesto |
| JSON-LD | `Person` + `WebSite` em todas as páginas, `CollectionPage` com os projetos (`CreativeWork` / `VideoObject`) na home e `ProfilePage` no About |
| Metadata | Title, description, keywords, canonical, Open Graph, Twitter card e regras do Googlebot por página |
| 404 | Página própria, marcada como `noindex` |

## Checklist antes de ir ao ar

- [ ] `site.ts` → email real, `socials` com os **links completos dos perfis** (só entram no JSON-LD depois disso)
- [ ] `projects.ts` → títulos, briefings e descrições reais (é o texto que o Google e as IAs leem)
- [ ] Mudar `site.updated` sempre que publicares trabalho novo
- [ ] Opcional: trocar `src/app/opengraph-image.tsx` por um `opengraph-image.jpg` desenhado por ti (1200×630)

## Google Search Console (indexação)

1. Abre https://search.google.com/search-console → **Add property** → **Domain** → `marlonfranca.com`
2. O Google dá um registo **TXT** → cola-o no DNS do domínio (onde compraste o domínio ou na Vercel, se o DNS estiver lá)
3. Espera a verificação (minutos a algumas horas) → **Verify**
4. Menu **Sitemaps** → enviar `https://www.marlonfranca.com/sitemap.xml`
5. **URL Inspection** → cola a home → **Request indexing** (repete para `/about`)

Alternativa sem DNS: escolhe **URL prefix** → método **HTML tag** → copia só o valor de `content="..."` para a variável `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` na Vercel e faz redeploy.

## Google Analytics 4

1. https://analytics.google.com → **Admin → Create → Property** → "Marlon França"
2. **Data streams → Web** → `https://www.marlonfranca.com`
3. Copia o **Measurement ID** (`G-XXXXXXXXXX`)
4. Vercel → Project → **Settings → Environment Variables** → `NEXT_PUBLIC_GA_ID` = `G-XXXXXXXXXX` (Production)
5. **Deployments → Redeploy**. Sem a variável, o Analytics simplesmente não carrega
6. Liga o Analytics ao Search Console: GA4 → Admin → **Product links → Search Console links**

Nota: o site está na Irlanda (UE). Com Analytics ativo, o ideal é ter um aviso de cookies; posso montar um banner de consentimento quando ativares o GA.

## Google Business Profile (opcional)

Se quiseres aparecer no Google Maps / pesquisas locais ("designer Dublin"): https://business.google.com → criar perfil como **service-area business** (sem morada pública), categoria "Graphic designer", link para o site.

## Testar depois do deploy

- Rich Results: https://search.google.com/test/rich-results → colar o URL
- Schema: https://validator.schema.org
- Partilha: https://www.opengraph.xyz
- Velocidade: https://pagespeed.web.dev

## Limitação a ter em conta

Os projetos abrem num popup, sem URL própria. O Google indexa o texto que está na home, mas cada projeto não aparece como resultado separado. Se quiseres que um case study apareça sozinho no Google, o próximo passo é dar a cada projeto uma página `/work/<slug>` (o popup pode continuar igual).
