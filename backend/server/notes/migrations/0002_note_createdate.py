# Generated by Django 5.1.3 on 2024-12-04 11:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='createDate',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
