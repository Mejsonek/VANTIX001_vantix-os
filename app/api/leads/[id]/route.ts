import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const correlationId = request.headers.get('X-Correlation-ID') || 'unknown';
  const { id } = await params;

  try {
    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        assignee: {
          select: { id: true, name: true, email: true },
        },
        activities: {
          orderBy: { createdAt: 'desc' },
        },
        notes_rel: {
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { activities: true },
        },
      },
    });

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found', correlation_id: correlationId },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: lead, correlation_id: correlationId },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] /api/leads/[id] error:', error);
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
    const { stage, value, notes } = body;

    const existing = await prisma.lead.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Lead not found', correlation_id: correlationId },
        { status: 404 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (stage !== undefined) updateData.stage = stage;
    if (value !== undefined) updateData.value = parseFloat(value);
    if (notes !== undefined) updateData.notes = notes;

    const lead = await prisma.lead.update({
      where: { id },
      data: updateData,
    });

    // Log activity if stage changed
    if (stage !== undefined && stage !== existing.stage) {
      await prisma.leadActivity.create({
        data: {
          leadId: id,
          type: 'stage_change',
          description: `Zmiana statusu: ${existing.stage} → ${stage}`,
          oldValue: existing.stage,
          newValue: stage,
        },
      });
    }

    return NextResponse.json(
      { data: lead, correlation_id: correlationId },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] PATCH /api/leads/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', correlation_id: correlationId },
      { status: 500 }
    );
  }
}
