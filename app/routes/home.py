from fastapi import APIRouter, Request, HTTPException, status
from fastapi.responses import HTMLResponse
from app.core.templates import templates
from app.core.constants import META, HEADER_LINKS, MAIN_BUTTONS, DESTACADOS_CARDS

router = APIRouter()

@router.get("/", response_class= HTMLResponse, status_code= status.HTTP_200_OK)
async def home(request: Request):
    context = {
        "meta": META,
        "header_links": HEADER_LINKS,
        "main_buttons": MAIN_BUTTONS,
        "destacados_cards": DESTACADOS_CARDS
    }

    try:
        return templates.TemplateResponse(request= request, name= "index.html", context= context)
    except:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND,
                            detail= "La página no ha sido encontrada.")