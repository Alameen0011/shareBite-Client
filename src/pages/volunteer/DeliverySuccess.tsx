import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useEffect, useState } from "react";

const DeliverySuccess = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Stop confetti after 4 seconds
    const timer = setTimeout(() => setShowConfetti(false), 100000);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    navigate("/volunteer/dashboard");
  };

  return (
    <div className="relative flex items-center justify-center min-h-[80vh] p-4">
      {showConfetti && <Confetti width={width} height={height} numberOfPieces={250} />}
      
      <Card className="w-full max-w-md text-center shadow-xl z-10 font-primary">
        <CardContent className="p-6 flex flex-col items-center">
          <CheckCircle2 className="text-green-500 w-16 h-16 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Delivery Completed!</h2>
          <p className="text-muted-foreground mb-6">
          "Every action counts. You just made someone's day better. Thank you!""
          </p>
          <Button onClick={handleBack} className="w-full sm:w-auto">
          Continue Helping
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliverySuccess;
