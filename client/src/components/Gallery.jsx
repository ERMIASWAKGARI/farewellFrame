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
    year: '2025',
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
  {
    name: 'Liya Daniel',
    department: 'Civil Engineering',
    year: '2025',
    uploadedAt: '2025-06-12T08:30:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=20',
    lastWords: 'Bricks and blueprints, we out.',
  },
  {
    name: 'Robel Asnake',
    department: 'Electrical Engineering',
    year: '2025',
    uploadedAt: '2025-06-11T11:00:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=22',
    lastWords: 'Current status: graduated ⚡',
  },
  {
    name: 'Meron Haile',
    department: 'Software Engineering',
    year: '2025',
    uploadedAt: '2025-06-10T10:45:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=3',
    lastWords: 'import Future from "life"; export default Me;',
  },
  {
    name: 'Nahom Tadesse',
    department: 'Civil Engineering',
    year: '2025',
    uploadedAt: '2025-06-10T09:00:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=14',
    lastWords: 'Concrete dreams built.',
  },
  {
    name: 'Bethel Mulu',
    department: 'Electrical Engineering',
    year: '2025',
    uploadedAt: '2025-06-09T17:00:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=9',
    lastWords: 'Shockingly good times. 🔌',
  },
  {
    name: 'Yohannes Desta',
    department: 'Software Engineering',
    year: '2025',
    uploadedAt: '2025-06-09T14:30:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=27',
    lastWords: 'From 404s to dreams found.',
  },
  {
    name: 'Selam Habte',
    department: 'Civil Engineering',
    year: '2025',
    uploadedAt: '2025-06-08T16:00:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=12',
    lastWords: 'We laid the groundwork. Now we soar.',
  },
  {
    name: 'Daniel Girma',
    department: 'Electrical Engineering',
    year: '2025',
    uploadedAt: '2025-06-08T12:00:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=19',
    lastWords: 'Resistance was futile, I graduated.',
  },
  {
    name: 'Rediet Worku',
    department: 'Software Engineering',
    year: '2025',
    uploadedAt: '2025-06-07T10:00:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=7',
    lastWords:
      'Just a girl standing in front of a terminal asking it to compile.',
  },
  {
    name: 'Kaleab Fikre',
    department: 'Civil Engineering',
    year: '2025',
    uploadedAt: '2025-06-06T13:00:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=23',
    lastWords: 'Blueprints in hand, I walk into the future.',
  },
  {
    name: 'Feven Alemu',
    department: 'Electrical Engineering',
    year: '2025',
    uploadedAt: '2025-06-05T11:30:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=26',
    lastWords: 'Voltage, vibes, and victory.',
  },
  {
    name: 'Mikiyas Terefe',
    department: 'Software Engineering',
    year: '2025',
    uploadedAt: '2025-06-05T09:00:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=17',
    lastWords: 'Ctrl + Alt + Graduate.',
  },
  {
    name: 'Saron Mekbib',
    department: 'Civil Engineering',
    year: '2025',
    uploadedAt: '2025-06-04T16:00:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=2',
    lastWords: 'Bridges crossed, tunnels explored.',
  },
  {
    name: 'Eyob Melaku',
    department: 'Electrical Engineering',
    year: '2025',
    uploadedAt: '2025-06-03T14:30:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=29',
    lastWords: 'AC or DC, I’m free either way.',
  },
  {
    name: 'Hiwot Kebede',
    department: 'Software Engineering',
    year: '2025',
    uploadedAt: '2025-06-02T15:00:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=11',
    lastWords: 'console.log("Goodbye, world");',
  },
  {
    name: 'Samuel Bekele',
    department: 'Civil Engineering',
    year: '2025',
    uploadedAt: '2025-06-01T18:00:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=16',
    lastWords: 'The road ends here — and begins again.',
  },
  {
    name: 'Mahlet Girma',
    department: 'Electrical Engineering',
    year: '2025',
    uploadedAt: '2025-05-31T10:00:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=6',
    lastWords: 'Wired for greatness.',
  },
  {
    name: 'Yonatan Lemma',
    department: 'Software Engineering',
    year: '2025',
    uploadedAt: '2025-05-30T13:00:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=4',
    lastWords: 'Less stress, more success.',
  },
  {
    name: 'Rahel Tsegaye',
    department: 'Civil Engineering',
    year: '2025',
    uploadedAt: '2025-05-29T12:30:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=1',
    lastWords: 'From concrete to completion.',
  },
  {
    name: 'Biniam Zewdu',
    department: 'Electrical Engineering',
    year: '2025',
    uploadedAt: '2025-05-28T17:00:00Z',
    imageUrl: 'https://i.pravatar.cc/300?img=13',
    lastWords: 'Graduated without a short circuit.',
  },
]

const Gallery = () => {
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('Software Engineering')
  const [year, setYear] = useState('2025')
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
        🎓 Gallery
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
        {' '}
        {filtered.map((student, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.05, rotate: 0.5 }}
            transition={{ delay: idx * 0.05, duration: 0.6, ease: 'easeOut' }}
            className="relative bg-card dark:bg-card-dark rounded-xl shadow-2xl overflow-hidden border border-border group hover:border-primary transition-all duration-500"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={student.imageUrl}
                alt={student.name}
                className="w-full h-60 object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-in-out"
              />
            </div>

            {/* Content */}
            <div className="p-4 text-center space-y-2 relative">
              <h3 className="text-xl font-bold text-primary tracking-wide group-hover:text-accent transition-colors duration-300">
                {student.name}
              </h3>

              <p className="mt-2 text-text-secondary text-sm line-clamp-3 leading-relaxed">
                “{student.lastWords}”
              </p>

              {/* Glow border overlay */}
              <div className="absolute inset-0 rounded-xl pointer-events-none group-hover:shadow-[0_0_20px_3px_rgba(255,165,0,0.3)] transition duration-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Gallery
