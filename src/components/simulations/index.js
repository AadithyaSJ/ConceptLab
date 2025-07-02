import ForceSimulator from './ForceSimulator/ForceSimulator';
import NewtonFirstLawSimulator from './InertiaDropSimulator/FallingAppleScene';
import SnellsSim from './SnellsSim/SnellsSim';
import OhmsLawSim from './OhmSim/OhmLawSim';
import ThirdLaw from './ThirdLaw/ThirdLaw';
import HookeLaw from './HookeLaw/HookeLaw';
import FaradayLaw from './FaradayLaw/FaradayLaw';
import Archimedes from './Archimedes/Archimedes';
import Reflection from './Reflection/Reflection';
import BoyleLaw from './BoyleLaw/BoyleLaw'; // Importing Boyle's Law simulation
// Import other simulators here...

const SimulationComponents = {
  ForceSimulator,
  NewtonFirstLawSimulator,
  SnellsSim,
  OhmsLawSim,
  ThirdLaw,
  HookeLaw,
  FaradayLaw,
  Archimedes,
  Reflection,
  BoyleLaw,
};

export default SimulationComponents;
