import React, { useState } from 'react';
import Navbar from '@/components/common/Navbar';
import StatCard from '@/components/common/StatCard';
import ProfileDialog from '@/components/dialogs/ProfileDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Users, Bookmark, Eye, Filter, Download, Star, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RecruiterDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const { toast } = useToast();

  const stats = [
    { title: 'Available Candidates', value: '2,847', icon: Users, variant: 'default' as const, description: 'Verified profiles' },
    { title: 'Saved Profiles', value: '24', icon: Bookmark, variant: 'default' as const, trend: '+3 this week' },
    { title: 'Profile Views', value: '156', icon: Eye, variant: 'default' as const, trend: 'This month' },
    { title: 'Shortlisted', value: '8', icon: Star, variant: 'success' as const, description: 'Ready for interview' }
  ];

  const students = [
    {
      id: 1,
      name: 'Alex Kumar',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      department: 'Computer Science',
      year: '4th Year',
      gpa: '8.7',
      location: 'Mumbai',
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      achievements: ['Hackathon Winner', 'AWS Certified', 'Dean\'s List'],
      verified: true,
      rating: 4.8,
      projects: 12,
      badges: 8
    },
    {
      id: 2,
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      department: 'Electronics',
      year: '4th Year',
      gpa: '9.1',
      location: 'Bangalore',
      skills: ['IoT', 'Embedded Systems', 'Arduino', 'C++'],
      achievements: ['Research Publication', 'Patent Filed', 'Innovation Award'],
      verified: true,
      rating: 4.9,
      projects: 8,
      badges: 12
    },
    {
      id: 3,
      name: 'Raj Patel',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=raj',
      department: 'Computer Science',
      year: '3rd Year',
      gpa: '8.9',
      location: 'Pune',
      skills: ['Machine Learning', 'TensorFlow', 'Python', 'Data Science'],
      achievements: ['ML Competition Winner', 'Google Developer', 'Open Source Contributor'],
      verified: true,
      rating: 4.7,
      projects: 15,
      badges: 10
    },
    {
      id: 4,
      name: 'Emma Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
      department: 'Mechanical',
      year: '4th Year',
      gpa: '8.5',
      location: 'Delhi',
      skills: ['CAD', 'SolidWorks', 'Project Management', 'Lean Manufacturing'],
      achievements: ['Industry Internship', 'Design Competition', 'Leadership Excellence'],
      verified: true,
      rating: 4.6,
      projects: 6,
      badges: 7
    }
  ];

  const topSkills = [
    { skill: 'React', count: 340 },
    { skill: 'Python', count: 425 },
    { skill: 'Java', count: 380 },
    { skill: 'Machine Learning', count: 220 },
    { skill: 'AWS', count: 180 },
    { skill: 'Node.js', count: 250 }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
    student.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewProfile = (student: any) => {
    setSelectedStudent(student);
    setProfileDialogOpen(true);
  };

  const handleSave = (student: any) => {
    toast({
      title: "Profile Saved",
      description: `${student.name}'s profile has been saved.`,
    });
  };

  const handleShortlist = (student: any) => {
    toast({
      title: "Candidate Shortlisted",
      description: `${student.name} has been shortlisted.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold animate-fade-in">Recruiter Dashboard</h1>
            <p className="text-muted-foreground">Discover verified student talent with comprehensive portfolios</p>
          </div>
          <Button variant="recruiter" className="animate-scale-in" onClick={() => toast({ title: "Export Started", description: "Shortlist is being exported..." })}>
            <Download className="mr-2 h-4 w-4" />
            Export Shortlist
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Search & Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, skills, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" onClick={() => toast({ title: "Advanced Filters", description: "Opening filter options..." })}>
                <Filter className="mr-2 h-4 w-4" />
                Advanced Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Tabs defaultValue="candidates" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="candidates">All Candidates</TabsTrigger>
                <TabsTrigger value="saved">Saved Profiles</TabsTrigger>
                <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
              </TabsList>

              <TabsContent value="candidates" className="space-y-4">
                <div className="grid gap-4">
                  {filteredStudents.map((student) => (
                    <Card key={student.id} className="hover:shadow-md transition-all duration-200 cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-semibold">{student.name}</h3>
                                {student.verified && (
                                  <Badge className="bg-success text-success-foreground">Verified</Badge>
                                )}
                              </div>
                              <p className="text-muted-foreground text-sm mb-2">
                                {student.department} • {student.year} • GPA: {student.gpa}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {student.location}
                                </span>
                                <span>{student.projects} Projects</span>
                                <span>{student.badges} Badges</span>
                                <span className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  {student.rating}
                                </span>
                              </div>
                              
                              <div className="space-y-2">
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Skills</p>
                                  <div className="flex flex-wrap gap-1">
                                    {student.skills.slice(0, 4).map((skill, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                    {student.skills.length > 4 && (
                                      <Badge variant="outline" className="text-xs">
                                        +{student.skills.length - 4} more
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Key Achievements</p>
                                  <div className="flex flex-wrap gap-1">
                                    {student.achievements.slice(0, 3).map((achievement, index) => (
                                      <Badge key={index} className="bg-badge text-badge-foreground text-xs">
                                        {achievement}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col space-y-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewProfile(student)}>
                              <Eye className="mr-1 h-3 w-3" />
                              View Profile
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleSave(student)}>
                              <Bookmark className="mr-1 h-3 w-3" />
                              Save
                            </Button>
                            <Button variant="recruiter" size="sm" onClick={() => handleShortlist(student)}>
                              <Star className="mr-1 h-3 w-3" />
                              Shortlist
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="saved" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8 text-muted-foreground">
                      <Bookmark className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>24 saved profiles</p>
                      <Button variant="outline" className="mt-3" onClick={() => toast({ title: "Saved Profiles", description: "Viewing all saved profiles..." })}>View All Saved</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shortlisted" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8 text-muted-foreground">
                      <Star className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>8 shortlisted candidates</p>
                      <Button variant="recruiter" className="mt-3" onClick={() => toast({ title: "Shortlist Review", description: "Opening shortlist review..." })}>Review Shortlist</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Skills</CardTitle>
                <CardDescription>Most in-demand skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topSkills.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.skill}</span>
                      <span className="text-xs text-muted-foreground">{item.count} students</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Filters</CardTitle>
                <CardDescription>Filter by common criteria</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => setSearchQuery('4th Year')}>
                  <Users className="mr-2 h-4 w-4" />
                  Final Year Students
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "Filter Applied", description: "Showing top performers..." })}>
                  <Star className="mr-2 h-4 w-4" />
                  Top Performers
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "Filter Applied", description: "Showing industry-ready candidates..." })}>
                  <Bookmark className="mr-2 h-4 w-4" />
                  Industry Ready
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "Filter Applied", description: "Showing fresh graduates..." })}>
                  <Search className="mr-2 h-4 w-4" />
                  Fresh Graduates
                </Button>
              </CardContent>
            </Card>

            {/* Search Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Search Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Use skill keywords like "React", "Python"</p>
                <p>• Filter by department or location</p>
                <p>• All profiles are verified by faculty</p>
                <p>• Access complete portfolios and achievements</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <ProfileDialog 
        open={profileDialogOpen} 
        onOpenChange={setProfileDialogOpen}
        student={selectedStudent}
      />
    </div>
  );
};

export default RecruiterDashboard;