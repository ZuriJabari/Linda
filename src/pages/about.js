import React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import Layout from '../components/Layout';

const AboutPage = () => {
  const initiatives = [
    {
      name: "The Bold Woman Fund",
      role: "Co-Founder",
      description: "Supporting Ugandan women entrepreneurs in fashion and design with training and retail opportunities.",
      focus: "Women's Entrepreneurship",
      year: "Ongoing",
      website: "https://boldwomanfund.org",
      external: true
    },
    {
      name: "Bold in Africa",
      role: "Co-Founder", 
      description: "A store dedicated to showcasing exclusively made-in-Africa brands, ensuring local creativity has visibility and opportunity.",
      focus: "African Fashion & Design",
      year: "Ongoing",
      website: "https://boldinafrica.com",
      external: true
    },
    {
      name: "FG Foundation",
      role: "Co-Founder",
      description: "A platform dedicated to interrogating African philanthropy and community building.",
      focus: "African Philanthropy",
      year: "2022",
      website: "https://fgfoundation.org",
      external: true
    },
    {
      name: "The Citizen Report–Uganda",
      role: "Founder",
      description: "Encouraging civic participation and amplifying citizen voices in governance and social justice.",
      focus: "Civic Engagement",
      year: "2021",
      website: "https://citizenreport.ug",
      external: true
    },
    {
      name: "32 Degrees East",
      role: "Trustee & Board Member",
      description: "Working with the centre's leadership to bolster contemporary art practice in Uganda.",
      focus: "Contemporary Arts",
      year: "Since 2018",
      website: "https://32degreeseast.org",
      external: true
    },
    {
      name: "Taala Foundation",
      role: "Former Board Chairperson",
      description: "Supporting mental health awareness and creative therapy for sexual minorities.",
      focus: "Mental Health & LGBTQ+ Rights",
      year: "Former",
      website: "https://taala.org",
      external: true
    }
  ];

  const achievements = [
    {
      title: "Legal Partnership",
      description: "Partner at Adalci Advocates"
    },
    {
      title: "Academic Pursuit", 
      description: "Master's degree in Philanthropic Studies, University of Kent, UK"
    },
    {
      title: "Educational Leadership",
      description: "Former Governor at 7 Hills International School"
    },
    {
      title: "Youth Development",
      description: "Director & Secretary at FundiBots Ltd - equipping young people with robotics skills"
    }
  ];

  return (
    <Layout seo={{ title: 'About Linda Mutesi - Lawyer, Philanthropist & Community Builder' }}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">About</span>
          </nav>
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <div className="text-base uppercase tracking-wider text-gray-500 mb-4">Hello, I'm</div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight">
                Linda Mutesi
              </h1>
              <div className="text-2xl md:text-3xl text-gray-600 mb-8 font-medium">
                Lawyer • Philanthropist • Community Builder
              </div>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
                For more than fifteen years, I have been lucky to be a part of passionate community builders in Uganda that nurture creativity, innovation and opportunity. My journey has taken me across diverse fields—supporting talent development, championing the visual arts, mentoring youth and women-led startups and advocating for things I believe.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/blog" 
                  className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
                >
                  Read My Stories
                </Link>
                <Link 
                  to="/books" 
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-full hover:border-gray-400 transition-colors"
                >
                  Book Recommendations
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="relative">
                <StaticImage
                  src="../images/linda-hero.png"
                  alt="Linda Mutesi - Professional Portrait"
                  placeholder="blurred"
                  width={400}
                  className="w-full h-auto object-contain rounded-3xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-xl prose-gray max-w-none">
            <p className="text-xl md:text-2xl leading-relaxed text-gray-700 mb-10">
              A trained lawyer and Partner at Adalci Advocates, I serve on several boards as Director, Co-Founder and Patron. My interests span the visual arts, women led business, African literature, youth enterprise and interrogating African philanthropy. At the heart of it all is a commitment to <strong>social justice, reflective culture and the power of creative expression</strong> to bring people together.
            </p>
            
            <p className="text-xl md:text-2xl leading-relaxed text-gray-700 mb-10">
              Currently, I am pursuing a Master's degree in Philanthropic Studies at the University of Kent in the UK. Beyond my professional life, I am a mother of two teenage boys, a curious reader and an enthusiastic participant in spaces that question, teach and grow the mind.
            </p>
          </div>
        </div>
      </section>

      {/* Professional Achievements */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Professional Background</h2>
            <p className="text-gray-600 text-xl md:text-2xl max-w-3xl mx-auto">My formal roles and academic pursuits that shape my approach to community building and social change.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-3">{achievement.title}</h3>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Initiatives */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Key Initiatives & Impact</h2>
            <p className="text-gray-600 text-xl md:text-2xl max-w-3xl mx-auto">The organizations and projects I've founded, co-founded, or actively contribute to in service of community development.</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {initiatives.map((initiative, index) => (
              <a 
                key={index} 
                href={initiative.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block group cursor-pointer"
              >
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-black group-hover:text-amber-600 transition-colors flex items-center gap-2">
                      {initiative.name}
                      <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </h3>
                    <span className="text-base text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{initiative.year}</span>
                  </div>
                  <p className="text-base md:text-lg font-medium text-gray-600 mb-3">{initiative.role}</p>
                </div>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">{initiative.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Focus:</span>
                    <span className="text-base md:text-lg font-medium text-black">{initiative.focus}</span>
                  </div>
                  <span className="text-base md:text-lg text-amber-600 font-medium group-hover:text-amber-700 transition-colors">
                    Visit Website →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Values */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-black">Vision & Values</h2>
          <blockquote className="text-2xl md:text-3xl leading-relaxed font-medium mb-16 italic text-gray-800">
            "Looking ahead, my vision is to see each of these initiatives grow in sustainability and impact over the next decade. Together, they embody the values I hold close: <span className="text-amber-600 font-semibold">empowerment, creativity, justice, and the belief that communities thrive when opportunities are shared.</span>"
          </blockquote>
          
          <div className="grid md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💪</span>
              </div>
              <h3 className="font-bold text-xl md:text-2xl mb-3 text-black">Empowerment</h3>
              <p className="text-gray-700 text-base md:text-lg">Building capacity and creating opportunities for others to thrive</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-bold text-xl md:text-2xl mb-3 text-black">Creativity</h3>
              <p className="text-gray-700 text-base md:text-lg">Championing artistic expression and innovative solutions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="font-bold text-xl md:text-2xl mb-3 text-black">Justice</h3>
              <p className="text-gray-700 text-base md:text-lg">Advocating for equity and social change in all spaces</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-bold text-xl md:text-2xl mb-3 text-black">Community</h3>
              <p className="text-gray-700 text-base md:text-lg">Believing that shared opportunities create thriving communities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-8">Let's Connect</h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            I believe deeply in the transformative power of art and storytelling. Through this platform, I share insights from my journey and conversations with fellow creatives making a difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/blog" 
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors"
            >
              Read My Stories & Reflections
            </Link>
            <Link 
              to="/books" 
              className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-full hover:border-gray-400 transition-colors"
            >
              Explore My Reading List
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
