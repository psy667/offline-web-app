import databases
import sqlalchemy
from fastapi import FastAPI

from db import metadata
from env import BASE_DIR
from models.messages import *

app = FastAPI()
PATH = BASE_DIR / "local" / "test.db"
DATABASE_URL = f"sqlite:///{PATH.resolve()}"

database = databases.Database(DATABASE_URL)

engine = sqlalchemy.create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

metadata.create_all(engine)


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()
