'use client'

import Link from 'next/link'
import { GalleryVerticalEnd } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '@/lib/constant'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { useRouter } from 'next/navigation'
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [otpModalOpen, setOtpModalOpen] = useState(false)
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const enteredEmail = inputRef.current?.value
    if (!enteredEmail) {
      toast.error('Please enter your email')
      return
    }

    try {
      await axios.post(`${BACKEND_URL}/api/auth/intiate-signin`, {
        email: enteredEmail,
      })
      setEmail(enteredEmail)
      toast.success('OTP sent to your email')
      setOtpModalOpen(true)
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Something went wrong')
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length !== 6) {
      toast.error('Enter full 6-digit OTP')
      return
    }
    setLoading(true)
    try {
      await axios
        .post(`${BACKEND_URL}/api/auth/verify-otp`, {
          email,
          otp: parseInt(otp, 10),
        })
        .then(async (response) => {
          const { token } = response.data
          await axios.post('/api/otp', { token })
        })
      toast.success('OTP verified successfully')
      setOtpModalOpen(false)
      router.push('/')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form onSubmit={handleLogin}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">CodeContest</span>
            </Link>
            <h1 className="text-xl font-bold">Welcome to Codecontest.</h1>
            <div className="text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="#" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="me@example.com"
                required
                ref={inputRef}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" type="button" className="w-full">
              Continue with Apple
            </Button>
            <Button variant="outline" type="button" className="w-full">
              Continue with Google
            </Button>
          </div>
        </div>
      </form>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{' '}
        <Link href="#">Terms of Service</Link> and{' '}
        <Link href="#">Privacy Policy</Link>.
      </div>

      {/* OTP Modal */}
      <Dialog open={otpModalOpen} onOpenChange={setOtpModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter OTP</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleVerify} className="space-y-4 m-auto">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
