# uvicorn main:app --reload

from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select


class ExpenseBase(SQLModel):
    amount: int = Field(index=True)
    title: str = Field(index=True)
    date: str = Field(index=True)
    description: str | None = Field(default=None, index=True)


class Expense(ExpenseBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    secret_name: str


class ExpensePublic(ExpenseBase):
    id: int


class ExpenseCreate(ExpenseBase):
    secret_name: str



sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
app = FastAPI()


@app.post("/expenses/", response_model=ExpensePublic)
def create_expense(expense: ExpenseCreate, session: SessionDep):
    db_expense = Expense.model_validate(expense)
    session.add(db_expense)
    session.commit()
    session.refresh(db_expense)
    return db_expense


@app.get("/expenses/", response_model=list[ExpensePublic])
def read_expenses(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
):
    expenses = session.exec(select(Expense).offset(offset).limit(limit)).all()
    return expenses


@app.get("/expenses/{expense_id}", response_model=ExpensePublic)
def read_expense(expense_id: int, session: SessionDep):
    expense = session.get(Expense, expense_id)
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    return expense


@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: int, session: SessionDep):
    expense = session.get(Expense, expense_id)
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    session.delete(expense)
    session.commit()
    return {"ok": True}
