/* eslint-disable no-unused-vars */
import { Input, Select } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getAllFarewells } from '../features/farewell/farewellAPI'

const { Search } = Input
const { Option } = Select

const Gallery = () => {
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('Software Engineering')
  const [year, setYear] = useState('2025')
  const [sort, setSort] = useState('newest')
  const [filtered, setFiltered] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFarewells = async () => {
      try {
        setLoading(true)
        const response = await getAllFarewells()
        const transformedData = response.data.map((student) => ({
          ...student,
          images: student.images.map((img) => img.path),
          uploadedAt: student.createdAt,
        }))
        setStudents(transformedData)
        setFiltered(transformedData)
      } catch (err) {
        console.error('Error fetching farewells:', err)
        setError('Failed to load data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchFarewells()
  }, [])

  // Filter and sort logic
  useEffect(() => {
    if (!students.length) return

    let data = [...students]

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
  }, [search, department, year, sort, students])

  const openStudentModal = (student) => {
    setSelectedStudent(student)
    setCurrentImageIndex(0)
    document.body.style.overflow = 'hidden'
  }

  const closeStudentModal = () => {
    setSelectedStudent(null)
    document.body.style.overflow = 'auto'
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === selectedStudent.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedStudent.images.length - 1 : prev - 1
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div id="gallery" className="space-y-8 animate-fade-in p-4 md:p-6">
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
        {filtered.length > 0 ? (
          filtered.map((student, idx) => (
            <motion.div
              key={student._id || idx} // Use MongoDB _id if available
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.05, rotate: 0.5 }}
              transition={{ delay: idx * 0.05, duration: 0.6, ease: 'easeOut' }}
              className="relative bg-card dark:bg-card-dark rounded-xl shadow-2xl overflow-hidden border border-border group hover:border-primary transition-all duration-500 cursor-pointer"
              onClick={() => openStudentModal(student)}
            >
              {/* Image with multiple image indicator */}
              <div className="overflow-hidden relative">
                <img
                  src={student.images[0] || 'https://via.placeholder.com/300'}
                  alt={student.name}
                  className="w-full h-60 object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
                {student.images.length > 1 && (
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <span className="mr-1">+{student.images.length - 1}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 text-center space-y-2 relative">
                <h3 className="text-xl font-bold text-primary tracking-wide group-hover:text-accent transition-colors duration-300">
                  {student.name}
                </h3>
                <p className="text-sm text-text-secondary">
                  {student.department} - {student.year}
                </p>
                <p className="mt-2 text-text-secondary text-sm line-clamp-3 leading-relaxed italic">
                  "{student.lastWords}"
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-text-secondary">
              No students found matching your criteria
            </p>
          </div>
        )}
      </div>

      {/* Student Detail Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeStudentModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative bg-background dark:bg-background-dark rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeStudentModal}
                className="absolute top-4 right-4 z-10 bg-black/10 hover:bg-black/20 text-white rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Gallery Section */}
              <div className="md:w-1/2 h-64 md:h-auto relative bg-gray-100 dark:bg-gray-900 overflow-hidden">
                {/* Main Image */}
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={selectedStudent.images[currentImageIndex]}
                  alt={selectedStudent.name}
                  className="w-full h-full object-cover object-center"
                />

                {/* Navigation Arrows */}
                {selectedStudent.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        prevImage()
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10 transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        nextImage()
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10 transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Image Thumbnails */}
                {selectedStudent.images.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
                    {selectedStudent.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentImageIndex(idx)
                        }}
                        className={`w-10 h-10 rounded-md overflow-hidden border-2 transition-all ${
                          currentImageIndex === idx
                            ? 'border-primary scale-110'
                            : 'border-transparent hover:border-white/50'
                        }`}
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-primary">
                      {selectedStudent.name}
                    </h2>
                    <p className="text-lg text-text-secondary">
                      {selectedStudent.department} - {selectedStudent.year}
                    </p>
                  </div>

                  <div className="bg-primary/10 p-4 rounded-lg border-l-4 border-primary">
                    <p className="text-lg italic text-text-primary">
                      "{selectedStudent.lastWords}"
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      My Story
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {selectedStudent.story}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm uppercase tracking-wider text-text-secondary mb-3">
                      Graduated on{' '}
                      {new Date(
                        selectedStudent.uploadedAt
                      ).toLocaleDateString()}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        '#Graduation',
                        '#ClassOf2025',
                        '#ProudGrad',
                        '#AlumniLife',
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Gallery
