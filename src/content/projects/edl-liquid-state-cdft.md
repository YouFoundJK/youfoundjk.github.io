---
title: "Exploring EDL using Liquid State Theory"
subtitle: "A Hierarchical Classical Density-Functional Theory for Ions and Coarse-Grained Dipolar Water"
abstract: "A thermodynamically consistent classical density-functional theory (cDFT) bridging a species-resolved civilized electrolyte model with a PC-SAFT coarse-grained molecular description of water. Developed at the Mathematical Institute, Charles University, this research models the simultaneous redistribution of ions, orientation of molecular solvent dipoles, and liquid packing restructuring at charged interfaces."
order: 1
category: ["Computational Biophysics", "Liquid State Theory", "Classical DFT", "Soft Matter"]
date: "2024"
featured: true
thumbnail: "/images/projects/casus_poster.webp"
links:
  pdf: "/uploads/CASUS_poster.pdf"
  external: "https://www.karlin.mff.cuni.cz/~allolio/"
---

> [!abstract] Executive Summary
> A charged interface simultaneously redistributes ions, orients molecular dipoles, and reorganizes the local packing of the liquid. These phenomena are strongly coupled: the ionic atmosphere dictates the local electric field $\mathbf{E}(\mathbf{r})$, the field polarizes and orients the dipolar solvent, and excluded volume governs which spatial configurations are accessible. We construct a thermodynamically consistent classical density-functional theory (cDFT) combining a species-resolved **"civilized" electrolyte model** with a **PC-SAFT-based coarse-grained molecular description of water**.

---

## 1. Physical Motivation & Coupled Interface Physics

At electrified solid-liquid interfaces—such as electrochemical cells, colloidal suspensions, and biological membrane surfaces—traditional Poisson-Boltzmann (PB) or classical Stern models rely on a continuous, uniform dielectric background (e.g. $\epsilon_r \approx 78.4$). However, at nanometer scales, this continuum picture breaks down due to three tightly interdependent effects:

1. **Finite-Size Steric Packing**: Real ions possess non-zero ionic radii, resulting in steric crowding, local overscreening, and oscillatory charge profiles near high surface potentials.
2. **Explicit Solvent Polarization**: Water molecules carry permanent dipole moments ($\mu_w \approx 2.33\text{ D}$) that align with the interfacial electric field, causing severe dielectric saturation in the inner Helmholtz layer.
3. **Hydrogen-Bonding & Cohesion**: Water molecules engage in directional hydrogen-bonding networks and dispersive attractions, inducing structured density layering perpendicular to the charged wall.

---

## 2. Model Formulation: The Grand Potential Functional Hierarchy

The system is formulated through a controlled thermodynamic free-energy functional hierarchy for species-resolved ions $\{i \in \text{ions}\}$ and an orientable dipolar solvent density $\rho_w(\mathbf{r}, \hat{\mathbf{u}})$:

$$
\Omega[\{\rho_i\}, \rho_w] = \mathcal{F}_{\text{id}} + \mathcal{F}_{\text{WBII}} + \mathcal{F}_{\text{el}}^{\text{MF}} + \mathcal{F}_{\text{MSA}}^{\text{res}} + \int \sum_\alpha \rho_\alpha(\mathbf{r}) \left( V_\alpha^{\text{ext}}(\mathbf{r}) - \mu_\alpha \right) d\mathbf{r}
$$

### Electrostatic Mean-Field Free Energy ($\mathcal{F}_{\text{el}}^{\text{MF}}$)
For a planar slab geometry with cross-sectional area $A$ and boundary conditions $\phi(0) = \Phi_0$ and $\phi(L) = 0$, the electrostatic mean-field contribution in Gaussian units is:

$$
\frac{\mathcal{F}_{\text{el}}^{\text{MF}}}{A} = \int_0^L \left[ \frac{1}{8\pi} \left(\phi'(z)\right)^2 - \rho_q(z)\phi(z) - P_z(z)\phi'(z) \right] dz
$$

where the reduced charge density $\rho_q(z)$ and polarization field $P_z(z)$ are defined via the first orientational moment:

$$
\rho_q(z) = e \sum_i z_i \rho_i(z), \qquad P_z(z) = \sqrt{\frac{4\pi}{3}} \mu_w \rho_w(z) p_1(z)
$$

### Excluded Volume via White-Bear II FMT ($\mathcal{F}_{\text{WBII}}$)
Species-resolved volume exclusion is handled by **White-Bear II Fundamental Measure Theory (FMT)**. The excess hard-sphere free energy density $\Phi_{\text{WBII}}(\mathbf{r})$ is decomposed into scalar and vector weighted densities:

$$
\Phi_{\text{WBII}} = -n_0 \ln(1 - n_3) + \frac{n_1 n_2 - \mathbf{n}_{v1} \cdot \mathbf{n}_{v2}}{1 - n_3} + \left( \frac{n_2^3 - 3 n_2 \mathbf{n}_{v2} \cdot \mathbf{n}_{v2}}{24\pi (1 - n_3)^2} \right) \xi(n_3)
$$

where the weights $n_\alpha(\mathbf{r}) = \sum_i \int \rho_i(\mathbf{r}') \omega_i^{(\alpha)}(\mathbf{r} - \mathbf{r}') d\mathbf{r}'$ account for particle volumes, surface areas, and curvature overlaps.

### Short-Range Correlation Residues ($\mathcal{F}_{\text{MSA}}^{\text{res}}$)
To account for short-range electrostatic correlations without double-counting the long-range mean-field component, we derive residual correlation kernels from the **Mean Spherical Approximation (MSA)**:

$$
\mathcal{F}_{\text{MSA}}^{\text{res}} = -\frac{1}{2} \int d\mathbf{r} \int d\mathbf{r}' \sum_{\alpha,\beta} \Delta c_{\alpha\beta}^{\text{MSA}}(\mathbf{r} - \mathbf{r}') \rho_\alpha(\mathbf{r})\rho_\beta(\mathbf{r}')
$$

spanning ion-ion ($ii$), ion-dipole ($id$), and dipole-dipole ($dd$) correlation channels.

---

## 3. Non-Local Water Free Energy Extension

To capture the complex associative and cohesive behavior of liquid water, we couple the civilized electrolyte model with a **PC-SAFT (Perturbed Chain Statistical Associating Fluid Theory)** molecular free-energy extension:

$$
\mathcal{F}_{\text{water}} = \mathcal{F}_{\text{id}} + \mathcal{F}_{\text{WBII}} + \mathcal{F}_{\text{chain}} + \mathcal{F}_{\text{assoc}} + \mathcal{F}_{\text{disp}} + \int \rho_w(\mathbf{r}) V_{\text{wall}}(\mathbf{r}) d\mathbf{r}
$$

### Wertheim Four-Site Association ($\mathcal{F}_{\text{assoc}}$)
Hydrogen bonding is modeled using **Wertheim First-Order Thermodynamic Perturbation Theory (TPT1)** with a four-site associative scheme:

$$
\Phi_{\text{assoc}}(\mathbf{r}) = 4 \rho_w(\mathbf{r}) \left( \ln X_A(\mathbf{r}) - \frac{X_A(\mathbf{r})}{2} + \frac{1}{2} \right)
$$

The fraction of unbonded association sites $X_A(\mathbf{r})$ obeys the exact law of mass action:

$$
\Delta(\mathbf{r}) X_A^2(\mathbf{r}) + X_A(\mathbf{r}) - 1 = 0
$$

where $\Delta(\mathbf{r})$ depends on the local contact value of the hard-sphere radial distribution function $g_{\text{hs}}(\sigma; \{n_\alpha\})$.

### Gross-Sadowski PC-SAFT Dispersion ($\mathcal{F}_{\text{disp}}$)
Attractive dispersive forces are integrated using non-local dispersion kernels operating over smoothed spatial density profiles $\bar{\rho}_w(\mathbf{r}) = \mathcal{K}_{\text{disp}} * \rho_w(\mathbf{r})$, recovering bulk saturation pressures and vapor-liquid coexistence.

---

## 4. Numerical Protocol & Globalization Algorithm

Equilibrium corresponds to the stationary fixed point of the bulk-subtracted Euler-Lagrange map:

$$
\rho_i^{\text{new}}(z) = \rho_i^{\text{bulk}} \exp\left[ -\beta V_i^{\text{ext}}(z) - \beta \frac{\delta \mathcal{F}_{\text{ex}}}{\delta \rho_i(z)} + \beta \mu_i^{\text{ex}} \right]
$$

Solving this highly non-linear, non-local integro-differential system across stiff potential boundaries required engineering a multi-stage numerical pipeline:

```
[ Continuation Seeding ] ──> [ Safeguarded Anderson Acceleration ] ──> [ Newton-Armijo Line Search ] ──> [ Physical Acceptance Audit ]
```

1. **Exact-Moment Discretization**: Planar FMT convolution kernels are cell-integrated and normalized to match exact spatial moments. Adjoint functional derivatives are evaluated via reversed-kernel adjoint convolutions.
2. **Potential & Resolution Continuation**: Solutions at lower wall potentials $\Phi_0$ serve as initial seed vectors for higher potential regimes, followed by hierarchical grid refinement.
3. **Hybrid Solvers**: Robust safeguarded Anderson acceleration warm-up followed by Newton-Raphson iterations with an Armijo line search to ensure quadratic convergence.
4. **Three-Pillar Acceptance Rule**: Every state is audited against strict physical criteria:

   $$
   \text{Numerical Convergence} \;\wedge\; \text{Physical Admissibility} \;\wedge\; \text{Closure Consistency}
   $$

   Ensuring non-negative densities, White-Bear II packing bound satisfaction ($n_3(z) < 1$), bulk density recovery, and MSA residue consistency.

---

## 5. Supercomputing & Institutional Affiliation

- **Research Group**: Biomembrane Remodeling Group, Mathematical Institute, Faculty of Mathematics and Physics (MFF), Charles University (Prague).
- **HPC Infrastructure**: Simulations executed on the **Sněhurka** and **Chiméra** high-performance computing clusters at MFF, Univerzita Karlova.

> [!tip] Download Full Poster
> You can download and view the complete research poster presented at CASUS directly from the action bar above or via [this link](/uploads/CASUS_poster.pdf).
