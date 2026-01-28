import { redirect } from 'next/navigation';

/**
 * This is the root page for the admin section.
 * It automatically redirects the user to the main admin dashboard.
 */
export default function AdminPage() {
  redirect('/admin/dashboard');
  return null; // This component will not render anything as it redirects immediately.
}
