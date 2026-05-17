import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const correlationId = request.headers.get('X-Correlation-ID') || 'unknown';
  const { id } = await params;

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        todos: {
          orderBy: { createdAt: 'desc' },
        },
        logs: {
          orderBy: { sessionDate: 'desc' },
          take: 10,
        },
        decisions: {
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { todos: true, tasks: true, logs: true },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found', correlation_id: correlationId },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: project, correlation_id: correlationId },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] /api/projects/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', correlation_id: correlationId },
      { status: 500 }
    );
  }
}
