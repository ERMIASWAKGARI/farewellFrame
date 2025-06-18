import { Upload } from 'lucide-react'

const FormActions = ({ uploading, isValid, onCancel }) => (
  <div className="flex justify-end gap-4 pt-4">
    <button
      type="button"
      onClick={onCancel}
      className="px-6 py-2 border border-gray-300 rounded-lg text-text-primary hover:bg-gray-50"
    >
      Cancel
    </button>
    <button
      type="submit"
      disabled={uploading || !isValid}
      className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-white bg-button hover:bg-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
    >
      {uploading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Uploading...
        </>
      ) : (
        <>
          <Upload className="w-5 h-5 mr-2" />
          Submit
        </>
      )}
    </button>
  </div>
)

export default FormActions
