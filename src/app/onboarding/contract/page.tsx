
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { generateContract, type ContractInput } from '@/ai/flows/contract-generator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const SIGNUP_STORAGE_KEY = 'parkease-signup-data';
const PARKING_DETAILS_STORAGE_KEY = 'parkease-parking-details';

export default function OnboardingContractPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContractInput | null>(null);
  const [contractText, setContractText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const signupDataJSON = localStorage.getItem(SIGNUP_STORAGE_KEY);
        const parkingDataJSON = localStorage.getItem(PARKING_DETAILS_STORAGE_KEY);

        if (signupDataJSON && parkingDataJSON) {
          const signupData = JSON.parse(signupDataJSON);
          const parkingData = JSON.parse(parkingDataJSON);
          
          setFormData({
            parkingSpaceName: parkingData.name,
            ownerName: signupData.name || 'New Partner',
            location: parkingData.location,
            facilities: parkingData.facilities,
            amenities: parkingData.amenities,
            termsAndConditions: 'Standard collaboration terms apply.', // Placeholder
          });
        } else {
          // If data is missing, send them back to the appropriate step
          router.push(parkingDataJSON ? '/onboarding/signup' : '/onboarding/details');
        }
      }
    } catch (error) {
      console.error('Failed to load onboarding data:', error);
      router.push('/onboarding/details');
    }
  }, [router]);

  const handleGenerateContract = async () => {
    if (!formData) {
      toast({ variant: 'destructive', title: 'Error', description: 'Parking details are missing.' });
      return;
    }
    setIsLoading(true);
    try {
      const result = await generateContract(formData);
      setContractText(result.contractText);
    } catch (error) {
      console.error('Failed to generate contract:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not generate the contract. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFinishOnboarding = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SIGNUP_STORAGE_KEY);
      localStorage.removeItem(PARKING_DETAILS_STORAGE_KEY);
    }
    toast({
      title: 'Welcome to ParkEase!',
      description: 'Onboarding successful. A confirmation has been sent to your email. Redirecting to dashboard...',
    });
    router.push('/dashboard');
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline">Step 3: Collaboration Agreement</h1>
        <p className="text-muted-foreground">
          Please generate and review the standard contract based on your provided details.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Virtual Contract</CardTitle>
          <CardDescription>
            This is a standardized agreement for collaboration, drafted in accordance with Nepalese policies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {contractText ? (
            <ScrollArea className="h-96 rounded-md border p-4 font-mono text-sm">
              <pre className="whitespace-pre-wrap">{contractText}</pre>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 rounded-md border border-dashed text-center p-4">
              <p className="text-muted-foreground mb-4">Your contract will appear here.</p>
              <Button onClick={handleGenerateContract} disabled={isLoading || !formData}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                  </>
                ) : (
                  'Generate Your Contract'
                )}
              </Button>
            </div>
          )}
        </CardContent>
        {contractText && (
          <CardFooter className="flex-col items-start gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="agreement" checked={isAgreed} onCheckedChange={(checked) => setIsAgreed(checked as boolean)} />
              <Label htmlFor="agreement" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I have read and agree to the terms and conditions of this contract.
              </Label>
            </div>
            <Button
              onClick={handleFinishOnboarding}
              disabled={!isAgreed}
              size="lg"
              className="w-full"
              style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}
            >
              Complete Onboarding & Agree
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
