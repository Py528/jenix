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
			// Code is running during the build process
			// You may want to provide a placeholder response during build
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
				'anotherjesse/zeroscope-v2-xl:71996d331e8ede8ef7bd76eba9fae076d31792e4ddf4ad057779b443d6aea62f',
				{
					input: {
						prompt,
					},
				}
			);
		}

		return new NextResponse(JSON.stringify(response), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('[VIDEO_ERROR]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
