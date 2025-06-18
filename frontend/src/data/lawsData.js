const lawsData = [
  {
    name: "Newton's First Law",
    formula: "An object in motion stays in motion, and an object at rest stays at rest unless acted upon by a net external force.",
    passage1:
      "Newton’s First Law, also known as the Law of Inertia, explains that objects will not change their state of motion unless a force is applied. This means a moving object will continue moving at the same speed and direction unless something stops or changes it.",
    passage2:
      "In this simulation, users can drop an apple and observe how it remains stationary until released and how it falls due to gravity. The visual will reinforce the concept that an object at rest stays at rest unless acted upon by an external force (gravity, in this case).",
    component: "NewtonFirstLawSimulator",
  },
  {
    name: "Newton's Second Law",
    formula: "F = m × a",
    passage1:
      "This law states that the acceleration of an object depends on the net force applied to it and the mass of the object. More force results in more acceleration if the mass stays the same.",
    passage2:
      "In this simulation, users fire a projectile from a cannon. They can control the mass and acceleration using sliders. When fired, the object hits a target based on the force. This gives an interactive feel of how force, mass, and acceleration are related.",
    component: "ForceSimulator",
  },
  {
  name: "Snell's Law",
  formula: "n₁ × sin(θ₁) = n₂ × sin(θ₂)",
  passage1:
    "Snell's Law describes how light bends, or refracts, when it passes from one medium into another with a different refractive index. The law relates the angle of incidence and the angle of refraction to the refractive indices of the two media.",
  passage2:
    "In this simulation, users can interactively change the incident angle and the refractive indices of the two media. They can observe how the light ray bends at the boundary, offering a hands-on way to understand the relationship between light direction and material properties.",
  component: "SnellsSim"
},
];

export default lawsData;
