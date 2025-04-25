'use client';
import { useState } from 'react';

export default function TaskPage() {
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fm = new FormData(e.currentTarget);
    const payload: Record<string, any> = {};
    fm.forEach((v, k) => {
      payload[k] = k === 'milestone' ? true : v;
    });

    try {
      const res = await fetch('/api/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setResult(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
            <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Task Form</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="record_id" placeholder="Record ID" required className="input" />
                <input name="task_name" placeholder="Task Name" required className="input" />
                <input name="hours_allocated" type="number" placeholder="Hours Allocated" className="input" />
                <input name="project_phase" placeholder="Project Phase" className="input" />
                <input name="priority" placeholder="Priority" className="input" />
                <textarea name="notes" placeholder="Notes" rows={3} className="textarea" />
                <label className="flex items-center">
                <input name="milestone" type="checkbox" className="mr-2" /> Milestone
                </label>
                <button type="submit" className="btn">Submit</button>
            </form>
            {result && <pre className="mt-6 bg-gray-100 p-4 rounded">{JSON.stringify(result, null, 2)}</pre>}
            </div>
        </div>
    </section>
  );
}