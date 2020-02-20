from ariadne import make_executable_schema, QueryType, gql, upload_scalar, MutationType
from ariadne.asgi import GraphQL
from db_service import app
from fastapi import FastAPI
from starlette.datastructures import UploadFile
import mimetypes

type_defs = gql("""
    scalar Upload

    type Mutation {
        uploadFile(file: Upload!): Query
    }
    
    
    type Query {
        success: Boolean!
    }
""")

mutation = MutationType()
query = QueryType()


@mutation.field("uploadFile")
def resolve_upload_file(_, info, file: UploadFile = None):
    filename = f'uploads/{file.filename}'
    with open(filename, 'w+b') as new_file:
        new_file.write(file.file.read())

    return {"success": True}


schema = make_executable_schema(type_defs, [query, mutation, upload_scalar])

app.mount("/graphql", GraphQL(schema, debug=True))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
