import logging

from django.db import models
from django_currentuser.middleware import (get_current_authenticated_user)

logger = logging.getLogger(__name__)


class ModelBase(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    created_by = models.CharField(max_length=100, blank=True, null=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    update_by = models.CharField(max_length=100, blank=True, null=True, editable=False)

    @property
    def created_at_format(self):
        return self.created_at.strftime("%Y-%m-%d %H:%M:%S")

    @property
    def updated_at_format(self):
        return self.updated_at.strftime("%Y-%m-%d %H:%M:%S")

    def save(self, *args, **kwargs):
        try:
            user = get_current_authenticated_user()
            if self._state.adding:
                self.created_by = user.username
            else:
                self.update_by = user.username
        except Exception as e:
            logger.error(f"Error in ModelBase save method: {e}")
            raise

        super().save(*args, **kwargs)

    class Meta:
        abstract = True
