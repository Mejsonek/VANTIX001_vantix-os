import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const correlationId = request.headers.get('X-Correlation-ID') || 'unknown';

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: Record<string, unknown> = {};
    if (status && status !== 'all') {
      where.status = status;
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        take: limit,
        skip: offset,
        include: {
          _count: {
            select: { todos: true, tasks: true },
          },
        },
      }),
      prisma.project.count({ where }),
    ]);

    return NextResponse.json(
      { data: projects, total, limit, offset, correlation_id: correlationId },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] /api/projects error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', correlation_id: correlationId },
      { status: 500 }
    );
  }
}
