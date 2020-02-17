from db_service import app
from gql_classes.messages import MessagesQuery
from graphene import Schema
from graphql.execution.executors.asyncio import AsyncioExecutor
from starlette.graphql import GraphQLApp

app.add_route("/messages/", GraphQLApp(schema=Schema(query=MessagesQuery), executor_class=AsyncioExecutor))


@app.get("/")
async def read_root():
    return {"Hello": "World"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)