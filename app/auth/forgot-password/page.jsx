"use client";
import { Header } from "@/components/header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container px-4 py-16 mx-auto">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Forgot Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Enter your email and we will send you a reset link.
              </p>
              <Input type="email" placeholder="you@example.com" />
              <Button className="w-full">Send reset link</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


