# Deploy — Marlon França Portfolio

> Terminal: PowerShell (Windows). Corre os comandos UM DE CADA VEZ. Nunca uses `&&`.
> Os comandos correm dentro da pasta `marlon-franca` (onde está o `package.json`).

## Updates do dia a dia

```powershell
git add .
```
```powershell
git commit -m "descricao do que mudaste"
```
```powershell
git push
```

O Vercel faz deploy automático em 1–3 minutos.

## Correr localmente

```powershell
npm install
```
```powershell
npm run dev
```

Abre http://localhost:3000

## Se der erro "dubious ownership" (drive externo)

```powershell
git config --global --add safe.directory 'G:/trabalhos diversos/Marlon Franca Design/Website/marlon-franca'
```

(Se o drive mudar de letra noutro PC, troca o `G:` pela letra certa.)

## Links

- GitHub: https://github.com/Neexcreative/marlonfranca.com
- Vercel: {URL .vercel.app — preencher depois do primeiro deploy}
- Domínio: https://www.marlonfranca.com

## Domínio

1. Vercel → projeto → Settings → Domains → Add Domain → `www.marlonfranca.com`
2. Adicionar também `marlonfranca.com` e escolher **Redirect to www.marlonfranca.com**
3. Copiar os DNS records que o Vercel mostra (A para `@`, CNAME para `www`)
4. Colar no painel do registrar do domínio
5. Aguardar até 24–48h

## Media dos projetos

Vídeos 3D e imagens vão em `public/projects/<slug>/` — ver `public/projects/README.md`.
Vídeos grandes deixam o repo pesado: manter cada `.mp4` abaixo de ~5 MB.

## Environment variables

Este projeto não usa nenhuma por enquanto.
