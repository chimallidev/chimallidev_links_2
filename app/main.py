from pathlib import Path
from fastapi import FastAPI
from app.core.templates import templates
from fastapi.staticfiles import StaticFiles
from app.routes.home import router as home_router

BASE_DIR = Path(__file__).resolve().parent

app = FastAPI()

#Archivos estáticos (infraestructura)
app.mount("/static", StaticFiles(directory= BASE_DIR / "static"), name= "static")

#Rutas
app.include_router(home_router)