from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

import models
import schemas
from database import SessionLocal, engine

# Create DB tables
models.Base.metadata.create_all(bind=engine)

# THIS LINE IS CRITICAL
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def health():
    return {"status": "HRMS Lite API running"}

# ---------------- EMPLOYEES ----------------

@app.post("/employees", status_code=201)
def add_employee(emp: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Employee).filter(
        (models.Employee.employee_id == emp.employee_id) |
        (models.Employee.email == emp.email)
    ).first()

    if existing:
        raise HTTPException(status_code=409, detail="Employee already exists")

    employee = models.Employee(**emp.dict())
    db.add(employee)
    db.commit()
    return {"message": "Employee added successfully"}

@app.get("/employees")
def list_employees(db: Session = Depends(get_db)):
    return db.query(models.Employee).all()

@app.delete("/employees/{employee_id}")
def delete_employee(employee_id: str, db: Session = Depends(get_db)):
    emp = db.query(models.Employee).filter_by(employee_id=employee_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(emp)
    db.commit()
    return {"message": "Employee deleted"}

# ---------------- ATTENDANCE ----------------

@app.post("/attendance", status_code=201)
def mark_attendance(att: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    emp = db.query(models.Employee).filter_by(employee_id=att.employee_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    record = models.Attendance(**att.dict())
    db.add(record)

    try:
        db.commit()
    except:
        db.rollback()
        raise HTTPException(status_code=409, detail="Attendance already marked")

    return {"message": "Attendance marked"}

@app.get("/attendance/{employee_id}")
def get_attendance(employee_id: str, db: Session = Depends(get_db)):
    return db.query(models.Attendance).filter_by(employee_id=employee_id).all()
