from database import Base
from sqlalchemy import Column, Integer, String, Date, ForeignKey, UniqueConstraint


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String, unique=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    department = Column(String, nullable=False)


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True)
    employee_id = Column(String, ForeignKey("employees.employee_id"))
    date = Column(Date)
    status = Column(String)

    __table_args__ = (
        UniqueConstraint("employee_id", "date", name="unique_attendance"),
    )
