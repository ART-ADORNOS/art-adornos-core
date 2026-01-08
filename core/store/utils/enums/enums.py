from django.db import models


class TextChoicesCustom(models.TextChoices):
    @classmethod
    def get_value(cls, option):
        for key, value in cls.choices:
            if value == option:
                return key
        return ''

    @classmethod
    def get_key(cls, option):
        for key, value in cls.choices:
            if key == option:
                return value
        return ''

    @classmethod
    def get_label(cls, value):
        try:
            return cls(value).label
        except ValueError:
            return ""
