from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import StreamingResponse, FileResponse
from yt_dlp import YoutubeDL
import requests
from functions import *
from fastapi.middleware.cors import CORSMiddleware


class Search1(BaseModel):
    data: str


class Search2(BaseModel):
    data1: str
    data2: str


app = FastAPI()
meV = {'ME5890': 'https://youtu.be/tMrt8g1gJt8',
       'ME8160': 'https://youtu.be/6jhyfjkkk80',
       'ME8219': 'https://youtu.be/RLL6r0wPUsQ'}
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 도메인 허용
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 HTTP 헤더 허용
)


@app.post('/paperGet')
async def paper_get(search: Search1):
    paperID = search.data
    paperType = paperID[:2]
    info = outputInfo()[0] + outputInfo()[1] + outputInfo()[2]
    paperTitle = ""
    for i in range(len(info)):
        if info[i]['id'] == paperID:
            paperTitle = info[i]['titleK']
    if paperTitle:
        fileName = "data/{}/{}.pdf".format(paperType, paperTitle)
        return FileResponse(fileName, media_type='application/pdf', filename='{}.pdf'.format(paperTitle))
    else: return {'e': '이게 뭐여'}


@app.post('/paperList')
async def paper_list(search: Search1):
    tempD = outputInfo()
    retL = list()
    if search.data == 'AC':
        for i in range(len(tempD[0])):
            retD = {'title': tempD[0][i]['titleK'],
                    'authors': tempD[0][i]['author'],
                    'abstract': tempD[0][i]['abstract'],
                    'keywords': tempD[0][i]['keywords'],
                    'id': tempD[0][i]['id'],
                    'type': '학술팀'}
            retL.append(retD)

    elif search.data == 'ME':
        for i in range(len(tempD[1])):
            retD = {'title': tempD[1][i]['titleK'],
                    'authors': tempD[1][i]['author'],
                    'abstract': tempD[1][i]['abstract'],
                    'keywords': list(),
                    'id': tempD[1][i]['id'],
                    'type': '미디어팀'}
            retL.append(retD)
    elif search.data == 'DE':
        for i in range(len(tempD[2])):
            retD = {'title': tempD[2][i]['titleK'],
                    'authors': tempD[2][i]['author'],
                    'abstract': tempD[2][i]['abstract'],
                    'keywords': list(),
                    'id': tempD[2][i]['id'],
                    'type': '디자인팀'}
            retL.append(retD)
    return retL


@app.get('/paperListAll')
async def paper_list_all():
    tempL = outputInfo()
    retL = list()
    for i in range(3):
        for tempD in tempL[i]:
            if i == 0:
                retL.append({'title': tempD['titleK'],
                             'authors': tempD['author'],
                             'abstract': tempD['abstract'],
                             'keywords': tempD['keywords'],
                             'id': tempD['id'],
                             'type': '학술팀'})
            elif i == 1:
                retL.append({'title': tempD['titleK'],
                             'authors': tempD['author'],
                             'abstract': tempD['abstract'],
                             'keywords': list(),
                             'id': tempD['id'],
                             'type': '미디어팀'})
            elif i == 2:
                retL.append({'title': tempD['titleK'],
                             'authors': tempD['author'],
                             'abstract': tempD['abstract'],
                             'keywords': list(),
                             'id': tempD['id'],
                             'type': '디자인팀'})
    return retL



@app.post('/paperInfoAll')
async def paper_info_all(search: Search1):
    retL = list()
    data = search.data
    info = outputInfo()[0] + outputInfo()[1] + outputInfo()[2]
    for paper in info:
        if (data in paper['titleK'] or data in paper['titleE'] or
            data in paper['author'] or data in paper['abstract'] or data in paper['id']):
            retL.append({
                            'title': paper['titleK'],
                            'authors': paper['author'],
                            'abstract': paper['abstract'],
                            'keywords': paper['keywords'],
                            'id': paper['id'],
                            'type': '학술팀' if paper['type'] == 'study'
                            else '미디어팀' if paper['type'] == 'media'
                            else '디자인팀' if paper['type'] == 'design'
                            else '와우 이스터에그~'
                        })
    return retL


@app.post('/stream')
async def stream(search: Search1):
    info = outputInfo()[1]
    data = search.data
    videoID = False
    for paper in info:
        if (data in paper['titleK'] or data in paper['titleE'] or
            data in paper['author'] or data in paper['abstract'] or data in paper['id']):
            videoID = str(paper['id'])

    videoLink = meV[videoID]
    if videoLink:
        def video(url):
            ydl_opts = {
                'format': 'best',
                'quiet': True
            }
            with YoutubeDL(ydl_opts) as ydl:
                info_dict = ydl.extract_info(url, download=False)
                video_url = info_dict.get("url")
            response = requests.get(video_url, stream=True)
            for chunk in response.iter_content(chunk_size=1024):
                if chunk:
                    yield chunk

        return StreamingResponse(video(videoLink), media_type="video/mp4")
    else:
        return {'e': '영상이 읎으용'}
