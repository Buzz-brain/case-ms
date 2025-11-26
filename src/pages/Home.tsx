import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scale, ArrowRight, Shield, Users, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCases } from '@/contexts/CasesContext';
import CaseCard from '@/components/CaseCard';
import MainLayout from '@/layouts/MainLayout';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { cases } = useCases();
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero parallax
    if (heroRef.current) {
      gsap.to(heroRef.current.querySelector('.hero-bg'), {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Features animation
    if (featuresRef.current) {
      gsap.from(featuresRef.current.querySelectorAll('.feature-card'), {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top center+=100',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
      });
    }

    // Stats counter
    if (statsRef.current) {
      const stats = statsRef.current.querySelectorAll('.stat-number');
      stats.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || '0');
        gsap.to(stat, {
          textContent: target,
          duration: 2,
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: stat,
            start: 'top center+=200',
          },
        });
      });
    }
  }, []);

  const features = [
    {
      icon: Shield,
      title: 'Secure & Confidential',
      description: 'Enterprise-grade security with end-to-end encryption for all your sensitive case data.',
    },
    {
      icon: Users,
      title: 'Collaborative Workflow',
      description: 'Seamlessly collaborate with your team and clients in real-time on any case.',
    },
    {
      icon: FileText,
      title: 'Document Management',
      description: 'Organize, store, and access all case documents from a centralized location.',
    },
    {
      icon: CheckCircle,
      title: 'Task Automation',
      description: 'Automate routine tasks and focus on what matters most - winning cases.',
    },
  ];

  const stats = [
    { label: 'Cases Managed', value: 1250 },
    { label: 'Success Rate', value: 96 },
    { label: 'Happy Clients', value: 500 },
    { label: 'Legal Experts', value: 45 },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <div className="hero-bg absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent -z-10" />
        
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Scale className="h-12 w-12 text-accent" />
                <span className="text-accent text-lg font-semibold">CaseMS</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Modern Case Management
                <span className="block text-accent">Simplified</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl">
                Streamline your legal practice with intelligent case management, automated workflows, and secure collaboration tools.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/cases">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-white gap-2">
                      Explore Cases
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/about">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                      Learn More
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-accent mb-2">
                  <span className="stat-number" data-target={stat.value}>0</span>
                  {stat.label === 'Success Rate' && '%'}
                  {stat.label !== 'Success Rate' && '+'}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-accent">CaseMS</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for legal professionals who demand excellence, efficiency, and security.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="feature-card p-6 hover:shadow-lg transition-all">
                  <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Cases Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Recent <span className="text-accent">Cases</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Explore our latest case studies and legal matters
              </p>
            </div>
            <Link to="/cases">
              <Button variant="outline" className="gap-2">
                View All Cases
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.slice(0, 3).map((caseItem, index) => (
              <CaseCard key={caseItem.id} case={caseItem} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary to-accent p-12 text-center text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Ready to Transform Your Practice?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Join hundreds of legal professionals who trust CaseMS for their case management needs.
              </p>
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2">
                    Get Started Today
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </Card>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
