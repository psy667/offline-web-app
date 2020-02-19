import datetime

from db_service import database
from graphene import ObjectType, Mutation, String, Int, Date, ClientIDMutation
from graphene_file_upload.scalars import Upload
from models.messages import Messages


class DeleteMessage(Mutation):
    class Arguments:
        id = Int()

    id = Int()

    async def mutate(self, info, id):
        query = Messages.delete().where(Messages.c.id == id)
        await database.execute(query)
        return DeleteMessage(id=id)


class CreateMessage(Mutation):
    class Arguments:
        text = String()
        image = String()
        user = String()

    text = String()
    image = String()
    user = String()
    id = Int()
    date = Date()

    async def mutate(root, info, text, user, image=None):
        now = datetime.date.today()
        query = Messages.insert()
        values = dict(user=user, text=text, image=image, date=now)
        values.update(id=await database.execute(query=query, values=values))
        return values


class UploadFile(ClientIDMutation):
    class Input:
        pass
        # nothing needed for uploading file

    # your return fields
    success = String()


    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        files = info.context.FILES

        # do something with files

        return UploadFile(success=True)


class MessagesMutations(ObjectType):
    create_message = CreateMessage.Field()
    delete_message = DeleteMessage.Field()
    upload_file = UploadFile.Field()
