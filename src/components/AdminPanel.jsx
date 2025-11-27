import { useState, useEffect } from 'react'
import EditModal from './EditModal'

const API_URL = 'http://localhost:5000/api'

function AdminPanel() {
  const [feedbacks, setFeedbacks] = useState([])
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    status: '',
    division: '',
    search: ''
  })
  const [editingFeedback, setEditingFeedback] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)

  const divisions = ['LnT', 'EEO', 'PR', 'HRD', 'RnD']
  const statuses = ['open', 'in-review', 'resolved']

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [feedbacks, filters])

  const fetchFeedbacks = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/feedback`)
      if (!response.ok) throw new Error('Failed to fetch feedbacks')
      const data = await response.json()
      setFeedbacks(data)
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...feedbacks]

    if (filters.status) {
      filtered = filtered.filter(f => f.status === filters.status)
    }

    if (filters.division) {
      filtered = filtered.filter(f => f.division === filters.division)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(f =>
        f.name.toLowerCase().includes(searchLower) ||
        f.email.toLowerCase().includes(searchLower) ||
        f.eventName.toLowerCase().includes(searchLower) ||
        (f.comment && f.comment.toLowerCase().includes(searchLower)) ||
        (f.suggestion && f.suggestion.toLowerCase().includes(searchLower))
      )
    }

    setFilteredFeedbacks(filtered)
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/feedback/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (!response.ok) throw new Error('Failed to update status')

      setFeedbacks(prev =>
        prev.map(f => (f.id === id ? { ...f, status: newStatus } : f))
      )
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/feedback/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete feedback')

      setFeedbacks(prev => prev.filter(f => f.id !== id))
      setShowDeleteConfirm(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleUpdate = async (id, updates) => {
    try {
      const response = await fetch(`${API_URL}/feedback/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })

      if (!response.ok) throw new Error('Failed to update feedback')

      const updated = await response.json()
      setFeedbacks(prev =>
        prev.map(f => (f.id === id ? updated : f))
      )
      setEditingFeedback(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      open: 'bg-green-100 text-green-800 border-green-200',
      'in-review': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      resolved: 'bg-blue-100 text-blue-800 border-blue-200'
    }
    return badges[status] || badges.open
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStats = () => {
    return {
      total: feedbacks.length,
      open: feedbacks.filter(f => f.status === 'open').length,
      inReview: feedbacks.filter(f => f.status === 'in-review').length,
      resolved: feedbacks.filter(f => f.status === 'resolved').length,
      avgRating: feedbacks.length > 0
        ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
        : 0
    }
  }

  const stats = getStats()

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading feedbacks...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
        <p className="text-gray-600">Manage and review all feedback submissions</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Total</div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Open</div>
          <div className="text-2xl font-bold text-green-600">{stats.open}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">In Review</div>
          <div className="text-2xl font-bold text-yellow-600">{stats.inReview}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Resolved</div>
          <div className="text-2xl font-bold text-blue-600">{stats.resolved}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Avg Rating</div>
          <div className="text-2xl font-bold text-gray-900">{stats.avgRating} ★</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search name, email, event..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Division</label>
            <select
              name="division"
              value={filters.division}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Divisions</option>
              {divisions.map(div => (
                <option key={div} value={div}>{div}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitter
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Division
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFeedbacks.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No feedback found
                  </td>
                </tr>
              ) : (
                filteredFeedbacks.map((feedback) => (
                  <tr key={feedback.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{feedback.name}</div>
                      <div className="text-sm text-gray-500">{feedback.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{feedback.eventName}</div>
                      {feedback.comment && (
                        <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                          {feedback.comment}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                        {feedback.division}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-sm font-medium text-gray-900">{feedback.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={feedback.status}
                        onChange={(e) => handleStatusChange(feedback.id, e.target.value)}
                        className={`text-xs font-medium px-2 py-1 rounded border ${getStatusBadge(
                          feedback.status
                        )} cursor-pointer`}
                      >
                        {statuses.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(feedback.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => setEditingFeedback(feedback)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(feedback.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingFeedback && (
        <EditModal
          feedback={editingFeedback}
          onClose={() => setEditingFeedback(null)}
          onSave={handleUpdate}
          divisions={divisions}
        />
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this feedback? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel
