import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const correlationId = request.headers.get('X-Correlation-ID') || 'unknown';
  const { key } = await params;

  try {
    const section = await prisma.brainSection.findUnique({
      where: { sectionKey: key },
    });

    if (!section) {
      return NextResponse.json(
        { error: 'Brain section not found', correlation_id: correlationId },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: section, correlation_id: correlationId },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] /api/brain/sections/[key] error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', correlation_id: correlationId },
      { status: 500 }
    );
  }
}
