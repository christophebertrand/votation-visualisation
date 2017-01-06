from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^map/$', views.show_map, name='show_map'),
    
    url(r'^api/ch_json', views.get_ch_json, name='get_ch_json'),
    url(r'^api/nucleaire_csv', views.get_nucleaire_csv, name='get_nucleaire_csv'),
    url(r'^api/nucleairecanton_csv', views.get_nucleairecanton_csv, name='get_nucleairecanton_csv'),
    url(r'^api/pop_cantons_csv', views.get_pop_cantons_csv, name='get_pop_cantons_csv'),
]
