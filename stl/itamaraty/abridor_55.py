"""
Gera o STL do chaveiro "Abridor de Garrafa 55" (Itamaraty 55 anos).

Feito para impressora de 1 cor (Bambu Lab sem AMS): as cores mudam pela
altura da camada, com troca de filamento no Bambu Studio.

  0,0 – 5,4 mm  azul   corpo do chaveiro
  5,4 – 6,0 mm  dourado  borda, contorno do furo e "itamaraty"
  6,0 – 6,6 mm  branco   "55"

A versão com moeda tem um encaixe para uma moeda de R$ 0,10 (20 mm x 2,23 mm),
colocada numa pausa durante a impressão. A borda da moeda vira o "dente"
de metal que abre a garrafa.

Uso:
  pip install trimesh manifold3d shapely fonttools numpy
  python abridor_55.py
"""
from pathlib import Path

import numpy as np
import trimesh
from fontTools.pens.basePen import BasePen
from fontTools.ttLib import TTFont
from manifold3d import CrossSection, FillRule, Manifold
from shapely import affinity
from shapely.geometry import Point, Polygon, box
from shapely.ops import unary_union

PASTA = Path(__file__).parent
FONTE_55 = "/usr/share/fonts/opentype/inter/Inter-BlackItalic.otf"
FONTE_MARCA = "/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf"

# ---------- medidas (mm) ----------
LARGURA, ALTURA, RAIO = 38.0, 54.0, 6.0
BASE = 5.4            # topo do azul
OURO = 6.0            # topo do dourado
BRANCO = 6.6          # topo do branco
BORDA = 1.6           # largura da borda dourada
FURO_ARGOLA = 5.0     # diâmetro do furo da argola
ABERTURA = (22.0, 9.0, 8.0)   # largura, altura, distância da base do chaveiro
MOEDA_D, MOEDA_E = 20.0, 2.23  # R$ 0,10
FOLGA = 0.25
MOEDA_Z0 = 1.6        # fundo do encaixe; topo = 4,0 (múltiplo de 0,2 mm)
MOEDA_Z1 = 4.0
MOEDA_INVADE = 2.2    # quanto a borda da moeda entra na abertura

RES = 48  # segmentos por quarto de círculo


# ---------- texto -> polígonos ----------
class PenPoligono(BasePen):
    def __init__(self, glyphset):
        super().__init__(glyphset)
        self.contornos, self.atual = [], []

    def _moveTo(self, p):
        self.atual = [p]

    def _lineTo(self, p):
        self.atual.append(p)

    def _curveToOne(self, p1, p2, p3):
        p0 = self.atual[-1]
        for t in np.linspace(0, 1, 12)[1:]:
            self.atual.append(tuple(
                (1 - t) ** 3 * np.array(p0) + 3 * (1 - t) ** 2 * t * np.array(p1)
                + 3 * (1 - t) * t ** 2 * np.array(p2) + t ** 3 * np.array(p3)))

    def _qCurveToOne(self, p1, p2):
        p0 = self.atual[-1]
        for t in np.linspace(0, 1, 10)[1:]:
            self.atual.append(tuple(
                (1 - t) ** 2 * np.array(p0) + 2 * (1 - t) * t * np.array(p1) + t ** 2 * np.array(p2)))

    def _closePath(self):
        if len(self.atual) > 2:
            self.contornos.append(self.atual)
        self.atual = []

    _endPath = _closePath


def texto(txt, fonte, altura_maiuscula, centro, espacamento=0.0):
    """Texto como polígono shapely, centralizado em `centro`, com a altura de maiúscula dada."""
    font = TTFont(fonte)
    glyphset, cmap = font.getGlyphSet(), font.getBestCmap()
    cap = font["OS/2"].sCapHeight
    x, partes = 0.0, []
    for ch in txt:
        nome = cmap[ord(ch)]
        pen = PenPoligono(glyphset)
        glyphset[nome].draw(pen)
        forma = None
        for c in pen.contornos:
            pol = Polygon([(px + x, py) for px, py in c]).buffer(0)
            forma = pol if forma is None else forma.symmetric_difference(pol)
        if forma is not None:
            partes.append(forma)
        x += glyphset[nome].width + espacamento * cap
    geo = unary_union(partes)
    geo = affinity.scale(geo, altura_maiuscula / cap, altura_maiuscula / cap, origin=(0, 0))
    minx, miny, maxx, maxy = geo.bounds
    return affinity.translate(geo, centro[0] - (minx + maxx) / 2, centro[1] - (miny + maxy) / 2)


# ---------- 2D -> 3D ----------
def aneis(geo):
    pols = [geo] if geo.geom_type == "Polygon" else list(geo.geoms)
    saida = []
    for p in pols:
        saida.append(list(p.exterior.coords)[:-1])
        saida += [list(i.coords)[:-1] for i in p.interiors]
    return saida


def extrudar(geo, z0, z1):
    cs = CrossSection(aneis(geo), FillRule.EvenOdd)
    return Manifold.extrude(cs, z1 - z0).translate([0, 0, z0])


def retangulo_arredondado(w, h, r, cx=0.0, cy=0.0):
    return box(cx - w / 2 + r, cy - h / 2 + r, cx + w / 2 - r, cy + h / 2 - r).buffer(r, quad_segs=RES)


def gerar(com_moeda):
    contorno = retangulo_arredondado(LARGURA, ALTURA, RAIO)
    topo, fundo = ALTURA / 2, -ALTURA / 2

    furo_argola = Point(0, topo - 6.0).buffer(FURO_ARGOLA / 2, quad_segs=RES)
    aw, ah, ay = ABERTURA
    abertura = retangulo_arredondado(aw, ah, 3.0, 0, fundo + ay + ah / 2)

    # dourado: borda, contorno da abertura, aro da argola e a palavra
    borda = contorno.difference(contorno.buffer(-BORDA, quad_segs=RES))
    aro_abertura = abertura.buffer(1.4, quad_segs=RES).difference(abertura)
    aro_argola = furo_argola.buffer(1.3, quad_segs=RES).difference(furo_argola)
    marca = texto("itamaraty", FONTE_MARCA, 3.4, (0, 1.5))
    dourado = unary_union([borda, aro_abertura, aro_argola, marca])

    numero = texto("55", FONTE_55, 12.0, (0, 10.0))

    corpo = extrudar(contorno, 0, BASE)
    pecas = corpo + extrudar(dourado, BASE, OURO) + extrudar(numero, BASE, BRANCO)

    if com_moeda:
        cy = fundo + ay + ah + MOEDA_D / 2 - MOEDA_INVADE
        encaixe = Point(0, cy).buffer(MOEDA_D / 2 + FOLGA, quad_segs=RES)
        pecas = pecas - extrudar(encaixe, MOEDA_Z0, MOEDA_Z1)

    furos = unary_union([furo_argola, abertura])
    pecas = pecas - extrudar(furos, -1, BRANCO + 1)

    malha = pecas.to_mesh()
    tm = trimesh.Trimesh(vertices=np.asarray(malha.vert_properties)[:, :3], faces=np.asarray(malha.tri_verts))
    assert tm.is_watertight, "malha não fechada"
    return tm


if __name__ == "__main__":
    for com_moeda, nome in [(True, "abridor_55_com_moeda.stl"), (False, "abridor_55_sem_moeda.stl")]:
        tm = gerar(com_moeda)
        tm.export(PASTA / nome)
        print(f"{nome}: {tm.extents.round(2)} mm, {len(tm.faces)} triângulos, volume {tm.volume / 1000:.2f} cm³")
