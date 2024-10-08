from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.future import select
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import Column, Integer, String
from pydantic import BaseModel
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
from typing import List

DATABASE_URL = "postgresql+asyncpg://postgres:postgres@localhost:5433/asyncTeste"

engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()

class Item(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    await init_db()

async def get_db():
    async with SessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

class ItemCreate(BaseModel):
    name: str

@app.post("/items")
async def create_item(item: ItemCreate, db: AsyncSession = Depends(get_db)):
    db_item = Item(name=item.name)
    db.add(db_item)
    await db.commit()
    await db.refresh(db_item)
    return {"id": db_item.id, "name": db_item.name}

@app.get("/items")
async def read_items(db: AsyncSession = Depends(get_db)):
    async def item_generator():
        try:
            result = await db.execute(select(Item))
            items = result.scalars().all()
            for item in items:
                yield f"data: {json.dumps({'id': item.id, 'name': item.name})}\n\n"
                # await asyncio.sleep(1)
        except asyncio.CancelledError:
            print("Client disconnected")
        finally:
            await db.close()

    return StreamingResponse(item_generator(), media_type="text/event-stream")


@app.get("/items1")
async def read_items(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Item))
    items = result.scalars().all()
    return items
