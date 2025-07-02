const lawsData = [
  {
    name: "Newton's First Law",
    formula: "An object remains in uniform motion or at rest unless acted upon by a force.",
    passage1:
      "Newton’s First Law, also known as the Law of Inertia, explains that objects will not change their state of motion unless a force is applied.",
    passage2:
      "In this simulation, users drop an object and observe how it remains at rest until acted upon by gravity, reinforcing the concept of inertia.",
    component: "NewtonFirstLawSimulator",
    quiz: "newtonsFirst",
  },
  {
    name: "Newton's Second Law",
    formula: "F = m × a",
    passage1:
      "This law states that the force applied on an object is directly proportional to its mass and acceleration.",
    passage2:
      "In this simulation, users control the mass and force using sliders to see how it affects acceleration and object motion.",
    component: "ForceSimulator",
    quiz: "newtonSecond",
  },
  {
    name: "Newton's Third Law",
    formula: "For every action, there is an equal and opposite reaction.",
    passage1:
      "Newton’s Third Law explains that forces always come in pairs. When one object exerts a force on another, the second object exerts an equal and opposite force back.",
    passage2:
      "In this simulation, users push objects or simulate jumping to visualize the reaction force in the opposite direction.",
    component: "ThirdLaw",
    quiz: "newtonsThird",
  },
  {
    name: "Ohm's Law",
    formula: "V = I × R",
    passage1:
      "Ohm’s Law states that voltage across a resistor is equal to the current through it multiplied by its resistance.",
    passage2:
      "In this simulation, users adjust resistance and voltage to observe how bulb brightness varies with current.",
    component: "OhmsLawSim",
    quiz: "ohmsLaw",
  },
  {
    name: "Archimedes’ Principle",
    formula: "Upthrust = Weight of displaced fluid",
    passage1:
      "Archimedes’ Principle states that an object submerged in a fluid experiences an upward buoyant force equal to the weight of the fluid it displaces. This explains why objects feel lighter in water.",
    passage2:
      "In the simulation, users submerge objects of different shapes and materials to observe whether they float or sink depending on the balance between buoyant force and object weight.",
    component: "Archimedes",
    quiz: "archimedesPrinciple",
  },
  {
    name: "Hooke's Law",
    formula: "F = -k × x",
    passage1:
      "Hooke’s Law describes the force needed to stretch or compress a spring. The force is directly proportional to the displacement, and the negative sign indicates the direction is opposite.",
    passage2:
      "This simulation allows users to pull and release springs with various stiffness values to visualize the elastic behavior of materials and the limits of deformation.",
    component: "HookeLaw",
    quiz: "hookesLaw",
  },
  {
    name: "Snell's Law",
    formula: "n₁ × sin(θ₁) = n₂ × sin(θ₂)",
    passage1:
      "Snell’s Law explains how light bends (refracts) as it passes through different transparent media. Light slows down in denser media and bends toward the normal.",
    passage2:
      "In the simulation, users can adjust the angle and refractive index of each medium to observe how the light ray bends when crossing a boundary.",
    component: "SnellsSim",
    quiz: "snellsLaw",
  },
  {
    name: "Law of Reflection",
    formula: "Angle of incidence = Angle of reflection",
    passage1:
      "The Law of Reflection states that the angle at which light hits a surface equals the angle at which it reflects. The incident ray, reflected ray, and the normal lie on the same plane.",
    passage2:
      "This simulation shows how a ray of light reflects symmetrically off surfaces like mirrors based on the angle of entry.",
    component: "Reflection",
    quiz: "lawOfReflection",
  },
  {
    name: "Boyle's Law",
    formula: "P₁ × V₁ = P₂ × V₂ (at constant temperature)",
    passage1:
      "Boyle’s Law shows the inverse relationship between pressure and volume of a gas at constant temperature. When volume decreases, pressure increases, and vice versa.",
    passage2:
      "In the simulation, users can manipulate gas volume to observe how pressure adjusts, illustrating real-world scenarios like a syringe being compressed.",
    component: "BoyleLaw",
    quiz: "boylesLaw",
  },
  {
    name: "Faraday's Law",
    formula: "EMF ∝ - dΦ/dt",
    passage1:
      "Faraday’s Law states that a changing magnetic flux through a coil induces an electromotive force (EMF). The negative sign in the formula reflects Lenz’s Law — the induced EMF opposes the change in flux.",
    passage2:
      "This simulation allows users to move magnets near coils or rotate coils in magnetic fields, helping them visualize how electricity is generated using magnetic fields.",
    component: "FaradayLaw",
    quiz: "faradaysLaw",
  },
];

export default lawsData;
