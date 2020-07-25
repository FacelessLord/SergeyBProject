import os

PRIMAL_NUMBER = 700500003661
MAX_VALUE = 1_000_000_000_000
REINIT_VALUE = 779039
current_value = 11117

if __name__.endswith("guid"):
    if os.path.exists("guid_data.data"):
        try:
            with open("guid_data.data", 'rt') as f:
                current_value = int(f.readline()) + REINIT_VALUE
        except ValueError:
            pass

writer = open("guid_data.data", "wt")


def new():
    global current_value
    value = current_value
    current_value = (current_value + PRIMAL_NUMBER) % MAX_VALUE
    writer.seek(0)
    writer.write(str(current_value))
    writer.flush()

    return value


def format_length(num: int, size: int):
    str_num = str(num)
    if len(str_num) > size:
        return str_num[len(str_num) - size:]
    elif len(str_num) < size:
        return '0' * (size - len(str_num)) + str_num
    else:
        return str_num


def new_formatted():
    return format_length(new(), 12)
