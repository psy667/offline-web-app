from ariadne import QueryType
from db_service import database
from models.messages import Messages

query = QueryType()


@query.field("messages")
async def resolve_messages(_, info):
    messages = Messages.select()
    return await database.fetch_all(messages)
