import { useParams } from 'react-router-dom';
import lawsData from '../data/lawsData';
import LawInfoCard from '../components/LawInfoCard';
import QuizStartButton from '../components/QuizStartButton';
import SimulationComponents from '../components/simulations';

export default function LawDetail() {
  const { id } = useParams(); // fixed destructuring
  const law = lawsData[id];
  const SimulationComponent = SimulationComponents?.[law?.component];

  if (!law) return <div className="text-red-500 text-center py-8">Law not found</div>;

  return (
    <div className="flex flex-col items-center w-full mt-20 px-4 py-6 gap-6">
      
      {/* Info + Simulation Section */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-6 justify-center">
        
        {/* Law Info */}
        <div className="w-full md:w-1/2">
          <LawInfoCard law={law} />
        </div>
        
        {/* Simulation */}
        <div className="w-full md:w-1/2">
          {SimulationComponent ? (
            <div className="rounded-2xl shadow-xl backdrop-blur-md bg-white/5 border border-white/10 text-white w-full h-full">
              <SimulationComponent />
            </div>
          ) : (
            <p className="text-center text-gray-500">Simulation not available.</p>
          )}
        </div>
      </div>

      {/* Quiz Button */}
      <QuizStartButton lawId={id} />
    </div>
  );
}
