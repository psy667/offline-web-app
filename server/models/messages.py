from sqlalchemy import *

from db import metadata

Messages = Table(
    "messages",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("user", String),
    Column("text", String),
    Column("image", String),
    Column("date", Date),
)
