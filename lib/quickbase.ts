// lib/quickbase.ts

const REALM    = process.env.QB_REALM_HOSTNAME!;
const USER_TOKEN = process.env.QB_USER_TOKEN!;

/**
 * Upsert a single record into the given Quickbase table.
 * @param tableId – the Quickbase table’s 10-char ID (from PROJECT_TABLE_ID or TASK_TABLE_ID)
 * @param record  – a map of field-IDs to { value: … } objects
 */
export async function upsertRecord(
  tableId: string,
  record: Record<string, { value: any }>
): Promise<any> {
  const url = 'https://api.quickbase.com/v1/records';
  const payload = {
    to: tableId,
    data: [record],
    fieldsToReturn: Object.keys(record),
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'QB-Realm-Hostname': REALM,
      'Authorization':      `QB-USER-TOKEN ${USER_TOKEN}`,
      'Content-Type':       'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Quickbase responded ${res.status}: ${text}`);
  }
  return res.json();
}
