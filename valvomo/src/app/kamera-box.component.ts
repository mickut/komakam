import { Component, Input } from '@angular/core';
import { Kamera } from './kamera';

@Component({
    selector: 'kamera-box',
    templateUrl: './kamera-box.component.html',
    styleUrls: ['./kamera-box.component.css'],
})

export class KameraBoxComponent {
    @Input() kamera: Kamera;
    @Input() index: number;
    @Input() servers: string[];

    private videoStamp = 0;
    private imageStamp = 0;

    private get server(): string { return this.servers[this.index % this.servers.length]; }

    private get imageUri(): URL {
        return new URL(this.kamera.imageFileName + '?t=' + this.imageStamp, this.server);
    }

    private get videoUri(): URL {
        return new URL(this.kamera.videoFileName + '?t=' + this.videoStamp, this.server);
    }

    public updateVideo() {
        this.videoStamp = Math.floor(Date.now() / 1000);
    }

    public updateImage() {
        this.imageStamp = Math.floor(Date.now() / 1000);
    }

    public videoFullscreen(event): void {
        const video = event.target || event.srcElement || event.currentTarget;
        if (document.webkitCurrentFullScreenElement) {
            document.webkitExitFullscreen();
            return;
        }
        if (document.fullscreenElement) {
            document.exitFullscreen();
            return;
        }
        if (document.mozFullScreenElement) {
            document.mozCancelFullScreen();
            return;
        }
        if (document.msFullscreenElement) {
            document.msExitFullscreen();
            return;
        }
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    }
 }
