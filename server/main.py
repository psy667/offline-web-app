from fastapi import FastAPI
import graphene

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}