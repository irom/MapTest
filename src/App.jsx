import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

function App() {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const response = await fetch('/data/locations.json')
        if (!response.ok) {
          throw new Error(`Failed to load locations: ${response.status}`)
        }
        const data = await response.json()
        
        if (!data.locations || !Array.isArray(data.locations)) {
          throw new Error('Invalid JSON structure: locations array not found')
        }

        // Sort locations by id
        const sortedLocations = [...data.locations].sort((a, b) => {
          const idA = a.id !== undefined ? a.id : ''
          const idB = b.id !== undefined ? b.id : ''
          const numA = parseFloat(idA)
          const numB = parseFloat(idB)
          
          if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB
          }
          return String(idA).localeCompare(String(idB))
        })

        setLocations(sortedLocations)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    loadLocations()
  }, [])

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#667eea'
      }}>
        Loading locations...
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        background: '#ffebee',
        color: '#c62828',
        padding: '2rem',
        margin: '2rem',
        borderRadius: '4px',
        borderLeft: '4px solid #c62828'
      }}>
        Error: {error}
      </div>
    )
  }

  if (locations.length === 0) {
    return (
      <div style={{
        background: '#fff3cd',
        color: '#856404',
        padding: '2rem',
        margin: '2rem',
        borderRadius: '4px',
        borderLeft: '4px solid #ffc107'
      }}>
        No locations found in the data file.
      </div>
    )
  }

  // Calculate center point
  const centerLat = locations.reduce((sum, loc) => sum + loc.latitude, 0) / locations.length
  const centerLng = locations.reduce((sum, loc) => sum + loc.longitude, 0) / locations.length

  // Create polyline coordinates
  const polylineCoords = locations.map(loc => [loc.latitude, loc.longitude])

  // Create custom markers with numbers
  const createCustomIcon = (id) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        background: #667eea;
        color: white;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">${id}</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '1.5rem',
        textAlign: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 600 }}>Location Map Visualizer</h1>
      </header>
      
      <div style={{ flex: 1, position: 'relative' }}>
        <MapContainer
          center={[centerLat, centerLng]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {locations.map((location, index) => (
            <Marker
              key={location.id || index}
              position={[location.latitude, location.longitude]}
              icon={createCustomIcon(location.id || index + 1)}
            >
              <Popup>
                <div style={{ padding: '8px' }}>
                  <strong>{location.name || `Location ${location.id || index + 1}`}</strong><br />
                  ID: {location.id !== undefined ? location.id : 'N/A'}<br />
                  Coordinates: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                </div>
              </Popup>
            </Marker>
          ))}
          
          {polylineCoords.length > 1 && (
            <Polyline
              positions={polylineCoords}
              pathOptions={{
                color: '#667eea',
                weight: 4,
                opacity: 0.8
              }}
            />
          )}
        </MapContainer>
      </div>

      <div style={{
        background: 'white',
        padding: '1rem',
        borderTop: '1px solid #e0e0e0',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.05)'
      }}>
        <p style={{ margin: 0, color: '#333' }}>
          Total locations displayed: {locations.length}
        </p>
      </div>
    </div>
  )
}

export default App

