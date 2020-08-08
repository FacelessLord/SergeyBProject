from backend.controllers.DatabaseController import DatabaseController as dbc
from backend.result import ErrorResult, Success, Result, Fail


def auth_user(db: dbc, username: str, accessToken: str, permission=0) -> Result:
    user = db.get_user_by_name(username)
    if not user:
        return ErrorResult(Fail("nouser"))
    if user.accessToken != accessToken:
        return ErrorResult(Fail("noauth" if accessToken == "" else "reauth"))
    if user.permission_level < permission:
        return ErrorResult(Fail("nopermission"))

    return Success(user)
