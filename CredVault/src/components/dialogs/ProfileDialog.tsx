import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MapPin, Download, Bookmark, Calendar, Award, Code, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student?: {
    id: number;
    name: string;
    avatar: string;
    department: string;
    year: string;
    gpa: string;
    location: string;
    skills: string[];
    achievements: string[];
    verified: boolean;
    rating: number;
    projects: number;
    badges: number;
  } | null;
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({ open, onOpenChange, student }) => {
  const { toast } = useToast();

  if (!student) return null;

  const handleSave = () => {
    toast({
      title: "Profile Saved",
      description: `${student.name}'s profile has been saved to your shortlist.`,
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: `${student.name}'s portfolio is downloading.`,
    });
  };

  const handleShortlist = () => {
    toast({
      title: "Candidate Shortlisted",
      description: `${student.name} has been added to your shortlist.`,
    });
  };

  const mockProjects = [
    { name: 'E-commerce Web App', tech: 'React, Node.js, MongoDB', description: 'Full-stack application with payment integration' },
    { name: 'AI Chatbot', tech: 'Python, TensorFlow, Flask', description: 'Machine learning powered customer service bot' },
    { name: 'Mobile Task Manager', tech: 'React Native, Firebase', description: 'Cross-platform productivity application' }
  ];

  const mockCertifications = [
    { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: 'Jan 2024', verified: true },
    { name: 'React Developer Certification', issuer: 'Meta', date: 'Dec 2023', verified: true },
    { name: 'Machine Learning Specialization', issuer: 'Stanford/Coursera', date: 'Nov 2023', verified: true }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Student Profile</DialogTitle>
          <DialogDescription>
            Comprehensive view of verified student achievements and portfolio
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold">{student.name}</h2>
                  {student.verified && (
                    <Badge className="bg-success text-success-foreground">Verified</Badge>
                  )}
                </div>
                <p className="text-muted-foreground mb-2">
                  {student.department} • {student.year} • GPA: {student.gpa}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {student.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {student.rating}/5.0
                  </span>
                  <span>{student.projects} Projects</span>
                  <span>{student.badges} Badges</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="mr-1 h-3 w-3" />
                Portfolio
              </Button>
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Bookmark className="mr-1 h-3 w-3" />
                Save
              </Button>
              <Button variant="recruiter" size="sm" onClick={handleShortlist}>
                <Star className="mr-1 h-3 w-3" />
                Shortlist
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      Technical Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {student.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Key Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {student.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-primary rounded-full" />
                          <span className="text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-4">
              {mockProjects.map((project, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription>{project.tech}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="certifications" className="space-y-4">
              {mockCertifications.map((cert, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{cert.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {cert.issuer} • {cert.date}
                        </p>
                      </div>
                      {cert.verified && (
                        <Badge className="bg-success text-success-foreground">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {student.achievements.map((achievement, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Award className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{achievement}</p>
                          <p className="text-xs text-muted-foreground">Faculty Verified</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;