import { AfterViewInit, Component, Directive, Input, QueryList, ViewChildren, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/RX';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { ISubscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeWhile';

import { Kamera } from './kamera';
import { KameraBoxComponent } from './kamera-box.component';

const KAMERAS: Kamera[] = [
  new Kamera('lastImage1.jpg', 'lastVideo1.mp4'),
  new Kamera('lastImage2.jpg', 'lastVideo2.mp4'),
  new Kamera('lastImage3.jpg', 'lastVideo3.mp4'),
  new Kamera('lastImage4.jpg', 'lastVideo4.mp4'),
  new Kamera('lastImage5.jpg', 'lastVideo5.mp4'),
  new Kamera('lastImage6.jpg', 'lastVideo6.mp4'),
  new Kamera('lastImage7.jpg', 'lastVideo7.mp4'),
  new Kamera('lastImage8.jpg', 'lastVideo8.mp4'),
  new Kamera('http://komakallio.dy.fi:8080/observatory/videos/snapshot-1.jpg'),
  new Kamera('http://komakallio.dy.fi:8080/observatory/videos/snapshot-2.jpg'),
  new Kamera('http://www.ursa.fi/~lkangas/kk/sunmoon_kk.png')
];

const SERVERS: string[] = [
  'http://koppi.komakallio.fi/~webcam/',
  'http://taivas.komakallio.fi/~webcam/',
  'http://valvomo.komakallio.fi/~webcam/'
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren(KameraBoxComponent) kameraboxes: QueryList<KameraBoxComponent>;
  private interval: number;
  private alive: boolean;

  title = 'Komakallio';
  kameras = KAMERAS;
  servers = SERVERS;

  constructor() {
    this.interval = 1000 * 60 * 10;
  }

  ngOnInit() {
    this.alive = true;
  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngAfterViewInit() {
    TimerObservable
    .create(0, this.interval)
    .takeWhile(() => this.alive)
    .subscribe(() => {
      this.kameraboxes.forEach(function(k) { k.updateImage(); });
    });
  }
}

