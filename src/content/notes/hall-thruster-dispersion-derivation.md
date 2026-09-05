---
title: "Derivation of the Cross-Field Plasma Dispersion Relation"
description: "Detailed theoretical notes on solving the linearized Vlasov-Poisson system for Hall Thruster azimuthal electron drift instabilities."
category: "Plasma Physics"
tags: ["Dispersion Relation", "Vlasov Theory", "Hall Thrusters", "Kinetic Theory"]
date: "2024-03-12"
lastUpdated: "2024-03-15"
order: 1
---

## 1. Governing Vlasov-Poisson Framework

In Hall thrusters, electrons undergo strong $\mathbf{E} \times \mathbf{B}$ drift along the azimuthal direction, while unmagnetized ions accelerate axially. To model high-frequency microinstabilities, we consider the collisionless Vlasov equation for each species $\alpha \in \{e, i\}$:

$$
\frac{\partial f_\alpha}{\partial t} + \mathbf{v} \cdot \nabla f_\alpha + \frac{q_\alpha}{m_\alpha} \left( \mathbf{E} + \mathbf{v} \times \mathbf{B} \right) \cdot \nabla_\mathbf{v} f_\alpha = 0
$$

coupled with Poisson's equation for electrostatic fluctuations $\mathbf{E}_1 = -\nabla \phi_1$:

$$
\nabla^2 \phi_1 = -\frac{1}{\varepsilon_0} \sum_\alpha q_\alpha \int f_{\alpha 1} \, d^3\mathbf{v}
$$

> [!note] Equilibrium Assumptions
> The unperturbed magnetic field $\mathbf{B}_0 = B_0 \hat{\mathbf{z}}$ is oriented radially, while the electric field $\mathbf{E}_0 = E_0 \hat{\mathbf{x}}$ is axial. The equilibrium electron drift velocity is:
> $$
> \mathbf{v}_d = \frac{\mathbf{E}_0 \times \mathbf{B}_0}{B_0^2} = -\frac{E_0}{B_0} \hat{\mathbf{y}}
> $$

## 2. Linearized Perturbation & Integration over Unperturbed Orbits

Assuming plane wave perturbations of the form $A_1(\mathbf{r}, t) = \hat{A}_1 \exp[i(\mathbf{k} \cdot \mathbf{r} - \omega t)]$, the first-order perturbation satisfies:

$$
\frac{d f_{\alpha 1}}{dt'} = -\frac{q_\alpha}{m_\alpha} \mathbf{E}_1 \cdot \nabla_\mathbf{v} f_{\alpha 0}
$$

Integrating along unperturbed particle trajectories yields the dielectric permittivity tensor component:

$$
\varepsilon(\mathbf{k}, \omega) = 1 + \chi_e(\mathbf{k}, \omega) + \chi_i(\mathbf{k}, \omega) = 0
$$

> [!theorem] Generalized Electrostatic Dispersion Relation
> For cold unmagnetized ions and magnetized drifting electrons with finite gyroradius $\rho_e = v_{th,e}/\Omega_{ce}$, the dielectric function is:
> $$
> \varepsilon(k_y, k_z, \omega) = 1 - \frac{\omega_{pi}^2}{\omega^2} + \frac{1}{k^2 \lambda_{De}^2} \left[ 1 + \frac{\omega - k_y v_d}{\sqrt{2} k_z v_{th,e}} \sum_{n=-\infty}^{\infty} Z\left( \frac{\omega - k_y v_d - n\Omega_{ce}}{\sqrt{2}k_z v_{th,e}} \right) \Gamma_n(b_e) \right] = 0
> $$
> where $\Gamma_n(b_e) = I_n(b_e) e^{-b_e}$ with $b_e = k_\perp^2 \rho_e^2$, and $Z(\zeta)$ is the Fried-Conte plasma dispersion function.

## 3. Asymptotic Growth Rate Analysis

In the limit where $k_z \to 0$ (purely azimuthal wave propagation) and $\Omega_{ce} \gg \omega_{pi}$, the dispersion relation simplifies into discrete resonance bands:

$$
\omega \approx k_y v_d \pm n\Omega_{ce} + i\gamma_n
$$

The maximum instability growth rate $\gamma_{\max}$ scales as:

$$
\gamma_{\max} \approx \left( \frac{\sqrt{27}}{2^{4/3}} \right) \omega_{pi}^{2/3} \Omega_{ce}^{1/3} \left( \frac{m_e}{m_i} \right)^{1/6}
$$

> [!warning] Numerical Divergence in Cold Plasma Limit
> Near cyclotron harmonics $\omega - k_y v_d \approx n\Omega_{ce}$, the derivative $\partial \varepsilon / \partial \omega \to 0$. Standard Newton-Raphson solvers diverge unless damped with fixed-point relaxation.
