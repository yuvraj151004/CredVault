import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Eye, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submission?: {
    id: number;
    student: string;
    title: string;
    type: string;
    submitted: string;
    priority: string;
  } | null;
}

const ReviewDialog: React.FC<ReviewDialogProps> = ({ open, onOpenChange, submission }) => {
  const [comment, setComment] = useState('');
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);
  const { toast } = useToast();

  if (!submission) return null;

  const handleSubmit = () => {
    if (!action) return;

    const actionText = action === 'approve' ? 'approved' : 'rejected';
    
    toast({
      title: `Document ${actionText.charAt(0).toUpperCase() + actionText.slice(1)}`,
      description: `${submission.title} by ${submission.student} has been ${actionText}.`,
      variant: action === 'approve' ? 'default' : 'destructive'
    });

    setComment('');
    setAction(null);
    onOpenChange(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Review Submission
          </DialogTitle>
          <DialogDescription>
            Review and provide feedback on student submission
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Submission Details */}
          <div className="bg-muted/30 p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{submission.title}</h3>
              <Badge className={getPriorityColor(submission.priority)}>
                {submission.priority} priority
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Student:</span>
                <p className="font-medium">{submission.student}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Type:</span>
                <p className="font-medium">{submission.type}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Submitted:</span>
                <p className="font-medium">{submission.submitted}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Document:</span>
                <Button variant="link" className="p-0 h-auto text-sm">
                  View Document
                </Button>
              </div>
            </div>
          </div>

          {/* Review Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="comment">Review Comments</Label>
              <Textarea
                id="comment"
                placeholder="Provide feedback on the submission..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="flex space-x-2">
              <Button
                variant={action === 'approve' ? 'success' : 'outline'}
                onClick={() => setAction('approve')}
                className="flex-1"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button
                variant={action === 'reject' ? 'destructive' : 'outline'}
                onClick={() => setAction('reject')}
                className="flex-1"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={!action}
              variant="faculty"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Submit Review
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;