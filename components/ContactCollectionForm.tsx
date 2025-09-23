"use client"

import type React from "react"
import { useState } from "react"

interface ContactInfo {
  name: string
  email: string
  phone: string
  location: string
  linkedin: string
}

interface ContactCollectionFormProps {
  analysisResults: any
  onSubmit: (data: ContactInfo) => void
}

const ContactCollectionForm: React.FC<ContactCollectionFormProps> = ({ analysisResults, onSubmit }) => {
  const [formData, setFormData] = useState<ContactInfo>({
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("[v0] Contact submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isValid = formData.name && formData.email

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Almost Ready for Your Resume!</h2>
        <p className="text-gray-600">Just a few details needed to generate your personalized, job-targeted resume.</p>

        {/* Show assessment summary */}
        <div className="mt-4 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Your Assessment Results:</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-700">Overall Match:</span>
              <div className="font-medium">{analysisResults.overallMatch || "70%"}</div>
            </div>
            <div>
              <span className="text-blue-700">Qualification Level:</span>
              <div className="font-medium">{analysisResults.qualificationLevel || "Partially qualified"}</div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="John Smith"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="john.smith@email.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Dallas, TX"
          />
        </div>

        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn Profile
          </label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://linkedin.com/in/johnsmith"
          />
        </div>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`w-full py-4 px-6 rounded-lg font-medium text-lg transition-colors ${
            isValid && !isSubmitting
              ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Processing..." : "Continue to Resume Options →"}
        </button>
      </form>
    </div>
  )
}

export default ContactCollectionForm
