from django.contrib import admin
from django.urls import path
from notes import views
from server import views as s_views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('user-notes/', views.user_notes ),  # notes related to User
    path('admin/', admin.site.urls),
    path('notes/', views.note_list),
    path('notes/<int:id>/', views.note_detail),
    path('login/', s_views.login),
    path('register/', s_views.register),
    path('test-token/', s_views.test_token),
    path('note-detail/<int:pk>/', views.note_detail),
    path('add-note/', views.add_note, name='add-note')

]

urlpatterns = format_suffix_patterns(urlpatterns)