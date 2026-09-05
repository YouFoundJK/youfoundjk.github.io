---
title: "II. Plasma Instability in Hall Thrusters - A Numerical Study"
subtitle: "Numerical Analysis of the General Dispersion Relation"
abstract: "Numerical analysis of the General Dispersion relation for Hall Thrusters previously proposed by the author. The study involved algorithms including fixed point iteration and conjugate gradient descent using multiprocessing self-made modules in Python."
order: 2
category: ["Plasma Physics", "Mathematical Modelling"]
date: "2023"
featured: true
thumbnail: "/images/projects/plasma_ii.webp"
links:
  pdf: "/uploads/plasma_II.pdf"
  slides: "/uploads/plasma_II_slides.pdf"
---

### Overview
This project presents a rigorous numerical analysis of the General Dispersion relation for Hall Thrusters, formulated by Jovi Koikkara.

Hall thrusters exhibit complex electrostatic and electromagnetic microinstabilities that dictate anomalous electron transport and thruster efficiency. 

### Methodology & Computation
- Formulated custom numerical solvers utilizing **fixed-point iteration** and **conjugate gradient descent**.
- Developed modular Python packages accelerated with **multiprocessing** to compute the complex roots of the dispersion relation across multidimensional parameter spaces.
- Simulated growth rates and wave vectors under diverse propellant conditions and magnetic field profiles.

### Key Insights
- Verified stability regimes against empirical data.
- Demonstrated numerical convergence across stiff dispersion regimes where classical analytical approximations diverge.
