import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  LoadingController,
  AlertController,
  ToastController,
  IonicModule,
} from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      await this.login();
    } else {
      this.markFormGroupTouched();
    }
  }

  private async login() {
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      // Simular llamada a API
      await this.simulateApiCall();

      await loading.dismiss();
      await this.showSuccessToast('Bienvenido a AeroControl');
      this.router.navigate(['/dashboard']);
    } catch (error) {
      await loading.dismiss();
      await this.showErrorAlert(
        'Error al iniciar sesión',
        'Verifique sus credenciales'
      );
    }
  }

  private simulateApiCall(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { email, password } = this.loginForm.value;
        // Credenciales de prueba
        if (email === 'admin@aerocontrol.com' && password === '123456') {
          resolve(true);
        } else {
          reject('Credenciales inválidas');
        }
      }, 2000);
    });
  }

  private async showSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    await toast.present();
  }

  private async showErrorAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }
}
