from unittest.mock import patch

from rest_framework.test import APITestCase, APIClient

from Apps.Accounts.models import User
from Apps.store.models import Startup, Category


class CategoryListViewTest(APITestCase):
    @classmethod
    @patch("Apps.store.models.startup.startup.get_current_authenticated_user")
    def setUpTestData(cls, mock_get_user):
        # Crear usuario y simular autenticación
        cls.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="testpassword"
        )
        mock_get_user.return_value = cls.user

        # Crear startup y categoría asociada
        cls.startup = Startup.objects.create(
            owner=cls.user,
            name="Mi Startup",
            description="Startup de prueba",
            industry="Tech"
        )
        cls.category = Category.objects.create(
            start_up=cls.startup,
            name="Categoría Test",
            description="Descripción test"
        )

    def setUp(self):
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_list_categories(self):
        response = self.client.get(f"/store/api/category/list/{self.startup.id}")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "Categoría Test")
