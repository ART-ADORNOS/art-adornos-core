from django.db import models

from Apps.store.models import ModelBase
from Apps.store.utilities.enums.notification_status import NotificationStatus


class OrderHistory(ModelBase):
    user = models.ForeignKey("Accounts.User", on_delete=models.CASCADE, verbose_name="Usuario")
    cart = models.ForeignKey("Cart", on_delete=models.CASCADE, verbose_name="Cart")
    status = models.CharField(choices=NotificationStatus.choices, default=NotificationStatus.DELIVERED, max_length=10,verbose_name="Estado")

    def __str__(self):
        return f"Notificación de carrito para {self.user.username} - Estado: {self.get_status_display()}"

    class Meta:
        verbose_name = "Notificación de Carrito"
        verbose_name_plural = "Notificaciones de Carrito"
        ordering = ["-created_at"]
