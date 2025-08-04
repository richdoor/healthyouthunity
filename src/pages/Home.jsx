import React, { useState, useEffect, useRef } from 'react';
import { Heart, Users, BookOpen, Calendar, ArrowRight, Play, Award, Target, Stethoscope, Brain, Activity, Instagram } from 'lucide-react';

const Home = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [impactCount, setImpactCount] = useState({ funds: 0, patients: 0, hospitals: 0, events: 0 });
    const [hasAnimated, setHasAnimated] = useState(false); // Changed from isVisible
    const impactRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
          const scrolled = window.scrollY > 50;
          if (scrolled !== isScrolled) {  // Only update when threshold crossed
            setIsScrolled(scrolled);
          }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isScrolled]);
  
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
    
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Trigger animation after short delay
          setTimeout(() => {
            setImpactCount({
              funds: 999,
              patients: 99,
              hospitals: 99,
              events: 999
            });
          }, 100);
          
          // Disconnect observer since we only want this to happen once
          observer.disconnect();
        }
      }, { threshold: 0.5 });
  
      if (impactRef.current && !hasAnimated) {
        observer.observe(impactRef.current);
      }
  
      return () => observer.disconnect();
    }, [hasAnimated]);
  
    const AnimatedCounter = ({ end, duration = 2000, prefix = "", suffix = "" }) => {
      const [count, setCount] = useState(0);
  
      useEffect(() => {
        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        return () => clearInterval(timer);
      }, [end, duration]);
  
      return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
    };

  const educationTopics = [
    { icon: <Heart className="w-8 h-8" />, title: "How to Give CPR", desc: "Life-saving skills for emergencies", link: "https://www.instagram.com/p/DMI3wXpxip5" },
    { icon: <Brain className="w-8 h-8" />, title: "Mental Health", desc: "Understanding and supporting wellness", link: "https://www.instagram.com/p/DKTLpz6xcS6/" },
    { icon: <Activity className="w-8 h-8" />, title: "Cancer Awareness", desc: "Education about common cancers", link: "https://www.instagram.com/p/DBonk80xidD" },
    { icon: <Stethoscope className="w-8 h-8" />, title: "Medical Emergency", desc: "Fundamental Emergency knowledge", link: "https://www.instagram.com/p/DLu7hzoROPn/" }
  ];

  const events = [
    { date: "Jul 15", title: "Double Good Fundraiser", type: "Fundraising", time: "12:00 PM EST", link: "https://www.instagram.com/p/DMIhybwNOLB/" },
    { date: "Jul 15", title: "Double Good Fundraiser", type: "Educational", time: "12:00 PM EST", link: "https://www.instagram.com/p/DMIhybwNOLB/" },
    { date: "Jul 15", title: "Double Good Fundraiser", type: "Community", time: "12:00 PM EST", link: "https://www.instagram.com/p/DMIhybwNOLB/" },
    { date: "Jul 15", title: "Double Good Fundraiser", type: "Fundraising", time: "12:00 PM EST", link: "https://www.instagram.com/p/DMIhybwNOLB/" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-rose-50/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-300 to-rose-400 rounded-full flex items-center justify-center text-white shadow-lg transform hover:scale-110 transition-transform duration-300">
                <img src="/src/assets/profile.jpg" alt="Health Youth Unity" className='rounded-full border-rose-200 border-2'/>
              </div>
              <div>
                <h1 className="text-xl font-bold text-rose-600">HEALTH</h1>
                <p className="text-sm text-rose-500 -mt-1">YOUTH UNITY</p>
              </div>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['About', 'Education', 'Events'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="relative text-rose-700 hover:text-rose-600 font-medium transition-colors duration-200 py-2 group pb-0">
                  {item}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-rose-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              ))}
              <a href='https://healthfirstunity.betterworld.org/donate' className="relative text-rose-700 hover:text-rose-600 font-medium transition-colors duration-200 py-2 group pb-0" target='_blank'>
                Donate
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-rose-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            </div>
            
            <a className="bg-gradient-to-r from-rose-400 to-rose-500 text-white px-6 py-2 rounded-full hover:from-rose-500 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105" href='https://healthfirstunity.betterworld.org/donate' target='_blank'>
              Donate Now
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 to-orange-100/50"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-16 h-16 bg-gradient-to-br from-rose-200/30 to-orange-200/30 rounded-full animate-pulse`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i}s`
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8 transform hover:scale-110 transition-transform duration-500">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-rose-300 to-rose-400 rounded-full flex items-center justify-center shadow-2xl">
              <div className="text-white text-4xl">
                <img src="/src/assets/profile.jpg" alt="Health Youth Unity" className='rounded-full border-rose-200 border-4'/>
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-rose-600 mb-6 leading-tight">
            Health Youth
            <span className="block text-rose-500">Unity</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-rose-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Empowering young minds through health education and supporting pediatric cancer patients across communities
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-rose-600 hover:to-rose-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center gap-2" href='#about'>
              Start Learning <ArrowRight className="w-5 h-5" />
            </a>
            {/* <button className="border-2 border-rose-400 text-rose-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-400 hover:text-white transition-all duration-300 flex items-center gap-2">
              <Play className="w-5 h-5" /> Watch Our Story
            </button> */}
          </div>
        </div>
      </section>

      {/* Impact Counter Section */}
      <section className="py-20 bg-gradient-to-r from-rose-400 to-rose-500 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" ref={impactRef}>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={impactCount.funds} prefix="$" />
              </div>
              <p className="text-rose-100 text-lg">Funds Raised</p>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={impactCount.patients} suffix="+" />
              </div>
              <p className="text-rose-100 text-lg">Patients Helped</p>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={impactCount.hospitals} />
              </div>
              <p className="text-rose-100 text-lg">Partner Hospitals</p>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={impactCount.events} suffix="+" />
              </div>
              <p className="text-rose-100 text-lg">Educational Events</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-orange-100 to-rose-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-rose-600 mb-6">Our Mission</h2>
              <p className="text-lg text-rose-700 mb-6 leading-relaxed">
                Health Youth Unity is a 501(c)(3) nonprofit dedicated to fundraising for hospitals and pediatric cancer patients while educating young minds about medicine and health.
              </p>
              <p className="text-lg text-rose-700 mb-8 leading-relaxed">
                We believe that by combining education with compassionate action, we can create a healthier, more informed generation that actively supports those in need.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rose-400 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-rose-600">Fundraising Focus</h4>
                    <p className="text-rose-700">Supporting hospitals and pediatric cancer patients</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rose-400 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-rose-600">Education First</h4>
                    <p className="text-rose-700">Teaching young minds about medicine and health</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-rose-200 to-orange-200 rounded-3xl p-8 transform hover:scale-105 transition-transform duration-300">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-rose-400 to-rose-500 rounded-full flex items-center justify-center mb-6">
                      <Award className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-rose-600 mb-4">501(c)(3) Nonprofit</h3>
                    <p className="text-rose-700">Officially recognized tax-exempt charitable organization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Hub */}
      <section id="education" className="py-20 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-rose-600 mb-6">Educational Hub</h2>
            <p className="text-xl text-rose-700 max-w-3xl mx-auto">
              Interactive learning experiences designed to educate young minds about health, medicine, and wellness
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {educationTopics.map((topic, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group">
                <div className="text-rose-400 mb-4 group-hover:text-rose-500 transition-colors duration-300">
                  {topic.icon}
                </div>
                <h3 className="text-xl font-bold text-rose-600 mb-3">{topic.title}</h3>
                <p className="text-rose-700 mb-4">{topic.desc}</p>
                <a className="text-rose-500 font-semibold hover:text-rose-600 transition-colors duration-200 flex items-center gap-2 cursor-pointer hover:underline" href={topic.link} target='_blank'>
                  Learn More <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Calendar */}
      <section id="events" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-rose-600 mb-6">Upcoming Events</h2>
            <p className="text-xl text-rose-700 max-w-3xl mx-auto">
              Join us for educational workshops, fundraising events, and community activities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <div key={index} className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-rose-100">
                <div className="flex items-start gap-4">
                  <div className="bg-rose-400 text-white rounded-lg p-3 text-center min-w-16">
                    <div className="text-lg font-bold">{event.date.split(' ')[1]}</div>
                    <div className="text-sm">{event.date.split(' ')[0]}</div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        event.type === 'Educational' ? 'bg-blue-100 text-blue-600' :
                        event.type === 'Fundraising' ? 'bg-green-100 text-green-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {event.type}
                      </span>
                      <Calendar className="w-4 h-4 text-rose-400" />
                      <span className="text-sm text-rose-600">{event.time}</span>
                    </div>
                    <h3 className="text-xl font-bold text-rose-600 mb-2">{event.title}</h3>
                    <a className="text-rose-500 font-semibold hover:text-rose-600 transition-colors duration-200 flex items-center gap-2 hover:underline" target='_blank' href={event.link}>
                      Join <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-rose-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-rose-100">
            Join our community of young advocates for health education and pediatric cancer support
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a className="bg-white text-rose-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105" href='https://healthfirstunity.betterworld.org/donate' target='_blank'>
              Donate Today
            </a>
            <a className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-rose-600 transition-all duration-300" href='http://forms.gle/9Ya9ghk8gpqqQP9p8' target='_blank'>
              Volunteer With Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-rose-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-rose-400 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">HEALTH</h3>
                  <p className="text-sm text-rose-300">YOUTH UNITY</p>
                </div>
              </div>
              <p className="text-rose-300 text-sm">
                501(c)(3) nonprofit dedicated to health education and pediatric cancer support.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-rose-300">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#education" className="hover:text-white transition-colors">Education</a></li>
                <li><a href="#events" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="https://healthfirstunity.betterworld.org/donate" className="hover:text-white transition-colors" target='_blank'>Donate</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Get Involved</h4>
              <ul className="space-y-2 text-rose-300">
                <li><a href="http://forms.gle/9Ya9ghk8gpqqQP9p8" target='_blank' className="hover:text-white transition-colors">Volunteer</a></li>
                <li><a href="https://www.instagram.com/healthyouthunity/" target='_blank' className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/healthyouthunity/" className="w-10 h-10 bg-rose-700 rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors">
                  <Instagram />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-rose-800 mt-8 pt-8 text-center text-rose-300">
            <p>&copy; 2024 Health Youth Unity. All rights reserved. | 501(c)(3) Nonprofit Organization</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;