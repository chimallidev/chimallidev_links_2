from fastapi import APIRouter, Request, HTTPException, status
from fastapi.responses import HTMLResponse
from app.core.templates import templates

router = APIRouter()

@router.get('/cursos', response_class= HTMLResponse, status_code= status.HTTP_200_OK)
async def cursos(request: Request):
    try:
        return templates.TemplateResponse(request= request, name= 'pages/cursos.html', context= {})
    except:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND,
                            detail= "La página cursos no ha sido encontrada.")