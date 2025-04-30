import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface ErrorProps {
  message?: string;
  retry?: () => void;
}

const AdminError = ({ message = "Something went wrong.", retry }: ErrorProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md w-full space-y-4">
        <h1 className="text-2xl font-semibold text-red-600">{message}</h1>

        {retry && (
          <Button onClick={retry} variant="outline" className="w-full">
            Retry
          </Button>
        )}

        <Button onClick={() => navigate("/admin")} className="w-full">
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default AdminError;