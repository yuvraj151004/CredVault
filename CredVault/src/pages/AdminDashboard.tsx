import React, { useState } from 'react';
import Navbar from '@/components/common/Navbar';
import StatCard from '@/components/common/StatCard';
import ReportDialog from '@/components/dialogs/ReportDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Users, FileText, TrendingUp, Shield, Download, Settings, BarChart3, PieChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard: React.FC = () => {
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const { toast } = useToast();
  const stats = [
    { title: 'Total Students', value: '2,847', icon: Users, variant: 'default' as const, trend: '+12% this semester' },
    { title: 'Total Submissions', value: '15,342', icon: FileText, variant: 'default' as const, trend: '+8% this month' },
    { title: 'Active Faculty', value: '89', icon: Shield, variant: 'default' as const, description: 'Currently reviewing' },
    { title: 'Approval Rate', value: '92%', icon: TrendingUp, variant: 'success' as const, trend: '+2% improvement' }
  ];

  const departmentData = [
    { name: 'Computer Science', students: 850, submissions: 4200, approvalRate: 94 },
    { name: 'Electronics', students: 720, submissions: 3800, approvalRate: 91 },
    { name: 'Mechanical', students: 650, submissions: 3200, approvalRate: 89 },
    { name: 'Civil', students: 520, submissions: 2900, approvalRate: 93 },
    { name: 'Chemical', students: 107, submissions: 1242, approvalRate: 90 }
  ];

  const accreditationMetrics = [
    { metric: 'Student-Faculty Ratio', target: '15:1', current: '14:1', status: 'excellent' },
    { metric: 'Research Publications', target: '500', current: '547', status: 'excellent' },
    { metric: 'Industry Partnerships', target: '25', current: '28', status: 'excellent' },
    { metric: 'Placement Rate', target: '85%', current: '89%', status: 'excellent' },
    { metric: 'Infrastructure Score', target: '4.0', current: '4.2', status: 'excellent' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-primary';
      case 'needs-improvement': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold animate-fade-in">Admin Dashboard</h1>
            <p className="text-muted-foreground">Institution-wide analytics and accreditation management</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="animate-scale-in" onClick={() => toast({ title: "Settings", description: "Opening system settings..." })}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="admin" className="animate-scale-in" onClick={() => setReportDialogOpen(true)}>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
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
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="departments">Departments</TabsTrigger>
                <TabsTrigger value="accreditation">Accreditation</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Activity</CardTitle>
                      <CardDescription>Submissions and approvals trend</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                        <div className="text-center">
                          <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                          <p className="text-muted-foreground">Activity Chart</p>
                          <p className="text-xs text-muted-foreground">15% increase this month</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Department Distribution</CardTitle>
                      <CardDescription>Student enrollment by department</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                        <div className="text-center">
                          <PieChart className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                          <p className="text-muted-foreground">Distribution Chart</p>
                          <p className="text-xs text-muted-foreground">5 active departments</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="departments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Department Performance</CardTitle>
                    <CardDescription>Detailed view of each department's activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {departmentData.map((dept, index) => (
                        <div key={index} className="p-4 border rounded-lg hover:bg-card-hover transition-colors">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium">{dept.name}</h4>
                            <span className={`text-sm font-medium ${dept.approvalRate >= 90 ? 'text-success' : 'text-warning'}`}>
                              {dept.approvalRate}% approval
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                            <div>
                              <p className="text-xs">Students</p>
                              <p className="font-medium text-foreground">{dept.students}</p>
                            </div>
                            <div>
                              <p className="text-xs">Submissions</p>
                              <p className="font-medium text-foreground">{dept.submissions}</p>
                            </div>
                            <div>
                              <p className="text-xs">Avg per Student</p>
                              <p className="font-medium text-foreground">
                                {Math.round(dept.submissions / dept.students)}
                              </p>
                            </div>
                          </div>
                          <Progress value={dept.approvalRate} className="mt-3" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="accreditation" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>NAAC/NBA Readiness</CardTitle>
                    <CardDescription>Key metrics for accreditation compliance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {accreditationMetrics.map((metric, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{metric.metric}</p>
                            <p className="text-sm text-muted-foreground">
                              Target: {metric.target}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold ${getStatusColor(metric.status)}`}>
                              {metric.current}
                            </p>
                            <p className="text-xs text-success">Above target</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Platform performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Server Uptime</span>
                  <span className="text-sm font-medium text-success">99.9%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Users</span>
                  <span className="text-sm font-medium">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Storage Used</span>
                  <span className="text-sm font-medium">2.4 TB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Response</span>
                  <span className="text-sm font-medium text-success">145ms</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Admin Actions</CardTitle>
                <CardDescription>System management tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "User Management", description: "Opening user management interface..." })}>
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "Role Permissions", description: "Opening role permission settings..." })}>
                  <Shield className="mr-2 h-4 w-4" />
                  Role Permissions
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "Backup Started", description: "System backup initiated..." })}>
                  <Download className="mr-2 h-4 w-4" />
                  Backup Data
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "System Config", description: "Opening system configuration..." })}>
                  <Settings className="mr-2 h-4 w-4" />
                  System Config
                </Button>
              </CardContent>
            </Card>

            {/* Integration Status */}
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>External system connections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">DigiLocker API</span>
                  <span className="text-xs px-2 py-1 bg-pending text-pending-foreground rounded">Prototype</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">ERP System</span>
                  <span className="text-xs px-2 py-1 bg-success text-success-foreground rounded">Connected</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">LMS Portal</span>
                  <span className="text-xs px-2 py-1 bg-success text-success-foreground rounded">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Blockchain</span>
                  <span className="text-xs px-2 py-1 bg-pending text-pending-foreground rounded">Demo</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <ReportDialog 
        open={reportDialogOpen} 
        onOpenChange={setReportDialogOpen}
        type="admin"
      />
    </div>
  );
};

export default AdminDashboard;