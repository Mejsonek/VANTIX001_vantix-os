import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const correlationId = request.headers.get('X-Correlation-ID') || 'unknown';

  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const since = new Date();
    since.setDate(since.getDate() - days);

    const [incomeEntries, expenseEntries] = await Promise.all([
      prisma.financeEntry.aggregate({
        where: {
          type: 'income',
          date: { gte: since },
        },
        _sum: { amount: true },
      }),
      prisma.financeEntry.aggregate({
        where: {
          type: 'expense',
          date: { gte: since },
        },
        _sum: { amount: true },
      }),
    ]);

    const totalIncome = incomeEntries._sum.amount || 0;
    const totalExpense = expenseEntries._sum.amount || 0;

    return NextResponse.json(
      {
        data: {
          total_income: Number(totalIncome),
          total_expense: Number(totalExpense),
          balance: Number(totalIncome) - Number(totalExpense),
          days,
        },
        correlation_id: correlationId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] /api/analytics/costs error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', correlation_id: correlationId },
      { status: 500 }
    );
  }
}
