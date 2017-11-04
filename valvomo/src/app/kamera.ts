export class Kamera {
    imageFileName: string;
    videoFileName: string;

    constructor(imageFileName: string, videoFileName: string = '') {
        this.imageFileName = imageFileName;
        this.videoFileName = videoFileName;
    }
}
