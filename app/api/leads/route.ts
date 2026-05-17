import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const correlationId = request.headers.get('X-Correlation-ID') || 'unknown';

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const stage = searchParams.get('stage');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: Record<string, unknown> = {};

    if (stage && stage !== 'all') {
      where.stage = stage;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
        include: {
          assignee: {
            select: { id: true, name: true, email: true },
          },
          _count: {
            select: { activities: true },
          },
        },
      }),
      prisma.lead.count({ where }),
    ]);

    return NextResponse.json(
      { data: leads, total, limit, offset, correlation_id: correlationId },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] /api/leads error:', error);
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
    const { name, company, email, phone, source, value, notes, tags } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required', correlation_id: correlationId },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        company,
        email,
        phone,
        source,
        value: value ? parseFloat(value) : null,
        notes,
        tags: tags || [],
        stage: 'new',
        activities: {
          create: {
            type: 'note',
            description: 'Lead utworzony',
          },
        },
      },
    });

    return NextResponse.json(
      { data: lead, correlation_id: correlationId },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API] POST /api/leads error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', correlation_id: correlationId },
      { status: 500 }
    );
  }
}
