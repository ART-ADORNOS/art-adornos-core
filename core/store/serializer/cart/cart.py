from rest_framework import serializers

from core.store.models import Product, CartProduct, Cart


class CartSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)

    class Meta:
        model = CartProduct
        fields = ['product_id', 'quantity']

    def create(self, validated_data):
        user = self.context['request'].user
        product_id = validated_data['product_id']
        quantity = validated_data['quantity']
        product = Product.objects.get(id=product_id)
        cart, _ = Cart.objects.get_or_create(user=user)
        cart_product, created = CartProduct.objects.get_or_create(cart=cart, product=product)
        if created:
            cart_product.quantity = quantity
        else:
            cart_product.quantity += quantity
        cart_product.save()
        return cart_product
