import pyrebase
import os

def download_image_firebase(image_path):
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
      
  all_files = storage.child("").list_files()

  for file in all_files:
    try:
      if file.name.startswith("dataImage/"+image_path+"/"):
        print(f"Downloading {file.name}")
        folder_name = file.name.split('/')[1]
        print("Folder name:", folder_name)
        local_directory = "local_directory"
        os.makedirs(os.path.join(local_directory, folder_name), exist_ok=True)
        local_path = os.path.join(local_directory,folder_name, os.path.basename(file.name))
        storage.child(file.name).download(file.name,local_path)
    except:
      print("Download Fail")
#   return local_directory

# local_path = download_image_firebase("965f0a54-20df-4a85-9f24-d79500fe6407")

# print(local_path)
