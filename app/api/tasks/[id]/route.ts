import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const correlationId = request.headers.get('X-Correlation-ID') || 'unknown';
  const { id } = await params;

  try {
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        project: {
          select: { id: true, code: true, name: true },
        },
      },
    });

    if (!task) {
      return NextResponse.json(
        { error: 'Task not found', correlation_id: correlationId },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: task, correlation_id: correlationId },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] /api/tasks/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', correlation_id: correlationId },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const correlationId = request.headers.get('X-Correlation-ID') || 'unknown';
  const { id } = await params;

  try {
    const body = await request.json();
    const { status, priority, title, dueDate, description } = body;

    const existing = await prisma.task.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Task not found', correlation_id: correlationId },
        { status: 404 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (title !== undefined) updateData.title = title;
    if (status !== undefined) {
      updateData.status = status;
      if (status === 'done') {
        updateData.completedAt = new Date();
      }
    }
    if (priority !== undefined) updateData.priority = priority;
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;
    if (description !== undefined) updateData.description = description;

    const task = await prisma.task.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(
      { data: task, correlation_id: correlationId },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] PATCH /api/tasks/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', correlation_id: correlationId },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const correlationId = request.headers.get('X-Correlation-ID') || 'unknown';
  const { id } = await params;

  try {
    const existing = await prisma.task.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Task not found', correlation_id: correlationId },
        { status: 404 }
      );
    }

    await prisma.task.delete({ where: { id } });

    return NextResponse.json(
      { data: { id }, correlation_id: correlationId },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] DELETE /api/tasks/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', correlation_id: correlationId },
      { status: 500 }
    );
  }
}
