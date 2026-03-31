'use client'

import { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const mapContainerStyle = {
  width: '100%',
  height: '250px',
  borderRadius: '8px',
}

// Budapest központ alapértelmezettként
const defaultCenter = { lat: 47.4979, lng: 19.0402 }

interface MapPickerProps {
  lat?: number | null
  lng?: number | null
  onLocationSelect: (lat: number, lng: number) => void
}

export default function MapPicker({ lat, lng, onLocationSelect }: MapPickerProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '',
  })

  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
    lat && lng ? { lat, lng } : null
  )

  const center = marker || defaultCenter

  const handleClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newLat = e.latLng.lat()
      const newLng = e.latLng.lng()
      setMarker({ lat: newLat, lng: newLng })
      onLocationSelect(newLat, newLng)
    }
  }, [onLocationSelect])

  if (!isLoaded) {
    return <div className="w-full h-[250px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">Térkép betöltése...</div>
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
        onClick={handleClick}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
      <p className="text-xs text-gray-400 mt-1">
        {marker ? '📍 Helyszín kiválasztva — kattints máshova a módosításhoz' : 'Kattints a térképre a pontos helyszín megjelöléséhez'}
      </p>
    </div>
  )
}
