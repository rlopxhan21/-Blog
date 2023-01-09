from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),

    path('blog/', include('blogapp.urls', namespace='blogapp')),
    path('forum/', include('forumapp.urls', namespace='forumapp')),
    path('api/', include('useraccount.urls')),
]

urlpatterns.extend(
    [path('ckeditor/', include('ckeditor_uploader.urls')), ]
)


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
