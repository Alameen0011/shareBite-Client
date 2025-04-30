import { Loader2 } from "lucide-react"; // or any spinner icon you like

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2">
      <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
      <span className="text-sm text-muted-foreground">Please wait...</span>
    </div>
  );
};

export default Loading;