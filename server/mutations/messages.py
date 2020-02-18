from datetime import date

from db_service import session
from graphene import ObjectType, Mutation, String, Int, Date
from models.messages import Messages


class DeleteMessage(Mutation):
    class Arguments:
        id = Int()

    id = Int()

    def mutate(self, info, id):
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

    def mutate(root, info, text, user, image=None):
        now = date.today()
        exm = Messages.insert().values(user=user, text=text, image=image, date=now)
        session.execute(exm)
        session.commit()
        return CreateMessage(id=1, date=now, text=text, user=user, image=image)


class MessagesMutations(ObjectType):
    create_message = CreateMessage.Field()
    delete_message = DeleteMessage.Field()
