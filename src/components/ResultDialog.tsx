import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, AlertTriangle } from "lucide-react";

export type ResultDialogState = {
  open: boolean;
  status: "success" | "error";
  title: string;
  description: string;
};

export const initialResult: ResultDialogState = {
  open: false,
  status: "success",
  title: "",
  description: "",
};

interface Props {
  state: ResultDialogState;
  onOpenChange: (open: boolean) => void;
  ctaLabel?: string;
}

const ResultDialog = ({ state, onOpenChange, ctaLabel = "Close" }: Props) => {
  const isSuccess = state.status === "success";
  return (
    <Dialog open={state.open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-center bg-background border-border">
        <DialogHeader className="items-center">
          <div
            className={`h-16 w-16 grid place-items-center rounded-full mb-4 ${
              isSuccess
                ? "bg-accent/15 text-accent"
                : "bg-destructive/15 text-destructive"
            }`}
            aria-hidden
          >
            {isSuccess ? (
              <CheckCircle2 className="h-8 w-8" />
            ) : (
              <AlertTriangle className="h-8 w-8" />
            )}
          </div>
          <div className="font-mono-accent text-[10px] tracking-[0.18em] text-accent mb-2">
            ◆ {isSuccess ? "Confirmed" : "Something went wrong"}
          </div>
          <DialogTitle className="font-display text-3xl md:text-4xl text-architectural">
            {state.title}
          </DialogTitle>
          <DialogDescription className="font-serif text-base text-muted-foreground leading-relaxed pt-2">
            {state.description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center mt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="btn-gold w-full sm:w-auto justify-center"
          >
            {ctaLabel}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResultDialog;
