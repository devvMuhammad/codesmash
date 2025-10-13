import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function DuplicateChallenger({ display }: { display: boolean }) {
  const [showDuplicateModal, setShowDuplicateModal] = useState(display)

  return <Dialog open={showDuplicateModal} onOpenChange={setShowDuplicateModal}>
    <DialogContent className="sm:max-w-md" showCloseButton={false}>
      <DialogHeader>
        <DialogTitle>Battle Already Full</DialogTitle>
        <DialogDescription>
          Someone has already joined as challenger. You can choose to spectate this battle instead.
        </DialogDescription>
      </DialogHeader>
      <div className="flex gap-3 justify-end pt-4">
        <Button
          onClick={() => setShowDuplicateModal(false)}
        >
          Spectate Battle
        </Button>
      </div>
    </DialogContent>
  </Dialog>
}