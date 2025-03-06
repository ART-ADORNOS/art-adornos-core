from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from Apps.store.models import Category
from Apps.store.serializer.category.category import CategorySerializer


class CategoryListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, startup_id):
        categories = Category.objects.filter(start_up_id=startup_id)
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)


class RegisterCategoryView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
