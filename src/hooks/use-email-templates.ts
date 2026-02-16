"use client";

import { useState, useEffect, useCallback } from "react";
import { getEmailTemplate } from "@/lib/email-templates";

const STORAGE_KEY_PREFIX = "emailTemplate_";

export function useEmailTemplate(name: string) {
  const [template, setTemplate] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}${name}`);
        if (saved) {
          setTemplate(JSON.parse(saved));
        } else {
          const generated = await getEmailTemplate(name, {});
          setTemplate(generated);
        }
      } catch (error) {
        console.error(`Could not load email template '${name}'`, error);
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [name]);

  const saveTemplate = useCallback(
    async (newTemplate: any): Promise<void> => {
      try {
        localStorage.setItem(
          `${STORAGE_KEY_PREFIX}${name}`,
          JSON.stringify(newTemplate)
        );
        setTemplate(newTemplate);
      } catch (error) {
        console.error(
          `Could not save email template '${name}' to localStorage`,
          error
        );
        throw new Error("Failed to save template.");
      }
    },
    [name]
  );

  return { template, isLoading, saveTemplate };
}
