import { Input, Select } from 'antd'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const { Search } = Input
const { Option } = Select

const mockStudents = [
  {
    name: 'Hana Tesfaye',
    department: 'Software Engineering',
    year: '2025',
    uploadedAt: '2025-06-15T10:00:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=5',
    lastWords: 'Keep coding, stay curious. Peace out!',
  },
  {
    name: 'Abel Mekonnen',
    department: 'Civil Engineering',
    year: '2025',
    uploadedAt: '2025-06-14T09:00:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=10',
    lastWords: 'May your foundations be strong, literally.',
  },
  {
    name: 'Sara Amanuel',
    department: 'Electrical Engineering',
    year: '2024',
    uploadedAt: '2025-06-13T15:30:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=8',
    lastWords: 'Watt a journey it has been!',
  },
  {
    name: 'Dawit Yared',
    department: 'Software Engineering',
    year: '2025',
    uploadedAt: '2025-06-12T12:00:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=15',
    lastWords: 'Goodbye bugs, hello blessings.',
  },
]

const Gallery = () => {
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('')
  const [year, setYear] = useState('')
  const [sort, setSort] = useState('newest')
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    let data = [...mockStudents]

    if (search.trim()) {
      data = data.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.lastWords.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (department) {
      data = data.filter((s) => s.department === department)
    }

    if (year) {
      data = data.filter((s) => s.year === year)
    }

    if (sort === 'newest') {
      data.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
    } else {
      data.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFiltered(data)
  }, [search, department, year, sort])

  return (
    <div className="space-y-8 animate-fade-in p-4 md:p-6">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-primary"
      >
        🎓 Student Gallery
      </motion.h1>

      {/* 🔍 Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full max-w-7xl mx-auto">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block mb-2 text-xs uppercase tracking-wide font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-300 dark:border-gray-700 pb-1">
            Search
          </label>
          <Search
            placeholder="Search students..."
            allowClear
            enterButton
            onSearch={(value) => setSearch(value)}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
            classNames={{
              input:
                'bg-background text-text-primary border-border focus:border-primary',
              button: 'bg-button hover:bg-primary text-white border-border',
            }}
          />
        </div>

        {/* Department Filter */}
        <div>
          <label className="block mb-2 text-xs uppercase tracking-wide font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-300 dark:border-gray-700 pb-1">
            Department
          </label>
          <Select
            value={department}
            onChange={(value) => setDepartment(value)}
            placeholder="Select department"
            allowClear
            className="w-full [&_.ant-select-selector]:bg-background [&_.ant-select-selector]:text-text-primary [&_.ant-select-selector]:border-border [&_.ant-select-selector]:hover:border-primary [&_.ant-select-selector]:focus:border-primary"
            popupClassName="[&_.ant-select-item]:text-text-primary [&_.ant-select-item]:hover:bg-gray-100 dark:[&_.ant-select-item]:hover:bg-gray-700"
          >
            <Option value="Software Engineering">Software Engineering</Option>
            <Option value="Electrical Engineering">
              Electrical Engineering
            </Option>
            <Option value="Civil Engineering">Civil Engineering</Option>
          </Select>
        </div>

        {/* Year Filter */}
        <div>
          <label className="block mb-2 text-xs uppercase tracking-wide font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-300 dark:border-gray-700 pb-1">
            Year
          </label>
          <Select
            value={year}
            onChange={(value) => setYear(value)}
            placeholder="Select year"
            allowClear
            className="w-full [&_.ant-select-selector]:bg-background [&_.ant-select-selector]:text-text-primary [&_.ant-select-selector]:border-border [&_.ant-select-selector]:hover:border-primary [&_.ant-select-selector]:focus:border-primary"
            popupClassName="[&_.ant-select-item]:text-text-primary [&_.ant-select-item]:hover:bg-gray-100 dark:[&_.ant-select-item]:hover:bg-gray-700"
          >
            <Option value="2025">2025</Option>
            <Option value="2024">2024</Option>
          </Select>
        </div>

        {/* Sort */}
        <div>
          <label className="block mb-2 text-xs uppercase tracking-wide font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-300 dark:border-gray-700 pb-1">
            Sort By
          </label>
          <Select
            value={sort}
            onChange={(value) => setSort(value)}
            defaultValue="newest"
            className="w-full [&_.ant-select-selector]:bg-background [&_.ant-select-selector]:text-text-primary [&_.ant-select-selector]:border-border [&_.ant-select-selector]:hover:border-primary [&_.ant-select-selector]:focus:border-primary"
            popupClassName="[&_.ant-select-item]:text-text-primary [&_.ant-select-item]:hover:bg-gray-100 dark:[&_.ant-select-item]:hover:bg-gray-700"
          >
            <Option value="newest">Newest First</Option>
            <Option value="name">Name (A-Z)</Option>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {filtered.map((student, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="bg-card dark:bg-card-dark rounded-xl shadow-lg overflow-hidden transition-transform border border-border"
          >
            <img
              src={student.imageUrl}
              alt={student.name}
              className="w-full h-60 object-cover object-center hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-primary mb-1">
                {student.name}
              </h3>
              <p className="text-sm text-text-secondary italic">
                {student.department} - {student.year}
              </p>
              <p className="mt-2 text-text-secondary text-sm line-clamp-3">
                "{student.lastWords}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Gallery
