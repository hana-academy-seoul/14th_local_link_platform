from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import StreamingResponse
from yt_dlp import YoutubeDL
import requests
from functions import *


class Search1(BaseModel):
    data: str


class Search2(BaseModel):
    data1: str
    data2: str


app = FastAPI()
meV = {'ME5890': '',
       'ME8160': '',
       'ME8219': ''}


@app.post('/paperList')
async def paper_list(search: Search1):
    tempD = dict()
    retD = dict()
    if search.data == 'AC': retD = {'title': tempD['titleK'],
                                    'authors': tempD['author'],
                                    'keywords': tempD['keywords'],
                                    'id': tempD['id'],
                                    'type': 'study'}
    elif search.data == 'ME': retD = {'title': tempD['titleK'],
                                    'authors': tempD['author'],
                                    'keywords': list(),
                                    'id': tempD['id'],
                                    'type': 'media'}
    elif search.data == 'DE': retD = {'title': tempD['titleK'],
                                    'authors': tempD['author'],
                                    'keywords': list(),
                                    'id': tempD['id'],
                                    'type': 'design'}
    return retD


@app.get('/paperListAll')
async def paper_list_all():
    tempL = outputInfo()
    retL = list()
    for i in range(3):
        for tempD in tempL[i]:
            if i == 0:
                retL.append({'title': tempD['titleK'],
                             'authors': tempD['author'],
                             'keywords': tempD['keywords'],
                             'id': tempD['id'],
                             'type': 'study'})
            elif i == 1:
                retL.append({'title': tempD['titleK'],
                             'authors': tempD['author'],
                             'keywords': list(),
                             'id': tempD['id'],
                             'type': 'media'})
            elif i == 2:
                retL.append({'title': tempD['titleK'],
                             'authors': tempD['author'],
                             'keywords': list(),
                             'id': tempD['id'],
                             'type': 'design'})
    return retL


@app.post('/paperInfo')
async def paper_info(search: Search2):
    retL = list()
    index = 3
    data1 = search.data1
    data2 = search.data2
    if data1 == 'AC': index = 0
    elif data1 == 'ME': index = 1
    elif data1 == 'DE': index = 2
    if index < 3:
        info = outputInfo()[index]
        for paper in info:
            if (data2 in paper['titleK'] or data2 in paper['titleE'] or
                data2 in paper['author'] or data2 in paper['abstract'] or data2 in paper['id']):
                retL.append(paper)
    return retL


@app.get('/paperInfoAll')
async def paper_info_all(search: Search1):
    retL = list()
    data = search.data
    info = outputInfo()[0] + outputInfo()[1] + outputInfo()[2]
    for paper in info:
        if (data in paper['titleK'] or data in paper['titleE'] or
            data in paper['author'] or data in paper['abstract'] or data in paper['id']):
            retL.append(paper)
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

    videoLink = meV.get(videoID)
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
