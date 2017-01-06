
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import os
import json



def index(request):
    return HttpResponse("Hello, world. You're at the viz index.")

def show_map(request):
    arg_dict = {} # can pass data to the template
    return render(request, 'visualisation_app/visualisation.html', context=arg_dict)

def get_ch_json(request):
    return JsonResponse(json.loads(_read_file("data/ch.json")), safe=False)

def get_nucleaire_csv(request):
    return HttpResponse(_read_file("data/nucleaire.csv"))

def get_nucleairecanton_csv(request):
    return HttpResponse(_read_file("data/nucleaireCanton.csv"))

def get_pop_cantons_csv(request):
    return HttpResponse(_read_file("data/pop_cantons.csv"))

def _read_file(filename):
    dir_path = os.path.dirname(os.path.realpath(__file__))
    with open(dir_path+"/"+filename, 'r') as f:
        return f.read()
