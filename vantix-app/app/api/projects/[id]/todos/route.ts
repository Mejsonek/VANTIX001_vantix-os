import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const correlationId = request.headers.get('X-Correlation-ID') || 'unknown';
  const { id } = await params;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');

    const where: Record<string, unknown> = { projectId: id };
    if (status && status !== 'all') where.status = status;
    if (priority && priority !== 'all') where.priority = priority;

    const todos = await prisma.projectTodo.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(
      { data: todos, correlation_id: correlationId },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] /api/projects/[id]/todos error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', correlation_id: correlationId },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const correlationId = request.headers.get('X-Correlation-ID') || 'unknown';
  const { id } = await params;

  try {
    const body = await request.json();
    const { title, description, status, priority, phase } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required', correlation_id: correlationId },
        { status: 400 }
      );
    }

    const todo = await prisma.projectTodo.create({
      data: {
        projectId: id,
        title,
        description: description || null,
        status: status || 'todo',
        priority: priority || 'medium',
        phase: phase || null,
      },
    });

    return NextResponse.json(
      { data: todo, correlation_id: correlationId },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API] POST /api/projects/[id]/todos error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', correlation_id: correlationId },
      { status: 500 }
    );
  }
}
