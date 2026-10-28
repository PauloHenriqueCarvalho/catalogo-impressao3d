from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field, model_validator


class CampanhaEntrada(BaseModel):
    nome: str
    inicio: datetime
    fim: datetime
    valor_minimo: Decimal = Decimal("0")
    max_notas_dia: int | None = None
    max_notas_total: int | None = None
    cnpjs_participantes: list[str] = []
    eans_participantes: list[str] = []
    limite_aprovacao: int = 30
    limite_rejeicao: int = 70

    @model_validator(mode="after")
    def _coerente(self):
        if self.fim <= self.inicio:
            raise ValueError("fim deve ser depois de inicio")
        if self.limite_rejeicao < self.limite_aprovacao:
            raise ValueError("limite_rejeicao deve ser maior ou igual a limite_aprovacao")
        return self


class CampanhaSaida(CampanhaEntrada):
    model_config = ConfigDict(from_attributes=True)
    id: int


class DadosOcr(BaseModel):
    """O que a leitura da foto extraiu. Os indícios vêm da análise de imagem, quando houver."""

    valor_total: Decimal | None = None
    data_emissao: datetime | None = None
    cnpj_emitente: str | None = None
    indicio_edicao: bool = False
    foto_de_tela: bool = False


class EnvioNota(BaseModel):
    cpf: str
    nome: str | None = None
    telefone: str | None = None
    chave: str | None = Field(None, description="Chave de acesso digitada ou lida do código de barras")
    qrcode: str | None = Field(None, description="Conteúdo do QR code da NFC-e")
    dispositivo_id: str | None = Field(None, description="Identificador do aparelho ou número do WhatsApp")
    ip: str | None = Field(None, description="IP do consumidor; não envie o IP do servidor do bot")
    ocr: DadosOcr | None = None

    @model_validator(mode="after")
    def _tem_chave(self):
        if not self.chave and not self.qrcode:
            raise ValueError("Informe a chave de acesso ou o QR code")
        return self


class Motivo(BaseModel):
    codigo: str
    pontos: int
    detalhe: str


class NotaSaida(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    chave: str
    status: str
    pontuacao: int
    motivos: list[Motivo]
    uf: str
    cnpj_emitente: str
    valor_participante: Decimal | None
    data_emissao: datetime | None
    participante_id: int
    criada_em: datetime
    revisado_por: str | None


class DecisaoRevisao(BaseModel):
    aprovar: bool
    revisor: str
    observacao: str | None = None
    bloquear_participante: bool = False


class Bloqueio(BaseModel):
    motivo: str


class VerificacaoGanhador(BaseModel):
    cpf: str
    chave_pix: str
    identidade_verificada: bool = Field(False, description="Selfie com prova de vida + documento conferidos")


class ResultadoGanhadorSaida(BaseModel):
    apto: bool
    pendencias: list[str]
    notas_validas: int
    notas_invalidadas: list[str]


class Painel(BaseModel):
    notas_por_status: dict[str, int]
    principais_motivos: dict[str, int]
    lojas_com_mais_rejeicoes: dict[str, int]
    participantes_bloqueados: int
    taxa_aprovacao_automatica: float


class ItemSimulado(BaseModel):
    descricao: str
    valor_total: Decimal
    quantidade: Decimal = Decimal("1")
    ean: str | None = None


class NotaSimulada(BaseModel):
    chave: str
    data_emissao: datetime
    valor_total: Decimal
    cpf_consumidor: str | None = None
    itens: list[ItemSimulado] = []


class PixSimuladoEntrada(BaseModel):
    chave_pix: str
    nome: str
    cpf: str
