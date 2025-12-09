const sampleProjects = [
  {
    id: "p1",
    name: "Consultation",
    description: "Project Name, Location",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
    category: "Consultation",
  },
  {
    id: "p2",
    name: "Design",
    description: "Project Name, Location",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80",
    category: "Design",
  },
  {
    id: "p3",
    name: "Marketing & Design",
    description: "Project Name, Location",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80",
    category: "Marketing",
  },
  {
    id: "p4",
    name: "Consultation & Marketing",
    description: "Project Name, Location",
    image:
      "https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=600&q=80",
    category: "Marketing",
  },
  {
    id: "p5",
    name: "Consultation",
    description: "Project Name, Location",
    image:
      "https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=600&q=80",
    category: "Consultation",
  },
];

const sampleClients = [
  {
    id: "c1",
    name: "Rowhan Smith",
    designation: "CEO, Forexcore",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    image:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "c2",
    name: "Shipra Kayak",
    designation: "Brand Designer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "c3",
    name: "John Lepore",
    designation: "CEO, Forexcore",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "c4",
    name: "Marry Freeman",
    designation: "Marketing Manager at Mint",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "c5",
    name: "Lucy",
    designation: "Sales Rep at Altaba",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
];

const projects = [...sampleProjects];
const clients = [...sampleClients];
const contactForms = [];
const subscribers = [];

const uid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;

export const dataStore = {
  getProjects: () => [...projects],
  addProject: ({ name, description, image, category }) => {
    const entry = {
      id: uid(),
      name: name?.trim() || "Untitled Project",
      description: description?.trim() || "",
      image:
        image?.trim() ||
        "https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=600&q=80",
      category: category?.trim() || "General",
    };
    projects.unshift(entry);
    return entry;
  },

  // In your lib/data.js
deleteProject: (id) => {
  console.log("dataStore.deleteProject called with ID:", id);
  
  const index = projects.findIndex(p => {
    console.log("Checking project:", p.id, "against:", id);
    return p.id === id;
  });
  
  console.log("Found index:", index);
  
  if (index === -1) {
    console.log("Project not found with ID:", id);
    throw new Error("Project not found");
  }
  
  console.log("Deleting project at index", index, ":", projects[index]);
  
  const deletedProject = projects.splice(index, 1)[0];
  
  console.log("After deletion, projects length:", projects.length);
  
  return deletedProject;
},

  getClients: () => [...clients],
  addClient: ({ name, designation, description, image }) => {
    const entry = {
      id: uid(),
      name: name?.trim() || "New Client",
      designation: designation?.trim() || "Client",
      description:
        description?.trim() ||
        "We value long-term partnerships and measurable outcomes.",
      image:
        image?.trim() ||
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=300&q=80",
    };
    clients.unshift(entry);
    return entry;
  },

  getContacts: () => [...contactForms],
  addContact: ({ fullName, email, phone, city }) => {
    const entry = {
      id: uid(),
      fullName: fullName?.trim() || "Anonymous",
      email: email?.trim() || "unknown@example.com",
      phone: phone?.trim() || "N/A",
      city: city?.trim() || "N/A",
      createdAt: new Date().toISOString(),
    };
    contactForms.unshift(entry);
    return entry;
  },

  getSubscribers: () => [...subscribers],
  addSubscriber: (email) => {
    const normalized = email?.trim().toLowerCase();
    if (!normalized) {
      throw new Error("Email is required");
    }
    const exists = subscribers.find((s) => s.email === normalized);
    if (exists) {
      return exists;
    }
    const entry = { id: uid(), email: normalized, createdAt: new Date().toISOString() };
    subscribers.unshift(entry);
    return entry;
  },
};
