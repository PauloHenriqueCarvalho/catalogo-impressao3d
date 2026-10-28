"""Ponto de entrada: uvicorn app.main:app"""

from .api import criar_app

app = criar_app()
