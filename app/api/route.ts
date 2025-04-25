// app/api/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { upsertRecord } from '@/lib/quickbase';

export async function POST(req: NextRequest) {
  // match the <form name="…"> attributes exactly
  const {
    project_name,
    Priority,
    department,
    labTeam,
    First_Name,
    Last_Name,
    Email,
    description
  } = await req.json();

  // combine first/last into one field
  const fullName = [First_Name, Last_Name].filter(Boolean).join(' ');

  const record: Record<string, { value: any }> = {
    '16': { value: project_name },    // Project Name
    '27': { value: Priority },        // Priority
    '128': { value: department },     // Department
    '131': { value: labTeam },        // Lab Team
    '125': { value: fullName },       // Full Name
    '63':  { value: description },    // Description
  };

  try {
    const data = await upsertRecord(
      process.env.PROJECT_TABLE_ID!,
      record
    );
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.status || 500 }
    );
  }
}
