from typing import Optional, Any

from bson import ObjectId
from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from fastapi.params import Depends, Query

from CommonMessages import NOTE_CREATED_SUCCESS, NOTES_FETCHED
from core.security import get_current_user
from database import notes_collection
from models import Note
from schemas import DataResponse, CurrentUser

router = APIRouter()


@router.post("/", response_model=DataResponse[Note])
async def create_note(
    note: Note, current_user: CurrentUser = Depends(get_current_user)
):
    print(current_user, "<<-- current user")

    # Let's find if the same named note exist for the user or not
    existing_notes_cursor = notes_collection.find(
        {
            "title": {"$regex": note.title, "$options": "i"},
            "created_by": current_user["id"],
        }
    )
    existing_notes = await existing_notes_cursor.to_list(length=None)

    if len(existing_notes) > 0:
        title = f"{note.title}({len(existing_notes)})"
    else:
        title = note.title

    # Insert the new note
    insert_result = await notes_collection.insert_one(
        {
            "title": title,
            "description": note.description,
            "created_by": current_user["id"],
        }
    )

    return {
        "error": False,
        "code": "NOTE_CREATED_SUCCESS",
        "message": NOTE_CREATED_SUCCESS,
        "data": {
            "id": str(insert_result.inserted_id),
            "title": title,
            "description": note.description,
        },
    }


@router.get("/", response_model=DataResponse[Any])
async def get_all_notes(
    current_user: CurrentUser = Depends(get_current_user),
    # Optional filter for title
    title: Optional[str] = Query(None, min_length=3),
    # Optional filter for content
    content: Optional[str] = Query(None, min_length=3),
    search: Optional[str] = Query(None),  # Optional search term
    page: int = Query(1, ge=1),  # Pagination: Default to page 1
    limit: int = Query(10, le=100),  # Pagination: Default limit 10, max 100
):
    # Build the query based on the filters
    query = {"created_by": current_user.id}

    if title:
        query["title"] = {
            "$regex": title,
            "$options": "i",
        }  # Case-insensitive match for title
    if content:
        query["content"] = {
            "$regex": content,
            "$options": "i",
        }  # Case-insensitive match for content
    if search:
        # Search in both title and content
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}},
            {"content": {"$regex": search, "$options": "i"}},
        ]

    # Pagination: skip and limit based on page number and limit per page
    skip = (page - 1) * limit

    # Fetch the notes with filters, search, and pagination
    all_notes = (
        await notes_collection.find(query).skip(skip).limit(limit).to_list(length=None)
    )

    # Convert the _id fields to string
    for note in all_notes:
        note["_id"] = str(note["_id"])  # Convert ObjectId to string

    return {
        "error": False,
        "code": "NOTES_FETCHED",
        "message": NOTES_FETCHED,
        "data": all_notes,
    }
