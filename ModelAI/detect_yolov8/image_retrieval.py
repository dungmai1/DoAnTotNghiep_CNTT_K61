import math
import os

from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input
from tensorflow.keras.models import  Model

from PIL import Image
import pickle
import numpy as np
from ultralytics import YOLO

# Ham tao model
def get_extract_model():
    vgg16_model = VGG16(weights="imagenet")
    extract_model = Model(inputs=vgg16_model.inputs, outputs = vgg16_model.get_layer("fc1").output)
    return extract_model

# Ham tien xu ly, chuyen doi hinh anh thanh tensor
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

# Dinh nghia anh can tim kiem

search_image = "test_image/giay.jpg"

model = YOLO('last.pt')

previous_boxes = []

res = model.predict(source=search_image, stream=True)
for frame_results in res:
    current_boxes = frame_results.boxes.xyxy.cpu().numpy()
    for box in current_boxes:
        if not any(np.allclose(box, prev_box, atol=10) for prev_box in previous_boxes):
            # This is a new detection
            im = Image.fromarray(frame_results.orig_img)
            imcrop = im.crop(box[:4])
            imcrop.save(f"search/crop_{len(previous_boxes)}.jpg", "JPEG")
            previous_boxes.append(box)

images = "search/crop_0.jpg"

# Khoi tao model
model = get_extract_model()

# Trich dac trung anh search
search_vector = extract_vector(model, images)

# Load 4700 vector tu vectors.pkl ra bien
vectors = pickle.load(open("vectors.pkl","rb"))
paths = pickle.load(open("paths.pkl","rb"))

# Tinh khoang cach tu search_vector den tat ca cac vector
distance = np.linalg.norm(vectors - search_vector, axis=1)

# Sap xep va lay ra K vector co khoang cach ngan nhat
K = 4
ids = np.argsort(distance)[:K]

# Tao oputput
nearest_image = [(paths[id], distance[id]) for id in ids]

# Ve len man hinh cac anh gan nhat do
import matplotlib.pyplot as plt

axes = []
grid_size = int(math.sqrt(K))
fig = plt.figure(figsize=(10,5))

for id in range(K):
    draw_image = nearest_image[id]
    axes.append(fig.add_subplot(grid_size, grid_size, id+1))

    axes[-1].set_title(draw_image[1])
    plt.imshow(Image.open(draw_image[0]))
    
fig.tight_layout()
plt.show()