import React from "react";
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
import { Bookmark } from "lucide-react";

const savedProfiles = [
  { id: 1, name: "Avneesh Singh", role: "Full Stack Developer", date: "Sept 11, 2025" },
  { id: 2, name: "Yuvraj Singh", role: "Data Scientist", date: "Sept 10, 2025" },
  { id: 3, name: "Raj Patel", role: "Cloud Engineer", date: "Sept 8, 2025" },
  { id: 4, name: "Mahi Sharma", role: "UI/UX Designer", date: "Sept 5, 2025" },
];

export default function SavedProfilesModal() {
  return (
    <Dialog>
      {/* Trigger button */}
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View All Saved
        </Button>
      </DialogTrigger>

      {/* Modal content */}
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>All Saved Profiles</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-80 pr-4">
          <div className="space-y-3">
            {savedProfiles.map((profile) => (
              <Card key={profile.id}>
                <CardContent className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Bookmark className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{profile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {profile.role} • Saved on {profile.date}
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
