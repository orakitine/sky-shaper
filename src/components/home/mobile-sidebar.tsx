import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { NutrientDetails } from "@/utils/edamam/nutrition-details.types";
import { NutrientDetailsCard } from "../llm/nutrition-details-card";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  nutrientDetails: NutrientDetails;
}

export function MobileSidebar({
  isOpen,
  onClose,
  nutrientDetails,
}: MobileSidebarProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Nutrients Total</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <NutrientDetailsCard
            nutrientDetails={nutrientDetails}
            title="Total"
            showFooter={false}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
