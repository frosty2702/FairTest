import ClientLayout from '../ClientLayout';
import StudentDashboard from '../../src/pages/student/StudentDashboard';

export default function StudentPage() {
  return (
    <ClientLayout title="Student Dashboard">
      <StudentDashboard />
    </ClientLayout>
  );
}
