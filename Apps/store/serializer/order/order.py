from rest_framework import serializers

from Apps.store.models import Order, OrderItem


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['customer', 'cart', 'total_amount', 'status', 'startup']

    def create(self, validated_data):
        request = self.context['request']
        items_data = request.data  # aquí tomamos directamente tu array

        if not items_data:
            raise serializers.ValidationError("No se recibieron items para la orden.")

        # Asignar el usuario logeado
        validated_data['customer'] = request.user

        # Tomar cart y startup desde el primer item
        validated_data['cart'] = items_data[0]['cart']
        validated_data['startup'] = items_data[0].get('startup', None)  # opcional

        # Calcular total_amount
        validated_data['total_amount'] = sum(item['quantity'] * item['price'] for item in items_data)

        # Crear la Order
        order = Order.objects.create(**validated_data)

        # Crear los OrderItem asociados
        for item in items_data:
            OrderItem.objects.create(
                order=order,
                product_id=item['product_id'],
                quantity=item['quantity'],
                price=item['price']
            )

        return order
