import React, { useState } from 'react';
import Navbar from '@/components/common/Navbar';
import StatCard from '@/components/common/StatCard';
import ReviewDialog from '@/components/dialogs/ReviewDialog';
import ReportDialog from '@/components/dialogs/ReportDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Clock, FileText, Users, MessageSquare, Download, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FacultyDashboard: React.FC = () => {
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const { toast } = useToast();
  const stats = [
    { title: 'Pending Reviews', value: '8', icon: Clock, variant: 'warning' as const, description: 'Awaiting your approval' },
    { title: 'Approved Today', value: '12', icon: CheckCircle, variant: 'success' as const, trend: '+4 since yesterday' },
    { title: 'Total Students', value: '156', icon: Users, variant: 'default' as const, description: 'Under your mentorship' },
    { title: 'Reports Generated', value: '3', icon: FileText, variant: 'default' as const, trend: 'This month' }
  ];

  const pendingSubmissions = [
    { 
      id: 1, 
      student: 'Avneesh Singh', 
      title: 'AWS Cloud Practitioner Certificate', 
      type: 'Certificate', 
      submitted: '2 hours ago',
      priority: 'high'
    },
    { 
      id: 2, 
      student: 'Yuvraj Singh', 
      title: 'Internship Completion - Microsoft', 
      type: 'Experience', 
      submitted: '5 hours ago',
      priority: 'medium'
    },
    { 
      id: 3, 
      student: 'Raj Patel', 
      title: 'Hackathon Winner - CodeFest 2024', 
      type: 'Achievement', 
      submitted: '1 day ago',
      priority: 'medium'
    },
    { 
      id: 4, 
      student: 'Keshav Singh', 
      title: 'Full Stack Development Course', 
      type: 'Course', 
      submitted: '2 days ago',
      priority: 'low'
    }
  ];

  const recentActivity = [
    { action: 'Approved', student: 'Yuvraj Singh', document: 'Python Certification', time: '10 min ago' },
    { action: 'Commented', student: 'Mahi Sharma', document: 'Project Report', time: '1 hour ago' },
    { action: 'Rejected', student: 'Saral Jain', document: 'Workshop Certificate', time: '2 hours ago' },
    { action: 'Approved', student: 'Ananniya Acharya', document: 'Research Paper', time: '3 hours ago' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Approved': return 'text-success';
      case 'Rejected': return 'text-destructive';
      case 'Commented': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const handleReview = (submission: any) => {
    setSelectedSubmission(submission);
    setReviewDialogOpen(true);
  };

  const handleQuickApprove = (submission: any) => {
    toast({
      title: "Document Approved",
      description: `${submission.title} by ${submission.student} has been approved.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold animate-fade-in">Faculty Dashboard</h1>
            <p className="text-muted-foreground">Review student submissions and generate reports</p>
          </div>
          <Button variant="faculty" className="animate-scale-in" onClick={() => setReportDialogOpen(true)}>
            <Download className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending">Pending Reviews</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Submissions Awaiting Review</CardTitle>
                    <CardDescription>Student documents requiring your approval</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingSubmissions.map((submission) => (
                        <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-card-hover transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{submission.title}</h4>
                              <Badge className={getPriorityColor(submission.priority)} variant="secondary">
                                {submission.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Submitted by <span className="font-medium">{submission.student}</span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {submission.type} • {submission.submitted}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleReview(submission)}>
                              <Eye className="mr-1 h-3 w-3" />
                              Review
                            </Button>
                            <Button variant="success" size="sm" onClick={() => handleQuickApprove(submission)}>
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="approved" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recently Approved</CardTitle>
                    <CardDescription>Documents you've approved in the last 7 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>12 documents approved this week</p>
                      <Button variant="outline" className="mt-3" onClick={() => toast({ title: "Approved Documents", description: "Viewing all approved documents..." })}>View All Approved</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Class Reports</CardTitle>
                    <CardDescription>Generate department and class-wise activity reports</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="h-20 flex-col" onClick={() => setReportDialogOpen(true)}>
                        <FileText className="h-6 w-6 mb-2" />
                        Department Report
                      </Button>
                      <Button variant="outline" className="h-20 flex-col" onClick={() => setReportDialogOpen(true)}>
                        <Users className="h-6 w-6 mb-2" />
                        Class Summary
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest review actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-card-hover transition-colors">
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className={`font-medium ${getActionColor(activity.action)}`}>
                            {activity.action}
                          </span>
                          {' '}{activity.student}'s {activity.document}
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "Bulk Comment", description: "Opening bulk comment interface..." })}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Bulk Comment
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "Quick Approve", description: "Quick approval mode activated." })}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Quick Approve
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setReportDialogOpen(true)}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <ReviewDialog 
        open={reviewDialogOpen} 
        onOpenChange={setReviewDialogOpen}
        submission={selectedSubmission}
      />
      <ReportDialog 
        open={reportDialogOpen} 
        onOpenChange={setReportDialogOpen}
        type="faculty"
      />
    </div>
  );
};

export default FacultyDashboard;