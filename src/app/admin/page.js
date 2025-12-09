"use client";

import { useEffect, useState } from "react";
import { 
  FaTrash, 
  FaEdit, 
  FaEye, 
  FaUpload, 
  FaSave, 
  FaTimes,
  FaSignOutAlt,
  FaHome
} from "react-icons/fa";

// Helper function for API calls
const fetchJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Request failed");
  return res.json();
};

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Forms state
  const [projectForm, setProjectForm] = useState({
    id: "",
    name: "",
    description: "",
    image: "",
    category: "",
    file: null,
    isEditing: false
  });
  const [clientForm, setClientForm] = useState({
    id: "",
    name: "",
    designation: "",
    description: "",
    image: "",
    file: null,
    isEditing: false
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [activeTab, setActiveTab] = useState("projects"); // projects, clients, contacts, subscribers

  // Image cropping state
  const [showCropModal, setShowCropModal] = useState(false);
  const [cropImage, setCropImage] = useState(null);
  const [cropType, setCropType] = useState(""); // "project" or "client"

  // Check login on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
      loadData();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple hardcoded login - you should implement proper auth in production
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
      localStorage.setItem("adminLoggedIn", "true");
      loadData();
      setMessage({ type: "success", text: "Login successful!" });
    } else {
      setMessage({ type: "error", text: "Invalid credentials" });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminLoggedIn");
    setMessage({ type: "success", text: "Logged out successfully" });
    
    // Redirect to home page after 1 second
    setTimeout(() => {
      window.location.href = "/";
    },0);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const [p, c, ct, s] = await Promise.all([
        fetchJson("/api/projects"),
        fetchJson("/api/clients"),
        fetchJson("/api/contact"),
        fetchJson("/api/subscribe"),
      ]);
      setProjects(p.projects || []);
      setClients(c.clients || []);
      setContacts(ct.contacts || []);
      setSubscribers(s.subscribers || []);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to load data. Please refresh." });
    } finally {
      setLoading(false);
    }
  };

  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Project CRUD Operations
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });
    
    try {
      let image = projectForm.image;
      if (projectForm.file) {
        image = await fileToDataUrl(projectForm.file);
      }

      const url = "/api/projects";
      const method = projectForm.isEditing ? "PUT" : "POST";
      
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...projectForm, image }),
      });

      setProjectForm({
        id: "",
        name: "",
        description: "",
        image: "",
        category: "",
        file: null,
        isEditing: false
      });
      
      await loadData();
      setMessage({ 
        type: "success", 
        text: projectForm.isEditing ? "Project updated!" : "Project added!" 
      });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to save project" });
    } finally {
      setSaving(false);
    }
  };

  const handleEditProject = (project) => {
    setProjectForm({
      id: project.id,
      name: project.name,
      description: project.description,
      image: project.image,
      category: project.category || "",
      file: null,
      isEditing: true
    });
    setActiveTab("projects");
  };

  // const handleDeleteProject = async (id) => {
  //   if (!confirm("Are you sure you want to delete this project?")) return;
    
  //   try {
  //     await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
  //     await loadData();
  //     setMessage({ type: "success", text: "Project deleted!" });
  //   } catch (error) {
  //     setMessage({ type: "error", text: "Failed to delete project" });
  //   }
  // };


  const handleDeleteProject = async (id) => {
    console.log("handleDeleteProject called with ID:", id);
    
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    try {
      console.log("Sending DELETE request to /api/projects?id=" + id);
      
      const response = await fetch(`/api/projects?id=${id}`, { 
        method: "DELETE" 
      });
      
      console.log("DELETE response status:", response.status);
      
      const data = await response.json();
      console.log("DELETE response data:", data);
      
      if (response.ok && data.success) {
        console.log("DELETE successful, reloading data...");
        await loadData();
        setMessage({ type: "success", text: data.message || "Project deleted!" });
      } else {
        console.log("DELETE failed:", data.message);
        setMessage({ type: "error", text: data.message || "Failed to delete project" });
      }
    } catch (error) {
      console.error("DELETE error:", error);
      setMessage({ type: "error", text: "Network error. Failed to delete project" });
    }
  };

  

  // Client CRUD Operations
  const handleClientSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });
    
    try {
      let image = clientForm.image;
      if (clientForm.file) {
        image = await fileToDataUrl(clientForm.file);
      }

      const url = "/api/clients";
      const method = clientForm.isEditing ? "PUT" : "POST";
      
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...clientForm, image }),
      });

      setClientForm({
        id: "",
        name: "",
        designation: "",
        description: "",
        image: "",
        file: null,
        isEditing: false
      });
      
      await loadData();
      setMessage({ 
        type: "success", 
        text: clientForm.isEditing ? "Client updated!" : "Client added!" 
      });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to save client" });
    } finally {
      setSaving(false);
    }
  };

  const handleEditClient = (client) => {
    setClientForm({
      id: client.id,
      name: client.name,
      designation: client.designation,
      description: client.description,
      image: client.image,
      file: null,
      isEditing: true
    });
    setActiveTab("clients");
  };

  const handleDeleteClient = async (id) => {
    if (!confirm("Are you sure you want to delete this client?")) return;
    
    try {
      await fetch(`/api/clients?id=${id}`, { method: "DELETE" });
      await loadData();
      setMessage({ type: "success", text: "Client deleted!" });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to delete client" });
    }
  };

  // Image Cropping Functions
  const handleImageUpload = (file, type) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setCropImage(e.target.result);
      setCropType(type);
      setShowCropModal(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedImage) => {
    if (cropType === "project") {
      setProjectForm(prev => ({ ...prev, image: croppedImage, file: null }));
    } else {
      setClientForm(prev => ({ ...prev, image: croppedImage, file: null }));
    }
    setShowCropModal(false);
    setCropImage(null);
  };

  // Login Form
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                <span className="text-2xl font-bold text-white">A</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
              <p className="text-gray-600">Enter your credentials to access the admin panel</p>
            </div>

            {message.text && (
              <div className={`mb-4 p-3 rounded-lg ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black"
                  placeholder="Enter password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition-all"
              >
                Sign In
              </button>

              <div className="text-center text-sm text-black text-[20px]">
                <p>Demo credentials:</p>
                <p className="font-mono">username: admin <br></br> password: admin123</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold">N</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                  <p className="text-xs text-gray-500">NexaSphere Technologies</p>
                </div>
              </div>
              
              {/* Navigation Tabs */}
              <nav className="hidden md:flex items-center space-x-1">
                <button
                  onClick={() => setActiveTab("projects")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "projects"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Projects
                </button>
                <button
                  onClick={() => setActiveTab("clients")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "clients"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Clients
                </button>
                <button
                  onClick={() => setActiveTab("contacts")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "contacts"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Contacts
                </button>
                <button
                  onClick={() => setActiveTab("subscribers")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "subscribers"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Subscribers
                </button>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FaHome className="mr-2" />
                View Site
              </a>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'error' 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            <div className="flex items-center justify-between">
              <span>{message.text}</span>
              <button onClick={() => setMessage({ type: "", text: "" })}>
                <FaTimes className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        <div className="md:hidden mb-6">
          <div className="grid grid-cols-4 gap-2">
            {["projects", "clients", "contacts", "subscribers"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 text-xs font-medium rounded-lg capitalize ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Projects Management */}
          {activeTab === "projects" && (
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {projectForm.isEditing ? "Edit Project" : "Add New Project"}
                </h2>
                
                <form onSubmit={handleProjectSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Name *
                      </label>
                      <input
                        type="text"
                        value={projectForm.name}
                        onChange={(e) => setProjectForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black"
                        placeholder="Enter project name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <input
                        type="text"
                        value={projectForm.category}
                        onChange={(e) => setProjectForm(p => ({ ...p, category: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black"
                        placeholder="e.g., Web Development, Design"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={projectForm.description}
                      onChange={(e) => setProjectForm(p => ({ ...p, description: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black"
                      placeholder="Enter project description"
                      rows="3"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={projectForm.image}
                      onChange={(e) => setProjectForm(p => ({ ...p, image: e.target.value, file: null }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Image (Optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files[0], "project")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black"
                    />
                    {projectForm.file && (
                      <p className="mt-2 text-sm text-gray-500">
                        File selected: {projectForm.file.name}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    {projectForm.isEditing && (
                      <button
                        type="button"
                        onClick={() => setProjectForm({
                          id: "",
                          name: "",
                          description: "",
                          image: "",
                          category: "",
                          file: null,
                          isEditing: false
                        })}
                        className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-black"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {saving ? "Saving..." : projectForm.isEditing ? "Update Project" : "Add Project"}
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Projects List */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">Projects ({projects.length})</h3>
                    <span className="text-sm text-gray-500">
                      {loading ? "Loading..." : ""}
                    </span>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {projects.map((project) => (
                        <tr key={project.id}>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  src={project.image}
                                  alt={project.name}
                                  className="h-10 w-10 rounded-lg object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {project.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                              {project.category || "Uncategorized"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                            {project.description}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditProject(project)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDeleteProject(project.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Clients Management */}
          {activeTab === "clients" && (
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {clientForm.isEditing ? "Edit Client" : "Add New Client"}
                </h2>
                
                <form onSubmit={handleClientSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Client Name *
                      </label>
                      <input
                        type="text"
                        value={clientForm.name}
                        onChange={(e) => setClientForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black"
                        placeholder="Enter client name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Designation *
                      </label>
                      <input
                        type="text"
                        value={clientForm.designation}
                        onChange={(e) => setClientForm(p => ({ ...p, designation: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black"
                        placeholder="e.g., CEO, Web Developer"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Testimonial *
                    </label>
                    <textarea
                      value={clientForm.description}
                      onChange={(e) => setClientForm(p => ({ ...p, description: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black"
                      placeholder="Enter client testimonial"
                      rows="3"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={clientForm.image}
                      onChange={(e) => setClientForm(p => ({ ...p, image: e.target.value, file: null }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Image (Optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files[0], "client")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black"
                    />
                    {clientForm.file && (
                      <p className="mt-2 text-sm text-gray-500">
                        File selected: {clientForm.file.name}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    {clientForm.isEditing && (
                      <button
                        type="button"
                        onClick={() => setClientForm({
                          id: "",
                          name: "",
                          designation: "",
                          description: "",
                          image: "",
                          file: null,
                          isEditing: false
                        })}
                        className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {saving ? "Saving..." : clientForm.isEditing ? "Update Client" : "Add Client"}
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Clients List */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">Clients ({clients.length})</h3>
                    <span className="text-sm text-gray-500">
                      {loading ? "Loading..." : ""}
                    </span>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Testimonial</th>
                        <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {clients.map((client) => (
                        <tr key={client.id}>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  src={client.image}
                                  alt={client.name}
                                  className="h-10 w-10 rounded-full object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {client.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-900">
                              {client.designation}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                            {client.description}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditClient(client)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDeleteClient(client.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Contacts Management */}
          {activeTab === "contacts" && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Contact Form Submissions ({contacts.length})</h3>
                  <span className="text-sm text-gray-500">
                    {loading ? "Loading..." : "Read-only"}
                  </span>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {contacts.map((contact) => (
                      <tr key={contact.id}>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {contact.fullName}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {contact.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {contact.phone}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {contact.city}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Subscribers Management */}
          {activeTab === "subscribers" && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Newsletter Subscribers ({subscribers.length})</h3>
                  <span className="text-sm text-gray-500">
                    {loading ? "Loading..." : "Read-only"}
                  </span>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Subscribed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {subscribers.map((subscriber) => (
                      <tr key={subscriber.id}>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {subscriber.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(subscriber.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}