'use client';
import { useState } from 'react';
import Request from '@/components/Request';

export default function ProjectPage() {
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fm = new FormData(e.currentTarget);
    const payload: Record<string, any> = {};
    fm.forEach((v, k) => (payload[k] = v));

    try {
      const res = await fetch('/api/project', {
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
            <Request />
            
        </div>
    </section>
  );
}