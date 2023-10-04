import Replicate from 'replicate';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const { user } = auth();
		const body = await req.json();
		const { prompt } = body;

		if (!prompt) {
			return new NextResponse('Prompt is required', { status: 400 });
		}

		let response;
		if (process.env.NODE_ENV === 'production') {
			// Code is running during build process
			// You may need to handle authentication differently during build
			// For now, provide a placeholder response
			response = { message: 'Authentication not available during build' };
		} else {
			// Code is running at runtime
			if (!user) {
				return new NextResponse('Unauthorized', { status: 401 });
			}

			const replicate = new Replicate({
				auth: process.env.REPLICATE_API_TOKEN!,
			});

			response = await replicate.run(
				'riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05',
				{
					input: {
						prompt_a: prompt,
					},
				}
			);
		}

		return new NextResponse(JSON.stringify(response), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.log('[MUSIC_ERROR]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
