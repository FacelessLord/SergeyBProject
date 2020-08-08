from typing import Iterable, Callable
import itertools


class FINQ:
    def __init__(self, source: Iterable):
        self.source = source

    def __iter__(self):
        for item in self.source:
            yield item

    def map(self, func: Callable):
        return FINQ(map(func, self))

    def flat_map(self, func=lambda f: f):
        return FINQFlatMap(self, func)

    def filter(self, func: Callable):
        return FINQ(filter(func, self))

    def sort(self, func: Callable):
        return FINQ(sorted(self, key=func))

    def skip(self, count: int):
        return FINQ(o for i,o in enumerate(self, 0) if i >= count)

    def take(self, count: int):
        return FINQ(o for i,o in enumerate(self, 0) if i < count)

    def pairs(self):
        return FINQPairs(self)

    def for_each(self, func=lambda f: f):
        for item in self:
            func(item)

    def any(self, func=lambda f: True):
        for i in self:
            if func(i):
                return True
        return False

    def peek(self, func=lambda f: f):
        return FINQPeek(self, func)

    def first(self):
        return next(iter(self))

    def to_list(self):
        return list(self)

    def to_set(self):
        return set(self)

    def count(self):
        return len(list(self))

    def min(self):
        return min(self)

    def max(self):
        return max(self)

    def sum(self):
        return sum(self)

    def max_diff(self):
        return max(self) - min(self)

    def reduce(self, reductor: Callable):
        return FINQReduce(self, reductor)

    def reduce_with_first(self, first, reductor: Callable):
        return FINQReduce(self, reductor, first)


class FINQFlatMap(FINQ):
    def __init__(self, source: Iterable, mapper: Callable, ):
        super().__init__(source)
        self.mapper = mapper

    def __iter__(self):
        for item in self.source:
            for sub_item in map(self.mapper, item):
                yield sub_item


class FINQPairs(FINQ):
    def __init__(self, source: Iterable):
        super().__init__(source)

    def __iter__(self):
        src_list = list(self.source)
        for i in range(0, len(src_list)):
            for item2 in src_list[i + 1:]:
                yield (src_list[i], item2,)


class FINQPeek(FINQ):
    def __init__(self, source: Iterable, func):
        super().__init__(source)
        self.func = func

    def __iter__(self):
        for item in self.source:
            self.func(item)
            yield item


class FINQReduce(FINQ):
    def __init__(self, source: Iterable, reductor: Callable, first=None):
        super().__init__(source)
        self.reductor = reductor
        self.firstValue = first

    def __iter__(self):
        result = self.firstValue
        for item in self.source:
            if not result:
                result = item
                continue
            result = self.reductor(result, item)
        yield result
