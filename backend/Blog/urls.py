from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),

    path('blog/', include('blogapp.urls', namespace='blogapp')),
    path('forum/', include('forumapp.urls', namespace='forumapp')),
    path('api/', include('useraccount.urls')),
]

urlpatterns.extend(
    [path('ckeditor/', include('ckeditor_uploader.urls')), ]
)
