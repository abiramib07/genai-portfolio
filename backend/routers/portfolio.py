import json
from pathlib import Path
from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["portfolio"])

DATA_PATH = Path(__file__).parent.parent / "data" / "portfolio_data.json"

def load_data():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

@router.get("/personal")
def get_personal():
    return load_data()["personal"]

@router.get("/stats")
def get_stats():
    return load_data()["stats"]

@router.get("/skills")
def get_skills():
    return load_data()["skills"]

@router.get("/experience")
def get_experience():
    return load_data()["experience"]

@router.get("/achievements")
def get_achievements():
    return load_data()["achievements"]

@router.get("/education")
def get_education():
    return load_data()["education"]

@router.get("/all")
def get_all():
    return load_data()
