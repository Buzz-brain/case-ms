import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scale, Target, Users, Award, TrendingUp } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { Card } from '@/components/ui/card';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timelineRef.current) {
      gsap.from(timelineRef.current.querySelectorAll('.timeline-item'), {
        x: -100,
        opacity: 0,
        stagger: 0.3,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top center',
        },
      });
    }

      if (valuesRef.current) {
        // Ensure cards are visible by default
        gsap.set(valuesRef.current.querySelectorAll('.value-card'), { opacity: 1, y: 0 });
        gsap.from(valuesRef.current.querySelectorAll('.value-card'), {
          y: 50,
          opacity: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 90%', // Trigger earlier for reliability
            toggleActions: 'play none none reverse',
          },
        });
      }
  }, []);

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in every case, ensuring the highest quality of legal service.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working together with clients and teams to achieve the best possible outcomes.',
    },
    {
      icon: Award,
      title: 'Integrity',
      description: 'Upholding the highest ethical standards and transparency in all our operations.',
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Continuously improving our processes and adopting new technologies.',
    },
  ];

  const milestones = [
    { year: '2015', title: 'Founded', description: 'CaseMS was established with a vision to revolutionize legal case management.' },
    { year: '2017', title: 'Expansion', description: 'Expanded operations to serve clients across multiple jurisdictions.' },
    { year: '2019', title: 'Technology Upgrade', description: 'Launched our advanced digital platform for seamless case management.' },
    { year: '2021', title: 'Recognition', description: 'Received industry awards for innovation in legal technology.' },
    { year: '2024', title: 'Leading Platform', description: 'Now serving over 500 legal professionals worldwide.' },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary to-accent text-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <Scale className="h-16 w-16 mx-auto mb-6 text-accent" />
              <h1 className="text-5xl md:text-6xl font-bold mb-6">About CaseMS</h1>
              <p className="text-xl text-white/90">
                Empowering legal professionals with innovative case management solutions since 2015
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-8 h-full">
                  <h2 className="text-3xl font-bold mb-4 text-accent">Our Mission</h2>
                  <p className="text-lg text-muted-foreground">
                    To provide legal professionals with cutting-edge technology that simplifies case management, 
                    enhances collaboration, and improves outcomes for clients. We believe that by removing 
                    administrative burdens, lawyers can focus on what they do best: practicing law.
                  </p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-8 h-full">
                  <h2 className="text-3xl font-bold mb-4 text-accent">Our Vision</h2>
                  <p className="text-lg text-muted-foreground">
                    To be the world's most trusted and innovative case management platform, setting new 
                    standards for efficiency, security, and user experience in the legal industry. We envision 
                    a future where technology and law work in perfect harmony.
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section ref={valuesRef} className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Core Values</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="value-card p-6 text-center hover:shadow-lg transition-all">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section ref={timelineRef} className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Journey</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Key milestones in our story
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="timeline-item flex gap-8">
                  <div className="flex-shrink-0 w-24 text-right">
                    <div className="text-2xl font-bold text-accent">{milestone.year}</div>
                  </div>
                  <div className="relative flex-1 pb-8">
                    <div className="absolute left-0 top-2 w-4 h-4 bg-accent rounded-full"></div>
                    {index < milestones.length - 1 && (
                      <div className="absolute left-[7px] top-6 bottom-0 w-0.5 bg-border"></div>
                    )}
                    <Card className="ml-8 p-6">
                      <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h2>
              <p className="text-xl text-muted-foreground mb-8">
                A diverse group of legal experts, technologists, and innovators committed to transforming 
                the legal industry. Our team brings together decades of experience in law, technology, 
                and business to create solutions that truly make a difference.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent">45+</div>
                  <div className="text-muted-foreground">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent">20+</div>
                  <div className="text-muted-foreground">Legal Experts</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent">15+</div>
                  <div className="text-muted-foreground">Developers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent">10+</div>
                  <div className="text-muted-foreground">Countries</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default About;
