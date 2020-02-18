import databases
import sqlalchemy
from env import BASE_DIR
from fastapi import FastAPI
from models.messages import *
from sqlalchemy.orm import sessionmaker

app = FastAPI()

PATH = BASE_DIR / "local" / "test.db"
DATABASE_URL = f"sqlite:///{PATH.resolve()}"

database = databases.Database(DATABASE_URL)

Session = sessionmaker()

engine = sqlalchemy.create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

Session.configure(bind=engine)

metadata.create_all(engine)

session = Session()


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()
