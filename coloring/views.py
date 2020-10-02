from django.shortcuts import render
from django.core.files.storage import FileSystemStorage

from keras.models import model_from_json
from skimage.color import rgb2lab, lab2rgb
from torch import Tensor, cat
import torch.nn.functional as F
import numpy as np
from PIL import Image
import os
from shutil import rmtree

from .model_struct import model_e, model_s

def clear_media():
    for dirs in os.listdir('./media/'):
        if os.path.isfile(os.path.join('./media/', dirs)):
            try:
                os.remove(os.path.join('./media/', dirs))
            except:
                pass
        elif os.path.isdir(os.path.join('./media/', dirs)):
            try:
                rmtree(os.path.join('./media/', dirs))
            except:
                pass


def light_model():
    with open('./models/light_model.json', 'r') as json_file:
        loaded_model_json = json_file.read()

    model = model_from_json(loaded_model_json)
    model.load_weights("./models/light_model.h5")
    return model

def light_preprocess(img):
    X = (rgb2lab(1.0/255*img)[:,:,0]).reshape(1, 256, 256, 1)
    temp_output = light_model().predict(X)
    temp_output *= 128
    return temp_output, X

def light_output(temp_output, X, org_size, out_path):
    cur = np.zeros((256, 256, 3))
    cur[:,:,0] = X[0][:,:,0]
    cur[:,:,1:] = temp_output[0]
    out_im = Image.fromarray((lab2rgb(cur) * 255).astype(np.uint8))
    (out_im.resize(org_size)).save(out_path)
    return out_path

def preprocess(img_rgb_orig, HW=(256,256), resample=3):
    img_rgb_rs = np.asarray(Image.fromarray(img_rgb_orig).resize(HW, resample=Image.LANCZOS))
    tens_orig_l = Tensor(rgb2lab(img_rgb_orig)[:,:,0])[None,None,:,:]
    tens_rs_l = Tensor(rgb2lab(img_rgb_rs)[:,:,0])[None,None,:,:]
    return (tens_orig_l, tens_rs_l)

def postprocess(tens_orig_l, out_ab, org_size, out_path, mode='bilinear'):
    HW_orig = tens_orig_l.shape[2:]
    HW = out_ab.shape[2:]

    if(HW_orig[0]!=HW[0] or HW_orig[1]!=HW[1]):
        out_ab_orig = F.interpolate(out_ab, size=HW_orig, mode='bilinear')
    else:
        out_ab_orig = out_ab

    out_lab_orig = cat((tens_orig_l, out_ab_orig), dim=1)
    out_im = lab2rgb(out_lab_orig.data.cpu().numpy()[0,...].transpose((1,2,0)))
    out_im = Image.fromarray((out_im * 255).astype(np.uint8))
    (out_im.resize(org_size)).save(out_path)
    return out_path

img_width,img_height = 256, 256


def color(request):
    context = {
        'org': '#',
        'colored_l': '#',
        'colored_e': '#',
        'colored_s': '#',
    }
    return render(request, 'coloring.html', context)

def colorImg(request):
    try:
        clear_media()
        fileObj = request.FILES['filepath']
        fs = FileSystemStorage()
        filePathName = fs.save(fileObj.name, fileObj)
        filePathName = fs.url(filePathName)

        testimg = '.'+filePathName
        img = Image.open(testimg)
        org_size = img.size
        img = img.resize((img_height, img_width))
        ima = np.asarray(img)
        if(ima.ndim==2):
            ima = np.tile(ima[:,:,None],3)
        # light_color
        temp_output, X = light_preprocess(ima)
        out_path_lht = light_output(temp_output, X, org_size, testimg[:-4]+ "_lht.jpg")
        
        # complete_colors
        (tens_l_orig, tens_l_rs) = preprocess(ima, HW=(256,256))

        e_model = model_e().eval()
        s_model = model_s().eval()
        out_path_e = postprocess(tens_l_orig, e_model(tens_l_rs).cpu(), org_size, testimg[:-4]+"_e.jpg")
        out_path_s = postprocess(tens_l_orig, s_model(tens_l_rs).cpu(), org_size, testimg[:-4]+"_s.jpg")

        context = {
            'org': filePathName,
            'colored_l': out_path_lht[1:],
            'colored_e': out_path_e[1:],
            'colored_s': out_path_s[1:],
        }
    except:
        context = {
            'org': '#',
            'colored_l': '#',
            'colored_e': '#',
            'colored_s': '#',
        }

    return render(request, 'coloring.html', context)

