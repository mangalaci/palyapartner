'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Script from 'next/script'
import { CITY_COORDS } from '@/lib/types'

interface MapPickerProps {
  lat?: number | null
  lng?: number | null
  city?: string
  onLocationSelect: (lat: number, lng: number) => void
  readOnly?: boolean
}

export default function MapPicker({ lat, lng, city, onLocationSelect, readOnly }: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markerRef = useRef<any>(null)
  const callbackRef = useRef(onLocationSelect)
  const [leafletReady, setLeafletReady] = useState(false)

  // Keep callback ref up to date without re-initializing map
  callbackRef.current = onLocationSelect

  const initMap = useCallback(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const L = (window as any).L
    if (!L) return

    const cityCenter = city ? CITY_COORDS[city] : null
    const centerLat = lat || cityCenter?.lat || 47.4979
    const centerLng = lng || cityCenter?.lng || 19.0402

    const map = L.map(mapRef.current).setView([centerLat, centerLng], 13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
    }).addTo(map)

    if (lat && lng) {
      markerRef.current = L.marker([lat, lng]).addTo(map)
    }

    if (!readOnly) {
      map.on('click', (e: any) => {
        const { lat: newLat, lng: newLng } = e.latlng
        if (markerRef.current) {
          markerRef.current.setLatLng([newLat, newLng])
        } else {
          markerRef.current = L.marker([newLat, newLng]).addTo(map)
        }
        callbackRef.current(newLat, newLng)
      })
    }

    mapInstanceRef.current = map

    // Fix tile rendering after container becomes visible
    setTimeout(() => map.invalidateSize(), 100)
  }, [lat, lng, readOnly, city])

  // Pan to new city when city changes
  useEffect(() => {
    if (!mapInstanceRef.current || !city) return
    const coords = CITY_COORDS[city]
    if (!coords) return
    // Only pan if there's no pin placed yet
    if (!markerRef.current) {
      mapInstanceRef.current.setView([coords.lat, coords.lng], 13)
    }
  }, [city])

  // Initialize when Leaflet is ready
  useEffect(() => {
    if (leafletReady) {
      initMap()
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        markerRef.current = null
      }
    }
  }, [leafletReady, initMap])

  // Check if Leaflet is already loaded (e.g. navigating between pages)
  useEffect(() => {
    if ((window as any).L) {
      setLeafletReady(true)
    }
  }, [])

  return (
    <div>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        strategy="afterInteractive"
        onLoad={() => setLeafletReady(true)}
      />
      <div
        ref={mapRef}
        style={{ width: '100%', height: '250px', borderRadius: '8px', zIndex: 0 }}
      />
      {!readOnly && (
        <p className="text-xs text-gray-400 mt-1">
          {lat && lng
            ? 'Helyszín kiválasztva — kattints máshova a módosításhoz'
            : 'Kattints a térképre a pontos helyszín megjelöléséhez'}
        </p>
      )}
    </div>
  )
}
