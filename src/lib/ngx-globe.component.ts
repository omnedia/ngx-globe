import {CommonModule, isPlatformBrowser} from "@angular/common";
import {AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, PLATFORM_ID, ViewChild,} from "@angular/core";
import createGlobe from "cobe";
import Phenomenon from "phenomenon";
import {COBEOptionsPart, GlobeOptions} from "./ngx-globe.types";

@Component({
  selector: "om-globe",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./ngx-globe.component.html",
  styleUrl: "./ngx-globe.component.scss",
})
export class NgxGlobeComponent implements AfterViewInit, OnDestroy {
  @ViewChild("globeCanvas")
  globeCanvas!: ElementRef<HTMLCanvasElement>;

  @Input("styleClass")
  styleClass?: string;

  @Input("rotationSpeed")
  rotationSpeed = 0.005;

  @Input("globeOptions")
  set globeOptions(options: GlobeOptions) {
    this.globeSize = options.width ?? this.globeSize;
    this.setGlobeOptions(options);

    if (this.globeInitialized) {
      this.initGlobe();
    }
  }

  @Input("globeSize")
  set globeCanvasSize(size: number) {
    this.globeSize = size;
    this.cobeOptions.width = this.globeSize;
    this.cobeOptions.height = this.globeSize;
    this.style["--globe-size"] = size + "px";

    if (this.globeInitialized) {
      this.initGlobe();
    }
  }

  style: any = {};

  private globeSize = 600;

  private globeInitialized = false;

  private globe?: Phenomenon;

  cobeOptions: COBEOptionsPart = {
    devicePixelRatio: 2,
    width: this.globeSize,
    height: this.globeSize,
    phi: 0,
    theta: 0.3,
    dark: 0,
    diffuse: 0.4,
    scale: 1,
    mapSamples: 16000,
    mapBrightness: 1.2,
    baseColor: [1, 1, 1],
    markerColor: [251 / 255, 100 / 255, 21 / 255],
    glowColor: [1, 1, 1],
    offset: [0, 0],
    markers: [
      {location: [14.5995, 120.9842], size: 0.03},
      {location: [19.076, 72.8777], size: 0.1},
      {location: [23.8103, 90.4125], size: 0.05},
      {location: [30.0444, 31.2357], size: 0.07},
      {location: [39.9042, 116.4074], size: 0.08},
      {location: [-23.5505, -46.6333], size: 0.1},
      {location: [19.4326, -99.1332], size: 0.1},
      {location: [40.7128, -74.006], size: 0.1},
      {location: [34.6937, 135.5022], size: 0.05},
      {location: [41.0082, 28.9784], size: 0.06},
    ],
  };

  private pointerInteracting: any = null;
  pointerInteractionMovement = 0;
  private globeRotation = 0;

  private intersectionObserver?: IntersectionObserver;
  private isAnimating = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {
  }

  ngAfterViewInit(): void {
    this.initGlobe();

    if (isPlatformBrowser(this.platformId)) {
      this.intersectionObserver = new IntersectionObserver(([entry]) => {
        this.renderContents(entry.isIntersecting);
      });
      this.intersectionObserver.observe(this.globeCanvas.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.globe?.destroy();
    window.removeEventListener("resize", () => this.setCanvasSize());
  }

  setCanvasSize(): void {
    this.globeCanvas.nativeElement.width = this.globeSize;
    this.globeCanvas.nativeElement.height = this.globeSize;
  }

  renderContents(isIntersecting: boolean) {
    if (isIntersecting && !this.isAnimating) {
      this.isAnimating = true;

      this.globe?.toggle(true);
    } else if (!isIntersecting && this.isAnimating) {
      this.isAnimating = false;

      this.globe?.toggle(false);
    }
  }

  initGlobe(): void {
    let phi = this.cobeOptions.phi;
    let cobeOptions = {
      ...this.cobeOptions,
      onRender: (state: any) => {
        if (!this.pointerInteracting) {
          phi += this.rotationSpeed;
        }

        state.phi = phi + this.globeRotation;
      },
    };

    this.globe = createGlobe(this.globeCanvas.nativeElement, cobeOptions);

    this.globeInitialized = true;

    window.addEventListener("resize", () => this.setCanvasSize());

    this.globeCanvas.nativeElement.width = this.globeSize;
    this.globeCanvas.nativeElement.height = this.globeSize;
  }

  updatePointerInteraction(value: any): void {
    this.pointerInteracting = value;
    this.globeCanvas.nativeElement.style.cursor = value ? "grabbing" : "grab";
  }

  updateMovement(clientX: any): void {
    if (this.pointerInteracting !== null) {
      const delta = clientX - this.pointerInteracting;
      this.pointerInteractionMovement = delta;
      this.globeRotation = delta / 200;
    }
  }

  setGlobeOptions(options: GlobeOptions): void {
    this.cobeOptions.width = options.width ?? this.cobeOptions.width;
    this.cobeOptions.height = options.height ?? this.cobeOptions.height;
    this.cobeOptions.phi = options.phi ?? this.cobeOptions.phi;
    this.cobeOptions.theta = options.theta ?? this.cobeOptions.theta;
    this.cobeOptions.mapSamples =
      options.mapSamples ?? this.cobeOptions.mapSamples;
    this.cobeOptions.mapBrightness =
      options.mapBrightness ?? this.cobeOptions.mapBrightness;
    this.cobeOptions.mapBaseBrightness =
      options.mapBaseBrightness ?? this.cobeOptions.mapBaseBrightness;
    this.cobeOptions.baseColor =
      options.baseColor ?? this.cobeOptions.baseColor;
    this.cobeOptions.markerColor =
      options.markerColor ?? this.cobeOptions.markerColor;
    this.cobeOptions.glowColor =
      options.glowColor ?? this.cobeOptions.glowColor;
    this.cobeOptions.markers = options.markers ?? this.cobeOptions.markers;
    this.cobeOptions.diffuse = options.diffuse ?? this.cobeOptions.diffuse;
    this.cobeOptions.devicePixelRatio =
      options.devicePixelRatio ?? this.cobeOptions.devicePixelRatio;
    this.cobeOptions.dark = options.dark ?? this.cobeOptions.dark;
    this.cobeOptions.opacity = options.opacity ?? this.cobeOptions.opacity;
    this.cobeOptions.offset = options.offset ?? this.cobeOptions.offset;
    this.cobeOptions.scale = options.scale ?? this.cobeOptions.scale;
    this.cobeOptions.context = options.context ?? this.cobeOptions.context;
  }
}
