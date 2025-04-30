import { Button } from "@/components/ui/button"
import {motion} from "framer-motion"
interface ConfirmationModalProps {
  open: boolean;
  title: string;
  description: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmationModal = ({
  open,
  title,
  description,
  loading,
  onConfirm,
  onClose,
}: ConfirmationModalProps) => {
  if (!open) return null;
  return (
    <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50"
    onClick={onClose}
  >
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 w-96"
      onClick={(e) => e.stopPropagation()}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-bold text-center mb-4">{title}</h2>
      <p className="text-sm text-gray-600 text-center mb-6">{description}</p>
      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={onClose}
          className="px-6 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={onConfirm}
          disabled={loading}
          className="px-6 py-2 rounded-md text-sm text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-300"
        >
          {loading ? "Cancelling..." : "Yes, Cancel"}
        </Button>
      </div>
    </motion.div>
  </div>
  );
};