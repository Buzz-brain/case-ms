import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FileCheck,
  Users,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCases } from '@/contexts/CasesContext';
import CaseCard from '@/components/CaseCard';
import MainLayout from '@/layouts/MainLayout';
import ThreeGavelScene from '@/components/ThreeGavelScene';
import heroImage from "../assets/hero-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { cases } = useCases();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Hero entrance animations
    const heroElements = heroRef.current.querySelectorAll('.hero-animate');
    gsap.fromTo(heroElements, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out' });

    // Features scroll animation
    if (featuresRef.current) {
      const featureCards = featuresRef.current.querySelectorAll('.feature-card');
      featureCards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: i * 0.08,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }

    // Stats counter animation
    if (statsRef.current) {
      const statNumbers = statsRef.current.querySelectorAll('.stat-number');
      statNumbers.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || '0', 10);
        gsap.to({ val: 0 }, {
          val: target,
          duration: 1.8,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: stat,
            start: 'top 90%',
          },
          onUpdate() {
            // @ts-ignore
            stat.textContent = Math.ceil((this as any).targets()[0].val).toString();
          },
        });
      });
    }
  }, []);

  const features = [
    { icon: FileCheck, title: 'Case Management', description: 'Organize and track all your cases with powerful management tools and intuitive workflows.' },
    { icon: Users, title: 'Team Collaboration', description: 'Work seamlessly with your team through real-time updates and threaded discussions.' },
    { icon: Shield, title: 'Secure & Compliant', description: 'Enterprise-grade security with full compliance to legal industry standards.' },
    { icon: Zap, title: 'Lightning Fast', description: 'Blazing fast performance ensures you stay productive without any delays.' },
    { icon: BarChart3, title: 'Analytics & Reports', description: 'Gain insights with comprehensive analytics and customizable reporting tools.' },
    { icon: Clock, title: 'Time Tracking', description: 'Accurately track billable hours and manage time across all your cases.' },
  ];

  const stats = [
    { number: 500, label: 'Active Cases', suffix: '+' },
    { number: 50, label: 'Team Members', suffix: '+' },
    { number: 98, label: 'Client Satisfaction', suffix: '%' },
    { number: 1000, label: 'Documents Managed', suffix: '+' },
  ];

  const benefits = [
    'Streamlined case workflows',
    'Real-time collaboration',
    'Advanced search capabilities',
    'Automated notifications',
    'Custom reporting',
    'Mobile access',
  ];

  // Use a high-quality external image as a stable default for the hero background.
  // const heroUrl = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&s=0a5a9c0a6f3c2b4f3f6b7c3b1e8f1a8c';
  const heroUrl = heroImage;

  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section
          id="hero-section"
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(8,12,20,0.75), rgba(8,12,20,0.82)), url(${heroUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          {/* 3D Canvas (renders above hero content) */}
          {/* <ThreeGavelScene /> */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-6 px-4 py-2 bg-accent/20 backdrop-blur-sm rounded-full border border-accent/30"
              >
                <span className="text-accent font-medium text-sm">
                  Modern Case Management Solution
                </span>
              </motion.div>

              <h1 className="hero-animate text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Manage Cases with
                <span className="block text-white bg-clip-text bg-gradient-to-r from-teal-bright to-accent">
                  Confidence &amp; Clarity
                </span>
              </h1>

              <p className="hero-animate text-lg sm:text-xl text-white mb-10 max-w-2xl mx-auto">
                Transform your legal practice with our comprehensive case
                management platform. Streamline workflows, enhance
                collaboration, and deliver exceptional results.
              </p>

              <div className="hero-animate flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/cases">
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 group"
                  >
                    Browse Cases
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-black hover:bg-white hover:text-slate-dark text-lg px-8 py-6"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Subtle decorative overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30 pointer-events-none" />

          {/* Scroll Indicator */}
          {/* <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
              <div className="w-1.5 h-3 bg-accent rounded-full mx-auto animate-pulse" />
            </div>
          </motion.div> */}
        </section>

        {/* Stats Section */}
        <section
          id="stats-section"
          ref={statsRef}
          className="py-20 bg-secondary"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl lg:text-5xl font-bold text-accent mb-2">
                    <span className="stat-number" data-target={stat.number}>
                      0
                    </span>
                    <span>{stat.suffix}</span>
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="needs-section"
          ref={featuresRef}
          className="py-20 lg:py-32"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-5xl font-bold mb-6"
              >
                Everything You Need to{" "}
                <span className="text-accent"> Excel</span>
              </motion.h2>
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-muted-foreground"
              >
                Powerful features designed for modern legal professionals
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="feature-card p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-accent cursor-pointer group"
                >
                  <div className="mb-4 p-3 bg-accent/10 rounded-lg inline-block group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-8 h-8 text-accent group-hover:text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Cases Section (keeps original behavior) */}
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
                  View All Cases <ArrowRight className="h-4 w-4" />
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

        {/* Benefits + CTA sections unchanged (enhanced styling kept) */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                  Why Choose CaseFlow?
                </h2>
                <p className="text-lg text-slate-light mb-8">
                  Join hundreds of legal professionals who trust CaseFlow to
                  manage their cases efficiently and effectively.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0" />
                      <span>{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-square bg-accent/10 rounded-2xl backdrop-blur-sm border border-accent/30 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-4">10,000+</div>
                    <div className="text-xl">Cases Managed Successfully</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-accent rounded-3xl p-12 lg:p-16 text-center text-white"
            >
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Ready to Transform Your Practice?
              </h2>
              <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Start managing your cases more efficiently today with CaseFlow
              </p>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-white text-accent hover:bg-slate-light text-lg px-10 py-6"
                >
                  Get Started Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Home;
