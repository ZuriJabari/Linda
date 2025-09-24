import React, { useState, useRef } from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';

const PodcastPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedData = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      const progressBar = e.currentTarget;
      const clickX = e.nativeEvent.offsetX;
      const width = progressBar.offsetWidth;
      const newTime = (clickX / width) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  const episodes = [
    {
      id: 1,
      title: "The Future of African Philanthropy",
      description: "Exploring innovative approaches to community support and sustainable giving across the continent",
      duration: "45 min",
      date: "Coming Soon",
      category: "Philanthropy",
      featured: true
    },
    {
      id: 2,
      title: "Women Entrepreneurs Leading Innovation",
      description: "Stories of resilience, creativity, and the businesses reshaping Africa's economic landscape",
      duration: "38 min",
      date: "Coming Soon",
      category: "Leadership"
    },
    {
      id: 3,
      title: "Arts & Social Change",
      description: "How creative expression drives community transformation and cultural preservation",
      duration: "52 min",
      date: "Coming Soon",
      category: "Culture"
    },
    {
      id: 4,
      title: "Legal Advocacy for Human Rights",
      description: "Conversations on justice, equality, and using law as a tool for social progress",
      duration: "41 min",
      date: "Coming Soon",
      category: "Justice"
    }
  ];

  const platforms = [
    { name: 'Apple Podcasts', icon: '🎧', url: '#' },
    { name: 'Spotify', icon: '🎵', url: '#' },
    { name: 'Google Podcasts', icon: '📻', url: '#' },
    { name: 'YouTube', icon: '▶️', url: '#' }
  ];

  return (
    <Layout seo={{ title: 'Podcast - Conversations with Linda Mutesi' }}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-indigo-50 pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Podcast</span>
          </nav>
          
          <div className="text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              Conversations with Linda
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
              Thoughtful conversations with leaders, changemakers, and innovators who are reshaping philanthropy, entrepreneurship, and community building across Africa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={togglePlay}
                className="inline-flex items-center px-8 py-4 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors"
              >
                {isPlaying ? (
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
                {isPlaying ? 'Pause Sample Episode' : 'Play Sample Episode'}
              </button>
              <Link 
                to="#subscribe" 
                className="inline-flex items-center px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-full hover:border-gray-400 transition-colors"
              >
                Subscribe to Podcast
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Episode Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:text-left text-center">
            <div className="text-[11px] uppercase tracking-[0.28em] text-gray-500">Featured</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-black">Latest Episode</h2>
            <div className="mt-2 h-px w-16 bg-black/70 md:ml-0 mx-auto" />
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-8 md:p-12 text-white">
                <div className="flex items-center gap-4 mb-6">
                  <button 
                    onClick={togglePlay}
                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 hover:scale-105"
                  >
                    {isPlaying ? (
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                      </svg>
                    ) : (
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>
                  <div>
                    <div className="text-sm uppercase tracking-wider opacity-90">Sample Episode</div>
                    <h3 className="text-2xl md:text-3xl font-bold">Episode 1</h3>
                  </div>
                </div>
                
                <h4 className="text-2xl md:text-3xl font-bold mb-4">The Future of African Philanthropy</h4>
                <p className="text-lg opacity-90 mb-6">
                  Join me for an in-depth conversation about innovative approaches to community support and sustainable giving across the African continent.
                </p>

                {/* Audio Player */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
                  <audio
                    ref={audioRef}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedData={handleLoadedData}
                    onEnded={() => setIsPlaying(false)}
                    preload="metadata"
                  >
                    <source src="https://www.soundjay.com/misc/sounds/magic-chime-02.mp3" type="audio/mpeg" />
                    <source src="https://file-examples.com/storage/fe68c009b11866c3841a9d7/2017/11/file_example_MP3_700KB.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  
                  {/* Progress Bar */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-medium min-w-12">{formatTime(currentTime)}</span>
                    <div 
                      className="flex-1 h-2 bg-white/20 rounded-full cursor-pointer overflow-hidden"
                      onClick={handleSeek}
                    >
                      <div 
                        className="h-full bg-white rounded-full transition-all duration-100"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium min-w-12">{formatTime(duration)}</span>
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={togglePlay}
                        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        {isPlaying ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        )}
                      </button>
                      <div className="text-sm">
                        <div className="font-medium">Sample Audio</div>
                        <div className="opacity-75">Demo Episode</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm opacity-75">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      </svg>
                      <span>HD Quality</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm opacity-75">
                  <span>45 minutes</span>
                  <span>•</span>
                  <span>Philanthropy</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Sample
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <h3 className="text-xl font-bold text-black mb-4">Listen On Your Favorite Platform</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {platforms.map((platform, index) => (
                      <a
                        key={index}
                        href={platform.url}
                        className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                      >
                        <span className="text-xl">{platform.icon}</span>
                        <span className="font-medium text-black">{platform.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes Grid */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:text-left text-center">
            <div className="text-[11px] uppercase tracking-[0.28em] text-gray-500">All Episodes</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-black">Upcoming Conversations</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl">Thoughtful discussions on the topics that matter most for building stronger communities.</p>
            <div className="mt-2 h-px w-16 bg-black/70 md:ml-0 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {episodes.map((episode) => (
              <article 
                key={episode.id} 
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-600 text-sm font-medium rounded-full">
                      {episode.category}
                    </span>
                    <span className="text-sm text-gray-500">{episode.duration}</span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-3">
                    {episode.title}
                  </h3>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {episode.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{episode.date}</span>
                    <button className="inline-flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      Listen
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section id="subscribe" className="py-16 md:py-20 bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Never Miss an Episode</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Subscribe to get notified when new episodes are available and join our community of changemakers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow Updates
            </button>
            <Link 
              to="/contact"
              className="inline-flex items-center px-8 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
            >
              Suggest a Guest
            </Link>
          </div>
          
          <p className="text-sm opacity-75">
            Join over 1,000 subscribers who get updates on African leadership and social impact.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default PodcastPage;
