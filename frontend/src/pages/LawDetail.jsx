import { useParams } from 'react-router-dom';
import lawsData from '../data/lawsData';
import LawInfoCard from '../components/LawInfoCard';
import QuizStartButton from '../components/QuizStartButton';
import SimulationComponents from '../components/simulations';
// import other simulators here...

export default function LawDetail() {
  const lawId = useParams();
  const law = lawsData[lawId.id];
  const SimulationComponent = SimulationComponents[law.component];

  if (!law) return <div className="text-red-500">Law not found</div>;

  return (
    <div className="flex flex-col w-full items-center gap-4 p-4">
      <LawInfoCard law={law} />
      {SimulationComponent ? (
        <div className="my-6">
          <SimulationComponent />
        </div>
      ) : (
        <p className="text-center text-gray-500">Simulation not available.</p>
      )}
      <QuizStartButton lawId={lawId} />
    </div>
  );
}
