# Abridor de Garrafa 55 — Itamaraty

| Arquivo | O que é |
|---|---|
| `abridor_55_com_moeda.stl` | **Recomendado.** Tem encaixe para uma moeda de **R$ 0,10**, que vira o dente de metal do abridor. |
| `abridor_55_sem_moeda.stl` | Abridor só de plástico. Funciona, mas o dente gasta com o uso. |
| `abridor_55.py` | Script que gera os STLs (para mudar medidas ou textos). |
| `abridor_55_preview.png` | Prévia das cores. |

Tamanho: **38 × 54 × 6,6 mm**. Não precisa de suporte.

## Cores por altura (sem AMS)

A peça foi desenhada em camadas: cada cor começa numa altura. Imprime com
**uma cor por vez** e você só troca o filamento quando a impressora parar.

| Altura | Cor | Parte |
|---|---|---|
| 0 – 5,4 mm | **Azul** | corpo |
| 5,4 – 6,0 mm | **Dourado** | borda, contorno do furo, aro da argola, "itamaraty" |
| 6,0 – 6,6 mm | **Branco** | "55" |

## Passo a passo no Bambu Studio

1. Importe o STL e coloque quantas peças couberem na mesa (cerca de 24 numa mesa de 256 mm).
2. Use altura de camada **0,2 mm** (primeira camada também 0,2 mm). As alturas das trocas dependem disso.
3. Sugestão de resistência: **4 paredes** e **30% de preenchimento gyroid**.
4. Fatie e vá em **Preview**. Na barra de camadas da direita, clique com o botão direito no **+** de cada camada abaixo:

| Camada | O que adicionar | O que fazer quando parar |
|---|---|---|
| **4,20 mm** | *Adicionar pausa* (só na versão com moeda) | Coloque uma moeda de R$ 0,10 deitada em cada encaixe redondo e continue. |
| **5,60 mm** | *Adicionar troca de cor* | Troque o azul pelo **dourado**. |
| **6,20 mm** | *Adicionar troca de cor* | Troque o dourado pelo **branco**. |

5. Comece a impressão com o filamento **azul**.

## Sobre a moeda

- O encaixe foi feito para a moeda de **R$ 0,10 atual: 20 mm de diâmetro e 2,23 mm de espessura**, com 0,25 mm de folga.
- Antes de imprimir as 450, imprima **uma peça de teste** e confira se a moeda entra rente, sem ficar acima da superfície.
- A borda da moeda fica aparecendo no topo do furo retangular. É ela que puxa a tampinha da garrafa.
