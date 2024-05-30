import axios from 'axios';

const apiUrl = "http://127.0.0.1:6868/"

class Yolov8 {
    predict(imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);

        return axios.post(apiUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}

export default new Yolov8();
