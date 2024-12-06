from django.shortcuts import render
from django.http import JsonResponse
from .models import Note
from .serializers import NoteSerializer
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import NoteSerializer
from django.contrib.auth.models import User


from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.exceptions import AuthenticationFailed

from rest_framework.authtoken.models import Token

def get_user_from_token(auth_token):
    tokenxxxx = Token.objects.get(key=auth_token)
    return tokenxxxx.user

# Create your views here.
@api_view(['GET', 'POST'])
def note_list(request, format=None):
    
    if request.method == 'GET':
        notes = Note.objects.all()
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
@api_view(['GET', 'PUT', 'DELETE'])
def note_detail(request, id, format=None):
    try:
        note = Note.objects.get(pk=id)
    except Note.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = NoteSerializer(note)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = NoteSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
# @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# def user_notes(request):
#     username = request.user.username
#     print(username)

#     print("**"*500)
#     user = User.objects.get(username=username)
#     notes = Note.objects.filter(user=user)
#     serializer = NoteSerializer(notes, many=True)
#     return Response(serializer.data)

# from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def user_notes(request):
    auth_token = request.headers.get('Authorization')
    if not auth_token:
        raise AuthenticationFailed('Token is missing')
    userxxxxxxxx = None
    try:
        token = auth_token.split(',')[0]
        token = token.split(' ')[1]
        userxxxxxxxx = get_user_from_token(token)
        if not userxxxxxxxx:
            raise AuthenticationFailed('Invalid token')
    except IndexError:
        raise AuthenticationFailed('Invalid token format')


    user = User.objects.get(username=userxxxxxxxx)
    notes = Note.objects.filter(author=user)
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def note_detail(request, pk):
    try:
        note = Note.objects.get(pk=pk)
        serializer = NoteSerializer(note)
        return Response(serializer.data, status=200)
    except Note.DoesNotExist:
        return Response({"error": "Note not found"}, status=404)



@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])  # اطمینان از این که کاربر لاگین شده باشد
def add_note(request):
    serializer = NoteSerializer(data=request.data)
    if serializer.is_valid():
        print(request.user)
        print("**"*100)
        serializer.save(author=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])  # اطمینان از این که کاربر لاگین شده باشد
def delete_note(request):
    serializer = NoteSerializer(data=request.data)
    if serializer.is_valid():
        print(request.user)
        print("**"*100)
        serializer.save(author=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


