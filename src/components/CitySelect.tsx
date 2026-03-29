'use client'

import { CITIES, BUDAPEST_DISTRICTS } from '@/lib/types'

interface CitySelectProps {
  city: string
  districts: string[]
  onCityChange: (city: string) => void
  onDistrictsChange: (districts: string[]) => void
  required?: boolean
}

export default function CitySelect({
  city,
  districts,
  onCityChange,
  onDistrictsChange,
  required = false,
}: CitySelectProps) {
  function toggleDistrict(district: string) {
    if (districts.includes(district)) {
      onDistrictsChange(districts.filter((d) => d !== district))
    } else {
      onDistrictsChange([...districts, district])
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        Város {required && '*'}
      </label>
      <select
        required={required}
        value={city}
        onChange={(e) => {
          onCityChange(e.target.value)
          if (e.target.value !== 'Budapest') {
            onDistrictsChange([])
          }
        }}
        className="w-full px-4 py-2.5 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white/10 text-white"
      >
        <option value="" className="bg-field-dark text-white">Válassz várost</option>
        {CITIES.map((c) => (
          <option key={c} value={c} className="bg-field-dark text-white">
            {c}
          </option>
        ))}
      </select>

      {city === 'Budapest' && (
        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Kerületek (több is választható)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-48 overflow-y-auto border border-white/20 rounded-lg p-3 bg-white/5">
            {BUDAPEST_DISTRICTS.map((d) => (
              <label
                key={d}
                className="flex items-center gap-2 cursor-pointer text-sm text-gray-300 hover:bg-white/10 rounded px-1.5 py-1"
              >
                <input
                  type="checkbox"
                  checked={districts.includes(d)}
                  onChange={() => toggleDistrict(d)}
                  className="rounded border-white/30 text-primary-500 focus:ring-primary-500 bg-white/10"
                />
                {d}
              </label>
            ))}
          </div>
          {districts.length > 0 && (
            <p className="text-xs text-gray-400 mt-1">
              Kiválasztva: {districts.join(', ')}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
