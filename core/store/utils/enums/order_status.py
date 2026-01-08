from core.store.utils.enums.enums import TextChoicesCustom


class OrderStatus(TextChoicesCustom):
    PENDING = 'PENDING', 'Pendiente'
    DELIVERED = 'DELIVERED', 'Entregado'
    ON_HOLD = 'ON_HOLD', 'En espera'
    COMPLETED = 'COMPLETED', 'Completado'
    CANCELLED = 'CANCELLED', 'Cancelado'
