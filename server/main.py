from ariadne import make_executable_schema, upload_scalar
from ariadne.asgi import GraphQL
from db_service import app
from mutations.main import mutation
from queries.main import query
from schema import type_defs
from starlette.staticfiles import StaticFiles

schema = make_executable_schema(type_defs, [query, mutation, upload_scalar])

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/", GraphQL(schema, debug=True))

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
