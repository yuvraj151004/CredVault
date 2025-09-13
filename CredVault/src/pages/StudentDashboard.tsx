import React, { useState } from 'react';
import Navbar from '@/components/common/Navbar';
import StatCard from '@/components/common/StatCard';
import UploadDialog from '@/components/dialogs/UploadDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Award, TrendingUp, CheckCircle, Clock, XCircle, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StudentDashboard: React.FC = () => {
  const [uploadProgress, setUploadProgress] = useState(75);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const { toast } = useToast();

  const stats = [
    { title: 'Total Submissions', value: '12', icon: FileText, variant: 'default' as const, trend: '+3 this month' },
    { title: 'Approved', value: '8', icon: CheckCircle, variant: 'success' as const, trend: '66.7% approval rate' },
    { title: 'Pending Review', value: '3', icon: Clock, variant: 'warning' as const, description: 'Under faculty review' },
    { title: 'Badges Earned', value: '5', icon: Award, variant: 'default' as const, trend: '2 new this week' }
  ];

  const submissions = [
    { id: 1, title: 'Data Structures Certificate', type: 'Certificate', status: 'approved', date: '2024-01-15', faculty: 'Dr. Ajay' },
    { id: 2, title: 'Hackathon Winner - TechFest 2024', type: 'Achievement', status: 'approved', date: '2024-01-10', faculty: 'Prof. Kumar' },
    { id: 3, title: 'Machine Learning Course', type: 'Course', status: 'pending', date: '2024-01-08', faculty: 'Dr. Sharma' },
    { id: 4, title: 'Internship Completion Letter', type: 'Experience', status: 'rejected', date: '2024-01-05', faculty: 'Dr. Singh' },
  ];

  const badges = [
    { name: 'Campus Innovator', icon: '🚀', description: 'Completed 3+ innovative projects' },
    { name: 'Tech Leader', icon: '⚡', description: 'Led technical team in hackathon' },
    { name: 'Quick Learner', icon: '📚', description: 'Completed 5+ online courses' },
    { name: 'Community Helper', icon: '🤝', description: 'Participated in 10+ community events' },
    { name: 'Problem Solver', icon: '🧩', description: 'Solved 100+ coding challenges' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-pending text-pending-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold animate-fade-in">Student Dashboard</h1>
            <p className="text-muted-foreground">Manage your academic credentials and track achievements</p>
          </div>
          <Button variant="student" className="animate-scale-in" onClick={() => setUploadDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
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
            <Tabs defaultValue="submissions" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="submissions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Submissions</CardTitle>
                    <CardDescription>Track the status of your uploaded documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {submissions.map((submission) => (
                        <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-card-hover transition-colors">
                          <div className="flex-1">
                            <h4 className="font-medium">{submission.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {submission.type} • Reviewed by {submission.faculty}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">{submission.date}</p>
                          </div>
                          <Badge className={getStatusColor(submission.status)}>
                            {submission.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Auto-Generated Portfolio</CardTitle>
                    <CardDescription>Your verified achievements compiled into a professional portfolio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Portfolio Completion</span>
                        <span className="text-sm font-medium">{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="w-full" />
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => toast({ title: "Portfolio Preview", description: "Opening portfolio preview..." })}>
                          <FileText className="mr-2 h-4 w-4" />
                          Preview Portfolio
                        </Button>
                        <Button variant="student" size="sm" onClick={() => toast({ title: "Download Started", description: "Your portfolio PDF is downloading." })}>
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Strengths & Analytics</CardTitle>
                    <CardDescription>Insights into your academic and extracurricular activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-4 bg-primary/5 rounded-lg">
                          <TrendingUp className="h-8 w-8 mx-auto text-primary mb-2" />
                          <p className="font-medium">Technical Skills</p>
                          <p className="text-2xl font-bold text-primary">85%</p>
                        </div>
                        <div className="p-4 bg-success/5 rounded-lg">
                          <Award className="h-8 w-8 mx-auto text-success mb-2" />
                          <p className="font-medium">Leadership</p>
                          <p className="text-2xl font-bold text-success">78%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle>Earned Badges</CardTitle>
                <CardDescription>Your achievements and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {badges.map((badge, index) => (
                    <div key={index} className="p-3 border rounded-lg text-center hover:bg-card-hover transition-colors">
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <p className="text-xs font-medium">{badge.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Upload</CardTitle>
                <CardDescription>Add new documents quickly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => setUploadDialogOpen(true)}>
                  <FileText className="mr-2 h-4 w-4" />
                  Certificate
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setUploadDialogOpen(true)}>
                  <Award className="mr-2 h-4 w-4" />
                  Achievement
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setUploadDialogOpen(true)}>
                  <Upload className="mr-2 h-4 w-4" />
                  Other Document
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <UploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
    </div>
  );
};

export default StudentDashboard;