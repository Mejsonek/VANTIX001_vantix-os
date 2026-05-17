import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const correlationId = request.headers.get('X-Correlation-ID') || 'unknown';

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const projectId = searchParams.get('project_id');
    const dueDate = searchParams.get('due_date');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: Record<string, unknown> = {};

    if (status && status !== 'all') {
      where.status = status;
    }
    if (priority && priority !== 'all') {
      where.priority = priority;
    }
    if (projectId) {
      where.projectId = projectId;
    }
    if (dueDate) {
      where.dueDate = new Date(dueDate);
    }

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        orderBy: [{ dueDate: 'asc' }, { createdAt: 'desc' }],
        take: limit,
        skip: offset,
        include: {
          project: {
            select: { id: true, code: true, name: true },
          },
        },
      }),
      prisma.task.count({ where }),
    ]);

    return NextResponse.json(
      { data: tasks, total, limit, offset, correlation_id: correlationId },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] /api/tasks error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', correlation_id: correlationId },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const correlationId = request.headers.get('X-Correlation-ID') || 'unknown';

  try {
    const body = await request.json();
    const { title, description, status, priority, projectId, dueDate } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required', correlation_id: correlationId },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        description: description || null,
        status: status || 'todo',
        priority: priority || 'medium',
        projectId: projectId || null,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });

    return NextResponse.json(
      { data: task, correlation_id: correlationId },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API] POST /api/tasks error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', correlation_id: correlationId },
      { status: 500 }
    );
  }
}
