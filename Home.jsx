import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Home() {

  // Navigate between pages
  const navigate = useNavigate();

  // Stores uploaded file
  const [file, setFile] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(false);

  // File selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Upload function
  const uploadResume = async () => {

    // Validation
    if (!file) {
      alert("Please select a resume PDF");
      return;
    }

    // Start loading
    setLoading(true);

    // Create form data
    const formData = new FormData();

    formData.append("file", file);

    try {

      // Get API URL from environment or use default
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

      // Send request to backend
      const response = await fetch(
        `${apiUrl}/upload-resume`,
        {
          method: "POST",
          body: formData,
        }
      );

      // Convert to JSON
      const data = await response.json();

      // Navigate to results page
      navigate("/results", {
        state: {
          analysis: data.analysis,
        },
      });

    } catch (error) {

      console.error(error);

      alert("Error uploading resume");

    }

    // Stop loading
    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">
          AI Resume Analyzer
        </h1>

        {/* Sub heading */}
        <p className="text-center text-gray-500 mb-8">
          Upload your resume and get instant AI feedback
        </p>

        {/* Upload Box */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">

          {/* File Input */}
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="mb-4"
          />

          {/* Selected file */}
          {file && (
            <p className="text-green-600 font-medium mb-4">
              Selected: {file.name}
            </p>
          )}

          {/* Upload Button */}
          <button
            onClick={uploadResume}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
          >
            Upload Resume
          </button>

        </div>

        {/* Loading */}
        {loading && (

          <div className="mt-8 text-center">

            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>

            <p className="mt-4 text-gray-600">
              Analyzing Resume...
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default Home;