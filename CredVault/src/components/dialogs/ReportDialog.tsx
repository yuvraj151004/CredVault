import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, FileText, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'faculty' | 'admin';
}

const ReportDialog: React.FC<ReportDialogProps> = ({ open, onOpenChange, type }) => {
  const [reportType, setReportType] = useState('');
  const [format, setFormat] = useState('pdf');
  const [period, setPeriod] = useState('current-month');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeDetails, setIncludeDetails] = useState(true);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!reportType) {
      toast({
        title: "Select Report Type",
        description: "Please select a report type to generate.",
        variant: "destructive"
      });
      return;
    }

    // Simulate report generation
    toast({
      title: "Report Generated",
      description: `${reportType} report has been generated and will download shortly.`,
    });

    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Download Started",
        description: `Your ${format.toUpperCase()} report is downloading.`,
      });
    }, 2000);

    onOpenChange(false);
  };

  const facultyReports = [
    { value: 'class-summary', label: 'Class Summary Report' },
    { value: 'department-overview', label: 'Department Overview' },
    { value: 'student-performance', label: 'Student Performance Analysis' },
    { value: 'approval-statistics', label: 'Approval Statistics' }
  ];

  const adminReports = [
    { value: 'institutional-overview', label: 'Institutional Overview' },
    { value: 'naac-compliance', label: 'NAAC Compliance Report' },
    { value: 'nba-accreditation', label: 'NBA Accreditation Data' },
    { value: 'placement-ready', label: 'Placement Readiness Report' },
    { value: 'faculty-performance', label: 'Faculty Performance Report' },
    { value: 'system-analytics', label: 'System Analytics Report' }
  ];

  const reportOptions = type === 'faculty' ? facultyReports : adminReports;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate Report
          </DialogTitle>
          <DialogDescription>
            {type === 'faculty' 
              ? 'Generate department and class-wise activity reports'
              : 'Create institutional reports for accreditation and analytics'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="report-type">Report Type</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                {reportOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="period">Time Period</Label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">Current Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="current-semester">Current Semester</SelectItem>
                <SelectItem value="last-semester">Last Semester</SelectItem>
                <SelectItem value="current-year">Current Academic Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="format">Export Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                <SelectItem value="csv">CSV Data</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Report Options</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="charts" 
                  checked={includeCharts}
                  onCheckedChange={(checked) => setIncludeCharts(checked === true)}
                />
                <Label htmlFor="charts" className="text-sm">Include charts and visualizations</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="details" 
                  checked={includeDetails}
                  onCheckedChange={(checked) => setIncludeDetails(checked === true)}
                />
                <Label htmlFor="details" className="text-sm">Include detailed data tables</Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleGenerate}
              variant={type === 'faculty' ? 'faculty' : 'admin'}
            >
              <Download className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;