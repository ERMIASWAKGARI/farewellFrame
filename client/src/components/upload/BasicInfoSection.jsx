import { Listbox } from '@headlessui/react'
import {
  Building2Icon,
  ChevronDownIcon,
  GraduationCapIcon,
  UserIcon,
} from 'lucide-react'

const departments = [
  'Software Engineering',
  'Electrical Engineering',
  'Civil Engineering',
]

const years = ['2025', '2024', '2023']

const BasicInfoSection = ({ formData, handleChange }) => {
  const handleListboxChange = (field) => (value) => {
    handleChange({ target: { name: field, value } })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Full Name */}
      <div>
        <label className="flex items-center gap-2 text-sm md:text-base font-medium text-text-primary mb-1">
          <UserIcon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="off"
          className="w-full px-4 py-2 md:py-2.5 rounded-lg border border-border text-text-primary bg-background focus:ring-primary focus:border-primary text-sm md:text-base"
        />
      </div>

      {/* Department */}
      <div>
        <label className="flex items-center gap-2 text-sm md:text-base font-medium text-text-primary mb-1">
          <Building2Icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          Department *
        </label>
        <Listbox
          value={formData.department}
          onChange={handleListboxChange('department')}
        >
          <div className="relative">
            <Listbox.Button className="w-full px-4 py-2 md:py-2.5 rounded-lg border border-border bg-background text-text-primary text-left focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base">
              {formData.department || 'Select Department'}
              <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
            </Listbox.Button>
            <Listbox.Options className="absolute z-10 mt-1 w-full bg-background border border-border rounded-lg shadow-lg max-h-60 overflow-auto">
              {departments.map((dept) => (
                <Listbox.Option
                  key={dept}
                  value={dept}
                  className={({ active }) =>
                    `cursor-pointer px-4 py-2 ${
                      active ? 'bg-primary text-white' : 'text-text-primary'
                    }`
                  }
                >
                  {dept}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      {/* Year */}
      <div>
        <label className="flex items-center gap-2 text-sm md:text-base font-medium text-text-primary mb-1">
          <GraduationCapIcon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          Graduation Year *
        </label>
        <Listbox value={formData.year} onChange={handleListboxChange('year')}>
          <div className="relative">
            <Listbox.Button className="w-full px-4 py-2 md:py-2.5 rounded-lg border border-border bg-background text-text-primary text-left focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base">
              {formData.year || 'Select Year'}
              <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
            </Listbox.Button>
            <Listbox.Options className="absolute z-10 mt-1 w-full bg-background border border-border rounded-lg shadow-lg max-h-60 overflow-auto">
              {years.map((year) => (
                <Listbox.Option
                  key={year}
                  value={year}
                  className={({ active }) =>
                    `cursor-pointer px-4 py-2 ${
                      active ? 'bg-primary text-white' : 'text-text-primary'
                    }`
                  }
                >
                  {year}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
    </div>
  )
}

export default BasicInfoSection
