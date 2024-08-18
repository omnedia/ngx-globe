## ngx-globe

`@omnedia/ngx-globe` is an Angular library that provides an interactive 3D globe visualization. The globe is rendered using the cobe library, allowing for smooth animations, rotation, and customizable markers. This component is highly configurable, making it ideal for displaying geographic data or adding a dynamic visual element to your Angular application.

## Features

- Interactive 3D globe visualization with customizable rotation and markers.
- Customizable globe size, colors, and appearance.
- Smooth animation using the cobe library for rendering and rotation.
- Lightweight and easy to integrate as a standalone component.

## Installation

Install the library and its peer dependency using npm:

```bash
npm install @omnedia/ngx-globe
npm install cobe --save
```

cobe is required as a peer dependency for this library to function properly.

## Usage

Import the `NgxGlobeComponent` in your Angular module or component:

```typescript
import { NgxGlobeComponent } from '@omnedia/ngx-globe';

@Component({
  ...
  imports: [
    ...
    NgxGlobeComponent,
  ],
  ...
})
```

Use the component in your template:

```html
<om-globe
  [rotationSpeed]="0.002"
  [globeSize]="800"
  [globeOptions]="{
    markers: [{ location: [34.0522, -118.2437], size: 0.1 }],
    baseColor: [0.5, 0.5, 1],
    glowColor: [1, 0.5, 0.5],
    markerColor: [0, 1, 0]
  }"
  styleClass="custom-globe-class"
></om-globe>
```

## API

```html
<om-globe
  [rotationSpeed]="rotationSpeed"
  [globeSize]="globeSize"
  [globeOptions]="globeOptions"
  styleClass="your-custom-class"
>
</om-globe>
```

- rotationSpeed (optional): The speed of the globe's rotation. Defaults to 0.005.
- globeSize (optional): The size of the globe in pixels. Defaults to 600px.
- globeOptions (optional): An object containing options for customizing the globe's appearance, such as marker locations, colors, and brightness.
- styleClass (optional): A custom CSS class to apply to the globe's wrapper element.

## Example

```html
<om-globe
  [rotationSpeed]="0.01"
  [globeSize]="500"
  [globeOptions]="{
    markers: [{ location: [51.5074, -0.1278], size: 0.1 }],
    baseColor: [0.2, 0.2, 1],
    markerColor: [1, 0.2, 0.2],
    glowColor: [0.9, 0.9, 0.9]
  }"
  styleClass="globe-custom-style"
></om-globe>
```

This will render a globe with a custom size, rotation speed, and marker at the specified location (London, UK).

## Globe Options

The globeOptions input allows you to configure various aspects of the globe's appearance and behavior:

- `markers`: An array of objects defining locations and sizes of markers on the globe. Each marker should have a location (an array of latitude and longitude) and a size (a number).
- `baseColor`: The color of the globe in the form of an RGB array (e.g., [1, 1, 1] for white).
- `glowColor`: The color of the globe's glow, also an RGB array.
- `markerColor`: The color of the markers on the globe, also an RGB array.
- `mapSamples`: Number of samples for the texture mapping.
- `mapBrightness`: Brightness of the map texture.
- `diffuse`: The intensity of the globe's diffuse lighting.

## Dependencies

This library uses the cobe npm package as a peer dependency to handle the rendering of the globe. Make sure to install it alongside this library for proper functionality.

```bash
npm install cobe --save
```

## Styling

To customize the appearance of the globe or container, use the styleClass input to apply your own CSS classes.

```css
.globe-custom-style {
  background-color: #000;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}
```

## Contributing

Contributions are welcome. Please submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the MIT License.