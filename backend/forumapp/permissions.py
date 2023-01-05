from rest_framework import permissions


class OwnerorReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        pass
