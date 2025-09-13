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
import { Star } from "lucide-react";

const shortlisted = [
  { id: 1, name: "Ananya Verma", role: "Frontend Developer", date: "Sept 12, 2025" },
  { id: 2, name: "Yuvraj Singh", role: "Data Scientist", date: "Sept 11, 2025" },
  { id: 3, name: "Raj Patel", role: "Cloud Engineer", date: "Sept 9, 2025" },
  { id: 4, name: "Mahi Sharma", role: "UI/UX Designer", date: "Sept 6, 2025" },
];

export default function ShortlistModal() {
  return (
    <Dialog>
      {/* Trigger button */}
      <DialogTrigger asChild>
        <Button variant="student" size="sm">
          Review Shortlist
        </Button>
      </DialogTrigger>

      {/* Modal content */}
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Shortlisted Candidates</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-80 pr-4">
          <div className="space-y-3">
            {shortlisted.map((candidate) => (
              <Card key={candidate.id}>
                <CardContent className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="font-medium">{candidate.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {candidate.role} • Shortlisted on {candidate.date}
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
