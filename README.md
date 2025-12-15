# Location Map Visualizer

A React application that displays locations on an interactive map using Leaflet and OpenStreetMap (free, no API key required).

## Features

- 📍 Displays location markers on an interactive map
- 🔗 Connects locations in order based on their ID
- 🗺️ Uses OpenStreetMap (free, no API key needed)
- ⚡ Built with React and Vite
- 🎨 Modern, responsive UI

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Data Source

The application reads location data from `data/locations.json`. The file structure:

```json
{
    "locations": [
        {
            "id": "1",
            "name": "Location 1",
            "latitude": 33.2055026885454,
            "longitude": -96.73003745710207
        }
    ]
}
```

Locations are automatically sorted by their `id` field and connected in order.

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technologies Used

- React 18
- Vite
- Leaflet & React-Leaflet
- OpenStreetMap tiles

