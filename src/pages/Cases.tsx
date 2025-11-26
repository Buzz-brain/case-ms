import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Search, Filter } from 'lucide-react';
import { useCases } from '@/contexts/CasesContext';
import CaseCard from '@/components/CaseCard';
import MainLayout from '@/layouts/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Cases = () => {
  const { cases, categories } = useCases();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }
  }, []);

  const filteredCases = cases.filter((caseItem) => {
    const matchesSearch =
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || caseItem.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || caseItem.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <MainLayout>
      <div className="min-h-screen py-12">
        {/* Header */}
        <div ref={headerRef} className="bg-gradient-to-br from-primary to-accent text-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Case Library</h1>
              <p className="text-xl text-white/90">
                Browse through our comprehensive collection of legal cases
              </p>
            </motion.div>
          </div>
        </div>

        {/* Filters */}
        <div className="container mx-auto px-4 -mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-lg shadow-lg p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search cases by title, description, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            {(searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all') && (
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {searchTerm && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSearchTerm('')}
                    className="gap-2"
                  >
                    Search: {searchTerm}
                    <span className="text-xs">✕</span>
                  </Button>
                )}
                {selectedCategory !== 'all' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedCategory('all')}
                    className="gap-2"
                  >
                    {selectedCategory}
                    <span className="text-xs">✕</span>
                  </Button>
                )}
                {selectedStatus !== 'all' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedStatus('all')}
                    className="gap-2"
                  >
                    Status: {selectedStatus}
                    <span className="text-xs">✕</span>
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* Cases Grid */}
        <div className="container mx-auto px-4 mt-12">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredCases.length} of {cases.length} cases
            </p>
          </div>

          {filteredCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCases.map((caseItem, index) => (
                <CaseCard key={caseItem.id} case={caseItem} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Filter className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-2xl font-bold mb-2">No cases found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search terms
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                }}
              >
                Clear All Filters
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Cases;
