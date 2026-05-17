import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const correlationId = request.headers.get('X-Correlation-ID') || 'unknown';

  try {
    const { searchParams } = new URL(request.url);
    const workflowName = searchParams.get('workflow_name');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: Record<string, unknown> = {};
    if (workflowName) where.workflowName = workflowName;
    if (status) where.status = status;

    const [logs, total] = await Promise.all([
      prisma.workflowLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.workflowLog.count({ where }),
    ]);

    return NextResponse.json(
      { data: logs, total, limit, offset, correlation_id: correlationId },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] /api/workflows/logs error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', correlation_id: correlationId },
      { status: 500 }
    );
  }
}
