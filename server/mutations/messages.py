import os

import datetime

from db_service import database
from graphene import ObjectType, Mutation, String, Int, Date, ClientIDMutation, Boolean
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

    success = Boolean()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        files = info.context.FILES

        return UploadFile(success=True)


    # def mutate(self, info,  file=None):
    #     # print(file.name)
    #     base_dir = os.path.dirname(__file__)
    #     # do something with files
    #
    #     return UploadFile(success=True)


class MessagesMutations(ObjectType):
    create_message = CreateMessage.Field()
    delete_message = DeleteMessage.Field()
    upload_file = UploadFile.Field()
