'use server';
/**
 * @fileOverview A Genkit flow for generating a personalized pathology analysis of an ultrasound scan.
 *
 * - scanPathologyAnalysis - A function that initiates the scan pathology analysis process.
 * - ScanPathologyAnalysisInput - The input type for the scanPathologyAnalysis function.
 * - ScanPathologyAnalysisOutput - The return type for the scanPathologyAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ScanPathologyAnalysisInputSchema = z.object({
  patientHistory: z.string().describe('Relevant medical history of the patient, including past diagnoses, treatments, and current symptoms.'),
  bodyPart: z.string().describe('The specific body part that was scanned (e.g., Abdomen, Kidney, Left Hand, Right Hand, Pregnancy, Cardiac).'),
  ultrasoundScanDescription: z.string().describe('A detailed description of the ultrasound scan findings, including all observations, measurements, and any abnormalities noted.'),
  ultrasoundScanImage: z
    .string()
    .optional()
    .describe(
      "An optional ultrasound scan image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ScanPathologyAnalysisInput = z.infer<typeof ScanPathologyAnalysisInputSchema>;

const ScanPathologyAnalysisOutputSchema = z.object({
  pathologyAnalysis: z.string().describe('A personalized analysis of potential pathologies, their likelihood with clear qualifiers (e.g., "highly likely", "moderately suggestive of"), and why.'),
  confidenceLevel: z
    .enum(['High', 'Medium', 'Low'])
    .describe('The model\'s confidence level in the pathology analysis provided.'),
  recommendations: z.array(z.string()).describe('Recommendations for further investigations, follow-up scans, specialist consultations, or management actions based on the analysis.'),
});
export type ScanPathologyAnalysisOutput = z.infer<typeof ScanPathologyAnalysisOutputSchema>;

export async function scanPathologyAnalysis(input: ScanPathologyAnalysisInput): Promise<ScanPathologyAnalysisOutput> {
  return scanPathologyAnalysisFlow(input);
}

const scanPathologyAnalysisPrompt = ai.definePrompt({
  name: 'scanPathologyAnalysisPrompt',
  input: {schema: ScanPathologyAnalysisInputSchema},
  output: {schema: ScanPathologyAnalysisOutputSchema},
  prompt: `You are an expert medical professional specializing in ultrasound diagnostics. Your task is to provide a personalized analysis of an ultrasound scan, considering the patient's medical history and the specific body part scanned.

Based on the provided information, identify potential pathologies, assess their likelihood with clear qualifiers (e.g., "highly likely", "moderately suggestive of"), and suggest recommendations for further investigation or actions. Act as a tool for the medical professional's decision-making process.

Patient History: {{{patientHistory}}}
Body Part Scanned: {{{bodyPart}}}
Ultrasound Scan Findings: {{{ultrasoundScanDescription}}}
{{#if ultrasoundScanImage}}
Ultrasound Image: {{media url=ultrasoundScanImage}}
{{/if}}

Please provide your analysis, confidence level, and recommendations in the specified JSON format.`,
});

const scanPathologyAnalysisFlow = ai.defineFlow(
  {
    name: 'scanPathologyAnalysisFlow',
    inputSchema: ScanPathologyAnalysisInputSchema,
    outputSchema: ScanPathologyAnalysisOutputSchema,
  },
  async input => {
    const {output} = await scanPathologyAnalysisPrompt(input);
    return output!;
  }
);
