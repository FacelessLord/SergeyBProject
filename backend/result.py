class Result:
    def __init__(self, value, err, reason=''):
        self.value = value
        self.err = err
        self.reason = reason
        self.success = not self.err

    def then(self, func):
        if self.success:
            try:
                return Success(func(self.value))
            except Exception as e:
                return ErrorResult(e)
        return self

    def catch(self, func):
        if not self.success:
            try:
                return Success(func(self.err))
            except Exception as e:
                return ErrorResult(str(e))
        else:
            return self

    def as_dict(self):
        dictionary = {
            "success": self.success,

        }
        if not self.success:
            dictionary['reason'] = self.reason
        else:
            dictionary['value'] = self.value

        return dictionary


class Success(Result):
    def __init__(self, value, reason=''):
        super().__init__(value, None, reason=reason)


class ErrorResult(Result):
    def __init__(self, err, reason=''):
        super().__init__(None, err, reason=reason)
