'use server';

import { scanPathologyAnalysis, ScanPathologyAnalysisInput, ScanPathologyAnalysisOutput } from '@/ai/flows/scan-pathology-analysis';

export async function generatePathologyReport(input: ScanPathologyAnalysisInput): Promise<{success: boolean; data?: ScanPathologyAnalysisOutput; error?: string}> {
    try {
        const result = await scanPathologyAnalysis(input);
        return { success: true, data: result };
    } catch (e) {
        console.error(e);
        const error = e instanceof Error ? e.message : 'An unknown error occurred.';
        return { success: false, error };
    }
}
