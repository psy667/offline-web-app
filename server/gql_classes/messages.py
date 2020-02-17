from graphene import ObjectType, List, Int, String, Date
from graphql import ResolveInfo

from db_service import database
from models.messages import Messages


class Message(ObjectType):
    id = Int()
    user = String()
    text = String()
    image = String()
    date = Date()


class MessagesQuery(ObjectType):
    messages = List(Message)

    async def resolve_messages(self, info: ResolveInfo):
        query = (
            Messages
            .select()
        )

        return await database.fetch_all(query)
