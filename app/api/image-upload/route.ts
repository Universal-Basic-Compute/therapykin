import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/utils/auth';

export async function POST(request: NextRequest) {
  try {
    // Get the current user
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Get the image data from the request
    const { image } = await request.json();
    
    if (!image || !image.startsWith('data:image/')) {
      return NextResponse.json(
        { error: 'Invalid image data' },
        { status: 400 }
      );
    }
    
    // Process the image (optional: resize, compress, etc.)
    // For now, we'll just pass it through
    
    // In a production environment, you might want to:
    // 1. Upload the image to a storage service (S3, etc.)
    // 2. Return a URL to the uploaded image
    // 3. Store the image reference in your database
    
    // Log image data length for debugging
    console.log(`Image processed successfully. Data length: ${image.length}`);
    
    return NextResponse.json({ 
      success: true,
      imageUrl: image // In production, this would be the URL to the stored image
    });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
}
