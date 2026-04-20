"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifyAdminToken } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";
import { Lock, Check, X } from "lucide-react";

interface Registration {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  affiliation?: string;
  role?: string;
  dietaryRequirements?: string;
  attendingDinner?: boolean;
  abstract?: string;
  status: string;
  qrCode?: string;
}

interface GuestDetailsProps {
  registration: Registration;
}

export default function GuestDetails({ registration }: GuestDetailsProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check for token in localStorage
    const storedToken = localStorage.getItem("adminToken");
    if (storedToken) {
      verifyToken(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyToken = async (tokenToVerify: string) => {
    setIsLoading(true);
    try {
      const result = await verifyAdminToken(tokenToVerify);
      if (result) {
        setIsAuthenticated(true);
        localStorage.setItem("adminToken", tokenToVerify);
      }
    } catch (error) {
      console.error("Token verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await verifyToken(token);
    if (!isAuthenticated) {
      toast({
        title: "Authentication failed",
        description: "Invalid admin token",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <Check className="h-3 w-3 mr-1" /> Confirmed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            <X className="h-3 w-3 mr-1" /> Cancelled
          </Badge>
        );
      default:
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
            Pending
          </Badge>
        );
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (!isAuthenticated) {
    return (
      <Card>
        <CardHeader className="text-center">
          <Lock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <CardTitle>Admin Authentication Required</CardTitle>
          <CardDescription>
            Please enter the admin token to view guest details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token">Admin Token</Label>
              <Input
                id="token"
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter admin token"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Verify
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">
              {registration.firstName} {registration.lastName}
            </CardTitle>
            <CardDescription>{registration.email}</CardDescription>
          </div>
          <div>{getStatusBadge(registration.status)}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Registration Details
              </h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Affiliation
                  </dt>
                  <dd>{registration.affiliation || "Not specified"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Role</dt>
                  <dd>{registration.role || "Not specified"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Dietary Requirements
                  </dt>
                  <dd>{registration.dietaryRequirements || "None"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Attending Dinner
                  </dt>
                  <dd>{registration.attendingDinner ? "Yes" : "No"}</dd>
                </div>
              </dl>
            </div>
          </div>

          {registration.abstract && (
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Abstract Submission
              </h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="whitespace-pre-wrap">{registration.abstract}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
