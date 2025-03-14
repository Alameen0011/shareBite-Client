import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Utensils } from "lucide-react"

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 flex flex-col items-center justify-center p-4">
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-grid-neutral-200/50 bg-[size:20px_20px] pointer-events-none" />
    
    <div className="relative w-full max-w-sm mx-auto">
      {/* Logo and Title */}
      <div className="flex flex-col items-center mb-8">
        <div className="bg-primary rounded-2xl p-3 mb-4">
          <Utensils className="w-8 h-8 text-primary-foreground" />
        </div>  
        <h1 className="text-2xl font-bold text-neutral-900">Welcome Back to ShareBite</h1>
        <p className="text-neutral-500 mt-2">Sign in to continue sharing</p>
      </div>

      {/* Login Card */}
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <div className="text-sm text-neutral-500">
            Enter your email to receive a magic link
          </div>
        </CardHeader>
      
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="name@example.com"
              className="w-full"
            />
            <Button className="w-full">
              Send Magic Link
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-neutral-500">
                Or continue with
              </span>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-center w-full text-neutral-500">
            Don't have an account?{' '}
            <a href="#" className="text-primary hover:underline">
              Sign up
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  </div>
  )
}

export default Login