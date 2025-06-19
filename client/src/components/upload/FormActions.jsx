import { Upload } from 'lucide-react'

const FormActions = ({ uploading, isValid, onCancel }) => (
  <div className="flex justify-end gap-4 pt-4">
    <button
      type="button"
      onClick={onCancel}
      className="px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors"
    >
      Cancel
    </button>
    <button
      type="submit"
      disabled={uploading || !isValid}
      className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-white  bg-orange-500 hover:bg-orange-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
    >
      <Upload className="w-5 h-5 mr-2" />
      Review & Submit
    </button>
  </div>
)

export default FormActions
