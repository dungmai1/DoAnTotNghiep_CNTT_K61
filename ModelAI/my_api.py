from flask import Flask,jsonify,session
from flask_cors import CORS, cross_origin
from flask import request
import os
import cv2
from ultralytics.utils.plotting import Annotator
from ultralytics import YOLO
from my_models import get_extract_model, extract_vector
import pickle
import numpy as np
import math
import matplotlib.pyplot as plt
from PIL import Image
from myprocess_firebase import download_image_firebase
from pathlib import Path
import shutil
ata = []

def cropt(image_path):
    global data
    data = []
    base_output_dir = "save"
    os.makedirs(base_output_dir, exist_ok=True)

    output_dirs = ["shoes", "shirt", "pants", "hat", "glasses", "other"]

    for dir_name in output_dirs:
        os.makedirs(os.path.join(base_output_dir, dir_name), exist_ok=True)

    model = YOLO("last.pt")

    image = cv2.imread(image_path)

    # Perform detection
    results = model.predict(image)

    boxes = results[0].boxes.xyxy.tolist()
    labels = results[0].boxes.cls.tolist()
    class_names = model.names
    for i, box in enumerate(boxes):
        x1, y1, x2, y2 = map(int, box)
        ultralytics_crop_object = image[y1:y2, x1:x2]
        filepath = os.path.splitext(image_path)[0]
        directory,file_base_name = os.path.split(os.path.splitext(image_path)[0])
        print("filename",file_base_name)
        path = f"{filepath}_{i}.jpg"
        cv2.imwrite(path, ultralytics_crop_object)
        class_index = int(labels[i])
        label_name = class_names[class_index]   
        if label_name == "shoes":
            cv2.imwrite(os.path.join(base_output_dir, "shoes", f"{file_base_name}_{i}.jpg"), ultralytics_crop_object)
        elif label_name == "shirt":
            cv2.imwrite(os.path.join(base_output_dir, "shirt", f"{file_base_name}_{i}.jpg"), ultralytics_crop_object)
        elif label_name == "pants":
            cv2.imwrite(os.path.join(base_output_dir, "pants",f"{file_base_name}_{i}.jpg"), ultralytics_crop_object)
        elif label_name == "hat":
            cv2.imwrite(os.path.join(base_output_dir, "hat", f"{file_base_name}_{i}.jpg"), ultralytics_crop_object)
        elif label_name == "glasses":
            cv2.imwrite(os.path.join(base_output_dir, "glasses", f"{file_base_name}_{i}.jpg"), ultralytics_crop_object)
        else:
            cv2.imwrite(os.path.join(base_output_dir, "other", f"{file_base_name}_{i}.jpg"), ultralytics_crop_object)
        data.append({"path": path, "label_name": label_name})
    return data

def image_retrieval(image_path):
    model = get_extract_model()
    search_vector = extract_vector(model, image_path)

    # Load 4700 vector tu vectors.pkl ra bien
    vectors = pickle.load(open("vectors.pkl","rb"))
    paths = pickle.load(open("paths.pkl","rb"))

    # Tinh khoang cach tu search_vector den tat ca cac vector
    distance = np.linalg.norm(vectors - search_vector, axis=1)
    
    # Sap xep va lay ra K vector co khoang cach ngan nhat
    filtered_indices = np.where((distance >= 0) & (distance <= 1))[0]
    filtered_distances = distance[filtered_indices]

    print(f"Number of vectors within the distance range 0-1: {len(filtered_distances)}")

    # Sort the filtered distances and get the indices
    sorted_indices = np.argsort(filtered_distances)
    nearest_ids = filtered_indices[sorted_indices]

    # Create output with the nearest images and their distances
    nearest_images = [(paths[id], distance[id]) for id in nearest_ids]

    # Plot the nearest images
    num_images = len(nearest_images)
    # grid_size = math.ceil(math.sqrt(num_images))
    # fig = plt.figure(figsize=(10, 5))
    ListImages = []
    for i in range(num_images):
        draw_image = nearest_images[i]
        # ax = fig.add_subplot(grid_size, grid_size, i + 1)
        # ax.set_title(f"{draw_image[1]:.2f}")
        # img = Image.open(draw_image[0])
        # plt.imshow(img)
        folder_name = draw_image[0].split('\\')[1]
        folder_name = folder_name.split('/')[0]
        ListImages.append(folder_name)
        
    # fig.tight_layout()
    unique_lst = list(set(ListImages))
    # plt.show()
    return unique_lst

# Khởi tạo Flask Server Backend
app = Flask(__name__)

# Apply Flask CORS
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['UPLOAD_FOLDER'] = "static"

@app.route('/', methods=['POST'] )
def predict_yolov8():
    image = request.files['file']
    if image:
        path = 'static'
        shutil.rmtree(path)
        os.makedirs(path, exist_ok=True)
        # Lưu file
        path_to_save = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
        print("Save = ", path_to_save)
        image.save(path_to_save)
        data = cropt(path_to_save)
        return data     
    # ListImages=[]
        # ListImages=image_retrieval(path_to_save)
        # return ListImages 

    return 'Upload file to detect'

@app.route('/image_retrieval', methods=['GET'])
def retrieval():
    try:
        if data:
            page = request.args.get('path', default=0, type=int)
            if page < len(data):
                image_path = data[page]["path"]
                if os.path.exists(image_path):
                    ListImages = image_retrieval(image_path)
                    return ListImages
                else:
                    return jsonify({"status": "error", "message": "Image file not found"})
            else:
                return jsonify({"status": "error", "message": "Index out of range. No images available."})
        else:
            return jsonify({"status": "error", "message": "No images available"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})  

@app.route('/extract_vector', methods=['POST'] )
def extract_image_upload():
    try:
        data = request.json
        image_path = data['image_path']
        download_image_firebase(image_path)
        model = get_extract_model()
        new_vectors = []
        new_paths = []
        path_image_local = "local_directory/"+image_path
        p = Path(path_image_local)
        for f in p.glob('*.jpg'):
            cropt(f)
            image_path_full = str(f)
            image_vector = extract_vector(model, image_path_full)
            new_vectors.append(image_vector)
            new_paths.append(image_path_full)

        vector_file = "vectors.pkl"
        path_file = "paths.pkl"
        # Load existing data if files exist
        if os.path.exists(vector_file):
            with open(vector_file, "rb") as vf:
                vectors = pickle.load(vf)
        else:
            vectors = []

        if os.path.exists(path_file):
            with open(path_file, "rb") as pf:
                paths = pickle.load(pf)
        else:
            paths = []

        # Append new data
        vectors.extend(new_vectors)
        paths.extend(new_paths)

        # Save updated data back to pickle files
        with open(vector_file, "wb") as vf:
            pickle.dump(vectors, vf)
        with open(path_file, "wb") as pf:
            pickle.dump(paths, pf)
        # pickle.dump(vectors, open(vector_file, "wb"))
        # pickle.dump(paths, open(path_file, "wb"))
        return jsonify({"status": "success", "message": "Vectors extracted and saved successfully."})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})
    
@app.route('/getImageDetect', methods=['GET'] )
def getimageDetect():
    try:
        labels = request.args.get('labels') 
        if not labels:
            return jsonify({"status": "error", "message": "Labels parameter is missing"}), 400
        
        path_image_local = "save/static" + labels
        p = Path(path_image_local)
        image_paths = []
        
        for f in p.glob('*.jpg'):
            image_path_full = str(f)
            image_paths.append(image_path_full)
            print(image_path_full)  
            
        return jsonify({"status": "success", "image_paths": image_paths})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}) 
# Start Backend
if __name__ == '__main__':
    app.run(host='0.0.0.0', port='6868')