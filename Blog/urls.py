from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('matrix/', admin.site.urls),

    path('blog/', include('blogapp.urls', namespace='blogapp')),
    path('forum/', include('forumapp.urls', namespace='forumapp')),
    path('api/', include('useraccount.urls')),
]
