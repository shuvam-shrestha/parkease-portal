'use server';

/**
 * @fileOverview Generates a virtual standard contract based on Nepal policies for parking space owners.
 *
 * - generateContract - A function that generates the contract.
 * - ContractInput - The input type for the generateContract function.
 * - ContractOutput - The return type for the generateContract function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContractInputSchema = z.object({
  parkingSpaceName: z.string().describe('The name of the parking space.'),
  ownerName: z.string().describe('The name of the parking space owner.'),
  location: z.string().describe('The location of the parking space.'),
  facilities: z.string().describe('Facilities provided by the parking space.'),
  amenities: z.string().describe('Amenities provided by the parking space.'),
  termsAndConditions: z.string().describe('Terms and Conditions for collaborator.')
});
export type ContractInput = z.infer<typeof ContractInputSchema>;

const ContractOutputSchema = z.object({
  contractText: z.string().describe('The generated contract text.'),
});
export type ContractOutput = z.infer<typeof ContractOutputSchema>;

export async function generateContract(input: ContractInput): Promise<ContractOutput> {
  return generateContractFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contractGeneratorPrompt',
  input: {schema: ContractInputSchema},
  output: {schema: ContractOutputSchema},
  prompt: `You are a legal expert specializing in drafting contracts based on Nepal policies.

  Generate a standard contract for a parking space owner to collaborate with a parking service, considering the following information:

  Parking Space Name: {{{parkingSpaceName}}}
  Owner Name: {{{ownerName}}}
  Location: {{{location}}}
  Facilities: {{{facilities}}}
  Amenities: {{{amenities}}}
  Terms and Conditions: {{{termsAndConditions}}}

The contract should include standard clauses related to:
- Service agreement
- Payment terms
- Liability
- Termination conditions
- Legal compliance with Nepal policies

Ensure the contract is comprehensive, legally sound, and easy to understand for the parking space owner.
`,
});

const generateContractFlow = ai.defineFlow(
  {
    name: 'generateContractFlow',
    inputSchema: ContractInputSchema,
    outputSchema: ContractOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
