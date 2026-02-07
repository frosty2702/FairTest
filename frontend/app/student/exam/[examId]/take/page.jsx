import ClientLayout from '../../../../ClientLayout';
import TakeExam from '../../../../../src/pages/student/TakeExam';

export default function TakeExamPage({ params }) {
  return (
    <ClientLayout title="Take Exam">
      <TakeExam examId={params.examId} />
    </ClientLayout>
  );
}
