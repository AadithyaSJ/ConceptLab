import { useParams } from 'react-router-dom';
import lawsData from '../data/lawsData';
import LawInfoCard from '../components/LawInfoCard';
import ControlPanel from '../components/ControlPanel';
import QuizStartButton from '../components/QuizStartButton';
import ForceSimulator from '../components/ForceSimulator';
// import other simulators here...

export default function LawDetail() {
  const lawId = useParams();
  const law = lawsData[lawId.id];

  console.log(lawsData[lawId]);
  console.log(lawId.id);
  

  if (!law) return <div className="text-red-500">Law not found</div>;

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <LawInfoCard law={law} />
      {law.component === 'ForceSimulator' && <ForceSimulator />}
      {/* Later: Add other simulators conditionally here */}
      <ControlPanel />
      <QuizStartButton lawId={lawId} />
    </div>
  );
}
