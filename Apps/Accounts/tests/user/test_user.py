from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from Apps.Accounts.models import User
from Apps.store.utils.constants import Messages


class UserAPITestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            email="testuser@example.com",
            password="testpass123"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_register_user(self):
        url = "/accounts/api/user/register/"
        data = {
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "newpass123",
            "confirm_password": "newpass123",
            "first_name": "New",
            "last_name": "User"
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["message"], Messages.USER_REGISTERED_SUCCESS)
        self.assertTrue(User.objects.filter(username="newuser").exists())

    def test_update_user(self):
        url = "/accounts/api/user/update/"
        data = {
            "username": self.user.username,
            "first_name": "UpdatedName",
            "last_name": self.user.last_name or "",
            "email": self.user.email
        }
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, "UpdatedName")

    def test_delete_user(self):
        url = "/accounts/api/user/delete/"
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        with self.assertRaises(User.DoesNotExist):
            User.objects.get(pk=self.user.pk)

    def test_delete_user_already_deactivated(self):
        self.user.is_active = False
        self.user.save()
        url = "/accounts/api/user/delete/"
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn("error", response.data)
