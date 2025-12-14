# Google Maps Location Visualizer

## Overview
Create a visual UI application that displays Google Maps and connects all location points in sequential order based on their ID values.

## Data Source
The application should use the `data/locations.json` file which contains location data with the following structure:

```json
{
    "locations": [
        {
            "id": "1",
            "latitude": 33.2055026885454,
            "longitude": -96.73003745710207
        },
        {
            "id": "2",
            "latitude": 33.19149753760681,
            "longitude": -96.73424316086881
        }
    ]
}
```

## Requirements

### Core Functionality
1. **Load Location Data**: Read and parse the `data/locations.json` file
2. **Display Google Maps**: Integrate Google Maps API to show an interactive map
3. **Plot Location Points**: Display markers for each location on the map
4. **Connect Points in Order**: Draw lines connecting all location points sequentially based on the `id` field (ascending order: id "1" → id "2" → id "3", etc.)

### Technical Specifications
- Sort locations by their `id` field (numerically or lexicographically)
- Create markers for each location using the provided latitude and longitude coordinates
- Draw a polyline connecting the locations in the sorted order
- Ensure the map viewport includes all location points

### Implementation Notes
- The order of connection is determined by the `locations.id` field
- Locations should be sorted before connecting (e.g., id "1" connects to id "2", id "2" connects to id "3", etc.)
- Use Google Maps JavaScript API for map rendering
- Consider using Google Maps Polyline or Directions API for connecting the points

## Expected Output
A web application that:
- Displays a Google Maps interface
- Shows markers at each location from the JSON file
- Draws connecting lines between locations in order of their ID values
- Provides an interactive map experience
