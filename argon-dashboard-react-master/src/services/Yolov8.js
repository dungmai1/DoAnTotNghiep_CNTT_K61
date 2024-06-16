import axios from 'axios';

const apiUrl = "http://127.0.0.1:6868/"

class Yolov8 {
    getImageDetect(labels){
        return axios.get(apiUrl+`/getImageDetect?labels=${labels}`)
    }
}

export default new Yolov8();
