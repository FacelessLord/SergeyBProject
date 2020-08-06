from backend.controllers.DatabaseController import DatabaseController as dbc
from backend.result import ErrorResult, Success, Result


def auth_user(db: dbc, username: str, accessToken: str) -> Result:
    user = db.get_user_by_name(username)
    if not user:
        return ErrorResult(Exception(), reason="nouser")
    if user.accessToken != accessToken:
        return ErrorResult(Exception(), reason="noauth" if accessToken == "" else "reauth")
    return Success(user)
