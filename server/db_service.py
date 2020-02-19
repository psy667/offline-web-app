import databases
import sqlalchemy
from env import BASE_DIR
from fastapi import FastAPI
from models.messages import *
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "localhost",
    "localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
