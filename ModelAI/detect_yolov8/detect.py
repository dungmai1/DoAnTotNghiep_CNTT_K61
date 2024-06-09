from ultralytics import YOLO
from PIL import Image
import numpy as np
import os
import cv2
# Load YOLO model

model = YOLO('last.pt')

image_directory = "image"
# Create a directory to save cropped images if it doesn't exist
base_output_dir = "save"
os.makedirs(base_output_dir, exist_ok=True)

# Define the subdirectories
output_dirs = ["shoes", "shirt", "pants", "hat", "glasses", "other"]

# Ensure each target subdirectory exists
for dir_name in output_dirs:
    os.makedirs(os.path.join(base_output_dir, dir_name), exist_ok=True)

for image_name in os.listdir(image_directory):
    image_path = os.path.join(image_directory, image_name)
    if os.path.isfile(image_path):
        for results in model.predict(source=image_path, stream=True):
            image = cv2.imread(image_path)
            boxes = results[0].boxes.xyxy.tolist()
            class_ids = results.boxes.cls.cpu().numpy() 
            for index, (box, class_id) in enumerate(zip(boxes, class_ids)):
                x1, y1, x2, y2 = map(int, box)
                cropt_image = image[int(y1):int(y2), int(x1):int(x2)]
                # Save the cropped object as an image
                filename = f'static/cropped_object_{image_name}_{index}.jpg'
                cv2.imwrite(filename, cropt_image) 
                class_labels = model.names[int(class_id)]
                if class_labels == "shoes":
                    cv2.imwrite(os.path.join(base_output_dir, "shoes", f"{image_name}_{index}.jpg"), cropt_image)
                elif class_labels == "shirt":
                    cv2.imwrite(os.path.join(base_output_dir, "shirt", f"{image_name}_{index}.jpg"), cropt_image)
                elif class_labels == "pants":
                    cv2.imwrite(os.path.join(base_output_dir, "pants", f"{image_name}_{index}.jpg"), cropt_image)
                elif class_labels == "hat":
                    cv2.imwrite(os.path.join(base_output_dir, "hat", f"{image_name}_{index}.jpg"), cropt_image)
                elif class_labels == "glasses":
                    cv2.imwrite(os.path.join(base_output_dir, "glasses", f"{image_name}_{index}.jpg"), cropt_image)
    else: 
        cv2.imwrite(os.path.join(base_output_dir, "other", f"{image_name}_{index}.jpg"), cropt_image)
