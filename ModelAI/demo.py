# import thu vien
import os

from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input
from tensorflow.keras.models import  Model

from PIL import Image
import pickle
import numpy as np
from rembg import remove
from pathlib import Path
import pyrebase
import cv2
from ultralytics import YOLO

# Ham tao model
def get_extract_model():
    vgg16_model = VGG16(weights="imagenet")
    extract_model = Model(inputs=vgg16_model.inputs, outputs = vgg16_model.get_layer("fc1").output)
    return extract_model

def image_preprocess(img):
    img = img.resize((224,224))
    img = img.convert("RGB")
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    return x

def extract_vector(model, image_path):
    print("Xu ly : ", image_path)
    img = Image.open(image_path)
    img_tensor = image_preprocess(img)
    # Trich dac trung
    vector = model.predict(img_tensor)[0]
    # Chuan hoa vector = chia chia L2 norm (tu google search)
    vector = vector / np.linalg.norm(vector)
    return vector


def cropt(image_path):
    model = YOLO("last.pt")

    image = cv2.imread(image_path)

    # Perform detection
    results = model.predict(image)

    boxes = results[0].boxes.xyxy.tolist()

    for i, box in enumerate(boxes):
        x1, y1, x2, y2 = box
        ultralytics_crop_object = image[int(y1):int(y2), int(x1):int(x2)]
        cv2.imwrite(image_path, ultralytics_crop_object)

config = {
  'serviceAccount':"uploadimage-2566f-9a301a38bcc5.json",
  'apiKey': "AIzaSyCTqolKa3-Dgoako7JHpcxCMv9wsrEV0T4",
  'authDomain': "uploadimage-2566f.firebaseapp.com",
  'projectId': "uploadimage-2566f",
  'storageBucket': "uploadimage-2566f.appspot.com",
  'messagingSenderId': "1087217591503",
  'appId': "1:1087217591503:web:5326a3a24eb5d21e2f83ba",
  'databaseURL': "",
}
firebase = pyrebase.initialize_app(config)
storage = firebase.storage()

# local_directory = "saveimage_firebase"

# os.makedirs(local_directory, exist_ok=True)
    
model = get_extract_model()

vectors = []
paths = []
all_files = storage.child("").list_files()
for file in all_files:
  try:
    # url = storage.child(file.name).get_url(None)
    # print(f"Downloading {file.name}")
    # local_path = os.path.join(local_directory, os.path.basename(file.name))
    # storage.child(file.name).download(file.name,local_path)
    print(f"Downloading {file.name}")
    folder_name = file.name.split('/')[1]
    local_directory = "local_directory"
    os.makedirs(os.path.join(local_directory, folder_name), exist_ok=True)
    local_path = os.path.join(local_directory,folder_name, os.path.basename(file.name))
    storage.child(file.name).download(file.name,local_path)
  except:
     print("Download Fail")

p = Path(local_directory)
for f in p.glob('**/*.jpg'):
    cropt(f)
    image_path_full = str(f)
    image_vector = extract_vector(model, image_path_full)
    vectors.append(image_vector)
    paths.append(image_path_full)
    print("imagepath",image_path_full)

# save vao file
vector_file = "vectors.pkl"
path_file = "paths.pkl"

pickle.dump(vectors, open(vector_file, "wb"))
pickle.dump(paths, open(path_file, "wb"))

