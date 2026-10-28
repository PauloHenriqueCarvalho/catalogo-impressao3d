from datetime import datetime
from decimal import Decimal

from sqlalchemy import JSON, ForeignKey, Index, Numeric, String, UniqueConstraint, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .db import Base

EM_VALIDACAO = "em_validacao"
APROVADA = "aprovada"
REVISAO = "revisao"
REJEITADA = "rejeitada"


class Campanha(Base):
    __tablename__ = "campanhas"

    id: Mapped[int] = mapped_column(primary_key=True)
    nome: Mapped[str]
    inicio: Mapped[datetime]
    fim: Mapped[datetime]
    valor_minimo: Mapped[Decimal] = mapped_column(Numeric(12, 2), default=Decimal("0"))
    max_notas_dia: Mapped[int | None]
    max_notas_total: Mapped[int | None]
    # Vazios = qualquer loja / qualquer produto participa.
    cnpjs_participantes: Mapped[list[str]] = mapped_column(JSON, default=list)
    eans_participantes: Mapped[list[str]] = mapped_column(JSON, default=list)
    # Pontuação até limite_aprovacao aprova; acima de limite_rejeicao rejeita; entre os dois vai para revisão.
    limite_aprovacao: Mapped[int] = mapped_column(default=30)
    limite_rejeicao: Mapped[int] = mapped_column(default=70)
    criada_em: Mapped[datetime] = mapped_column(default=datetime.now)


class Participante(Base):
    __tablename__ = "participantes"
    __table_args__ = (UniqueConstraint("campanha_id", "cpf"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    campanha_id: Mapped[int] = mapped_column(ForeignKey("campanhas.id"), index=True)
    cpf: Mapped[str] = mapped_column(String(11))
    nome: Mapped[str | None]
    telefone: Mapped[str | None] = mapped_column(index=True)
    bloqueado: Mapped[bool] = mapped_column(default=False)
    motivo_bloqueio: Mapped[str | None]
    criado_em: Mapped[datetime] = mapped_column(default=datetime.now)

    notas: Mapped[list["Nota"]] = relationship(back_populates="participante")


class Nota(Base):
    __tablename__ = "notas"
    __table_args__ = (
        # A mesma chave só pode estar ativa uma vez por campanha; tentativas rejeitadas ficam no histórico.
        Index(
            "uq_nota_ativa",
            "campanha_id",
            "chave",
            unique=True,
            sqlite_where=text("status != 'rejeitada'"),
            postgresql_where=text("status != 'rejeitada'"),
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    campanha_id: Mapped[int] = mapped_column(ForeignKey("campanhas.id"), index=True)
    participante_id: Mapped[int] = mapped_column(ForeignKey("participantes.id"), index=True)
    chave: Mapped[str] = mapped_column(String(44), index=True)
    uf: Mapped[str] = mapped_column(String(2))
    cnpj_emitente: Mapped[str] = mapped_column(String(14), index=True)
    modelo: Mapped[str] = mapped_column(String(2))
    serie: Mapped[int]
    numero: Mapped[int]
    tipo_emissao: Mapped[int]

    dispositivo_id: Mapped[str | None] = mapped_column(index=True)
    ip: Mapped[str | None] = mapped_column(index=True)
    dados_ocr: Mapped[dict | None] = mapped_column(JSON)
    dados_sefaz: Mapped[dict | None] = mapped_column(JSON)
    data_emissao: Mapped[datetime | None]
    valor_participante: Mapped[Decimal | None] = mapped_column(Numeric(12, 2))
    cpf_consumidor: Mapped[str | None] = mapped_column(String(11))

    status: Mapped[str] = mapped_column(String(20), default=EM_VALIDACAO, index=True)
    pontuacao: Mapped[int] = mapped_column(default=0)
    # [{"codigo": ..., "pontos": ..., "detalhe": ...}]
    motivos: Mapped[list[dict]] = mapped_column(JSON, default=list)
    tentativas_sefaz: Mapped[int] = mapped_column(default=0)
    revisado_por: Mapped[str | None]
    observacao_revisao: Mapped[str | None]
    criada_em: Mapped[datetime] = mapped_column(default=datetime.now, index=True)
    atualizada_em: Mapped[datetime] = mapped_column(default=datetime.now, onupdate=datetime.now)

    participante: Mapped[Participante] = relationship(back_populates="notas")
