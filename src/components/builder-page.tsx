'use client';

import { BuilderComponent } from '@builder.io/react';
import { builder } from '@/lib/builder';

interface BuilderPageProps {
  model: string;
  content?: any;
  fallback?: React.ReactNode;
}

export function BuilderPage({ model, content, fallback }: BuilderPageProps) {
  if (!process.env.NEXT_PUBLIC_BUILDER_API_KEY) {
    return (
      <div className="p-8 bg-yellow-50 border border-yellow-200 rounded-lg m-4">
        <h3 className="font-bold text-yellow-800 mb-2">Builder.io Configuration Missing</h3>
        <p className="text-yellow-700">
          To use dynamic Builder.io content, please add your NEXT_PUBLIC_BUILDER_API_KEY environment variable.
        </p>
        {fallback && <div className="mt-4">{fallback}</div>}
      </div>
    );
  }

  return (
    <>
      <BuilderComponent 
        model={model}
        content={content}
        options={{
          includeRefs: true,
        }}
      />
      {!content && fallback && <div>{fallback}</div>}
    </>
  );
}
