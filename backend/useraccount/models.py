from django.contrib.auth.models import AbstractUser
from django.db import models
# from PIL import Image
# from io import BytesIO
# from django.core.files.uploadedfile import InMemoryUploadedFile
# import sys


class User(AbstractUser):
    image = models.ImageField(
        default='default.jpg', blank=True, null=True)

    # def save(self):
    #     im = Image.open(self.image)
    #     output = BytesIO()
    #     im = im.resize((150, 150))
    #     im.save(output, format='JPEG', quality=100)
    #     output.seek(0)
    #     self.image = InMemoryUploadedFile(output, 'ImageField', "%s.jpg" % self.image.name.split(
    #         '.')[0], 'image/jpeg', sys.getsizeof(output), None)

    #     super(User, self).save()
