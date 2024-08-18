import { Marker } from "cobe";

export type GlobeOptions = {
    width?: number;
    height?: number;
    phi?: number;
    theta?: number;
    mapSamples?: number;
    mapBrightness?: number;

    mapBaseBrightness?: number;

    baseColor?: [number, number, number];
    markerColor?: [number, number, number];
    glowColor?: [number, number, number];
    markers?: Marker[];
    diffuse?: number;
    devicePixelRatio?: number;
    dark?: number;

    opacity?: number;
    offset?: [number, number];
    scale?: number;
    context?: WebGLContextAttributes;
}

export type COBEOptionsPart = {
    width: number;
    height: number;
    phi: number;
    theta: number;
    mapSamples: number;
    mapBrightness: number;
    mapBaseBrightness?: number;
    baseColor: [number, number, number];
    markerColor: [number, number, number];
    glowColor: [number, number, number];
    markers: Marker[];
    diffuse: number;
    devicePixelRatio: number;
    dark: number;
    opacity?: number;
    offset?: [number, number];
    scale?: number;
    context?: WebGLContextAttributes;
}