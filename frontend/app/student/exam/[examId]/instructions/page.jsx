import ClientLayout from '../../../../ClientLayout';
import ExamInstructions from '../../../../../src/pages/student/ExamInstructions';

export default function ExamInstructionsPage({ params }) {
  return (
    <ClientLayout title="Exam Instructions">
      <ExamInstructions examId={params.examId} />
    </ClientLayout>
  );
}
