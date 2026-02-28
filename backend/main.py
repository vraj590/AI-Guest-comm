from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import init_db
from routes.property import router as property_router
from routes.messaging import router as messaging_router
from routes.conversations import router as conversations_router

app = FastAPI(title="AI Guest Hub API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

app.include_router(property_router)
app.include_router(messaging_router)
app.include_router(conversations_router)

@app.get("/")
def root():
    return {"status": "SuiteOp AI Guest Hub API running", "docs": "/docs"}
