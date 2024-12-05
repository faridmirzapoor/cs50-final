from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Note(models.Model):
    id = models.AutoField(primary_key=True)
    subject = models.CharField(max_length=250, null=False, blank=False)
    description = models.TextField(max_length=1000)
    createDate = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_notes")
        
    def __str__(self):
        return self.subject