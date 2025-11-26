import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Reply, Send } from 'lucide-react';
import { Comment } from '@/mock/cases';
import { useCases } from '@/contexts/CasesContext';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Card } from './ui/card';

interface CommentSectionProps {
  caseId: string;
}

const CommentItem = ({ comment, onReply }: { comment: Comment; onReply: (id: string) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <Card className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-accent font-semibold">
              {comment.username.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold">{comment.username}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-muted-foreground mb-3">{comment.comment}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReply(comment.id)}
              className="gap-2"
            >
              <Reply className="h-4 w-4" />
              Reply
            </Button>
          </div>
        </div>
      </Card>

      {comment.replies.length > 0 && (
        <div className="ml-12 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} onReply={onReply} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

const CommentSection = ({ caseId }: CommentSectionProps) => {
  const { getCommentsByCaseId, addComment } = useCases();
  const comments = getCommentsByCaseId(caseId);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [replyToId, setReplyToId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !commentText) return;

    addComment(caseId, username, email, commentText, replyToId || undefined);
    setCommentText('');
    setReplyToId(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-accent" />
        <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
      </div>

      {/* Comment Form */}
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {replyToId && (
            <div className="bg-accent/10 p-3 rounded-md flex items-center justify-between">
              <span className="text-sm">Replying to comment</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setReplyToId(null)}
              >
                Cancel
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Textarea
            placeholder="Write your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
            className="min-h-[100px]"
          />

          <Button type="submit" className="gap-2">
            <Send className="h-4 w-4" />
            Post Comment
          </Button>
        </form>
      </Card>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={setReplyToId}
          />
        ))}

        {comments.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
