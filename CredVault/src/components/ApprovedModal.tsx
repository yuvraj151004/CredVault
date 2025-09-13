import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Card, CardContent } from "@/components/ui/card";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { CheckCircle2 } from "lucide-react";
  
  const approvedDocs = [
    { id: 1, title: "Python Certification", student: "Yuvraj Singh", date: "Sept 10, 2025" },
    { id: 2, title: "Research Paper - AI", student: "Ananniya Acharya", date: "Sept 8, 2025" },
    { id: 3, title: "Workshop Certificate", student: "Raj Patel", date: "Sept 7, 2025" },
    { id: 4, title: "Project Report", student: "Mahi Sharma", date: "Sept 5, 2025" },
  ];
  
  export default function ApprovedModal() {
    return (
      <Dialog>
        {/* This trigger replaces your "View All Approved" button */}
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            View All Approved
          </Button>
        </DialogTrigger>
  
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>All Approved Documents</DialogTitle>
          </DialogHeader>
  
          <ScrollArea className="h-80 pr-4">
            <div className="space-y-3">
              {approvedDocs.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="text-green-600 w-5 h-5" />
                      <div>
                        <p className="font-medium">{doc.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.student} • Approved on {doc.date}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }
  