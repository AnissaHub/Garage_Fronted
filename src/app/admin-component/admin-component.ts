import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarService } from '../services/car-service';
import { Car } from '../models/Cars';
import { AuthService } from '../services/auth';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-component',
  standalone: true,
   imports: [FormsModule, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.scss',
})
export class AdminComponent implements OnInit {

  // ── Liste des voitures ────────────────────────────
  cars: Car[] = [];

  // ── Formulaire ────────────────────────────────────
  formCar: Partial<Car> = {
    immatriculation: '',
    marque: '',
    modele: '',
    annee: undefined,
    couleur: '',
    kilometrage: undefined,
    prix: undefined,
    etat: 'en_stock',
    description: ''
  };

  // ── Mode édition ──────────────────────────────────
  isEditing: boolean = false;
  editImmatriculation: string = '';

  // ── Messages ──────────────────────────────────────
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private carService: CarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCars();
  }

  // Charge la liste des voitures
  loadCars(): void {
    this.carService.getCars().subscribe({
      next: (data) => this.cars = data,
      error: () => this.errorMessage = 'Erreur chargement voitures'
    });
  }

  // Création ou modification selon le mode
  onSubmit(): void {
    if (!this.formCar.immatriculation || !this.formCar.marque || !this.formCar.modele || !this.formCar.prix) {
      this.errorMessage = 'Immatriculation, marque, modèle et prix sont obligatoires';
      return;
    }

    if (this.isEditing) {
      this.updateCar();
    } else {
      this.createCar();
    }
  }

  // Créer une voiture
  createCar(): void {
    const user = this.authService.getUser();
    const data = { ...this.formCar, utilisateur_id: user.id };

    this.carService.createCar(data).subscribe({
      next: () => {
        this.successMessage = 'Voiture créée ✅';
        this.errorMessage = '';
        this.resetForm();
        this.loadCars();
      },
      error: () => {
        this.errorMessage = 'Erreur création ❌';
        this.successMessage = '';
      }
    });
  }

  // Pré-remplir le formulaire pour modifier
  editCar(car: Car): void {
    this.isEditing = true;
    this.editImmatriculation = car.immatriculation;
    this.formCar = { ...car };
  }

  // Modifier une voiture
  updateCar(): void {
    this.carService.updateCar(this.editImmatriculation, this.formCar).subscribe({
      next: () => {
        this.successMessage = 'Voiture modifiée ✅';
        this.errorMessage = '';
        this.isEditing = false;
        this.resetForm();
        this.loadCars();
      },
      error: () => {
        this.errorMessage = 'Erreur modification ❌';
      }
    });
  }

  // Changer l'état
  updateEtat(immatriculation: string, etat: string): void {
    this.carService.updateEtat(immatriculation, etat).subscribe({
      next: () => {
        this.successMessage = 'État mis à jour ✅';
        this.loadCars();
      },
      error: () => this.errorMessage = 'Erreur état ❌'
    });
  }

  // Supprimer une voiture
  deleteCar(immatriculation: string): void {
    if (!confirm('Supprimer cette voiture ?')) return;
    this.carService.deleteCar(immatriculation).subscribe({
      next: () => {
        this.successMessage = 'Voiture supprimée ✅';
        this.loadCars();
      },
      error: () => this.errorMessage = 'Erreur suppression ❌'
    });
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.formCar = {
      immatriculation: '',
      marque: '',
      modele: '',
      annee: undefined,
      couleur: '',
      kilometrage: undefined,
      prix: undefined,
      etat: 'en_stock',
      description: ''
    };
    this.isEditing = false;
    this.editImmatriculation = '';
    this.errorMessage = '';
  }
}