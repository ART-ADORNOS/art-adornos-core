from core.store.utils.enums.enums import TextChoicesCustom


class NotificationStatus(TextChoicesCustom):
    DELIVERED = 'DELIVERED', 'Entregado'
    RECEIVED = 'RECEIVED', 'Recibido'
    READY = 'READY', 'Leído'
    COMPLETED = 'COMPLETED', 'Completado'
