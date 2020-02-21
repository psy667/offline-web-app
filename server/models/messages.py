from db import metadata
from sqlalchemy import *

Messages = Table(
    "messages",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("user", String),
    Column("text", String),
    Column("image", String),
    Column("date", TIMESTAMP, default=func.current_timestamp()),
)
