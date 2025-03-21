from django.db import models


class Industry(models.TextChoices):
    AGRICULTURE = 'AGRICULTURE', 'Agricultura'
    AUTOMOTIVE = 'AUTOMOTIVE', 'Automotriz'
    BIOTECHNOLOGY = 'BIOTECHNOLOGY', 'Biotecnología'
    CONSTRUCTION = 'CONSTRUCTION', 'Construcción'
    EDUCATION = 'EDUCATION', 'Educación'
    ENTERTAINMENT = 'ENTERTAINMENT', 'Entretenimiento'
    FINANCE = 'FINANCE', 'Finanzas'
    FOOD = 'FOOD', 'Alimentos'
    TECHNOLOGY = 'TECHNOLOGY', 'Tecnología'
    WELDING = 'WELDING', 'Soldadura'
    HAIRDRESSING = 'HAIRDRESSING', 'Peluquería'
    GENERAL = 'GENERAL', 'Otros'


