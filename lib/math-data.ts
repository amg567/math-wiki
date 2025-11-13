export interface MathTopic {
  id: string
  title: string
  description: string
  level: "high-school" | "undergraduate" | "masters" | "phd"
  branch: string
  prerequisites?: string[]
  relatedTopics?: string[]
  content?: string
  references?: string[]
}

export interface MathBranch {
  id: string
  title: string
  description: string
  level: "high-school" | "undergraduate" | "masters" | "phd"
  topics: string[]
}

export const mathBranches: MathBranch[] = [
  // High School
  {
    id: "hs-algebra",
    title: "Algebra",
    description: "Variables, equations, functions, and polynomials",
    level: "high-school",
    topics: ["linear-equations", "quadratic-equations", "polynomials", "functions"],
  },
  {
    id: "hs-geometry",
    title: "Geometry",
    description: "Shapes, angles, proofs, and spatial reasoning",
    level: "high-school",
    topics: ["euclidean-geometry", "triangles", "circles", "coordinate-geometry"],
  },
  {
    id: "hs-trigonometry",
    title: "Trigonometry",
    description: "Angles, triangles, and periodic functions",
    level: "high-school",
    topics: ["sine-cosine-tangent", "unit-circle", "trig-identities"],
  },
  {
    id: "hs-probability",
    title: "Probability & Statistics",
    description: "Chance, data analysis, and distributions",
    level: "high-school",
    topics: ["probability-basics", "statistics", "distributions"],
  },
  // Undergraduate
  {
    id: "ug-calculus",
    title: "Calculus",
    description: "Limits, derivatives, integrals, and series",
    level: "undergraduate",
    topics: ["limits", "derivatives", "integrals", "sequences-series"],
  },
  {
    id: "ug-linear-algebra",
    title: "Linear Algebra",
    description: "Vectors, matrices, and linear transformations",
    level: "undergraduate",
    topics: ["vectors", "matrices", "eigenvalues", "vector-spaces"],
  },
  {
    id: "ug-abstract-algebra",
    title: "Abstract Algebra",
    description: "Groups, rings, and fields",
    level: "undergraduate",
    topics: ["groups", "rings", "fields", "homomorphisms"],
  },
  {
    id: "ug-real-analysis",
    title: "Real Analysis",
    description: "Rigorous study of real numbers and functions",
    level: "undergraduate",
    topics: ["real-numbers", "sequences", "continuity", "differentiation"],
  },
  // Masters
  {
    id: "ms-topology",
    title: "Topology",
    description: "Continuous deformations and topological spaces",
    level: "masters",
    topics: ["topological-spaces", "continuity", "compactness", "connectedness"],
  },
  {
    id: "ms-complex-analysis",
    title: "Complex Analysis",
    description: "Functions of complex variables",
    level: "masters",
    topics: ["complex-functions", "contour-integration", "residue-theorem"],
  },
  {
    id: "ms-functional-analysis",
    title: "Functional Analysis",
    description: "Infinite-dimensional vector spaces",
    level: "masters",
    topics: ["banach-spaces", "hilbert-spaces", "operators"],
  },
  {
    id: "ms-number-theory",
    title: "Number Theory",
    description: "Properties of integers and prime numbers",
    level: "masters",
    topics: ["prime-numbers", "congruences", "diophantine-equations"],
  },
  // PhD
  {
    id: "phd-algebraic-geometry",
    title: "Algebraic Geometry",
    description: "Geometric study of solutions to polynomial equations",
    level: "phd",
    topics: ["varieties", "schemes", "sheaves"],
  },
  {
    id: "phd-pde",
    title: "Partial Differential Equations",
    description: "Equations involving partial derivatives",
    level: "phd",
    topics: ["elliptic-pde", "parabolic-pde", "hyperbolic-pde"],
  },
  {
    id: "phd-ergodic-theory",
    title: "Ergodic Theory",
    description: "Long-term average behavior of dynamical systems",
    level: "phd",
    topics: ["measure-preserving-transformations", "ergodic-theorems"],
  },
  {
    id: "phd-category-theory",
    title: "Category Theory",
    description: "Abstract structures and relationships between them",
    level: "phd",
    topics: ["categories", "functors", "natural-transformations"],
  },
]

export const mathTopics: MathTopic[] = [
  {
    id: "fourier-transform",
    title: "Fourier Transform",
    description: "A mathematical transform that decomposes functions into their constituent frequencies.",
    level: "undergraduate",
    branch: "Calculus",
    prerequisites: ["integrals", "complex-numbers"],
    relatedTopics: ["laplace-transform", "signal-processing"],
    content:
      "The Fourier transform is a mathematical operation that transforms a function of time into a function of frequency. It is widely used in signal processing, physics, and engineering.",
    references: ["Stein & Shakarchi - Fourier Analysis", "Rudin - Real and Complex Analysis"],
  },
  {
    id: "prime-numbers",
    title: "Prime Numbers",
    description: "Natural numbers greater than 1 that have no positive divisors other than 1 and themselves.",
    level: "high-school",
    branch: "Number Theory",
    relatedTopics: ["fundamental-theorem-arithmetic", "prime-factorization"],
    content:
      "A prime number is a natural number greater than 1 that cannot be formed by multiplying two smaller natural numbers. The first few primes are 2, 3, 5, 7, 11, and 13.",
    references: ["Hardy & Wright - An Introduction to the Theory of Numbers"],
  },
]

export const levelInfo = {
  "high-school": {
    title: "High School",
    description: "Foundational mathematics covering algebra, geometry, trigonometry, and basic probability",
    color: "from-blue-500 to-cyan-500",
    icon: "📐",
  },
  undergraduate: {
    title: "Undergraduate",
    description: "University-level mathematics including calculus, linear algebra, and abstract algebra",
    color: "from-purple-500 to-pink-500",
    icon: "∫",
  },
  masters: {
    title: "Master's",
    description: "Advanced topics in topology, analysis, and specialized branches of mathematics",
    color: "from-orange-500 to-red-500",
    icon: "∞",
  },
  phd: {
    title: "PhD / Research",
    description: "Cutting-edge research areas including algebraic geometry, PDEs, and category theory",
    color: "from-green-500 to-emerald-500",
    icon: "∀",
  },
}
