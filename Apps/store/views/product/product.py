from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from Apps.store.models import Product
from Apps.store.serializer.product.Product import ProductSerializer


class RegisterProductView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, startup_id):
        products = Product.objects.filter(start_up_id=startup_id)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
