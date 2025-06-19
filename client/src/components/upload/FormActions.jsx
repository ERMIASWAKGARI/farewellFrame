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
      <Upload className="w-5 h-5 mr-2" />
      Review & Submit
    </button>
  </div>
)

export default FormActions
