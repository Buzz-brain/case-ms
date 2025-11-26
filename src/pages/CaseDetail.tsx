import { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ArrowLeft, Calendar, Tag, Clock, ExternalLink } from 'lucide-react';
import { useCases } from '@/contexts/CasesContext';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import CommentSection from '@/components/CommentSection';
import CaseCard from '@/components/CaseCard';

const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getCaseById, cases } = useCases();
  const caseItem = id ? getCaseById(id) : undefined;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.from(contentRef.current.querySelectorAll('.fade-in-section'), {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top center+=100',
        },
      });
    }
  }, [caseItem]);

  if (!caseItem) {
    return <Navigate to="/cases" replace />;
  }

  const relatedCases = cases
    .filter((c) => c.id !== caseItem.id && c.category === caseItem.category)
    .slice(0, 3);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'in-progress':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'closed':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      default:
        return '';
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Image */}
        <div className="relative h-[60vh] overflow-hidden">
          <motion.img
            src={caseItem.primaryImage}
            alt={caseItem.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <Link to="/cases">
                <Button variant="ghost" className="mb-4 text-white hover:text-accent">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Cases
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="container mx-auto px-4 -mt-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title Card */}
              <Card className="fade-in-section p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="h-5 w-5 text-accent" />
                      <span className="text-accent font-medium">{caseItem.category}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{caseItem.title}</h1>
                    <p className="text-xl text-muted-foreground">{caseItem.description}</p>
                  </div>
                  <Badge className={`${getStatusColor(caseItem.status)} ml-4`}>
                    {caseItem.status}
                  </Badge>
                </div>

                <Separator className="my-6" />

                {/* Meta Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Created: {new Date(caseItem.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Updated: {new Date(caseItem.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Card>

              {/* Tags */}
              <div className="fade-in-section flex flex-wrap gap-2">
                {caseItem.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-sm">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Content */}
              <Card className="fade-in-section p-8 prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: caseItem.content }} />
              </Card>

              {/* Additional Images */}
              {caseItem.images.length > 1 && (
                <div className="fade-in-section">
                  <h3 className="text-2xl font-bold mb-4">Case Documentation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {caseItem.images.slice(1).map((image, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="relative h-64 rounded-lg overflow-hidden cursor-pointer"
                      >
                        <img
                          src={image}
                          alt={`Case documentation ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments */}
              <div className="fade-in-section">
                <CommentSection caseId={caseItem.id} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Case Info Card */}
              <Card className="fade-in-section p-6 sticky top-20">
                <h3 className="text-xl font-bold mb-4">Case Information</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Status</div>
                    <Badge className={getStatusColor(caseItem.status)}>
                      {caseItem.status}
                    </Badge>
                  </div>
                  <Separator />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Category</div>
                    <div className="font-medium">{caseItem.category}</div>
                  </div>
                  <Separator />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Case ID</div>
                    <div className="font-mono text-sm">{caseItem.id}</div>
                  </div>
                  <Separator />
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Share this case</div>
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Copy Link
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Related Cases */}
          {relatedCases.length > 0 && (
            <div className="mt-20">
              <h2 className="text-3xl font-bold mb-8">Related Cases</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedCases.map((relatedCase, index) => (
                  <CaseCard key={relatedCase.id} case={relatedCase} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CaseDetail;
