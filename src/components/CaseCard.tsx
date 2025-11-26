import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { Case } from '@/mock/cases';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter } from './ui/card';

interface CaseCardProps {
  case: Case;
  index: number;
}

const CaseCard = ({ case: caseItem, index }: CaseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <Link to={`/cases/${caseItem.id}`}>
        <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 group cursor-pointer">
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={caseItem.primaryImage}
              alt={caseItem.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
              {caseItem.status}
            </Badge>
          </div>

          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Tag className="h-4 w-4" />
              <span>{caseItem.category}</span>
            </div>

            <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2">
              {caseItem.title}
            </h3>

            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
              {caseItem.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {caseItem.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>

          <CardFooter className="px-6 pb-6 pt-0 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{new Date(caseItem.createdAt).toLocaleDateString()}</span>
            </div>

            <motion.div
              className="flex items-center gap-1 text-accent font-medium text-sm"
              whileHover={{ x: 5 }}
            >
              <span>Read more</span>
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default CaseCard;
