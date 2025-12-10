import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import NewsletterForm from "@/components/NewsletterForm";
import { FaStar, FaCheck, FaRocket, FaPaintBrush, FaChartLine, FaLaptopCode, FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { dataStore } from "@/lib/data";

export default async function Home() {
  let projects = [];
  let clients = [];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    const [projectsRes, clientsRes] = await Promise.all([
      fetch(`${baseUrl}/api/projects`, { 
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        }
      }),
      fetch(`${baseUrl}/api/clients`, { 
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        }
      })
    ]);
    
    if (projectsRes.ok) {
      const projectsData = await projectsRes.json();
      projects = projectsData.projects || [];
    }
    
    if (clientsRes.ok) {
      const clientsData = await clientsRes.json();
      clients = clientsData.clients || [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    projects = [];
    clients = [];
  }

  const services = [
    {
      icon: <FaLaptopCode className="text-2xl" />,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies.",
      features: ["Responsive Design", "Fast Performance", "SEO Friendly"]
    },
    {
      icon: <FaPaintBrush className="text-2xl" />,
      title: "UI/UX Design",
      description: "User-centered designs that enhance engagement and drive conversions.",
      features: ["User Research", "Wireframing", "Prototyping"]
    },
    {
      icon: <FaChartLine className="text-2xl" />,
      title: "SEO Optimization",
      description: "Improve your website's visibility and ranking on search engines.",
      features: ["Keyword Research", "On-page SEO", "Analytics"]
    },
    {
      icon: <FaRocket className="text-2xl" />,
      title: "Digital Marketing",
      description: "Strategic campaigns to increase visibility and generate leads.",
      features: ["Social Media", "Content Marketing", "PPC Ads"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-gray-900">
      {/* Header & Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">NexaSphere</h1>
                <p className="text-xs text-gray-500">Technologies</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#home" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="#services" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Services
              </Link>
              <Link href="#projects" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Projects
              </Link>
              <Link href="#clients" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Clients
              </Link>
              <Link href="#contact" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
              <Link 
                href="/admin" 
                className="text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg hover:shadow-lg transition-shadow"
              >
                Admin Panel
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50" />
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-blue-100/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-100/30 blur-3xl" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                We Build
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Digital Experiences
                </span>
                That Drive Results
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl">
                We help businesses transform their digital presence with custom web solutions, 
                stunning designs, and strategic marketing that delivers real growth.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="#contact" 
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  Start Your Project
                  <FaArrowRight className="ml-2" />
                </Link>
                <Link 
                  href="#projects" 
                  className="inline-flex items-center px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-colors"
                >
                  View Our Work
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
                  alt="Digital Agency Team"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 text-lg">
              Comprehensive digital solutions tailored to meet your business objectives and drive growth
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-6 text-blue-600">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-500">
                      <FaCheck className="h-3 w-3 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Projects</h2>
            <p className="text-gray-600 text-lg">
              Browse through our portfolio of successful projects delivered to clients worldwide
            </p>
          </div>
          
          {projects && projects.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image || "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80"}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{project.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <button className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <div className="text-5xl mb-4">📁</div>
              <p className="text-gray-600 text-lg">No projects available yet</p>
              <p className="text-gray-500 text-sm mt-2">Add projects via the admin panel</p>
            </div>
          )}
        </div>
      </section>

      {/* Clients Testimonials Section */}
      <section id="clients" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Happy Clients</h2>
            <p className="text-gray-600 text-lg">
              What our clients say about working with us
            </p>
          </div>
          
          {clients && clients.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {clients.map((client) => (
                <div 
                  key={client.id} 
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  <div className="flex items-center mb-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={client.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"}
                        alt={client.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{client.name}</h4>
                      <p className="text-sm text-gray-500">{client.designation}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm italic mb-4 line-clamp-4">
                    "{client.description}"
                  </p>
                  
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className="h-4 w-4 text-yellow-400" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl">
              <div className="text-5xl mb-4">💬</div>
              <p className="text-gray-600 text-lg">No client testimonials yet</p>
              <p className="text-gray-500 text-sm mt-2">Add testimonials via the admin panel</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-purple-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Updated With Our Latest Projects
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for updates on new projects, industry insights, 
              and exclusive offers delivered directly to your inbox.
            </p>
            <div className="pl-15">
             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 w-180 border border-white/20">
              <NewsletterForm />
             </div>
            </div>
            
            <p className="text-sm text-blue-200 mt-4">
              We respect your privacy. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-gray-600 text-lg">
              Ready to start your project? Contact us today for a free consultation
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <FaPhone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 9am-6pm</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <FaEnvelope className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Email</h3>
                    <p className="text-gray-600">contact@devcraft.com</p>
                    <p className="text-sm text-gray-500">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <FaMapMarkerAlt className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Office</h3>
                    <p className="text-gray-600">123 Business Avenue</p>
                    <p className="text-sm text-gray-500">San Francisco, CA 94107</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
                <h3 className="font-bold text-gray-900 text-xl mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <FaCheck className="h-4 w-4 text-green-500 mr-3" />
                    <span>100% Client Satisfaction</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FaCheck className="h-4 w-4 text-green-500 mr-3" />
                    <span>On-Time Project Delivery</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FaCheck className="h-4 w-4 text-green-500 mr-3" />
                    <span>Dedicated Support Team</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FaCheck className="h-4 w-4 text-green-500 mr-3" />
                    <span>Transparent Pricing</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
              <p className="text-gray-600 mb-8">
                Fill in your details below and we'll get back to you as soon as possible
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">NexaSphere</h3>
                  <p className="text-sm text-gray-400">Technologies</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                We create exceptional digital experiences that help businesses grow and succeed in the digital world.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="#home" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="#services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
                <li><Link href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</Link></li>
                <li><Link href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Web Development</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">UI/UX Design</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">SEO Optimization</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Digital Marketing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Admin</h4>
              <ul className="space-y-2">
                <li><Link href="/admin" className="text-gray-400 hover:text-white transition-colors">Admin Panel</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Add Projects</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Manage Clients</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">View Contacts</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} DevCraft Digital Agency. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Built with Next.js • Admin panel ready • Full-stack application
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}