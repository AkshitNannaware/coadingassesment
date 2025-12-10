if (!global.appData) {
  global.appData = {
    projects: [
      {
        id: "p1",
        name: "Consultation",
        description: "Project Name, Location",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
        category: "Consultation",
      },
      {
        id: "p2",
        name: "Design",
        description: "Project Name, Location",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80",
        category: "Design",
      },
      {
        id: "p3",
        name: "Marketing & Design",
        description: "Project Name, Location",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80",
        category: "Marketing",
      },
      {
        id: "p4",
        name: "Consultation & Marketing",
        description: "Project Name, Location",
        image: "https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=600&q=80",
        category: "Marketing",
      },
      {
        id: "p5",
        name: "Consultation",
        description: "Project Name, Location",
        image: "https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=600&q=80",
        category: "Consultation",
      },
    ],
    clients: [
      {
        id: "c1",
        name: "Rowhan Smith",
        designation: "CEO, Forexcore",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "c2",
        name: "Shipra Kayak",
        designation: "Brand Designer",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "c3",
        name: "John Lepore",
        designation: "CEO, Forexcore",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "c4",
        name: "Marry Freeman",
        designation: "Marketing Manager at Mint",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
        image: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "c5",
        name: "Lucy",
        designation: "Sales Rep at Altaba",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      },
    ],
    contactForms: [],
    subscribers: []
  };
}

const uid = () => `id-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;

export const dataStore = {
  // PROJECT METHODS
  getProjects: () => [...global.appData.projects],
  addProject: (data) => {
    const project = {
      id: uid(),
      name: data.name || "Untitled Project",
      description: data.description || "",
      image: data.image || "https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=600&q=80",
      category: data.category || "General",
    };
    global.appData.projects.unshift(project);
    return project;
  },
  updateProject: (id, data) => {
    const index = global.appData.projects.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Project not found");
    
    global.appData.projects[index] = {
      ...global.appData.projects[index],
      ...data,
    };
    return global.appData.projects[index];
  },
  deleteProject: (id) => {
    const index = global.appData.projects.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Project not found");
    
    return global.appData.projects.splice(index, 1)[0];
  },

  // CLIENT METHODS
  getClients: () => [...global.appData.clients],
  addClient: (data) => {
    const client = {
      id: uid(),
      name: data.name || "New Client",
      designation: data.designation || "Client",
      description: data.description || "We value long-term partnerships and measurable outcomes.",
      image: data.image || "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=300&q=80",
    };
    global.appData.clients.unshift(client);
    return client;
  },
  updateClient: (id, data) => {
    const index = global.appData.clients.findIndex(c => c.id === id);
    if (index === -1) throw new Error("Client not found");
    
    global.appData.clients[index] = {
      ...global.appData.clients[index],
      ...data,
    };
    return global.appData.clients[index];
  },
  deleteClient: (id) => {
    const index = global.appData.clients.findIndex(c => c.id === id);
    if (index === -1) throw new Error("Client not found");
    
    return global.appData.clients.splice(index, 1)[0];
  },

  // CONTACT METHODS
  getContacts: () => [...global.appData.contactForms],
  addContact: (data) => {
    const contact = {
      id: uid(),
      fullName: data.fullName || "Anonymous",
      email: data.email || "unknown@example.com",
      phone: data.phone || "N/A",
      city: data.city || "N/A",
      createdAt: new Date().toISOString(),
    };
    global.appData.contactForms.unshift(contact);
    return contact;
  },

  // SUBSCRIBER METHODS
  getSubscribers: () => [...global.appData.subscribers],
  addSubscriber: (email) => {
    const normalized = email?.trim().toLowerCase();
    if (!normalized) throw new Error("Email is required");
    
    const exists = global.appData.subscribers.find(s => s.email === normalized);
    if (exists) return exists;
    
    const subscriber = {
      id: uid(),
      email: normalized,
      createdAt: new Date().toISOString(),
    };
    global.appData.subscribers.unshift(subscriber);
    return subscriber;
  },
};