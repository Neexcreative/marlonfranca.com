# Media dos projetos

Uma pasta por projeto, com o mesmo `slug` de `src/data/projects.ts`:

```
public/projects/halden-coffee/
  cover.mp4   ← animação 3D do card (toca em loop, sem som)
  cover.jpg   ← primeiro frame (poster), aparece enquanto o vídeo carrega
  01.jpg
  02.mp4
```

Depois, em `src/data/projects.ts`:

```ts
cover: "/projects/halden-coffee/cover.mp4",
poster: "/projects/halden-coffee/cover.jpg",
images: ["/projects/halden-coffee/01.jpg", "/projects/halden-coffee/02.mp4"],
```

## Exportar as animações 3D para a web

- Formato: **MP4 (H.264)**, sem áudio (os vídeos tocam sempre mudos)
- Resolução: 1920px de largura no máximo (1280px chega para os cards)
- Duração: loops curtos de 4 a 12 s, com o fim a ligar ao início
- Tamanho: idealmente **menos de 5 MB** por vídeo (CRF 23 a 28)
- Proporção do card: 4:3, 4:5 ou 16:9, conforme a posição na grelha (o vídeo é cortado para preencher)

Comando ffmpeg recomendado:

```
ffmpeg -i render.mov -an -vcodec libx264 -crf 24 -preset slow -pix_fmt yuv420p -vf "scale=1600:-2" -movflags +faststart cover.mp4
ffmpeg -i cover.mp4 -frames:v 1 -q:v 3 cover.jpg
```
