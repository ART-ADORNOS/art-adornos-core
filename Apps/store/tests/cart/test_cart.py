from django.test import TestCase
from rest_framework import status
from rest_framework.test import force_authenticate, APIRequestFactory

from Apps.Accounts.models import User
from Apps.store.api.cart.views.cart import CartListView, DeleteCartView, DeleteCartProductView
from Apps.store.models import Cart, CartProduct, Category, Startup, Product


class CartApiTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            email="testuser@example.com",
            password="1234"
        )
        self.category = Category.objects.create(name="Test Category", created_by=self.user.username)
        self.startup = Startup.objects.create(name="Test Startup", created_by=self.user.username)
        self.product = Product.objects.create(
            start_up=self.startup,
            name="Test Product",
            category=self.category,
            price=10.0,
            stock=100,
            created_by=self.user.username
        )
        self.cart = Cart.objects.create(user=self.user)
        self.cart_product = CartProduct.objects.create(
            cart=self.cart,
            product=self.product,
            quantity=2
        )
        self.factory = APIRequestFactory()

    def test_cart_list_view(self):
        request = self.factory.get('/api/cart/list/')
        force_authenticate(request, user=self.user)
        view = CartListView.as_view()
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)

    def test_delete_cart_view(self):
        request = self.factory.delete(f'/api/cart/delete/{self.cart.id}/')
        force_authenticate(request, user=self.user)
        view = DeleteCartView.as_view()
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Cart.objects.filter(id=self.cart.id).exists())

    def test_delete_cart_product_view(self):
        request = self.factory.delete(f'/api/cart/delete-product/{self.cart_product.id}/')
        force_authenticate(request, user=self.user)
        view = DeleteCartProductView.as_view()
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(CartProduct.objects.filter(id=self.cart_product.id).exists())
