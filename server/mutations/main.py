from ariadne import MutationType
from db_service import database
from models.messages import Messages
from starlette.datastructures import UploadFile

mutation = MutationType()


@mutation.field("createMessage")
async def resolve_create_message(_, info, text: str, user: str, image: UploadFile = None):
    query_insert = Messages.insert()
    filename = ""

    if image is not None:
        filename = f'uploads/{image.filename}'
        with open(filename, 'w+b') as new_file:
            new_file.write(image.file.read())

    values = dict(user=user, text=text, image=filename)
    new_message_id = await database.execute(query=query_insert, values=values)

    new_message = Messages.select().where(Messages.c.id == new_message_id)
    return await database.fetch_one(new_message)


@mutation.field("deleteMessage")
async def resolve_delete_message(_, info, id: int):
    query = Messages.delete().where(Messages.c.id == id)
    await database.execute(query)
    return {"id": id}
