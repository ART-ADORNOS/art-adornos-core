from django.db import models


class Industry(models.TextChoices):
    AGRICULTURE = 'AGRICULTURE', 'Agricultura'
    AUTOMOTIVE = 'AUTOMOTIVE', 'Automotriz'
    BIOTECHNOLOGY = 'BIOTECHNOLOGY', 'Biotecnología'
    CONSTRUCTION = 'CONSTRUCTION', 'Construcción'
    EDUCATION = 'EDUCATION', 'Educación'
    ENERGY = 'ENERGY', 'Energía'
    ENTERTAINMENT = 'ENTERTAINMENT', 'Entretenimiento'
    FINANCE = 'FINANCE', 'Finanzas'
    FOOD = 'FOOD', 'Alimentos'
    GOVERNMENT = 'GOVERNMENT', 'Gobierno'
    HEALTHCARE = 'HEALTHCARE', 'Salud'
    HOSPITALITY = 'HOSPITALITY', 'Hospitalidad'
    INSURANCE = 'INSURANCE', 'Seguros'
    MANUFACTURING = 'MANUFACTURING', 'Manufactura'
    TECHNOLOGY = 'TECHNOLOGY', 'Tecnología'
    TELECOMMUNICATIONS = 'TELECOMMUNICATIONS', 'Telecomunicaciones'
    TRANSPORTATION = 'TRANSPORTATION', 'Transporte'


