export type ChunkType =
  | "intuition"
  | "motivation"
  | "historical_note"
  | "concrete_example"
  | "visual_intuition"
  | "formal_definition"
  | "theorem"
  | "proof_sketch"
  | "exercise"
  | "application"
  | "prerequisite"
  | "advanced_note"
  | "warning"
  | "notation"
  | "connection"

export interface ContentChunk {
  type: ChunkType
  /** 0=high-school · 1=early-undergrad · 2=advanced-undergrad · 3=grad · 4=advanced-grad · 5=research */
  difficulty: 0 | 1 | 2 | 3 | 4 | 5
  prerequisites: string[]
  content: string
}

export interface FilteredContent {
  reason: string
  removed_topic: string
  difficulty: 0 | 1 | 2 | 3 | 4 | 5
}

export interface MathTopic {
  id: string
  title: string
  description: string
  level: "high-school" | "undergraduate" | "masters" | "phd"
  /** Numeric difficulty: 0=high-school, 1=early-undergrad, 2=advanced-undergrad, 3=grad, 4=advanced-grad, 5=research */
  difficulty?: 0 | 1 | 2 | 3 | 4 | 5
  branch: string
  prerequisites?: string[]
  relatedTopics?: string[]
  /** Legacy plain-text content – used when chunks are not present */
  content?: string
  /** Structured pedagogical content chunks */
  chunks?: ContentChunk[]
  /** Topics removed due to abstraction-leakage or audience restrictions */
  filtered_content?: FilteredContent[]
  /** Sibling / adjacent topics this concept connects to */
  connections?: string[]
  /** Recommended next topics after mastering this one */
  learning_path_next?: string[]
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
  // ─── Fourier Transform ────────────────────────────────────────────────────
  {
    id: "fourier-transform",
    title: "Fourier Transform",
    description: "A mathematical transform that decomposes functions into their constituent frequencies.",
    level: "undergraduate",
    difficulty: 2,
    branch: "Calculus",
    prerequisites: ["integrals", "complex-numbers"],
    relatedTopics: ["laplace-transform", "signal-processing"],
    connections: ["laplace-transform", "signal-processing", "integrals"],
    learning_path_next: ["laplace-transform", "signal-processing"],
    chunks: [
      {
        type: "intuition",
        difficulty: 1,
        prerequisites: [],
        content:
          "Imagine a musical chord: it sounds like one thing, but it is actually made up of several pure notes mixed together. The Fourier transform does exactly this for any signal — it tells you which 'pure tones' (frequencies) are hiding inside it, and how loud each one is.",
      },
      {
        type: "motivation",
        difficulty: 1,
        prerequisites: [],
        content:
          "Many phenomena in nature — sound, light, heat, radio waves — are easiest to understand in terms of their frequency content rather than their moment-by-moment values. The Fourier transform is the mathematical tool that switches between these two perspectives.",
      },
      {
        type: "historical_note",
        difficulty: 0,
        prerequisites: [],
        content:
          "Joseph Fourier (1768–1830) introduced the idea while studying heat conduction. He claimed — controversially at the time — that any function could be represented as an infinite sum of sines and cosines. This sparked decades of foundational work in analysis.",
      },
      {
        type: "concrete_example",
        difficulty: 1,
        prerequisites: ["integrals"],
        content:
          "Consider the square wave that alternates between +1 and −1 every half-second. Its Fourier transform reveals that the wave is built from a fundamental frequency (1 Hz) plus harmonics at 3 Hz, 5 Hz, 7 Hz, … each with decreasing amplitude (1/3, 1/5, 1/7, …). Adding these harmonics together gradually reconstructs the sharp corners of the original square wave.",
      },
      {
        type: "notation",
        difficulty: 2,
        prerequisites: ["integrals", "complex-numbers"],
        content:
          "The Fourier transform of a function f(t) is written F(ξ) or f̂(ξ), and is defined by the integral: F(ξ) = ∫_{-∞}^{∞} f(t) e^{-2πiξt} dt. Here t is the time variable, ξ is the frequency variable, and e^{-2πiξt} = cos(2πξt) − i sin(2πξt) (Euler's formula).",
      },
      {
        type: "formal_definition",
        difficulty: 2,
        prerequisites: ["integrals", "complex-numbers"],
        content:
          "Let f : ℝ → ℂ be an integrable function (f ∈ L¹(ℝ)). The Fourier transform of f is the function F(ξ) = ∫_{-∞}^{∞} f(t) e^{-2πiξt} dt, defined for all ξ ∈ ℝ. The inverse transform recovers f from F: f(t) = ∫_{-∞}^{∞} F(ξ) e^{2πiξt} dξ, whenever f is sufficiently nice (e.g., both f and F are integrable).",
      },
      {
        type: "theorem",
        difficulty: 2,
        prerequisites: ["integrals", "complex-numbers"],
        content:
          "Parseval's Theorem: ∫_{-∞}^{∞} |f(t)|² dt = ∫_{-∞}^{∞} |F(ξ)|² dξ. This says the total energy of a signal is the same whether you measure it in the time domain or the frequency domain. Energy is conserved under the Fourier transform.",
      },
      {
        type: "application",
        difficulty: 1,
        prerequisites: [],
        content:
          "Signal processing: audio equalizers use the Fourier transform to boost or cut specific frequencies. JPEG image compression identifies and discards imperceptible high-frequency details. MRI machines reconstruct tissue images from frequency-domain measurements.",
      },
      {
        type: "advanced_note",
        difficulty: 3,
        prerequisites: ["integrals", "complex-numbers", "functional-analysis"],
        content:
          "The Fourier transform extends naturally to square-integrable functions L²(ℝ) via the Plancherel theorem, and to tempered distributions via the Schwartz space. This distributional extension allows transforms of functions like the Dirac delta and constant functions.",
      },
    ],
    filtered_content: [
      {
        reason: "Requires functional analysis (L² spaces, distributions) which exceeds undergraduate max_difficulty=2",
        removed_topic: "Fourier transform on tempered distributions and Schwartz space",
        difficulty: 3,
      },
    ],
    references: ["Stein & Shakarchi - Fourier Analysis", "Rudin - Real and Complex Analysis"],
  },

  // ─── Prime Numbers ────────────────────────────────────────────────────────
  {
    id: "prime-numbers",
    title: "Prime Numbers",
    description: "Natural numbers greater than 1 that have no positive divisors other than 1 and themselves.",
    level: "high-school",
    difficulty: 0,
    branch: "Number Theory",
    prerequisites: [],
    relatedTopics: ["fundamental-theorem-arithmetic", "prime-factorization"],
    connections: ["divisibility", "fundamental-theorem-arithmetic", "prime-factorization"],
    learning_path_next: ["prime-factorization", "fundamental-theorem-arithmetic", "modular-arithmetic"],
    chunks: [
      {
        type: "intuition",
        difficulty: 0,
        prerequisites: [],
        content:
          "A prime number is a counting number that cannot be split into equal smaller groups — except for the trivial groups of 1 and itself. Think of it as an 'atom' of multiplication: you cannot break it down further.",
      },
      {
        type: "concrete_example",
        difficulty: 0,
        prerequisites: [],
        content:
          "The number 12 can be arranged into a 3×4 rectangle, a 2×6 rectangle, or a 1×12 row — so 12 is not prime. But 7 can only be arranged as a single 1×7 row; no rectangle fits. That makes 7 prime. The first few primes are: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, …",
      },
      {
        type: "formal_definition",
        difficulty: 0,
        prerequisites: [],
        content:
          "A natural number p > 1 is prime if its only positive divisors are 1 and p itself. A natural number greater than 1 that is not prime is called composite.",
      },
      {
        type: "historical_note",
        difficulty: 0,
        prerequisites: [],
        content:
          "Euclid (around 300 BC) proved in the Elements that there are infinitely many primes — one of the oldest proofs in mathematics. His argument: assume finitely many primes p₁, p₂, …, pₙ; then (p₁·p₂·…·pₙ)+1 is divisible by none of them, a contradiction.",
      },
      {
        type: "theorem",
        difficulty: 0,
        prerequisites: [],
        content:
          "Euclid's Theorem: There are infinitely many prime numbers. Proof sketch: Suppose there were only finitely many primes p₁, …, pₙ. Let N = (p₁ × p₂ × … × pₙ) + 1. Then N is not divisible by any pᵢ (remainder is always 1), so N must have a prime factor not in our list — a contradiction.",
      },
      {
        type: "concrete_example",
        difficulty: 0,
        prerequisites: [],
        content:
          "Sieve of Eratosthenes: To find all primes up to 30, write 2–30. Circle 2, cross out all multiples of 2. Circle 3, cross out multiples of 3. Circle 5, cross out multiples of 5. Continue. Circled numbers (2, 3, 5, 7, 11, 13, 17, 19, 23, 29) are all the primes up to 30.",
      },
      {
        type: "application",
        difficulty: 1,
        prerequisites: [],
        content:
          "Internet security depends on prime numbers. RSA encryption uses the fact that multiplying two large primes together is easy, but factoring the result back into those primes is computationally hard. This asymmetry protects your passwords and credit card numbers online.",
      },
      {
        type: "advanced_note",
        difficulty: 2,
        prerequisites: ["logarithms", "limits"],
        content:
          "The Prime Number Theorem (proved in 1896) states that the number of primes up to n is approximately n / ln(n). More precisely, π(n) ~ n / ln(n) as n → ∞, where π(n) counts primes ≤ n.",
      },
    ],
    filtered_content: [
      {
        reason: "Riemann Hypothesis and zeta function require complex analysis, exceeding high-school/early-undergrad level",
        removed_topic: "Riemann zeta function and its connection to prime distribution",
        difficulty: 3,
      },
    ],
    references: ["Hardy & Wright - An Introduction to the Theory of Numbers"],
  },

  // ─── Groups ───────────────────────────────────────────────────────────────
  {
    id: "groups",
    title: "Groups",
    description: "Algebraic structures capturing the essence of symmetry through a set with an associative binary operation, identity, and inverses.",
    level: "undergraduate",
    difficulty: 2,
    branch: "Abstract Algebra",
    prerequisites: ["sets", "functions", "binary-operations"],
    relatedTopics: ["rings", "fields", "homomorphisms"],
    connections: ["rings", "fields", "homomorphisms", "permutations", "symmetry"],
    learning_path_next: ["subgroups", "homomorphisms", "rings"],
    chunks: [
      {
        type: "intuition",
        difficulty: 1,
        prerequisites: [],
        content:
          "A group is a mathematical way to describe symmetry. When you rotate an equilateral triangle, you can rotate it 0°, 120°, or 240° and it looks the same. These rotations form a group: combining any two gives another valid rotation, every rotation can be undone, and 'doing nothing' is always an option.",
      },
      {
        type: "motivation",
        difficulty: 1,
        prerequisites: [],
        content:
          "Why study groups? Because the same abstract pattern — a set of reversible transformations that compose nicely — appears everywhere: symmetries of geometric shapes, permutations, modular arithmetic (clock arithmetic), and even the rules governing subatomic particles in physics.",
      },
      {
        type: "concrete_example",
        difficulty: 1,
        prerequisites: [],
        content:
          "Clock arithmetic: add hours on a 12-hour clock. 10 + 5 = 3 (not 15). The set {0, 1, 2, …, 11} with this addition rule forms a group. Every element has an inverse: the inverse of 5 is 7 (because 5 + 7 = 12 ≡ 0). The identity is 0.",
      },
      {
        type: "concrete_example",
        difficulty: 1,
        prerequisites: [],
        content:
          "Symmetries of an equilateral triangle: label the vertices 1, 2, 3. There are 6 symmetries — 3 rotations (0°, 120°, 240°) and 3 reflections. Composing any two gives another symmetry. This group is called S₃ (the symmetric group on 3 elements), and it has exactly 6 elements.",
      },
      {
        type: "formal_definition",
        difficulty: 2,
        prerequisites: ["sets", "binary-operations"],
        content:
          "A group is a set G together with a binary operation ∗ : G × G → G satisfying: (1) Associativity: for all a, b, c ∈ G, (a ∗ b) ∗ c = a ∗ (b ∗ c). (2) Identity: there exists e ∈ G such that e ∗ a = a ∗ e = a for all a ∈ G. (3) Inverses: for every a ∈ G there exists a⁻¹ ∈ G such that a ∗ a⁻¹ = a⁻¹ ∗ a = e.",
      },
      {
        type: "notation",
        difficulty: 2,
        prerequisites: [],
        content:
          "We write (G, ∗) or just G when the operation is clear. The group operation is often written multiplicatively (ab instead of a ∗ b) or additively (a + b) when the group is commutative. The identity is written e (or 1 multiplicatively, or 0 additively).",
      },
      {
        type: "warning",
        difficulty: 2,
        prerequisites: [],
        content:
          "Groups are NOT required to be commutative! When a ∗ b = b ∗ a for all elements, the group is called abelian (after Niels Henrik Abel). Many important groups are non-abelian — for example, the symmetry group of a square.",
      },
      {
        type: "theorem",
        difficulty: 2,
        prerequisites: ["sets"],
        content:
          "Uniqueness of identity and inverses: In any group, the identity element e is unique. For each element a, its inverse a⁻¹ is unique. Proof sketch for identity uniqueness: suppose both e and e' are identities; then e = e ∗ e' = e'. The same style of argument works for inverses.",
      },
      {
        type: "concrete_example",
        difficulty: 2,
        prerequisites: ["modular-arithmetic"],
        content:
          "Cyclic groups: ℤ/nℤ = {0, 1, 2, …, n−1} with addition mod n is a group of order n. Every element is a power of the generator 1: 0=1⁰, 1=1¹, 2=1², … This is denoted Cₙ or ℤₙ. For example, C₄ = {0, 1, 2, 3} represents 4-fold rotational symmetry.",
      },
      {
        type: "application",
        difficulty: 2,
        prerequisites: [],
        content:
          "Rubik's Cube: every possible state of the cube corresponds to an element of a group of order 43,252,003,274,489,856,000 (about 4.3 × 10¹⁹). Solving the cube means finding a sequence of moves — group elements — whose composition is the identity.",
      },
      {
        type: "exercise",
        difficulty: 2,
        prerequisites: ["formal_definition"],
        content:
          "Verify that (ℤ, +) — the integers under addition — is a group: check associativity, identify the identity element, and find the inverse of each integer. Is it abelian? Now explain why (ℤ, ×) — integers under multiplication — is NOT a group.",
      },
      {
        type: "advanced_note",
        difficulty: 3,
        prerequisites: ["homomorphisms", "subgroups"],
        content:
          "Lagrange's Theorem: If H is a subgroup of a finite group G, then the order of H divides the order of G. This is one of the most powerful results in elementary group theory and has immediate consequences: no element of G can have order larger than |G|.",
      },
    ],
    filtered_content: [
      {
        reason: "Category theory (group objects in monoidal categories) exceeds max_difficulty=2 for undergraduate audience",
        removed_topic: "Group objects in monoidal categories",
        difficulty: 4,
      },
      {
        reason: "Higher algebra (∞-groups, derived categories) is research-level and not appropriate for undergraduates",
        removed_topic: "∞-groups and higher categorical structure",
        difficulty: 5,
      },
    ],
    references: [
      "Dummit & Foote - Abstract Algebra",
      "Herstein - Topics in Algebra",
      "Artin - Algebra",
    ],
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
