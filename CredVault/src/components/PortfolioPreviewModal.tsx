import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
  import { useAuth } from "@/context/AuthContext";
  
  export default function PortfolioPreviewModal() {
    const { user } = useAuth();
  
    if (!user) return null; // don’t show if not logged in
  
    return (
      <Dialog>
        {/* Button to open modal */}
        <DialogTrigger asChild>
          <Button variant="primary">Preview Portfolio</Button>
        </DialogTrigger>
  
        {/* Modal content */}
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Portfolio Preview</DialogTitle>
          </DialogHeader>
  
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full border"
              />
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-sm capitalize">Role: {user.role}</p>
              </div>
            </CardContent>
          </Card>
  
          {/* Achievements Section */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Completed Advanced React Workshop</li>
                <li>Published 2 Research Papers</li>
                <li>Hackathon Winner - 2023</li>
                <li>Certified in Cloud Computing</li>
              </ul>
            </CardContent>
          </Card>
  
          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button onClick={() => window.print()} variant="success">
              Download / Print
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  